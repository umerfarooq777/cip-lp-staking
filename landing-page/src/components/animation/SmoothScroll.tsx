"use client"
import Lenis from "@studio-freight/lenis";
import React, { useEffect } from "react";

const raf = (time: number, lenis: Lenis) => {
  lenis.raf(time);
  requestAnimationFrame((nextTime) => raf(nextTime, lenis));
};

const SmoothScroll = () => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      const lenis = new Lenis();
      requestAnimationFrame((time) => raf(time, lenis));
    }
  }, []);

  return <></>;
};

export default SmoothScroll;
