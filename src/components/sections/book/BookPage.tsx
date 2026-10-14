"use client";

import React, { useState, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SessionDuration, getSessionOption } from "@/lib/pricingConfig";
import { Check } from "lucide-react";

// Step Components
import { StepCoaching } from "./StepCoaching";
import { StepSession } from "./StepSession";
import { StepTime } from "./StepTime";
import { StepDetails } from "./StepDetails";
import { StepReview } from "./StepReview";

export type BookingState = {
  step: number;
  coachingArea: string | null;
  duration: SessionDuration | null;
  date: Date | null;
  timeSlot: string | null;
  timezone: string;
  sessionFor: "individual" | "joint";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  otherParticipantName: string;
  contextNote: string;
};

const STEP_LABELS = ["Coaching", "Session", "Time", "Details", "Review"];

// Smooth transition easing curve
const STEP_TRANSITION = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

function BookPageContent() {
  const searchParams = useSearchParams();

  const initialDuration = (() => {
    const durationParam = searchParams.get("duration");
    if (durationParam) {
      const dur = parseInt(durationParam, 10);
      if (getSessionOption(dur)) return dur as SessionDuration;
    }
    return null;
  })();

  const [state, setState] = useState<BookingState>({
    step: 1,
    coachingArea: null,
    duration: initialDuration,
    date: null,
    timeSlot: null,
    timezone: "America/New_York",
    sessionFor: "individual",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    otherParticipantName: "",
    contextNote: "",
  });

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        setState((prev) => ({ ...prev, timezone: tz }));
      }
    } catch {
      // fallback
    }
  }, []);

  const setBookingState = (updates: Partial<BookingState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setState((prev) => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  const gotoStep = (step: number) => setState((prev) => ({ ...prev, step }));

  return (
    <div className="relative w-full bg-white min-h-[92dvh]">
      
      {/* Subtle Dot Pattern Accent in Far Top Corners */}
      <div
        className="absolute top-0 right-0 w-[240px] h-[180px] pointer-events-none select-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #FF5A4F 0.85px, transparent 1.1px), radial-gradient(circle, #D8A23D 0.75px, transparent 1.0px)`,
          backgroundSize: "9px 9px, 9px 9px",
          backgroundPosition: "0 0, 4.5px 4.5px",
          maskImage: "radial-gradient(ellipse at top right, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at top right, black 25%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-[200px] h-[150px] pointer-events-none select-none opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle, #0B2A4A 0.85px, transparent 1.1px)`,
          backgroundSize: "9px 9px",
          maskImage: "radial-gradient(ellipse at top left, black 25%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top left, black 25%, transparent 70%)",
        }}
      />

      <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 pt-7 md:pt-9 pb-16 lg:pb-20 relative z-10">
        
        {/* ============================================================== */}
        {/* COMPACT CENTERED INTRO (~110-140px vertical height)           */}
        {/* ============================================================== */}
        <header className="text-center mb-6 md:mb-7 max-w-[660px] mx-auto">
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-[#FF5A4F] mb-1.5">
            PRIVATE BOOKING
          </span>
          <h1 className="font-serif text-[30px] sm:text-[36px] md:text-[40px] leading-[1.12] tracking-[-0.01em] text-[#0B2A4A] mb-2">
            Book the Time <span className="italic font-normal text-[#FF5A4F]">That Feels Right.</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] leading-[1.5] text-[#0B2A4A]/70">
            Choose what you need, select your time, and complete your booking.
          </p>
        </header>

        {/* Compact Progress Navigation Rail */}
        <nav
          aria-label="Booking Progress"
          className="flex items-center justify-between max-w-[840px] mx-auto mb-8 md:mb-10 pb-4 border-b border-[#0B2A4A]/[0.08]"
        >
          {[1, 2, 3, 4, 5].map((num) => {
            const isCurrent = state.step === num;
            const isCompleted = state.step > num;

            return (
              <React.Fragment key={num}>
                <button
                  type="button"
                  disabled={!isCompleted}
                  onClick={() => isCompleted && gotoStep(num)}
                  className={`flex items-center gap-1.5 sm:gap-2 select-none transition-colors outline-none ${
                    isCompleted ? "cursor-pointer group" : "cursor-default"
                  }`}
                >
                  {/* Step Number / Check Icon */}
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10.5px] sm:text-[11px] font-bold transition-all ${
                      isCurrent
                        ? "bg-[#FF5A4F] text-white shadow-sm ring-3 ring-[#FF5A4F]/20"
                        : isCompleted
                        ? "bg-[#0E5A63]/15 text-[#0E5A63] group-hover:bg-[#0E5A63] group-hover:text-white"
                        : "bg-[#0B2A4A]/5 text-[#0B2A4A]/30"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[2.5]" />
                    ) : (
                      `0${num}`
                    )}
                  </span>

                  {/* Step Label */}
                  <span
                    className={`text-[11.5px] sm:text-[12.5px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                      isCurrent
                        ? "text-[#FF5A4F]"
                        : isCompleted
                        ? "text-[#0B2A4A] group-hover:text-[#0E5A63]"
                        : "text-[#0B2A4A]/30"
                    }`}
                  >
                    <span className="hidden sm:inline">0{num} </span>
                    {STEP_LABELS[num - 1]}
                  </span>
                </button>

                {/* Progress Connector Line */}
                {num < 5 && (
                  <div
                    className={`h-[1.5px] flex-1 mx-1.5 sm:mx-3 transition-colors ${
                      state.step > num ? "bg-[#0E5A63]/30" : "bg-[#0B2A4A]/10"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* ============================================================== */}
        {/* FULL-WIDTH CENTERED WORKSPACE (No sidebar, No summary cards)   */}
        {/* ============================================================== */}
        <main className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={STEP_TRANSITION}
              className="w-full"
            >
              {state.step === 1 && (
                <StepCoaching
                  state={state}
                  setState={setBookingState}
                  next={nextStep}
                />
              )}
              {state.step === 2 && (
                <StepSession
                  state={state}
                  setState={setBookingState}
                  next={nextStep}
                  back={prevStep}
                />
              )}
              {state.step === 3 && (
                <StepTime
                  state={state}
                  setState={setBookingState}
                  next={nextStep}
                  back={prevStep}
                />
              )}
              {state.step === 4 && (
                <StepDetails
                  state={state}
                  setState={setBookingState}
                  next={nextStep}
                  back={prevStep}
                />
              )}
              {state.step === 5 && (
                <StepReview
                  state={state}
                  gotoStep={gotoStep}
                  back={prevStep}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}

export function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BookPageContent />
    </Suspense>
  );
}
