import React from "react";
import { ItemBox, JoinCryptoIndex, RedeemToken, ReferralLink, UPRankCard } from "../..";
import { useEthereum } from "@/context/cipMainContext";
import { convertWEITo } from "@/utils/helper";

const AffiliateDetails = () => {
  const { nativeTokenSymbol, userData, userCurrentCIPBalance } = useEthereum();

  // const items = [
  //   {
  //     icon: "/icons/cee.svg",
  //     label: "Available CIP",
  //     value: userCurrentCIPBalance ? `${nativeTokenSymbol} ${convertWEITo(userCurrentCIPBalance, "ether")}` : "$ 00.00",
  //   },
  //   {
  //     icon: "/icons/dollar.svg",
  //     label: "My investment",
  //     value: userData && userData.length > 0 ? `${nativeTokenSymbol} ${convertWEITo(userData[3], "ether")}` : "$ 00.00",
  //   },
  // ];
  return (
    <div id="affiliate_details">
      <h2 className="text-2xl font-medium py-8">Affiliate Details</h2>
      <div className="mb-4">
        {/* <RedeemToken /> // uncomment if needed*/}
      </div>
      <div className="grid grid-cols-two gap-4">
        {/* {items.map(({ icon, label, value }, index) => {
          return (
            <div key={index} className={`${index == 2 ? "col-span-2" : "col-span-2"}`}>
              <ItemBox key={index} icon={icon} label={label} value={value} />
            </div>
          );
        })} */}
        <div>
          <UPRankCard />
        </div>
        <ReferralLink />
      </div>

    </div>
  );
};

export default AffiliateDetails;
