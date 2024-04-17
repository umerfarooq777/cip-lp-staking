"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface Props {
  children: JSX.Element;
  right?: boolean;
  className?: string;
}

const Fade = ({ children, className }: Props) => {
  const duration = .3
  const animVars = {
    initial: {
      opacity: 0,
      transition: {
        duration,
      },
    },
    animate: {
      opacity: 1,
      transition: {
        duration,
      },
    },
  };

  return (
    <div className="reveal-wrapper">
      <motion.div
        variants={animVars}
        initial="initial"
        animate="animate"
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Fade;
