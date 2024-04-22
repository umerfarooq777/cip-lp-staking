import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "..";
import { useAnimation, useInView, motion } from "framer-motion";

const Seven = () => {
  const showRef = useRef(null);
  const hideRef = useRef(null);
  const isInView = useInView(showRef);
  const notHiding = useInView(hideRef);

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate");
    } else if (!notHiding) {
      mainControls.start("initial");
    }
  }, [isInView, notHiding]);

  const imageVars = {
    initial: { rotateY: -25 },
    animate: {
      rotateY: 0,
      transition: {
        duration: 1,
      },
    },
  };
  
  return (
    <section className="min-h-[414px] md:min-h-[768px] relative">
      <Container>
        <div className="flex items-center justify-center flex-col text-center py-10 pt-24 relative z-10">
          <p className="text-sm text-[#EA9444] mb-4">Discounted Crpyto</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5 text-center">
            Rule of Seven
          </h2>
          <p className="mt-1 text-sm text-neutral-400 max-w-[33ch]">
            Compounding Profit and Capital followed by Seven Rules of Buying
            Assets to support Liquidity.
          </p>
          <div ref={hideRef}  className="text-start my-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-8">
            <div style={{perspective: "300px"}} className="row-start-1 lg:row-start-auto ">
              <motion.div
                variants={imageVars}
                initial="initial"
                animate={mainControls}
                className="relative aspect-square  rounded-3xl max-w-[35rem] lg:max-w-none mx-auto"
              >
                <Image
                  src="/images/seven.png"
                  fill
                  objectFit="contain"
                  alt="Seven Shape"
                />
              </motion.div>
            </div>
            <div className="text-start rounded-lg bg-[#6A6A6A1A] p-4 sm:p-6 lg:p-12 lg:pb-20 shadow-2xl">
              <p className="text-sm text-neutral-300 leading-6">
                Have you heard of the rule of Seven strategy in trading?
                It&apo;s a simple but effective strategy that can turn $10,000
                into $1.28 million. You you. Here&apo;s how it works. Find seven
                coins one at a time to invest in. For example, if you invest
                $10,000 in polka dot and the price doubles, your amount will be
                $20,000. Then find another coin and put $20,000 in that coin to
                get double. Continue this process for seven coins without taking
                your principal and profit thousands of coins double in crypto
                during every bull run. All you need to do is find seven coins in
                year to turn your $10,000 into $1.28 million. Crypto Index Pool Pro
                is using this strategy to increase liquidity in pools. You can
                also follow this strategy with your portfolio to make big money.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <div className="absolute left-[50%] top-[50%] -translate-x-1/3 -translate-y-1/4">
        <div className="w-[800px] h-[800px] relative z-0">
          <Image
            src="/images/shadow.svg"
            alt="Shadow Effect"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div ref={showRef} className="absolute w-full left-0 top-1/2"></div>
    </section>
  );
};

export default Seven;
