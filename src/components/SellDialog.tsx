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
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import toast from "react-hot-toast";
import React from "react";
import { Separator } from "./ui/separator";
import { formatWholePrice } from "~/utils/helpers";
import { Button } from "./ui/button";
import { contractAddress, currentPrice } from "~/utils/constants";

const SellDialog: React.FC<{
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
        <SellDialogContent
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

const SellDialogContent = ({
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
    args: [collateral, currentPrice.toFixed(0), 1],
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
        <DialogTitle>Confirm Sell / Short</DialogTitle>
      </DialogHeader>
      <Separator className="bg-stone-200/40" />
      <div className="flex min-h-[60vh] grow flex-col items-start justify-start gap-4  text-stone-100">
        <div className="flex w-full flex-col items-center justify-center gap-2 px-8">
          <h3 className="text-2xl">Pay {collateral} USDT</h3>
          <ArrowDown size={24} />
          <h3 className="text-2xl">
            To short {formatWholePrice(parseFloat(amount))} XDC
          </h3>
        </div>
        <Separator className="mt-1 bg-stone-200/40" />

        <ul className="mx-4 text-stone-400">
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
          Sell / Short
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default SellDialog;
