import React from "react";
import { BonusWithdrawalCard, ItemBox, Note } from "../..";
import { useEthereum } from "@/context/cipMainContext";
import { convertWEITo, numberWithCommas } from "@/utils/helper";
import { BsFillInfoCircleFill } from "react-icons/bs";

const BonusWithdrawal = () => {
  const { userBonusData, nativeTokenSymbol } = useEthereum();
  const items = [
    {
      icon: "/icons/dollar-sack.svg",
      label: "Level Income",
      value: `${userBonusData
        ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(String(userBonusData[2]), "ether"))}`
        : "$ 00.00"
        }`,
    },
    {
      icon: "/icons/rank.svg",
      label: "Rank Bonus",
      value: `${userBonusData
        ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(String(userBonusData[3]), "ether"))}`
        : "$ 00.00"
        }`,
    },
    {
      icon: "/icons/cee.svg",
      label: "Universal Pool Bonus",
      value: "$ 00.00",
    },

    // {
    //   icon: "/icons/gift-circle.svg",
    //   label: "Bonus Available",
    //   value: `$ ${userBonusData ? numberWithCommas(convertWEITo(String(userBonusData[8]), "ether")) : "00.00"}`,
    // },
    {
      icon: "/icons/gift-circle.svg",
      label: "Bonus credited",
      value: `${userBonusData
        ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(String(userBonusData[5]), "ether"))}`
        : "$ 00.00"
        }`,
    },
    {
      icon: "/icons/gift-circle.svg",
      label: "Bonus Withdrawn",
      value: `${userBonusData
        ? `${nativeTokenSymbol} ${numberWithCommas(convertWEITo(String(userBonusData[7]), "ether"))}`
        : "$ 00.00"
        }`,
    },
  ];
  return (
    <div id="affiliate_details">
      <h2 className="text-2xl font-medium py-10">Bonus Withdrawal</h2>
      <Note
        className="mb-5"
        icon={BsFillInfoCircleFill}
        iconClass="text-rose-800"
      >
        Note: To get all bonuses you must first withdraw your available ROI
      </Note>
      <div className="flex flex-col-reverse xl:flex-col gap-4">
        <div className="grid grid-cols-four gap-4">
          {items.slice(0, 3).map(({ icon, label, value }, index) => {
            return <ItemBox key={index} icon={icon} label={label} value={value} />;
          })}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            {items.slice(3).map(({ icon, label, value }, index) => {
              return (
                <div
                  key={index}
                  className={` ${index == 0 ? "col-span-2" : "col-span-2 sm:"}`}
                >
                  <ItemBox icon={icon} label={label} value={value} />
                </div>
              );
            })}
          </div>
          <div className="row-start-1 xl:row-start-auto">
            <BonusWithdrawalCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusWithdrawal;
