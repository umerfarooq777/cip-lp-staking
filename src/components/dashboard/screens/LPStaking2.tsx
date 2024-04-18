import { Button, Input, Note } from "@/components";
import { useEthereum } from "@/context/cipMainContext";
import { convertWEITo, convertWEITo_ForROI, numberWithCommas, useDebounce } from "@/utils/helper";
import { ZeroAddress, ethers } from "ethers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { decode } from "base-64";
import SmLoader from "@/components/misc/SmLoader";
import { BsFillInfoCircleFill } from "react-icons/bs";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const LPStaking2 = () => {
  const {
    currentWalletAddress,
    userLPData,
    userLPDataLoading,
    LP_STAKING_CONTRACT_ADDRESS,
    LP_STAKING_CONTRACT_ABI,
    notifyError,
    notifySuccessWithHash,
    LP_NFT_CONTRACT_ADDRESS,
    LP_NFT_CONTRACT_ABI,
    getUserLPTokenData: refetchNFTData,
    headAddress,
    TEST_MODE,
    lpReferralAddress,
    isValidRefAddress,
    isSelfRef,
  } = useEthereum();

  

  useEffect(() => {
    console.log("lpreferralcode", { lpReferralAddress });
  }, [lpReferralAddress]);



  // ==================================== STAKED TVL DETAILS =================================

  // const { data: _tvlData } = useContractRead({
  //   address: LP_STAKING_CONTRACT_ADDRESS,
  //   abi: LP_STAKING_CONTRACT_ABI,
  //   functionName: "getTVL",
  //   watch: true,
  // });

  // const [totalStakedValue, settotalStakedValue] = useState<string>("0");

  // useEffect(() => {
  //   // console.log("_tvlData", _tvlData);
  //   if (_tvlData !== undefined)
  //     settotalStakedValue(convertWEITo(String(_tvlData), "ether"));
  // }, [_tvlData]);
  // ==================================== TOTAL STAKED NFTs  =================================

  const { data: totalLPsData } = useContractRead({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "getTotalLPs",
    watch: true,
  });

  const [stakedNfts, setstakedNfts] = useState<string>("0");

  useEffect(() => {
    // console.log("totalLPsData", totalLPsData);
    if (totalLPsData !== undefined) setstakedNfts(String(totalLPsData));
  }, [totalLPsData]);

  // ==================================== APR DETAILS =================================

  const { data: currentAprData } = useContractRead({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "getAPR",
    watch: true,
  });
const [isUserRegistered, setisUserRegistered] = useState(false)
const [userDirectRewards, setUserDirectRewards] = useState("0")
  const { data: userLpDetails } = useContractRead({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "getUserDetails",
    args:[currentWalletAddress],    
    watch: true,
    enabled:currentWalletAddress?true:false,
  });
  useEffect(() => {
    
    console.log("userLpDetails",userLpDetails)
    if (userLpDetails !== undefined) {
      setisUserRegistered((userLpDetails as any).isRegistered);
      setUserDirectRewards(convertWEITo(String((userLpDetails as any).directRewards),"ether"));
    }
  }, [userLpDetails]);

  // useEffect(() => {
  //   console.log("currentAprData", currentAprData);
  // }, [currentAprData]);


  const { data: totalNFTs } = useContractRead({
    address: LP_NFT_CONTRACT_ADDRESS,
    abi: LP_NFT_CONTRACT_ABI,
    functionName: "_nextTokenId",
    watch: true,
    enabled: TEST_MODE

  });

  const [totalNFTsMinted, settotalNFTsMinted] = useState<string>("0");


  useEffect(() => {
    // console.log("totalNFTs", totalNFTs);
    if (totalNFTs !== undefined) settotalNFTsMinted(String(totalNFTs))


  }, [totalNFTs]);


  //==================================== MINT TOKEN ID =================================
  const [mintNewNftLoader, setmintNewNftLoader] = useState(false)
  const { config: mintNewNftConfig } = usePrepareContractWrite({
    address: LP_NFT_CONTRACT_ADDRESS,
    abi: LP_NFT_CONTRACT_ABI,
    functionName: "safeMint",
    account: currentWalletAddress,
    enabled: TEST_MODE
  });

  const {
    data: mintNewNftData,

    write: mintNewNftWrite,
    status: mintNewNftStatus,
  } = useContractWrite(mintNewNftConfig);

  useEffect(() => {
    if (mintNewNftStatus == "loading") {
      setmintNewNftLoader(true);
    }
    if (mintNewNftStatus == "success") {
      setmintNewNftLoader(true);
    }
    if (mintNewNftStatus == "error") {
      setmintNewNftLoader(false);
      notifyError("Transaction Rejected");
    }
  }, [mintNewNftStatus]);

  const { data: mintNewNftResponse } = useWaitForTransaction({
    hash: mintNewNftData?.hash,
    onSuccess(data: any) {
      console.log("final mintNewNft log", data);
      // setIsApprove(true)
      notifySuccessWithHash("Transaction Confirmed", String(mintNewNftData?.hash));
      setmintNewNftLoader(false);
      refetchNFTData(currentWalletAddress)
    },
    onError(data: any) {
      notifyError("Transaction Failed");
      console.log("final mintNewNft log", data);
      setmintNewNftLoader(false);
    },
  });



  return (
    <>
      <h2 className="text-2xl font-medium py-8">LP Staking</h2>
      <div className="grid grid-cols-four gap-4">
        {/* ============== box 1 ============== */}
        <article className="bg-black-700 rounded-lg p-5 w-full">
          <div className="flex items-center justify-between">
            <div className="flex sm:flex-row flex-col mb-2 sm:mb-0 sm:gap-1">
              <div className="flex">
                <Image
                  src="/icons/eth.png"
                  width={30}
                  height={30}
                  className="mb-5 relative z-0"
                  alt="ethereum icon"
                />
                <Image
                  src="/icons/cip.svg"
                  width={30}
                  height={30}
                  className="mb-5 relative z-10 -translate-x-1/4"
                  alt="cip icon"
                />
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-lg flex flex-1 justify-between">
                <span>ETH/CIP Pro</span>{" "}
                {/* <span className="text-neutral-500 text-xl">
                <Image
                  src="/icons/info.svg"
                  alt="info icon"
                  width={18}
                  height={18}
                />
              </span> */}
              </h3>
            </div>
            <div className="flex sm:flex-row flex-col mb-2 sm:mb-0 sm:gap-1">
              <div className="flex">
                <Image
                  src="/icons/arb.png"
                  width={30}
                  height={30}
                  className="mb-5 relative z-0"
                  alt="ethereum icon"
                />
                <Image
                  src="/icons/cip.svg"
                  width={30}
                  height={30}
                  className="mb-5 relative z-10 -translate-x-1/4"
                  alt="cip icon"
                />
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-lg flex flex-1 justify-between">
                <span>ARB/CIP Pro</span>{" "}
                {/* <span className="text-neutral-500 text-xl">
                <Image
                  src="/icons/info.svg"
                  alt="info icon"
                  width={18}
                  height={18}
                />
              </span> */}
              </h3>
            </div>
            <div className="flex sm:flex-row flex-col mb-2 sm:mb-0 sm:gap-1">
              <div className="flex">
                <Image
                  src="/icons/dai.png"
                  width={30}
                  height={30}
                  className="mb-5 relative z-0"
                  alt="ethereum icon"
                />
                <Image
                  src="/icons/cip.svg"
                  width={30}
                  height={30}
                  className="mb-5 relative z-10 -translate-x-1/4"
                  alt="cip icon"
                />
              </div>
              <h3 className="font-bold text-xs sm:text-sm md:text-lg flex flex-1 justify-between">
                {/* <span>Mint a new LP NFT</span>{" "} */}
                <span>DAI/CIP Pro</span>{" "}
                {/* <span className="text-neutral-500 text-xl">
                <Image
                  src="/icons/info.svg"
                  alt="info icon"
                  width={18}
                  height={18}
                />
              </span> */}
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-1 py-4 text-neutral-400">
            {/* <div className="flex items-center justify-between text-sm border-b border-[#ffffff15] py-2">
              <span>Total Protocol TVL:</span>
              <span className="text-white">$ {totalStakedValue}</span>
            </div> */}
            <div className="flex items-center justify-between text-sm border-b border-[#ffffff15] py-2">
              <span>Total Staked LPs: </span>
              <span className="text-white">
                {/* {totalLPsData!==undefined ? `${String(totalLPsData)}`:"--"} */}
                {stakedNfts}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm border-b border-[#ffffff15] py-2">
              <span>Current APR:</span>
              <span className="text-white">
                {currentAprData ? `${String(currentAprData)}%` : "--"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm border-b border-[#ffffff15] py-2">
              <span>Your Referral Rewards</span>
              <span className="text-white">
                $ {numberWithCommas(userDirectRewards)}
              </span>
            </div>
            {
              TEST_MODE ?
              <>
                <div className="flex items-center justify-between text-sm border-b border-[#ffffff15] py-2">
                  <span>Total NFTs Minted:</span>
                  <span className="text-white">{totalNFTsMinted}</span>
                </div>
                <div className="flex items-center justify-between text-sm border-b border-[#ffffff15] py-2">
                  <span>Mint a new NFT:</span>
                  <Button className="w-[100px] text-sm" disabled={mintNewNftLoader}
                    condition={mintNewNftLoader ? "loading" : "stable"} onClick={() => mintNewNftWrite?.()}>Mint</Button>

                </div>
              </> 

              :null
            }

          </div>
        </article>
      </div>
      { isUserRegistered ? (
        <article className="bg-neutral-900 rounded-lg p-5 w-full h-full flex flex-col justify-center items-start mt-5">
          {/* <img src="/icons/connections.svg" className="mb-5" alt="" /> */}
          <small className="text-neutral-500 font-medium text-sm md:text-base">
            Your Referral Link
          </small>
          <div className="w-full">
            <Input
              // defaultValue={userData && userData.length > 0 ? userData[6] : zeroAdd}
              value={`${baseUrl}?lpreferralcode=${currentWalletAddress}`}
              placeholder="Referred By"
              className="ring-2 ring-primary ring-opacity-40 w-full mt-4 text-xs"
              disabled
              icon="/icons/copy.svg"
              readOnly
            />
          </div>
        </article>
      ) : null}
      {/* other boxes */}
      {!userLPDataLoading ? (
        userLPData.length > 0 ? (
          userLPData.map((item: { isStaked: boolean; id: string; tokenURI: string }, index: number) => (
            <LP_TOKEN key={index} {...item} lpReferralAddress={lpReferralAddress} isValidRefAddress={isValidRefAddress} isSelfRef={isSelfRef} />
          ))
        ) : (
          <Note
            className="my-5"
            icon={BsFillInfoCircleFill}
            iconClass="text-rose-800"
          >
            <>
              No liquidity token found{" "}
              <a
                href={"https://app.uniswap.org/pools?chain=arbitrum"}
                target="_blank"
                className="text-primary font-normal text-base hover:underline"
              >
                click here
              </a>{" "}
              to provide, and get liquidity token.
            </>
          </Note>
        )
      ) : (
        <SmLoader />
      )}
    </>
  );
};

export default LPStaking2;

const LP_TOKEN = ({
  isStaked: nftStaked,
  id,
  tokenURI: _tokenURI,
  lpReferralAddress,
  isValidRefAddress,
  isSelfRef,
}: {
  isStaked: boolean;
  id: string;
  tokenURI: string;
  lpReferralAddress: string;
  isValidRefAddress: boolean;
  isSelfRef: boolean

}) => {
  const {
    notifyError,
    notifySuccess,
    currentWalletAddress,
    notifySuccessWithHash,
    LP_STAKING_CONTRACT_ABI,
    LP_NFT_CONTRACT_ABI,
    LP_STAKING_CONTRACT_ADDRESS,
    LP_NFT_CONTRACT_ADDRESS,
    LP_TOKEN2_CONTRACT_ADDRESS,
    LP_TOKEN3_CONTRACT_ADDRESS,
    getUserLPTokenData: refetchUserNFTData,
    TEST_MODE,
    headAddress
  } = useEthereum();

  const [NFTSVG, setNFTSVG] = useState<any>(null);
  const [tokenURI, setTokenURI] = useState<string>(_tokenURI);

  const getTokenSvgImage = (tokenURI: string) => {
    try {

      const image64Data = tokenURI?.split(',')
      const { image } = JSON.parse(decode(image64Data[1]))
      const image64Data2 = image?.split(',')
      const svgImage = decode(image64Data2[1])
      setNFTSVG(svgImage)

    } catch (error) {
      console.log(error);
      setNFTSVG(null)
      return null

    }
  };

  useEffect(() => {
    getTokenSvgImage(tokenURI);
  }, [tokenURI]);


  //!====================================  NOT STAKED

  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [isStaked, setIsStaked] = useState<boolean>(nftStaked);
  
  const { data: userToken1Allowance, error: userToken1AllowanceError } =
  useContractRead({
    //check for user allowed cip
    address: LP_NFT_CONTRACT_ADDRESS,
    abi: LP_NFT_CONTRACT_ABI,
    functionName: "getApproved",
      args: [id],
      watch: true,
      enabled: !isStaked,
    });


  const { data: tokenOwnerAddress, } =
    useContractRead({
      //check for user allowed cip
      address: LP_NFT_CONTRACT_ADDRESS,
      abi: LP_NFT_CONTRACT_ABI,
      functionName: "ownerOf",
      args: [id],
      watch: true,
    });
    const [isAddressTokenOwner, setIsAddressTokenOwner] = useState<boolean>(true);

    useEffect(() => {
      if(tokenOwnerAddress!==undefined && currentWalletAddress){
        setIsAddressTokenOwner((tokenOwnerAddress as any).toLowerCase()===currentWalletAddress.toLowerCase())

      }

      
    }, [tokenOwnerAddress,currentWalletAddress])
    
    
  useEffect(() => {
    if (userToken1Allowance !== undefined) {
      console.log(
        "userToken1Allowance",
        userToken1Allowance,
        userToken1AllowanceError
      );

      setIsApprove(
        userToken1Allowance.toString().toLowerCase() ===
        LP_STAKING_CONTRACT_ADDRESS.toLowerCase()
      );
    } else {
      setIsApprove(false);
    }
  }, [userToken1Allowance]);

  //==================================== APPROVE TOKEN ID =================================
  const [approveUserToken1Loader, setapproveUserToken1Loader] = useState(false);
  const { config: approveUserToken1Config } = usePrepareContractWrite({
    address: LP_NFT_CONTRACT_ADDRESS,
    abi: LP_NFT_CONTRACT_ABI,
    functionName: "approve",
    args: [LP_STAKING_CONTRACT_ADDRESS, id],
    account: currentWalletAddress,
    enabled: !isStaked,
  });

  const {
    data: approveUserToken1Data,

    write: approveUserToken1Write,
    status: approveUserToken1Status,
  } = useContractWrite(approveUserToken1Config);

  useEffect(() => {
    if (approveUserToken1Status == "loading") {
      setapproveUserToken1Loader(true);
    }
    if (approveUserToken1Status == "success") {
      setapproveUserToken1Loader(true);
    }
    if (approveUserToken1Status == "error") {
      setapproveUserToken1Loader(false);
      notifyError("Transaction Rejected");
    }
  }, [approveUserToken1Status]);

  const { data: approveUserToken1Response } = useWaitForTransaction({
    hash: approveUserToken1Data?.hash,
    onSuccess(data: any) {
      console.log("final approveUserToken1 log", data);
      setIsApprove(true);
      notifySuccessWithHash(
        "Transaction Confirmed",
        String(approveUserToken1Data?.hash)
      );
      setapproveUserToken1Loader(false);
    },
    onError(data: any) {
      setIsApprove(false);
      notifyError("Transaction Failed");
      console.log("final approveUserToken1 log", data);
      setapproveUserToken1Loader(false);
    },
  });

  //==================================== STAKE TOKEN ID =================================

  const [stakeUserToken1Loader, setstakeUserToken1Loader] = useState(false);
  const { config: stakeUserToken1Config } = usePrepareContractWrite({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "stakeNFT",
    args: [id, lpReferralAddress !== "" ? lpReferralAddress : ZeroAddress],
    account: currentWalletAddress,
    enabled: !isStaked && isApprove && isValidRefAddress && !isSelfRef,
  });

  const {
    data: stakeUserToken1Data,

    write: stakeUserToken1Write,
    status: stakeUserToken1Status,
  } = useContractWrite(stakeUserToken1Config);

  useEffect(() => {
    if (stakeUserToken1Status == "loading") {
      setstakeUserToken1Loader(true);
    }
    if (stakeUserToken1Status == "success") {
      setstakeUserToken1Loader(true);
    }
    if (stakeUserToken1Status == "error") {
      setstakeUserToken1Loader(false);
      notifyError("Transaction Rejected");
    }
  }, [stakeUserToken1Status]);

  const { data: stakeUserToken1Response } = useWaitForTransaction({
    hash: stakeUserToken1Data?.hash,
    onSuccess(data: any) {
      setIsStaked(true);
      // refetchUserNFTData(currentWalletAddress)
      console.log("final stakeUserToken1 log", data);
      notifySuccessWithHash(
        "Transaction Confirmed",
        String(stakeUserToken1Data?.hash)
      );
      setstakeUserToken1Loader(false);
    },
    onError(data: any) {
      notifyError("Transaction Failed");
      console.log("final stakeUserToken1 log", data);
      setstakeUserToken1Loader(false);
    },
  });

  //!====================================  STAKED
  const [stakedTokenIdData, setstakedTokenIdData] = useState<null | any>(null);

  const { data: stakedTokenData } = useContractRead({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "getDetails",
    args: [id],
    watch: true,
    enabled: isStaked,
  });

  useEffect(() => {
    if (stakedTokenData !== undefined) {
      console.log("stakedTokenData", stakedTokenData);
      setstakedTokenIdData(stakedTokenData);
    } else {
      setstakedTokenIdData(null);
    }
  }, [stakedTokenData]);

  const [stakedTokenIdEarnedData, setstakedTokenIdEarnedData] = useState<null | any>(null);

  const { data: stakedTokenEarnedData } = useContractRead({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "earned",
    args: [id],
    watch: true,
    enabled: isStaked,
  });

  useEffect(() => {
    if (stakedTokenEarnedData !== undefined) {
      console.log("stakedTokenEarnedData", stakedTokenEarnedData);
      setstakedTokenIdEarnedData(stakedTokenEarnedData);
    } else {
      setstakedTokenIdEarnedData(null);
    }
  }, [stakedTokenEarnedData]);

  // ==================================== CLAIM TOKEN REWARD =================================

  const [claimTokenRewardLoader, setclaimTokenRewardLoader] = useState(false);
  const { config: claimTokenRewardConfig } = usePrepareContractWrite({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "claimRewards",
    args: [id],
    account: currentWalletAddress,
    enabled: isStaked,
  });

  const {
    data: claimTokenRewardData,

    write: claimTokenRewardWrite,
    status: claimTokenRewardStatus,
  } = useContractWrite(claimTokenRewardConfig);

  useEffect(() => {
    if (claimTokenRewardStatus == "loading") {
      setclaimTokenRewardLoader(true);
    }
    if (claimTokenRewardStatus == "success") {
      setclaimTokenRewardLoader(true);
    }
    if (claimTokenRewardStatus == "error") {
      setclaimTokenRewardLoader(false);
      notifyError("Transaction Rejected");
    }
  }, [claimTokenRewardStatus]);

  const { data: claimTokenRewardResponse } = useWaitForTransaction({
    hash: claimTokenRewardData?.hash,
    onSuccess(data: any) {
      console.log("final claimTokenReward log", data);
      notifySuccessWithHash(
        "Transaction Confirmed",
        String(claimTokenRewardData?.hash)
      );
      setclaimTokenRewardLoader(false);
    },
    onError(data: any) {
      notifyError("Transaction Failed");
      console.log("final claimTokenReward log", data);
      setclaimTokenRewardLoader(false);
    },
  });


  const [canUnstake, setcanUnstake] = useState(false)
  const [canClaimRewards, setcanClaimRewards] = useState(false)
  useEffect(() => {
    setcanUnstake(stakedTokenIdData && Math.floor(new Date().getTime() / 1000) >= Number(stakedTokenIdData?.endTime))
    setcanClaimRewards((stakedTokenIdData && Math.floor(new Date().getTime() / 1000) >= Number(stakedTokenIdData?.nextRewardTime)))
  }, [stakedTokenIdData])


  //==================================== UNSTAKE TOKEN ID =================================

  const [unstakeUserToken1Loader, setunstakeUserToken1Loader] = useState(false);
  const { config: unstakeUserToken1Config } = usePrepareContractWrite({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "unstakeNFT",
    args: [id],
    account: currentWalletAddress,
    enabled: isStaked && canUnstake,
  });

  const {
    data: unstakeUserToken1Data,

    write: unstakeUserToken1Write,
    status: unstakeUserToken1Status,
  } = useContractWrite(unstakeUserToken1Config);

  useEffect(() => {
    if (unstakeUserToken1Status == "loading") {
      setunstakeUserToken1Loader(true);
    }
    if (unstakeUserToken1Status == "success") {
      setunstakeUserToken1Loader(true);
    }
    if (unstakeUserToken1Status == "error") {
      setunstakeUserToken1Loader(false);
      notifyError("Transaction Rejected");
    }
  }, [unstakeUserToken1Status]);

  const { data: unstakeUserToken1Response } = useWaitForTransaction({
    hash: unstakeUserToken1Data?.hash,
    onSuccess(data: any) {
      setIsStaked(false);
      // refetchUserNFTData(currentWalletAddress)
      console.log("final unstakeUserToken1 log", data);
      notifySuccessWithHash(
        "Transaction Confirmed",
        String(unstakeUserToken1Data?.hash)
      );
      setunstakeUserToken1Loader(false);
    },
    onError(data: any) {
      notifyError("Transaction Failed");
      console.log("final unstakeUserToken1 log", data);
      setunstakeUserToken1Loader(false);
    },
  });


  

  function convertUnixTimestampToDateTimeStringWithAMPM(
    unixTimestamp: number
  ): string {
    // Convert Unix timestamp to milliseconds
    const milliseconds = unixTimestamp * 1000;

    // Create a new Date object
    const date = new Date(milliseconds);

    // Format the date as a string with AM/PM (e.g., "YYYY-MM-DD hh:mm:ss AM/PM")
    const formattedDateTime = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return formattedDateTime;
  }

  return (
    <>
      <article className="bg-black-700 rounded-lg flex-col sm:flex-row p-5 w-full mt-4 flex items-center gap-8">
        <div className="relative w-[100px] aspect-[.6] nft-svg">
          {NFTSVG && parse(NFTSVG)}
          {/* <Image
            src={"/icons/uni.svg"}
            className="object-contain"
            alt=""
            fill
          /> */}
        </div>
        <div className="flex lg:items-end justify-between flex-col lg:flex-row flex-1 gap-4">
          <div className="flex-1">
            <h3 className="font-bold md:text-2xl mb-2 flex flex-1 justify-between">
              <span>LP NFT ID #{id}</span>
            </h3>
            {isStaked && stakedTokenIdData !== null ? (
              <div className="flex flex-col gap-2 text-neutral-400">
                <div className="flex items-center justify-between text-sm lg:text-lg border-b border-[#ffffff15] py-2">
                  <span>Liquidity Locked: </span>
                  <span className="text-white">
                    ${" "}
                    {convertWEITo(
                      String(stakedTokenIdData?.liquidity),
                      "ether"
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm lg:text-lg border-b border-[#ffffff15] py-2">
                  <span>Earned on this NFT: </span>
                  <span className="text-white">
                    ${" "}
                    {stakedTokenIdEarnedData
                      ? convertWEITo_ForROI(
                          String(stakedTokenIdEarnedData),
                          "ether"
                        )
                      : "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm lg:text-lg border-b border-[#ffffff15] py-2">
                  <span>Next Claim Reward:</span>
                  <span className="text-white text-end">
                    {convertUnixTimestampToDateTimeStringWithAMPM(
                      Number(stakedTokenIdData?.nextRewardTime)
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-neutral-400">
                <div className="flex items-center justify-between text-sm lg:text-lg border-b border-[#ffffff15] py-2">
                  <span className="text-white">Stake your LP NFT </span>
                  {/* <span className="text-white">100</span> */}
                </div>
                {!isValidRefAddress ? (
                  <span className="text-red-600">
                    Referral code is not valid{" "}
                  </span>
                ) : isSelfRef ? (
                  <span className="text-red-600">Can&apos;t Refer Yourself </span>
                  ) : null}
                {
                  !isAddressTokenOwner?
                  <span className="text-red-600">You are not owner of NFT </span>
                  :null

                }
              </div>
            )}
          </div>

          {!isStaked ? (
            <div className="col-span-4 flex flex-col gap-4 items-end">
              {isApprove ? (
                <Button
                  key="1"
                  // className="min-w-32 rounded-full py-2 text-sm"
                  className="w-full text-sm my-2"
                  disabled={stakeUserToken1Loader || !isValidRefAddress ||  !isAddressTokenOwner || isSelfRef}
                  condition={stakeUserToken1Loader ? "loading" : "stable"}
                  onClick={() => stakeUserToken1Write?.()}
                >
                  Stake NFT
                </Button>
              ) : (
                <Button
                  key="2"
                  // className="min-w-32 rounded-full py-2 text-sm"
                  className="w-full text-sm my-2"
                  disabled={approveUserToken1Loader || !isValidRefAddress || !isAddressTokenOwner || isSelfRef}
                  condition={approveUserToken1Loader ? "loading" : "stable"}
                  onClick={() => approveUserToken1Write?.()}
                >
                  Approve NFT
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-end">
              <Button
                key="3"
                className="w-full text-sm my-2"
                disabled={
                  claimTokenRewardLoader || !canClaimRewards
                  
                }
                condition={claimTokenRewardLoader ? "loading" : "stable"}
                onClick={() => claimTokenRewardWrite?.()}
              >
                Claim Rewards
              </Button>

              <Button
                key="4"
                className="w-full text-sm"
                disabled={
                  unstakeUserToken1Loader || !canUnstake
                }
                condition={unstakeUserToken1Loader ? "loading" : "stable"}
                onClick={() => unstakeUserToken1Write?.()}
              >
                Unstake NFT
              </Button>
            </div>
          )}
        </div>
      </article>
    </>
  );
};
