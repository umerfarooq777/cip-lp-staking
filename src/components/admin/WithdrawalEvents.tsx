import { useEffect, useRef, useState } from "react";
import { Button, Drawer, Pagination } from "..";
import { CiFilter } from "react-icons/ci";
import { AiFillCheckCircle } from "react-icons/ai";
import { getShortenAddress } from "@/utils/helper";
import { useEthereum } from "@/context/cipMainContext";

type TableHeaderProps = {
  headers: string[];
  filtersObjectWithdraw: any;
  setFilterObjectWithdraw: any;
  isFilterWithdrawLoading: any;
  setPageWithdraw: any;
};

const headers = ["Dollar Amount", "Time"];

const WithdrawalEvents = ({
  isAdmin,
  isAllWithdrawDataRecieved,
  isAdminLoading,
  setDataWithdraw,
  setPageWithdraw,
  loadMoreWithdrawData,
  dataWithdraw,
  filtersObjectWithdraw,
  setFilterObjectWithdraw,
  isFilterWithdrawLoading}:any) => {
  const {currentWalletAddress} = useEthereum()
  
 

  return (
    <>
    {
      isAdmin?
      <div>
      <h2 className="text-2xl font-medium py-8">Withdraw Events</h2>
      <div className="flex justify-end"></div>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="overflow-auto lg:overflow-visible min-h-screen">
            <table className="table border-separate space-y-6 text-sm w-full">
              <thead className="bg-neutral-900">
                <TableHeader headers={headers}
                setPageWithdraw={setPageWithdraw}
                filtersObjectWithdraw={filtersObjectWithdraw}
                setFilterObjectWithdraw={setFilterObjectWithdraw}
                isFilterWithdrawLoading={isFilterWithdrawLoading}
                />
              </thead>
              <tbody className="font-semibold">
              {dataWithdraw !== undefined ? (
                  dataWithdraw.map((item: any, index: any) => {
                    return <TableRow key={index} index = {index} data={item} />;
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
            
            {
              !isAllWithdrawDataRecieved&&!isFilterWithdrawLoading&&
              <div className="w-full flex justify-center pt-5 items-center">
                <Button onClick={()=>{loadMoreWithdrawData(false,filtersObjectWithdraw)}} className="text-xs ">{isFilterWithdrawLoading?"Loading more...":"Load More"} </Button>
              </div>
            }
            {/* {sumRef < 1 ? (
              <TextRow>
                {teamSummaryLoading ? "Loading..." : "No Records to Show!"}
              </TextRow>
            ) : (
              <></>
            )} */}
          </div>
        </div>
      </div>
    </div>

      :
      
      <h5 className="text-2xl font-medium py-8">{currentWalletAddress ?isAdminLoading? "Please wait....":  "Please connect admin wallet" : "Connect Wallet"}</h5>
    }
    
    </>
    
  );
};

export default WithdrawalEvents;

const TableRow = ({ data,index }: any) => {
  let _CIPAmount = data.CIPAmount.toFixed(2);

  const date = new Date(data.timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Use 24-hour format
    timeZone: "UTC", // Adjust this to your desired time zone
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // let _timestamp = data.timestamp
  let _timestamp = formattedDate;

  const [showTick, setShowTick] = useState(false);

  const copyToClipboard = (textToCopy: any) => {
    navigator.clipboard.writeText(textToCopy).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  const copyToClipboardWithFeedback = (e: any) => {
    e.preventDefault();
    copyToClipboard(data.user ? data.user : "");
    setShowTick(true);

    setTimeout(() => {
      setShowTick(false);
    }, 3000);
  };

  return (
    <tr className="bg-neutral-900 text-center">
      <td className="p-3 text-start">{index + 1}</td>

      <td className="p-3 text-start flex items-center gap-2">
        <span className="w-[18ch]">{getShortenAddress(data.user, 8)}</span>
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
      <td className="p-3 text-start">{_CIPAmount}</td>
      <td className="p-3 text-start">{_timestamp}</td>
    </tr>
  );
};

const TableHeader = ({ headers,setPageWithdraw,filtersObjectWithdraw,setFilterObjectWithdraw,isFilterWithdrawLoading }: TableHeaderProps) => {
  const {
    notifyError
  } = useEthereum();

   //!=== USER ADDRESS
   const [inputValues, setInputValues] = useState([""]);

   const clearAddressFilter = () => {
    setPageWithdraw(0)
     setInputValues([""]);
     setFilterObjectWithdraw({ ...filtersObjectWithdraw, addresses: "" });
   };
   const applyAddressFilter = () => {
     if (inputValues.length > 0 && inputValues[0] !== "") {
      setPageWithdraw(0)
       const plainAddresses = inputValues.join(",");
       setFilterObjectWithdraw({
         ...filtersObjectWithdraw,
         addresses: plainAddresses,
       });
     } else {
       setFilterObjectWithdraw({ ...filtersObjectWithdraw, addresses: "" });
     }
   };

   //!===  CIP AMOUNT
  
  const [cipFilterAmount, setCipFilterAmount] = useState({from:'',to:''});

  const applyCipAmountFilter = (_cipFilterAmount:any) => {
    // console.log(_cipFilterAmount);
    
    if (_cipFilterAmount.from && _cipFilterAmount.to) {
      const fromAmount = Number(_cipFilterAmount.from)
      const toAmount = Number(_cipFilterAmount.to)


      if (fromAmount > toAmount) {
        notifyError("From amount must be leaser than To amount")
      } else {
        
      setPageWithdraw(0)
        setFilterObjectWithdraw({
          ...filtersObjectWithdraw,
          cipamount: `${fromAmount},${toAmount}`,
        });
        
      }
    } else {   
         notifyError("Please provide both amount")

    }
  };


  const clearCipAmountFilter = () => {
    setPageWithdraw(0)
    setCipFilterAmount({from:'',to:''})
    setFilterObjectWithdraw({ ...filtersObjectWithdraw, cipamount: "" });
  };


   //!== TIME
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applyWithdrawTimeFilter = () => {
    if (startDate && endDate) {
      const _startDate = Math.floor(new Date(startDate).getTime() / 1000);
      const _endDate = Math.floor(new Date(endDate).getTime() / 1000) + 86399; //rest of the seconds of the day selected
      console.log(`${_startDate},${_endDate}`);
      if (_startDate < _endDate) {
        setPageWithdraw(0)
        setFilterObjectWithdraw({
          ...filtersObjectWithdraw,
          time: `${_startDate},${_endDate}`,
        });
      } else {
        notifyError("End date must be ahead of start date");
      }
    } else {
      setFilterObjectWithdraw({ ...filtersObjectWithdraw, time: "" });
    }
  };
  const clearWithdrawTimeFilter = () => {
    setPageWithdraw(0)
    setEndDate("");
    setStartDate("");
    setFilterObjectWithdraw({ ...filtersObjectWithdraw, time: "" });
  };


  return (
    <tr>
      <th className="p-2 text-start whitespace-nowrap">
        S.no
      </th>
      <th className="p-2 text-start whitespace-nowrap">
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
      </th>
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

const AddressFilter = ({componentProps}:any) => {
  const {inputValues,setInputValues,applyAddressFilter,clearAddressFilter,isFilterWithdrawLoading, setOpen} =componentProps

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value.toLowerCase();
    setInputValues(newInputValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, ""]);
  };

 

  return (
    <div className="flex flex-col items-start">
      <p className="mb-3 text-xs">Filter by Address(s):</p>
      {inputValues.map((value:any, index:any) => (
        <input
          type="text"
          key={index}
          className="px-2 py-1 w-full bg-neutral-800 text-neutral-300 font-thin focus:outline-none mb-2"
          placeholder="e.g. 0x.."
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <button className="py-2 text-xs text-primary" onClick={handleAddInput}>
        + Add Address
      </button>
      <div className="flex w-full gap-3">
      <button
          className="bg-primary w-full flex-1 p-1 text-xs"
          disabled={isFilterWithdrawLoading}
          onClick={()=>{applyAddressFilter();setOpen(false);}}
        >
          {isFilterWithdrawLoading ? "Loading..." : "Apply"}
        </button>
        <button className="bg-neutral-800 flex-1" onClick={()=>{clearAddressFilter();setOpen(false);}}>
          Clear
        </button>
      </div>
    </div>
  );
};

const CIPAmountFilterDollar = ({
  componentProps
}: any) => {
  const{
    cipFilterAmount,
    setCipFilterAmount,
     clearCipAmountFilter,
     applyCipAmountFilter,
     isFilterWithdrawLoading,
     setOpen
  } = componentProps

  return (
    <div>
      <p className="mb-3 text-xs text-start">Custom Amounts:</p>
      <div className="flex w-full gap-3">
        <input
          type="number"
          className="px-2 py-1 w-full bg-neutral-800 text-neutral-300 font-thin focus:outline-none mb-2"
          placeholder="From"
          min={0}
          value={cipFilterAmount.from}
          onChange={(e) => {
            setCipFilterAmount((old:any)=>({...old,from:e.target.value}));
          }}
          
          />
        <input
          type="number"
          className="px-2 py-1 w-full bg-neutral-800 text-neutral-300 font-thin focus:outline-none mb-2"
          placeholder="To"
          min={0}
          value={cipFilterAmount.to}
          onChange={(e) => {
            setCipFilterAmount((old:any)=>({...old,to:e.target.value}));
          }}
        />
      </div>
      <div className="flex w-full gap-3">
        <button
          className="bg-primary w-full flex-1 p-1 text-xs"
          disabled={isFilterWithdrawLoading}
          onClick={() => { applyCipAmountFilter(cipFilterAmount);setOpen(false); }}
        >
          {isFilterWithdrawLoading ? "Loading..." : "Apply"}
        </button>
        <button
          className="bg-neutral-800 flex-1"
          onClick={()=>{clearCipAmountFilter();setOpen(false);}}
        >
          Clear
        </button>
      </div>
    </div>
  );
};


const TimeFilter = ({componentProps}:any) => {
const {  
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  applyWithdrawTimeFilter,
  clearWithdrawTimeFilter,
  isFilterWithdrawLoading,
  setOpen
}=componentProps
  const handleStartDateChange = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: any) => {
    setEndDate(e.target.value);
  };

  return (
    <>
      <p className="mb-3 text-xs text-start">Custom Time:</p>
      <div className="flex flex-col text-start">
        <label className="text-xs mb-2">From:</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="px-2 py-1 w-full bg-neutral-800 text-neutral-300 font-thin focus:outline-none mb-2"
        />
      </div>

      <div className="flex flex-col text-start">
        <label className="text-xs mb-2">To:</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="px-2 py-1 w-full bg-neutral-800 text-neutral-300 font-thin focus:outline-none mb-2"
        />
      </div>
      <div className="flex w-full gap-3 mt-2">
      <button
          className="bg-primary w-full flex-1 p-1 text-xs"
          onClick={()=>{applyWithdrawTimeFilter();setOpen(false);}}
          disabled={isFilterWithdrawLoading}
        >
          {isFilterWithdrawLoading?"Loading...":"Apply"}
        </button>
        <button className="bg-neutral-800 flex-1" onClick={()=>{clearWithdrawTimeFilter();setOpen(false)}}>Cancel</button>
      </div>
    </>
  );
};
