"use client";
import { CLIENT_BASE_URL, useEthereum } from "@/context/cipMainContext";
import { Input } from "..";
import { useRouter } from "next/router";
import { copyToClipboard } from "@/utils/helper";
import { useEffect, useState } from "react";

let CryptoJS = require("crypto-js");
// import * as CryptoJS from 'crypto-js'

// import AES from 'crypto-js/aes';
// import { enc } from 'crypto-js';

const ReferralLink = () => {
  const { notifySuccess, zeroAdd, userData, currentWalletAddress } =
    useEthereum();
  // console.log(userData);
  let userId = userData && userData.length > 0 ? Number(userData[0]) : 0;
  const baseUrl = CLIENT_BASE_URL;

  // const encryptId = (str) => {
  //   const ciphertext = AES.encrypt(str, 'secretPassphrase');
  //   return encodeURIComponent(ciphertext.toString());

  // }

  // useEffect(() => {
  //   if (currentWalletAddress) {

  //     let urlFinal = `${baseUrl}?referralcode=${hashVal}`
  //   } else {
  //     setHash('')
  //   }

  // }, [currentWalletAddress])
  const handleCopyData = (data: any) => {
    copyToClipboard(data);

    const timer = setTimeout(() => {
      console.log("dataCopy", data); // for reseting icon
    }, 1000);

    return () => clearTimeout(timer);
  };

  // useEffect(() => {
  //   if (hasRun) {
  //     const timer = setTimeout(() => {
  //       // Your one-time code to run after 1 second
  //       console.log("Function executed after 1 second");
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [hasRun]);

  return (
    <>
      {(currentWalletAddress && userId > 0) ? (
        <article className="bg-neutral-900 rounded-lg p-5 w-full h-full flex flex-col justify-center items-start">
          <img src="/icons/connections.svg" className="mb-5" alt="" />
          <small className="text-neutral-500 font-medium text-sm md:text-base">
            Referral Link
          </small>
          <div className="w-full">
            <Input
              // defaultValue={userData && userData.length > 0 ? userData[6] : zeroAdd}
              defaultValue={
                currentWalletAddress
                  ? `${baseUrl}?referralcode=${currentWalletAddress}`
                  : "connect your wallet"
              }
              placeholder="Referred By"
              className="ring-2 ring-primary ring-opacity-40 w-full mt-4 text-xs"
              disabled
              icon="/icons/copy.svg"
              readOnly
            />
          </div>
        </article>
      ) : null}
    </>
  );
};

export default ReferralLink;
