"use client";
import {
  AboutArbitrum,
  AboutCIP,
  AutoLiquidity,
  Cards,
  Faq,
  Footer,
  Header,
  Hero,
  InfoBox,
  Pricing,
  Roadmap,
  Seven,
  Stats,
  Tokenomics,
  UPIncome,
  Upcoming,
} from "@/components";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Header />
      <>
        <div className="relative">
          <Hero />
          <AboutCIP />
          <Image
            src="/images/bg/hero.png"
            layout="fill"
            objectFit="contain"
            objectPosition="top"
            alt="Hero Background"
            className="-z-10"
          />
        </div>
        <Stats />
        <div className="overflow-hidden">
          <Cards />
          <AboutArbitrum />
          <div className="relative">
            <InfoBox />
            <Roadmap />
            <Image
              src="/images/bg/roadmap.png"
              fill
              style={{ objectFit: "cover", objectPosition: "bottom" }}
              alt="Roadmap Background"
              className="-z-10"
            />
          </div>

          <Tokenomics />
          <Upcoming />
          <Seven />
          <AutoLiquidity />
          <UPIncome />
          <Faq />
          <Footer />
        </div>
      </>
    </>
  );
}
