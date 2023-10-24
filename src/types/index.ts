export interface Pair {
  numerator: string;
  denominator: string;
}

export interface ExecutedTrade {
  pair: Pair;
  hash: string;
  timestamp: string;
  position: "long" | "short";
  pnl: number;
  size: number;
  collateral: number;
  entry: number;
  markPrice: number;
  liquidation: number;
}
