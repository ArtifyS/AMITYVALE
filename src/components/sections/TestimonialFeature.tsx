"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

const testimonials = [
  {
    id: 1,
    quote: <>“Angel completely <span className="text-[#FF5A4F]">changed</span> how we handle conflict. We went from constantly defending ourselves to actually <span className="text-[#FF5A4F]">listening</span> and <span className="text-[#FF5A4F]">understanding</span> each other. It feels like we are <span className="text-[#FF5A4F] italic">partners again.</span>”</>,
    name: "PRIVATE CLIENT",
    context: "Couples Coaching"
  },
  {
    id: 2,
    quote: <>“I thought we had lost our connection permanently. Coaching gave us the tools to communicate safely without judgment. We’ve rebuilt our intimacy on a much <span className="text-[#FF5A4F] italic">stronger foundation.</span>”</>,
    name: "PRIVATE CLIENT",
    context: "Intimacy & Connection"
  },
  {
    id: 3,
    quote: <>“Working with Angel helped us see the patterns we were stuck in. It wasn't just about fixing arguments—it was about learning how to be <span className="text-[#FF5A4F] italic">present for each other</span> again.”</>,
    name: "PRIVATE CLIENT",
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
    <section className="py-[70px] md:py-[100px] px-4 sm:px-6 bg-background relative overflow-hidden">
      
      {/* ART DIRECTION GRAPHIC */}
      <DecorativeAccent
        src="/8.png"
        opacity={0.74}
        animateVariant="none"
        className="hidden md:block w-[155px] right-[2%] bottom-[8%] z-0"
      />

      <div className="mx-auto max-w-[1000px] bg-white/[0.35] border border-[#151312]/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.015)] rounded-[32px] md:rounded-[40px] px-6 py-12 md:py-20 flex flex-col items-center text-center relative z-10">
        
        {/* Large Decorative Quote */}
        <div className="text-[#FF5A4F]/20 select-none mb-6 flex justify-center w-full">
          <span className="font-serif text-[70px] md:text-[90px] leading-[0.7] block h-[35px] md:h-[45px] overflow-hidden">
            “
          </span>
        </div>

        {/* Eyebrow */}
        <span className="font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-6 md:mb-8 block">
          Client Experience
        </span>

        {/* The Quote Slider */}
        <div className="w-full min-h-[320px] sm:min-h-[280px] md:min-h-[280px] lg:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="flex flex-col items-center w-full"
            >
              <blockquote className="font-serif text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[38px] leading-[1.3] md:leading-[1.4] text-[#151312] w-full max-w-[95%] md:max-w-[85%] mx-auto">
                {testimonials[currentIndex].quote}
              </blockquote>
              
              <div className="mt-8 md:mt-10 flex flex-col items-center w-full">
                <div className="w-[30px] h-[1px] bg-[#FF5A4F]/30 mb-5 md:mb-6" />
                <p className="font-sans text-[11px] md:text-[12px] font-bold text-[#151312] uppercase tracking-[0.15em] mb-1.5 md:mb-2">
                  {testimonials[currentIndex].name}
                </p>
                <p className="font-sans text-[14px] md:text-[15px] text-[#5C5550]/80 font-medium">
                  {testimonials[currentIndex].context}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center justify-center gap-5 mt-8 md:mt-12">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-[48px] h-[48px] rounded-full bg-white border border-[#FF5A4F]/20 flex items-center justify-center text-[#151312] shadow-sm hover:bg-[#FF5A4F] hover:text-white hover:border-[#FF5A4F] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(255,90,79,0.25)] transition-all duration-[250ms] ease-out group focus:outline-none active:scale-[0.98] active:translate-y-0"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-[250ms] group-hover:-translate-x-[2px]" strokeWidth={1.5} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-[48px] h-[48px] rounded-full bg-white border border-[#FF5A4F]/20 flex items-center justify-center text-[#151312] shadow-sm hover:bg-[#FF5A4F] hover:text-white hover:border-[#FF5A4F] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(255,90,79,0.25)] transition-all duration-[250ms] ease-out group focus:outline-none active:scale-[0.98] active:translate-y-0"
          >
            <ArrowRight className="w-5 h-5 transition-transform duration-[250ms] group-hover:translate-x-[2px]" strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
