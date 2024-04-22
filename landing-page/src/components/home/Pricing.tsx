import Image from "next/image";
import React from "react";
import { Container } from "..";

const Pricing = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <Container>
        <div className="mb-12 lg:mb-24 relative z-10">
          <h3 className="font-bold text-4xl  text-center mb-6 ">
            Choose our best offer
          </h3>
          <p className="text-sm text-neutral-400 my-4 md:my-10 w-[75%] md:w-[54ch] text-center mx-auto">
            When you work on something that only has capacity to make you 5
            dollars, it does not matter how much harder you work - the most you
            will make is 5 dollars.
          </p>
          <div className="flex items-center justify-center mt-8">
            <button className="text-white font-medium rounded-lg py-3 w-28 relative">
              Monthly
              <span
                className="absolute inset-0 bg-gradient-to-r from-[#5C27FE] to-secondary rounded-s-lg -z-10"
                style={{ opacity: 1 }}
              ></span>
            </button>
            <div className="relative">
              <button className="font-medium rounded-lg py-3 w-28 transition-colors relative">
                Annual
                <span
                  className="absolute inset-0 bg-gradient-to-r from-[#5C27FE] to-secondary duration-300 rounded-e-lg -z-10"
                  style={{ opacity: 0 }}
                ></span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 w-full mx-auto relative z-10 mb-16">
          <div className="w-full flex flex-col px-10 py-6 border-[1px] border-neutral-600 rounded-xl bg-gradient-to-br from-[#02020233] to-[#6F6F6F1A]">
            <div className="text-center border-b border-neutral-600 mb-8">
              <p className="text-2xl font-bold mb-2">Basic</p>
              <p className="text-center text-neutral-400 mx-auto">
                AI chatbot personalizes recommendations
              </p>
              <p className="text-5xl font-bold mb-8 mt-5">
                $12
                <span className="font-normal text-lg text-neutral-400">
                  /Per Month
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Simplicity</span>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Easy to use</span>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Premium quality design</span>
            </div>
            <div className="flex items-center gap-3 mb-10 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">For lower middle</span>
            </div>
            <button
              className="w-full mt-auto py-3 font-semibold border border-neutral-300 text-white rounded-md"
              tabIndex={0}
            >
              Get Started
            </button>
          </div>
          <div className="w-full flex flex-col px-10 py-6 border-[1px] border-neutral-600 rounded-xl bg-gradient-to-br from-[#02020233] to-[#6F6F6F1A]">
            <div className="text-center border-b border-neutral-600 mb-8">
              <p className="text-2xl font-bold mb-2">Basic</p>
              <p className="text-center text-neutral-400 mx-auto">
                AI chatbot personalizes recommendations
              </p>
              <p className="text-5xl font-bold mb-8 mt-5">
                $12
                <span className="font-normal text-lg text-neutral-400">
                  /Per Month
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Simplicity</span>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Easy to use</span>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Premium quality design</span>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">For middle class</span>
            </div>
            <div className="flex items-center gap-3 mb-10 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Limited edition</span>
            </div>
            <button
              className="w-full mt-auto py-3 font-semibold bg-gradient-to-r from-[#5C27FE]  to-secondary text-white rounded-md"
              tabIndex={0}
            >
              Get Started
            </button>
          </div>
          <div className="w-full flex flex-col px-10 py-6 border-[1px] border-neutral-600 rounded-xl bg-gradient-to-br from-[#02020233] to-[#6F6F6F1A]">
            <div className="text-center border-b border-neutral-600 mb-8">
              <p className="text-2xl font-bold mb-2">Basic</p>
              <p className="text-center text-neutral-400 mx-auto">
                AI chatbot personalizes recommendations
              </p>
              <p className="text-5xl font-bold mb-8 mt-5">
                $12
                <span className="font-normal text-lg text-neutral-400">
                  /Per Month
                </span>
              </p>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Simplicity</span>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Easy to use</span>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Premium quality design</span>
            </div>
            <div className="flex items-center gap-3 mb-5 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">For rich people</span>
            </div>
            <div className="flex items-center gap-3 mb-10 w-full">
              <Image
                src="/icons/check.svg"
                width={20}
                height={20}
                alt="Check Icon"
              />
              <span className="text-base text-neutral-300">Be our priority</span>
            </div>
            <button
              className="w-full mt-auto py-3 font-semibold border border-neutral-300 text-white rounded-md"
              tabIndex={0}
            >
              Get Started
            </button>
          </div>
        </div>
      </Container>
      {/* <div
        className="w-[450px] h-[450px] rounded-full border-2 border-slate-500 border-dotted absolute z-0 -left-[250px] -top-[200px]"
        style={{ transform: "rotate(60.0516deg) translateZ(0px)" }}
      ></div>
      <div
        className="w-[450px] h-[450px] rounded-full border-2 border-slate-500 border-dotted absolute z-0 -right-[250px] -bottom-[200px]"
        style={{ transform: "rotate(-60.0516deg) translateZ(0px)" }}
      ></div> */}
    </section>
  );
};

export default Pricing;
