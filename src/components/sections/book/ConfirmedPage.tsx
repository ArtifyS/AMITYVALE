"use client";

import React from "react";
import Link from "next/link";
import { Check, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ConfirmedPageContent() {
  return (
    <section className="py-16 md:py-28 bg-white min-h-[85vh] flex items-center justify-center">
      <div className="max-w-[580px] w-full px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="bg-white p-8 md:p-12 rounded-[24px] border border-[#0B2A4A]/10 shadow-[0_18px_50px_rgba(11,42,74,0.06)] flex flex-col items-center text-center"
        >
          {/* Success Checkmark Circle */}
          <div className="w-16 h-16 rounded-full bg-[#0E5A63]/10 text-[#0E5A63] flex items-center justify-center mb-6 ring-8 ring-[#0E5A63]/5">
            <Check size={32} strokeWidth={2.5} />
          </div>

          <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF5A4F] mb-2">
            Reservation Confirmed
          </span>

          <h1 className="font-serif text-[32px] md:text-[38px] text-[#0B2A4A] leading-[1.15] mb-3">
            Your Session Is Confirmed.
          </h1>

          <p className="text-[15px] leading-relaxed text-[#0B2A4A]/70 mb-8 max-w-[420px]">
            Your appointment has been reserved and confirmation details have been sent to your email. We look forward to our conversation.
          </p>

          {/* Quick Confirmation Overview */}
          <div className="w-full bg-[#FCFAF8] border border-[#0B2A4A]/[0.08] rounded-[16px] p-5 mb-8 flex flex-col gap-3.5 text-left">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0B2A4A]/50">
                Session Format
              </span>
              <span className="text-[13.5px] font-medium text-[#0B2A4A]">
                Private Online Video (Link via email)
              </span>
            </div>
            <div className="h-[1px] w-full bg-[#0B2A4A]/[0.06]" />
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0B2A4A]/50">
                Calendar Status
              </span>
              <span className="text-[13.5px] font-semibold text-[#0E5A63] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Invitation Sent
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full">
            <Link 
              href="/" 
              className="flex-1 h-[50px] flex items-center justify-center rounded-full bg-[#FF5A4F] text-[13.5px] font-semibold tracking-wide text-white hover:bg-[#F0443A] shadow-[0_6px_20px_rgba(255,90,79,0.3)] transition-all cursor-pointer gap-2"
            >
              <span>Return to Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
