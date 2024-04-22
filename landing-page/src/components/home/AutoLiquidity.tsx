import Image from "next/image";
import React from "react";
import { Container } from "..";
import { Reveal } from "../animation";

const AutoLiquidity = () => {
  return (
    <>
      <section className="min-h-[768px] flex items-center relative pt-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-8 w-full">
            <Reveal>
              <>
                <p className="text-sm text-[#C792FF] mb-4">Discounted Crpyto</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5">
                  CIP Pro Auto Liquidity Generation
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  Crypto Index Pool Pro has implanted a dynamic concept of
                  Generating liquidity, unique Idea and research-based concept
                  with a great autonomous working model will be associated with
                  the running smart contract, These multiple supporting
                  protocols will be running in the crypto space initializing the
                  concept and earn fees by interacting with the community.
                  Protocol like &quot;DISCOUNT CRYPTO will attracts the
                  community by its unique working model, this concept will be
                  only available for the CIP Pro community, community must fulfil
                  the requirement of the CIP Pro protocol instructions to enjoy the
                  benefit of Discounted crypto. The binding contemplation of
                  Crypto Index Pool Pro ecosystem will lead to the stability for the
                  better future of investors.
                  <br />
                  <br />
                  As crypto industry has always been building the new
                  innovations and bringing updations in the running concepts,
                  there is always a need of an endless requirements for the
                  multiple tools in the decentralized industry. It has always
                  been a challenge for the centralization governance to
                  integrate with decentralized governance, the decentralized
                  nature and building the products anonymously is the beauty of
                  this Industry, as we have seen the rise of decentralized
                  finance in the previous years, this has taken blockchain
                  innovations to another era.
                  <br />
                  <br />
                  Things like Decentralized Email DNS service & IFPS is
                  supporting web3 which has changed the traditional system of
                  web.
                </p>
              </>
            </Reveal>
            <div className="row-start-1 lg:row-start-auto ">
              <Reveal right>
                <div className="relative aspect-square mx-auto">
                  <Image
                    src="/images/auto-liquidity-1.png"
                    objectFit="contain"
                    className="p-0.5 rounded-3xl"
                    layout="fill"
                    alt="About Arbitrum Figure"
                  ></Image>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
        <div className="absolute left-0 top-[25%]">
          <div className="w-[400px] h-[800px] relative z-0 max-w-[90vw]">
            <Image
              src="/images/auto-liquidity-object-1.png"
              alt="Shadow Effect"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="absolute bottom-0 right-[10%] -translate-x-1/2">
          <Image src="/icons/star.svg" alt="Star Icon" width={40} height={40} />
        </div>
      </section>
      <section className="min-h-[768px] flex items-center relative pb-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-8 w-full">
            <div className="row-start-1 lg:row-start-auto ">
              <Reveal>
                <div className="relative aspect-square mx-auto">
                  <Image
                    src="/images/auto-liquidity-2.png"
                    objectFit="contain"
                    className="p-0.5 rounded-3xl"
                    layout="fill"
                    alt="About Arbitrum Figure"
                  ></Image>
                </div>
              </Reveal>
            </div>
            <Reveal right>
              <>
                <p className="text-sm text-[#3EFF8B] mb-4">Multichain bridge</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5">
                  CIP Pro Auto Liquidity <br /> Generation
                </h2>
                <p className="mt-1 text-sm text-neutral-400">
                  After &quot;Discounted Crypto&quot; we are launching the
                  multichain bridge for the community which will a great tool to
                  transfer assets from multichain to one chain, A multichain
                  bridge is a technology that allows users to transfer assets or
                  data between different blockchains. There are different types
                  of multichain bridges, such as cross-chain bridges and
                  cross-chain routers. Cross-chain bridges lock the original
                  asset in a secure address and mint a wrapped asset on the
                  destination chain.
                  <br />
                  <br />
                  Cross-chain routers allow users to swap between any two chains
                  directly without wrapping. This product will be also
                  generating fees by the transactions volume which will support
                  the CIP Pro liquidity ponderation to the protocol
                </p>
              </>
            </Reveal>
          </div>
        </Container>
        <div className="absolute right-0 top-[30%]">
          <div className="w-[400px] h-[800px] relative z-0 max-w-[90vw] translate-x-1/2">
            <Image
              src="/images/auto-liquidity-object-2.png"
              alt="Shadow Effect"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AutoLiquidity;
