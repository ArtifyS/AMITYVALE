"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
}

export const COMMUNICATE_BETTER_TOC: TocItem[] = [
  { id: "why-conversations-turn-into-arguments", label: "Why Conversations Escalate" },
  { id: "choose-the-right-moment", label: "Choose the Right Moment" },
  { id: "express-without-attacking", label: "Express Without Attacking" },
  { id: "listen-for-understanding", label: "Listen Differently" },
  { id: "stay-with-one-conversation", label: "Stay With One Issue" },
  { id: "know-when-to-pause", label: "Know When to Pause" },
  { id: "ask-for-a-specific-change", label: "Ask for a Specific Change" },
  { id: "real-life-example", label: "Real-Life Example" },
  { id: "repair-an-argument", label: "Repair the Conversation" },
  { id: "when-communication-is-not-enough", label: "When Communication Isn't Enough" },
  { id: "small-practice", label: "A Small Practice" },
  { id: "faq", label: "FAQ" },
  { id: "deeper-understanding", label: "Deeper Understanding" },
];

interface Props {
  items: TocItem[];
}

export function DesktopTableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entries
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Choose the one highest up or closest to top
          const topEntry = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-90px 0px -60% 0px",
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside
      className="hidden xl:block w-[190px] 2xl:w-[210px] shrink-0 sticky top-[108px] self-start max-h-[calc(100vh-140px)] overflow-y-auto pr-4 scrollbar-none"
      aria-label="Table of contents"
    >
      <div className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-[#5B6470] mb-3">
        IN THIS ARTICLE
      </div>

      <nav>
        <ul className="space-y-1.5 border-l border-[#0B2A4A]/10 text-[12.5px] font-sans">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block py-1 pl-3.5 -ml-[1px] border-l-2 transition-all duration-200 leading-[1.35] ${
                    isActive
                      ? "border-[#FF5A4F] text-[#FF5A4F] font-semibold"
                      : "border-transparent text-[#5B6470] hover:text-[#0B2A4A] hover:border-[#0B2A4A]/30 font-normal"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export function MobileTableOfContents({ items }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="xl:hidden w-full mb-10 border border-[#0B2A4A]/10 rounded-[16px] bg-[#FCFBF8] overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left text-[14px] font-sans font-semibold text-[#0B2A4A] hover:text-[#FF5A4F] transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <span>In this article</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#5B6470] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#FF5A4F]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <nav className="px-5 pb-4 pt-1 border-t border-[#0B2A4A]/5">
          <ul className="space-y-2 text-[13.5px] font-sans">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 text-[#5B6470] hover:text-[#FF5A4F] transition-colors leading-[1.4]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
