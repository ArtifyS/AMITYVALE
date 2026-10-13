"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

  // Use simple values if reduced motion or server-side
  const isReady = hasMounted && !prefersReducedMotion;

  const easePremium = [0.22, 1, 0.36, 1];

  const titleReveal = {
    hidden: { 
      opacity: isReady ? 0 : 1, 
      y: isReady ? 18 : 0, 
      letterSpacing: "0.06em",
      clipPath: isReady ? "inset(100% 0 0 0)" : "inset(0 0 0 0)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      letterSpacing: "0.015em",
      clipPath: "inset(0 0 0 0)",
      transition: { duration: 0.95, delay: 0.18, ease: easePremium } 
    }
  };

  const lineReveal = {
    hidden: { scaleX: isReady ? 0 : 1 },
    visible: { scaleX: 1, transition: { duration: 0.65, delay: 0.68, ease: easePremium } }
  };

  const subtitleReveal = {
    hidden: { opacity: isReady ? 0 : 1, y: isReady ? 10 : 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.82, ease: easePremium } }
  };

  const ctaReveal = {
    hidden: { opacity: isReady ? 0 : 1, y: isReady ? 14 : 0, scale: isReady ? 0.985 : 1 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.72, delay: 1.08, ease: easePremium } }
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

      {/* Refined Dark Mask with Subtle Radial Vignette around Text */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "rgba(0,0,0,0.30)"
        }}
      />
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.00) 55%)"
        }}
      />

      {/* Centered Hero Content */}
      <motion.div 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
        style={{
          y: prefersReducedMotion ? 0 : yOffset,
          opacity: prefersReducedMotion ? 1 : opacityOffset
        }}
      >
        
        {/* Main Headline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleReveal}
          className="pb-0"
        >
          <h1 
            className="font-serif text-[46px] md:text-[58px] lg:text-[68px] xl:text-[76px] font-normal text-[#FFFFFF] leading-[0.98] text-center tracking-[0.015em]"
            style={{ textShadow: "0 3px 20px rgba(0,0,0,0.22)" }}
          >
            AMITY VALE
          </h1>
        </motion.div>

        {/* Decorative Gold Line */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={lineReveal}
          className="w-[42px] md:w-[56px] h-[1px] bg-[#D8A23D] mt-[18px] mb-[16px] origin-center"
        />

        {/* Supporting Line */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={subtitleReveal}
        >
          <p className="font-sans text-[15px] md:text-[17px] tracking-[0.035em] font-normal text-[rgba(255,255,255,0.92)] text-center mb-[30px]">
            Relationships. Life. Faith. Connection.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ctaReveal}
        >
          <motion.div
            animate={isReady ? { y: [0, -2, 0] } : false}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.85 }}
            className="rounded-[8px]"
          >
            <Link
              href="/book"
              className="group relative flex items-center justify-center bg-[#FF5A4F] text-[#FFFFFF] font-[600] tracking-[0.01em] rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-[0_8px_22px_rgba(255,90,79,0.22)] hover:shadow-[0_12px_28px_rgba(255,90,79,0.30)] hover:bg-[#F0443A] hover:-translate-y-[2px] hover:scale-[1.015] px-[22px] md:px-[28px] py-[15px] md:py-[16px] text-[14px] md:text-[15px]"
              style={{
                transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background-color 350ms ease, box-shadow 420ms ease"
              }}
            >
              <span className="relative z-10 flex items-center">
                Book a Private Session
                <ArrowRight 
                  className="ml-2 w-[16px] h-[16px] group-hover:translate-x-[4px]" 
                  style={{ transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                />
              </span>
            </Link>
          </motion.div>
        </motion.div>
        
      </motion.div>
    </section>
  );
}
