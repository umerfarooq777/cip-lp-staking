"use client";

import React, { useEffect, useState } from "react";
import {
  ItemBox,
  JoinCryptoIndex,
  Note,
  ReferralLink,
  UPRankCard,
} from "../..";
import { useEthereum } from "@/context/cipMainContext";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { convertWEITo, convertWEITo_ForROI, numberWithCommas } from "../../../utils/helper"
const StakingDetails = () => {
  const {
    userData,
    userBonusData,
    userEarnedData,
    nativeTokenSymbol,
    currentWalletAddress,
  } = useEthereum();
  const items = [
    {
      icon: "/icons/dollar-swap.svg",
      label: "Staked Amount",
      value: userData ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userData[3], "ether"))}` : "$ 00.00",
    },
    {
      icon: "/icons/dollar-sack.svg",
      label: "Direct Staked Amount",
      value: userData ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userData[5], "ether"))}` : "$ 00.00",
    },
    {
      icon: "/icons/cee.svg",
      label: "Team Staked Amount",
      value: userData ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userData[4], "ether"))}` : "$ 00.00",
    },
    // {
    //   icon: "/icons/dollar-swap.svg",
    //   label: "Withdrawn ROI",
    //   value: "$ 00.00",
    // },
    // {
    //   icon: "/icons/cee.svg",
    //   label: "Available ROI",
    //   value: "$ 00.00",
    // },
  ];

  // console.log("contract data", requestData);

  // console.log(userData);

  //userId   uint256 :  1696435080
  // firstTimeStaked   uint256 :  500000000000000000004
  // principleStaked   uint256 :  500000000000000000004
  // selfTotalStaked   uint256 :  500000000000000000004
  // teamTotalStaked   uint256 :  15000000000000000000004
  // directTotalStaked   uint256 :  15000000000000000000004
  
  // paidSecond   uint256 :  0
  // currentRankId   uint256 :  4
  // universalPoolRankId   uint256 :  0
  // lastUpdateTime   uint256 :  1696435080

  // roiUnSettled   uint256 :  0
  // roiBonus   uint256 :  0
  // referralBonus   uint256 :  71820175438590240
  // rankBonus   uint256 :  0
  // universalPoolBonus   uint256 :  0
  // totalCreditedBonus   uint256 :  71820175438590240
  // principleCap   uint256 :  71820175438590240
  // totalWithdrawalBonus   uint256 :  0
  // totalAvailableBonus   uint256 :  71820175438590240

  return (
    <div id="affiliate_details">
      <h2 className="text-2xl font-medium py-8">Staking Details</h2>
      {!currentWalletAddress ? (
        <Note
          className="mb-5"
          icon={BsFillInfoCircleFill}
          iconClass="text-rose-800"
        >
          Note: Please connect your wallet
        </Note>
      ) : null}
      <div className="grid grid-cols-four gap-4">
        {/* {
          userData ? <>
            <ItemBox key="0" icon="/icons/dollar-swap.svg" label="Staked Amount" value={`${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userData[3], "ether"))}`} />
            <ItemBox key="1" icon="/icons/dollar-sack.svg" label="Direct Staked Amount" value={`${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userData[5], "ether"))}`} />
            <ItemBox key="2" icon="/icons/cee.svg" label="Team Staked Amount" value={`${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userData[4], "ether"))}`} />
          </>
            : null
        } */}
        {/* {
          userBonusData ? <>
            <ItemBox key="3" icon="/icons/cee.svg" label="Withdrawn ROI" value={`${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userBonusData[1], "ether"))}`} />
          </>
            : null
        }
        {
          userEarnedData ? <>
            <ItemBox key="4" icon="/icons/cee.svg" label="Available ROI" value={`${nativeTokenSymbol} ${numberWithCommas(convertWEITo_ForROI(userEarnedData[0], "ether"))}`} />
          </>
         : null} */}

        {items.map(({ icon, label, value }, index) => {
          return (
            <ItemBox key={index} icon={icon} label={label} value={value} />
          );
        })}
      </div>
    </div>
  );
};

export default StakingDetails;
