import { Button, GradientItem, Input, Select } from "@/components";
import Loader from "@/components/misc/Loader";
import { DISABLE_FUNC, TEST_MODE, useEthereum } from "@/context/cipMainContext";
import { convertETHTo, convertWEITo, useDebounce } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

const Convertor = () => {
  const { CONTRACT_ADDRESS, ABI,
    UNISWAP_UTILITY_ADDRESS,
    UNISWAP_UTILITY_ABI ,
    CIP_PRO_ARBI,
    DAI_ARBI
  
  } = useEthereum();
  const options = [
    {
      id: "0",
      icon: "/icons/cip.svg",
      value: "CIP Pro",
    },
    {
      id: "1",
      icon: "/icons/usd.svg",
      value: "USD",
    },
  ];

  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const debouncedVal = useDebounce(inputVal, 500);
  const [dai, setDAI] = useState("");
  const [cip, setCIP] = useState("");
  const [loading, setLoading] = useState(false);
  // const [currentoptions, _getOptions] = useState('')
  const [currentOption, setCurrentOption] = useState(options[1]);
  const [convertedOption, setConvertedOption] = useState(options[0]);

  // const { data: finalDAIAmount, status: daiStatus } = useContractRead({
  //   address: CONTRACT_ADDRESS,
  //   abi: ABI,
  //   functionName: "_getPriceDAI",
  //   args: [convertETHTo(cip, "wei")],
  //   watch: true,
  //   enabled: Number(cip) >= 0 ? true : false,
  // });

    const { data: finalDAIAmount, status: daiStatus } = useContractRead({
    address: UNISWAP_UTILITY_ADDRESS,
    abi: UNISWAP_UTILITY_ABI,
    functionName: "getPrice",
    args: [CIP_PRO_ARBI,DAI_ARBI,convertETHTo(cip, "wei"),"10000"],
    watch: true,
    enabled: DISABLE_FUNC,
  });

  // const { data: finalCIPAmount, status: cipStatus } = useContractRead({
  //   address: CONTRACT_ADDRESS,
  //   abi: ABI,
  //   functionName: "_getPriceCIP",
  //   args: [convertETHTo(dai, "wei")],
  //   watch: true,
  //   enabled: Number(dai) >= 0 ? true : false,
  // });

    const { data: finalCIPAmount, status: cipStatus } = useContractRead({
      address: UNISWAP_UTILITY_ADDRESS,
      abi: UNISWAP_UTILITY_ABI,
      functionName: "getPrice",
      args: [DAI_ARBI,CIP_PRO_ARBI,convertETHTo(dai, "wei"),"10000"],
      watch: true,
      enabled:  debouncedVal!=="" ,
  });

  useEffect(() => {
    console.log(daiStatus, cipStatus);
  }, [daiStatus, cipStatus]);

  function fetchPrices() {
    console.log("debouncedVal",debouncedVal);
    if (
      debouncedVal != undefined &&
      debouncedVal != "" &&
      Number(debouncedVal) >= 0
    ) {
      if (currentOption.id === "1") {
        //usd to cip
        setCIP("");
        setDAI(debouncedVal);
      } else {
        // cip to usd
        setDAI("");
        setCIP(debouncedVal);
      }
    } else {
      setOutputVal("");
    }
  }

  useEffect(() => {
    console.log("finalCIPAmount",finalCIPAmount)
    if (currentOption.id === "1" && finalCIPAmount != undefined) {
      setOutputVal(convertWEITo(String(finalCIPAmount), "ether"));
    } else if (currentOption.id === "0" && finalDAIAmount != undefined) {
      setOutputVal(convertWEITo(String(finalDAIAmount), "ether"));
    }
  }, [finalDAIAmount, finalCIPAmount]);

  useEffect(() => {
    if (currentOption.id === "1") {
      setConvertedOption(options[0]);
    } else {
      setConvertedOption(options[1]);
    }
    if (
      debouncedVal != undefined &&
      debouncedVal != "" &&
      Number(debouncedVal) >= 0
    ) {
      fetchPrices();
    } else {
      setOutputVal("");
    }
  }, [currentOption]);

  useEffect(() => {
    if (
      debouncedVal != undefined &&
      debouncedVal != "" &&
      Number(debouncedVal) >= 0
    ) {
      fetchPrices();
    } else {
      setOutputVal("");
    }
  }, [debouncedVal]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium  py-8">Convertor</h2>
        {/* <GradientItem className="bg-neutral-950 text-xs md:text-base"><img src="/icons/cee.svg" className="w-[2em]" alt="Icon" /><span>0X152611166</span></GradientItem> */}
      </div>
      <div className="max-w-xl mx-auto pb-10">
        <article className="bg-[#1C1C26] w-full rounded-lg p-4 md:p-7">
          <h3>Conversion</h3>
          <small>From</small>
          <div className="flex items-center bg-neutral-900 rounded-xl p-1 md:p-3 w-full shadow-sm mt-3 md:mt-7">
            <Select
              options={options}
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              fake={false}
            />
            <Input
              min="0"
              type="number"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 text-end py-1.5 md:pl-7 text-neutral-100 placeholder:text-neutral-300  sm:text-sm sm:leading-6"
              placeholder="00.00"
              darkBg
              value={inputVal}
              onChange={(e: any) => {
                setInputVal(e?.target?.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between p-3 md:p-7">
            <small>To Estimate</small>
            {/* <small>
            {daiStatus=="loading"||cipStatus=="loading"?
            <Loader isLoading={daiStatus=="loading"||cipStatus=="loading"} msg=""/>
            :<img src="/icons/swap.svg" className="mr-5 w-6 md:w-8" alt="" />
          }
            </small> */}
            <span>
              <img src="/icons/swap.svg" className="mr-5 w-6 md:w-8" alt="" />
            </span>
          </div>
          <div className="flex items-center bg-neutral-900 rounded-xl p-1 md:p-3 w-full shadow-sm mb-2">
            <Select currentOption={convertedOption} fake={true} />
            <Input
              type="number"
              min="0"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 text-end py-1.5 md:pl-7 text-neutral-100 placeholder:text-neutral-300  sm:text-sm sm:leading-6"
              placeholder="00.00"
              darkBg
              value={outputVal}
              disabled
            />
          </div>
          {/* <div className="pt-1 pb-5 text-sm">1USD=22,426.00</div> */}
          {/* <Loader isLoading={daiPriceLoading || daiPriceFetching || cipPriceLoading || cipPriceFetching} msg="Fetching prices... 1" /> */}
          {/* <Loader isLoading={(daiPriceFetching || cipPriceFetching) && Number(inputVal) >= 0} msg="Fetching prices... 2" /> */}
          {/* <Loader isLoading={(loading) && Number(inputVal) >= 0} msg="Fetching prices... 2" /> */}
          {/* <Loader isLoading={daiPriceLoading || cipPriceLoading} msg="Fetching prices... 3" /> */}
          {/* <Button className="w-full md:text-base text-sm">Convert</Button> */}
        </article>
      </div>
    </div>
  );
};

export default Convertor;
