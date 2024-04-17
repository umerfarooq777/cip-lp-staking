import { useEffect, useState } from "react";
import { Button, Drawer, Dropdown } from "..";
import { CiFilter } from "react-icons/ci";
import { convertWEITo, numberWithCommas, getShortenAddress, getRewardBadge } from "@/utils/helper";
import { AiFillCheckCircle } from "react-icons/ai";

type TableHeaderProps = {
  headers: string[];
  filtersObject: any;
  setFilterObject: any;
  isFilterBonanzaLoading: any;
};

const headers = [
  "Max Leg Amount",
  "Other Leg Amount",
  "Matching",
  "Self Stake",
];

const BonanzaScheme = ({ data, isAdmin, currentWalletAddress, filtersObject, setFilterObject, isFilterBonanzaLoading,isAdminLoading }: any) => {

  useEffect(() => {
    console.log(isAdmin);

  }, [isAdmin])

  return (<>
    {
      isAdmin ?
        <>
          <div>
            <h2 className="text-2xl font-medium py-8">Bonanza Scheme</h2>
            <div className="flex justify-end"></div>
            <div className="flex items-center justify-center">
              <div className="w-full">

                <div className="overflow-auto lg:overflow-visible min-h-screen">
                  <table className="table border-separate space-y-6 text-sm w-full">
                    <thead className="bg-neutral-900">
                      <TableHeader headers={headers} filtersObject={filtersObject} setFilterObject={setFilterObject} isFilterBonanzaLoading={isFilterBonanzaLoading} />
                    </thead>
                    <tbody className="font-semibold">
                      {data !== undefined ? (
                        data.map((item: any, index: any) => {
                          return <TableRow key={index} index = {index} data={item} />;
                        })
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
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
          </div></>
        :

        <h5 className="text-2xl font-medium py-8">{currentWalletAddress ?isAdminLoading? "Please wait....": "Please connect admin wallet" : "Connect Wallet"}</h5>
    }</>
  );
};

export default BonanzaScheme;

const TableHeader = ({ headers, filtersObject, setFilterObject, isFilterBonanzaLoading }: TableHeaderProps) => {

  //! REWARD FILTER
  const slabsReward = ["DMT", "LDP", "10", "20", "50", "100", "250", "500", "1000"];
  const [checkedRewards, setCheckedRewards] = useState<string[]>([]);




  const applyRewardFilters = () => {
    if (checkedRewards.length > 0) {
      console.log(checkedRewards);
      if (checkedRewards.includes("DMT")) {
        const plainText = checkedRewards.filter((item)=> item != "DMT").join(",");

        setFilterObject({ ...filtersObject, reward: plainText,stakereward:'DMT' })
        
      } else {
        const plainText = checkedRewards.join(",");
        setFilterObject({ ...filtersObject, reward: plainText })
        
      }

    }
  };

  const clearRewardFilters = () => {
    setCheckedRewards([]);
    setFilterObject({ ...filtersObject, reward: '' })


  };
  //! ADDRESS FILTER
  const [inputValues, setInputValues] = useState([""]);

  const applyAddressFilters = () => {
    if (inputValues.length > 0) {
      console.log(inputValues);
      const plainText = inputValues.join(",");
      setFilterObject({ ...filtersObject, addresses: plainText })

    }
  };

  const clearAddressFilters = () => {

    setInputValues([""]);
    setFilterObject({ ...filtersObject, addresses: '' })


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
          componentProps={
            {
              inputValues,
              setInputValues,
              applyAddressFilters,
              clearAddressFilters,
              isFilterBonanzaLoading
            }
          }
        />
      </th>
      {headers.map((header: string, index: number) => {
        return (
          <th key={index} className="p-2 text-start whitespace-nowrap">
            {header}
          </th>
        );
      })}
      <th className="p-2 text-start whitespace-nowrap">
        <Drawer
          width={50}
          component={BonanzaFilter}
          buttonChildren={{ icon: CiFilter, label: "Bonanza" }}
          position="right"
          componentProps={
            {
              isFilterBonanzaLoading,
              setCheckedRewards,
              checkedRewards,
              slabsReward,
              applyRewardFilters,
              clearRewardFilters,
            }
          }
        />
      </th>
    </tr>
  );
};

const TableRow = ({ data,index }: any) => {
  let maxLegAmount = data.business.maxLegBusiness.total.toFixed(2);
  let otherLegAmount = data.business.sumOtherLegBusiness.total.toFixed(2)
  let matching = data.matching.toFixed(2)
  let selfStake = data.selfStake.toFixed(2)



  const [showTick, setShowTick] = useState(false);

  const copyToClipboard = (textToCopy: any) => {

    navigator.clipboard.writeText(textToCopy)
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const copyToClipboardWithFeedback = (e: any) => {
    e.preventDefault()
    copyToClipboard(data.userAddress ? data.userAddress : "");
    setShowTick(true);

    setTimeout(() => {
      setShowTick(false);
    }, 3000);
  };

  return (
    <tr className="bg-neutral-900 text-center">
      <td className="p-3 text-start">{index + 1}</td>

      <td className="p-3 text-start flex items-center gap-2" >
        <span className="w-[18ch]"> 

          {getShortenAddress(data.userAddress, 8)}
        </span>
        <div onClick={copyToClipboardWithFeedback} className="w-6">
          {showTick ? (
            <AiFillCheckCircle className="text-xl" />
          ) : (
            <img src="/icons/copy.svg" alt="Copy Icon" className="w-5" style={{ cursor: "pointer" }} />
          )}
        </div>

      </td>
      <td className="p-3 text-center">{maxLegAmount}</td>
      <td className="p-3 text-center">{otherLegAmount}</td>
      <td className="p-3 text-center">{matching}</td>
      <td className="p-3 text-center">{selfStake}</td>
      <td className="p-3 text-start">{data.reward !== "none" && getRewardBadge(data.reward) }{data.stakerReward!=="none"&&getRewardBadge(data.stakerReward)}</td>
    </tr>
  );
};

const AddressFilter = ({ componentProps }: any) => {

  const { inputValues, setInputValues, clearAddressFilters, applyAddressFilters, isFilterBonanzaLoading,setOpen } = componentProps;

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
        <button className="bg-primary w-full flex-1 p-1 text-xs" style={{ cursor: "pointer" }} disabled={isFilterBonanzaLoading} onClick={()=>{applyAddressFilters();setOpen(false);}}>{isFilterBonanzaLoading ? "Loading..." : "Apply"}</button>
        <button className="bg-neutral-800 flex-1" style={{ cursor: "pointer" }} onClick={()=>{clearAddressFilters();setOpen(false);}}>
          Clear
        </button>
      </div>
    </div>
  );
};

const BonanzaFilter = ({ componentProps }: any) => {
  const { setCheckedRewards, checkedRewards, slabsReward, applyRewardFilters, clearRewardFilters, isFilterBonanzaLoading,setOpen } = componentProps

  const handleCheckboxChange = (reward: string) => {
    if (checkedRewards.includes(reward)) {
      setCheckedRewards((prev: any) => prev.filter((item: any) => item !== reward));
    } else {
      setCheckedRewards((prev: any) => [...prev, reward]);
    }
  };



  return (
    <div className={`z-10 overflow-hidden`}>
      <div>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">
          Filters
        </div>
        <div>
          <ul className="">
            <li>
              <button className="bg-primary w-full mb-2 p-1 text-xs" onClick={()=>{applyRewardFilters();setOpen(false);}} disabled={isFilterBonanzaLoading}>
                {isFilterBonanzaLoading ? "loading..." : "Apply"}
              </button>
            </li>
            <li>
              <button
                className="bg-neutral-800 w-full p-1 text-xs"
                onClick={()=>{clearRewardFilters();setOpen(false);}} 
              >
                Clear
              </button>
            </li>
          </ul>
        </div>
        <ul className="mt-2">
          {slabsReward.map((reward: any, index: any) => {
            return (
              <li key={index} className="py-1 px-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-primary bg-neutral-800"
                    onChange={() => handleCheckboxChange(reward)}
                    checked={checkedRewards.includes(reward)}
                  />
                  <span className="text-sm font-medium ml-2">{reward}</span>
                </label>
              </li>
            );
          })}
        </ul>

      </div>
    </div>
  );
};
