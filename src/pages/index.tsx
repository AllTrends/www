export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="container mx-auto mb-8 mt-4 grid w-full grow grid-cols-4 gap-4">
      <div className="col-span-3 flex flex-col items-start justify-start gap-3 ">
        {/* table with bid and asks here */}
        <div className="min-h-[10vh] w-full rounded-md p-8 ring ring-white"></div>
        <div className="min-h-[45vh] w-full rounded-md p-8 ring ring-white">
          The chart goes here
        </div>
        <div className="min-h-[20vh] w-full rounded-md p-8 ring ring-white">
          The Execution history goes here
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
      <TabsList className="w-full">
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

const Buy = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form
      className="flex min-h-[60vh] flex-col items-start justify-start gap-4 rounded-md bg-slate-900 p-4 pb-8"
      onSubmit={handleSubmit}
    >
      <div className="w-full grow">
        <h3 className="mb-6 text-2xl">Buy</h3>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="amount">Amount</Label>
          <Input min={0} type="number" id="amount" placeholder="Amount" />
          <Label asChild className="-mt-1.5 place-self-end" htmlFor="amount">
            <Button size={"sm"} variant={"link"}>
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
