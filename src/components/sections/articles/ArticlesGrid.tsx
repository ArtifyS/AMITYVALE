"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    id: 2,
    category: "BUSINESS",
    title: "How to Set Boundaries with Colleagues Without Feeling Compromised",
    excerpt: "How to safeguard professionalism while navigating the corporate terrain.",
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

export function ArticlesGrid() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.15, ease: "easeOut" }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden mb-6 border-[2px] border-transparent group-hover:border-[#FF5A4F]/20 transition-all duration-500 shadow-sm group-hover:shadow-[0_16px_40px_rgba(11,42,74,0.08)] bg-[#FDFCF9]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center text-[10px] md:text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-[#FF5A4F] mb-3">
                  {article.category}
                  <span className="mx-2.5 text-[#151312]/15">•</span>
                  <span className="text-[#6E747A] font-normal tracking-normal normal-case">{article.readTime}</span>
                </div>
                
                <h3 className="font-serif text-[24px] md:text-[28px] leading-[1.2] text-[#0B2A4A] mb-3 group-hover:text-[#FF5A4F] transition-colors duration-300">
                  {article.title}
                </h3>
                
                <p className="text-[#5C5550] text-[15px] leading-[1.6] mb-5 line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="mt-auto pt-2">
                  <Link 
                    href="#" 
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center text-[13px] font-sans font-semibold text-[#0B2A4A] group-hover:text-[#FF5A4F] transition-colors duration-300"
                  >
                    Read Article
                    <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination or Load More */}
        <div className="mt-20 flex justify-center">
          <button className="h-[50px] px-8 rounded-full border-[1.5px] border-[#0B2A4A]/10 text-[#0B2A4A] font-sans font-bold text-[13.5px] tracking-wide hover:bg-[#0B2A4A]/5 hover:border-[#0B2A4A]/20 transition-all duration-300">
            Load More Articles
          </button>
        </div>

      </div>
    </section>
  );
}
