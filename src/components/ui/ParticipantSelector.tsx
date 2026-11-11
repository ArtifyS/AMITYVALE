"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface ParticipantSelectorProps {
  value: number;
  onChange: (count: number) => void;
  className?: string;
  showHeading?: boolean;
}

export function ParticipantSelector({
  value,
  onChange,
  className = "",
  showHeading = true,
}: ParticipantSelectorProps) {
  const count = Math.max(1, value || 1);

  const handleDecrease = () => {
    if (count > 1) {
      onChange(count - 1);
    }
  };

  const handleIncrease = () => {
    onChange(count + 1);
  };

  const participantLabel = count === 1 ? "1 Participant" : `${count} Participants`;

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {showHeading && (
        <div className="mb-4">
          <h3 className="font-serif text-[20px] sm:text-[22px] md:text-[24px] text-[#0B2A4A] tracking-[-0.01em] mb-1.5 font-normal">
            How Many People Will Attend?
          </h3>
          <p className="text-[13.5px] sm:text-[14px] text-[#5C5550] max-w-[480px] mx-auto leading-relaxed">
            One participant is included in the session rate. Each additional participant adds $25.
          </p>
        </div>
      )}

      {/* Refined Coaching Quantity Control */}
      <div 
        role="group"
        aria-label="Select number of participants"
        className="inline-flex items-center justify-between h-[50px] bg-white border border-[#0B2A4A]/12 rounded-full p-1.5 shadow-[0_4px_16px_rgba(11,42,74,0.04)] hover:border-[#FF5A4F]/30 transition-all duration-200 select-none min-w-[260px] sm:min-w-[280px]"
      >
        <button
          type="button"
          onClick={handleDecrease}
          disabled={count <= 1}
          aria-label="Decrease participant count"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent text-[#0B2A4A] hover:bg-[#FF5A4F]/10 hover:text-[#FF5A4F] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]"
        >
          <Minus className="w-4 h-4 stroke-[2.2]" />
        </button>

        <span 
          aria-live="polite"
          className="font-sans text-[14.5px] sm:text-[15px] font-semibold text-[#0B2A4A] px-4 tracking-wide"
        >
          {participantLabel}
        </span>

        <button
          type="button"
          onClick={handleIncrease}
          aria-label="Increase participant count"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer text-[#0B2A4A] hover:bg-[#FF5A4F]/10 hover:text-[#FF5A4F] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]"
        >
          <Plus className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
}

