"use client";

import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SessionDuration, getSessionOption } from "@/lib/pricingConfig";

// Components for steps
import { StepSession } from "./StepSession";
import { StepTime } from "./StepTime";
import { StepDetails } from "./StepDetails";
import { StepReview } from "./StepReview";
import { BookingSummary } from "./BookingSummary";

export type BookingState = {
  step: number;
  duration: SessionDuration | null;
  date: Date | null;
  timeSlot: string | null; // e.g. "10:00 AM"
  timezone: string;
  sessionFor: "individual" | "couple";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  partnerName: string;
  contextNote: string;
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
    duration: initialDuration,
    date: null,
    timeSlot: null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York",
    sessionFor: "individual",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    partnerName: "",
    contextNote: "",
  });

  const setBookingState = (updates: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  const gotoStep = (step: number) => setState(prev => ({ ...prev, step }));

  return (
    <section className="py-12 md:py-24 bg-white min-h-[100dvh]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Main Content Area */}
        <div className="w-full lg:w-[64%] flex flex-col">
          
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#FF5A4F] mb-4">
              Private Booking
            </span>
            <h1 className="font-serif text-[32px] md:text-[42px] leading-[1.1] text-[#161514] mb-4">
              Letâ€™s Find the Right <br className="hidden md:block" /> Space for Your Conversation.
            </h1>
            <p className="text-[15px] leading-[1.6] text-[#161514]/70 mb-4 max-w-[500px]">
              Choose your session length, select a time that works for you, and confirm your private online session.
            </p>
            <div className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#161514]/40">
              PRIVATE &nbsp;â€¢&nbsp; ONLINE &nbsp;â€¢&nbsp; INDIVIDUAL OR COUPLE
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 md:gap-4 mb-12">
            {[1, 2, 3, 4].map(num => (
              <React.Fragment key={num}>
                <div className="flex items-center gap-2">
                  <span className={`text-[12px] font-sans tracking-wide uppercase transition-colors ${state.step === num ? "text-[#FF5A4F] font-medium" : state.step > num ? "text-[#161514]/60" : "text-[#161514]/20"}`}>
                    0{num} {["Session", "Time", "Details", "Review"][num - 1]}
                  </span>
                </div>
                {num < 4 && (
                  <div className={`h-[1px] flex-1 max-w-[40px] ${state.step > num ? "bg-[#161514]/20" : "bg-[#161514]/10"}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={state.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1"
            >
              {state.step === 1 && <StepSession state={state} setState={setBookingState} next={nextStep} />}
              {state.step === 2 && <StepTime state={state} setState={setBookingState} next={nextStep} back={prevStep} />}
              {state.step === 3 && <StepDetails state={state} setState={setBookingState} next={nextStep} back={prevStep} />}
              {state.step === 4 && <StepReview state={state} gotoStep={gotoStep} back={prevStep} />}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Sticky Summary Area */}
        <div className="w-full lg:w-[36%] lg:sticky lg:top-[120px] mb-12 lg:mb-0">
          <BookingSummary state={state} />
        </div>

      </div>
    </section>
  );
}

export function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BookPageContent />
    </Suspense>
  );
}
