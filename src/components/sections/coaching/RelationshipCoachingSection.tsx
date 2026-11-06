"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SubDiscipline {
  id: string;
  number: string;
  label: string;
  headline: string;
  body: string;
  focusTerms: string[];
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
}

const disciplines: SubDiscipline[] = [
  {
    id: "business",
    number: "01",
    label: "BUSINESS COACHING",
    headline: "Align the People Behind the Decisions.",
    body: "For founders, business partners, and executive teams, Business Coaching sharpens communication protocols, addresses unresolved friction, and brings competing priorities into alignment — creating stronger accountability, more decisive collaboration, and a working dynamic capable of supporting commercial ambition.",
    focusTerms: ["Accountability", "Communication", "Strategic Alignment"],
    ctaText: "Business Coaching",
    ctaHref: "/book?area=relationships&sub=business",
    imageSrc: "/coaching_business.jpg",
    imageAlt: "Professional founders and executive partners in strategic alignment",
  },
  {
    id: "family",
    number: "02",
    label: "FAMILY COACHING",
    headline: "Create Clarity Without Weakening the Bond.",
    body: "Family systems can carry years of history into a single conversation. Family Coaching establishes firmer boundaries, makes expectations more explicit, and creates a more constructive framework for conflict, changing roles, and structural transitions without allowing the past to dictate every decision in the present.",
    focusTerms: ["Boundaries", "Family Transitions", "Transparent Communication"],
    ctaText: "Family Coaching",
    ctaHref: "/book?area=relationships&sub=family",
    imageSrc: "/coaching_family.jpg",
    imageAlt: "Family members communicating with clarity and healthy boundaries",
  },
  {
    id: "partnerships",
    number: "03",
    label: "PARTNERSHIP COACHING",
    headline: "Build a Partnership That Can Carry the Future.",
    body: "When trust has thinned, priorities have drifted, or the future no longer feels jointly defined, Partnership Coaching provides a disciplined way to restore credibility, deepen emotional intimacy, and bring expectations, commitments, and long-range priorities back into meaningful alignment.",
    focusTerms: ["Emotional Intimacy", "Shared Vision", "Trust Repair"],
    ctaText: "Partnership Coaching",
    ctaHref: "/book?area=relationships&sub=partnerships",
    imageSrc: "/coaching_relationship_1791377157722.jpg",
    imageAlt: "Partners restoring trust, emotional intimacy, and shared vision",
  },
];

export function RelationshipCoachingSection() {
  return (
    <section
      id="relationships"
      className="pt-16 pb-20 md:pt-24 md:pb-28 relative overflow-hidden bg-[#FFFDFB] border-y border-[#0B2A4A]/5 scroll-mt-24"
      style={{ scrollMarginTop: "100px" }}
    >
      {/* Subtle Background Motif */}
      <div className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] pointer-events-none opacity-[0.035] rotate-6" aria-hidden="true">
        <img src="/12.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto px-6 max-w-[1140px] relative z-10">
        
        {/* Section Header & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-14 md:mb-20"
        >
          <span className="font-sans uppercase tracking-[0.16em] text-[#5B6470] text-[11px] md:text-[12px] font-bold mb-4 block">
            <span className="text-[#FF5A4F] mr-2">02</span> — RELATIONSHIP COACHING
          </span>

          <h2 className="font-serif text-[32px] md:text-[40px] lg:text-[46px] leading-[1.1] mb-5 text-[#0B2A4A]">
            Stronger Dynamics. <br />
            <span className="text-[#FF5A4F] italic">Where Life Actually Happens.</span>
          </h2>

          <p className="text-[#26313A] text-[16px] md:text-[17px] leading-[1.65] max-w-[680px] font-normal mb-6">
            Relationship Coaching applies disciplined strategy to the bonds that carry real consequence — how you work together, how family systems evolve, and how two people build a life alongside one another. The objective is not simply fewer disagreements; it is stronger alignment, clearer expectations, and more deliberate ways of relating.
          </p>

          {/* Visual Hierarchy Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EAE4]/70 border border-[#FF5A4F]/20 text-[#0B2A4A] text-[11.5px] md:text-[12px] font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4F]" />
            <span>Three Focused Applications: Business • Family • Partnerships</span>
          </div>
        </motion.div>

        {/* Three-part Editorial Strip / Triptych */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#0B2A4A]/10">
          {disciplines.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col pt-10 first:pt-0 lg:pt-0 pb-10 last:pb-0 lg:pb-0 lg:px-8 first:lg:pl-0 last:lg:pr-0 relative"
            >
              {/* Anchor Target for Sub-discipline Deep Linking */}
              <div id={item.id} className="absolute -top-24" style={{ scrollMarginTop: "120px" }} />

              {/* Narrow Editorial Image Crop */}
              <div className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden mb-6 border border-[#0B2A4A]/10 shadow-[0_8px_20px_rgba(11,42,74,0.04)] bg-[#EAE6DF]">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              {/* Category Metadata */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[11.5px] font-bold text-[#FF5A4F] tracking-[0.14em]">
                  {item.number}
                </span>
                <span className="text-[#0B2A4A]/25 text-[11px]">•</span>
                <span className="font-sans uppercase tracking-[0.16em] text-[#5B6470] text-[11px] font-bold">
                  {item.label}
                </span>
              </div>

              {/* Headline */}
              <h3 className="font-serif text-[20px] md:text-[22px] leading-[1.25] text-[#0B2A4A] mb-3 font-semibold">
                {item.headline}
              </h3>

              {/* Description */}
              <p className="text-[#26313A] text-[14.5px] md:text-[15px] leading-[1.65] mb-5 font-normal flex-1">
                {item.body}
              </p>

              {/* Focus Terms (Strictly Alphabetical) */}
              <div className="flex flex-wrap gap-2 mb-6">
                {item.focusTerms.map((term, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center px-3 py-1 rounded-full border border-[#E8E4DF] bg-white text-[#26313A] text-[11.5px] font-medium tracking-wide shadow-sm"
                  >
                    {term}
                  </span>
                ))}
              </div>

              {/* Small Editorial Text CTA */}
              <Link
                href={item.ctaHref}
                className="inline-flex items-center text-[#151312] hover:text-[#FF5A4F] text-[13px] font-bold tracking-wide transition-colors group mt-auto self-start"
              >
                <span>{item.ctaText}</span>
                <ArrowRight className="ml-1.5 w-[14px] h-[14px] transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

