import Head from "next/head";
import React from "react";
import { Navbar } from "~/components";

const BaseLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const bg = "";
  //"bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black";

  return (
    <>
      <Head>
        <title>AllDex</title>
        <meta name="description" content="A simple DEX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={
          "dark flex h-full min-h-screen w-full flex-col items-start justify-start text-white backdrop-brightness-[.15] " +
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
