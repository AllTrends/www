import Head from "next/head";
import React from "react";
import { Navbar } from "~/components";

const BaseLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const bg = "bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r";
  return (
    <>
      <Head>
        <title>AT - Dex</title>
        <meta name="description" content="A simple DEX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={
          "flex h-full min-h-screen w-full flex-col items-start justify-start " +
          bg
        }
      >
        <Navbar />

        {children}
      </div>
    </>
  );
};

export default BaseLayout;
