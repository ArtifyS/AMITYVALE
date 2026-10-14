"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Subtle scroll parallax
  const yOffset = useTransform(scrollY, [0, 400], [0, -14]);
  const opacityOffset = useTransform(scrollY, [0, 400], [1, 0.85]);

  // Luxury cinematic easing curve
  const easeLuxury = [0.16, 1, 0.3, 1] as const;

  // Silky-smooth cinematic logo entrance
  const logoReveal = {
    hidden: prefersReducedMotion
      ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, scale: 0.93, y: 22, filter: "blur(10px)" },
    visible: prefersReducedMotion
      ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
      : {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 1.5,
            delay: 0.25,
            ease: easeLuxury,
          },
        },
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-[#161514]">
      {/* Video Background with smooth fade-in */}
      <motion.video
        src="/hero_video.mp4"
        poster="/hero_video_poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Subtle Radial Vignette Behind Logo for Pristine Readability */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.02) 75%, transparent 100%)"
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
          className="relative -left-3 sm:-left-5 lg:-left-7 flex items-center justify-center w-[clamp(380px,86vw,510px)] sm:w-[clamp(480px,58vw,600px)] lg:w-[clamp(540px,46vw,700px)] xl:w-[clamp(600px,45vw,720px)]"
        >
          <Image
            src="/hero_logo.png"
            alt="Amity Vale"
            width={2172}
            height={724}
            priority
            className="w-full h-auto object-contain drop-shadow-[0_6px_32px_rgba(0,0,0,0.45)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
