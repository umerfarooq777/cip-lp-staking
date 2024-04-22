import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "..";
import { useAnimation, useInView, motion } from "framer-motion";

const Upcoming = () => {
  const items = [
    {
      title: "Discount Crypto",
      text: "Offering Discounted Crypto for CIP Pro Tokens",
    },
    {
      title: "Multichain Bridge",
      text: "One click solution to bridge Multichain Token",
    },
    {
      title: "Rule of Seven",
      text: "Compounding Profit and Capital followed by Seven Rules of Buying Assets to support Liquidity.",
    },
    {
      title: "NFTS",
      text: "Limited Edition of Non-Fungible Tokens benefitting the community.",
    },
  ];

  const showRef = useRef(null);
  const isInView = useInView(showRef, { amount: 0.3 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate");
    } else {
      mainControls.start("initial");
    }
  }, [isInView]);

  const animVars = {
    initial: (index: number) => ({
      opacity: 0,
      scale: 0.85,
      transition: {
        delay: 0,
        duration: 0.25,
      },
    }),
    animate: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.25 * index,
        duration: 0.25,
      },
    }),
  };

  return (
    <section className="min-h-[414px] md:min-h-[768px] relative">
      <Container>
        <div className="flex items-center justify-center flex-col text-center py-10 pt-24 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5 text-center">
            Upcoming <span className="text-[#00A3FF]">Contracts</span>
            <br />
            Integration
          </h2>
          <p className="text-sm md:w-[46ch]">On Global Pool ROI</p>
          <div ref={showRef} className="grid lg:grid-cols-2 gap-10 pt-20">
            {items.map(({ title, text }, index) => {
              return (
                <motion.div
                  key={index}
                  variants={animVars}
                  initial="initial"
                  animate={mainControls}
                  custom={index}
                >
                  <ItemCard title={title} text={text} num={index} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
      <div className="absolute -left-[350px] -top-[100px]">
        <div className="w-[800px] h-[800px] relative z-0">
          <Image
            src="/images/shadow.svg"
            alt="Shadow Effect"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="absolute -right-[350px] -bottom-[300px]">
        <div className="w-[800px] h-[800px] relative z-0">
          <Image
            src="/images/shadow.svg"
            alt="Shadow Effect"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Upcoming;

type CardProps = {
  title: string;
  text: string;
  num: number;
};

const ItemCard = ({ title, text, num }: CardProps) => {
  return (
    <article className="text-start rounded-lg bg-[#6A6A6A1A] p-4 sm:p-6 lg:p-12 shadow-2xl">
      <div className="flex items-start gap-5 sm:gap-8">
        <div
          style={{
            background:
              "linear-gradient(115.23deg, #109BFF 16.25%, #1F1C29 230.73%)",
          }}
          className="aspect-square rounded-lg text-xl lg:text-2xl font-semibold grid h-12 lg:h-14 place-content-center"
          aria-hidden="true"
        >
          0{num + 1}
        </div>

        <div>
          <h3 className="text-lg font-medium font-sora sm:text-xl font-semibold">
            {title}
          </h3>

          <p className="text-sm text-neutral-400 mt-1 sm:mt-2 lg:mt-3">
            {text}
          </p>
        </div>
      </div>
    </article>
  );
};
