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
        numerator: "BTC",
        denominator: "USD",
      },
      hash: "0x1234",
      timestamp: "2021-01-01T00:00:00.000Z",
      position: "long",
      pnl: 0,
      size: 1,
      collateral: 1,
      entry: 1,
      markPrice: 1,
      liquidation: 1,
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
