import PairHeader from "~/components/PairHeader";
import FinancialChart from "~/components/FinancialChart";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="container mx-auto mb-8 mt-4 grid w-full grow grid-cols-4 gap-4">
      <div className="col-span-3 flex flex-col items-start justify-start gap-3 ">
        {/* table with bid and asks here */}
        <div className="min-h-[10vh] w-full rounded-md bg-stone-900  ring-1 ring-stone-500">
          <PairHeader pair={defaultPair} />
        </div>
        <div className="min-h-[45vh] w-full rounded-md bg-stone-900 p-5 pl-3 text-black ring-1 ring-stone-500">
          <FinancialChart />
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
  const { chains, isLoading: loadingNetwork } = useSwitchNetwork();
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

  if (isLoading || loadingNetwork)
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
          <ConnectButton showBalance={false} chainStatus={"icon"} />
        </div>
      </div>
    );

  if (chains[0] !== xdcTestnet) {
    return (
      <div className="flex h-full flex-col items-center justify-start gap-6 rounded-md bg-stone-900 p-6 ring-1 ring-stone-500 ">
        <h3 className="text-lg">Wrong network</h3>
        <div className="rounded-md ring-1 ring-stone-500 hover:ring-0">
          <ConnectButton showBalance={false} chainStatus={"icon"} />
        </div>
      </div>
    );
  }

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
          <BuyPanel balance={balance} />
        </TabsContent>
        <TabsContent value="sell" className="min-h-[60vh]">
          <SellPanel balance={balance} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

import History from "~/components/History";
import { defaultPair } from "~/utils/constants";
import { useAccount, useBalance, useSwitchNetwork } from "wagmi";
import { Loader2 } from "lucide-react";
import React from "react";
import { BuyPanel, SellPanel } from "~/components";
import { xdcTestnet } from "viem/chains";
