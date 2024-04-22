import { TextRow } from "@/components";
import { useEthereum } from "@/context/cipMainContext";
import { convertWEITo, convertWEITo_ForROI, numberWithCommas } from "@/utils/helper";
import React, { useEffect, useState } from "react";

type TableHeaderProps = {
  headers: string[];
};

const headers = ["Level", "No of Referral", "Referral Bonus"];

const LPTeamSummary = () => {
  const { myLpDownLineDataMod, lpDownLineLoading } = useEthereum();
  // console.log(myLpDownLineDataMod);

  return (
    <div>
      <h2 className="text-2xl font-medium py-8">LP Team Summary</h2>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table border-separate space-y-6 text-sm w-full">
              <thead className="bg-neutral-900">
                <TableHeader headers={headers} />
              </thead>
              <tbody className="font-semibold">
                {myLpDownLineDataMod.length > 0 &&
                  myLpDownLineDataMod.map((obj: any, ind: number) => {
                    return (
                      <React.Fragment key={ind}>
                        <TableRow
                          level={ind + 1}
                          noOfRef={obj.noOfReferrals.length}
                          refBonus={obj.levelRewards}
                        />
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
            {lpDownLineLoading ? (
              <TextRow>Loading... </TextRow>
            ) : myLpDownLineDataMod.length == 0 ? (
              <TextRow>No Records to Show!</TextRow>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LPTeamSummary;

const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <tr className="w-full">
      {headers.map((header: string, index: number) => {
        return (
          <th
            key={index}
            className="px-3 py-4 text-start whitespace-nowrap w-1/2"
          >
            {header}
          </th>
        );
      })}
    </tr>
  );
};

const TableRow = ({ level, noOfRef, refBonus }: any) => {
  return (
    <tr className="bg-neutral-900 text-center">
      <td className="p-3 text-start">{level}</td>
      <td className="p-3 text-start">{Number(noOfRef)}</td>
      <td className="p-3 text-start">
        $ {numberWithCommas(convertWEITo_ForROI(String(refBonus), "ether"))}
      </td>
    </tr>
  );
};
