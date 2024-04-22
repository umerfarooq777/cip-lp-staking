"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
  children: JSX.Element;
  right?: boolean;
  className?: string;
  early?: boolean
}

const Reveal = ({ children, right = false, className, early=false }: Props) => {
  const showRef = useRef(null);
  const hideRef = useRef(null);
  const isInView = useInView(showRef);
  const notHiding = useInView(hideRef);

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("animate");
    } else{
      mainControls.start("initial")
    }
  }, [isInView, notHiding]);

  const duration = 1;

  const animVars = {
    initial: {
      x: right ? "100%" : "-100%",
      opacity: 0,
      scale: .75,
      transition: {
        duration,
      },
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration,
      },
    },
  };

  return (
    <div className={`reveal-wrapper ${early? "early": ""}`}>
      <motion.div
        variants={animVars}
        initial="initial"
        animate={mainControls}
        className={className}
      >
        {children}
      </motion.div>
      <div className="absolute w-full left-0 top-1/2" ref={showRef}></div>
      <div className="absolute inset-0 w-full h-full" ref={hideRef}></div>
    </div>
  );
};

export default Reveal;
