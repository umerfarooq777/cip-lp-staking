import React from "react";

type ChildProp = JSX.Element | string;
type Props = {
  children: ChildProp | ChildProp[];
  className?: string;
  icon?: any;
  iconClass?: string;
};

const Note = ({ children, className, icon: Icon, iconClass }: Props) => {
  return (
    <div
      className={`w-full p-3 bg-[#4DAFFB] bg-opacity-60 text-xs md:text-sm text-neutral-300 gap-2 rounded-lg md:rounded-full flex items-center justify-center ${className}`}
    >
      {Icon ? (
        <span className={`${iconClass ?? ""} text-lg`}>
          <Icon />
        </span>
      ) : (
        <></>
      )}
      {children}
    </div>
  );
};

export default Note;
