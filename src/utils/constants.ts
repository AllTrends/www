/*
This file contains some constants that would need to be reaplced with real values 
once we can receive them from the Blockchain.
*/

import type { Pair } from "~/types";

const defaultPair: Pair = {
  numerator: "XDC",
  denominator: "USDT",
};

const contractAddress: `0x${string}` =
  // "0xf7FF85EB675096Da320eF4a6ad06393c91b07CD1";
  "0x17688Bf34f8bce6F6b698da4AE68D92aAB332b05";

const walletConnectProjectId = "f2a8b0c8053e31d62e16f27ad108ea3c";

const currentPrice = 1.12;

const allowedSlippage = 0.003;

const currentXDCPrice = 0.5;

export {
  defaultPair,
  contractAddress,
  currentPrice,
  walletConnectProjectId,
  allowedSlippage,
  currentXDCPrice,
};
