"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export function ConfirmedPageContent() {
  return (
    <section className="py-20 md:py-32 bg-[#F8F5F1] min-h-[100dvh] flex items-center justify-center">
      <div className="max-w-[600px] w-full px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white p-10 md:p-14 rounded-[20px] border-[1px] border-[#161514]/10 shadow-[0_20px_60px_rgba(0,0,0,0.03)] flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#E98267]/10 flex items-center justify-center text-[#E98267] mb-8">
            <Check size={32} strokeWidth={2} />
          </div>

          <h1 className="font-serif text-[32px] md:text-[38px] text-[#161514] leading-[1.1] mb-4">
            Your Session <br className="hidden md:block" />Is Confirmed.
          </h1>
          <p className="text-[15px] text-[#161514]/70 mb-10 max-w-[340px]">
            Your booking details have been sent to your email. We look forward to our conversation.
          </p>

          {/* Example Data Display */}
          <div className="w-full bg-[#FCFAF8] border-[1px] border-[#161514]/5 rounded-[12px] p-6 mb-10 flex flex-col gap-4 text-left">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#161514]/40 mb-1">Session</span>
                <span className="text-[14px] text-[#161514] font-medium">Focused Session</span>
              </div>
              <span className="font-serif text-[18px] text-[#161514]">30 Min</span>
            </div>
            <div className="h-[1px] w-full bg-[#161514]/5" />
            <div className="flex flex-col">
              <span className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#161514]/40 mb-1">When</span>
              <span className="text-[14px] text-[#161514] mb-1">Tuesday, October 13, 2026</span>
              <span className="text-[14px] text-[#161514]">3:00 PM (America/New_York)</span>
            </div>
            <div className="h-[1px] w-full bg-[#161514]/5" />
            <div className="flex flex-col">
              <span className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#161514]/40 mb-1">Where</span>
              <span className="text-[14px] text-[#161514]">Online (Link sent to email)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button className="flex-1 h-[48px] rounded-[3px] border-[1px] border-[#161514]/10 bg-white text-[13px] font-medium uppercase tracking-wide text-[#161514] hover:bg-[#F8F5F1] transition-colors">
              Add to Calendar
            </button>
            <Link href="/" className="flex-1 h-[48px] flex items-center justify-center rounded-[3px] bg-[#161514] text-[13px] font-medium uppercase tracking-wide text-white hover:bg-[#161514]/90 transition-colors">
              Return Home
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
