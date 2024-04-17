import { copyToClipboard } from "@/utils/helper";
import React, { useRef, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

type Props = {
  icon?: string;
  className?: string;
  solidBg?: boolean;
  darkBg?: boolean;
  [key: string]: any;
  noCopy?: boolean;
};

const Input = ({
  icon,
  className,
  solidBg,
  darkBg,
  noCopy,
  ...rest
}: Props) => {
  const [showTick, setShowTick] = useState(false);
  const inputRef = useRef<any>(null);

  const copyToClipboardWithFeedback = () => {
    copyToClipboard(inputRef.current.value);
    setShowTick(true);

    setTimeout(() => {
      setShowTick(false);
    }, 3000);
  };

  return (
    <div className="relative w-full rounded-md shadow-sm">
      <input
        ref={inputRef}
        type="text"
        name="price"
        id="price"
        className={`${
          solidBg
            ? "bg-input-gradient"
            : darkBg
            ? "bg-neutral-900"
            : "bg-transparent"
        } block w-full rounded-md py-2.5 pl-4 pr-7 text-white placeholder:text-neutral-400 text-sm sm:leading-6 focus: outline-none ${
          className ? className : ""
        }`}
        {...rest}
      />
      {icon && !noCopy ? (
        <button
          onClick={copyToClipboardWithFeedback}
          className="absolute inset-y-1 right-3 flex items-center"
          type="button"
        >
          {showTick ? (
            <AiFillCheckCircle className="text-2xl" />
          ) : (
            <img src="/icons/copy.svg" alt="Copy Icon" className="w-7" />
          )}
        </button>
      ) : (
        <></>
      )}
        {noCopy && (
      <button className="absolute inset-y-1 right-3 flex items-center">
            <img src={icon} alt="Copy Icon" className="w-4" />
      </button>
        )}
    </div>
  );
};

export default Input;
