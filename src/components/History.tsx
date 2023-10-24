import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import useTradesStore from "~/stores/tradesStore";
import { Pair } from "~/types";

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

  const trades = useTradesStore((state) => state.trades);
  const closeTrade = useTradesStore((state) => state.removeTrade);

  const pairObjToString = (pair: Pair) => {
    return `${pair.numerator.toUpperCase()}/${pair.denominator.toUpperCase()}`;
  };

  return (
    <table className="w-full table-auto border-separate border-spacing-y-2">
      <thead className="text-sm text-stone-400">
        <tr>
          <th className="text-center">position</th>
          <th className="text-center">pnl</th>
          <th className="text-center">size</th>
          <th className="text-center">collateral</th>
          <th className="text-center">entry</th>
          <th className="text-center">mark price</th>
          <th className="text-center">liquidation</th>
          <th className="text-center">close position</th>
        </tr>
      </thead>
      <tbody ref={parent}>
        {trades.map((item) => (
          <tr key={item.hash} className="rounded-sm ring-1 ring-stone-300/20">
            <td className="text-center leading-8">
              {pairObjToString(item.pair)}
            </td>
            <td className="text-center">{item.pnl}</td>
            <td className="text-center">{item.size}</td>
            <td className="text-center">{item.collateral}</td>
            <td className="text-center">{item.entry}</td>
            <td className="text-center">{item.markPrice}</td>
            <td className="text-center">{item.liquidation}</td>
            <td className="text-center">
              <Button
                variant={"ghost"}
                size={"sm"}
                onClick={() => closeTrade(item.hash)}
              >
                close
                <XIcon className="ms-2 h-4 w-4 text-destructive" />
              </Button>
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
