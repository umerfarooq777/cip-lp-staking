import { useEffect, useState } from "react";
import { Button, GradientItem, Input, Loader } from "..";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useEthereum } from "@/context/cipMainContext";
import { convertETHTo, convertWEITo, numberWithCommas } from "@/utils/helper";

const BonusWithdrawalCard = () => {
  const {
    currentWalletAddress,
    CONTRACT_ADDRESS,
    ABI,
    userBonusData,
    notifySuccess,
    notifySuccessWithHash,
    notifyError,
    nativeToken,
    nativeTokenSymbol
  } = useEthereum();
  const [userAmount, setUserAmount] = useState("");
  // const [enableWithdraw, setEnableWithdraw] = useState(false);
  const [loader, setLoader] = useState(false);
  const availableBonus = userBonusData ? userBonusData[8] : "0"
  const { config: withdrawBonusConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "withdrawal",
    args: [
      Number(userAmount) >= 10 ? convertETHTo(String(userAmount), "wei") : "0",
    ],
    account: currentWalletAddress && currentWalletAddress,
    enabled: Number(userAmount) >= 10 ? true : false,
  });

  const {
    data: withdrawBonusData,
    isLoading: withdrawBonusIsLoading,
    isSuccess: withdrawBonusIsSuccess,
    write: withdrawBonusWrite,
    status: withdrawBonusStatus,
    reset: withdrawBonusReset,
  } = useContractWrite(withdrawBonusConfig);

  useEffect(() => {
    if (withdrawBonusStatus == "loading") {
      // setLoaderMsg("confirm transaction...");
      setLoader(true);
    }
    if (withdrawBonusStatus == "success") {
      // setLoaderMsg("Updating friends Universal Pool Rank...");
      setLoader(true);
    }
    if (withdrawBonusStatus == "error") {
      notifyError("Transaction Rejected");
      setLoader(false);
      // setLoaderMsg("");
    }
  }, [withdrawBonusStatus]);

  const { data: withdrawBonusResponse } = useWaitForTransaction({
    hash: withdrawBonusData?.hash,
    onSuccess(data) {
      console.log("final withdrawBonus log", data);
      notifySuccessWithHash(
        "Transaction Confirmed",
        String(withdrawBonusData?.hash)
      );
      setLoader(false);
      // setLoaderMsg("");
    },
    onError(data) {
      console.log("final withdrawBonus log", data);
      notifyError("Transaction Failed");
      setLoader(false);
      // setLoaderMsg("");
    },
  });

  const handleWithdraw = () => {
    if (!(parseFloat(convertWEITo(String(availableBonus), "ether")) >= 10)) {
      notifyError(`Available bonus must be at least 10 ${nativeToken}`);
      return;
    }
    if (!userAmount || userAmount == "") {
      notifyError("Please insert amount");
      return;
    }
    if (Number(userAmount) < 10) {
      notifyError(`Amount must be at least 10 ${nativeToken}`);
      return;
    }
    if (parseFloat(userAmount) > parseFloat(convertWEITo(String(availableBonus), "ether"))) {
      notifyError("Can't exceed available bonus");
      return;
    }
    withdrawBonusWrite?.();
  };

  return (
    <article className="bg-neutral-900 rounded-lg w-full h-full">
      <div className="p-5">
        <img src="/icons/connections.svg" className="mb-5" alt="" />
        <small className="text-neutral-500 font-medium text-base">
          Available Bonus
        </small>

        <h3 className="font-semibold text-2xl pt-1 md:pt-2 flex gap-3 items-center mb-4">
          {userBonusData ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(String(userBonusData[8]), "ether"))}`
            : "$ 00.00"}
        </h3>
      </div>
      <hr className="border-b-1 border-neutral-800" />
      <div className="p-5">
        <small className="text-neutral-500 font-medium text-base">
          Amount To Be Withdrawl
        </small>
        <Input
          solidBg
          type="number"
          min={0}
          className="mt-3 mb-5"
          placeholder="Withdrawal $ in CIP"
          icon="/icons/simple-cee.svg"
          value={userAmount}
          noCopy
          onChange={(e: any) => {
            setUserAmount(e?.target?.value);
          }}
        />

        {loader ? (
          <Button className="w-full text-sm" disabled>
            <Loader isLoading={loader} msg="" />
          </Button>
        ) : (
          <Button className="w-full text-sm" onClick={handleWithdraw}>
            Withdraw Bonus
          </Button>
        )}
      </div>
    </article>
  );
};

export default BonusWithdrawalCard;
