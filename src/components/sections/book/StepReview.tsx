"use client";

import React, { useState } from "react";
import { BookingState } from "./BookPage";
import { getSessionOption } from "@/lib/pricingConfig";
import { COACHING_AREAS } from "./StepCoaching";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Calendar, Clock, User, ShieldCheck, Sparkles, Compass } from "lucide-react";

interface StepReviewProps {
  state: BookingState;
  gotoStep: (step: number) => void;
  back: () => void;
}

export function StepReview({ state, gotoStep, back }: StepReviewProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = state.duration ? getSessionOption(state.duration) : null;
  const coachingItem = COACHING_AREAS.find((a) => a.id === state.coachingArea);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/book/confirmed");
    }, 400);
  };

  const formattedDate = state.date
    ? state.date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Date not selected";

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto">
      {/* Step Heading */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[36px] text-[#0B2A4A] tracking-[-0.01em] leading-tight mb-2">
          Review Your Session
        </h2>
        <p className="text-[14.5px] sm:text-[15.5px] text-[#0B2A4A]/70 leading-relaxed max-w-[500px] mx-auto">
          Please review your session details below before proceeding to secure payment.
        </p>
      </div>

      {/* Centered Premium Review Card */}
      <div className="bg-white rounded-[24px] border border-[#FF5A4F]/25 p-6 sm:p-9 shadow-[0_16px_45px_rgba(11,42,74,0.06)] mb-8 flex flex-col gap-6">
        
        {/* Row 1: Coaching Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#0B2A4A]/[0.08]">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#0B2A4A]/5 flex items-center justify-center text-[#0B2A4A] shrink-0 mt-0.5">
              <Compass className="w-4 h-4 text-[#FF5A4F]" />
            </div>
            <div>
              <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/50 block">
                Coaching Area
              </span>
              <h3 className="font-serif text-[18px] sm:text-[19px] font-semibold text-[#0B2A4A] mt-0.5">
                {coachingItem?.title || "Not selected"}
              </h3>
              <p className="text-[13px] text-[#0B2A4A]/65 mt-0.5">
                {coachingItem?.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => gotoStep(1)}
            className="text-[12px] font-semibold uppercase tracking-wider text-[#0E5A63] hover:text-[#FF5A4F] transition-colors self-start sm:self-center shrink-0 px-2.5 py-1 rounded-md hover:bg-[#0E5A63]/5 cursor-pointer"
          >
            Edit Coaching
          </button>
        </div>

        {/* Row 2: Session Option & Duration */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#0B2A4A]/[0.08]">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#FF5A4F]/10 flex items-center justify-center text-[#FF5A4F] shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#FF5A4F] block">
                Session Duration
              </span>
              <h3 className="font-serif text-[18px] sm:text-[19px] font-semibold text-[#0B2A4A] mt-0.5">
                {session?.duration || 0} Minute Session (${session?.price || 0} USD)
              </h3>
              <p className="text-[13px] text-[#0B2A4A]/65 mt-0.5">
                {session?.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => gotoStep(2)}
            className="text-[12px] font-semibold uppercase tracking-wider text-[#0E5A63] hover:text-[#FF5A4F] transition-colors self-start sm:self-center shrink-0 px-2.5 py-1 rounded-md hover:bg-[#0E5A63]/5 cursor-pointer"
          >
            Edit Session
          </button>
        </div>

        {/* Row 3: Format & Participants */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#0B2A4A]/[0.08]">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#0E5A63]/10 flex items-center justify-center text-[#0E5A63] shrink-0 mt-0.5">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#0E5A63] block">
                Session Format & Participants
              </span>
              <p className="text-[15.5px] font-semibold text-[#0B2A4A] mt-0.5">
                {state.sessionFor === "joint" ? "Joint Session" : "Individual Session"}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#0B2A4A]/75 mt-0.5">
                <span className="font-medium text-[#0B2A4A]">{state.firstName} {state.lastName}</span>
                {state.otherParticipantName && (
                  <span>&amp; {state.otherParticipantName}</span>
                )}
                <span>•</span>
                <span>{state.email}</span>
                {state.phone && (
                  <>
                    <span>•</span>
                    <span>{state.phone}</span>
                  </>
                )}
              </div>
              {state.contextNote && (
                <div className="mt-2.5 p-3 rounded-[10px] bg-[#FCFAF8] border border-[#0B2A4A]/[0.06] text-[12.5px] text-[#0B2A4A]/75">
                  <span className="font-semibold text-[#0B2A4A] block mb-0.5">Discussion Note:</span>
                  <p className="italic">{state.contextNote}</p>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => gotoStep(4)}
            className="text-[12px] font-semibold uppercase tracking-wider text-[#0E5A63] hover:text-[#FF5A4F] transition-colors self-start sm:self-center shrink-0 px-2.5 py-1 rounded-md hover:bg-[#0E5A63]/5 cursor-pointer"
          >
            Edit Details
          </button>
        </div>

        {/* Row 4: Date & Time */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#0B2A4A]/[0.08]">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#D8A23D]/15 flex items-center justify-center text-[#D8A23D] shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#D8A23D] block">
                Date & Time
              </span>
              <p className="text-[16px] font-medium text-[#0B2A4A] mt-0.5">
                {formattedDate}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-[#0B2A4A]/70 mt-0.5">
                <span className="font-semibold text-[#0E5A63] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {state.timeSlot}
                </span>
                <span>•</span>
                <span>{state.timezone.replace("_", " ")}</span>
                <span>•</span>
                <span className="text-[#0B2A4A]/60 italic">Private Online Video</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => gotoStep(3)}
            className="text-[12px] font-semibold uppercase tracking-wider text-[#0E5A63] hover:text-[#FF5A4F] transition-colors self-start sm:self-center shrink-0 px-2.5 py-1 rounded-md hover:bg-[#0E5A63]/5 cursor-pointer"
          >
            Edit Time
          </button>
        </div>

        {/* Row 5: Total */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#0B2A4A]/60 block">
              Total Due Today
            </span>
            <span className="text-[12px] text-[#0B2A4A]/50">
              Private 1-on-1 coaching session
            </span>
          </div>
          <div className="text-right">
            <span className="font-serif text-[32px] sm:text-[36px] font-bold text-[#FF5A4F] leading-none">
              ${session?.price || 0}
            </span>
            <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-[#0B2A4A]/40 mt-0.5">
              USD
            </span>
          </div>
        </div>

      </div>

      {/* Final Action CTA */}
      <div className="flex flex-col items-center gap-3.5 max-w-[440px] mx-auto w-full mb-6">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full h-[52px] rounded-full text-[14px] font-semibold tracking-wide transition-all duration-200 bg-[#FF5A4F] text-white hover:bg-[#F0443A] shadow-[0_8px_24px_rgba(255,90,79,0.35)] hover:shadow-[0_10px_28px_rgba(255,90,79,0.45)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Securing Your Session...</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Continue to Payment</span>
            </>
          )}
        </button>

        <p className="text-[12px] text-[#0B2A4A]/55 text-center flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E5A63]" />
          <span>Encrypted checkout. Your appointment is held immediately upon payment.</span>
        </p>
      </div>

      {/* Back button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={back}
          className="group flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#0B2A4A]/55 hover:text-[#0B2A4A] transition-colors py-2 px-3 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Details</span>
        </button>
      </div>
    </div>
  );
}
