import { useEffect, useRef, useState } from "react";
import { Button, Drawer, Modal, Pagination } from "..";
import { CiFilter } from "react-icons/ci";
import { AiFillCheckCircle } from "react-icons/ai";
import { getShortenAddress } from "@/utils/helper";
import { useEthereum } from "@/context/cipMainContext";
import { FaTrashAlt } from "react-icons/fa";

type TableHeaderProps = {
  headers: string[];
};

const headers = ["S.no", "Address", "Name", "Super Admin", "Actions"];

const AdminPage = ({
  dataAdmin,
  getAllAdminData,
  dataAdminLoading,
  addNewAdmin,
  deleteAdmin
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };
  const handleSelect = () => {
    console.log("Button clicked!");
  };

  return (
    <>
      <div>
        <Modal
          isOpen={isModalOpen}
          setOpen={setIsModalOpen}
          onClose={() => setIsModalOpen(false)}
          buttonProps={{
            label: "Add Admin",
          }}
          addNewAdmin={addNewAdmin}
        />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium py-8">All Admins</h2>
          <Button onClick={() => setIsModalOpen(true)} className="text-xs ">
            Add Admin
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full">
            <div className="overflow-auto lg:overflow-visible min-h-screen">
              <table className="table border-separate space-y-6 text-sm w-full">
                <thead className="bg-neutral-900">
                  <TableHeader headers={headers} />
                </thead>
                <tbody className="font-semibold">
                  {dataAdmin !== undefined ? (
                    dataAdmin.map((item: any, index: any) => {
                      return <TableRow key={index} index={index} data={item} deleteAdmin={deleteAdmin} />;
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

const TableRow = ({ data, index, deleteAdmin }: any) => {
  let _name = data.name;
  let _isSuperAdmin = data.isSuperAdmin;

  const date = new Date(data.timestamp * 1000);

  // const options: Intl.DateTimeFormatOptions = {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  //   second: "numeric",
  //   hour12: false, // Use 24-hour format
  //   timeZone: "UTC", // Adjust this to your desired time zone
  // };

  // const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // // let _timestamp = data.timestamp
  // let _timestamp = formattedDate;

  const [showTick, setShowTick] = useState(false);

  const copyToClipboard = (textToCopy: any) => {
    navigator.clipboard.writeText(textToCopy).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  const copyToClipboardWithFeedback = (e: any) => {
    e.preventDefault();
    copyToClipboard(data.adminAddress ? data.adminAddress : "");
    setShowTick(true);

    setTimeout(() => {
      setShowTick(false);
    }, 3000);
  };

  return (
    <tr className="bg-neutral-900 text-center">
      <td className="p-3 text-start">{index + 1}</td>

      <td className="p-3 text-start flex items-center gap-2">
        <span className="w-[18ch]">
          {getShortenAddress(data.adminAddress, 8)}
        </span>
        <div onClick={copyToClipboardWithFeedback} className="w-6">
          {showTick ? (
            <AiFillCheckCircle className="text-xl" />
          ) : (
            <img
              src="/icons/copy.svg"
              alt="Copy Icon"
              className="w-5"
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </td>
      <td className="p-3 text-start">{_name}</td>
      <td className="p-3 text-start">{_isSuperAdmin ? "Yes" : "No"}</td>
      <td className="p-3 text-start">
        
        {
!data.isSuperAdmin?
<button  onClick={()=> {
    deleteAdmin(data._id)
    
  
  }}>
  <FaTrashAlt />
</button>
:null
      }
       
      </td>
    </tr>
  );
};

const TableHeader = ({ headers }: TableHeaderProps) => {
  const { notifyError } = useEthereum();

  return (
    <tr>
      {headers.map((header: string, index: number) => {
        return (
          <th key={index} className="p-2 text-start whitespace-nowrap">
            {header}
          </th>
        );
      })}

      {/* <th className="p-2 text-start whitespace-nowrap">
        <Drawer
          component={AddressFilter}
            buttonChildren={{ icon: CiFilter, label: "Address" }}
            componentProps={{inputValues,setInputValues,applyAddressFilter,clearAddressFilter,isFilterWithdrawLoading}}
            />
      </th>
      <th className="p-2 text-start whitespace-nowrap">
        <Drawer
          component={CIPAmountFilterDollar}
          buttonChildren={{ icon: CiFilter, label: "CIP Amount" }}
          componentProps={
            {
              cipFilterAmount,
              setCipFilterAmount,
               clearCipAmountFilter,
               applyCipAmountFilter,
               isFilterWithdrawLoading
            }
          }
        />
      </th>
   
      <th className="p-2 text-start whitespace-nowrap">
        <Drawer
          position="right"
          component={TimeFilter}
          buttonChildren={{ icon: CiFilter, label: "Time" }}
          componentProps={{  
            startDate,
            setStartDate,
            endDate,
            setEndDate,
            applyWithdrawTimeFilter,
            clearWithdrawTimeFilter,
            isFilterWithdrawLoading}}

        />
      </th> */}
    </tr>
  );
};

// const TableRow = ({
//   level,
//   noOfRef,
//   totalStaked,
//   refBonus,
//   rankBonus,
// }: any) => {
//   return (
//     <tr className="bg-neutral-900 text-center">
//       <td className="p-3 text-start">{level}</td>
//       <td className="p-3 text-start">{Number(noOfRef)}</td>
//       <td className="p-3 text-start">
//         $ {numberWithCommas(convertWEITo(String(totalStaked), "ether"))}
//       </td>
//       <td className="p-3 text-start">
//         $ {numberWithCommas(convertWEITo(String(refBonus), "ether"))}
//       </td>
//       <td className="p-3 text-start">
//         $ {numberWithCommas(convertWEITo(String(rankBonus), "ether"))}
//       </td>
//     </tr>
//   );
// };
