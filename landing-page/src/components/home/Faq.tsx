import React, { useEffect, useRef } from "react";
import { Container } from "..";
import Image from "next/image";
import { useAnimation, useInView, motion } from "framer-motion";

const faqs = [
  {
    summary: "What is DAPP?",
    details:
      "Orders are usually shipped within 1-2 business days after placing the order.",
  },
  {
    summary: "How do they Work?",
    details:
      "Orders are usually shipped within 1-2 business days after placing the order.",
  },
  {
    summary: "What are the benefits of DAPP?",
    details:
      "Orders are usually shipped within 1-2 business days after placing the order.",
  },
  {
    summary: "What are the Features of DAPP?",
    details:
      "Orders are usually shipped within 1-2 business days after placing the order.",
  },
  {
    summary: "How does it Function?",
    details:
      "Orders are usually shipped within 1-2 business days after placing the order.",
  },
];

const Faq = () => {
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
      x: "150%",
      transition: {
        delay: 0.05 * index,
        duration: .75,
      },
    }),
    animate: (index: number) => ({
      x: 0,
      transition: {
        delay: 0.05 * index,
        duration: .75,
      },
    }),
  };

  return (
    <section className="py-20 relative">
      <Container>
        <div className="text-center flex flex-col items-center justify-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-5 inline-block relative">
            Frequently Asked Questions
            <div className="absolute -top-1/4 right-0 translate-x-[200%] hidden md:block">
              <Image
                src="/icons/thin-star.svg"
                alt="Star Icon"
                width={35}
                height={35}
              />
            </div>
          </h2>
          <p className="text-sm md:text-lg font-thin text-neutral-400 md:w-[46ch]">
            Dalma is the only saas business platform that lets you run your
            business on one platform, seamlessly across all digital channels.
          </p>
          <div ref={showRef} className="space-y-4 text-start w-full lg:w-[65%] my-20">
            {faqs.map(({ summary, details }, index) => {
              return (
                <motion.div
                  variants={animVars}
                  initial="initial"
                  animate={mainControls}
                  custom={index}
                  key={index}
                  className="rounded-[0.6rem]"
                  style={{ perspective: 300, background: "#FFFFFF88" }}
                >
                  <details className="group text-sm sm:text-base [&_summary::-webkit-details-marker]:hidden transition duration-300 bg-[#24202d] open:bg-[#2d2b37] p-5 md:p-8 rounded-[0.5rem]">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-[0.5rem]">
                      <h2 className="font-medium">{summary}</h2>
                      <Image
                        className="shrink-0 transition duration-300 group-open:-rotate-180"
                        src="/icons/arrow-down.svg"
                        alt="Arrow Down Icon"
                        width={25}
                        height={25}
                      />
                    </summary>

                    <p className="pt-3 leading-relaxed text-neutral-400">
                      {details}
                    </p>
                  </details>
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
    </section>
  );
};

export default Faq;
