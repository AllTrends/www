import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { useContractWrite } from "wagmi";
import toast from "react-hot-toast";
import { ABI } from "~/utils/helpers";
import usePositionsStore from "~/stores/positionsStore";

const ClosePositionDialog = ({ positionId }: { positionId: bigint }) => {
  const [open, setOpen] = React.useState(false);

  const setPositionClosing = usePositionsStore(
    (state) => state.setPositionClosing,
  );

  const { isLoading, writeAsync } = useContractWrite({
    address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: ABI,
    functionName: "closePosition",
    // positionId
    args: [positionId],
  });

  const writeAsyncPromise = async () => {
    try {
      await writeAsync();
    } catch (_e) {
      throw new Error();
    }
  };

  const closePosition = async () => {
    if (isLoading) return;
    try {
      await toast.promise(writeAsyncPromise(), {
        loading: "closing position...",
        success: <b>position is being closed! awaiting confirmation...</b>,
        error: <b>Could not close the position...</b>,
      });
      setPositionClosing(positionId);
    } catch (e) {
      console.log("e is ", e);
    } finally {
      setOpen(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(o) => (isLoading ? null : setOpen(o))}
    >
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading} variant={"ghost"} size={"sm"}>
          close
          <XIcon className="ms-2 h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to close this position?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will lose part of your collateral
            and the position will be closed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="hover:bg-destructive-hover bg-destructive"
            // disabled={isLoading}
            disabled
            onClick={closePosition}
          >
            Close position (coming soon)
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClosePositionDialog;
