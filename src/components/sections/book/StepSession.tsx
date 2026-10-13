import React from "react";
import { BookingState } from "./BookPage";
import { sessionOptions, SessionDuration } from "@/lib/pricingConfig";

export function StepSession({ state, setState, next }: { state: BookingState, setState: (updates: Partial<BookingState>) => void, next: () => void }) {
  const options = Object.values(sessionOptions);

  return (
    <div className="flex flex-col">
      <h2 className="font-serif text-[28px] md:text-[32px] text-[#161514] mb-2">
        How Much Time Feels Right?
      </h2>
      <p className="text-[15px] text-[#161514]/70 mb-8 max-w-[500px]">
        Choose the amount of space you want for the conversation. You can change your selection before confirming.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10">
        {options.map((opt) => {
          const isSelected = state.duration === opt.duration;
          return (
            <label
              key={opt.duration}
              className={`relative flex flex-col p-6 rounded-[12px] border-[1px] cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? "border-[#FF5A4F] bg-[#FF5A4F]/[0.03] shadow-[0_4px_12px_rgba(233,130,103,0.08)]" 
                  : "border-[#161514]/10 bg-white hover:border-[#161514]/30"
              }`}
            >
              <input 
                type="radio" 
                name="sessionDuration"
                value={opt.duration}
                checked={isSelected}
                onChange={() => setState({ duration: opt.duration as SessionDuration })}
                className="absolute opacity-0 w-0 h-0"
              />
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#161514]/60">
                  {opt.label}
                </span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full border-[4px] border-[#FF5A4F] bg-white shadow-sm" />
                )}
                {!isSelected && (
                  <div className="w-4 h-4 rounded-full border-[1px] border-[#161514]/20" />
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[32px] leading-none text-[#161514]">{opt.duration}</span>
                <span className="font-sans text-[12px] uppercase tracking-widest text-[#161514]/50">Min</span>
              </div>
              <div className="font-sans text-[18px] text-[#161514] mb-3">${opt.price}</div>
              <p className="text-[13px] leading-[1.5] text-[#161514]/70">
                {opt.description}
              </p>
            </label>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={next}
          disabled={!state.duration}
          className={`flex items-center justify-center h-[50px] px-8 rounded-[3px] text-[13px] font-medium tracking-wide uppercase transition-colors ${
            state.duration 
              ? "bg-[#161514] text-white hover:bg-[#161514]/90" 
              : "bg-[#161514]/10 text-[#161514]/40 cursor-not-allowed"
          }`}
        >
          Continue to Time &rarr;
        </button>
      </div>
    </div>
  );
}
