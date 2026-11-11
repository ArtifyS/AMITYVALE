"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SessionDuration, getSessionOption, MAX_PARTICIPANTS } from "@/lib/pricingConfig";
import { ParticipantProfile, createEmptyParticipantProfile } from "@/lib/participantProfile";
import { Check } from "lucide-react";

// Step Components
import { StepCoaching } from "./StepCoaching";
import { StepSession } from "./StepSession";
import { StepTime } from "./StepTime";
import { StepDetails } from "./StepDetails";
import { StepReview } from "./StepReview";

export type ParticipantInfo = {
  name: string;
  email?: string;
};

export type BookingState = {
  step: number;
  coachingArea: string | null;
  coachingSubArea?: string | null;
  duration: SessionDuration | null;
  participantCount: number;
  participants: ParticipantProfile[];
  additionalParticipants: ParticipantInfo[];
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

  const initialParticipants = (() => {
    const participantsParam = searchParams.get("participants");
    if (participantsParam) {
      const p = parseInt(participantsParam, 10);
      if (!isNaN(p) && p >= 1) return Math.min(p, MAX_PARTICIPANTS);
    }
    return 1;
  })();

  const initialArea = searchParams.get("area");
  const initialSub = searchParams.get("sub");

  const [state, setState] = useState<BookingState>(() => {
    let initialTz = "America/New_York";
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) initialTz = tz;
    } catch {
      // fallback
    }
    return {
      step: 1,
      coachingArea: initialArea || null,
      coachingSubArea: initialSub || null,
      duration: initialDuration,
      participantCount: initialParticipants,
      participants: Array.from(
        { length: initialParticipants },
        () => createEmptyParticipantProfile()
      ),
      additionalParticipants: Array.from(
        { length: Math.max(0, initialParticipants - 1) },
        () => ({ name: "", email: "" })
      ),
      date: null,
      timeSlot: null,
      timezone: initialTz,
      sessionFor: initialParticipants > 1 ? "joint" : "individual",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      otherParticipantName: "",
      contextNote: "",
    };
  });

  const setBookingState = (updates: Partial<BookingState>) => {
    setState((prev) => {
      const next = { ...prev, ...updates };

      // Handle participantCount updates
      if (updates.participantCount !== undefined && updates.participantCount !== prev.participantCount) {
        const newCount = Math.max(1, Math.min(updates.participantCount, MAX_PARTICIPANTS));
        const currentProfiles = prev.participants || [];
        let adjustedProfiles: ParticipantProfile[];

        if (currentProfiles.length < newCount) {
          adjustedProfiles = [
            ...currentProfiles,
            ...Array.from(
              { length: newCount - currentProfiles.length },
              () => createEmptyParticipantProfile()
            ),
          ];
        } else {
          adjustedProfiles = currentProfiles.slice(0, newCount);
        }

        const targetAdditional = newCount - 1;
        const currentAdditional = prev.additionalParticipants || [];
        let adjustedAdditional: ParticipantInfo[];

        if (currentAdditional.length < targetAdditional) {
          adjustedAdditional = [
            ...currentAdditional,
            ...Array.from(
              { length: targetAdditional - currentAdditional.length },
              () => ({ name: "", email: "" })
            ),
          ];
        } else {
          adjustedAdditional = currentAdditional.slice(0, targetAdditional);
        }

        next.participantCount = newCount;
        next.participants = adjustedProfiles;
        next.additionalParticipants = adjustedAdditional;
        next.sessionFor = newCount > 1 ? "joint" : "individual";
      }

      // If participants updated directly, synchronize primary contact convenience fields
      if (updates.participants && updates.participants.length > 0) {
        const primary = updates.participants[0];
        if (primary) {
          next.firstName = primary.firstName;
          next.lastName = primary.lastName;
          next.email = primary.email;
          next.phone = primary.phone;
          next.contextNote = primary.consultationPurpose;
        }

        // Sync additional participants convenience array
        if (updates.participants.length > 1) {
          next.additionalParticipants = updates.participants.slice(1).map((p) => ({
            name: `${p.firstName} ${p.lastName}`.trim(),
            email: p.email,
          }));
          next.otherParticipantName = `${updates.participants[1]?.firstName} ${updates.participants[1]?.lastName}`.trim();
        } else {
          next.additionalParticipants = [];
          next.otherParticipantName = "";
        }
      }

      return next;
    });
  };

  const nextStep = () => setState((prev) => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  const gotoStep = (step: number) => setState((prev) => ({ ...prev, step }));

  // Centralized Booking Step Scroll System
  const bookingStepTopRef = useRef<HTMLDivElement>(null);

  const scrollToStepTop = () => {
    if (typeof window === "undefined") return;
    if (bookingStepTopRef.current) {
      const navbarOffset = window.innerWidth >= 1024 ? 90 : 84;
      const elementRect = bookingStepTopRef.current.getBoundingClientRect();
      const absoluteTop = elementRect.top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, absoluteTop - navbarOffset),
        left: 0,
        behavior: "instant",
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    scrollToStepTop();
  }, [state.step]);

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
            RESERVATION
          </span>
          <h1 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] leading-[1.12] text-[#0B2A4A] tracking-[-0.015em] mb-2">
            Schedule a Private Conversation.
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#0B2A4A]/70 leading-relaxed">
            Choose what works for you: select your time, and complete your Booking.
          </p>
        </header>

        {/* Central Booking Step Top Anchor */}
        <div
          ref={bookingStepTopRef}
          className="scroll-mt-[84px] lg:scroll-mt-[90px]"
          aria-hidden="true"
        />

        {/* ============================================================== */}
        {/* HORIZONTAL COMPACT PROGRESS BAR (~48px total height)           */}
        {/* ============================================================== */}
        <nav
          aria-label="Booking steps"
          className="flex items-center justify-between max-w-[620px] mx-auto mb-8 sm:mb-10 px-2 select-none"
        >
          {STEP_LABELS.map((label, index) => {
            const num = index + 1;
            const isCompleted = state.step > num;
            const isCurrent = state.step === num;

            return (
              <React.Fragment key={label}>
                <button
                  type="button"
                  onClick={() => {
                    // Only allow jumping back to completed steps
                    if (isCompleted) gotoStep(num);
                  }}
                  disabled={!isCompleted}
                  className={`flex items-center gap-2 group transition-all duration-200 outline-none ${
                    isCompleted ? "cursor-pointer" : isCurrent ? "cursor-default" : "cursor-not-allowed opacity-50"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-200 ${
                      isCompleted
                        ? "bg-[#0E5A63] text-white"
                        : isCurrent
                        ? "bg-[#FF5A4F] text-white shadow-[0_0_0_3px_rgba(255,90,79,0.2)]"
                        : "bg-[#0B2A4A]/8 text-[#0B2A4A]/50 group-hover:bg-[#0B2A4A]/12"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : num}
                  </div>
                  <span
                    className={`hidden sm:inline text-[13px] tracking-wide font-medium transition-colors ${
                      isCurrent
                        ? "text-[#0B2A4A] font-semibold"
                        : isCompleted
                        ? "text-[#0E5A63]"
                        : "text-[#0B2A4A]/40"
                    }`}
                  >
                    {label}
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
        {/* FULL-WIDTH CENTERED WORKSPACE                                  */}
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
