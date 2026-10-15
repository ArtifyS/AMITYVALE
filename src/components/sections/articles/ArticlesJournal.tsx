"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ArrowDown, Check } from "lucide-react";
import {
  ARTICLES_DATA,
  CATEGORIES,
  Article,
  ArticleCategory,
} from "@/lib/articlesData";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_MORE_STEP = 3;

export function ArticlesJournal() {
  const [activeCategory, setActiveCategory] = useState<"All Articles" | ArticleCategory>("All Articles");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Featured article is pinned at top
  const featuredArticle = useMemo(() => {
    return ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];
  }, []);

  // Filtered articles list for grid (excluding the featured article to avoid immediate repetition)
  const filteredArticles = useMemo(() => {
    const list = ARTICLES_DATA.filter((a) => a.id !== featuredArticle.id);
    
    let result = list;
    if (activeCategory !== "All Articles") {
      result = list.filter((a) => a.category === activeCategory);
    }

    // Sort newest to oldest
    return [...result].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  }, [activeCategory, featuredArticle.id]);

  // Handle category switch
  const handleSelectCategory = (cat: "All Articles" | ArticleCategory) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    setIsDropdownOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <div className="w-full bg-[#FFFFFF] relative">
      
      {/* ==================================================
          1. COMPACT JOURNAL INTRO
          - Max width ~780px
          - Controlled vertical footprint (~150-190px)
          - Top padding 52-60px, bottom padding 36-40px
         ================================================== */}
      <section className="relative w-full pt-[52px] md:pt-[60px] pb-[34px] md:pb-[40px] px-4 sm:px-6">
        {/* Subtle decorative dot cluster */}
        <div
          className="hidden lg:block absolute top-8 right-16 w-[130px] h-[130px] opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #FF5A4F 1.5px, transparent 2px)`,
            backgroundSize: `14px 14px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, black 50%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, black 50%, transparent 100%)`,
          }}
          aria-hidden="true"
        />

        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-sans uppercase tracking-[0.2em] text-[#FF5A4F] text-[11px] md:text-[12px] font-bold mb-3 md:mb-3.5 block"
          >
            THE JOURNAL
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="font-serif text-[34px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.08] tracking-tight text-[#0B2A4A]"
          >
            Thoughts on Connection,{" "}
            <span className="text-[#FF5A4F] italic block sm:inline">Growth, and Love.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
            className="text-[#5B6470] text-[15px] md:text-[16px] leading-[1.5] mt-3 md:mt-3.5 max-w-[620px] mx-auto"
          >
            Thoughtful guidance on relationships, family, faith, and personal growth.
          </motion.p>
        </div>
      </section>

      {/* ==================================================
          2. FEATURED STORY
          - Sits side-by-side directly on page
          - Controlled height on desktop (~350-400px)
          - Wide editorial crop (1.55:1)
         ================================================== */}
      <section className="relative w-full px-4 sm:px-6 mb-12 md:mb-16">
        {/* Subtle decorative wash */}
        <DecorativeAccent
          src="/1.png"
          opacity={0.03}
          animateVariant="none"
          className="w-[450px] left-[-120px] top-[-60px] z-0 pointer-events-none"
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12 bg-[#FCFBF8] border border-[#0B2A4A]/[0.06] rounded-[24px] md:rounded-[28px] p-5 sm:p-6 md:p-8 lg:p-9 shadow-[0_12px_32px_rgba(11,42,74,0.04)]"
          >
            {/* Image (Approx 56% desktop width) */}
            <div className="w-full lg:w-[56%] shrink-0">
              <Link
                href={`/articles/${featuredArticle.slug}`}
                className="block relative w-full aspect-[16/10] h-[220px] sm:h-[290px] md:h-[340px] lg:h-[360px] rounded-[18px] md:rounded-[22px] overflow-hidden bg-[#F2EDE8]"
                aria-label={`Read featured article: ${featuredArticle.title}`}
              >
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  priority
                  className="object-cover object-[center_35%] transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  sizes="(max-width: 1024px) 100vw, 56vw"
                />
              </Link>
            </div>

            {/* Content (Approx 44% desktop width) */}
            <div className="w-full lg:w-[44%] flex flex-col justify-center py-2 lg:py-4">
              {/* Metadata */}
              <div className="flex items-center gap-2 mb-2.5 md:mb-3">
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-[#FF5A4F]">
                  FEATURED
                </span>
                <span className="text-[#0B2A4A]/25 text-[11px]">/</span>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.16em] text-[#5B6470]">
                  {featuredArticle.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] lg:text-[38px] xl:text-[40px] leading-[1.08] tracking-tight text-[#0B2A4A] group-hover:text-[#FF5A4F] transition-colors duration-300 mb-2.5 md:mb-3">
                <Link href={`/articles/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h2>

              {/* Reading time */}
              <p className="text-[12.5px] font-sans font-medium text-[#5B6470] mb-3">
                {featuredArticle.readTime}
              </p>

              {/* Excerpt */}
              <p className="text-[#26313A] text-[15px] md:text-[15.5px] leading-[1.6] mb-5 md:mb-6 line-clamp-3">
                {featuredArticle.excerpt}
              </p>

              {/* Action Link */}
              <div>
                <Link
                  href={`/articles/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 text-[14px] font-sans font-semibold text-[#0B2A4A] group-hover:text-[#FF5A4F] transition-colors duration-200"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ==================================================
          3. TOPIC NAVIGATION
          - Desktop: Minimal horizontal tab bar with indicator
          - Mobile: Compact dropdown selector "BROWSE [ All Articles ▾ ]"
          - Border-y separator
         ================================================== */}
      <nav
        aria-label="Article categories"
        className="w-full border-y border-[#0B2A4A]/8 bg-[#FCFBF8]/60 backdrop-blur-[2px] py-4 md:py-5 mb-10 md:mb-12 sticky top-[72px] lg:top-[76px] z-30"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* DESKTOP TABS (hidden on mobile, shown md+) */}
          <div className="hidden md:flex items-center justify-between gap-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-6 lg:gap-8 flex-nowrap" role="tablist">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectCategory(category)}
                    className={`relative py-1 text-[13px] lg:text-[13.5px] font-sans uppercase tracking-[0.12em] transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#0B2A4A] font-bold"
                        : "text-[#5B6470] font-medium hover:text-[#FF5A4F]"
                    }`}
                  >
                    <span>{category}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeTabUnderline"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#FF5A4F] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <span className="text-[12px] font-sans font-medium text-[#5B6470] tracking-wide shrink-0">
              {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {/* MOBILE SELECTOR (shown on mobile, hidden md+) */}
          <div className="md:hidden flex items-center justify-between gap-3 relative" ref={dropdownRef}>
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#5B6470] shrink-0">
              BROWSE
            </span>

            <div className="relative flex-1 max-w-[260px]">
              <button
                type="button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-full bg-white border border-[#0B2A4A]/15 text-[#0B2A4A] font-sans font-semibold text-[13px] shadow-sm hover:border-[#FF5A4F]/40 transition-colors"
              >
                <span className="truncate">{activeCategory}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#5B6470] transition-transform duration-200 shrink-0 ${
                    isDropdownOpen ? "rotate-180 text-[#FF5A4F]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    role="listbox"
                    className="absolute right-0 top-full mt-2 w-full min-w-[240px] bg-white rounded-[16px] shadow-[0_12px_30px_rgba(11,42,74,0.12)] border border-[#0B2A4A]/10 py-1.5 z-50 overflow-hidden"
                  >
                    {CATEGORIES.map((category) => {
                      const isSelected = activeCategory === category;
                      return (
                        <button
                          key={category}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectCategory(category)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-[13px] font-sans transition-colors ${
                            isSelected
                              ? "bg-[#FF5A4F]/10 text-[#FF5A4F] font-bold"
                              : "text-[#26313A] hover:bg-[#FCFBF8] hover:text-[#0B2A4A] font-medium"
                          }`}
                        >
                          <span>{category}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#FF5A4F] shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </nav>

      {/* ==================================================
          4. ARTICLES GRID & HEADING
          - 3-column desktop grid
          - 2-column tablet
          - 1-column mobile
          - Semantic article tiles with no outer card border
         ================================================== */}
      <section className="relative w-full px-4 sm:px-6 pb-20 md:pb-28">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Dynamic Grid Header */}
          <div className="flex items-baseline justify-between mb-8 md:mb-10">
            <h3 className="font-serif text-[24px] md:text-[28px] text-[#0B2A4A] tracking-tight">
              {activeCategory === "All Articles" ? "Latest Articles" : activeCategory}
              <span className="text-[#5B6470] text-[13px] font-sans font-normal ml-3">
                ({filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"})
              </span>
            </h3>

            {activeCategory !== "All Articles" && (
              <button
                onClick={() => handleSelectCategory("All Articles")}
                className="text-[12.5px] font-sans font-semibold text-[#FF5A4F] hover:underline cursor-pointer"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Grid content with smooth category transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {filteredArticles.length === 0 ? (
                /* Empty state */
                <div className="text-center py-16 md:py-20 max-w-[420px] mx-auto">
                  <h4 className="font-serif text-[24px] text-[#0B2A4A] mb-2">No articles here yet.</h4>
                  <p className="text-[#5B6470] text-[15px] leading-[1.6] mb-6">
                    New reflections are being added over time.
                  </p>
                  <button
                    onClick={() => handleSelectCategory("All Articles")}
                    className="px-6 py-2.5 rounded-full border border-[#FF5A4F] text-[#FF5A4F] font-sans font-semibold text-[13px] hover:bg-[#FF5A4F] hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    View All Articles
                  </button>
                </div>
              ) : (
                /* 3-Column Editorial Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-12 lg:gap-y-16">
                  {displayedArticles.map((article) => (
                    <article
                      key={article.id}
                      className="group flex flex-col cursor-pointer"
                    >
                      {/* Image */}
                      <Link
                        href={`/articles/${article.slug}`}
                        className="relative w-full aspect-[16/10] rounded-[18px] overflow-hidden mb-4 md:mb-5 bg-[#F7F4EE] block"
                        aria-label={`Read article: ${article.title}`}
                      >
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-400 ease-out group-hover:scale-[1.025]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </Link>

                      {/* Metadata */}
                      <div className="flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-[#FF5A4F] mb-2.5">
                        <span>{article.category}</span>
                        <span className="text-[#0B2A4A]/20">•</span>
                        <span className="text-[#5B6470] font-normal tracking-normal normal-case text-[12px]">
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-serif text-[22px] md:text-[24px] lg:text-[25px] leading-[1.14] text-[#0B2A4A] tracking-tight mb-2.5 line-clamp-2 group-hover:text-[#FF5A4F] transition-colors duration-300">
                        <Link href={`/articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>

                      {/* Excerpt */}
                      <p className="text-[#26313A] text-[14.5px] md:text-[15px] leading-[1.6] mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      {/* Text Link */}
                      <div className="mt-auto pt-1">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="inline-flex items-center gap-1.5 text-[13.5px] font-sans font-semibold text-[#0B2A4A] group-hover:text-[#FF5A4F] transition-colors duration-200"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ==================================================
              5. LOAD MORE BUTTON
              - Restrained bordered button
              - Height 48-52px
              - Hidden when all articles loaded
             ================================================== */}
          {hasMore && (
            <div className="mt-14 md:mt-16 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="h-[50px] px-8 rounded-full border border-[#0B2A4A]/20 text-[#0B2A4A] font-sans font-semibold text-[13.5px] tracking-wide hover:border-[#FF5A4F] hover:text-[#FF5A4F] hover:bg-[#FF5A4F]/5 transition-all duration-300 inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/40 cursor-pointer"
              >
                <span>Load More Articles</span>
                <ArrowDown className="w-4 h-4 text-[#FF5A4F]" />
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
