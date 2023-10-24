import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main>Hello</main>
    </>
  );
}
