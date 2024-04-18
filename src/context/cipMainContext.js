// context.js
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
// import { ethers } from 'ethers';
import { useAccount } from "wagmi";
import { useNetwork } from "wagmi";
import ABI from "../abi/abi.json";
import TOKEN_ABI from "../abi/abi_token.json";
import TOKEN_ABI_OLD from "../abi/abi_token_old.json";
import _LP_STAKING_CONTRACT_ABI from "../abi/abi_lp_staking.json";
import _LP_TOKEN_CONTRACT_ABI from "../abi/abi_lp_token.json";
import _LP_TOKEN_UNIV3_CONTRACT_ABI from "../abi/abi_lp_uniswap_v3_token.json";
import _UNISWAP_UTILITY_ABI from "../abi/uniswap_utility_abi.json";

import {
  chain,
  configureChains,
  useContractRead,
  useContractReads,
  useContractWrite,
} from "wagmi";
import { convertETHTo } from "@/utils/helper";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export const TEST_MODE = true;
export const ENABLE_FUNC = true;
export const DISABLE_FUNC = false;


//!================ LOADERS start

const notifySuccessWithHashToastId = { current: null };
const notifySuccessWithHash = (msg, txHash) => {
  // let link = `https://goerli.etherscan.io/tx/${txHash}`;
  // let link = `https://sepolia.etherscan.io/tx/${txHash}`;
  let link = TEST_MODE
    ? `https://sepolia.etherscan.io/tx/${txHash}`
    : `https://arbiscan.io/tx/${txHash}`;
  if (!toast.isActive(notifySuccessWithHashToastId.current)) {
    notifySuccessWithHashToastId.current = toast.success(
      <a
        href={link}
        target="_blank"
        className="text-sm leading-3 text-neutral-200"
      >
        {msg}
      </a>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        progressClassName: "custom-progress",
      }
    );
  }
};
const notifySuccessToastId = { current: null };

const notifySuccess = (msg) => {
  if (!toast.isActive(notifySuccessToastId.current)) {
    notifySuccessToastId.current = toast.success(
      <span className="text-sm leading-3 text-neutral-200">{msg}</span>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        progressClassName: "custom-progress",
      }
    );
  }
};
const errorToastId = { current: null };
const notifyError = (msg) => {
  if (!toast.isActive(errorToastId.current)) {
    errorToastId.current = toast.error(
      <span className="text-sm leading-3 text-neutral-200">{msg}</span>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        progressClassName: "custom-progress",
      }
    );
  }
};
//!================ LOADERS end

// Create a context for your contract and provider
const EthereumContext = createContext();

// const headAddress = "0x7A675d2485924E19A7C43E540B08b8f4d7426884"; //goerli
// const CONTRACT_ADDRESS = "0xd66A71232006143F3ae9Ee4d02eECEA89bb34e4C"; //6 40 28 sept  --> newest
// const TOKEN_CONTRACT_ADDRESS = "0xbaf672de325A4E6beB6a43640C1609C279a75e0a";
// const TOKEN_CONTRACT_ADDRESS_OLD = "0xbaf672de325A4E6beB6a43640C1609C279a75e0a";

const headAddress = "0x4CDA7Eb4F640403872D49Bfa0571Bc7b45935644"; //arbitrum
const CONTRACT_ADDRESS = "0x80D60D73cc0aC8D4E102287efc90db1120907CC4"; //arbitrum main
const TOKEN_CONTRACT_ADDRESS = "0xd7a892f28dEdC74E6b7b33F93BE08abfC394a360";
const TOKEN_CONTRACT_ADDRESS_OLD = "";


const UNISWAP_UTILITY_ADDRESS = "0x5ca565295A47cbc6aE3310cD37A873A1ab4f445a";
const CIP_PRO_ARBI =TEST_MODE?"0x044989224c4fe4c35D43894237271B97a6da31B1":"0x3bDA582BFbfF76036f5C7174dFf4928D64E79478"; //cip pro
const DAI_ARBI = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";

// Create a custom hook to access the Ethereum context
export function useEthereum() {
  return useContext(EthereumContext);
}

const nativeToken = "USD";
const nativeTokenSymbol = "$";
const zeroAdd = "0x0000000000000000000000000000000000000000";

export function EthereumProvider({ children }) {
  const searchParams = useSearchParams();
  // const router = useRouter()
  // const pathname = usePathname()

  const [userActiveTab, setUserActiveTab] = useState(12);

  const [lpReferralAddress, setReferralAddress] = useState("");
  const [isValidRefAddress, setIsValidRefAddress] = useState(true);
  const [isSelfRef, setIstSelfRef] = useState(false);
  const {
    address: currentWalletAddress,
    isConnecting,
    isDisconnected,
  } = useAccount();


  useEffect(() => {
    console.log("lpreferralcode", searchParams.get("lpreferralcode"));
    const refAddress = searchParams.get("lpreferralcode");
    if(refAddress !== null) {
      setUserActiveTab(12); //for LP Staking
    }

    if (refAddress !== null && currentWalletAddress) {
      setIsValidRefAddress(ethers.isAddress(refAddress));
      setIstSelfRef(
        refAddress.toLowerCase() === currentWalletAddress.toLowerCase()
      );
      setReferralAddress(refAddress);
    } else {
      setReferralAddress("");
      setIsValidRefAddress(true);
      setIstSelfRef(false);
    }
  }, [searchParams,currentWalletAddress]);

  // //!  === TEST
  // const LP_STAKING_CONTRACT_ADDRESS = TEST_MODE
  //   ? "0xF638116E0a269e2Da077242B8Df22F20EB4E3a28"
  //   : "0x590b74fe2FF5d9b974C812a128633636302Dd670";
  // const LP_NFT_CONTRACT_ADDRESS = TEST_MODE
  //   ? "0xa66A457c4592d8c377bA15c5217f742384F3B163"
  //   : "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

  const LP_STAKING_CONTRACT_ADDRESS = TEST_MODE
    ? "0xc5E13321F97f7e893a3dcdaDbABBaf9c0cF690C8"
    : "0x590b74fe2FF5d9b974C812a128633636302Dd670";
  const LP_NFT_CONTRACT_ADDRESS = TEST_MODE
    ? "0xBC163a11AEbc3c445953828BeD96fB5f5A60105f"
    : "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

  const LP_TOKEN_UNIV3_CONTRACT_ADDRESS =
    "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
  const LP_NFT_CONTRACT_ABI = _LP_TOKEN_CONTRACT_ABI; // mainnet:v3nftABI ,sepolia:testnftabi
  const LP_STAKING_CONTRACT_ABI = _LP_STAKING_CONTRACT_ABI; //staking abi
  const LP_TOKEN_UNIV3_CONTRACT_ABI = _LP_TOKEN_UNIV3_CONTRACT_ABI; //v3nftABI
  const UNISWAP_UTILITY_ABI = _UNISWAP_UTILITY_ABI; 

  const { chain: chainData, chains } = useNetwork();

  const [userLPData, setUserLPData] = useState([]);
  const [userLPDataLoading, setUserLPDataLoading] = useState(false);

  //!================= SEPOLIA

  async function getUserLPTokenDataTest(userAddress) {
    try {
      // console.log("getUserLPTokenData");
      setUserLPDataLoading(true);
      userAddress = userAddress?.toLowerCase();

      const sepoliaProvider = new ethers.JsonRpcProvider(
        `https://eth-sepolia.g.alchemy.com/v2/5IAB9CnzPGKH_YMPvB0WtER0eYaJ1rCp`
      );

      const arbiProvider = new ethers.JsonRpcProvider(
        `https://arb-mainnet.g.alchemy.com/v2/rPP4tqmuLqPcd0I0qh32c1H8wCSDsiB9`
      );
      // Create a contract instance
      const nftContract = new ethers.Contract(
        LP_NFT_CONTRACT_ADDRESS,
        LP_NFT_CONTRACT_ABI,
        sepoliaProvider
      );
      const lpStakeContract = new ethers.Contract(
        LP_STAKING_CONTRACT_ADDRESS,
        LP_STAKING_CONTRACT_ABI,
        sepoliaProvider
      );

      const uniV3TokenContract = new ethers.Contract(
        LP_TOKEN_UNIV3_CONTRACT_ADDRESS,
        LP_TOKEN_UNIV3_CONTRACT_ABI,
        arbiProvider
      );

      // Create a filter for the Transfer event with the specified "to" address
      let filter = nftContract.filters.Transfer(null, userAddress, null);

      // Specify the starting block number for the query
      filter.fromBlock = 5239278;
      let events = await nftContract.queryFilter(filter);

      // console.log("getUserLPTokenData events",events);

      const uniqueNFTData = await Promise.all(
        events
          .filter((item, index, array) => {
            // Use a Set to track unique city IDs
            const id = Number(item.args[2]);
            return array.findIndex((i) => Number(i.args[2]) === id) === index;
          })
          .map(async (item) => {
            const id = String(item.args[2]);
            let nftOwner;
            let lpStakeOwner;
            try {
              nftOwner = (await nftContract.ownerOf(id)).toLowerCase();
            } catch (error) {
              console.error(`Error getting owner of NFT ${id}:`, error);
              return null; // Skip this NFT if there's an error
            }

            try {
              const lpStakeData = await lpStakeContract.getDetails(id);
              lpStakeOwner = lpStakeData[0].toLowerCase();
            } catch (error) {
              console.error(`Error getting owner of NFT ${id}:`, error);
              return null; // Skip this NFT if there's an error
            }
            console.log({nftOwner,userAddress,lpStakeOwner,id})

            if (nftOwner === userAddress || userAddress === lpStakeOwner) {
              try {
                let tokenURI = await uniV3TokenContract.tokenURI(id);
                return {
                  id,
                  isStaked: userAddress === lpStakeOwner,
                  tokenURI,
                };
              } catch (error) {
                console.error(`Error getting token URI for NFT ${id}:`, error);
                return null; // Skip this NFT if there's an error
              }
            }

            return null; // Skip this NFT if the owner doesn't match
          })
      );

      // Remove null values (skipped items due to errors or conditions)
      const filteredNFTData = uniqueNFTData.filter((item) => item !== null);

      // console.log(filteredNFTData);

      setUserLPData(filteredNFTData);
    } catch (error) {
      setUserLPData([]);

      console.log("error getUserLPTokenData", error);
    } finally {
      setUserLPDataLoading(false);
    }
  }

  //!================= MAINNET
  async function getUserLPTokenDataMain(userAddress) {
    try {
      setUserLPDataLoading(true);
      userAddress = userAddress?.toLowerCase();

      const arbiProvider = new ethers.JsonRpcProvider(
        `https://arb-mainnet.g.alchemy.com/v2/rPP4tqmuLqPcd0I0qh32c1H8wCSDsiB9`
      );

      const lpStakeContract = new ethers.Contract(
        LP_STAKING_CONTRACT_ADDRESS,
        LP_STAKING_CONTRACT_ABI,
        arbiProvider
      );

      const uniV3TokenContract = new ethers.Contract(
        LP_TOKEN_UNIV3_CONTRACT_ADDRESS,
        LP_TOKEN_UNIV3_CONTRACT_ABI,
        arbiProvider
      );

      // Create a filter for the Transfer event with the specified "to" address
      let filter = uniV3TokenContract.filters.Transfer(null, userAddress, null);

      // Specify the starting block number for the query
      filter.fromBlock = 138260764; // cip token creation block number
      let events = await uniV3TokenContract.queryFilter(filter);

      const cipTokenAddressLowerCase = TOKEN_CONTRACT_ADDRESS.toLowerCase();
      //!====================================

      const uniqueNFTData = await Promise.all(
        events
          .filter((item, index, array) => {
            // Use a Set to track unique city IDs
            const id = Number(item.args[2]);
            return array.findIndex((i) => Number(i.args[2]) === id) === index;
          })
          .map(async (item) => {
            const id = String(item.args[2]);
            let positionData;
            try {
              positionData = await uniV3TokenContract.positions(id);
            } catch (error) {
              console.error(`Error getting positions of NFT ${id}:`, error);
              return null; // Skip this NFT if there's an error
            }

            const token0 = positionData[2].toLowerCase();
            const token1 = positionData[3].toLowerCase();
            if (
              cipTokenAddressLowerCase === token0 ||
              cipTokenAddressLowerCase === token1
            ) {
              let nftOwner;
              let lpStakeOwner;
              try {
                nftOwner = (await uniV3TokenContract.ownerOf(id)).toLowerCase();
              } catch (error) {
                console.error(`Error getting owner of NFT ${id}:`, error);
                return null; // Skip this NFT if there's an error
              }
              try {
                const lpStakeData = await lpStakeContract.getDetails(id);
                lpStakeOwner = lpStakeData[0].toLowerCase();
              } catch (error) {
                console.error(`Error getting owner of NFT ${id}:`, error);
                return null; // Skip this NFT if there's an error
              }

              if (nftOwner === userAddress || lpStakeOwner === userAddress) {
                try {
                  let tokenURI = await uniV3TokenContract.tokenURI(id);
                  return {
                    id,
                    isStaked: userAddress === lpStakeOwner,
                    tokenURI,
                  };
                } catch (error) {
                  console.error(
                    `Error getting token URI for NFT ${id}:`,
                    error
                  );
                  return null; // Skip this NFT if there's an error
                }
              }
            }

            return null; // Skip this NFT if the owner doesn't match
          })
      );

      // Remove null values (skipped items due to errors or conditions)
      const filteredNFTData = uniqueNFTData.filter((item) => item !== null);

      console.log("getUserLPTokenData filteredNFTData", filteredNFTData);
      setUserLPData(filteredNFTData);
    } catch (error) {
      setUserLPData([]);

      console.log("error getUserLPTokenData", error);
    } finally {
      setUserLPDataLoading(false);
    }
  }

  useEffect(() => {
    if (currentWalletAddress !== undefined) {
      // console.log("getUserLPTokenData",currentWalletAddress);
      if (TEST_MODE) {
        getUserLPTokenDataTest(currentWalletAddress);
      } else {
        getUserLPTokenDataMain(currentWalletAddress);
      }
      // setSigner(currentWalletAddress)
    }
  }, [currentWalletAddress]);

  ///==========================================

  //   useEffect(() => {
  //     if (chain) {
  //       RPC = chain.rpcUrls.alchemy.http[0];
  //       setCurrentChain(chain);
  //     }
  //   }, [chain]);

  //   useEffect(() => {
  //     if (currentChain?.id) {
  //       // console.log(currentChain);
  //     }
  //   }, [currentChain]);

  const { data: userData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "users",
    args: [currentWalletAddress],
    watch: true,
    enabled: DISABLE_FUNC
  });
  const { data: userBonusData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "usersBonus",
    args: [currentWalletAddress],
    watch: true,
    enabled: DISABLE_FUNC
  });
  const { data: userEarnedData } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "earned",
    args: [currentWalletAddress],
    watch: true,
    enabled: DISABLE_FUNC
  });
  const { data: userCIPBalance } = useContractRead({
    address: CIP_PRO_ARBI,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [currentWalletAddress],
    watch: true,
    // enabled: currentWalletAddress ? true : false
  });
  const { data: myTeamSummaryData, isLoading: teamSummaryLoading } =
    useContractRead({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "level_downline",
      args: [currentWalletAddress],
      watch: true,
      enabled: DISABLE_FUNC
    });
  //!=====================================================

  // const { data: totalValueLocked } = useContractRead({
  //   address: CONTRACT_ADDRESS,
  //   abi: ABI,
  //   functionName: "Total_Staked_CIP",
  //   watch: true,
  //   // enabled: CONTRACT_ADDRESS ? true : false
  // });

  const { data: totalValueLocked } = useContractRead({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "getTVL",
    watch: true
  });

  useEffect(() => {
  console.log("totalValueLocked",totalValueLocked)
  }, [totalValueLocked])
  


  const { data: cipOwner } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "owner",
    watch: true,
    enabled:DISABLE_FUNC

  });

  const { data: oneCIPpriceInDAI } = useContractRead({
    address: UNISWAP_UTILITY_ADDRESS,
    abi: UNISWAP_UTILITY_ABI,
    functionName: "getPrice",
    args: [CIP_PRO_ARBI,DAI_ARBI,convertETHTo("1", "wei"),"10000"],
    watch: true,
  });

  const { data: _100DAI_CIPamount } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "_getPriceCIP",
    args: [convertETHTo("100", "wei")],
    watch: true,
    enabled:DISABLE_FUNC
  });
  const { data: userCurrentAllowance } = useContractRead({
    //check for user allowed cip
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [currentWalletAddress, CONTRACT_ADDRESS],
    watch: true,
    // enabled: currentWalletAddress ? true : false,
  });
  const { data: userCurrentCIPBalance } = useContractRead({
    //check for user allowed cip
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [currentWalletAddress],
    // enabled: currentWalletAddress ? true : false,
  });

  const { data: estimatedRank } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "estimatedRank",
    args: [currentWalletAddress],
    watch: true,
    enabled: DISABLE_FUNC
  });
  const { data: estimated_UP_Rank } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "EstimatedUniversalPoolRank",
    args: [currentWalletAddress],
    watch: true,
    enabled: DISABLE_FUNC
  });
  const { data: getUserDetailsData } = useContractRead({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "getUserDetails",
    args: [currentWalletAddress],
    watch: true,
    enabled: currentWalletAddress ? true : false,
  });
  const lpDownLineConfig = {
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "getDownliners",
    
  };
  const downLineConfig = {
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getReferees",
    enabled:DISABLE_FUNC
  };

  const { data: mylpDownLineData } = useContractReads({
    contracts: [
      {
        ...lpDownLineConfig,
        args: [currentWalletAddress, "0"],
      },
      {
        ...lpDownLineConfig,
        args: [currentWalletAddress, "1"],
      },
      {
        ...lpDownLineConfig,
        args: [currentWalletAddress, "2"],
      },
      {
        ...lpDownLineConfig,
        args: [currentWalletAddress, "3"],
      },
      {
        ...lpDownLineConfig,
        args: [currentWalletAddress, "4"],
      },
    ],
    enabled: currentWalletAddress ? true : false,
  });
  // console.log("rabeeb", getUserDetailsData);
  // console.log("aqdas", mylpDownLineData[0].result.length);

  const [myLpDownLineDataMod, setlpMyDownLineDataMod] = useState([]);
  const [myLpDownLineDataMod2, setlpMyDownLineDataMod2] = useState([]);
  const [lpDownLineLoading, setlpDownlineLoading] = useState(true);
  const [lpDownLineTeamSize, setlpDownLineTeamSize] = useState(0);

  useEffect(() => {
    let newData = [];
    let newDataForDownline = [];
    let teamSize = 0;
    if (mylpDownLineData != undefined && getUserDetailsData !== undefined) {
      for (let i = 0; i < mylpDownLineData.length; i++) {
        if (mylpDownLineData[i].status == "success") {
          let noOfReferrals = mylpDownLineData[i]?.result;
          console.log("myLpDownLineDataMod2",noOfReferrals)
          
          teamSize = teamSize + noOfReferrals.length
          const levelRewards = getUserDetailsData.referralRewards[i].toString();

          if(noOfReferrals.length>0){
            for (let j = 0; j < noOfReferrals.length; j++) {
              let address = noOfReferrals[j]
              console.log("myLpDownLineDataMod2",{
                level: i + 1,
                address
              })
              newDataForDownline.push({
                level: i + 1,
                address
              });
            }
          }


          newData.push({
            level: i + 1,
            noOfReferrals,
            levelRewards,
          });
        }
      }
    }
    setlpDownLineTeamSize(teamSize)
    setlpMyDownLineDataMod(newData);
    setlpMyDownLineDataMod2(newDataForDownline)
    setlpDownlineLoading(false);
  }, [mylpDownLineData]);

  const {
    data: myDownLineData,
    isError,
    isLoading,
  } = useContractReads({
    contracts: [
      {
        ...downLineConfig,
        args: [currentWalletAddress, "1"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "2"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "3"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "4"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "5"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "6"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "7"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "8"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "9"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "10"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "11"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "12"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "13"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "14"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "15"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "16"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "17"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "18"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "19"],
      },
      {
        ...downLineConfig,
        args: [currentWalletAddress, "20"],
      },
    ],
    enabled: currentWalletAddress ? true : false,
  });

  const [myDownLineDataMod, setMyDownLineDataMod] = useState([]);
  const [downLineLoading, setDownlineLoading] = useState(true);

  useEffect(() => {
    let newData = [];
    if (myDownLineData != undefined) {
      for (let i = 0; i < myDownLineData.length; i++) {
        if (myDownLineData[i].status == "success") {
          const level = myDownLineData[i]?.result;
          if (level.length > 0) {
            for (let j = 0; j < level.length; j++) {
              const item = level[j];
              newData.push({ level: i, address: item });
            }
          }
        }
      }
    }
    setMyDownLineDataMod(newData);
    setDownlineLoading(false);
  }, [myDownLineData]);

  //   console.log("myDownLineData newData", newData);

  return (
    <EthereumContext.Provider
      value={{
        // pathname,
        // router,
        userActiveTab,
        setUserActiveTab,
        lpReferralAddress,
        isValidRefAddress,
        isSelfRef,
        notifySuccess,
        notifySuccessWithHash,
        notifyError,
        nativeTokenSymbol,
        nativeToken,
        chainData,
        // provider,
        headAddress,
        zeroAdd,
        //================ states
        userCurrentCIPBalance,
        estimatedRank,
        estimated_UP_Rank,
        userCurrentAllowance,
        currentWalletAddress,
        userData,
        userBonusData,
        userEarnedData,
        myTeamSummaryData,
        teamSummaryLoading,
        userCIPBalance,
        totalValueLocked,
        cipOwner,
        oneCIPpriceInDAI,
        _100DAI_CIPamount,
        myDownLineDataMod,
        downLineLoading,
        myLpDownLineDataMod,
        myLpDownLineDataMod2,
        lpDownLineLoading,
        //================ handles
        // RefetchUserData,
        //================
        CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ADDRESS,
        ABI,
        TOKEN_ABI,
        TOKEN_CONTRACT_ADDRESS_OLD,
        TOKEN_ABI_OLD,
        //================= LP
        LP_STAKING_CONTRACT_ABI,
        LP_NFT_CONTRACT_ABI,
        LP_STAKING_CONTRACT_ADDRESS,
        LP_NFT_CONTRACT_ADDRESS,
        userLPData,
        userLPDataLoading,
        getUserLPTokenData: TEST_MODE
          ? getUserLPTokenDataTest
          : getUserLPTokenDataMain,
        TEST_MODE,
        UNISWAP_UTILITY_ADDRESS,
        UNISWAP_UTILITY_ABI,
        CIP_PRO_ARBI,
        DAI_ARBI,
        lpDownLineTeamSize
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
}
