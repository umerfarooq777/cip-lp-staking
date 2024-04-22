import React from "react";
import { Container } from "..";
import Image from "next/image";
import { Fade } from "../animation";

const InfoBox = () => {
  return (
    <section className="min-h-[414px] md:min-h-[768px] flex items-center relative">
      <Container>
        <article className="relative rounded-xl aspect-[3/1] bg-gradient-to-b from-[#02020233] to-[#6F6F6F1A] border border-neutral-700 flex items-center justify-center">
          <h3 className="text-center text-sm md:text-xl lg:text-3xl md:w-[30ch] font-semibold lg:leading-10 p-7 md:p-0">
            <Fade>
              <>
                <span className="text-[#c7a6fb]">CIP Pro DAPP</span> and Token
                functionality is Totally Decentralized with secured Trustless
                Mechanism.
              </>
            </Fade>
          </h3>
          <div className="absolute left-0 top-[10%] -translate-x-1/2">
            <Image
              src="/icons/star.svg"
              alt="Star Icon"
              width={40}
              height={40}
            />
          </div>
          <div className="absolute bottom-0 right-[10%] translate-y-1/2">
            <Image
              src="/icons/star.svg"
              alt="Star Icon"
              width={60}
              height={60}
            />
          </div>
          <div className="absolute top-0 right-0 -translate-y-[75%] translate-x-[85%]">
            <Image
              src="/icons/union.svg"
              alt="Star Icon"
              width={100}
              height={100}
            />
          </div>
        </article>
      </Container>
      <div className="absolute -right-[350px] top-[100px]">
        <div className="w-[700px] h-[700px] relative z-0">
          <Image
            src="/images/shadow2.svg"
            alt="Shadow Effect"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBox;
