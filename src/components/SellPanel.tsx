import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { type useBalance } from "wagmi";
import { Separator } from "~/components/ui/separator";
import React from "react";
import { Usdt, Xdc } from "~/components/icons";
import { getMockPosition } from "~/utils/helpers";
import SellDialog from "./SellDialog";

const SellPanel = ({
  balance,
}: {
  balance: ReturnType<typeof useBalance>["data"];
}) => {
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

    const regEx = /^[0-9]*$/;
    if (value === "" || regEx.test(value)) {
      // check if the amount is more than the balance
      if (
        value === "0" ||
        (balance && parseFloat(value) > parseFloat(balance.formatted))
      ) {
        // if it is disable the buy btn
        setDisabled(true);
      } else {
        // enable the buy btn
        setDisabled(false);
      }
      setCollateral(value);
      if (!value) {
        setAmount("");
        return;
      }
      // calculate the amount
      setAmount((parseFloat(value) * 1.1).toFixed(2).toString());
    }
  };

  return (
    <div className="relative flex  flex-col items-start justify-start gap-4 p-4">
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
              Amount to buy
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
      <SellDialog collateral={collateral} amount={amount}>
        <Button
          disabled={disabled || !collateral || !amount}
          className="w-full bg-red-400 hover:bg-red-300"
          type="button"
        >
          Sell / Short
        </Button>
      </SellDialog>
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
    </div>
  );
};

export default SellPanel;
