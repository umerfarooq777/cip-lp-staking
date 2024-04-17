import React, { Children } from "react";
import { twMerge as tw } from "tailwind-merge";
type ElementType = JSX.Element | string;
type Props = {
  [key: string]: any;
  children: ElementType | ElementType[];
  className?: string;
  condition?: string;
};

const Button = ({
  children,
  className,
  condition = "stable",
  ...rest
}: Props) => {
  return (
    <button
      type="button"
      className={tw(
        "bg-primary rounded-lg relative flex justify-center text-neutral-200 py-2.5 px-5 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    >
      <span className={condition === "loading"? "invisible": ""}>{children}</span>
      {condition === "loading" ? (
        <span
          className={tw(
            "inline-block absolute inset-0 flex items-center justify-center"
          )}
        >
          <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
            <div
              className={tw(
                "border-solid animate-spin rounded-full border-2 h-4 w-4",
                "border-white-900 border-t-transparent"
              )}
            ></div>
          </div>
        </span>
      ) : (
        <></>
      )}
    </button>
  );
};

export default Button;
