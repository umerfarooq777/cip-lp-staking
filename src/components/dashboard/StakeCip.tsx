import { useEthereum } from "@/context/cipMainContext";
import { Button, Input, Loader } from "..";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { convertWEITo, numberWithCommas } from "@/utils/helper";

type Props = {
  headAddress: string;
  currentWalletAddress: string;
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
  userAmount: number;
  setUserAmount: Dispatch<SetStateAction<number>>;
  userUplineAddress: string;
  setUserUplineAddress: Dispatch<SetStateAction<string>>;
  actionState: any;
  approveWrite: any;
  stakeWrite: any;
  isStakeLoading: boolean;
  isApproveLoading: boolean;
  referral: any;
};
const StakeCip = ({
  userAddress,
  userAmount,
  userUplineAddress,
  setUserAddress,
  setUserAmount,
  setUserUplineAddress,
  headAddress,
  currentWalletAddress,
  actionState,
  approveWrite,
  stakeWrite,
  isStakeLoading,
  isApproveLoading,
  referral,
}: Props) => {
  useEffect(() => {
    console.log("actionState", actionState);
  }, [actionState]);

  const { nativeTokenSymbol, userData, zeroAdd } = useEthereum();

  let userRefAddress = userData && userData[6]
  let finalAddress = userRefAddress?.toLowerCase() !== zeroAdd ? userRefAddress : referral !== "" ? referral : headAddress

  return (
    <article className="bg-black-700 rounded-lg p-5 w-full">
      <div className="flex items-center mb-5 justify-between">
        <img src="/icons/connections.svg" alt="" />
        <span className="text-[#8861FF] font-semibold">300% In 25 months</span>
      </div>
      <small className="text-neutral-500 font-medium text-base">
        Staked CIP
      </small>

      {userData && userData.length > 0 ? (
        <h3 className="font-semibold text-2xl flex gap-3 items-center mb-5">
          {`${nativeTokenSymbol} ${numberWithCommas(convertWEITo(userData[3], "ether"))}`}
        </h3>
      ) : (
        <h3 className="font-semibold text-2xl flex gap-3 items-center mb-5">
          $ 00.00
        </h3>
      )}

      {/* ========================================================== */}

      <div>
        <label
          htmlFor="stakeAmount"
          className="text-neutral-500 font-medium text-sm md:text-base"
        >
          User Address
        </label>
        <Input
          id="userAddress"
          name="userAddress"
          solidBg
          className="mt-1 md:mt-3 mb-5 text-xs"
          onChange={(e: any) => {
            setUserAddress(e?.target?.value);
          }}
          value={userAddress ? userAddress : currentWalletAddress}
        />
        <label
          htmlFor="stakeAmount"
          className="text-neutral-500 font-medium text-sm md:text-base"
        >
          $ Amount To Be Staked
        </label>
        <Input
          type="number"
          id="stakeAmount"
          name="stakeAmount"
          solidBg
          className="mt-1 md:mt-3 mb-5 text-xs"
          // min="100"
          value={userAmount}
          onChange={(e: any) => {
            setUserAmount(e?.target?.value);
          }}
          required
        />
        <label
          htmlFor="refAddress"
          className="text-neutral-500 font-medium text-sm md:text-base"
        >
          Referral Address
        </label>
        <Input
          id="refAddress"
          namae="refAddress"
          solidBg
          className="mt-1 md:mt-3 mb-5 text-xs"
          onChange={(e: any) => {
            setUserUplineAddress(e?.target?.value);
          }}
          // value={userUplineAddress ? userUplineAddress : userRefAddress ? userRefAddress : headAddress}
          value={userUplineAddress ? userUplineAddress : finalAddress}
          disabled
        />
        {/* <Button className="w-full md:text-base text-sm">Stake Now</Button> */}

        {actionState === 0 ? ( //================================================== approval state
          <Button
            className="w-full md:text-base text-sm"
            disabled={isApproveLoading}
            onClick={isApproveLoading ? "" : approveWrite}
          >
            {isApproveLoading ? (
              <Loader isLoading={isApproveLoading} msg="" />
            ) : (
              "Approve Now"
            )}
          </Button>
        ) : actionState === 1 ? ( //==================================================stake state
          <Button
            className="w-full md:text-base text-sm"
            disabled={isStakeLoading}
            onClick={isStakeLoading ? "" : stakeWrite}
          // onClick={() => { stakeWrite?.() }}
          >
            {isStakeLoading ? (
              <Loader isLoading={isStakeLoading} msg="" />
            ) : (
              "Stake Now"
            )}
          </Button>
        ) : null

        }
      </div>
    </article>
  );
};

export default StakeCip;
