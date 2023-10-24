import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useHistoryStore from "~/stores/history";

const History = () => {
  // const [itemsNum, setItemsNum] = React.useState([0]);
  const [parent] = useAutoAnimate(/* optional config */);

  const items = useHistoryStore((state) => state.items);

  // const add = () => setItems([...items, items.length]);
  return (
    // <>
    //   <ul ref={parent} className="text-white">
    //     {items.map((item) => (
    //       <li key={item}>{item}</li>
    //     ))}
    //   </ul>
    //   <Button variant={"secondary"} onClick={add}>
    //     Add number
    //   </Button>
    // </>
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
