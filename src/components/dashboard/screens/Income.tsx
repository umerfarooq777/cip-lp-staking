import React, { useEffect, useState } from "react";
import { BoosterTimer, ItemBox, Button, Loader } from "../..";
import { useEthereum } from "@/context/cipMainContext";
import {
  convertToPlainNumber,
  convertWEITo,
  convertWEITo_ForROI,
  getBignumber,
  getTransactionEstimateGasPrice,
  numberWithCommas,
} from "@/utils/helper";
import {
  deserialize,
  serialize,
  useContractWrite,
  useFeeData,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers, formatEther, parseEther } from "ethers";
// import BigNumber from "bignumber.js";

const Income = () => {
  // console.log("Bignumber", getBignumber("10000000"));

  const {
    CONTRACT_ADDRESS,
    ABI,
    currentWalletAddress,
    notifySuccess,
    notifySuccessWithHash,
    notifyError,
    userBonusData,
    userEarnedData,
    nativeTokenSymbol,
    userCurrentCIPBalance,
    userData,
  } = useEthereum();

  const [estimateGasFee, setEstimateGasFee] = useState("10000000");



  const [loaderMsg, setLoaderMsg] = useState("loading...");
  const [roiWithdrawLoader, setRoiWithdrawLoader] = useState(false);

  const { data: useFeeDataTest, isError, isLoading } = useFeeData();

  const getEstimateGasPrice = async () => {
    if (currentWalletAddress) {

      let priceData = await getTransactionEstimateGasPrice({
        from: currentWalletAddress,
        to: CONTRACT_ADDRESS,
        data: "0xe039b945",
      });
      setEstimateGasFee(String(priceData))
    }
    // console.log("priceData", priceData);
  }





  const { config: roiWithdrawConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "rewardWithdrawal",
    account: currentWalletAddress,
    enabled: currentWalletAddress ? true : false,
    gas: deserialize(estimateGasFee)
  });

  const {
    data: roiWithdrawData,
    isLoading: roiWithdrawIsLoading,
    isSuccess: roiWithdrawIsSuccess,
    write: roiWithdrawWrite,
    status: roiWithdrawStatus,
    reset: roiWithdrawReset,
  } = useContractWrite(roiWithdrawConfig);

  useEffect(() => {
    if (roiWithdrawStatus == "loading") {
      setLoaderMsg("confirm transaction...");
      setRoiWithdrawLoader(true);
    }
    if (roiWithdrawStatus == "success") {
      setLoaderMsg("Withdrawing ROI...");
      setRoiWithdrawLoader(true);
    }
    if (roiWithdrawStatus == "error") {
      setRoiWithdrawLoader(false);
      notifyError("Transaction Rejected");
      setLoaderMsg("");
    }
  }, [roiWithdrawStatus]);

  const { data: roiWithdrawResponse } = useWaitForTransaction({
    hash: roiWithdrawData?.hash,
    onSuccess(data) {
      console.log("final roiWithdraw log", data);
      notifySuccessWithHash("Transaction Confirmed", String(roiWithdrawData?.hash));
      setRoiWithdrawLoader(false);
      setLoaderMsg("");
    },
    onError(data) {
      notifyError("Transaction Failed");
      console.log("final roiWithdraw log", data);
      setRoiWithdrawLoader(false);
      setLoaderMsg("");
    },
  });

  //!==========================================================
  const [ROI, setROI] = useState("00.00");
  const [levelIncom, setLevelIncom] = useState("00.00");
  const [currentRank, setCurrentRak] = useState("No Rank");
  const [rankBonus, setRankBonus] = useState("00.00");

  useEffect(() => {
    if (userData && userData.length > 0) {
      let _currentRank = Number(userData[8]);
      if (_currentRank == 0) {
        setCurrentRak("No Rank");
      } else if (_currentRank == 1) {
        setCurrentRak("Mercury");
      } else if (_currentRank == 2) {
        setCurrentRak("Venus");
      } else if (_currentRank == 3) {
        setCurrentRak("Earth");
      } else if (_currentRank == 4) {
        setCurrentRak("Mars");
      } else if (_currentRank == 5) {
        setCurrentRak("Jupiter");
      } else if (_currentRank == 6) {
        setCurrentRak("Sun");
      }
    }
  }, [userData]);

  useEffect(() => {
    if (userBonusData && userBonusData.length > 0) {
      setLevelIncom(convertWEITo(String(userBonusData[2]), "ether"));
      setRankBonus(convertWEITo(String(userBonusData[3]), "ether"));
    }
    if (
      userBonusData &&
      userBonusData.length > 0 &&
      userEarnedData &&
      userEarnedData.length > 0
    ) {
      let tempRoi = Number(userEarnedData[0]) + Number(userBonusData[1]); // earned roi + roi bonus
      tempRoi = convertToPlainNumber(tempRoi);
      setROI(convertWEITo(tempRoi, "ether"));
    }
  }, [userBonusData, userEarnedData]);

  const items = [
    {
      icon: "/icons/dollar-swap.svg",
      label: "Total ROI",
      value: `$ ${numberWithCommas(ROI)}`,
    },
    {
      icon: "/icons/cee.svg",
      label: "Withdrawn ROI",
      value: `${userBonusData
        ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userBonusData[1], "ether"))}`
        : "$ 00.00"
        }`,
    },
  ];

  const handleWithdrawROI = async () => {
    if (!currentWalletAddress) {
      notifyError("Please connect wallet")
      return
    }

    await getEstimateGasPrice()

    roiWithdrawWrite?.();

  }
  return (
    <div id="affiliate_details">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium py-8">Income</h2>
        {/* {roiWithdrawLoader ? (
          <Button
            className="w-auto text-sm font-semibold"
            disabled={roiWithdrawLoader}
          >
            <Loader isLoading={roiWithdrawLoader} msg="" />
          </Button>
        ) : (
          <Button
            className="w-auto text-sm font-semibold"
            disabled={roiWithdrawLoader}
            onClick={(e: any) => {
              roiWithdrawWrite?.();
            }}
          >
            ROI Withdrawal
          </Button>
        )} */}

        {/* <Button className="w-auto text-sm font-semibold"

          onClick={getEstimateGasPrice} >
          ROI test
        </Button> */}
      </div>

      <div className="grid grid-cols-two gap-4">
        <div className="grid grid-cols-two gap-4">
          {items.map(({ icon, label, value }, index) => {
            return <ItemBox key={index} icon={icon} label={label} value={value} />;
          })}
        </div>
        <div>

          <div className="mb-4">
            <ItemBox
              key="4"
              icon="/icons/cee.svg"
              label="Available ROI"
              value={userEarnedData ? `${nativeTokenSymbol} ${numberWithCommas(
                convertWEITo_ForROI(userEarnedData[0], "ether")
              )}` : "$ 00.00"}
              buttonProps={{
                children: "Withdraw ROI",
                className: "w-auto text-sm font-semibold",
                disabled: !currentWalletAddress || !userEarnedData || roiWithdrawLoader,
                onClick: handleWithdrawROI,
                isLoading: roiWithdrawLoader,
              }}
            />
          </div>

          <ItemBox
            icon="/icons/dollar.svg"
            label="My Investment"
            value={userData && userData.length > 0
              ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userData[3], "ether"))}`
              : "$ 00.00"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Income;
