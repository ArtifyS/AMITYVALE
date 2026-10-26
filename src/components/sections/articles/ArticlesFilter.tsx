"use client";

import React, { useState } from "react";

const categories = [
  "All Articles",
  "Relationships",
  "Family",
  "Faith & Spiritual Life",
  "Personal Growth",
  "Business"
];

export function ArticlesFilter() {
  const [activeCat, setActiveCat] = useState("All Articles");

  return (
    <section className="w-full bg-[#FCFBF8] border-b border-[#0B2A4A]/5 py-6 md:py-8 sticky top-[72px] lg:top-[76px] z-40">
      <div className="container mx-auto px-6 max-w-[1240px]">
        <div className="flex items-center overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex gap-2 md:gap-3 flex-nowrap">
            {categories.map((category) => {
              const isActive = activeCat === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCat(category)}
                  className={`whitespace-nowrap px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[12.5px] md:text-[13.5px] font-sans font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-[#FF5A4F] text-white shadow-[0_4px_16px_rgba(255,90,79,0.3)]"
                      : "bg-white text-[#4D5358] border border-[#0B2A4A]/10 hover:border-[#FF5A4F]/40 hover:text-[#FF5A4F] hover:bg-[#FF5A4F]/5 shadow-sm"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
