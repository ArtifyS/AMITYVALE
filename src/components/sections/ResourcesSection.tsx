"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

// Structured cleanly for future CMS integration
const featuredArticle = {
  id: 1,
  category: "Communication",
  title: "How to Have Difficult Conversations Without Escalating",
  excerpt: "Learn practical techniques to keep emotionally charged conversations productive and respectful, even when you disagree.",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=2070&auto=format&fit=crop"
};

const secondaryArticles = [
  {
    id: 2,
    category: "Connection",
    title: "Why Emotional Distance Develops in Relationships",
    excerpt: "Understand the subtle shifts that cause partners to drift apart over time and how to gently close the gap.",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1498679469502-14eb0280eb4c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    category: "Intimacy",
    title: "Rebuilding Intimacy After Disconnection",
    excerpt: "A thoughtful approach to exploring emotional and physical closeness after a period of distance.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1516584284149-166258d4a9ec?q=80&w=2070&auto=format&fit=crop"
  }
];

export function ResourcesSection() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1260px] relative">
        
        {/* Subtle Editorial Dot Cluster */}
        <div 
          className="hidden md:block absolute top-0 right-0 w-[160px] h-[160px] opacity-[0.08] pointer-events-none translate-x-[20px] -translate-y-[20px]"
          style={{
            backgroundImage: `radial-gradient(circle, #E98267 2px, transparent 2.5px)`,
            backgroundSize: `16px 16px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, rgba(0,0,0,0.7) 70%, transparent 100%)`,
          }}
        />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16 gap-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <h2 className="font-serif text-[34px] md:text-[46px] text-[#151312] mb-4 leading-[1.05]">
              Relationship & Intimacy Resources
            </h2>
            <p className="text-[#5C5550] text-[16px] md:text-[17px] leading-[1.6]">
              Explore our latest guides, insights, and practical advice to help you build a stronger foundation.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <Link 
              href="#" 
              className="inline-flex items-center text-[13px] md:text-[14px] font-sans font-bold text-[#151312] hover:text-[#E98267] transition-colors group"
            >
              View all articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Magazine Editorial Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 relative z-10">
          
          {/* LEFT: Featured Article (approx 58%) */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full lg:w-[57%] group cursor-pointer flex flex-col"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[24px] overflow-hidden mb-6 md:mb-8 transition-transform duration-[600ms] ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
              <Image 
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill 
                className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-[#FDFBF7]/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-[0_4px_12px_rgb(0,0,0,0.06)] z-10 transition-transform duration-[600ms] ease-out group-hover:-translate-y-1">
                <span className="text-[#E98267] text-[9.5px] sm:text-[10.5px] font-sans font-bold uppercase tracking-widest">
                  {featuredArticle.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-grow pr-2">
              <div className="flex items-center text-[#5C5550] text-[12px] font-sans font-medium mb-4 pl-1">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                {featuredArticle.readTime}
              </div>
              
              <h3 className="font-serif text-[28px] md:text-[36px] lg:text-[40px] leading-[1.1] text-[#151312] mb-4 group-hover:text-[#E98267] transition-colors duration-300">
                {featuredArticle.title}
              </h3>
              
              <p className="text-[#5C5550] text-[15.5px] md:text-[16.5px] leading-[1.65] mb-6 md:mb-8 max-w-lg">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-auto">
                <span className="inline-flex items-center text-[13px] font-sans font-bold text-[#151312] group-hover:text-[#E98267] transition-colors">
                  Read Article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          </motion.article>

          {/* RIGHT: Secondary Articles (approx 43%) */}
          <div className="w-full lg:w-[43%] flex flex-col gap-10 md:gap-8 lg:gap-10 mt-2 lg:mt-0">
            {secondaryArticles.map((article, idx) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.2 + (idx * 0.15), ease: "easeOut" }}
                className="group cursor-pointer flex flex-col sm:flex-row lg:flex-row gap-5 md:gap-6 h-auto sm:h-[180px] md:h-[200px] lg:h-[220px]"
              >
                {/* Image Left (Top on small mobile) */}
                <div className="w-full sm:w-[42%] h-[240px] sm:h-full rounded-[20px] overflow-hidden relative shrink-0 transition-transform duration-[600ms] ease-out group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    fill 
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.035]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 42vw, 20vw"
                  />
                </div>

                {/* Content Right (Bottom on small mobile) */}
                <div className="w-full sm:w-[58%] flex flex-col justify-center py-1 sm:py-0 pr-2">
                  <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
                    <span className="text-[#E98267] text-[10px] font-sans font-bold uppercase tracking-widest">
                      {article.category}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-[#151312]/10" />
                    <div className="flex items-center text-[#5C5550] text-[11px] font-sans font-medium">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-[22px] md:text-[24px] lg:text-[25px] leading-[1.15] text-[#151312] mb-3 group-hover:text-[#E98267] transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="text-[#5C5550] text-[14.5px] leading-[1.6] mb-5 line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="mt-auto">
                    <span className="inline-flex items-center text-[12px] font-sans font-bold text-[#151312] group-hover:text-[#E98267] transition-colors">
                      Read Article
                      <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
