export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="container mx-auto mb-8 mt-4 grid w-full grow grid-cols-4 gap-4">
      <div className="col-span-3 flex flex-col items-start justify-start gap-3 ">
        {/* table with bid and asks here */}
        <div className="min-h-[56px] w-full rounded-md p-8 ring ring-white"></div>
        <div className="min-h-[50vh] w-full rounded-md p-8 ring ring-white">
          The chart goes here
        </div>
        <div className="min-h-[20vh] w-full rounded-md p-8 ring ring-white">
          The Execution history goes here
        </div>
      </div>
      <div className="col-span-1">
        <TradingUi />
      </div>
    </main>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const TradingUi = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
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
