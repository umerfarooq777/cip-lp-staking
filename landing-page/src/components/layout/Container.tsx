import React, { ReactNode } from "react";

type ContainerProps = {
  fluid?: boolean;
  children: ReactNode;
};

const Container = ({ fluid, children }: ContainerProps) => {
  const containerClasses = fluid
    ? "px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
    : "w-full px-8 sm:px-12 md:px-16 max-w-7xl mx-auto";

  return <div className={containerClasses}>{children}</div>;
};

export default Container;
