import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
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
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { testABI } from "~/hooks/wagmi/config";
import { contractAddress } from "~/utils/constants";

const ClosePositionDialog = ({ positionId }: { positionId: `0x${string}` }) => {
  // ------------------ contract close logic ------------------

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: testABI,
    functionName: "closePosition",
    // positionId
    args: [positionId],
  });
  const { writeAsync, isLoading: isPreparing } = useContractWrite(config);

  // ------------------  ------------------
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button disabled={isPreparing} variant={"ghost"} size={"sm"}>
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
          <AlertDialogAction
            disabled={isPreparing}
            onClick={async () => {
              await writeAsync?.();
            }}
          >
            Close position
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClosePositionDialog;
