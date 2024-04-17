import { TextRow } from "@/components";
import { useEthereum } from "@/context/cipMainContext";
import { convertWEITo, numberWithCommas } from "@/utils/helper";
import React, { useEffect, useState } from "react";

type TableHeaderProps = {
  headers: string[];
};

const headers = [
  "Level",
  "No of Referral",
  "Total Staked",
  "Referral Bonus",
  "Rank Bonus",
];

const TeamSummary = () => {
  const { myTeamSummaryData, teamSummaryLoading } = useEthereum();

  const [tableData, setTableData] = useState([]);
  const [sumRef, setSumRef] = useState(0);
  const [_noOfReferral, set_noOfReferral] = useState([]);
  const [_totalStaked, set_totalStaked] = useState([]);
  const [_refBonus, set_refBonus] = useState([]);
  const [_rankBonus, set_rankBonus] = useState([]);

  useEffect(() => {
    // console.log("myTeamSummaryData", myTeamSummaryData);

    if (myTeamSummaryData != undefined && myTeamSummaryData != null) {
      set_noOfReferral(myTeamSummaryData[0]);
      set_totalStaked(myTeamSummaryData[1]);
      set_refBonus(myTeamSummaryData[2]);
      set_rankBonus(myTeamSummaryData[3]);
    } else {
      set_noOfReferral([]);
      set_totalStaked([]);
      set_refBonus([]);
      set_rankBonus([]);
    }
  }, [myTeamSummaryData]);

  useEffect(() => {
    // _noOfReferral uint256[20], _totalStaked uint256[20], _refBonus uint256[20], _rankBonus uint256[20]
    // console.log("_noOfReferral", _noOfReferral);
    if (_noOfReferral.length > 0) {
      const sum = _noOfReferral.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue);
      }, 0);
      setSumRef(sum);
    } else {
      setSumRef(0);
    }
  }, [_noOfReferral]);

  return (
    <div>
      <h2 className="text-2xl font-medium py-8">Team Summary</h2>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table border-separate space-y-6 text-sm w-full">
              <thead className="bg-neutral-900">
                <TableHeader headers={headers} />
              </thead>
              <tbody className="font-semibold">
                {sumRef > 0 ? (
                  _noOfReferral.map((obj, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        {Number(_noOfReferral[ind]) > 0 ? (
                          <TableRow
                            // key={ind}
                            level={ind + 1}
                            noOfRef={_noOfReferral[ind]}
                            totalStaked={_totalStaked[ind]}
                            refBonus={_refBonus[ind]}
                            rankBonus={_rankBonus[ind]}
                          />
                        ) : null}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <></>
                )}
                {/* // <TableRow /> */}
                {/* // <TableRow /> */}
              </tbody>
            </table>
            {sumRef < 1 ? (
              <TextRow>
                {teamSummaryLoading ? "Loading..." : "No Records to Show!"}
              </TextRow>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSummary;

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

const TableRow = ({
  level,
  noOfRef,
  totalStaked,
  refBonus,
  rankBonus,
}: any) => {
  return (
    <tr className="bg-neutral-900 text-center">
      <td className="p-3 text-start">{level}</td>
      <td className="p-3 text-start">{Number(noOfRef)}</td>
      <td className="p-3 text-start">
        $ {numberWithCommas(convertWEITo(String(totalStaked), "ether"))}
      </td>
      <td className="p-3 text-start">
        $ {numberWithCommas(convertWEITo(String(refBonus), "ether"))}
      </td>
      <td className="p-3 text-start">
        $ {numberWithCommas(convertWEITo(String(rankBonus), "ether"))}
      </td>
    </tr>
  );
};
