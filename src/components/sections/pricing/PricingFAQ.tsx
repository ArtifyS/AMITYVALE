"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    q: "Which session length should I choose?",
    a: "Choose based on how much space you want for the conversation. A shorter session can work well for one focused concern, while a longer session gives more time to explore patterns, communication, connection, or intimacy in greater depth."
  },
  {
    q: "Can I book individually or with my partner?",
    a: "Yes. Sessions are available for individuals as well as couples."
  },
  {
    q: "Are sessions online?",
    a: "Yes. Amity Vale sessions are designed to take place privately online."
  },
  {
    q: "What happens after I book?",
    a: "After choosing your session length and an available time, you will review your booking details and complete payment. Once confirmed, you will receive the session information by email."
  }
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[100px] md:py-[140px] bg-[#F8F5F1] relative border-t-[1px] border-[#161514]/5">
      <div className="max-w-[800px] mx-auto px-6 md:px-12 flex flex-col">
        
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-4"
          >
            Before You Book
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[32px] md:text-[42px] leading-[1.1] text-[#161514]"
          >
            A Few Practical Questions.
          </motion.h2>
        </div>

        <div className="flex flex-col w-full">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="border-b-[1px] border-[#161514]/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-[18px] md:text-[20px] text-[#161514] pr-8">
                    {faq.q}
                  </span>
                  <div className="text-[#161514]/40 shrink-0">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-[15px] leading-[1.7] text-[#161514]/70 pr-4 md:pr-12">
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
