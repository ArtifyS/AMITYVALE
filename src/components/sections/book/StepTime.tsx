"use client";

import React, { useState, useRef, useEffect } from "react";
import { BookingState } from "./BookPage";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, Clock, Globe } from "lucide-react";

interface StepTimeProps {
  state: BookingState;
  setState: (updates: Partial<BookingState>) => void;
  next: () => void;
  back: () => void;
}

const AVAILABLE_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET) — New York" },
  { value: "America/Chicago", label: "Central Time (CT) — Chicago" },
  { value: "America/Denver", label: "Mountain Time (MT) — Denver" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT) — Los Angeles" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT) — London" },
  { value: "Europe/Paris", label: "Central European (CET) — Paris" },
  { value: "Asia/Dubai", label: "Gulf Standard Time (GST) — Dubai" },
];

export function StepTime({ state, setState, next, back }: StepTimeProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const [viewDate, setViewDate] = useState(() => {
    return state.date ? new Date(state.date) : new Date();
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = new Date(year, month, 1).getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prev >= thisMonthStart) {
      setViewDate(prev);
    }
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const isPrevDisabled = year === today.getFullYear() && month === today.getMonth();

  // Date selection alone does NOT auto-advance
  const handleDaySelect = (day: number) => {
    const selected = new Date(year, month, day);
    if (selected < today) return;
    setState({ date: selected, timeSlot: null });
  };

  // Time slot selection completes the step and auto-advances after 300ms
  const handleSlotSelect = (slot: string) => {
    setState({ timeSlot: slot });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Only auto-advance if date is already selected
    if (state.date) {
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        next();
      }, 300);
    }
  };

  const handleManualContinue = () => {
    if (!state.date || !state.timeSlot) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    next();
  };

  const isComplete = Boolean(state.date && state.timeSlot);

  return (
    <div className="flex flex-col w-full">
      {/* Step Heading */}
      <div className="text-center mb-8 max-w-[620px] mx-auto">
        <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[36px] text-[#0B2A4A] tracking-[-0.01em] leading-tight mb-2">
          Choose a Time
        </h2>
        <p className="text-[14.5px] sm:text-[15.5px] text-[#0B2A4A]/70 leading-relaxed">
          Select an available date and time.
        </p>
      </div>

      {/* Main Calendar + Slot Picker Card */}
      <div className="bg-white rounded-[22px] border border-[#0B2A4A]/10 p-6 sm:p-8 shadow-[0_12px_36px_rgba(11,42,74,0.04)] mb-8 max-w-[980px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Column: Calendar (~55%) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#0B2A4A]/[0.08]">
              <span className="font-serif text-[18px] sm:text-[19px] font-semibold text-[#0B2A4A]">
                {viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevMonth}
                  disabled={isPrevDisabled}
                  aria-label="Previous month"
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    isPrevDisabled
                      ? "border-transparent text-[#0B2A4A]/20 cursor-not-allowed"
                      : "border-[#0B2A4A]/12 text-[#0B2A4A] hover:border-[#FF5A4F] hover:text-[#FF5A4F] hover:bg-[#FF5A4F]/5 cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-[#0B2A4A]/12 text-[#0B2A4A] hover:border-[#FF5A4F] hover:text-[#FF5A4F] hover:bg-[#FF5A4F]/5 cursor-pointer transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {DAYS_OF_WEEK.map((d) => (
                <div
                  key={d}
                  className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#0B2A4A]/45 py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`blank-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateObj = new Date(year, month, day);
                const isPast = dateObj < today;
                const isSelected =
                  state.date !== null &&
                  state.date.getDate() === day &&
                  state.date.getMonth() === month &&
                  state.date.getFullYear() === year;

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleDaySelect(day)}
                    className={`aspect-square rounded-[12px] flex flex-col items-center justify-center text-[13.5px] font-medium transition-all duration-200 select-none ${
                      isSelected
                        ? "bg-[#FF5A4F] text-white shadow-[0_4px_14px_rgba(255,90,79,0.35)] scale-[1.03] font-semibold"
                        : isPast
                        ? "text-[#0B2A4A]/20 cursor-not-allowed"
                        : "text-[#0B2A4A] hover:bg-[#FF5A4F]/10 hover:text-[#FF5A4F] cursor-pointer"
                    }`}
                  >
                    <span>{day}</span>
                    {isSelected && (
                      <span className="w-1 h-1 rounded-full bg-white mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Time Slots & Timezone (~45%) */}
          <div className="lg:col-span-5 flex flex-col lg:border-l lg:border-[#0B2A4A]/[0.08] lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-[#0B2A4A]/[0.08]">
            {/* Timezone Selector */}
            <div className="mb-5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0B2A4A]/60 mb-2">
                <Globe className="w-3.5 h-3.5 text-[#0E5A63]" />
                <span>Timezone</span>
              </label>
              <div className="relative">
                <select
                  value={state.timezone}
                  onChange={(e) => setState({ timezone: e.target.value })}
                  className="w-full bg-[#FCFAF8] border border-[#0B2A4A]/15 text-[13px] text-[#0B2A4A] rounded-[10px] px-3.5 py-2.5 focus:outline-none focus:border-[#FF5A4F] transition-colors cursor-pointer"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slots Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0B2A4A]/60">
                  <Clock className="w-3.5 h-3.5 text-[#D8A23D]" />
                  <span>Available Times</span>
                </span>
                {state.date && (
                  <span className="text-[12px] font-medium text-[#0E5A63]">
                    {state.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                )}
              </div>

              {!state.date ? (
                <div className="flex-1 min-h-[170px] rounded-[14px] bg-[#FCFAF8] border border-dashed border-[#0B2A4A]/15 flex flex-col items-center justify-center p-6 text-center text-[13.5px] text-[#0B2A4A]/50">
                  <Clock className="w-5 h-5 text-[#0B2A4A]/25 mb-2" />
                  <span>Select a date on the calendar first to view available start times.</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  {AVAILABLE_SLOTS.map((slot) => {
                    const isSelected = state.timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSlotSelect(slot)}
                        className={`h-[46px] rounded-[12px] border text-[13px] font-medium flex items-center justify-center transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-[#FF5A4F] text-white border-[#FF5A4F] shadow-[0_4px_14px_rgba(255,90,79,0.3)] font-semibold"
                            : "bg-white text-[#0B2A4A] border-[#0B2A4A]/15 hover:border-[#FF5A4F]/60 hover:bg-[#FF5A4F]/5"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Step Navigation Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-[#0B2A4A]/[0.06] max-w-[980px] mx-auto w-full">
        <button
          type="button"
          onClick={back}
          className="group flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#0B2A4A]/60 hover:text-[#0B2A4A] transition-colors py-2 px-3 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Session</span>
        </button>

        <button
          type="button"
          onClick={handleManualContinue}
          disabled={!isComplete}
          className={`group flex items-center justify-center gap-2 h-[48px] px-8 rounded-full text-[13.5px] font-semibold tracking-wide transition-all duration-200 ${
            isComplete
              ? "bg-[#FF5A4F] text-white hover:bg-[#F0443A] shadow-[0_6px_20px_rgba(255,90,79,0.3)] hover:shadow-[0_8px_25px_rgba(255,90,79,0.4)] hover:-translate-y-0.5 cursor-pointer"
              : "bg-[#0B2A4A]/10 text-[#0B2A4A]/40 cursor-not-allowed"
          }`}
        >
          <span>Continue to Details</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
