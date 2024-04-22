"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../layout/Container";
import { AiOutlineClose } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/" },
  { title: "Pricing", href: "/" },
  { title: "Features", href: "/" },
];
const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)

    return ()=>{
      window.removeEventListener("scroll", changeBackground)
    }
  })

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header className={!open ? `fixed top-0 left-0 right-0 z-50 ${scrolled? "backdrop-filter backdrop-blur-lg bg-opacity-30 bg-[#161321dd]":""}` : ""}>
      <Container>
        <nav className="flex justify-between items-center pb-5 pt-6">
          <div className="flex items-center gap-20">
            <div className="relative h-10 aspect-[2/1]">
              <Image layout="fill" src="cip-pro-small.png" alt="Logo" />
            </div>
            <div className="lg:flex hidden gap-12 text-m text-neutral-300">
              {navLinks.map((link, index) => {
                return (
                  <Link key={index} href={link.href} className="font-medium">
                    {link.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="inline-block primary-button"
              href="https://cip-lp-staking.vercel.app/"
              // href="https://dapp.cryptoindexpool.io/"
              target = "_blank"
            >
              Launch DApp
            </Link>
            <div
              className="cursor-pointer text-3xl lg:hidden"
              onClick={toggleMenu}
            >
              <FiMenu />
            </div>
          </div>
        </nav>
        <hr className="border-none h-[1px] bg-gradient-to-r from-[#16161600] via-[#69696988] to-[#16161600]" />
      </Container>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="backdrop-filter backdrop-blur-2xl bg-opacity-30 bg-[#161321dd] fixed rounded-b-3xl z-50 left-0 top-0 w-full h-screen origin-top text-neutral-100 p-10"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <div className="relative h-10 aspect-[2/1]">
                  {/* <Image width={100} height={100} src="cip-pro-small.png" alt="Logo" /> */}
                </div>
                <p className="cursor-pointer text-3xl " onClick={toggleMenu}>
                  <AiOutlineClose />
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-lora items-center gap-4 "
              >
                {navLinks.map((link, index) => {
                  return (
                    <div  key={index} className="overflow-hidden">
                      <MobileNavLink
                        title={link.title}
                        href={link.href}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
const MobileNavLink = ({ title, href }: { title: string; href: string }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-2xl sm:text-3xl md:text-4xl tracking-widest font-medium uppercase "
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};
