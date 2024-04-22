import React, { useEffect, useRef } from "react";
import { Card } from "..";
import Container from "../layout/Container";
import Image from "next/image";
import { useAnimation, useInView, motion } from "framer-motion";

const cards = [
  {
    icon: "/icons/msg-orange.svg",
    title: "Arbitrum Chain Pool",
    text: "CIP Pro has 5 Dynamic Liquidity pools on the Arbitrum one chain which will grow according to Crypto Bull Trends.",
    href: "/",
    color: "#FC7F0B",
  },
  {
    icon: "/icons/pie.svg",
    title: "Stake to Earn",
    text: "You can earn up to 300% in 25 months by Staking your CIP Pro tokens",
    href: "/",
    color: "#0BA5FC",
  },
  {
    icon: "/icons/puzzle.svg",
    title: "Decentralized Crosschain",
    text: "You can also earn by referring & by creating P2P network up to 20 levels.",
    href: "/",
    color: "#9064FF",
  },
];

const Cards = () => {
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
    <section className="min-h-[768px] flex items-center py-10 relative">
      <Container>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold pb-16">
          Why Buy CIP Pro?
        </h1>
        <div
          ref={showRef}
          className="grid lg:grid-cols-3 grid-cols-1 gap-4 relative z-10 mb-16"
        >
          {cards.map((card, index) => {
            return (
              <motion.div
                key={index}
                variants={animVars}
                initial="initial"
                animate={mainControls}
                custom={index}
              >
                <Card data={card} />
              </motion.div>
            );
          })}
        </div>
      </Container>
      <div className="absolute -right-[350px] -bottom-[100px]">
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

export default Cards;
