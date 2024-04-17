"use client";
import { useEthereum } from "@/context/cipMainContext";
import { Button, CipList, GradientItem, JoinCryptoIndex, Note, StakeCip } from "../..";
import React, { useEffect, useState } from "react";
import {
  convertETHTo,
  convertWEITo,
  useDebounce,
  getRoundedvalue,
} from "@/utils/helper";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Eagle_Lake } from "next/font/google";
import BigNumber from "bignumber.js";
import { useSearchParams } from "next/navigation";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Link from "next/link";

// const CryptoJS = require("crypto-js");

const Staking = () => {
  const {
    notifyError,
    notifySuccess,
    notifySuccessWithHash,
    userCurrentAllowance,
    headAddress,
    currentWalletAddress,
    CONTRACT_ADDRESS,
    ABI,
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_ABI,
    _100DAI_CIPamount,
    userCIPBalance,
    nativeToken,
    chainData,
  } = useEthereum();

  // useEffect(() => {
  //   console.log("chainData", chainData.network);

  // }, [chainData])


  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isStakeLoading, setIsStakeLoading] = useState(false);
  const [referral, setReferralAddress] = useState<string | null>("");
  const [userAddress, setUserAddress] = useState("");
  const [userAmount, setUserAmount] = useState(100);
  const [userUplineAddress, setUserUplineAddress] = useState("");
  const [actionState, setActionState] = useState(0);
  const [stakeRoundedAmountInDAIWei, setFinalStakeRoundedAmount] = useState<
    string | number
  >("0");
  const [executeAutoStake, setExecuteAutoStake] = useState(false);
  const maxAllownace =
    "57896044618658097711785492504343953926634992332820282019728792003956564819967";
  const debouncedValuFromUserAmount: any = useDebounce(String(userAmount), 750);
  
  const searchParams = useSearchParams();


  useEffect(() => {
    console.log("searchParams", searchParams.get("referralcode"));
    if (searchParams.get("referralcode") !== null) {
      const refAddress = searchParams.get("referralcode");
      setReferralAddress(refAddress);
    } else {
      setReferralAddress("");
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("referral", referral);
  }, [referral]);


  //!========================================================================== READS
  const { data: stakeAmountCIPinWei } = useContractRead({
    //get CIP amount
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "_getPriceCIP",
    // args: [maxAllownace],
    args: [
      Number(
        debouncedValuFromUserAmount != undefined
          ? debouncedValuFromUserAmount
          : "0"
      ) < 0
        ? "0"
        : convertETHTo(String(debouncedValuFromUserAmount), "wei"),
    ],
    enabled:
      Number(
        debouncedValuFromUserAmount != undefined
          ? debouncedValuFromUserAmount
          : "0"
      ) < 0
        ? false
        : true,
  });

  const { data: finalCIPAmont } = useContractRead({
    //get CIP amount
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "_getPriceCIP",
    // args: [maxAllownace],
    args: [
      Number(
        stakeRoundedAmountInDAIWei != undefined
          ? stakeRoundedAmountInDAIWei
          : "0"
      ) < 0
        ? "0"
        : stakeRoundedAmountInDAIWei,
    ],
    enabled: Number(stakeRoundedAmountInDAIWei) < 0 ? false : true,
  });

  const { data: _diaRecalculated } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "_getPriceDAI",
    args: [String(stakeAmountCIPinWei)],
    watch: true,
  });

  function isAllowanceGiven(_allowedAmount: any, _currentAmount: any) {
    if (Number(_allowedAmount) == 0) {
      return false;
    } else if (Number(_allowedAmount) >= Number(_currentAmount)) {
      return true;
    } else {
      return false;
    }
  }

  const { config: approveConfig } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "approve",
    // args: [CONTRACT_ADDRESS, Number(stakeAmountCIPinWei) > 0 ? stakeAmountCIPinWei : "0"],
    args: [CONTRACT_ADDRESS, maxAllownace],
    account: currentWalletAddress,
    enabled: currentWalletAddress ? true : false,
  });

  const { config: stakeConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "staking",
    args: [
      userAddress ? userAddress : currentWalletAddress,
      (finalCIPAmont ? finalCIPAmont : 0) >= _100DAI_CIPamount
        ? finalCIPAmont
        : _100DAI_CIPamount,
      referral ? referral : userUplineAddress ? userUplineAddress : headAddress,
    ],
    account: currentWalletAddress,
    enabled: currentWalletAddress ? true : false,
  });

  const {
    data: approveData,
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    write: approveWrite,
    status: approveStatus,
    reset: approveReset,
  } = useContractWrite(approveConfig);
  const {
    data: stakeData,
    isLoading: stakeIsLoading,
    isSuccess: stakeIsSuccess,
    write: stakeWrite,
    status: stakeStatus,
    reset: stakeReset,
  } = useContractWrite(stakeConfig);

  useEffect(() => {
    if (approveStatus == "loading") {
      setIsApproveLoading(true);
    }
    if (approveStatus == "success") {
      setIsApproveLoading(true);
    }
    if (approveStatus == "error") {
      notifyError("Transaction Rejected");
      setIsApproveLoading(false);
    }
  }, [approveStatus]);

  useEffect(() => {
    if (stakeStatus == "loading") {
      setIsStakeLoading(true);
    }
    if (stakeStatus == "success") {
      setIsStakeLoading(true);
    }
    if (stakeStatus == "error") {
      notifyError("Transaction Rejected");
      setIsStakeLoading(false);
    }
  }, [stakeStatus]);

  const { data: approveResponse } = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess(data) {
      console.log("final approve succes log", data);
      setIsApproveLoading(false);
      // stakeWrite?.(); //auto stake closed
      // setExecuteAutoStake(true);
      setActionState(1);
      notifySuccess("Approval Done Now Stake Amount");
    },
    onError(data) {
      console.log("final approve error log", data);
      notifyError("Transaction Failed");
      setIsApproveLoading(false);
      // setActionState(0);
      // setExecuteAutoStake(false);
    },
  });

  const { data: stakeResponse } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSuccess(data) {
      console.log("final stake log", data);
      setActionState(1);
      setUserAmount(100);
      setIsStakeLoading(false);
      notifySuccessWithHash("Transaction Confirmed", String(stakeData?.hash));
      // RefetchUserData?.();
    },
    onError(data) {
      console.log("final approve error log", data);
      setIsApproveLoading(false);
      setIsStakeLoading(false);
      notifyError("Transaction Failed");

      // setActionState(0);
    },
  });

  // useEffect(() => {

  //   if (executeAutoStake) {
  //     const timeoutId = setTimeout(() => {

  //       stakeWrite?.();
  //       setExecuteAutoStake(false);
  //     }, 5000); // 5secs
  //     return () => clearTimeout(timeoutId);

  //   }

  // }, [executeAutoStake])

  useEffect(() => {
    if (
      _diaRecalculated != undefined &&
      debouncedValuFromUserAmount != undefined &&
      Number(debouncedValuFromUserAmount) > 0
    ) {
      let data = getRoundedvalue(
        convertETHTo(String(debouncedValuFromUserAmount), "wei"),
        _diaRecalculated
      );
      console.log("test data", data);
      if (Number(data) > 0) {
        setFinalStakeRoundedAmount(data);
      } else {
        setFinalStakeRoundedAmount("0");
      }
    }
  }, [_diaRecalculated, debouncedValuFromUserAmount]);
  //!========================================================================== EFFECTS

  useEffect(() => {
    // setEnableStakeHook(false)
    // console.log("STAKING", maxAllownace);
    if (maxAllownace != undefined && userCurrentAllowance != undefined) {
      console.log("Check Allowance", currentWalletAddress);
      console.log(
        "Check Allowance",
        userCurrentAllowance + "  " + maxAllownace
      );

      console.log(
        "Check Allowance",
        isAllowanceGiven(userCurrentAllowance, maxAllownace)
      );
      if (isAllowanceGiven(userCurrentAllowance, maxAllownace)) {
        setActionState(1);
      } else {
        setActionState(0);
      }
    }
  }, [userCurrentAllowance, approveStatus, stakeStatus]);

  // const handleStakeNow = () => {
  // e.preventDefault();
  // if (!(userAddress && currentWalletAddress) || !userAmount || !(userUplineAddress && headAddress)) {
  //   return
  // }
  // if (Number(userAmount) < 100) {
  //   return
  // }
  //   stakeWrite?.();

  // }
  const handleApproveNow = () => {
    // e.preventDefault();
    if (!currentWalletAddress) {
      notifyError("Please connect wallet");
      return;
    }
    if (Number(userCIPBalance) < Number(finalCIPAmont)) {
      notifyError("You don't have enough CIP Balance");
      return;
    }

    if (!debouncedValuFromUserAmount) {
      notifyError("Please input amount");
      return;
    }
    if (Number(debouncedValuFromUserAmount) < 100) {
      notifyError(`Amount must be at leasst 100 ${nativeToken}`);
      return;
    }
    approveWrite?.();
  };

  const handleStakeNow = () => {
    // e.preventDefault();
    if (!currentWalletAddress) {
      notifyError("Please connect wallet");
      return;
    }
    if (Number(userCIPBalance) < Number(finalCIPAmont)) {
      notifyError("You don't have enough CIP Balance");
      return;
    }

    if (!debouncedValuFromUserAmount) {
      notifyError("Please input amount");
      return;
    }
    if (Number(debouncedValuFromUserAmount) < 100) {
      notifyError(`Amount must be at leasst 100 ${nativeToken}`);
      return;
    }
    stakeWrite?.();
  };
  const redirectToExternalLink = chainData ? `https://app.uniswap.org/swap?chain=${chainData.network}` : "";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-medium py-10">Staking</h2>
        {/* <GradientItem className="bg-neutral-950 text-xs md:text-base"><img src="/icons/cee.svg" className="w-[2em]" alt="Icon" /><span>0X152611166</span></GradientItem> */}
      </div>
      <Note
        className="mb-5"
        icon={BsFillInfoCircleFill}
        iconClass="text-rose-800"
      >
        {
          chainData ?
            <>
              Note: To buy CIP <a href={redirectToExternalLink} target="_blank" className="text-primary font-normal text-base hover:underline">click here</a>
            </>

            :
            "Please connect wallet"
        }
      </Note>
      <div className="grid grid-cols-two gap-4">
        <div>
          <StakeCip
            userAddress={userAddress}
            setUserAddress={setUserAddress}
            userAmount={userAmount}
            setUserAmount={setUserAmount}
            userUplineAddress={userUplineAddress}
            setUserUplineAddress={setUserUplineAddress}
            headAddress={headAddress}
            currentWalletAddress={currentWalletAddress}
            actionState={actionState}
            approveWrite={handleApproveNow}
            stakeWrite={handleStakeNow}
            isStakeLoading={isStakeLoading}
            isApproveLoading={isApproveLoading}
            referral={referral}
          />
        </div>
        <div>
          <CipList
            userAmount={Number(debouncedValuFromUserAmount)}
            finalCIPAmont={finalCIPAmont != undefined ? finalCIPAmont : "0"}
          />
          <JoinCryptoIndex />
        </div>
      </div>
    </div>
  );
};

export default Staking;
