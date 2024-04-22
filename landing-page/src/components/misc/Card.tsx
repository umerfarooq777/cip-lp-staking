import Image from "next/image";
import React from "react";

type Props = {
  data: {
    [key: string]: string,
  };
};

const Card = ({ data }: Props) => {
  
  return (
    <div
      className="rounded-xl h-full w-full"
      style={{ perspective: 300, background: data.color }}
    >
      <article
        style={{ transform: "rotateX(0.5deg)" }}
        className="rounded-xl flex flex-col gap-5 h-full bg-gradient-to-br from-[#161321dd] via-[#161321f4] to-dark p-4 shadow-sm transition hover:shadow-lg sm:px-8 sm:py-10"
      >
        <span className="inline-block relative w-14 h-14">
          <Image
            src={data.icon}
            layout="fill"
            objectFit="contain"
            alt="Message Icon"
          />
        </span>

        <a href="#">
          <h3 className="text-md sm:text-lg md:text-xl font-semibold capitalize">
            {data.title}
          </h3>
        </a>

        <p className="text-sm lg:text-base font-thin leading-7 sm:pr-3">
          {data.text}</p>

        <a
          href={data.href}
          className="group inline-flex mt-auto items-center gap-1 text-sm relative"
        >
          Read More
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </a>
      </article>
    </div>
  );
};

export default Card;
