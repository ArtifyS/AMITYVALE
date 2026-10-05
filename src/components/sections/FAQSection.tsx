"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What happens during a private coaching session?",
    answer: "Sessions are structured as safe, open dialogues. We start by identifying your immediate concerns, then explore the underlying dynamics, and conclude with practical, actionable steps to improve your communication and connection before the next session."
  },
  {
    question: "Can I book a session individually or as a couple?",
    answer: "Both. Many clients prefer to start individually to gain clarity on their own feelings before inviting their partner. Others prefer to attend together from the very beginning. We can adapt to whatever feels safest for you."
  },
  {
    question: "How do online sessions work?",
    answer: "All sessions are conducted via a secure, private video link provided upon booking. You can join from any device. We recommend finding a quiet, comfortable space where you won't be interrupted."
  },
  {
    question: "Is my information kept private?",
    answer: "Absolutely. Confidentiality is the foundation of our work. Everything discussed in your sessions remains strictly private, and we use secure platforms designed to protect your personal information."
  },
  {
    question: "How do I choose the right session length?",
    answer: "15-minute sessions are best for quick check-ins. 30-45 minutes are ideal for individuals focusing on a specific issue. 60-minute sessions are strongly recommended for couples to ensure both partners have ample time to be heard."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 md:py-32 z-10 overflow-hidden">
      
      {/* Soft Editorial Fade Transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#F9F6F4] to-background pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-[840px]">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-sans uppercase tracking-[0.16em] text-[#E98267] text-[11px] md:text-[12px] font-bold mb-4 block"
          >
            Common Questions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-serif text-[34px] md:text-[46px] leading-[1.1] text-[#151312]"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className={`border rounded-[20px] overflow-hidden transition-all duration-500 ease-out ${
                  isOpen 
                    ? 'bg-white border-[#151312]/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
                    : 'bg-transparent border-[#151312]/[0.04] hover:border-[#151312]/[0.1] hover:bg-white/40'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-6 py-6 md:px-8 md:py-7 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E98267]/50"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className={`font-serif text-[17.5px] md:text-[20px] pr-8 transition-colors duration-300 ${isOpen ? 'text-[#E98267]' : 'text-[#151312]'}`}>
                    {faq.question}
                  </span>
                  
                  {/* Elegant Icon Morph */}
                  <div className="relative w-5 h-5 flex-shrink-0 ml-4 flex items-center justify-center text-[#151312]/40 transition-colors duration-300 group-hover:text-[#E98267]">
                    <motion.div
                      initial={false}
                      animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0, scale: isOpen ? 0.8 : 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className={`absolute inset-0 flex items-center justify-center ${isOpen ? 'text-[#E98267]' : ''}`}
                    >
                      <Plus size={20} strokeWidth={1.5} />
                    </motion.div>
                    <motion.div
                      initial={false}
                      animate={{ opacity: isOpen ? 1 : 0, rotate: isOpen ? 0 : -90, scale: isOpen ? 1 : 0.8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center justify-center text-[#E98267]"
                    >
                      <Minus size={20} strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Calm premium easing
                    >
                      <div className="px-6 md:px-8 pb-7 pt-0 text-[#5C5550] text-[15px] md:text-[16px] leading-[1.7] max-w-[92%]">
                        {faq.answer}
                      </div>
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
