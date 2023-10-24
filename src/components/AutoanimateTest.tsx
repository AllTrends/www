import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button } from "./ui/button";

const AutoanimateTest = () => {
  const [items, setItems] = React.useState([0, 1, 2]);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const add = () => setItems([...items, items.length]);
  return (
    <>
      <ul ref={parent} className="text-white">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Button variant={"secondary"} onClick={add}>
        Add number
      </Button>
    </>
  );
};

export default AutoanimateTest;
