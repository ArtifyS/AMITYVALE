"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const areasData = [
  {
    number: "01",
    category: "COMMUNICATION",
    headline: "Say What Matters Without Falling Into the Same Fight.",
    description: [
      "When conversations repeatedly end in defensiveness, misunderstanding, silence, or escalation, even simple topics can begin to feel difficult.",
      "Coaching can help you slow those patterns down, understand what is happening beneath the reaction, and communicate what actually needs to be said."
    ],
    focusPoints: [
      "Clearer communication",
      "Expressing needs",
      "Listening without immediate defensiveness",
      "Recurring conflict patterns",
      "Difficult conversations"
    ],
    image: "/hero_image3.png", // Temporarily using existing images
    layout: "imageLeft",
    bgColor: "bg-[#F8F5F1]" // Brighter cream
  },
  {
    number: "02",
    category: "CONNECTION",
    headline: "Feel Like Partners Again, Not Just People Sharing a Life.",
    description: [
      "Emotional distance can develop quietly. The relationship may still function day to day while closeness, curiosity, trust, and affection begin to feel harder to access.",
      "Coaching creates space to understand what changed and begin rebuilding a stronger sense of partnership."
    ],
    focusPoints: [
      "Emotional closeness",
      "Trust",
      "Feeling understood",
      "Intentional connection",
      "Moving beyond “roommate mode”"
    ],
    image: "/hero_image2.png", // Temporarily using existing images
    layout: "imageRight",
    bgColor: "bg-[#F3EFEA]" // Soft warm neutral
  },
  {
    number: "03",
    category: "INTIMACY",
    headline: "Create Space for Closeness Without Pressure or Judgment.",
    description: [
      "Intimacy can become difficult to discuss when expectations, vulnerability, emotional distance, or discomfort begin to build around it.",
      "Coaching offers a private way to explore those conversations with greater openness, clarity, and respect."
    ],
    focusPoints: [
      "Talking about intimacy",
      "Emotional vulnerability",
      "Affection and closeness",
      "Understanding needs",
      "Reducing pressure",
      "Rebuilding comfort"
    ],
    image: "/hero_image3_mobile.png", // Temporarily using existing images
    layout: "imageLeft",
    bgColor: "bg-[#E8E1D9]" // Deeper warm clay
  }
];

export function CoachingAreas() {
  return (
    <section id="coaching-areas" className="flex flex-col">
      {/* Intro Header */}
      <div className="w-full bg-[#F8F5F1] py-[100px] md:py-[140px] text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-6"
        >
          Coaching Areas
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-[38px] md:text-[52px] leading-[1.1] text-[#161514] mb-6"
        >
          Support Where Your Relationship <br className="hidden md:block" />
          Needs It Most.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[16px] md:text-[18px] text-[#161514]/70 max-w-[600px] mx-auto"
        >
          Communication, connection, and intimacy are deeply linked. Start with what feels most important right now.
        </motion.p>
      </div>

      {/* Area Chapters */}
      {areasData.map((area, idx) => (
        <div key={idx} className={`w-full py-[100px] md:py-[160px] ${area.bgColor} relative overflow-hidden`}>
          <div className="max-w-[1320px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 lg:gap-24 relative z-10">
            
            {/* Image Block */}
            <div className={`w-full md:w-[45%] lg:w-[45%] ${area.layout === 'imageRight' ? 'md:order-2' : ''}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.06)] group"
              >
                <Image
                  src={area.image}
                  alt={area.headline}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </motion.div>
            </div>

            {/* Content Block */}
            <div className={`w-full md:w-[55%] lg:w-[55%] flex flex-col ${area.layout === 'imageRight' ? 'md:order-1' : ''}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Oversized Number */}
                <div className="absolute top-[-40px] left-[-20px] md:left-[-40px] font-serif text-[120px] md:text-[180px] leading-none text-[#161514]/[0.03] pointer-events-none select-none">
                  {area.number}
                </div>

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <span className="font-serif text-[18px] text-[#E98267] italic">{area.number}</span>
                  <div className="h-[1px] w-[30px] bg-[#E98267]/40" />
                  <span className="font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#161514]/70">
                    {area.category}
                  </span>
                </div>
                
                <h3 className="font-serif text-[34px] md:text-[44px] leading-[1.1] text-[#161514] mb-8 relative z-10 max-w-[500px]">
                  {area.headline}
                </h3>
                
                <div className="space-y-6 text-[16px] md:text-[17px] leading-[1.7] text-[#161514]/70 max-w-[500px] mb-10 relative z-10">
                  {area.description.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                <div className="relative z-10 pt-8 border-t-[1px] border-[#161514]/10 max-w-[500px]">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {area.focusPoints.map((point, ptIdx) => (
                      <motion.li
                        key={ptIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: ptIdx * 0.1, ease: "easeOut" }}
                        className="flex items-start text-[14px] text-[#161514]/80"
                      >
                        <span className="text-[#E98267] mr-3 mt-1 text-[10px]">✦</span>
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
