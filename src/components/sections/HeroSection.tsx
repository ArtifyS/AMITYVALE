"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const desktopImages = [
  "/hero_image.jpg",
  "/hero_image2.png",
  "/hero_image3.png",
];

const mobileImages = [
  "/hero_image_mobile.png",
  "/hero_image2_mobile.png",
  "/hero_image3_mobile.png",
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // If the user prefers reduced motion, we keep the first image static
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      // Don't advance if the tab is hidden
      if (!document.hidden) {
        setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative w-full mb-8 md:mb-10">
      {/* 
        DESKTOP HERO
        Hidden on mobile. Contained within page with rounded corners.
      */}
      <div className="hidden md:block relative w-[calc(100%-32px)] md:w-[calc(100%-48px)] max-w-[1320px] mx-auto mt-6 h-[clamp(560px,68vh,680px)] rounded-[26px] overflow-hidden bg-[#161514]">
        
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: hasMounted ? 0 : 1, scale: 1 }}
              animate={{ opacity: 1, scale: prefersReducedMotion ? 1 : 1.045 }}
              exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 6.5, ease: "linear" }
              }}
              className="absolute inset-0 origin-center"
            >
              <Image
                src={desktopImages[currentIndex]}
                alt="Couple standing closely together and looking at one another."
                fill
                priority={currentIndex === 0}
                className="object-cover object-[65%_center]"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Preload upcoming images cleanly */}
          <div className="absolute inset-0 opacity-0 pointer-events-none z-[-1]">
            {desktopImages.map((src, i) => (
              <Image key={src} src={src} fill priority={i === 0} alt="" sizes="100vw" />
            ))}
          </div>

          {/* Refined gradient overlay for text readability (Dark on left, transparent on right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#161514]/90 via-[#161514]/60 to-transparent w-[70%] z-10" />
        </div>

        {/* Desktop Content Block */}
        <div className="absolute inset-0 z-20 flex items-center pl-[60px] lg:pl-[80px]">
          <div className="max-w-[520px]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-5"
            >
              <h2 className="font-sans text-[11px] lg:text-[12px] font-medium tracking-[0.12em] uppercase text-white/80">
                Private Relationship & Intimacy Coaching
              </h2>
            </motion.div>

            {/* Headline */}
            <div className="font-serif text-[clamp(44px,4.4vw,68px)] leading-[1.02] font-normal text-[#F8F5F1] mb-10">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              >
                Reconnect.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Communicate.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                Feel Close Again.
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col items-start"
            >
              <Link
                href="/book"
                className="inline-flex items-center justify-center h-[46px] px-7 bg-[#E98267] text-white text-[12px] font-medium tracking-wide uppercase rounded-[3px] hover:bg-[#D77156] transition-colors"
              >
                Book a Private Session
              </Link>
              
              <Link
                href="#"
                className="mt-4 text-[12px] text-white/70 hover:text-white transition-colors flex items-center group"
              >
                Take the free relationship assessment <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 
        MOBILE HERO
        Visible only <= 640px. Full-bleed immersive background, content stacked at the bottom.
      */}
      <div className="relative flex flex-col w-full min-h-[100svh] md:hidden overflow-hidden bg-[#0A0A09]">
        
        {/* Mobile Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: hasMounted ? 0 : 1, scale: 1 }}
              animate={{ opacity: 1, scale: prefersReducedMotion ? 1 : 1.045 }}
              exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
              transition={{
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 6.5, ease: "linear" }
              }}
              className="absolute inset-0 origin-center"
            >
              <Image
                src={mobileImages[currentIndex]}
                alt="Couple standing closely together and looking at one another."
                fill
                priority={currentIndex === 0}
                className="object-cover object-[center_top]"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Preload upcoming mobile images */}
          <div className="absolute inset-0 opacity-0 pointer-events-none z-[-1]">
            {mobileImages.map((src, i) => (
              <Image key={src} src={src} fill priority={i === 0} alt="" sizes="100vw" />
            ))}
          </div>

          {/* Refined multi-step cinematic gradient overlay */}
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(10,10,9,0.35) 0%, 
                rgba(10,10,9,0.15) 25%, 
                rgba(10,10,9,0.25) 45%, 
                rgba(10,10,9,0.65) 72%, 
                rgba(10,10,9,0.90) 100%)`
            }}
          />
        </div>

        {/* Top Area: Eyebrow + Hamburger */}
        <div className="relative z-20 flex justify-between items-start w-full px-[26px] pt-[calc(env(safe-area-inset-top)+24px)]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-sans text-[12px] md:text-[14px] font-medium tracking-[0.16em] leading-[1.4] uppercase text-white/90">
              Private Relationship &<br/>Intimacy Coaching
            </h2>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => window.dispatchEvent(new Event('toggleMobileMenu'))}
            className="text-white p-2 -mr-2 focus:outline-none flex flex-col justify-between w-[28px] h-[14px]"
            aria-label="Open menu"
          >
            <span className="block h-[1px] w-full bg-white"></span>
            <span className="block h-[1px] w-full bg-white"></span>
            <span className="block h-[1px] w-full bg-white"></span>
          </motion.button>
        </div>

        {/* Lower Content Area */}
        <div className="relative z-20 flex flex-col justify-end flex-grow w-full px-6 pb-[calc(env(safe-area-inset-bottom)+40px)]">
          <div className="flex flex-col items-center w-full text-center">
            
            {/* Small decorative line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-[40px] h-[2px] bg-[#E98267] mb-8"
            />

            {/* Headline */}
            <div className="font-serif text-[clamp(48px,13vw,68px)] leading-[1.0] font-normal text-white mb-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                Reconnect.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Communicate.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                Feel Close Again.
              </motion.div>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <Link
                href="/book"
                className="flex items-center justify-center w-[calc(100%-48px)] max-w-[360px] h-[58px] bg-[#E98267] text-white text-[15px] font-medium tracking-[0.08em] uppercase rounded-[8px] hover:bg-[#D77156] transition-colors"
              >
                Book a Private Session &rarr;
              </Link>
              
              <Link
                href="#"
                className="mt-6 text-[15px] font-normal text-white/80 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
              >
                Take the free relationship assessment &rarr;
              </Link>
            </motion.div>

          </div>
        </div>

      </div>

    </section>
  );
}
