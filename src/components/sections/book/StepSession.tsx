"use client";

import React, { useRef, useEffect } from "react";
import { BookingState } from "./BookPage";
import { SessionDuration } from "@/lib/pricingConfig";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

interface StepSessionProps {
  state: BookingState;
  setState: (updates: Partial<BookingState>) => void;
  next: () => void;
  back: () => void;
}

interface SessionCardConfig {
  duration: SessionDuration;
  label: string;
  price: number;
  description: string;
  accentColor: string;
  accentBg: string;
  badgeBorder: string;
}

const SESSION_CARDS: SessionCardConfig[] = [
  {
    duration: 15,
    label: "15 MIN",
    price: 100,
    description: "A focused conversation or check-in.",
    accentColor: "#FF5A4F",
    accentBg: "rgba(255, 90, 79, 0.08)",
    badgeBorder: "rgba(255, 90, 79, 0.25)",
  },
  {
    duration: 30,
    label: "30 MIN",
    price: 190,
    description: "More room to explore one key concern.",
    accentColor: "#D8A23D",
    accentBg: "rgba(216, 162, 61, 0.12)",
    badgeBorder: "rgba(216, 162, 61, 0.3)",
  },
  {
    duration: 45,
    label: "45 MIN",
    price: 270,
    description: "Space for a deeper conversation.",
    accentColor: "#0E5A63",
    accentBg: "rgba(14, 90, 99, 0.1)",
    badgeBorder: "rgba(14, 90, 99, 0.25)",
  },
  {
    duration: 60,
    label: "60 MIN",
    price: 300,
    description: "The most room for layered concerns.",
    accentColor: "#0B2A4A",
    accentBg: "rgba(11, 42, 74, 0.08)",
    badgeBorder: "rgba(11, 42, 74, 0.25)",
  },
];

export function StepSession({ state, setState, next, back }: StepSessionProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSelect = (duration: SessionDuration) => {
    setState({ duration });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      next();
    }, 300);
  };

  const handleManualContinue = () => {
    if (!state.duration) return;
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
          Choose Your Session
        </h2>
        <p className="text-[14.5px] sm:text-[15.5px] text-[#0B2A4A]/70 leading-relaxed">
          Select the amount of time that feels right.
        </p>
      </div>

      {/* 4 Cards Across on Large Desktop, 2x2 on Medium, 1 Col on Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10 w-full max-w-[1140px] mx-auto">
        {SESSION_CARDS.map((card) => {
          const isSelected = state.duration === card.duration;

          return (
            <div
              key={card.duration}
              onClick={() => handleSelect(card.duration)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(card.duration);
                }
              }}
              tabIndex={0}
              role="radio"
              aria-checked={isSelected}
              className={`group relative flex flex-col justify-between p-6 rounded-[18px] bg-white cursor-pointer transition-all duration-200 select-none overflow-hidden outline-none min-h-[220px] ${
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
                  backgroundColor: isSelected ? "#FF5A4F" : card.accentColor,
                  opacity: isSelected ? 1 : 0.85,
                }}
              />

              {/* Card Header: Duration Pill & Selection Indicator */}
              <div className="flex items-center justify-between mb-4 pt-0.5">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors"
                  style={{
                    backgroundColor: isSelected ? "rgba(255,90,79,0.12)" : card.accentBg,
                    color: isSelected ? "#FF5A4F" : card.accentColor,
                    border: `1px solid ${isSelected ? "rgba(255,90,79,0.25)" : card.badgeBorder}`,
                  }}
                >
                  {card.label}
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

              {/* Price & Duration Details */}
              <div className="mb-4">
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="font-serif text-[34px] font-semibold leading-none text-[#0B2A4A]">
                    ${card.price}
                  </span>
                  <span className="text-[11.5px] font-medium uppercase tracking-[0.12em] text-[#0B2A4A]/50">
                    USD
                  </span>
                </div>
                <p className="text-[13.5px] leading-[1.5] text-[#0B2A4A]/75">
                  {card.description}
                </p>
              </div>

              {/* Bottom Card Action Indicator */}
              <div className="pt-3 border-t border-[#0B2A4A]/[0.06] flex items-center justify-between text-[12px] font-medium">
                <span
                  className={`transition-colors duration-200 ${
                    isSelected
                      ? "text-[#FF5A4F] font-semibold"
                      : "text-[#0B2A4A]/50 group-hover:text-[#0B2A4A]"
                  }`}
                >
                  {isSelected ? "Selected" : "Select this session"}
                </span>
                <span
                  className={`transition-transform duration-200 ${
                    isSelected ? "text-[#FF5A4F]" : "text-[#0B2A4A]/30 group-hover:translate-x-1 group-hover:text-[#0B2A4A]"
                  }`}
                >
                  {isSelected ? "✓" : "→"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Navigation Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-[#0B2A4A]/[0.06] max-w-[1140px] mx-auto w-full">
        <button
          type="button"
          onClick={back}
          className="group flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#0B2A4A]/60 hover:text-[#0B2A4A] transition-colors py-2 px-3 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Coaching</span>
        </button>

        <button
          type="button"
          onClick={handleManualContinue}
          disabled={!state.duration}
          className={`group flex items-center justify-center gap-2 h-[48px] px-8 rounded-full text-[13.5px] font-semibold tracking-wide transition-all duration-200 ${
            state.duration
              ? "bg-[#FF5A4F] text-white hover:bg-[#F0443A] shadow-[0_6px_20px_rgba(255,90,79,0.3)] hover:shadow-[0_8px_25px_rgba(255,90,79,0.4)] hover:-translate-y-0.5 cursor-pointer"
              : "bg-[#0B2A4A]/10 text-[#0B2A4A]/40 cursor-not-allowed"
          }`}
        >
          <span>Continue to Time</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
