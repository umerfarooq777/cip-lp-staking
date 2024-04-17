import { useEthereum } from "@/context/cipMainContext";
import { convertWEITo, numberWithCommas } from "@/utils/helper";
import React from "react";

const StatHeader = () => {
  const { totalValueLocked, oneCIPpriceInDAI, nativeTokenSymbol, userCIPBalance,lpDownLineTeamSize } =
    useEthereum();
  const stats = [
    {
      label: "Your CIP Pro Balance",
      value:
        `${numberWithCommas(convertWEITo(
          userCIPBalance ? userCIPBalance : "0",
          "ether"
        ))}` ?? "$ 00.00",
    },
    {
      label: "Total Value Locked",
      value:
        `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(
          totalValueLocked ? totalValueLocked : "0",
          "ether"
        ))}` ?? "$ 00.00",
    },
    {
      label: "CIP Pro Price",
      value:
        `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(
          oneCIPpriceInDAI ? oneCIPpriceInDAI : "0",
          "ether"
        ))}` ?? "$ 00.00",
    },
    {
      label: "Team Size",
      value: `${lpDownLineTeamSize}`,
    },
  ];
  return (
    <header className="bg-gradient-custom py-6 px-5 md:px-10 rounded-lg">
      <ul className="flex flex-col lg:flex-row gap-5 justify-between">
        {stats.map(({ label, value }, index) => {
          return (
            <li key={index}>
              <small className="text-neutral-400 font-light text-sm lg:text-base">
                {label}
              </small>
              <h3 className="font-semibold text-xl xl:text-2xl">{value}</h3>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default StatHeader;
