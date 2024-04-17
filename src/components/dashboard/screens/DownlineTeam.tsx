import React, { useEffect, useState } from "react";
import useMobileDetect from "@/hooks/useMobileDetect";
import { convertWEITo, copyToClipboard, getShortenAddress } from "@/utils/helper";
import { Pagination, StakingHistory, TextRow } from "@/components";
import { useEthereum } from "@/context/cipMainContext";
import { useContractRead } from "wagmi";
import {AiFillCheckCircle} from 'react-icons/ai'

type TableHeaderProps = {
  headers: string[];
};

const headers = ["S.No", "Level", "Wallet Address","Amount Invested"];

const itemsPerPage = 6; // Number of items to display per page

const DownlineTeam = () => {
  const {
    myLpDownLineDataMod2, lpDownLineLoading,
    LP_STAKING_CONTRACT_ADDRESS,LP_STAKING_CONTRACT_ABI

  } = useEthereum();

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = myLpDownLineDataMod2.slice(startIndex, endIndex);

  useEffect(() => {
    console.log("myLpDownLineDataMod2",myLpDownLineDataMod2)
 
  }, [myLpDownLineDataMod2]);



  return (
    <div>
      <h2 className="text-2xl font-medium py-8">Downline Team</h2>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="overflow-auto lg:overflow-visible">
            <table className="table border-separate space-y-6 text-sm w-full">
              <thead className="bg-neutral-900">
                <TableHeader headers={headers} />
              </thead>
              <tbody className="font-semibold">
                {/* {
                   myLpDownLineDataMod2.length>0 && myLpDownLineDataMod2.map((levelData:any, index:number) => {
                     return <TableRow key={index} index={index} data={levelData} />
        
                    })


                } */}
                {paginatedData.map((rowData: any, index: any) => (
                  <TableRow key={index} data={rowData} index={index} />
                ))}
              </tbody>
            </table>
            {!paginatedData.length ? (
              <TextRow>
                {lpDownLineLoading ? "Loading..." : "No Records to Show!"}
              </TextRow>
            ) : (
              <></>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(myLpDownLineDataMod2.length / itemsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownlineTeam;

const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <tr>
      {headers.map((header: string, index: number) => {
        return (
          <th key={index} className="px-3 py-4 text-center">
            {header}
          </th>
        );
      })}
    </tr>
  );
};


type TableRowProps = {
  data: {
    level: number;
    address: string;
  };
  index: number;
};


const TableRow = ({ data, index }: TableRowProps) => {
  const isMobile = useMobileDetect();
  const {
    LP_STAKING_CONTRACT_ADDRESS,LP_STAKING_CONTRACT_ABI

  } = useEthereum();

  const [showTick, setShowTick] = useState(false);

  const copyToClipboardWithFeedback = (e: any) => {
    e.preventDefault()
    copyToClipboard(data.address ? data.address : "");
    setShowTick(true);

    setTimeout(() => {
      setShowTick(false);
    }, 3000);
  };

  const { data: userLpDetails } = useContractRead({
    address: LP_STAKING_CONTRACT_ADDRESS,
    abi: LP_STAKING_CONTRACT_ABI,
    functionName: "getUserDetails",
    args:[data?.address],
    enabled:data?.address?true:false,
  });

  return (
    <tr className="bg-neutral-900 text-center">
      <td className="p-3 text-center">
        {index + 1}
      </td>
      <td className="p-3 text-center">{data.level}</td>
      <td className="p-3 text-center flex items-center justify-center">
        <div className="w-[38ch]">{isMobile ? getShortenAddress(data.address) : data.address}</div>
        <span>
          <div onClick={copyToClipboardWithFeedback}>
            {showTick ? (
              <AiFillCheckCircle className="text-xl" /> 
            ) : (
              <img src="/icons/copy.svg" alt="Copy Icon" className="w-5" /> 
            )}
          </div>
        </span>
      </td>
      <td className="p-3 text-center">
        $ {userLpDetails?convertWEITo((userLpDetails as any).stakedLiquidity,"ether"):"0"}
      </td>
    </tr>
  );
};
