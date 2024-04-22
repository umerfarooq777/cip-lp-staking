import Image from "next/image";
import React from "react";
import { Container } from "..";
import { Reveal } from "../animation";

const AboutArbitrum = () => {
  return (
    <section className="min-h-[768px] flex items-center relative py-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-8 w-full">
          <Reveal>
            <>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5">
                What is Arbitrum?
              </h3>
              <p className=" text-neutral-400 sm:pr-10 lg:w-[37.7ch]">
                Arbitrum&apos;s suite of scaling solutions provides faster
                speeds at a significantly lower cost, with the same level of
                security as Ethereum. One of Ethereum&apos;s most promising
                Layer-2 solutions is Arbitrum, which is designed to boost
                Ethereum&apos;s speed and scalability by securely offloading the
                bulk of the network&apos;s transaction validation processes to a
                second-layer blockchain.
              </p>
            </>
          </Reveal>
          <div className="row-start-1 lg:row-start-auto ">
            <Reveal right>
              <div className="relative aspect-square mx-auto">
                <Image
                  src="/images/about-arbitrum.png"
                  objectFit="cover"
                  className="p-0.5 rounded-3xl"
                  layout="fill"
                  alt="About Arbitrum Figure"
                ></Image>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
      <div className="absolute left-0 -bottom-[300px] -z-10">
        <div className="aspect-[1/3] h-[800px] relative">
          <Image
            src="/images/arbitrum-object.png"
            alt="Shadow Effect"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutArbitrum;
