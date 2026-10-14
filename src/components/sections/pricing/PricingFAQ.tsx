"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    q: "Which session should I choose?",
    a: "If you have one focused question, immediate decision, or brief situation that needs quick clarity, a 15 or 30-minute session is ideal. If you want more space to explore recurring communication patterns, conflict cycles, intimacy, or deeper emotional dynamics, 45 or 60 minutes allows us to unpack the situation thoroughly and outline clear next steps."
  },
  {
    q: "Can I book as an individual or as a couple?",
    a: "Yes, absolutely. All sessions are open to either individuals navigating personal relationship questions or couples attending together. The price remains identical regardless of whether one or two people join."
  },
  {
    q: "Are sessions online?",
    a: "Yes. Amity Vale sessions take place online via private, high-definition video. You will receive a direct access link upon booking, allowing you to meet with Angel comfortably from anywhere in the world."
  },
  {
    q: "What happens after I book?",
    a: "Once you select your session length and preferred time slot, you will review your details and confirm payment. You will immediately receive a confirmation email with calendar invites, your private meeting link, and a brief optional check-in note to help Angel prepare for your conversation."
  }
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default for immediate context

  return (
    <section className="py-16 md:py-24 bg-white relative border-t border-[#0B2A4A]/8">
      <div className="max-w-[820px] mx-auto px-5 sm:px-6 lg:px-8 flex flex-col">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.18em] uppercase text-[#FF5A4F] mb-3"
          >
            Questions & Answers
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="font-serif text-[30px] sm:text-[38px] lg:text-[42px] leading-[1.12] text-[#0B2A4A] tracking-[-0.01em]"
          >
            Frequently Asked <span className="text-[#FF5A4F] italic font-normal">Questions.</span>
          </motion.h2>
        </div>

        {/* ACCORDION ITEMS */}
        <div className="flex flex-col w-full space-y-3.5">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                className={`rounded-[18px] border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-[#FAF7F4] border-[#FF5A4F]/30 shadow-sm" 
                    : "bg-white border-[#0B2A4A]/8 hover:border-[#FF5A4F]/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[17px] sm:text-[19px] font-semibold text-[#0B2A4A] pr-6 leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "bg-[#FF5A4F] text-white" : "bg-[#FAF7F4] text-[#0B2A4A]/60"
                  }`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-6 text-[14px] sm:text-[14.5px] leading-[1.68] text-[#5C5550]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
