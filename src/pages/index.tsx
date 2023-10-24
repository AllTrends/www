import AutoanimateTest from "~/components/AutoanimateTest";
import PairHeader from "~/components/PairHeader";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import type Pair from "~/interfaces/Pair";


export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const pair: Pair = {
    name: "XDCPerp/USDC",
    price: 0,
    change: 0,
    high: 0,
    low: 0
  };

  return (
    <main className="flex flex-col items-start justify-start gap-8">
      Hello
      <Button variant={"destructive"}>Hello</Button>
      <PairHeader pair={pair} />
    </main>
  );
}
