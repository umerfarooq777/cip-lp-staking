import React from "react";

const SmLoader = () => {
  return (
    <div className={`flex items-center justify-center py-12`}>
      <div className="border-primary border-t-transparent h-10 w-10 animate-spin rounded-full border-[6px]"></div>
    </div>
  );
};

export default SmLoader;
