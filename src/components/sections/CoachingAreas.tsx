"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const areas = [
  {
    num: "01",
    eyebrow: "COMMUNICATION",
    headline: "Say What Matters Without Falling Into the Same Fight.",
    description: "Learn to express needs clearly and move beyond recurring conflict.",
    cta: "Explore communication",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=2070&auto=format&fit=crop",
    offset: "lg:translate-y-0",
  },
  {
    num: "02",
    eyebrow: "CONNECTION",
    headline: "Feel Like Partners Again, Not Just People Sharing a Life.",
    description: "Rebuild trust, emotional safety, and a stronger sense of closeness.",
    cta: "Explore connection",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop",
    offset: "lg:translate-y-8",
  },
  {
    num: "03",
    eyebrow: "INTIMACY",
    headline: "Create Space for Closeness Without Pressure or Judgment.",
    description: "Explore emotional and physical intimacy with greater openness and understanding.",
    cta: "Explore intimacy",
    image: "https://images.unsplash.com/photo-1516584284149-166258d4a9ec?q=80&w=2070&auto=format&fit=crop",
    offset: "lg:translate-y-0",
  }
];

export function CoachingAreas() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1280px] relative isolate">
        
        {/* Decorative Dot Cluster 1 (Desktop: Top Left) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.18 }}
          transition={{ duration: 1 }}
          className="hidden md:block absolute top-[10px] -left-[50px] w-[180px] h-[200px] z-0 -rotate-[6deg] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #E98267 2px, transparent 2.5px)`,
            backgroundSize: `16px 16px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
          }}
        />

        {/* Decorative Dot Cluster 2 (Desktop: Bottom Right) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.16 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden md:block absolute bottom-[80px] -right-[60px] w-[150px] h-[160px] z-0 rotate-[5deg] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #D8C8BE 2px, transparent 2.5px)`,
            backgroundSize: `16px 16px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
          }}
        />

        {/* Decorative Dot Cluster 3 (Desktop: Bottom Left Micro) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.10 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden md:block absolute bottom-[10px] left-[30%] w-[90px] h-[100px] z-0 -rotate-[4deg] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #E98267 2px, transparent 2.5px)`,
            backgroundSize: `16px 16px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
          }}
        />

        {/* Decorative Dot Cluster (Mobile: Single Top Right) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="block md:hidden absolute top-[10px] -right-[20px] w-[100px] h-[110px] z-0 rotate-[4deg] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #E98267 2px, transparent 2.5px)`,
            backgroundSize: `16px 16px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
          }}
        />

        {/* Editorial Asymmetric Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-24 gap-6 lg:gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-[60%]"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#E98267] text-[11px] md:text-[12px] font-semibold mb-5 block">
              Coaching Areas
            </span>
            <h2 className="font-serif text-[36px] md:text-[46px] lg:text-[clamp(46px,4vw,62px)] leading-[1.05] text-foreground">
              Support Where Your Relationship Needs It Most.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:w-[35%]"
          >
            <p className="text-[#5C5550] text-[17px] md:text-[18px] leading-[1.65]">
              Communication, connection, and intimacy are deeply linked. Start with the area that feels most important right now.
            </p>
          </motion.div>
        </div>

        {/* Editorial Photographic Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 relative z-10">
          {areas.map((area, index) => (
            <motion.div
              key={area.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className={`relative w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[5/6] lg:h-auto rounded-[24px] overflow-hidden group cursor-pointer ${area.offset}`}
            >
              <Link href="#" className="absolute inset-0 z-20">
                <span className="sr-only">{area.cta}</span>
              </Link>
              
              {/* Background Image */}
              <Image 
                src={area.image} 
                alt={area.headline}
                fill
                className="object-cover object-[center_25%] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.035]"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              {/* Optional Subtle Numbering */}
              <div className="absolute top-6 right-8 text-white/40 font-serif text-[13px] tracking-wider z-10">
                {area.num}
              </div>

              {/* Default Cinematic Gradient Mask */}
              <div 
                className="absolute inset-0 z-10 transition-opacity duration-500 ease-out"
                style={{
                  background: "linear-gradient(to bottom, rgba(15,13,12,0.02) 20%, rgba(15,13,12,0.18) 52%, rgba(15,13,12,0.85) 100%)"
                }}
              />
              
              {/* Deepened Gradient on Hover */}
              <div 
                className="absolute inset-0 z-10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to bottom, rgba(15,13,12,0) 20%, rgba(15,13,12,0.25) 55%, rgba(15,13,12,0.95) 100%)"
                }}
              />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-7 md:p-8 z-10 flex flex-col justify-end transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <span className="font-sans uppercase tracking-[0.14em] text-[#E98267] text-[11px] font-bold mb-3 block">
                  {area.eyebrow}
                </span>
                
                <h3 className="font-serif text-[#FDFBF7] text-[26px] md:text-[30px] lg:text-[32px] leading-[1.08] mb-4 pr-4">
                  {area.headline}
                </h3>
                
                {/* Description: Always visible on mobile, smooth height reveal on desktop */}
                <div className="transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden max-h-[120px] opacity-100 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-[120px] lg:group-hover:opacity-100 mb-6 lg:mb-0 lg:group-hover:mb-6">
                  <p className="text-[#FDFBF7]/80 text-[14px] md:text-[15px] leading-relaxed pr-2">
                    {area.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center text-[13px] font-sans font-semibold text-white tracking-wide mt-2 lg:mt-0 transition-all duration-500">
                  {area.cta}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
