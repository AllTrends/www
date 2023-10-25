import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { contractAddress, currentPrice } from "~/utils/constants";
import { type useBalance, useContractEvent } from "wagmi";
import { Separator } from "~/components/ui/separator";
import React from "react";
import { Usdt, Xdc } from "~/components/icons";
import { formatWholePrice, getMockPosition } from "~/utils/helpers";

const BuyPanel = ({
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
      <BuyDialog collateral={collateral} amount={amount}>
        <Button
          disabled={disabled || !collateral || !amount}
          className="w-full bg-green-300 hover:bg-green-200"
          type="button"
        >
          Buy / Long
        </Button>
      </BuyDialog>
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

export default BuyPanel;

import { ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { testABI } from "~/hooks/wagmi/config";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import toast from "react-hot-toast";

const BuyDialog: React.FC<{
  children: React.ReactNode;
  collateral: string;
  amount: string;
}> = ({ children, collateral, amount }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (isLoading ? null : setOpen(o))}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {collateral && amount && open && (
        <BuyDialogContent
          collateral={collateral}
          amount={amount}
          closeModal={closeModal}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      )}
    </Dialog>
  );
};

const BuyDialogContent = ({
  collateral,
  amount,
  closeModal,
  setIsLoading,
  isLoading,
}: {
  collateral: string;
  amount: string;
  closeModal: () => void;
  setIsLoading: (b: boolean) => void;
  isLoading: boolean;
}) => {
  useContractEvent({
    address: contractAddress,
    abi: testABI,
    eventName: "PositionOpened",
    listener(_position) {
      setIsLoading(false);
      toast.success("Your order has been placed!");
      closeModal();
    },
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: testABI,
    functionName: "openPosition",
    // size, entryPrice, side (0 = long, 1 = short)
    args: [collateral, currentPrice.toFixed(0), 0],
  });
  const { writeAsync, isLoading: isPreparing } = useContractWrite(config);

  const submit = async () => {
    if (!writeAsync) return;
    setIsLoading(true);
    try {
      await writeAsync();
    } catch (e) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const disabled = isLoading || isPreparing;

  return (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Confirm Buy / Long</DialogTitle>
      </DialogHeader>
      <Separator className="bg-stone-200/40" />
      <div className="flex min-h-[60vh] grow flex-col items-start justify-start gap-4  text-stone-100">
        <div className="flex w-full flex-col items-center justify-center gap-2 px-8">
          <h3 className="text-2xl">Pay {collateral} USDT</h3>
          <ArrowDown size={24} />
          <h3 className="text-2xl">
            To buy {formatWholePrice(parseFloat(amount))} XDC
          </h3>
        </div>
        <Separator className="mt-1 bg-stone-200/40" />

        <ul className="mx-4 text-stone-400">
          <li>
            <button onClick={() => toast.success("lol")}>miao</button>
          </li>
          <li>lol</li>
          <li>lol</li>
          <li>lol</li>
          <li>lol</li>
        </ul>
      </div>
      <DialogFooter>
        <Button
          disabled={disabled}
          onClick={submit}
          variant={"secondary"}
          className="w-full"
        >
          Buy / Long
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
