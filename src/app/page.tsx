"use client";
import {
  AffiliateDetails,
  BonusWithdrawal,
  Container,
  Convertor,
  Header,
  Income,
  SidebarUser,
  Staking,
  StakingDetails,
  StatHeader,
  TeamSummary,
  Ranks,
  DownlineTeam,
  History,
  HeaderUser,
} from "@/components";
import LPStaking2 from "@/components/dashboard/screens/LPStaking2";
import LPTeamSummary from "@/components/dashboard/screens/LPTeamSummary";
import { useEthereum } from "@/context/cipMainContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [open, setOpen] = useState(false);
  const { userActiveTab, setUserActiveTab } = useEthereum();

  const menus = [
    // { id: 1, title: "Staking", src: "coins-hand.svg" },
    // { id: 11, title: "LP Staking!", src: "coins-hand.svg", isNew: true },
    { id: 12, title: "LP Staking", src: "coins-hand.svg", isNew: true },
    { id: 9, title: "Converter", src: "convert.svg" },
    // { id: 2, title: "Staking Details", src: "coins-hand.svg" },
    // { id: 3, title: "Affiliate Details", src: "carbon_collaborate.svg" },
    // { id: 4, title: "Income", src: "arrow-narrow-down-right.svg" },
    // { id: 5, title: "Bonus Withdrawal", src: "coins-hand.svg" },
    // { id: 6, title: "Ranks", src: "fluent_poll.svg" },
    { id: 7, title: "My Team Summary", src: "team.svg" },
    { id: 8, title: "Downline team ", src: "fluent_shifts-team.svg" },
    // { id: 10, title: "History", src: "convert.svg" },
  ];

  return (
    <>
      <div id="home" className="flex bg-black-900">
        <SidebarUser
          menus={menus}
          activeTab={userActiveTab}
          setActiveTab={setUserActiveTab}
          open={open}
          setOpen={setOpen}
        />
        <main className="flex-1 h-screen overflow-auto no-scrollbar">
          <HeaderUser open={open} setOpen={setOpen} />
          <Container>
            <div className="py-5 pb-20">
              <StatHeader />
              {userActiveTab == 12 && <LPStaking2 />}
              {userActiveTab == 9 && <Convertor />}
              {userActiveTab == 8 && <DownlineTeam />}
              {userActiveTab == 7 && <LPTeamSummary />}

              {/* {userActiveTab == 1 && <Staking />}
              {userActiveTab == 2 && <StakingDetails />}
              {userActiveTab == 3 && <AffiliateDetails />}
              {userActiveTab == 4 && <Income />}
              {userActiveTab == 5 && <BonusWithdrawal />}
              {userActiveTab == 6 && <Ranks />}
              {userActiveTab == 10 && <History />} */}
            </div>
          </Container>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
