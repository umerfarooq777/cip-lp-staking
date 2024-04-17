"use client";
import {
  BonanzaScheme,
  Sidebar,
  WithdrawalEvents,
  StakingEvents,
  Header,
  Container,
} from "@/components";
import AdminPage from "@/components/admin/AdminPage";
import { useEthereum } from "@/context/cipMainContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  const { notifyError, notifySuccess, currentWalletAddress } = useEthereum();

  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [filtersObject, setFilterObject] = useState({});
  const [isFilterBonanzaLoading, setIsFilterBonanzaLoading] = useState(false);
  const [filtersObjectStake, setFilterObjectStake] = useState({});
  const [isFilterStakeLoading, setIsFilterStakeLoading] = useState(false);
  const [filtersObjectWithdraw, setFilterObjectWithdraw] = useState({});
  const [isFilterWithdrawLoading, setIsFilterWithdrawLoading] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  useEffect(() => {
    async function checkUserIsAdminOrSuperAdmin() {
      if (currentWalletAddress) {
        setIsAdminLoading(true);
        await axios
          .get(
            `${backendBaseUrl}api/isadmin/${currentWalletAddress.toLowerCase()}`
          )
          .then((response) => {
            setIsAdmin(response.data.isAdmin);
            setIsSuperAdmin(response.data.isSuperAdmin);
            setIsAdminLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setIsAdmin(false);
            setIsSuperAdmin(false);
            setIsAdminLoading(false);
          });
      } else {
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setIsAdminLoading(false);
      }
    }

    checkUserIsAdminOrSuperAdmin();
  }, [currentWalletAddress]);

  //! =========== A D M I N

  const [dataAdmin, setDataAdmin] = useState([]);
  const [dataAdminLoading, setDataAdminLoading] = useState(false);

  async function getAllAdminData() {
    if (currentWalletAddress && isSuperAdmin) {
      setDataAdminLoading(true);

      await axios
        .get(`${backendBaseUrl}api/admin`)
        .then((response: any) => {
          setDataAdmin(response.data);
          setDataAdminLoading(false);
        })
        .catch((error: any) => {
          console.error("Error:", error);
          setDataAdmin([]);
          setDataAdminLoading(false);
        });
    }
  }

  let testAdminObject = {
    adminAddress: "0x98D46295Ab7c25DeC396509dD96110516EE5fbFF",
    name: "Sidhant",
    addedOrUpdatedBy: "0x808f0597d8b83189ed43d61d40064195f71c0d15",
    isSuperAdmin: true,
  };

  async function deleteAdmin(_objId: string) {
    if (currentWalletAddress && isSuperAdmin) {
      await axios
        .delete(`${backendBaseUrl}api/admin/${_objId}`)
        .then((response: any) => {
          notifySuccess(response.data.msg);
          getAllAdminData();
        })
        .catch((error: any) => {
          console.error("Error:", error);
          notifyError("Something went wrong");
          getAllAdminData();
        });
    }
  }

  async function updateAdminData(_objId: string, _updatedAdminObject: any) {
    if (currentWalletAddress && isSuperAdmin) {
      await axios
        .put(`${backendBaseUrl}api/admin/${_objId}`)
        .then((response: any) => {
          notifySuccess(response.data.msg);
          getAllAdminData();
        })
        .catch((error: any) => {
          console.error("Error:", error);
          notifyError("Something went wrong, updating admin");
          getAllAdminData();
        });
    }
  }

  async function addNewAdmin(_newAdminObject: any) {
    if (currentWalletAddress && isSuperAdmin) {
      await axios
        .post(`${backendBaseUrl}api/admin`, _newAdminObject)
        .then((response: any) => {
          notifySuccess(response.data.msg);
          getAllAdminData();
        })
        .catch((error: any) => {
          console.error("Error:", error.response.data.msg);
          notifyError(error.response.data.msg);
          getAllAdminData();
        });
    }
  }

  useEffect(() => {
    getAllAdminData();
  }, [isSuperAdmin, currentWalletAddress]);
  //!== ================= S T A K E

  const [dataStake, setDataStake] = useState<any[]>([]);
  const [pageStake, setPageStake] = useState(0);
  const [isAllStakeDataRecieved, setIsAllStakeDataRecieved] = useState(false);
  let ignoreOnceStake = useRef(false);
  const loadMoreStakeData = async (
    isNewData: boolean,
    filtersObjectStake: any
  ) => {
    if (!isAllStakeDataRecieved) {
      const newData = await fetchStakeData(pageStake + 1, filtersObjectStake);
      if (newData && newData.length < 25) {
        setIsAllStakeDataRecieved(true);
        setPageStake(0);
      }
      if (isNewData) {
        setDataStake(newData);
      } else {
        setDataStake((prevData) => [...prevData, ...newData]);
      }
      // setPageStake((prevPage) => prevPage + 1);
    }
  };

  
  const fetchStakeData = async (page: number, filtersObjectStake: any) => {
    try {
      console.log("pageStake sent", page, filtersObjectStake);

      setIsFilterStakeLoading(true);
      // console.log(filtersObjectStake);
      const data = await axios
        .get(`${backendBaseUrl}api/filterstake?stakepage=${page}`, {
          params: filtersObjectStake,
        })
        .then((response) => {
          // setDataStake(response.data)
          // setIsFilterStakeLoading(false)
          setPageStake(page);

          return response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          // setIsFilterStakeLoading(false)
          return [];
        });
      setIsFilterStakeLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsFilterStakeLoading(false);
      // throw error;
    }
  };

  useEffect(() => {
    //   if(ignoreOnceStake.current){
    //     return
    // }
    // ignoreOnceStake.current = true;
    loadMoreStakeData(pageStake === 0, filtersObjectStake);
  }, [filtersObjectStake]);

  //!== WITHDRAW

  const [dataWithdraw, setDataWithdraw] = useState<any[]>([]);
  const [pageWithdraw, setPageWithdraw] = useState(0);
  const [isAllWithdrawDataRecieved, setIsAllWithdrawDataRecieved] =
    useState(false);
  let ignoreOnceWithdraw = useRef(false);
  const loadMoreWithdrawData = async (
    isNewData: boolean,
    filtersObjectWithdraw: any
  ) => {
    console.log("loadMoreWithdrawData");

    if (!isAllWithdrawDataRecieved) {
      const newData = await fetchWithdrawData(
        pageWithdraw + 1,
        filtersObjectWithdraw
      );
      if (newData && newData.length < 25) {
        setIsAllWithdrawDataRecieved(true);
        setPageWithdraw(0);
      }
      if (isNewData) {
        setDataWithdraw(newData);
      } else {
        setDataWithdraw((prevData) => [...prevData, ...newData]);
      }
      // setPageWithdraw((prevPage) => prevPage + 1);
    }
  };

  const fetchWithdrawData = async (
    page: number,
    filtersObjectWithdraw: any
  ) => {
    try {
      console.log("pageWithdraw sent", page, filtersObjectWithdraw);

      setIsFilterWithdrawLoading(true);
      // console.log(filtersObjectWithdraw);
      const data = await axios
        .get(`${backendBaseUrl}api/filterwithdraw?withdrawpage=${page}`, {
          params: filtersObjectWithdraw,
        })
        .then((response) => {
          // setDataWithdraw(response.data)
          // setIsFilterWithdrawLoading(false)
          setPageWithdraw(page);

          return response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          // setIsFilterWithdrawLoading(false)
          return [];
        });
      setIsFilterWithdrawLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsFilterWithdrawLoading(false);
      // throw error;
    }
  };

  useEffect(() => {
    // if(ignoreOnceWithdraw.current){
    //     return
    // }
    // ignoreOnceWithdraw.current = true;
    loadMoreWithdrawData(pageWithdraw === 0, filtersObjectWithdraw);
  }, [filtersObjectWithdraw]);

  //!== BONANZA
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsFilterBonanzaLoading(true);
    // console.log(filtersObject);
    axios
      .get(`${backendBaseUrl}api/filterbonanza`, { params: filtersObject })
      .then((response: any) => {
        setData(response.data);
        setIsFilterBonanzaLoading(false);
      })
      .catch((error: any) => {
        console.error("Error:", error);
        setIsFilterBonanzaLoading(false);
      });
  }, [filtersObject]);

  const [open, setOpen] = useState(false);

  const menus = [
    { id: 1, title: "Staking Events", src: "coins-hand.svg" },
    { id: 2, title: "Bonanza Scheme", src: "convert.svg" },
    { id: 3, title: "Withdrawal Events", src: "convert.svg" },
  ];

  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <div id="home" className="flex bg-black-900">
        {isAdmin && (
          <Sidebar
            isAdmin={isAdmin}
            isSuperAdmin={isSuperAdmin}
            menus={menus}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            open={open}
            setOpen={setOpen}
          />
        )}{" "}
        <main className="flex-1 h-screen overflow-auto no-scrollbar">
          <Header open={open} setOpen={setOpen} isAdmin={isAdmin} />
          <Container>
            <div className="py-5 pb-20">
              {activeTab == 1 && (
                <StakingEvents
                  isAdminLoading={isAdminLoading}
                  setPageStake={setPageStake}
                  isAllStakeDataRecieved={isAllStakeDataRecieved}
                  loadMoreStakeData={loadMoreStakeData}
                  dataStake={dataStake}
                  isAdmin={isAdmin}
                  setFilterObjectStake={setFilterObjectStake}
                  filtersObjectStake={filtersObjectStake}
                  isFilterStakeLoading={isFilterStakeLoading}
                />
              )}
              {activeTab == 2 && (
                <BonanzaScheme
                  isAdminLoading={isAdminLoading}
                  data={data}
                  isAdmin={isAdmin}
                  currentWalletAddress={currentWalletAddress}
                  setFilterObject={setFilterObject}
                  filtersObject={filtersObject}
                  isFilterBonanzaLoading={isFilterBonanzaLoading}
                />
              )}
              {activeTab == 3 && (
                <WithdrawalEvents
                  isAdminLoading={isAdminLoading}
                  isAllWithdrawDataRecieved={isAllWithdrawDataRecieved}
                  setDataWithdraw={setDataWithdraw}
                  setPageWithdraw={setPageWithdraw}
                  pageWithdraw={pageWithdraw}
                  loadMoreWithdrawData={loadMoreWithdrawData}
                  dataWithdraw={dataWithdraw}
                  isAdmin={isAdmin}
                  setFilterObjectWithdraw={setFilterObjectWithdraw}
                  filtersObjectWithdraw={filtersObjectWithdraw}
                  isFilterWithdrawLoading={isFilterWithdrawLoading}
                />
              )}
              {activeTab == 4 && (
                <AdminPage
                  deleteAdmin={deleteAdmin}
                  addNewAdmin={addNewAdmin}
                  dataAdmin={dataAdmin}
                  getAllAdminData={dataAdmin}
                  dataAdminLoading={dataAdminLoading}
                />
              )}
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
