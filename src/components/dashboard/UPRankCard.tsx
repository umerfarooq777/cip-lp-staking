import { useEthereum } from "@/context/cipMainContext";
import { Button, Input, Loader } from "..";
import { getShortenAddress } from "@/utils/helper";
import { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const UPRankCard = () => {
  const { zeroAdd, userData, CONTRACT_ADDRESS, ABI, currentWalletAddress,
    notifySuccess,
    notifySuccessWithHash,
    notifyError
  } =
    useEthereum();

  const [userUplineAddress, setUserUplineAddress] = useState("");
  const [loaderMsg, setLoaderMsg] = useState("loading...");
  const [loader1, setLoader1] = useState(false);

  const { config: friendUPRankConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "claimUniversalPoolRank",
    args: [userUplineAddress],
    account: currentWalletAddress,
    enabled: userUplineAddress ? true : false,
  });

  const {
    data: friendUPRankData,
    isLoading: friendUPRankIsLoading,
    isSuccess: friendUPRankIsSuccess,
    write: friendUPRankWrite,
    status: friendUPRankStatus,
    reset: friendUPRankReset,
  } = useContractWrite(friendUPRankConfig);

  useEffect(() => {
    if (friendUPRankStatus == "loading") {
      setLoaderMsg("confirm transaction...");
      setLoader1(true);
    }
    if (friendUPRankStatus == "success") {
      setLoaderMsg("Updating friends Universal Pool Rank...");
      setLoader1(true);
    }
    if (friendUPRankStatus == "error") {
      notifyError("Transaction Rejected")
      setLoader1(false);
      setLoaderMsg("");
    }
  }, [friendUPRankStatus]);

  const { data: friendUPRankResponse } = useWaitForTransaction({
    hash: friendUPRankData?.hash,
    onSuccess(data) {
      console.log("final friendUPRank log", data);

      notifySuccessWithHash("Transaction Confirmed", String(friendUPRankData?.hash))
      setLoader1(false);
      setLoaderMsg("");
    },
    onError(data) {
      console.log("final friendUPRank log", data);
      notifyError("Transaction Failed")
      setLoader1(false);
      setLoaderMsg("");
    },
  });

  return (
    <article className="bg-black-700 rounded-lg p-5 w-full h-full">
      <img src="/icons/connections.svg" className="mb-5" alt="" />
      <small className="text-neutral-500 font-medium text-sm md:text-base">
        Referred by
      </small>
      <h3 className="font-semibold text-xl md:text-2xl flex gap-3 items-center mb-5">
        {userData && userData.length > 0
          ? getShortenAddress(userData[6])
          : getShortenAddress(zeroAdd)}
        <span>
          <img src="/icons/info.svg" alt="" />
        </span>
      </h3>
      <form>
        <label
          htmlFor="friendAddress"
          className="text-neutral-500 font-medium text-sm md:text-base"
        >
          Update Friends Universal Pool Rank
        </label>
        <Input
          id="friendAddress"
          name="friendAddress"
          placeholder="Enter Friends Address"
          className="my-5 ring-2 ring-primary ring-opacity-40 text-xs"
          onChange={(e: any) => {
            setUserUplineAddress(e?.target?.value);
          }}
          value={userUplineAddress}
        />

        {loader1 ? (
          <Button disabled className="md:text-base text-sm w-full">
            <Loader isLoading={loader1} msg="" />
          </Button>
        ) : (
          <Button
            disabled={!userUplineAddress || loader1}
            onClick={friendUPRankWrite}
            className="md:text-base text-sm w-full"
          >
            Upgrade Universal Pool Rank
          </Button>
        )}
      </form>
    </article>
  );
};

export default UPRankCard;
