import { useCallback, useEffect, useState } from "react";
import { Button, Drawer } from "..";
import { CiFilter } from "react-icons/ci";
import { getShortenAddress } from "@/utils/helper";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEthereum } from "@/context/cipMainContext";

type TableHeaderProps = {
  headers: string[];
  filtersObjectStake: any;
  setFilterObjectStake: any;
  isFilterStakeLoading: any;
  setPageStake: any;
};

const headers = ["Dollar Amount", "Time"];

const StakingEvents = ({
  isAdmin,
  dataStake,
  filtersObjectStake,
  setFilterObjectStake,
  isFilterStakeLoading,
  setPageStake,
  isAdminLoading,
  setDataStake,
  isAllStakeDataRecieved,
  loadMoreStakeData
}: any) => {

  const { currentWalletAddress } = useEthereum()
  return (<>
    {
      isAdmin ?
        <div>
          <h2 className="text-2xl font-medium py-8">Staking Events</h2>
          <div className="flex justify-end"></div>
          <div className="flex items-center justify-center">
            <div className="w-full">
              <div className="overflow-auto lg:overflow-visible min-h-screen">
                <table className="table border-separate space-y-6 text-sm w-full" >
                  <thead className="bg-neutral-900">
                    <TableHeader
                      headers={headers}
                      setPageStake={setPageStake}
                      filtersObjectStake={filtersObjectStake}
                      setFilterObjectStake={setFilterObjectStake}
                      isFilterStakeLoading={isFilterStakeLoading}
                    />
                  </thead>
                  <tbody className="font-semibold">
                    {dataStake !== undefined ? (
                      dataStake.map((item: any, index: any) => {
                        return <TableRow key={index} data={item} index = {index} />;
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
                {
              !isAllStakeDataRecieved&&!isFilterStakeLoading&&
              <div className="w-full flex justify-center pt-5 items-center">
                <Button onClick={()=>{loadMoreStakeData(false,filtersObjectStake)}} className="text-xs ">{isFilterStakeLoading?"Loading more...":"Load More"} </Button>
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
        <div className="flex justify-center items-center h-[75vh]">
          <p className="">{currentWalletAddress ? isAdminLoading? "Please wait....":  "Please connect admin wallet" : "Please connect your wallet"}</p>


        </div>
    }
  </>

  );
};

export default StakingEvents;

const TableHeader = ({
  headers,
  setPageStake,
  filtersObjectStake,
  setFilterObjectStake,
  isFilterStakeLoading,
}: TableHeaderProps) => {
  const {
    notifyError
  } = useEthereum();
  //!=== USER ADDRESS
  const [inputValues, setInputValues] = useState([""]);

  const clearAddressFilter = () => {
    setPageStake(0)
    setInputValues([""]);
    setFilterObjectStake({ ...filtersObjectStake, addresses: "" });
  };
  const applyAddressFilter = () => {
    if (inputValues.length > 0 && inputValues[0] !== "") {
      setPageStake(0)
      const plainAddresses = inputValues.join(",");
      setFilterObjectStake({
        ...filtersObjectStake,
        addresses: plainAddresses,
      });
    } else {
      setFilterObjectStake({ ...filtersObjectStake, addresses: "" });
    }
  };

  //!===  CIP AMOUNT

  const [cipFilterAmount, setCipFilterAmount] = useState({ from: '', to: '' });

  const applyCipAmountFilter = (_cipFilterAmount: any) => {
    // console.log(_cipFilterAmount);

    if (_cipFilterAmount.from && _cipFilterAmount.to) {
      const fromAmount = Number(_cipFilterAmount.from)
      const toAmount = Number(_cipFilterAmount.to)


      if (fromAmount > toAmount) {
        notifyError("From amount must be leaser than To amount")
      } else {
        setPageStake(0)
        setFilterObjectStake({
          ...filtersObjectStake,
          cipamount: `${fromAmount},${toAmount}`,
        });

      }
    } else {
      notifyError("Please provide both amount")

    }
  };


  const clearCipAmountFilter = () => {
    setPageStake(0)
    setCipFilterAmount({ from: '', to: '' })
    setFilterObjectStake({ ...filtersObjectStake, cipamount: "" });
  };


  //!===  DOLLAR AMOUNT

  const [dollarFilterAmount, setDollarFilterAmount] = useState({ from: '', to: '' });



  const applyDollarAmountFilter = (_dollarFilterAmount: any) => {
    // console.log(_dollarFilterAmount);

    if (_dollarFilterAmount.from && _dollarFilterAmount.to) {
      const fromAmount = Number(_dollarFilterAmount.from)
      const toAmount = Number(_dollarFilterAmount.to)


      if (fromAmount > toAmount) {
        notifyError("From amount must be leaser than To amount")
      } else {
        setPageStake(0)
        setFilterObjectStake({
          ...filtersObjectStake,
          dollaramount: `${fromAmount},${toAmount}`,
        });

      }
    } else {
      notifyError("Please provide both amount")
    }
  };
  const clearDollarAmountFilter = () => {
    setPageStake(0)
    setDollarFilterAmount({ from: '', to: '' })
    setFilterObjectStake({ ...filtersObjectStake, dollaramount: "" });
  };

  //!== TIME
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const applyStakeTimeFilter = () => {
    if (startDate && endDate) {
      const _startDate = Math.floor(new Date(startDate).getTime() / 1000);
      const _endDate = Math.floor(new Date(endDate).getTime() / 1000) + 86399; //rest of the seconds of the day selected;
      // console.log(`${_startDate},${_endDate}`);
      if (_startDate < _endDate) {
        setPageStake(0)
        setFilterObjectStake({
          ...filtersObjectStake,
          time: `${_startDate},${_endDate}`,
        });
      } else {
        notifyError("End date must be ahead of start date");
      }
    } else {
      notifyError("Please select both start date and end date");
      // setPageStake(0)
      // setFilterObjectStake({ ...filtersObjectStake, time: "" });
    }
  };
  const clearStakeTimeFilter = () => {
    setPageStake(0)
    setEndDate("");
    setStartDate("");
    setFilterObjectStake({ ...filtersObjectStake, time: "" });
  };
  return (
    <tr>
      <th className="p-2 text-start whitespace-nowrap">

        S.no
      </th>
      <th className="p-2 text-start whitespace-nowrap">
        <Drawer
          component={AddressFilter}
          buttonChildren={{ icon: CiFilter, label: "User Address" }}
          componentProps={
            {
              inputValues: inputValues,
              setInputValues: setInputValues,
              clearAddressFilter: clearAddressFilter,
              applyAddressFilter: applyAddressFilter,
              isFilterStakeLoading: isFilterStakeLoading
            }
          }
        />
      </th>
      <th className="p-2 text-start whitespace-nowrap">
        <Drawer
          component={CIPAmountFilterSatke}
          buttonChildren={{ icon: CiFilter, label: "CIP Amount" }}

          componentProps={
            {
              cipFilterAmount: cipFilterAmount,
              setCipFilterAmount: setCipFilterAmount,
              clearCipAmountFilter: clearCipAmountFilter,
              applyCipAmountFilter: applyCipAmountFilter,
              isFilterStakeLoading: isFilterStakeLoading
            }
          }
        />
      </th>
      <th className="p-2 text-start whitespace-nowrap">
        <Drawer
          component={DollarAmountFilterStake}
          buttonChildren={{ icon: CiFilter, label: "Dollar Amount" }}
          componentProps={
            {
              dollarFilterAmount: dollarFilterAmount,
              setDollarFilterAmount: setDollarFilterAmount,
              clearDollarAmountFilter: clearDollarAmountFilter,
              applyDollarAmountFilter: applyDollarAmountFilter,
              isFilterStakeLoading: isFilterStakeLoading
            }
          }
        />
      </th>
      <th className="p-2 text-start whitespace-nowrap">
        <Drawer
          position="right"
          component={TimeFilter}
          buttonChildren={{ icon: CiFilter, label: "Time" }}
          componentProps={
            {
              startDate: startDate,
              endDate: endDate,
              setStartDate: setStartDate,
              setEndDate: setEndDate,
              clearStakeTimeFilter: clearStakeTimeFilter,
              applyStakeTimeFilter: applyStakeTimeFilter,
              isFilterStakeLoading: isFilterStakeLoading
            }
          }
        />
      </th>
    </tr>
  );
};

const TableRow = ({ data, index }: any) => {
  let _DollarAmount = data.DollarAmount.toFixed(2);
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
      <td className="p-3 text-center">{_CIPAmount}</td>
      <td className="p-3 text-center">{_DollarAmount}</td>
      <td className="p-3 text-start">{_timestamp}</td>
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

const AddressFilter = ({
  componentProps
}: any) => {

  const {
    inputValues,
    setInputValues,
    clearAddressFilter,
    applyAddressFilter,
    isFilterStakeLoading,
    setOpen
  } = componentProps

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
      {inputValues.map((value: any, index: any) => (
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
          disabled={isFilterStakeLoading}
          onClick={()=>{applyAddressFilter();setOpen(false);}}
        >
          {isFilterStakeLoading ? "Loading..." : "Apply"}
        </button>
        <button className="bg-neutral-800 flex-1" onClick={()=>{clearAddressFilter();setOpen(false)}}>
          Clear
        </button>
      </div>
    </div>
  );
};


const CIPAmountFilterSatke = ({
  componentProps
}: any) => {
  const {
    isFilterStakeLoading,
    applyCipAmountFilter,
    clearCipAmountFilter,
    setCipFilterAmount,
    cipFilterAmount
    ,setOpen
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
            setCipFilterAmount((old: any) => ({ ...old, from: e.target.value }));
          }}

        />
        <input
          type="number"
          className="px-2 py-1 w-full bg-neutral-800 text-neutral-300 font-thin focus:outline-none mb-2"
          placeholder="To"
          min={0}
          value={cipFilterAmount.to}
          onChange={(e) => {
            setCipFilterAmount((old: any) => ({ ...old, to: e.target.value }));
          }}
        />
      </div>
      <div className="flex w-full gap-3">
        <button
          className="bg-primary w-full flex-1 p-1 text-xs"
          disabled={isFilterStakeLoading}
          onClick={() => { applyCipAmountFilter(cipFilterAmount);setOpen(false); }}
        >
          {isFilterStakeLoading ? "Loading..." : "Apply"}
        </button>
        <button
          className="bg-neutral-800 flex-1"
          onClick={()=>{clearCipAmountFilter();setOpen(false); }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

const DollarAmountFilterStake = ({
  componentProps
}: any) => {

  const { dollarFilterAmount,
    setDollarFilterAmount,
    clearDollarAmountFilter,
    applyDollarAmountFilter,
    isFilterStakeLoading,setOpen } = componentProps


  return (
    <div>
      <p className="mb-3 text-xs text-start">Custom Amounts:</p>
      <div className="flex w-full gap-3">
        <input
          type="number"
          className="px-2 py-1 w-full bg-neutral-800 text-neutral-300 font-thin focus:outline-none mb-2"
          placeholder="From"
          value={dollarFilterAmount.from}
          onChange={(e) => {
            setDollarFilterAmount((old: any) => ({ ...old, from: e.target.value }));
          }}
        />
        <input
          type="number"
          className="px-2 py-1 w-full bg-neutral-800 text-neutral-300 font-thin focus:outline-none mb-2"
          placeholder="To"
          value={dollarFilterAmount.to}
          onChange={(e) => {
            setDollarFilterAmount((old: any) => ({ ...old, to: e.target.value }));
          }}
        />
      </div>
      <div className="flex w-full gap-3">
        <button
          className="bg-primary w-full flex-1 p-1 text-xs"
          disabled={isFilterStakeLoading}
          onClick={() => { applyDollarAmountFilter(dollarFilterAmount); setOpen(false); }}
        >
          {isFilterStakeLoading ? "Loading..." : "Apply"}
        </button>
        <button
          className="bg-neutral-800 flex-1"
          onClick={()=>{clearDollarAmountFilter(); setOpen(false);}}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

const TimeFilter = ({
  componentProps
}: any) => {
  const { startDate,
    setStartDate,
    endDate,
    setEndDate,
    applyStakeTimeFilter,
    clearStakeTimeFilter,
    isFilterStakeLoading,
  setOpen } = componentProps

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
          onClick={()=>{applyStakeTimeFilter();setOpen(false);}}
          disabled={isFilterStakeLoading}
        >
          {isFilterStakeLoading ? "Loading..." : "Apply"}
        </button>
        <button className="bg-neutral-800 flex-1" onClick={()=>{clearStakeTimeFilter();setOpen(false);}}>Cancel</button>
      </div>
    </>
  );
};
