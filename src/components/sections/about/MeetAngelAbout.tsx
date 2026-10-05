"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MeetAngelAbout() {
  return (
    <section id="meet-angel" className="py-[100px] md:py-[160px] bg-[#F8F5F1] relative overflow-hidden">
      {/* Decorative Dots */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] opacity-[0.15] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(#161514 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side - Image Composition */}
        <div className="w-full lg:w-[45%] relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mx-auto max-w-[440px] lg:max-w-none"
          >
            {/* Background Muted Clay Card */}
            <motion.div 
              animate={{ rotate: [3, 4, 3] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#E8E1D9] rounded-[24px] transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" 
            />
            
            {/* Portrait Image */}
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] transform -rotate-2">
              <Image
                src="/angel_image.png"
                alt="Angel, Relationship & Intimacy Coach"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Side - Copy */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-6">
              Meet Angel
            </span>
            <h2 className="font-serif text-[38px] md:text-[52px] leading-[1.1] text-[#161514] mb-8">
              A Conversation Can Feel Different When You Finally Feel Heard.
            </h2>
            
            <div className="space-y-6 text-[16px] md:text-[17px] leading-[1.7] text-[#161514]/80 max-w-[540px] mb-10">
              <p>
                Angel&apos;s work is centered on creating a private, thoughtful space where difficult relationship and intimacy conversations can be approached without shame, pressure, or unnecessary judgment.
              </p>
              <p>
                The goal is not to provide rehearsed answers. It is to help people slow down, understand what is happening between them, communicate more clearly, and find practical ways to move forward.
              </p>
              <p>
                Whether someone arrives feeling disconnected, stuck in recurring conflict, uncertain about intimacy, or simply unable to say what needs to be said, the work begins with understanding the situation as it actually is.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                href="/book"
                className="inline-flex items-center justify-center h-[50px] px-8 bg-[#E98267] text-white text-[13px] font-medium tracking-wide uppercase rounded-[3px] hover:bg-[#D77156] transition-colors"
              >
                Book a Private Session
              </Link>
              <Link
                href="#"
                className="group inline-flex items-center text-[14px] font-medium text-[#161514] hover:text-[#E98267] transition-colors"
              >
                Explore Coaching <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
