import { Pagination, TextRow } from "@/components";
import { useEthereum } from "@/context/cipMainContext";
import { convertWEITo, numberWithCommas } from "@/utils/helper";
import React, { useState } from "react";

const itemsPerPage = 6;
const StakingHistory = ({ data, loading }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.slice(startIndex, endIndex);
  const { nativeToken, currentWalletAddress } = useEthereum();
  const headers = [
    "CIP Amount",
    `CIP in ${nativeToken}`,
    "Start Time",
    "End Time",
  ];

  return (
    <>
      <h2 className="text-2xl font-medium py-8">Staking History</h2>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table border-separate space-y-6 text-sm w-full">
              <thead className="bg-neutral-900 font-semibold">
                <TableHeader headers={headers} />
              </thead>
              <tbody className="font-semibold">
                {paginatedData?.map(
                  (
                    rowData: {
                      CIPAmount: number;
                      DollarAmount: number;
                      timestamp: number;
                    },
                    index: number
                  ) => (
                    <TableRow key={index} data={rowData} index={index} />
                  )
                )}
                <tr>
                  <td colSpan={4} style={{ paddingInlineStart: 0 }}>
                    {!paginatedData?.length ? (
                      <TextRow>
                        {loading ? "Loading..." : "No Records to Show."}
                      </TextRow>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* {!paginatedData.length ? (
              <TextRow>
                {currentWalletAddress ? loading ? "Loading..." : "No Records to Show." : "Please connect wallet"}
              </TextRow>
            ) : (
              <></>
            )} */}

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data?.length / itemsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingHistory;

type TableHeaderProps = {
  headers: string[];
};

const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <tr>
      {headers.map((header: string, index: number) => {
        return (
          <th key={index} className="px-3 py-4 text-start whitespace-nowrap">
            {header}
          </th>
        );
      })}
    </tr>
  );
};

type TableRowProps = {
  data: {
    CIPAmount: number;
    DollarAmount: number;
    timestamp: number;
  };
  index: number;
};

const TableRow = ({ data, index }: TableRowProps) => {
  const date = new Date(data.timestamp * 1000);
  const formattedDate = date.toLocaleDateString();
  const date2 = date;
  date2.setMonth(date.getMonth() + 25);
  const endDate = date2.toLocaleDateString();

  return (
    <tr className="bg-neutral-900 text-center">
      <td className="p-3 text-start">
        {numberWithCommas(
          convertWEITo(
            Number(data.CIPAmount) > 0 ? data.CIPAmount : "0",
            "ether"
          )
        )}
      </td>
      <td className="p-3 text-start">
        {numberWithCommas(
          convertWEITo(
            Number(data.DollarAmount) > 0 ? data.DollarAmount : "0",
            "ether"
          )
        )}
      </td>
      <td className="p-3 text-start">{formattedDate}</td>
      <td className="p-3 text-start">{endDate}</td>
    </tr>
  );
};
