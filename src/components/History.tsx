import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import type { Pair, Position } from "~/types";
import { formatWholePrice } from "~/utils/helpers";
import { useContractEvent } from "wagmi";
import { contractAddress, currentPrice, defaultPair } from "~/utils/constants";
import { testABI } from "~/hooks/wagmi/config";
import usePositionsStore from "~/stores/positionsStore";
import ClosePositionDialog from "./ClosePositionDialog";

const History = () => {
  return (
    <Tabs defaultValue="positions">
      <TabsList className="bg-transparent">
        <TabsTrigger className="bg-transparent" value="positions">
          Open positions
        </TabsTrigger>
        <TabsTrigger className="bg-transparent" value="orders">
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
  const [parent] = useAutoAnimate();

  // const trades = useTradesStore((state) => state.trades);
  // const closeTrade = useTradesStore((state) => state.removeTrade);

  const positions = usePositionsStore((state) => state.positions);
  const addPosition = usePositionsStore((state) => state.addPosition);
  const removePosition = usePositionsStore((state) => state.removePosition);

  const pairObjToString = (pair: Pair) => {
    return `${pair.numerator.toUpperCase()}/${pair.denominator.toUpperCase()}`;
  };

  useContractEvent({
    address: contractAddress,
    abi: testABI,
    eventName: "PositionOpened",

    listener(res: unknown) {
      // add trade to store
      // @ts-expect-error TODO: fix this
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const position = res[0].args as Position;

      // pair and pnl are not included in the event
      addPosition({
        ...position,
        entryPrice: Number(position.entryPrice),
        size: Number(position.size),
        side: Number(position.side) as 0 | 1,
        pair: defaultPair,
      });

      console.log({ position });
    },
  });

  // watch for position closed events
  useContractEvent({
    address: contractAddress,
    abi: testABI,
    eventName: "PositionClosed",

    listener(res: unknown) {
      // add trade to store
      // @ts-expect-error TODO: fix this
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const position = res[0].args as Position & { profit: number };

      // pair and pnl are not included in the event
      removePosition(position.positionId);

      console.log({ position });
    },
  });

  // PNL
  const getPnl = (position: Position) => {
    const { entryPrice, side } = position;
    const pnl =
      (side === 0 ? currentPrice - entryPrice : entryPrice - currentPrice) *
      position.size;
    return pnl;
  };

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
      <tbody ref={parent}>
        {positions.map((item) => (
          <tr
            key={item.positionId}
            className="relative rounded-sm ring-1 ring-stone-300/20"
          >
            <td className="text-center leading-8">
              {pairObjToString(item.pair)}
            </td>
            <td className="text-center">
              {item.side === 0 ? "long" : "short"}
            </td>
            <td
              className={
                "text-center " +
                (getPnl(item) >= 0 ? "text-green-400" : "text-red-400")
              }
            >
              {formatWholePrice(getPnl(item))}
            </td>
            <td className="text-center">{formatWholePrice(item.size)}</td>
            <td className="text-center">{"TBA"}</td>
            <td className="text-center">{formatWholePrice(item.entryPrice)}</td>
            <td className="text-center">{"TBA"}</td>
            <td className="text-center">
              <ClosePositionDialog positionId={item.positionId} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Orders = () => {
  return <p>orders</p>;
};
