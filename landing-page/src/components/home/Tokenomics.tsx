import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "..";
import { useAnimation, useInView, motion } from "framer-motion";

const Tokenomics = () => {
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

  const animVars = {
    initial: { scale: .25 },
    animate: {
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <section className="min-h-[414px] md:min-h-[768px] relative">
      <Container>
        <div className="flex items-center justify-center flex-col text-center py-10 pt-24 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5 text-center">
            Tokenomics
          </h2>
          <div className="text-sm opacity-75 sm:text-base lg:text-xl py-3 px-7 lg:py-4 lg:px-10 border border-neutral-600 rounded-xl font-semibold bg-gradient-to-b to-[#9146001A] text-[#FF8F14] from-[#DD6E0745]">
            Total Supply of token 10 million
          </div>
          <div ref={hideRef} className="w-full">
            <motion.div
              ref={showRef}
              variants={animVars}
              initial="initial"
              animate={mainControls}
              className="relative aspect-[5/4.75] w-full mx-auto"
            >
              <Image
                src="/images/tokenomics.png"
                alt="Tokenomics Chart"
                fill
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </div>
        </div>
      </Container>
      <div className="absolute left-0 top-[125px] z-0">
        <div className="aspect-[1/3] h-[500px] relative">
          <Image
            src="/images/tokenomics-object.png"
            alt="Shadow Effect"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="absolute sm:left-[8%] top-[15%] z-0">
        <div className="relative w-8 sm:w-14 aspect-square">
          <Image src="/icons/star.svg" alt="Star Icon" fill />
        </div>
      </div>
      <div className="absolute -right-[350px] -top-[250px] z-0">
        <div className="w-[800px] h-[800px] relative">
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

export default Tokenomics;
