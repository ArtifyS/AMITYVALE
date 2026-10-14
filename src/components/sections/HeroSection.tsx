"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const [hasMounted, setHasMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Subtle scroll parallax
  const yOffset = useTransform(scrollY, [0, 400], [0, -12]);
  const opacityOffset = useTransform(scrollY, [0, 400], [1, 0.88]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);

  const isReady = hasMounted && !prefersReducedMotion;
  const easePremium = [0.22, 1, 0.36, 1] as const;

  // Single subtle entrance animation: opacity 0->1, scale 0.97->1, translateY 8px->0
  const logoReveal = {
    hidden: { 
      opacity: isReady ? 0 : 1, 
      scale: isReady ? 0.97 : 1, 
      y: isReady ? 8 : 0 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        duration: 1.0, 
        delay: 0.15, 
        ease: easePremium 
      } 
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-[#161514]">
      {/* Video Background */}
      <video
        src="/hero_video.mp4"
        poster="/hero_video_poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Subtle Radial Vignette Behind Logo for Pristine Readability */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.14) 45%, rgba(0,0,0,0.02) 75%, transparent 100%)"
        }}
      />

      {/* Centered Hero Content: ONLY /hero_logo.png */}
      <motion.div 
        className="absolute inset-0 z-20 flex items-center justify-center px-6 pointer-events-none select-none"
        style={{
          y: prefersReducedMotion ? 0 : yOffset,
          opacity: prefersReducedMotion ? 1 : opacityOffset
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoReveal}
          className="relative flex items-center justify-center w-[clamp(260px,76vw,340px)] sm:w-[clamp(320px,40vw,400px)] lg:w-[clamp(360px,32vw,460px)]"
        >
          <Image
            src="/hero_logo.png"
            alt="Amity Vale"
            width={2172}
            height={724}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
