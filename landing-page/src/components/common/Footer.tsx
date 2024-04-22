import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineTwitter } from "react-icons/ai";

const footerLinks = [
  {
    title: "Links",
    links: [
      { title: "Home", href: "/" },
      { title: "About Us", href: "/" },
      { title: "Bookings", href: "/" },
      { title: "Blog", href: "/" },
    ],
  },
  {
    title: "legal",
    links: [
      { title: "terms of use", href: "/" },
      { title: "privacy policy", href: "/" },
      { title: "cookie policy", href: "/" },
    ],
  },
  {
    title: "product",
    links: [
      { title: "take tour", href: "/" },
      { title: "live chat", href: "/" },
      { title: "reveiws", href: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="relative">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 md:grid-cols-4">
            <div className="flex flex-col gap-4">
              <div className="relative h-10 aspect-square mb-3">
                <Image layout="fill" src="cip-pro-small.png" alt="Logo" className="object-contain object-left" />
              </div>
              <Link
                href="/"
                className="text-neutral-300 text-sm flex items-center gap-2"
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/mail.svg"
                  alt="Mail Icon"
                />
                help@frybix.com
              </Link>
              <Link
                href="/"
                className="text-neutral-300 text-sm flex items-center gap-2"
              >
                <Image
                  width={20}
                  height={20}
                  src="/icons/phone.svg"
                  alt="Phone Icon"
                />
                +1 234 456 678 89
              </Link>
            </div>
            {footerLinks.map(({ title, links }, index) => {
              return (
                <div key={index}>
                  <p className="font-medium text-xl mb-3 tracking-wide capitalize">
                    {title}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {links.map(({ title, href }, index) => {
                      return (
                        <li key={index}>
                          <a
                            href={href}
                            className="text-neutral-300 text-sm capitalize"
                          >
                            {title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="md:max-w-md lg:col-span-2 row-start-1 lg:row-start-auto mb-10 lg:mb-0">
            <span className="font-medium text-xl tracking-wid">Newsletter</span>
            <p className="text-neutral-400 text-sm mt-3">Stay Up To Date</p>
            <form className="flex mt-4 bg-neutral-800 p-2 rounded-lg max-w-[90%] lg:w-[75%]">
              <input
                placeholder="Your Email"
                required
                type="text"
                className="text-sm flex-grow w-full h-12 px-4 transition duration-200 bg-transparent rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              <button className="inline-block primary-button">Subscribe</button>
            </form>
          </div>
        </div>
        <hr className="border-none h-[1px] bg-gradient-to-r from-[#16161600] via-[#69696988] to-[#16161600]" />
        <div className="flex justify-center pt-5 pb-10">
          <p className="text-sm">
            Copyright 2022 uifry.com All Rights Reserved
          </p>
        </div>
      </div>
      <div className="absolute -right-[300px] -bottom-[150px] -z-10">
        <div className="w-[800px] h-[800px] relative ">
          <Image
            src="/images/shadow.svg"
            alt="Shadow Effect"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
