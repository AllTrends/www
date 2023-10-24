import AutoanimateTest from "~/components/AutoanimateTest";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="flex flex-col items-start justify-start gap-8">
      Hello
      <Button variant={"destructive"}>Hello</Button>
    </main>
  );
}
