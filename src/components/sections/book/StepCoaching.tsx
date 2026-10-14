"use client";

import React, { useRef, useEffect } from "react";
import { BookingState } from "./BookPage";
import { Check, ArrowRight } from "lucide-react";

interface StepCoachingProps {
  state: BookingState;
  setState: (updates: Partial<BookingState>) => void;
  next: () => void;
}

export interface CoachingAreaOption {
  id: string;
  number: string;
  title: string;
  description: string;
  accentColor: string;
  badgeBg: string;
}

export const COACHING_AREAS: CoachingAreaOption[] = [
  {
    id: "romantic",
    number: "01",
    title: "Romantic Relationships",
    description: "Communication, connection, trust, and intimacy.",
    accentColor: "#FF5A4F", // Coral
    badgeBg: "rgba(255, 90, 79, 0.1)",
  },
  {
    id: "family",
    number: "02",
    title: "Family Relationships",
    description: "Parents, siblings, boundaries, and family dynamics.",
    accentColor: "#D8A23D", // Gold
    badgeBg: "rgba(216, 162, 61, 0.12)",
  },
  {
    id: "friendship",
    number: "03",
    title: "Friendship & Social Connection",
    description: "Trust, distance, conflict, and changing friendships.",
    accentColor: "#0E5A63", // Teal
    badgeBg: "rgba(14, 90, 99, 0.1)",
  },
  {
    id: "faith",
    number: "04",
    title: "Faith & Spiritual Life",
    description: "Faith, purpose, doubt, meaning, and spiritual connection.",
    accentColor: "#0B2A4A", // Navy + Gold
    badgeBg: "rgba(11, 42, 74, 0.08)",
  },
  {
    id: "personal",
    number: "05",
    title: "Personal Growth",
    description: "Patterns, confidence, boundaries, and life transitions.",
    accentColor: "#FF5A4F", // Coral + Teal
    badgeBg: "rgba(255, 90, 79, 0.08)",
  },
];

export function StepCoaching({ state, setState, next }: StepCoachingProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSelect = (id: string) => {
    setState({ coachingArea: id });

    // Cancel existing timer if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Auto-advance after 300ms visual confirmation
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      next();
    }, 300);
  };

  const handleManualContinue = () => {
    if (!state.coachingArea) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    next();
  };

  return (
    <div className="flex flex-col w-full">
      {/* Step Heading */}
      <div className="text-center mb-8 max-w-[620px] mx-auto">
        <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[36px] text-[#0B2A4A] tracking-[-0.01em] leading-tight mb-2">
          What Would You Like Support With?
        </h2>
        <p className="text-[14.5px] sm:text-[15.5px] text-[#0B2A4A]/70 leading-relaxed">
          Choose the area that feels closest to what you want to talk about.
        </p>
      </div>

      {/* Selectable Cards Layout: 3 on first row, 2 centered on second row (desktop) */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-10 w-full">
        {COACHING_AREAS.map((item) => {
          const isSelected = state.coachingArea === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleSelect(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(item.id);
                }
              }}
              tabIndex={0}
              role="radio"
              aria-checked={isSelected}
              className={`group relative flex flex-col justify-between p-6 rounded-[18px] bg-white cursor-pointer transition-all duration-200 select-none overflow-hidden outline-none w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] min-h-[175px] ${
                isSelected
                  ? "border-[2px] border-[#FF5A4F] shadow-[0_12px_32px_rgba(255,90,79,0.14)] -translate-y-[2px]"
                  : "border border-[#0B2A4A]/10 hover:border-[#0B2A4A]/25 hover:shadow-[0_8px_24px_rgba(11,42,74,0.06)] hover:-translate-y-[1px]"
              }`}
              style={{
                backgroundColor: isSelected ? "rgba(255, 90, 79, 0.04)" : "#FFFFFF",
              }}
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-[3.5px] transition-opacity duration-200"
                style={{
                  backgroundColor: isSelected ? "#FF5A4F" : item.accentColor,
                  opacity: isSelected ? 1 : 0.85,
                }}
              />

              {/* Header: Number Badge & Selection Check Circle */}
              <div className="flex items-center justify-between mb-3.5 pt-0.5">
                <span
                  className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: item.badgeBg,
                    color: item.accentColor,
                  }}
                >
                  {item.number}
                </span>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? "bg-[#FF5A4F] text-white shadow-sm ring-3 ring-[#FF5A4F]/20"
                      : "border-[1.5px] border-[#0B2A4A]/20 bg-white group-hover:border-[#0B2A4A]/40"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-2">
                <h3 className="font-serif text-[18px] sm:text-[19px] font-semibold text-[#0B2A4A] leading-snug mb-1.5">
                  {item.title}
                </h3>
                <p className="text-[13.5px] leading-[1.5] text-[#0B2A4A]/70">
                  {item.description}
                </p>
              </div>

              {/* Selection Indicator */}
              <div className="pt-3 mt-3 border-t border-[#0B2A4A]/[0.06] flex items-center justify-between text-[12px] font-medium">
                <span
                  className={`transition-colors duration-200 ${
                    isSelected ? "text-[#FF5A4F] font-semibold" : "text-[#0B2A4A]/50 group-hover:text-[#0B2A4A]"
                  }`}
                >
                  {isSelected ? "Selected" : "Select this area"}
                </span>
                <span className={isSelected ? "text-[#FF5A4F]" : "text-[#0B2A4A]/30 group-hover:text-[#0B2A4A]"}>
                  {isSelected ? "✓" : "→"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Navigation Controls */}
      <div className="flex items-center justify-end pt-2 border-t border-[#0B2A4A]/[0.06] max-w-[1140px] mx-auto w-full">
        <button
          type="button"
          onClick={handleManualContinue}
          disabled={!state.coachingArea}
          className={`group flex items-center justify-center gap-2 h-[48px] px-8 rounded-full text-[13.5px] font-semibold tracking-wide transition-all duration-200 ${
            state.coachingArea
              ? "bg-[#FF5A4F] text-white hover:bg-[#F0443A] shadow-[0_6px_20px_rgba(255,90,79,0.3)] hover:shadow-[0_8px_25px_rgba(255,90,79,0.4)] hover:-translate-y-0.5 cursor-pointer"
              : "bg-[#0B2A4A]/10 text-[#0B2A4A]/40 cursor-not-allowed"
          }`}
        >
          <span>Continue to Session</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
