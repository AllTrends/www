import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import type { Pair, Position } from "~/types";
import { ABI, formatWholePrice, getPnl } from "~/utils/helpers";
import { useContractEvent } from "wagmi";
import { contractAddress, defaultPair } from "~/utils/constants";
import usePositionsStore from "~/stores/positionsStore";
import ClosePositionDialog from "./ClosePositionDialog";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const History = () => {
  return (
    <Tabs defaultValue="positions">
      <TabsList className="bg-transparent">
        <TabsTrigger className="bg-transparent" value="positions">
          Open positions
        </TabsTrigger>
        <TabsTrigger disabled className="bg-transparent" value="orders">
          Orders
        </TabsTrigger>
      </TabsList>
      <TabsContent value="positions">
        <Positions />
      </TabsContent>
      <TabsContent value="orders">
        <Orders />
      </TabsContent>
    </Tabs>
  );
};

export default History;

const Positions = () => {
  const addPosition = usePositionsStore((state) => state.addPosition);
  const removePosition = usePositionsStore((state) => state.removePosition);

  useContractEvent({
    address: contractAddress,
    abi: ABI,
    eventName: "PositionOpened",
    listener(res) {
      console.log("res is ", res);
      try {
        if (!res || !res[0] || !res[0].args?.positionId) {
          throw new Error("invalid event");
        }
        const position = res[0].args;

        const pnl = getPnl(position);

        addPosition({
          pnl,
          pair: defaultPair,
          closing: false,
          // res
          positionId: position.positionId!,
          side: position.side!,
          size: position.size!,
          entryPrice: position.entryPrice!,
          trader: position.trader!,
        });
      } catch (error) {
        toast.error("could not add position...");
      }
    },
  });

  // watch for position closed events
  useContractEvent({
    address: contractAddress,
    abi: ABI,
    eventName: "PositionClosed",
    listener(res) {
      console.log("res is ", res);
      try {
        if (!res || !res[0] || !res[0].args?.positionId)
          throw new Error("invalid event");
        const positionId = res[0].args?.positionId;
        removePosition(positionId);
      } catch (error) {
        toast.error("could not remove position from store");
      }
    },
  });

  return (
    <table className="w-full table-auto border-separate border-spacing-y-2">
      <thead className="text-sm text-stone-400">
        <tr>
          <th className="text-center">pair</th>
          <th className="text-center">side</th>
          <th className="text-center">pnl</th>
          <th className="text-center">size</th>
          <th className="text-center">collateral</th>
          <th className="text-center">entry</th>
          <th className="text-center">liquidation</th>
          <th className="text-center">close position</th>
        </tr>
      </thead>
      <Trades />
    </table>
  );
};

const Orders = () => {
  return <p>orders</p>;
};

const Trades = () => {
  const [parent] = useAutoAnimate();
  const positions = usePositionsStore((state) => state.positions);

  return (
    <tbody ref={parent}>
      {positions.map((position) => (
        <Trade key={position.positionId} position={position} />
      ))}
    </tbody>
  );
};

const Trade = ({ position }: { position: Position }) => {
  const pairObjToString = (pair: Pair) => {
    return `${pair.numerator.toUpperCase()}/${pair.denominator.toUpperCase()}`;
  };

  return (
    <tr
      key={position.positionId}
      className="relative rounded-sm ring-1 ring-stone-300/20"
    >
      <td className="text-center leading-8">
        {pairObjToString(position.pair)}
      </td>
      <td className="text-center">{position.side === 0 ? "long" : "short"}</td>
      <td
        className={
          "text-center " +
          (getPnl(position) >= 0 ? "text-green-400" : "text-red-400")
        }
      >
        {formatWholePrice(getPnl(position))}
      </td>
      <td className="text-center">{formatWholePrice(position.size)}</td>
      <td className="text-center">{"TBA"}</td>
      <td className="text-center">{formatWholePrice(position.entryPrice)}</td>
      <td className="text-center">{"TBA"}</td>
      <td className="text-center">
        {position.closing ? (
          <Button disabled variant={"ghost"} size={"sm"}>
            closing...
          </Button>
        ) : (
          // closing position is not working yet
          <ClosePositionDialog positionId={position.positionId} />
        )}
      </td>
    </tr>
  );
};
