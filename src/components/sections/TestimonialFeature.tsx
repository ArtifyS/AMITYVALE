"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Angel completely changed how we handle conflict. We went from constantly defending ourselves to actually listening and understanding each other. It feels like we are partners again.",
    name: "Private Client",
    context: "Couples Coaching"
  },
  {
    id: 2,
    quote: "I thought we had lost our connection permanently. Coaching gave us the tools to communicate safely without judgment. We’ve rebuilt our intimacy on a much stronger foundation.",
    name: "Private Client",
    context: "Intimacy & Connection"
  },
  {
    id: 3,
    quote: "Working with Angel helped us see the patterns we were stuck in. It wasn't just about fixing arguments—it was about learning how to be present for each other again.",
    name: "Private Client",
    context: "Communication Coaching"
  }
];

export function TestimonialFeature() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 bg-background">
      <div className="mx-auto max-w-[1080px] relative">
        
        {/* Large Decorative Quote */}
        <div className="absolute -top-12 md:-top-20 -left-4 md:-left-12 text-[#F4EAE4] z-0 pointer-events-none select-none">
          <span className="font-serif text-[160px] md:text-[240px] leading-none">“</span>
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-2 md:px-0">
          <span className="font-sans uppercase tracking-[0.16em] text-[#E98267] text-[11px] md:text-[12px] font-bold mb-8 md:mb-12 block">
            Client Experience
          </span>

          <div className="flex flex-col">
            
            {/* The Quote Slider */}
            <div className="relative min-h-[220px] md:min-h-[200px] lg:min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <blockquote className="font-serif text-[26px] md:text-[36px] lg:text-[42px] leading-[1.35] text-[#151312] max-w-[900px]">
                    {testimonials[currentIndex].quote}
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* The Bottom Bar: Client Info & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-12 md:mt-16 border-t border-[#151312]/[0.06] pt-8 md:pt-10">
              
              <div className="relative min-h-[48px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <p className="font-sans text-[12px] md:text-[13px] font-bold text-[#151312] uppercase tracking-[0.1em] mb-1.5">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="font-sans text-[14.5px] text-[#5C5550]">
                      {testimonials[currentIndex].context}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Arrow Controls */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-[48px] h-[48px] rounded-full border border-[#151312]/10 flex items-center justify-center text-[#151312] hover:bg-[#F4EAE4] hover:border-[#E98267]/30 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#E98267]/50"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-[48px] h-[48px] rounded-full border border-[#151312]/10 flex items-center justify-center text-[#151312] hover:bg-[#F4EAE4] hover:border-[#E98267]/30 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#E98267]/50"
                >
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
