import { convertWEITo, numberWithCommas } from "@/utils/helper";
import { Button, Input } from "..";
import { useEffect, useState } from "react";
import { useEthereum } from "@/context/cipMainContext";

type Props = {
  userAmount: number,
  finalCIPAmont: any,
}

const CipList = ({ userAmount, finalCIPAmont }: Props) => {
  const { nativeToken } = useEthereum()

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (Number(userAmount) > 0) {

      const currentDate = new Date();
      const endDate = new Date(currentDate);

      // Calculate the end date after 25 months
      endDate.setMonth(endDate.getMonth() + 25);

      setStartDate(currentDate);
      setEndDate(endDate);
    } else {
      setStartDate(null);
      setEndDate(null);

    }
  }, [userAmount]);



  // console.log("list", finalCIPAmont);

  const list = [
    {
      icon: "/icons/tick.svg",
      text: `For Your ${nativeToken}`,
      value: userAmount ? numberWithCommas(userAmount) : false,
    },
    {
      icon: "/icons/gift.svg",
      text: `Est. ${nativeToken} Return`,
      value: userAmount ? numberWithCommas(userAmount * 3) : false,
    },
    {
      icon: "/icons/tick.svg",
      text: "CIP you will Stake",
      value: (userAmount && finalCIPAmont && Number(finalCIPAmont) > 0) ? numberWithCommas(convertWEITo(String(finalCIPAmont), "ether")) : undefined,
    },
    // {
    //   icon: "/icons/gift.svg",
    //   text: "Est. CIP Return",
    //   value: Number(finalCIPAmont) > 0 ? (parseFloat(convertWEITo(String(finalCIPAmont), "ether")) * 3).toFixed(2) : undefined,

    // },
    {
      icon: "/icons/calendar.svg",
      text: "Start Date",
      value: startDate ? startDate?.toLocaleDateString() : undefined,
    },
    {
      icon: "/icons/calendar.svg",
      text: "End Date",
      value: endDate ? endDate?.toLocaleDateString() : undefined,
    },
  ];

  return (
    <article className="bg-black-700 rounded-lg p-5 w-full mb-4">
      {/* <img src="/icons/cee.svg" className="mb-5" alt="" /> */}
      <ul className="bg-[#29195480] p-5 md:m-5 mt-10 rounded-lg flex flex-col gap-6">
        {list.map(({ icon, text, value }, index) => {
          return (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>
                  <img src={icon} alt="" />
                </span>
                <span className="text-sm">{text}</span>
              </div>
              <span>{value ?? "---"}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default CipList;
