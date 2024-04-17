import React, { useEffect, useState } from "react";
import {
  BoosterTimer,
  ClaimBox,
  ItemBox,
  JoinCryptoIndex,
  Note,
  ReferralLink,
  UPRankCard,
} from "../..";
import { useEthereum } from "@/context/cipMainContext";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Loader from "@/components/misc/Loader";
import { TransactionReceiptNotFoundError } from "viem";
import { Numans } from "next/font/google";

const Ranks = () => {
  const {
    zeroAdd,
    userData,
    CONTRACT_ADDRESS,
    ABI,
    currentWalletAddress,
    estimated_UP_Rank,
    estimatedRank,
    notifySuccess,
    notifySuccessWithHash,
    notifyError,
  } = useEthereum();
  const _currentRank =
    userData && userData.length > 0 ? Number(userData[8]) : 0; // index 8 = rank, index 9 = up rank
  const _currentUPRank =
    userData && userData.length > 0 ? Number(userData[9]) : 0;
  const _estimatedRank = Number(estimatedRank && estimatedRank) || 0;
  const _estimated_UP_Rank =
    Number(estimated_UP_Rank && estimated_UP_Rank) || 0; //claimUniversalPoolRank
  // const _estimatedRank = 0; // claimRank
  // const _estimated_UP_Rank = 0;

  const RANKS = [
    "No Rank",
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Sun",
  ];
  const UPRANKS = ["No Rank", "Gold", "Diamond", "Platinum", "Kohinoor"];

  const [loaderMsg, setLoaderMsg] = useState("loading...");
  const [rankLoader, setRankLoader] = useState(false);
  const [loaderUPRank, setUPRankLoader] = useState(false);

  const { config: claimRankConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "claimRank",
    args: [currentWalletAddress],
    account: currentWalletAddress,
    enabled: currentWalletAddress ? true : false,
  });

  const { config: claimUPRankConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "claimUniversalPoolRank",
    args: [currentWalletAddress],
    account: currentWalletAddress,
    enabled: currentWalletAddress ? true : false,
  });

  const {
    data: claimRankData,
    isLoading: claimRankIsLoading,
    isSuccess: claimRankIsSuccess,
    write: claimRankWrite,
    status: claimRankStatus,
    reset: claimRankReset,
  } = useContractWrite(claimRankConfig);

  const {
    data: claimUPRankData,
    isLoading: claimUPRankIsLoading,
    isSuccess: claimUPRankIsSuccess,
    write: claimUPRankWrite,
    status: claimUPRankStatus,
    reset: claimUPRankReset,
  } = useContractWrite(claimUPRankConfig);

  useEffect(() => {
    if (claimRankStatus == "loading") {
      // setLoaderMsg("confirm transaction...")
      setRankLoader(true);
    }
    if (claimRankStatus == "success") {
      // setLoaderMsg("Updating your rank...")
      setRankLoader(true);
    }
    if (claimRankStatus == "error") {
      notifyError("Transaction Rejected");
      setRankLoader(false);
      // setLoaderMsg("")
    }
  }, [claimRankStatus]);

  useEffect(() => {
    if (claimUPRankStatus == "loading") {
      // setLoaderMsg("confirm transaction...")
      setUPRankLoader(true);
    }
    if (claimUPRankStatus == "success") {
      // setLoaderMsg("Updating your Universal Pool rank...")
      setUPRankLoader(true);
    }
    if (claimUPRankStatus == "error") {
      notifyError("Transaction Rejected");
      setUPRankLoader(false);
      // setLoaderMsg("")
    }
  }, [claimUPRankStatus]);

  const { data: claimRankResponse } = useWaitForTransaction({
    hash: claimRankData?.hash,
    onSuccess(data) {
      console.log("final claimRank log", data);
      notifySuccessWithHash("Transaction Confirmed", String(claimRankData?.hash));
      setRankLoader(false);
      // setLoaderMsg("")
    },
    onError(data) {
      console.log("final claimRank log", data);
      notifyError("Transaction Failed");
      setRankLoader(false);
      // setLoaderMsg("")
    },
  });

  const { data: claimUPRankResponse } = useWaitForTransaction({
    hash: claimUPRankData?.hash,
    onSuccess(data) {
      console.log("final claimUPRank log", data);
      notifySuccessWithHash("Transaction Confirmed", String(claimUPRankData?.hash));
      setUPRankLoader(false);
      // setLoaderMsg("")
    },
    onError(data) {
      console.log("final claimUPRank log", data);
      notifyError("Transaction Failed");
      setUPRankLoader(false);
      // setLoaderMsg("")
    },
  });

  useEffect(() => {
    console.log("current Ranks", _currentRank);
    console.log("estimatedRank", Number(estimatedRank));
    console.log("current Universal Pool Ranks", _currentUPRank);
    console.log("estimated_UP_Rank", Number(estimated_UP_Rank));
  }, [estimated_UP_Rank, estimatedRank]);

  //!==================================================================
  const items = [
    {
      icon: "/icons/chart.svg",
      label: "Current Rank",
      value: String(RANKS[_currentRank]),
    },
    {
      icon: "/icons/chart.svg",
      label: "Current Universal Pool Rank",
      value: String(UPRANKS[_currentUPRank]),
    },
  ];

  // const items2 = [
  //   {
  //     icon: "/icons/chart.svg",
  //     label: "Estimated Rank",
  //     value: String(RANKS[_estimatedRank]),
  //   },
  //   {
  //     icon: "/icons/chart.svg",
  //     label: "Estimated Universal Pool Rank",
  //     value: String(UPRANKS[_estimated_UP_Rank]),
  //   },
  // ];
  return (
    <div id="affiliate_details">
      <h2 className="text-2xl font-medium py-8">Ranks</h2>
      {_currentRank < _estimatedRank || _currentUPRank < _estimated_UP_Rank ? (
        <Note className="mb-5">
          <img src="/icons/warning.svg" alt="" /> Note: Claim to upgrade your
          rank!
        </Note>
      ) : null}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-4">
          {items.map(({ icon, label, value }, index) => {
            return (
              <div key={index} className="col-span-2 sm:col-span-1">
                <ItemBox icon={icon} label={label} value={value} />
              </div>
            );
          })}
          <div className="col-span-2 sm:col-span-1">
            <ClaimBox
              key="0"
              icon="/icons/chart.svg"
              label="Estimated Rank"
              value={String(RANKS[_estimatedRank])}
              loading={rankLoader}
              showClaim={_currentRank < _estimatedRank ? true : false}
              writeHandle={claimRankWrite}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <ClaimBox
              key="1"
              icon="/icons/chart.svg"
              label="Estimated Universal Pool Rank"
              value={String(UPRANKS[_estimated_UP_Rank])}
              loading={loaderUPRank}
              showClaim={_currentUPRank < _estimated_UP_Rank ? true : false}
              writeHandle={claimUPRankWrite}
            />
          </div>
        </div>
        <div className="row-start-1 lg:row-start-auto">
          <BoosterTimer />
        </div>
      </div>
    </div>
  );
};

export default Ranks;
