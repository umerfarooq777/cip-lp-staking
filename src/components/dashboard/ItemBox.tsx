import React from "react";
import { Button, Loader } from "..";

type ButtonChild = JSX.Element | string;

type ButtonProps = {
  children: ButtonChild | ButtonChild[];
  className?: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
  isLoading?: boolean;
};

type Props = {
  icon: string;
  label: string;
  value: string;
  buttonProps?: ButtonProps;
};

const ItemBox = ({ icon, label, value, buttonProps }: Props) => {
  return (
    <article className="bg-black-700 rounded-lg p-5 w-full">
      <img src={icon} className="mb-5" alt="" />
      <small className="text-neutral-500 font-normal text-sm md:text-base">
        {label}
      </small>
      {/* <div className="flex items-start md:items-center flex-col md:flex-row  justify-between gap-3"> */}
        <h3 className="font-semibold text-2xl pt-1 md:pt-2">{value}</h3>
        {buttonProps && (
          <Button
            disabled={buttonProps.disabled ?? false}
            className={`${buttonProps.className ?? ""} relative w-full mt-4`}
            onClick={buttonProps.onClick}
          >
            <div className={buttonProps.isLoading ? "opacity-0" : ""}>
              {buttonProps.children}
            </div>
            <div className="absolute inset-0 m-auto">
              {buttonProps.isLoading ? (
                <Loader  msg="" />
              ) : (
                <></>
              )}
            </div>
          </Button>
        )}
      {/* </div> */}
    </article>
  );
};

export default ItemBox;
