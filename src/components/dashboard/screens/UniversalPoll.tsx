import React, { useEffect, useState } from "react";
import { ItemBox, JoinCryptoIndex, ReferralLink, UPRankCard } from "../..";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useEthereum } from "@/context/cipMainContext";
import { Button } from "flowbite-react";

const UniversalPoll = () => {

  const { currentWalletAddress, CONTRACT_ADDRESS, ABI, estimatedRank,
    estimated_UP_Rank, } = useEthereum();

  const [rank, setRank] = useState("No Rank")
  const [upRank, setUpRank] = useState("No Rank")

  useEffect(() => {
    let _estimated_UP_Rank = Number(estimated_UP_Rank)
    if (_estimated_UP_Rank == 0) {
      setUpRank("No rank")
    } else if (_estimated_UP_Rank == 1) {
      setUpRank("Gold")
    } else if (_estimated_UP_Rank == 2) {
      setUpRank("Dimond")
    }
    else if (_estimated_UP_Rank == 3) {
      setUpRank("Platinium")
    }
    else if (_estimated_UP_Rank == 4) {
      setUpRank("Kohinoor")
    }



  }, [estimated_UP_Rank])

  useEffect(() => {
    let _estimatedRank = Number(estimatedRank)
    if (_estimatedRank == 0) {
      setRank("No rank")
    } else if (_estimatedRank == 1) {
      setRank("Mercury")
    } else if (_estimatedRank == 2) {
      setRank("Venus")
    }
    else if (_estimatedRank == 3) {
      setRank("Earth")
    }
    else if (_estimatedRank == 4) {
      setRank("Mars")
    }
    else if (_estimatedRank == 5) {
      setRank("Jupiter")
    }
    else if (_estimatedRank == 6) {
      setRank("Sun")
    }



  }, [estimatedRank])


  const items = [
    {
      icon: "/icons/chart.svg",
      label: "Current Rank",
      value: rank ? rank : "--",
    },
    {
      icon: "/icons/chart.svg",
      label: "Universal Pool Rank",
      value: upRank ? upRank : "--",

    },
  ];



  const { config: claimRankconfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'claimRank',
    args: [currentWalletAddress],
    enabled: currentWalletAddress ? true : false
  })
  const { config: claimUPconfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'claimUniversalPoolRank',
    args: [currentWalletAddress],
    enabled: currentWalletAddress ? true : false
  })

  const { data: claimRankData, isLoading: claimRankIsLoading, isSuccess: claimRankIsSuccess, write: claimRankWrite, status: claimRankStatus } = useContractWrite(claimRankconfig);
  const { data: claimUPRankData, isLoading: claimUPRankIsLoading, isSuccess: claimUPRankIsSuccess, write: claimUPRankWrite, status: claimUPRankStatus } = useContractWrite(claimUPconfig);


  return (
    <div id="affiliate_details">
      <h2 className="text-2xl font-medium py-8">Universal Poll</h2>
      <div className="grid grid-cols-4 gap-4">
        {items.map(({ icon, label, value }, index) => {
          return (
            <ItemBox key={index} icon={icon} label={label} value={value} />
          );
        })}
        <Button onClick={(e: any) => {
          claimRankWrite?.()
        }}> Claim Rank

          {/* <Loader isLoading={true} /> */}

        </Button>
        <Button onClick={(e: any) => {
          claimUPRankWrite?.()
        }}> Claim Universal Pool Rank

          {/* <Loader isLoading={true} /> */}

        </Button>

      </div>
    </div>
  );
};

export default UniversalPoll;
