import React from "react";
type ChildType = JSX.Element | string;
type Props = {
  children: ChildType | ChildType[];
  className?: string
};

const GradientItem = ({ children, className }: Props) => {
  return (
    <div className="bg-gradient-to-r rounded-lg from-[#3F10B5] p-[1px] via-[#6738DFE5] to-[#AC007D]">
      <div className={`rounded-lg px-3 md:px-5 py-2 flex items-center gap-3 font-semibold ${className}`}>{children}</div>
    </div>
  );
};

export default GradientItem;
