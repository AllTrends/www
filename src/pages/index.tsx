import { Button } from "~/components/shadcn/button";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <main>
      Hello
      <Button variant={"destructive"}>Hello</Button>
    </main>
  );
}
