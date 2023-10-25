export interface Pair {
  numerator: string;
  denominator: string;
}

export interface ExecutedTrade {
  pair: Pair;
  hash: string;
  timestamp: string;
  side: "long" | "short";
  pnl: number;
  size: number;
  collateral: number;
  entry: number;
  liquidation: number;
}
