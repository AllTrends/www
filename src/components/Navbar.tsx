import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="body-font w-full  text-white">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <a className="title-font mb-4 flex items-center font-medium text-white md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-10 w-10 rounded-full bg-stone-700 p-2 text-white"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">AllDex</span>
        </a>
        <nav className="flex flex-wrap items-center justify-center gap-4 text-base md:ml-auto md:mr-auto">
          <Button
            variant={"link"}
            className="bg-stone-500 text-stone-900 ring-1 ring-stone-700"
          >
            Trade
          </Button>

          <Button variant={"link"}>Earn</Button>
        </nav>
        <div className="rounded-md ring-1 ring-stone-500 hover:ring-0">
          <ConnectButton showBalance={false} chainStatus={"icon"} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
