import { ArrowDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useContractWrite } from "wagmi";
import toast from "react-hot-toast";
import React from "react";
import { Separator } from "./ui/separator";
import { ABI, formatWholePrice } from "~/utils/helpers";
import { Button } from "./ui/button";
import { allowedSlippage, contractAddress, currentPrice } from "~/utils/constants";
import useFinancialDataStore from "~/stores/financialDataStore";

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
      <DialogTrigger asChild className="w-full">
        {children}
      </DialogTrigger>
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
  // const { config } = usePrepareContractWrite({
  //   address: contractAddress,
  //   abi: ABI,
  //   functionName: "openPosition",
  //   // size, entryPrice, side (0 = long, 1 = short)
  //   args: [BigInt(collateral), BigInt(currentPrice.toFixed(0)), 0],
  // });
  const { writeAsync, isLoading: isPreparing } = useContractWrite({
    address: contractAddress,
    abi: ABI,
    functionName: "openPosition",
    // size, entryPrice, side (0 = long, 1 = short)
    args: [BigInt(collateral), BigInt(currentPrice.toFixed(0)), 0],
  });

  const writeAsyncPromise = async () => {
    try {
      await writeAsync();
    } catch (_e) {
      throw new Error();
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      await toast.promise(writeAsyncPromise(), {
        loading: "placing order...",
        success: <b>order placed! awaiting confirmation...</b>,
        error: <b>Could not place order...</b>,
      });
      setIsLoading(true);
    } catch (e) {
      console.log("e is ", e);
    } finally {
      setIsLoading(false);
      closeModal();
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

        <div className="mx-4 text-stone-200">
          <div className="mt-10 grid grid-cols-2 gap-2 justify-center">
            <div>Leverage</div><div className="text-right">1.10x</div>
            <div>Allowed Slippage</div><div className="text-right">{allowedSlippage*100}%</div>
            <Separator className="mt-1 bg-stone-200/40" /><Separator className="mt-1 bg-stone-200/40" />
            <div>Collateral Spread</div><div className="text-right">0.00%</div>
            <div>Entry Price</div><div className="text-right">{useFinancialDataStore((state) => state.getLastPrice)()}</div>
            <div>Price Impact</div><div className="text-right">Soon</div>
            <div>Acceptable Price</div><div className="text-right">{Math.round(useFinancialDataStore((state) => state.getLastPrice)()*(1+allowedSlippage)*10000)/10000}</div>
            <div>Liq. Price</div><div className="text-right">Soon</div>
            <Separator className="mt-1 bg-stone-200/40" /><Separator className="mt-1 bg-stone-200/40" />
            <div>Collateral (USDT)</div><div className="text-right">{collateral}</div>
            <div>Fees and Price Impact</div><div className="text-right">Soon</div>
          </div>
        </div>
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

export default BuyDialog;
