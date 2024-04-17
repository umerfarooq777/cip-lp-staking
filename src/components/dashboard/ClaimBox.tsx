import React from "react";
import { Badge } from "..";
import Loader from "../misc/Loader";

type Props = {
  icon: string;
  label: string;
  value: string;
  loading: boolean;
  // loadingMsg: string;
  showClaim: boolean;
  writeHandle: any;
};

const ClaimBox = ({ icon, label, value, loading, writeHandle, showClaim }: Props) => {
  return (
    <article className="bg-black-700 rounded-lg p-5 w-full">
      <img src={icon} className="mb-5" alt="" />
      <small className="text-neutral-500 font-normal text-base">{label}</small>
      <div className="flex items-center justify-between pt-2">
        <h3 className="font-semibold text-2xl">{showClaim ? value : "----"}</h3>
        {

          showClaim ?

            loading ? (
              <Badge className="mt-0.5 text-sm">
                {" "}
                <Loader isLoading={loading} msg="" />
              </Badge>
            ) : (
              <Badge
                className="mt-0.5 text-sm"
                onClick={writeHandle}
              >
                Claim
              </Badge>


            )
            : null
        }
      </div>
    </article>
  );
};

export default ClaimBox;
