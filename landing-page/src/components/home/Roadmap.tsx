import React, { useEffect, useRef } from "react";
import { Container } from "..";
import Image from "next/image";
import useMobileDetect from "@/hooks/useMobileDetect";

const Roadmap = () => {
  const isMedium = useMobileDetect();
  let leftPos = isMedium ? 35 : null;

  const roadmap = [
    {
      label: "Q3-23",
      text: "Idea Implementation Creating Team.",
      left: leftPos ?? 2,
      top: isMedium ? 21 : 100,
    },
    {
      label: "Q3-23",
      text: "Creating smart contract DEX launch, Releasing whitepaper and Staking Contract",
      left: leftPos ?? 17,
      top: isMedium ? 32 : 40,
    },
    {
      label: "Q3-23",
      text: "Integration of new protocols Discount Crypto.",
      left: leftPos ?? 36,
      top: isMedium ? 44.5 : 95,
    },
    {
      label: "Q3-23",
      text: "CMC & CG Team Expansion Community Events. Rule of Seven launch",
      left: leftPos ?? 45,
      top: isMedium ? 56.5 : 20,
    },
    {
      label: "Q3-23",
      text: "Creating more Liquidity Pools & CEX listing. Multichain Bridge customization.",
      left: leftPos ?? 70,
      top: isMedium ? 68 : 78,
    },
    {
      label: "Q3-23",
      text: "Global Partnerships Team and Advisory Expansion.",
      left: leftPos ?? 78,
      top: isMedium ? 79 : 0,
    },
  ];

  return (
    <section className="relative -mb-10 md:mb-32">
      <Container>
        <div className="md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            CIP Pro Roadmap
          </h2>
          <p className="text-sm text-neutral-400 md:w-[46ch]">2023-2024</p>
        </div>
      </Container>
      {/* ROADMAP */}
      <div className="relative">
        <div className="relative aspect-[2/1] lg:aspect-[3/1] hidden md:block">
          <Image src="/images/roadmap-line.svg" alt="Roadmap Line Art" fill />
        </div>
        <div className="relative aspect-[1/4] md:hidden w-2/3">
          <Image
            src="/images/roadmap-line-mobile.svg"
            alt="Roadmap Line Art"
            fill
          />
        </div>
        {roadmap.map(({ label, text, top, left }, index) => {
          return (
            <RoadmapItem key={index} left={left} top={top} label={label} text={text} />
          );
        })}
      </div>
      <div className="absolute right-0 -scale-100 md:scale-100 md:right-auto md:left-0 top-0 md:top-[125px] -z-10">
        <Image
          src="/images/roadmap-object.png"
          alt="Shadow Effect"
          width={40}
          height={40}
        />
      </div>
    </section>
  );
};

export default Roadmap;

type RoadmapItemProps = {
  left: number;
  top: number;
  label: string;
  text: string;
};

const RoadmapItem = ({ left = 0, top = 0, label, text }: RoadmapItemProps) => {
  return (
    <div
      className={`w-[17ch] text-center absolute h-0 flex flex-col justify-center`}
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      <h5 className="bg-gradient-to-b from-[#8F00FF] to-[#8F00FF77] font-sora bg-clip-text font-semibold text-transparent text-xl md:text-3xl lg:text-4xl uppercase tracking-wide">
        {label}
      </h5>
      <p className="md:mt-2 mt-1 text-neutral-400 text-[11px] sm:text-sm w-[19ch] mx-auto sm:w-full">
        {text}
      </p>
    </div>
  );
};
