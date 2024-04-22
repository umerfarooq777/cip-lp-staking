import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "..";
import useMobileDetect from "@/hooks/useMobileDetect";
import { useAnimation, useInView, motion } from "framer-motion";

const UPIncome = () => {
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
    initial: { scale: 0.75, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const cards = [
    {
      icon: "/icons/diamond.svg",
      title: "Kohinoor",
      box: {
        title: "Condition",
        text: "User must be MARS & 3 VENUS referrals in 3 LEGS",
        gradient: {
          from: "#12B879",
          to: "#037B42",
        },
      },
      reward: 6,
      numColor: "#3DE0A2",
    },
    {
      icon: "/icons/cup.svg",
      title: "Gold Plan",
      box: {
        title: "Condition",
        text: "User must be MARS & 3 VENUS referrals in 3 LEGS",
        gradient: {
          from: "#FEB54A99",
          to: "#FF3A6899",
        },
      },
      reward: 10,
      numColor: "#FD7F08",
    },
    {
      icon: "/icons/diamond.svg",
      title: "Diamond",
      box: {
        title: "Condition",
        text: "User must be MARS & 3 VENUS referrals in 3 LEGS",
        gradient: {
          from: "#DB70FF99",
          to: "#76009F99",
        },
      },
      reward: 8,
      numColor: "#CD3AFF",
    },
    {
      icon: "/icons/silver-star.svg",
      title: "Platinum",
      box: {
        title: "Condition",
        text: "User must be MARS & 3 VENUS referrals in 3 LEGS",
        gradient: {
          from: "#54C0FF99",
          to: "#12619699",
        },
      },
      reward: 8,
      numColor: "#00A0FE",
    },
  ];

  return (
    <section  className="min-h-[414px] md:min-h-[768px] relative">
      <Container>
        <div ref={hideRef} className="flex items-center justify-center flex-col text-center py-10 pt-24 relative z-10">
          <p className="text-sm md:w-[46ch] mb-3">On Global Pool ROI</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
            Universal <span className="text-[#CD3AFF]">Pools</span> Income
          </h2>
          <motion.div
            ref={showRef}
            variants={animVars}
            initial="initial"
            animate={mainControls}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 lg:mt-20"
          >
            {cards.map(({ icon, title, box, reward, numColor }, index) => {
              return (
                <PackageCard
                  key={index}
                  small={index === 0 || index === 3}
                  icon={icon}
                  title={title}
                  box={box}
                  reward={reward}
                  numColor={numColor}
                />
              );
            })}
          </motion.div>
        </div>
      </Container>
      <div className="absolute -left-[500px] -top-[100px]">
        <div className="w-[800px] h-[800px] relative z-0">
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

export default UPIncome;

type PackageCardProps = {
  icon: string;
  title: string;
  box: {
    title: string;
    text: string;
    gradient: {
      from: string;
      to: string;
    };
  };
  reward: number;
  numColor: string;
  small: boolean;
};

const PackageCard = ({
  icon,
  title,
  box,
  reward,
  numColor,
  small = false,
}: PackageCardProps) => {
  const isMobile = useMobileDetect(1024);
  return (
    <div>
      <div
        className="rounded-[0.6rem] text-start"
        style={{
          perspective: 300,
          background: "#FFFFFF88",
          transform: small && !isMobile ? "scale(.85) translateY(5%)" : "",
          transformOrigin: title === "Platinum" ? "top left" : "top right",
        }}
      >
        <div className="packageCard h-full text-sm sm:text-base transition duration-300 bg-[#24202d] p-5 md:p-8 rounded-[0.5rem]">
          <Image src={icon} width={40} height={40} alt="Diamond Icon" />
          <h3 className="text-[1.75em] font-semibold py-5">{title}</h3>
          <div
            style={{
              background: `linear-gradient(90deg, ${box.gradient.from}, ${box.gradient.to})`,
            }}
            className={`mt-3 p-5 rounded-md`}
          >
            <h4 className="text-[1em] font-semibold mb-1 uppercase">
              {box.title}
            </h4>
            <p className="text-[.75em] leading-5">{box.text}</p>
          </div>
          <div className="pt-5 pb-3 uppercase font-medium text-[1em]">
            Reward
          </div>
          <div
            style={{ color: numColor }}
            className="text-[2.5em] mt-1 font-semibold"
          >
            {reward}%
          </div>
        </div>
      </div>
    </div>
  );
};
