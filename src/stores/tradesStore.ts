import { create } from "zustand";
import type { ExecutedTrade } from "~/types";

const useTradesStore = create<{
  trades: ExecutedTrade[];
  addTrade: (trade: ExecutedTrade) => void;
  removeTrade: (tradeHash: ExecutedTrade["hash"]) => void;
}>((set) => ({
  trades: [
    {
      pair: {
        numerator: "XDC",
        denominator: "USDC",
      },
      hash: "0x1234",
      timestamp: "2021-01-01T00:00:00.000Z",
      side: "long",
      pnl: 543.213333,
      size: 1003,
      collateral: 10000,
      entry: 1.1234,
      liquidation: 0.43,
    },
  ],
  addTrade: (trade) => {
    return set((state) => ({ trades: [trade, ...state.trades] }));
  },
  removeTrade: (tradeHash) => {
    return set((state) => ({
      trades: state.trades.filter((trade) => trade.hash !== tradeHash),
    }));
  },
}));

export default useTradesStore;
