import React from "react";

type ChildProp = JSX.Element | string;
type Props = {
  children: ChildProp | ChildProp[];
  className?: string;
};

const TextRow = ({ children, className }: Props) => {
  return (
    <div
      className={`text-center py-5 bg-neutral-900 rounded-md text-neutral-500 ${className}`}
    >
      {children}
    </div>
  );
};

export default TextRow;
