"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function MembershipFeature() {
  return (
    <section className="py-[60px] md:py-[80px] bg-white relative px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-[#161514] rounded-[24px] overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative"
        >
          {/* Subtle graphical rhythm background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center font-serif text-[180px] font-bold leading-none select-none text-[#F8F5F1] whitespace-nowrap overflow-hidden">
            MONTH 01 &nbsp; MONTH 02 &nbsp; MONTH 03
          </div>

          {/* Left Side: Description */}
          <div className="w-full lg:w-[60%] p-10 md:p-16 flex flex-col justify-center relative z-10">
            <span className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#FF5A4F] mb-4">
              Monthly Membership
            </span>
            <h2 className="font-serif text-[32px] md:text-[42px] leading-[1.1] text-white mb-6">
              Prefer a Consistent<br /> Check-In?
            </h2>
            <p className="text-[16px] leading-[1.6] text-white/70 max-w-[400px]">
              For clients who prefer a regular, shorter conversation rather than booking each check-in separately.
            </p>
          </div>

          {/* Right Side: Pricing & CTA */}
          <div className="w-full lg:w-[40%] bg-white/[0.03] p-10 md:p-16 flex flex-col justify-center border-t-[1px] lg:border-t-0 lg:border-l-[1px] border-white/10 relative z-10">
            <div className="flex items-end gap-3 mb-6">
              <span className="font-sans text-[48px] md:text-[56px] leading-none font-medium text-white">$75</span>
              <span className="font-sans text-[14px] tracking-wide text-white/50 mb-2">/ month</span>
            </div>
            
            <div className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[#FF5A4F] mb-8">
              One 15-Minute Private Session Each Month
            </div>

            <Link
              href="#"
              className="flex items-center justify-center w-full h-[50px] bg-[#FF5A4F] text-white text-[13px] font-medium tracking-wide uppercase rounded-[3px] hover:bg-[#F0443A] transition-colors mb-4"
            >
              Choose Membership
            </Link>

            <p className="text-[11px] leading-[1.5] text-white/40 text-center">
              Membership terms and billing details will be shown clearly before enrollment.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
