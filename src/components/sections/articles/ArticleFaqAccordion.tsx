"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How can I communicate with my partner without arguing?",
    answer:
      "Choose a calm moment, focus on one issue, explain your feelings without attacking your partner, and ask a specific question or make a practical request. Listen to their response before defending your position. If the conversation becomes overwhelming, agree to pause and return to it.",
  },
  {
    question: "What if my partner gets defensive every time I try to talk?",
    answer:
      "Try being specific about the concern and allowing space for their perspective. However, you cannot control someone else's willingness to listen. If repeated respectful attempts are met with hostility, dismissal, or avoidance, the relationship may need more than a change in your communication style.",
  },
];

export function ArticleFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full border-t border-b border-[#0B2A4A]/12 my-6">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`py-5 sm:py-6 transition-colors ${
              index !== 0 ? "border-t border-[#0B2A4A]/10" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer"
            >
              <h3
                className={`font-serif text-[18px] sm:text-[20px] md:text-[21px] leading-[1.3] font-medium transition-colors ${
                  isOpen ? "text-[#FF5A4F]" : "text-[#0B2A4A] group-hover:text-[#FF5A4F]"
                }`}
              >
                {faq.question}
              </h3>
              <span
                className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors mt-0.5 ${
                  isOpen
                    ? "bg-[#FF5A4F]/10 text-[#FF5A4F]"
                    : "text-[#5B6470] group-hover:text-[#FF5A4F]"
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            {isOpen && (
              <div className="pt-3.5 pr-8 text-[#26313A] text-[16.5px] sm:text-[17.5px] leading-[1.72]">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
