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
          Positions
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
  return <p>positions</p>;
};

const Orders = () => {
  return <p>orders</p>;
};

const Trades = () => {
  return <p>trades</p>;
};
