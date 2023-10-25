import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { defaultPair } from "~/utils/constants";
import useTradesStore from "~/stores/tradesStore";
import { type ExecutedTrade } from "~/types";
import { type useBalance } from "wagmi";
import { Separator } from "~/components/ui/separator";
import React from "react";
import { Usdt, Xdc } from "~/components/icons";
import { getMockPosition } from "~/utils/helpers";

const SellPanel = ({
  balance,
}: {
  balance: ReturnType<typeof useBalance>["data"];
}) => {
  const addTransaction = useTradesStore((state) => state.addTrade);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // create randomized trade
    const trade: ExecutedTrade = {
      hash: Math.random().toString(),
      pair: defaultPair,
      collateral: parseFloat(collateral),
      entry: 1.21,
      liquidation: 0,
      // pnl is a random number between -1000 and 1000
      pnl: Math.floor(Math.random() * 2000) - 1000,
      side: "short",
      size: parseFloat(amount),
      timestamp: new Date().toISOString(),
    };

    addTransaction(trade);
    console.log("submit");
  };

  const setMaxAmount = () => {
    if (!balance) return;
    setCollateral(balance.formatted);
    setAmount(getMockPosition(balance.formatted));
  };

  const [collateral, setCollateral] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const handleCollateralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // this need to be formatted as a number with decimals separated by a dot
    const value = e.target.value;
    const regEx = /^[0-9]+(\.[0-9]{0,2})?$/;
    if (value === "" || regEx.test(value)) {
      // check if the amount is more than the balance
      if (balance && parseFloat(value) > parseFloat(balance.formatted)) {
        // if it is disable the buy btn
        setDisabled(true);
      } else {
        // enable the buy btn
        setDisabled(false);
      }
      setCollateral(value);
      // calculate the amount
      setAmount(getMockPosition(value));
    }
  };

  return (
    <form
      className="relative flex  flex-col items-start justify-start gap-4 p-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-9 flex w-full grow flex-col items-start justify-start gap-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label
            htmlFor="collateral"
            className="flex items-center justify-start gap-2"
          >
            <Usdt className="h-6 w-6" height={34} />
            Collateral
            <span className="text-xs text-stone-300">(USDT)</span>
          </Label>

          <Input
            className="text-end"
            id="collateral"
            type="text"
            placeholder="0.00"
            value={collateral}
            onChange={handleCollateralChange}
          />
          <Label asChild className="-mt-3 place-self-end" htmlFor="amount">
            <Button
              type="button"
              onClick={setMaxAmount}
              size={"sm"}
              variant={"link"}
            >
              max
            </Button>
          </Label>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="flex items-center justify-between" htmlFor="amount">
            <div className="flex items-center justify-start gap-2">
              <Xdc height={34} />
              Amount to sell
              <span className="text-xs text-stone-300">(XDC)</span>{" "}
            </div>
            <small>(Leverage 1.10x)</small>
          </Label>
          <Input
            readOnly
            className="text-end"
            id="amount"
            type="text"
            placeholder="0.00"
            value={amount}
          />
        </div>
      </div>
      <Button
        disabled={disabled}
        className="w-full bg-red-300 hover:bg-red-200"
        type="submit"
      >
        Sell / Short
      </Button>
      <Separator className="bg-stone-200/40" />
      <div className="w-full grow text-sm text-stone-300">
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <span>Spread:</span>
            <span>3.50%</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Volume:</span>
            <span>10000000</span>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default SellPanel;
