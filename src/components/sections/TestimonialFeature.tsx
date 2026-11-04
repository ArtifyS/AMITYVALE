"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

interface Testimonial {
  id: number;
  quote: React.ReactNode;
  name: string;
  location: string;
  category: string;
  isLong?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: (
      <>
        &ldquo;I can&apos;t imagine where I would be today if it weren&apos;t for the unwavering care and dedication of AmityHale. Over the past 18 months, AmityHale has gone above and beyond to help me tackle the numerous health issues affecting me. It took many months of close monitoring and guidance to adjust my diet, but AmityHale <span className="text-[#FF5A4F]">never gave up on me</span>. In addition to dietary changes, AmityHale helped me address my many health concerns, fatigue, headaches, nausea, and ED plus other concerns through supplements. Thanks to AmityHale&apos;s hard work and expertise, <span className="text-[#FF5A4F] italic">I feel better than ever</span>.&rdquo;
      </>
    ),
    name: "Todd",
    location: "North Dakota",
    category: "Naturopathic Pharmacology",
    isLong: true,
  },
  {
    id: 2,
    quote: (
      <>
        &ldquo;Had it not been for AmityHale, our Lola may not be with us today. In January 2022, Lola developed a bone cancer in her leg and was told by her doctor that she probably only had six months to a year to live and that the leg would eventually break. AmityHale researched the cancer diagnosis and designed a list of natural supplements to give Lola three times a day with her food. Today, she is cancer-free and living her best life! Thank you, AmityHale, for giving us <span className="text-[#FF5A4F] italic">more time with our beautiful Lola girl!</span>&rdquo;
      </>
    ),
    name: "Kay",
    location: "North Dakota",
    category: "Naturopathic Pharmacology",
    isLong: true,
  },
  {
    id: 3,
    quote: (
      <>
        &ldquo;I had been having arthritic pain in my hands for quite some time and when AmityHale learned that, he didn&apos;t hesitate to research the problem. AmityHale produced a list of natural supplements for me to take twice a day beginning in February 2023. The pain in my hands is <span className="text-[#FF5A4F] italic">almost completely gone</span> thanks to AmityHale!&rdquo;
      </>
    ),
    name: "Martin",
    location: "South Dakota",
    category: "Naturopathic Pharmacology",
    isLong: false,
  },
  {
    id: 4,
    quote: (
      <>
        &ldquo;AmityHale was a remarkable coach to me; his gifted abilities, skills, and Yah&apos;s gifts to him enabled him to help me meet <span className="text-[#FF5A4F]">the man that is now my husband</span> with 2 beautiful children. What stands out the most and I employ daily with my husband is AmityHale&apos;s advice, which is, I must be aware that a relationship has 2 people involved, that becomes 1; I must always consider my partner&apos;s needs, requirements, to ensure <span className="text-[#FF5A4F]">harmony and equitable balance</span> in the relationship. Anyone would significantly benefit from his indelible talents and uncapped capabilities in relationship coaching. I&apos;m <span className="text-[#FF5A4F] italic">grateful and thankful</span> to AmityHale.&rdquo;
      </>
    ),
    name: "Michelle",
    location: "Northern Virginia",
    category: "Relationship Coaching",
    isLong: true,
  },
];

export function TestimonialFeature() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-[70px] md:py-[100px] px-4 sm:px-6 bg-background relative overflow-hidden">
      
      {/* ART DIRECTION GRAPHIC */}
      <DecorativeAccent
        src="/8.png"
        opacity={0.74}
        animateVariant="none"
        className="hidden md:block w-[155px] right-[2%] bottom-[8%] z-0"
      />

      <div className="mx-auto max-w-[1040px] bg-white/[0.45] border border-[#151312]/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.02)] rounded-[32px] md:rounded-[40px] px-5 sm:px-8 md:px-12 py-12 md:py-16 flex flex-col items-center text-center relative z-10">
        
        {/* Large Decorative Quote */}
        <div className="text-[#FF5A4F]/20 select-none mb-5 md:mb-6 flex justify-center w-full">
          <span className="font-serif text-[70px] md:text-[90px] leading-[0.7] block h-[35px] md:h-[45px] overflow-hidden">
            “
          </span>
        </div>

        {/* Eyebrow */}
        <span className="font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-6 md:mb-8 block">
          Client Experience
        </span>

        {/* The Quote Slider */}
        <div className="w-full min-h-[380px] sm:min-h-[310px] md:min-h-[260px] lg:min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center w-full"
            >
              <blockquote
                className={`font-serif ${
                  current.isLong
                    ? "text-[18px] sm:text-[21px] md:text-[25px] lg:text-[28px] xl:text-[29px] leading-[1.42] md:leading-[1.48]"
                    : "text-[21px] sm:text-[25px] md:text-[30px] lg:text-[33px] xl:text-[35px] leading-[1.35] md:leading-[1.4]"
                } text-[#0B2A4A] w-full max-w-[940px] mx-auto font-normal`}
              >
                {current.quote}
              </blockquote>
              
              <div className="mt-8 md:mt-10 flex flex-col items-center w-full">
                <div className="w-[30px] h-[1px] bg-[#FF5A4F]/30 mb-4 md:mb-5" />
                <p className="font-sans text-[12px] md:text-[13px] font-bold text-[#0B2A4A] uppercase tracking-[0.16em] mb-1">
                  {current.name}
                </p>
                <p className="font-sans text-[13px] md:text-[14px] text-[#5C5550] font-normal tracking-wide">
                  {current.location} <span className="mx-1.5 text-[#FF5A4F]/60">·</span> {current.category}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls: Arrows & Slide Counter */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-10">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] rounded-full bg-white border border-[#FF5A4F]/20 flex items-center justify-center text-[#151312] shadow-sm hover:bg-[#FF5A4F] hover:text-white hover:border-[#FF5A4F] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(255,90,79,0.25)] transition-all duration-[250ms] ease-out group focus:outline-none active:scale-[0.98] active:translate-y-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-[250ms] group-hover:-translate-x-[2px]" strokeWidth={1.5} />
          </button>

          {/* Dots Indicator & Counter */}
          <div className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#151312]/[0.04]">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-5 sm:w-6 bg-[#FF5A4F]"
                    : "w-1.5 bg-[#151312]/20 hover:bg-[#151312]/40"
                }`}
              />
            ))}
            <span className="font-sans text-[11px] font-semibold tracking-wider text-[#5C5550] ml-1.5 sm:ml-2">
              0{currentIndex + 1} / 0{testimonials.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] rounded-full bg-white border border-[#FF5A4F]/20 flex items-center justify-center text-[#151312] shadow-sm hover:bg-[#FF5A4F] hover:text-white hover:border-[#FF5A4F] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(255,90,79,0.25)] transition-all duration-[250ms] ease-out group focus:outline-none active:scale-[0.98] active:translate-y-0"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-[250ms] group-hover:translate-x-[2px]" strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
}

