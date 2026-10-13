"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

// Structured cleanly for future CMS integration
const articles = [
  {
    id: 1,
    category: "RELATIONSHIPS",
    title: "How to Communicate Better Without Turning It Into a Fight",
    excerpt: "Practical ways to express what matters, listen differently, and keep difficult conversations from becoming another argument.",
    readTime: "5–7 min read",
    image: "/article_communication_1791392276197.jpg"
  },
  {
    id: 2,
    category: "FAMILY",
    title: "How to Set Boundaries With Family Without Feeling Guilty",
    excerpt: "How to protect your needs while navigating love, history, expectations, and difficult family dynamics.",
    readTime: "6–8 min read",
    image: "/article_family_1791392286386.jpg"
  },
  {
    id: 3,
    category: "FAITH & SPIRITUAL LIFE",
    title: "When God Feels Distant: How to Reconnect With Your Faith",
    excerpt: "An honest look at spiritual distance, doubt, meaning, and finding your way back to a relationship with faith.",
    readTime: "5–7 min read",
    image: "/article_faith_1791392297766.jpg"
  }
];

export function ResourcesSection() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1260px] relative">
        
        {/* Subtle Editorial Dot Cluster */}
        <div 
          className="hidden md:block absolute top-0 right-0 w-[160px] h-[160px] opacity-[0.08] pointer-events-none translate-x-[20px] -translate-y-[20px]"
          style={{
            backgroundImage: `radial-gradient(circle, #FF5A4F 2px, transparent 2.5px)`,
            backgroundSize: `16px 16px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
          }}
        />

        {/* ART DIRECTION GRAPHIC */}
        <DecorativeAccent
          src="/12.png"
          opacity={0.75}
          animateVariant="none"
          className="w-[90px] right-[-30px] top-[0] md:w-[170px] md:right-[-20px] md:top-[5%] z-0 md:opacity-[0.75] opacity-[0.48]"
          style={{ transform: "rotate(-8deg)" }}
        />

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl flex flex-col items-center"
          >
            <h2 className="font-serif text-[34px] md:text-[44px] lg:text-[46px] text-[#151312] mb-5 leading-[1.1]">
              Ideas for the Relationships <br className="block sm:hidden" /><span className="text-[#FF5A4F] italic">That Shape Your Life.</span>
            </h2>
            <p className="text-[#5C5550] text-[16px] md:text-[17px] leading-[1.6] mb-6 max-w-[620px] lg:max-w-[680px]">
              Thoughtful guidance on relationships, family, friendship, faith, and personal growth.
            </p>
            <Link 
              href="/articles" 
              className="inline-flex items-center text-[13px] md:text-[14px] font-sans font-semibold text-[#151312] hover:text-[#FF5A4F] transition-colors duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group relative pb-1"
            >
              <span className="relative z-10">View All Articles</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5A4F] scale-x-0 group-hover:scale-x-100 transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-[3px] transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </Link>
          </motion.div>
        </div>

        {/* Article Rows */}
        <div className="flex flex-col max-w-[920px] mx-auto relative z-10">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              className={`group cursor-pointer flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-12 lg:gap-16 ${
                index !== articles.length - 1 ? "border-b border-[#0B2A4A]/[0.08] pb-10 md:pb-12 mb-10 md:mb-12" : ""
              }`}
            >
              {/* Image Side (Approx 42% Desktop) */}
              <div className="w-full md:w-[42%] shrink-0">
                <div className="relative w-full aspect-[16/10] md:aspect-[4/3] rounded-[18px] md:rounded-[22px] overflow-hidden bg-[#F7F2EE] border-[2px] border-[#FF5A4F]/70 shadow-[0_12px_28px_rgba(11,42,74,0.09),0_3px_10px_rgba(11,42,74,0.05)] md:shadow-[0_18px_42px_rgba(11,42,74,0.10),0_5px_14px_rgba(11,42,74,0.06)] transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.015] md:group-hover:shadow-[0_22px_48px_rgba(11,42,74,0.13),0_6px_16px_rgba(11,42,74,0.07)] motion-reduce:transform-none motion-reduce:md:group-hover:scale-100">
                  <Image 
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </div>
              </div>

              {/* Content Side (Approx 58% Desktop) */}
              <div className="w-full md:w-[58%] flex flex-col justify-center py-2 md:py-4">
                <div className="flex items-center text-[10px] md:text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-[#FF5A4F] mb-3 md:mb-4">
                  {article.category}
                  <span className="mx-2.5 text-[#151312]/15">•</span>
                  <span className="text-[#5C5550] font-normal tracking-normal normal-case">{article.readTime}</span>
                </div>
                
                <h3 className="font-serif text-[26px] md:text-[30px] lg:text-[34px] leading-[1.15] text-[#0B2A4A] mb-3 md:mb-4 transition-colors duration-[400ms]">
                  {article.title}
                </h3>
                
                <p className="text-[#4D5358] text-[15px] md:text-[16px] leading-[1.6] mb-5 md:mb-6 line-clamp-3 md:line-clamp-2 max-w-[540px]">
                  {article.excerpt}
                </p>

                <div className="mt-auto">
                  <span className="inline-flex items-center text-[13px] font-sans font-semibold text-[#0B2A4A] group-hover:text-[#FF5A4F] transition-colors duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] relative pb-[2px]">
                    <span className="relative z-10">Read Article</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5A4F] scale-x-0 group-hover:scale-x-100 transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-left" />
                    <ArrowRight className="ml-2.5 w-3.5 h-3.5 transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[4px]" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
