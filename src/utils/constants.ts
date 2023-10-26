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
  // "0xf7FF85EB675096Da320eF4a6ad06393c91b07CD1"; // v1
  // "0x17688Bf34f8bce6F6b698da4AE68D92aAB332b05"; // v2
  // "0x2F8056184a0a2C7B9571179f3Be1A6793b6C4c3E"; // v3
  // "0x60137e84325B5856567B933FBAa4C5798DB12E25"; // v4
  // "0x0f276486F610f00F3566d0E86Ef7D787f818de51"; // v5
  "0x4cD44b63306C763F16151dbbE1F6237E6CdCC261"; //v6

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
