import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

export const getTransactionEstimateGasPrice = async (params) => {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL);
  let priceData = await provider.estimateGas(params);

  console.log("priceData", priceData);
  return priceData;
};

export const numberWithCommas = (x) => {
  // console.log("x", x);
  // console.log("x", x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  if (x.toString().includes(".")) {
    // console.log(x.toString().split(".")[0])
    let leftpart = x.toString().split(".")[0];
    return leftpart
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .concat(".")
      .concat(x.toString().split(".")[1]);
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const getBignumber = (number) => {
  try {
    if (number == null || number == undefined || number == "") {
      return null;
    }
    return BigNumber.from(number);
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const copyToClipboard = (textToCopy) => {
  navigator.clipboard.writeText(textToCopy).catch((err) => {
    console.error("Failed to copy text: ", err);
  });
};

export const getRoundedvalue = (_diaOrignal, _diaRecalculated) => {
  try {
    if (_diaOrignal == null || _diaOrignal == undefined || _diaOrignal == "") {
      return 0;
    }

    // console.log("test _diaOrignal", _diaOrignal, "--", _diaOrignal.length);
    // console.log("test cipInWeiToBeStake", cipInWeiToBeStake);
    // console.log("test _diaRecalculated", _diaRecalculated);

    let x = BigNumber(_diaOrignal);
    let y = BigNumber(_diaRecalculated);
    const res = String(x.minus(y).c[0]);
    // console.log("test222", web3.utils.fromWei(String(res), "ether"))

    let final = _diaOrignal.slice(0, _diaOrignal.length - res.length) + res;

    // const final = x.plus(BigNumber(res));
    // let final = _diaOrignal + BigNumber(res);
    // console.log("test final", final, "--", final.length)
    return final;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export function convertExponentialToDecimal(numberInExponential) {
  if (numberInExponential === null || numberInExponential === undefined) {
    return null;
  } else {
    // console.log("Input ->", numberInExponential);
    let x = numberInExponential;
    var e;
    if (Math.abs(x) < 1.0) {
      e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }

    // console.log("Output ->", x);

    return x;
  }
}

export function getShortenAddress(address, charlength = 4) {
  if (address === null || address === undefined) {
    return "0x000....0000";
  } else {
    return (
      address.slice(0, charlength + 1) +
      "...." +
      address.slice(address.length - charlength, address.length)
    );
  }
}

export function getRewardBadge(reward) {
  const REWARDS = ["DMT", "LDP", "10", "20", "50", "100", "250", "500", "1000"];
  const REWARDS_BADGE_COLOR = [
    "green",
    "yellow",
    "orange",
    "blue",
    "red",
    "maroon",
    "rose",
    "navy",
    "teal",
  ];
  const REWARDS_BADGE_TEXT = [
    "white",
    "black",
    "black",
    "white",
    "white",
    "yellow",
    "white",
    "white",
    "white",
  ];
  // console.log(reward,REWARDS_BADGE_COLOR[REWARDS.indexOf(reward)])

  // const containerClass = `whitespace-nowrap rounded-full bg-${REWARDS_BADGE_COLOR[REWARDS.indexOf(reward)]}-100 px-2.5 py-0.5 text-sm text-${REWARDS_BADGE_COLOR[REWARDS.indexOf(reward)]}-700 mx-2`
  const colorBadge = `${REWARDS_BADGE_COLOR[REWARDS.indexOf(reward)]}`;
  const colorBadgeText = `${REWARDS_BADGE_TEXT[REWARDS.indexOf(reward)]}`;
  // const containerClass = `whitespace-nowrap rounded-full bg-${REWARDS_BADGE_COLOR[REWARDS.indexOf(reward)]}-300 px-2.5 py-0.5 text-sm text-${REWARDS_BADGE_COLOR[REWARDS.indexOf(reward)]}-700 dark:bg-${REWARDS_BADGE_COLOR[REWARDS.indexOf(reward)]}-700 dark:text-${REWARDS_BADGE_COLOR[REWARDS.indexOf(reward)]}-100`

  return (
    <span
      // className={containerClass}
      style={{
        background: colorBadge,
        padding: "4px 8px",
        margin: "0 5px",
        borderRadius: "10px",
        color: colorBadgeText,
      }}
    >
      {reward}
    </span>
  );
}

export const convertToPlainNumber = (n) => {
  var sign = +n < 0 ? "-" : "",
    toStr = n.toString();
  if (!/e/i.test(toStr)) {
    return n;
  }
  var [lead, decimal, pow] = n
    .toString()
    .replace(/^-/, "")
    .replace(/^([0-9]+)(e.*)/, "$1.$2")
    .split(/e|\./);
  return +pow < 0
    ? sign +
        "0." +
        "0".repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) +
        lead +
        decimal
    : sign +
        lead +
        (+pow >= decimal.length
          ? decimal + "0".repeat(Math.max(+pow - decimal.length || 0, 0))
          : decimal.slice(0, +pow) + "." + decimal.slice(+pow));
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const convertWEITo_ForROI = (_amount, _type) => {
  // console.log(_amount);
  // const [convertedValue, setConvertedValue] = useState(null);

  let finalValue = "";

  if (_amount === null || _amount === undefined || _amount === "") {
    return "";
  } else if (_type === "ether") {
    // finalValue = ethers.formatEther(String(_amount));
    // finalValue = ethers.formatUnits(String(_amount), 18);
    finalValue = parseFloat(ethers.formatUnits(String(_amount), 18)).toFixed(7);
    // setConvertedValue(finalValue)
    // return String(finalValue)
  }

  return finalValue;
};
export const convertWEITo = (_amount, _type) => {
  // console.log(_amount);
  // const [convertedValue, setConvertedValue] = useState(null);

  let finalValue = "";

  if (_amount === null || _amount === undefined || _amount === "") {
    return "";
  } else if (_type === "ether") {
    // finalValue = ethers.formatEther(String(_amount));
    // finalValue = ethers.formatUnits(String(_amount), 18);
    finalValue = parseFloat(ethers.formatUnits(String(_amount), 18)).toFixed(2);
    // setConvertedValue(finalValue)
    // return String(finalValue)
  }

  return finalValue;
};

export const convertETHTo = (_amount, _type) => {
  let finalValue = "";

  if (_amount === null || _amount === undefined || _amount === "") {
    return "";
  } else if (_type === "wei") {
    finalValue = ethers.parseUnits(String(_amount), 18);
    // setConvertedValue(finalValue)
    // return String(finalValue)
  }

  const fraction = 100;
  let data = String(finalValue);
  const positionLast = 3;
  var target = data.slice(-positionLast);
  var first,
    last,
    modLast,
    final = "";
  //!========================= now adds fraction decimal to last wei +100
  if (target === "9") {
    first = data.slice(0, data.length - (positionLast - 1));
    last = data.slice(-(positionLast - 1));
    modLast = String(Number(last) + fraction);
    final = first + modLast;
  } else {
    last = data.slice(-positionLast);
    first = data.slice(0, data.length - positionLast);
    modLast = String(Number(last) + fraction);
    final = first + modLast;
  }
  // if (_type === "wei") {
  //     console.log("=============================================================");
  //     console.log("convertETHTo", _amount);
  //     console.log(finalValue, "from ether token to dai wei", final)
  // }

  return String(final);
};
