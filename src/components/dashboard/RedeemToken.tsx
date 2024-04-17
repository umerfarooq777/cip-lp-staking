import { useEthereum } from "@/context/cipMainContext";
import { Button, Input, Loader } from "..";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { convertWEITo, numberWithCommas } from "@/utils/helper";

const RedeemToken = () => {
  const {
    zeroAdd,
    userData,
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_ABI,
    currentWalletAddress,
    TOKEN_CONTRACT_ADDRESS_OLD,
    TOKEN_ABI_OLD,
    notifySuccess,
    notifySuccessWithHash,
    notifyError

  } = useEthereum();

  const [loaderMsg, setLoaderMsg] = useState("loading...");
  const [isAllowanceGiven, setIsAllowanceGiven] = useState(false);
  const [redeemLoader, setRedeemLoader] = useState(false);
  const [approveLoader, setApproveTokenLoader] = useState(false);

  const { data: userCIPoldBalance } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS_OLD,
    abi: TOKEN_ABI_OLD,
    functionName: "balanceOf",
    args: [currentWalletAddress],
    watch: true,
    enabled: currentWalletAddress ? true : false,
  });

  const { data: useroldCIPAllowance } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS_OLD,
    abi: TOKEN_ABI_OLD,
    functionName: "allowance",
    args: [currentWalletAddress, TOKEN_CONTRACT_ADDRESS],
    watch: true,
    enabled: currentWalletAddress ? true : false,
  });

  const { config: redeemConfig } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "redeemTokens",
    account: currentWalletAddress,
  });

  const {
    data: redeemData,
    isLoading: redeemIsLoading,
    isSuccess: redeemIsSuccess,
    write: redeemWrite,
    status: redeemStatus,
    reset: redeemReset,
  } = useContractWrite(redeemConfig);

  useEffect(() => {
    if (redeemStatus == "loading") {
      // setLoaderMsg("confirm transaction...");
      setRedeemLoader(true);
    }
    if (redeemStatus == "success") {
      // setLoaderMsg("Updating friends Universal Pool Rank...");
      setRedeemLoader(true);
    }
    if (redeemStatus == "error") {
      notifyError("Transaction Rejected")
      setRedeemLoader(false);
      // setLoaderMsg("");
    }
  }, [redeemStatus]);

  const { data: redeemResponse } = useWaitForTransaction({
    hash: redeemData?.hash,
    onSuccess(data) {
      console.log("final redeem log", data);
      notifySuccessWithHash("Transaction Confirmed", String(redeemData?.hash))
      setRedeemLoader(false);
      // setLoaderMsg("");
    },
    onError(data) {
      console.log("final redeem log", data);
      notifyError("Transaction Failed")
      setRedeemLoader(false);
      // setLoaderMsg("");
    },
  });

  //!===========================================
  const { config: approveTokenConfig } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS_OLD,
    abi: TOKEN_ABI_OLD,
    functionName: "approve",
    args: [TOKEN_CONTRACT_ADDRESS, userCIPoldBalance ? userCIPoldBalance : "0"],
    account: currentWalletAddress,
    enabled: currentWalletAddress ? true : false,
  });

  const {
    data: approveTokenData,
    isLoading: approveTokenIsLoading,
    isSuccess: approveTokenIsSuccess,
    write: approveTokenWrite,
    status: approveTokenStatus,
    reset: approveTokenReset,
  } = useContractWrite(approveTokenConfig);

  useEffect(() => {
    if (approveTokenStatus == "loading") {
      // setLoaderMsg("confirm transaction...");
      setApproveTokenLoader(true);
    }
    if (approveTokenStatus == "success") {
      // setLoaderMsg("Updating friends Universal Pool Rank...");
      setApproveTokenLoader(true);
    }
    if (approveTokenStatus == "error") {
      notifyError("Transaction Rejected")
      setApproveTokenLoader(false);
      // setLoaderMsg("");
    }
  }, [approveTokenStatus]);

  const { data: approveTokenResponse } = useWaitForTransaction({
    hash: approveTokenData?.hash,
    onSuccess(data) {
      console.log("final approveToken log", data);
      notifySuccess("Approval done, Now Redeem Tokens")
      setIsAllowanceGiven(true)
      // redeemWrite?.();
      setApproveTokenLoader(false);
      // setLoaderMsg("");
    },
    onError(data) {
      console.log("final approveToken log", data);
      notifyError("Transaction Failed")
      setApproveTokenLoader(false);
      // setLoaderMsg("");
    },
  });

  useEffect(() => {
    if (useroldCIPAllowance != undefined && userCIPoldBalance != undefined) {
      if (Number(useroldCIPAllowance) >= Number(userCIPoldBalance)) {
        setIsAllowanceGiven(true);
      } else {
        setIsAllowanceGiven(false);
      }
    }
  }, [useroldCIPAllowance]);

  return (
    <>
      {userCIPoldBalance && Number(userCIPoldBalance) > 0 ? (
        <article className="bg-neutral-900 rounded-lg p-5 w-full">
          <img src="/icons/connections.svg" className="mb-5" alt="" />
          <small className="text-neutral-500 font-medium text-sm md:text-base">
            Redeem Tokens
          </small>
          <div className="flex items-start lg:items-center flex-col lg:flex-row  mt-4 gap-4">
            <Input
              defaultValue={
                userCIPoldBalance
                  ? numberWithCommas(convertWEITo(String(userCIPoldBalance), "ether"))
                  : "0"
              }
              placeholder="00.00"
              className="ring-2 ring-primary ring-opacity-40 md:text-base text-sm"
              readOnly
              disabled
            />
            {isAllowanceGiven ? (
              redeemLoader ? (
                <Button className="lg:w-auto w-full  text-sm lg:py-4 py-3 font-semibold whitespace-nowrap h-full">
                  <Loader isLoading={redeemLoader} msg="" />
                </Button>
              ) : (
                <Button
                  className="lg:w-auto w-full  text-sm lg:py-4 py-3 font-semibold whitespace-nowrap h-full"
                  onClick={redeemWrite}
                >
                  Now Redeem Tokens
                </Button>
              )
            ) : approveLoader ? (
              <Button className="w-auto text-sm py-4 font-semibold whitespace-nowrap h-full">
                <Loader isLoading={approveLoader} msg="" />
              </Button>
            ) : (
              <Button
                className="w-auto text-sm py-4 font-semibold whitespace-nowrap h-full"
                onClick={approveTokenWrite && approveTokenWrite}
              >
                Approve & Redeem Tokens
              </Button>
            )}
          </div>
        </article>
      ) : null}
    </>
  );
};

export default RedeemToken;
