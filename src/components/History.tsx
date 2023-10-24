import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useHistoryStore from "~/stores/history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const History = () => {
  const [parent] = useAutoAnimate();

  const items = useHistoryStore((state) => state.items);

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

  return (
    <ul ref={parent} className="text-white">
      {items.map((item, idx) => (
        <Item key={idx} />
      ))}
    </ul>
  );
};

export default History;

const Item = () => {
  return <li>this is an element</li>;
};

const Positions = () => {
  const [parent] = useAutoAnimate();

  const items = useHistoryStore((state) => state.items);

  return (
    <table className="w-full table-auto border-separate border-spacing-y-2">
      <thead className="text-sm text-stone-400">
        <tr>
          <th className="ps-3 text-left">position</th>
          <th className="text-center">pnl</th>
          <th className="text-center">size</th>
          <th className="text-center">collateral</th>
          <th className="text-center">entry</th>
          <th className="text-center">mark price</th>
          <th className="text-center">liquidation</th>
        </tr>
      </thead>
      <tbody ref={parent}>
        {items.map((item, idx) => (
          <tr key={idx} className="rounded-sm ring-1 ring-stone-300/20">
            <td className="ps-3 text-left leading-8">BTC/USD</td>
            <td className="text-center">+0.00000000</td>
            <td className="text-center">0.00000000</td>
            <td className="text-center">0.00000000</td>
            <td className="text-center">0.00000000</td>
            <td className="text-center">0.00000000</td>
            <td className="text-center">0.00000000</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Orders = () => {
  return <p>orders</p>;
};
