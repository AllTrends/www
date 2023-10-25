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
import { ConnectButton } from "@rainbow-me/rainbowkit";

const TradingUi = () => {
  const {
    address,
    isConnecting: accountLoading,
    isDisconnected: accountDisconnected,
  } = useAccount();

  const {
    data: balance,
    isError: balanceError,
    isLoading: balanceLoading,
  } = useBalance({
    address,
  });

  const isLoading = accountLoading || balanceLoading;

  if (isLoading)
    return (
      <div className="flex h-full flex-col items-center justify-start gap-6 rounded-md bg-stone-900 p-6 ring-1 ring-stone-500 ">
        <h3 className="text-xl">Loading account data</h3>
        <p className="text-center text-stone-300">
          This can take a few seconds, please wait...
        </p>
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );

  if (accountDisconnected)
    return (
      <div className="flex h-full flex-col items-center justify-start gap-6 rounded-md bg-stone-900 p-6 ring-1 ring-stone-500 ">
        <h3 className="text-lg">Account not connected</h3>
        <div className="rounded-md ring-1 ring-stone-500 hover:ring-0">
          <ConnectButton chainStatus={"icon"} />
        </div>
      </div>
    );

  if (balanceError)
    return (
      <div className="flex h-full flex-col items-center justify-start gap-6 rounded-md bg-stone-900 p-6 ring-1 ring-stone-500 ">
        <h3 className="text-lg">Error loading balance</h3>
        <p className="text-center text-stone-300">Please try again later</p>
      </div>
    );

  return (
    <div className="flex h-full flex-col items-center justify-start gap-6 rounded-md bg-stone-900 ring-1 ring-stone-500 ">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="grow" value="buy">
            Buy
          </TabsTrigger>
          <TabsTrigger className="grow" value="sell">
            Sell
          </TabsTrigger>
        </TabsList>
        <TabsContent value="buy" className="min-h-[60vh]">
          <Buy balance={balance} />
        </TabsContent>
        <TabsContent value="sell">
          <Sell />
        </TabsContent>
      </Tabs>
    </div>
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
import { Loader2 } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import React from "react";

const Buy = ({
  balance,
}: {
  balance: ReturnType<typeof useBalance>["data"];
}) => {
  const addTransaction = useTradesStore((state) => state.addTrade);

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
      size: parseFloat(amount),
      timestamp: new Date().toISOString(),
    };

    addTransaction(trade);
    console.log("submit");
  };

  const setMaxAmount = () => {
    if (!balance) return;
    setAmount(balance.formatted);
  };

  const [amount, setAmount] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this need to be formatted as a number with decimals separated by a dot
    const value = e.target.value;
    const regEx = /^[0-9]+(\.[0-9]{0,2})?$/;
    if (value === "" || regEx.test(value)) {
      // check if the amount is more than the balance
      if (balance && parseFloat(value) > parseFloat(balance.formatted)) {
        // if it is disable the buy btn
        setDisabled(true);
      } else {
        // enable the buy btn
        setDisabled(false);
      }
      setAmount(value);
    }
  };

  return (
    <form
      className="relative flex  flex-col items-start justify-start gap-4 p-4"
      onSubmit={handleSubmit}
    >
      <div className="w-full grow">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input
            className="text-end"
            id="amount"
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
          />

          <Label asChild className="-mt-1.5 place-self-end" htmlFor="amount">
            <Button
              type="button"
              onClick={setMaxAmount}
              size={"sm"}
              variant={"link"}
            >
              max amount
            </Button>
          </Label>
        </div>
      </div>
      <Button
        disabled={disabled}
        className="w-full bg-green-300 hover:bg-green-200"
        type="submit"
      >
        Buy / Long
      </Button>
      <Separator className="bg-stone-200/40" />
      <div className="w-full grow text-sm text-stone-300">
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <span>Spread:</span>
            <span>3.50%</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Volume:</span>
            <span>10000000</span>
          </li>
        </ul>
      </div>
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
