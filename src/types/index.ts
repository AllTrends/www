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

export type Position = {
  pair: Pair;
  // from chain
  entryPrice: number;
  positionId: number;
  side: 0 | 1; // 0 = long, 1 = short
  size: number;
  trader: `0x${string}`;
};
