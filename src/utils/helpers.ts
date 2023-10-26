import type { Position } from "~/types";
import { currentPrice } from "./constants";

/**
 * Format price to display eg. 2.1535322 => 2.15
 */
export const formatPrice = (price: number | bigint) => {
  return Number(price).toFixed(2);
};

/**
 * uses formatPrice but if the decimal is 0, it will remove it
 */
export const formatWholePrice = (price: number | bigint) => {
  const formattedPrice = formatPrice(price);
  return formattedPrice.endsWith(".00")
    ? formattedPrice.slice(0, -3)
    : formattedPrice;
};

/**
 * gets a mock for the position given the collateral x1.1
 */
export const getMockPosition = (collateral: string): string => {
  return Number(formatPrice(Number(collateral))) * 1.1 + "";
};

/**
 * gets the pnl for the position
 * @param position
 * @returns pnl
 */
export const getPnl = (position: Partial<Position>) => {
  const { entryPrice, side } = position;
  const pnl =
    (side === 0
      ? Number(currentPrice) - Number(entryPrice)
      : Number(entryPrice) - Number(currentPrice)) * Number(position.size);
  return pnl;
};

export const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_collateralToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fundingPayment",
        type: "uint256",
      },
    ],
    name: "FundingPaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "positionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "entryPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PerpetualDEX.Side",
        name: "side",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "profit",
        type: "uint256",
      },
    ],
    name: "PositionClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "positionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "entryPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PerpetualDEX.Side",
        name: "side",
        type: "uint8",
      },
    ],
    name: "PositionOpened",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "collateralBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collateralToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "feeRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fundingRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "indexPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastFundingTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "positions",
    outputs: [
      {
        internalType: "address",
        name: "trader",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "entryPrice",
        type: "uint256",
      },
      {
        internalType: "enum PerpetualDEX.Side",
        name: "side",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPositions",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "size",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "entryPrice",
            type: "uint256",
          },
          {
            internalType: "enum PerpetualDEX.Side",
            name: "side",
            type: "uint8",
          },
        ],
        internalType: "struct PerpetualDEX.Position[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "entryPrice",
        type: "uint256",
      },
      {
        internalType: "enum PerpetualDEX.Side",
        name: "side",
        type: "uint8",
      },
    ],
    name: "openPosition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "positionId",
        type: "uint256",
      },
    ],
    name: "closePosition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "updateIndexPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payFunding",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
