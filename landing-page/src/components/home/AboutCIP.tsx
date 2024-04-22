import Image from "next/image";
import React from "react";
import { Container } from "..";
import { Reveal } from "../animation";

const AboutCIP = () => {
  const listItems = [
    {
      icon: "/icons/message.svg",
      text: "Crypto Index Pool Pro is a simplified and secure participation in Staking, generating yield by interacting the Smart contract mechanism.",
    },
    {
      icon: "/icons/msg-orange.svg",
      text: "CIP Pro token has made a stealth launch on the most advance chain in the crypto which is ARBITRUM.",
    },
    {
      icon: "/icons/msg-purple.svg",
      text: "Expanding the community by P2P networking with a mission to create a Giant space in the Blockchain Industry.",
    },
  ];
  return (
    <section className="min-h-[768px] flex items-center overflow-hidden relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20 mx-auto">
          <Reveal>
            <>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 text-center lg:text-start">
                What is Crypto Index Pool Pro?
              </h3>
              <div>
                <article className="rounded-xl">
                  {listItems.map((item, index) => {
                    return <ListItem key={index} data={item} />;
                  })}
                </article>
              </div>
            </>
          </Reveal>
          <div className="row-start-1 lg:row-start-auto">
            <Reveal right>
              <div className="relative aspect-square rounded-3xl max-w-[35rem] lg:max-w-none mx-auto">
                <Image
                  src="/images/about-cip.png"
                  objectFit="cover"
                  className=" rounded-3xl"
                  layout="fill"
                  alt="About Arbitrum Figure"
                ></Image>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutCIP;

type ItemProps = {
  data: {
    icon: string;
    text: string;
  };
};

const ListItem = ({ data }: ItemProps) => {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="shrink-0">
        <div className="w-10 h-10 relative">
          <Image
            layout="fill"
            objectFit="contain"
            src={data.icon}
            alt="Message Icon"
          />
        </div>
      </div>

      <div>
        <p className="text-sm md:text-base">{data.text}</p>
      </div>
    </div>
  );
};
