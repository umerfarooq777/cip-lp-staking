import React from "react";

type Props = {
  [key: string]: any
  children: JSX.Element | string | any;
  className?: string;
};

const Badge = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={`bg-primary text-neutral-200 tracking-wide font-light rounded-full pt-1 pb-1.5 px-5 ${className ? className : ""
        }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Badge;
