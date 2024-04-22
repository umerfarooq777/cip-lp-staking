"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
  children: JSX.Element;
  right?: boolean;
  className?: string;
}

const Fade = ({ children, className }: Props) => {
  const showRef = useRef(null);
  const hideRef = useRef(null);
  const isInView = useInView(showRef);
  const notHiding = useInView(hideRef);

  const mainControls = useAnimation();

  const duration = 2

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate");
    } else if (!notHiding) {
      mainControls.start("initial");
    }
  }, [isInView, notHiding]);

  const animVars = {
    initial: {
      opacity: 0,
      scale: 1.15,
      transition: {
        duration,
      },
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
      },
    },
  };

  return (
    <div className="reveal-wrapper w-full relative">
      <motion.div
        variants={animVars}
        initial="initial"
        animate={mainControls}
        className={`${className} w-full`}
      >
        {children}
      </motion.div>
      <div className="absolute top-1/2 left-0 w-full  pointer-events-none" ref={showRef}></div>
      <div className="absolute inset-0 pointer-events-none" ref={hideRef}></div>
    </div>
  );
};

export default Fade;
