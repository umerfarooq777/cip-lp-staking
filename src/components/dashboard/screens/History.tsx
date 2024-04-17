import axios from "axios";
import React, { useEffect, useState } from "react";
import StakingHistory from "./StakingHistory";
import WithdrawalHistory from "./WithdrawalHistory";
import { useEthereum } from "@/context/cipMainContext";


const History = () => {
  const [stakingData, setStakingData] = useState([]);
  const [withdrawalData, setWithdrawalData] = useState([]);
  const { currentWalletAddress, zeroAdd } = useEthereum();
  const [stakingLoading, setStakingLoading] = useState(true);
  const [withdrawalLoading, setWithdrawalLoading] = useState(true);

  const cipstakeds = async () => {
    const APIURL =
      "https://api.studio.thegraph.com/query/49544/cip-2/version/latest";
      // "https://api.studio.thegraph.com/query/57860/cip-main/v0.0.1";
    const res = await axios
      .post(APIURL, {
        query: `
        query GetCipStakeds($userAddress: String!) {
          cipstakeds(where: { user: $userAddress }) {
            user
            CIPAmount
            DollarAmount
            timestamp
          }
        }
          `,
          variables: { userAddress: currentWalletAddress }
        // query: `{
        //     cipstakeds {
        //       user
        //       CIPAmount
        //       DollarAmount
        //       timestamp
        //     }
        //   }
        //   `,
      })
      .then((res) => {
        const data = res?.data?.data?.cipstakeds;
        // const filteredData = data.filter(
        //   (item: any) => item.user?.toLowerCase() == currentWalletAddress?.toLowerCase()
        // );
        // setStakingData(filteredData);
        setStakingData(data);
        setStakingLoading(false)
      });
  };

  const withdraws = async () => {
    const APIURL =
      "https://api.studio.thegraph.com/query/49544/cip-2/version/latest";
      // "https://api.studio.thegraph.com/query/57860/cip-main/v0.0.1";
    const res = await axios
      .post(APIURL, {
        query: `
        query GetWithdraws($userAddress: String!) {
          withdraws(where: { user: $userAddress }) {
            user
            CIPAmount
            timestamp
          }
        }
        `,
        variables: { userAddress: currentWalletAddress }

      })
      .then((res) => {
        const data = res?.data?.data?.withdraws;
        // const filteredData = data.filter(
        //   (item: any) => item.user?.toLowerCase() == currentWalletAddress?.toLowerCase()
        // );
        // setWithdrawalData(filteredData);
        setWithdrawalData(data);
        setWithdrawalLoading(false)
      });
  };
  useEffect(() => {
    if (currentWalletAddress) {
      cipstakeds();
      withdraws();
    }
  }, []);

  return (
    <>
      <StakingHistory data={stakingData} loading={stakingLoading} />
      <WithdrawalHistory data={withdrawalData} loading={withdrawalLoading}/>
    </>
  );
};

export default History;

