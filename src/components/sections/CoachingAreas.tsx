"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

const areas = [
  {
    id: "relationships",
    href: "/coaching#romantic",
    eyebrow: "RELATIONSHIPS",
    headline: <>Deepen Romantic <span className="text-[#FF5A4F] italic">Connection.</span></>,
    description: "Strengthen communication, rebuild trust, and create a relationship that feels safer, closer, and more understood.",
    descriptionMobile: "Strengthen communication, rebuild trust, and create a relationship that feels closer and more understood.",
    cta: "Explore relationship coaching",
    image: "/coaching_relationship_1791377157722.jpg",
  },
  {
    id: "family",
    href: "/coaching#family",
    eyebrow: "FAMILY",
    headline: <>Create More Peace <span className="text-[#FF5A4F] italic">at Home.</span></>,
    description: "Navigate difficult dynamics with parents, children, and loved ones with more clarity, compassion, and steadiness.",
    descriptionMobile: "Navigate family dynamics, boundaries, and difficult conversations with greater clarity and compassion.",
    cta: "Explore family coaching",
    image: "/coaching_family_1791377169631.jpg",
  },
  {
    id: "friendship",
    href: "/coaching#friendship",
    eyebrow: "FRIENDSHIP",
    headline: <>Build Healthier, More Honest <span className="text-[#FF5A4F] italic">Bonds.</span></>,
    description: "Work through distance, miscommunication, and emotional strain in friendships and other meaningful personal relationships.",
    descriptionMobile: "Work through distance, conflict, and changing friendships with more honesty and understanding.",
    cta: "Explore friendship coaching",
    image: "/coaching_friendship_1791377181453.jpg",
  },
  {
    id: "faith",
    href: "/coaching#faith",
    eyebrow: "FAITH & PERSONAL GROWTH",
    headline: <>Reconnect With What <span className="text-[#FF5A4F] italic">Grounds You.</span></>,
    description: "Explore questions of purpose, belief, inner conflict, and your relationship with God, faith, and personal direction.",
    descriptionMobile: "Explore faith, purpose, inner conflict, and your relationship with God and personal direction.",
    cta: "Explore faith-centered coaching",
    image: "/coaching_faith_1791377192170.jpg",
  }
];

export function CoachingAreas() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="pt-24 md:pt-32 pb-20 md:pb-24 bg-background relative overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .premium-float {
            animation: premiumFloat 4s ease-in-out infinite alternate;
          }
          .premium-shift {
            animation: premiumShift 4s ease-in-out infinite alternate;
          }
        }
        @keyframes premiumFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-2px); }
        }
        @keyframes premiumShift {
          0% { transform: translateX(0); }
          100% { transform: translateX(3px); }
        }
      `}</style>

      {/* Very faint background dot pattern for premium texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#151312 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="container mx-auto px-6 max-w-[1000px] relative z-10">
        
        {/* Section Intro */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28 relative">
          
          {/* ART DIRECTION GRAPHIC (5.png) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.85 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2 }}
            className="absolute left-0 top-[-10px] md:top-[-60px] w-[210px] md:w-[390px] z-0 pointer-events-none -translate-x-[36%]"
          >
            <motion.div
              animate={prefersReducedMotion ? false : { y: [0, -15, 0], rotate: [12, 16, 12] }}
              transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
              className="w-full h-full"
              style={{ transformOrigin: "center" }}
            >
              <img src="/5.png" alt="" className="w-full h-auto object-contain opacity-[0.60] md:opacity-[0.85]" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <span className="font-sans uppercase tracking-[0.16em] text-[#FF5A4F] text-[11px] md:text-[12px] font-semibold mb-5 block">
              COACHING AREAS
            </span>
            <h2 className="font-serif text-[36px] md:text-[46px] lg:text-[54px] leading-[1.1] text-foreground mb-6 max-w-[800px] mx-auto">
              Support for the Relationships <span className="text-[#FF5A4F] italic">That Shape Your Life.</span>
            </h2>
            <p className="text-[#26313A] text-[16px] md:text-[18px] leading-[1.6] max-w-[600px] mx-auto">
              Private coaching for love, family, friendship, faith, and personal growth.
            </p>
          </motion.div>
        </div>

        {/* Alternating Editorial Rows */}
        <div className="flex flex-col gap-[80px] md:gap-32">
          {areas.map((area, index) => {
            const isEven = index % 2 !== 0;
            return (
              <div 
                key={area.id} 
                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-[28px] md:gap-16 lg:gap-24`}
              >
                
                {/* Image Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`w-full md:w-1/2 flex justify-center ${isEven ? 'translate-x-[18px] md:translate-x-0' : '-translate-x-[18px] md:translate-x-0'}`}
                >
                  <div className="relative">
                    <div className="relative w-[clamp(190px,58vw,220px)] h-[clamp(190px,58vw,220px)] md:w-[380px] md:h-[380px] rounded-full overflow-hidden shadow-[0_15px_40px_rgba(255,90,79,0.12)] md:shadow-[0_25px_60px_rgba(255,90,79,0.15)] border-[2px] md:border-[3px] border-[#FF5A4F] z-10">
                      <Image
                        src={area.image}
                        alt={area.eyebrow}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 220px, 380px"
                      />
                    </div>
                    
                    {/* ART DIRECTION GRAPHICS */}
                    <DecorativeAccent
                      src="/5.png"
                      opacity={0.80}
                      animateVariant="float1"
                      className={`hidden md:block w-[220px] md:w-[420px] top-1/2 z-0 ${!isEven ? 'left-[-40px] md:left-[-120px]' : 'right-[-40px] md:right-[-120px]'}`}
                      style={{ transform: !isEven ? "translateY(-50%) rotate(-80deg)" : "translateY(-50%) rotate(100deg)", transformOrigin: "center" }}
                    />
                  </div>
                </motion.div>

                {/* Text Content Side */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  className="w-full md:w-1/2 flex flex-col text-center md:text-left"
                >
                  <span className="font-sans uppercase tracking-[0.14em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-3 md:mb-4 block">
                    {area.eyebrow}
                  </span>
                  <h3 className="font-serif text-[28px] md:text-[34px] lg:text-[40px] leading-[1.1] text-foreground mb-4 md:mb-5">
                    {area.headline}
                  </h3>
                  <p className="text-[#26313A] text-[15px] md:text-[16px] leading-[1.65] mb-5 md:mb-8 max-w-[420px] mx-auto md:mx-0">
                    <span className="md:hidden">{area.descriptionMobile}</span>
                    <span className="hidden md:inline">{area.description}</span>
                  </p>
                  <Link 
                    href={area.href} 
                    className="inline-flex items-center justify-center md:justify-start text-[#151312] hover:text-[#FF5A4F] text-[13px] font-medium tracking-wide transition-colors group"
                  >
                    {area.cta}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </motion.div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mt-12 md:mt-16 flex flex-col items-center text-center"
        >
          <div className="premium-float">
            <Link
              href="/coaching"
              className="inline-flex items-center justify-center h-[52px] px-8 bg-[#FF5A4F] text-[#FDFBF7] text-[13px] md:text-[14px] font-medium tracking-wide rounded-[26px] shadow-[0_8px_20px_rgba(233,130,103,0.18)] hover:bg-[#D57158] hover:shadow-[0_12px_25px_rgba(233,130,103,0.3)] transition-all duration-[450ms] ease-out hover:-translate-y-[1.5px] group"
            >
              Explore All Coaching Areas
              <div className="premium-shift ml-2 flex items-center justify-center">
                <ArrowRight className="w-[18px] h-[18px] transition-transform duration-[450ms] ease-out group-hover:translate-x-[2px]" />
              </div>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
