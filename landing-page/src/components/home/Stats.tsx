import Image from "next/image";
import React from "react";
import { Fade } from "../animation";

const Stats = () => {
  return (
    <div className="relative py-20">
      <Fade>
        <div className="flex items-center justify-center gap-7 sm:gap-24 ">
          <StatItem title="24/7" subtitle="active accounts" />
          <StatItem title="365" subtitle="days" />
        </div>
      </Fade>
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="w-[800px] h-[800px] relative z-0 max-w-[90vw]">
          <Image
            src="/images/shadow.svg"
            alt="Shadow Effect"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;

type StatItemProps = {
  title: string;
  subtitle: string;
};

const StatItem = ({ title, subtitle }: StatItemProps) => {
  return (
    <div>
      <h3 className="bg-gradient-to-r from-[#5C27FE] to-[#DEC7FF] font-gotham bg-clip-text text-4xl xs:text-6xl font-extrabold text-transparent sm:text-7xl md:text-8xl tracking-wide text-center">
        {title}
      </h3>
      <p className="text-neutral-300 uppercase text-sm font-medium text-center mt-5">
        {subtitle}
      </p>
    </div>
  );
};
