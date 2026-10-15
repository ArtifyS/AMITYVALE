"use client";

import React, { useEffect, useState } from "react";

export function ArticleReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const handleScroll = () => {
      const articleEl = document.getElementById("article-main-content");
      if (!articleEl) return;

      const rect = articleEl.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = rect.height;
      const windowHeight = window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll < articleTop) {
        setProgress(0);
      } else {
        const totalScrollable = articleHeight - windowHeight * 0.4;
        const scrolled = currentScroll - articleTop;
        const currentProgress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
        setProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-[var(--navbar-height,72px)] lg:top-[var(--navbar-height,76px)] left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#FF5A4F] origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
