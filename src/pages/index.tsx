import PairHeader from "~/components/PairHeader";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="container mx-auto mb-8 mt-4 grid w-full grow grid-cols-4 gap-4">
      <div className="col-span-3 flex flex-col items-start justify-start gap-3 ">
        {/* table with bid and asks here */}
        <div className="min-h-[10vh] w-full rounded-md bg-stone-900  ring-1 ring-stone-500">
          <PairHeader pair={defaultPair} />
        </div>
        <div className="min-h-[45vh] w-full rounded-md bg-stone-900 p-8 ring-1 ring-stone-500">
          The chart goes here
        </div>
        <div className="min-h-[20vh] w-full rounded-md bg-stone-900 p-3 ring-1 ring-stone-500 ">
          <History />
        </div>
      </div>
      <div className="col-span-1 grid">
        <TradingUi />
      </div>
    </main>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const TradingUi = () => {
  return (
    <Tabs defaultValue="buy">
      <TabsList className="w-full ring-1 ring-stone-500">
        <TabsTrigger className="grow" value="buy">
          Buy
        </TabsTrigger>
        <TabsTrigger className="grow" value="sell">
          Sell
        </TabsTrigger>
      </TabsList>
      <TabsContent value="buy" className="min-h-[60vh]">
        <Buy />
      </TabsContent>
      <TabsContent value="sell">
        <Sell />
      </TabsContent>
    </Tabs>
  );
};
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import History from "~/components/History";
import { defaultPair } from "~/utils/constants";
import useTradesStore from "~/stores/tradesStore";
import { type ExecutedTrade } from "~/types";
import { useAccount, useBalance } from "wagmi";

const Buy = () => {
  const addTransaction = useTradesStore((state) => state.addTrade);
  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: balance,
    isError: balanceError,
    isLoading: balanceLoading,
  } = useBalance({
    address,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // create randomized trade
    const trade: ExecutedTrade = {
      hash: Math.random().toString(),
      pair: defaultPair,
      collateral: 1110,
      entry: 1.21,
      liquidation: 0,
      // pnl is a random number between -1000 and 1000
      pnl: Math.floor(Math.random() * 2000) - 1000,
      side: "long",
      size: 0,
      timestamp: new Date().toISOString(),
    };

    addTransaction(trade);
    console.log("submit");
  };

  const setMaxAmount = () => {
    console.log(balance);
    if (!balance) return;
    const input = document.getElementById("amount") as HTMLInputElement;
    alert(balance.formatted);
  };

  return (
    <form
      className="flex min-h-[60vh] flex-col items-start justify-start gap-4 rounded-md bg-stone-900 p-4 pb-8 ring-1 ring-stone-500"
      onSubmit={handleSubmit}
    >
      <div className="w-full grow">
        <h3 className="mb-6 text-2xl">Buy</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input min={0} type="number" id="amount" placeholder="Amount" />
          <Label asChild className="-mt-1.5 place-self-end" htmlFor="amount">
            <Button
              type="button"
              onClick={setMaxAmount}
              disabled={balanceLoading}
              size={"sm"}
              variant={"link"}
            >
              max amount
            </Button>
          </Label>
        </div>
      </div>
      <Button className="w-full" type="submit">
        Buy
      </Button>
    </form>
  );
};

const Sell = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sell</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
