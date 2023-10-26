export interface Pair {
  numerator: string;
  denominator: string;
};

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
};

export type Position = {
  pair: Pair;
  closing: boolean;
  pnl: number;
  // from chain
  entryPrice: bigint;
  positionId: bigint;
  side: number;
  size: bigint;
  trader: `0x${string}`;
};

export interface FinancialData {
  time: number;
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export interface D {
  x: Date;
  y: number[];
}
