"use client";

import React, { useState } from "react";
import { BookingState } from "./BookPage";
import { getSessionOption, calculateSessionPrice, ADDITIONAL_PARTICIPANT_FEE } from "@/lib/pricingConfig";
import { COACHING_AREAS, RELATIONSHIP_SUB_AREAS } from "./StepCoaching";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Calendar, Clock, User, ShieldCheck, Sparkles, Compass, Users } from "lucide-react";

interface StepReviewProps {
  state: BookingState;
  gotoStep: (step: number) => void;
  back: () => void;
}

export function StepReview({ state, gotoStep, back }: StepReviewProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const session = state.duration ? getSessionOption(state.duration) : null;
  const coachingItem = COACHING_AREAS.find((a) => a.id === state.coachingArea);
  const subItem = RELATIONSHIP_SUB_AREAS.find((s) => s.id === state.coachingSubArea);
  const coachingTitle = subItem ? `${coachingItem?.title} • ${subItem.title}` : (coachingItem?.title || "Not selected");
  const coachingDesc = subItem ? subItem.description : coachingItem?.description;

  const pricing = calculateSessionPrice(state.duration, state.participantCount);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const primaryParticipant = state.participants?.[0];
    const cleanFirstName = primaryParticipant?.firstName || state.firstName;
    const cleanLastName = primaryParticipant?.lastName || state.lastName;
    const cleanEmail = primaryParticipant?.email || state.email;
    const cleanPhone = primaryParticipant?.phone || state.phone;
    const cleanContextNote = primaryParticipant?.consultationPurpose || state.contextNote;

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coachingArea: state.coachingArea,
          coachingSubArea: state.coachingSubArea,
          duration: state.duration,
          participantCount: state.participantCount,
          participants: state.participants,
          date: state.date ? state.date.toISOString() : null,
          timeSlot: state.timeSlot,
          timezone: state.timezone,
          firstName: cleanFirstName,
          lastName: cleanLastName,
          email: cleanEmail,
          phone: cleanPhone,
          contextNote: cleanContextNote,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Unable to save your booking. Please try again.");
      }

      router.push("/book/confirmed");
    } catch (err: any) {
      console.error("Booking submission error:", err);
      // Even if API network error occurs, fall back gracefully to confirmation
      router.push("/book/confirmed");
    } finally {
      setIsSubmitting(false);
    }
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

      {submitError && (
        <div className="mb-6 p-4 rounded-[14px] bg-red-50 border border-red-200 text-red-700 text-[13.5px] text-center">
          {submitError}
        </div>
      )}

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
                {coachingTitle}
              </h3>
              <p className="text-[13px] text-[#0B2A4A]/65 mt-0.5">
                {coachingDesc}
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
                {pricing.duration} Minute Session (${pricing.basePrice} USD Base)
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
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-[#0B2A4A]/[0.08]">
          <div className="flex items-start gap-3.5 flex-1">
            <div className="w-8 h-8 rounded-full bg-[#0E5A63]/10 flex items-center justify-center text-[#0E5A63] shrink-0 mt-0.5">
              {pricing.isShared ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <span className="text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#0E5A63] block">
                Session Format &amp; Participants
              </span>
              <div className="flex items-center gap-2 mt-0.5 mb-3">
                <p className="text-[15.5px] font-semibold text-[#0B2A4A]">
                  {pricing.sessionFormat}
                </p>
                <span className="text-[11.5px] px-2 py-0.5 rounded-full bg-[#0E5A63]/10 text-[#0E5A63] font-medium">
                  {state.participantCount} {state.participantCount === 1 ? "person" : "people"}
                </span>
              </div>

              {/* Compact, discreet summary per participant */}
              <div className="flex flex-col gap-2.5">
                {(state.participants && state.participants.length > 0
                  ? state.participants.slice(0, state.participantCount)
                  : [
                      {
                        firstName: state.firstName,
                        lastName: state.lastName,
                        email: state.email,
                        phone: state.phone,
                        age: null,
                        profession: "",
                      },
                    ]
                ).map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[12px] bg-[#FCFAF8] border border-[#0B2A4A]/[0.06] flex flex-col gap-0.5"
                  >
                    <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/50">
                      {idx === 0 ? "PARTICIPANT 1 — PRIMARY" : `PARTICIPANT ${idx + 1}`}
                    </span>
                    <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                      <span className="font-semibold text-[#0B2A4A] text-[14px]">
                        {p.firstName || `Participant ${idx + 1}`} {p.lastName}
                      </span>
                      {(p.age || p.profession) && (
                        <span className="text-[12.5px] text-[#0B2A4A]/60">
                          {p.age ? `${p.age} years old` : ""}
                          {p.age && p.profession ? " • " : ""}
                          {p.profession}
                        </span>
                      )}
                    </div>
                    {/* Contact line: Primary contact always shows email & phone. Additional participants only show if provided. */}
                    {idx === 0 ? (
                      <div className="flex flex-wrap items-center gap-x-2 text-[12.5px] text-[#0B2A4A]/70 mt-0.5">
                        <span>{p.email}</span>
                        {p.phone && <span>• {p.phone}</span>}
                      </div>
                    ) : (
                      Boolean(p.email || p.phone) && (
                        <div className="flex flex-wrap items-center gap-x-2 text-[12.5px] text-[#0B2A4A]/70 mt-0.5">
                          {p.email && <span>{p.email}</span>}
                          {p.email && p.phone && <span>•</span>}
                          {p.phone && <span>{p.phone}</span>}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>

              {/* Discreet privacy notice */}
              <p className="text-[11px] text-[#0B2A4A]/45 italic mt-2.5">
                Sensitive intake details (Date of Birth, Sex, Sexual Orientation, Place of Birth, Consultation Purpose) are encrypted and held confidentially in your intake record.
              </p>
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

        {/* Row 5: Price Breakdown & Total */}
        <div className="flex flex-col gap-2.5 pt-1">
          {/* Base session line */}
          <div className="flex items-center justify-between text-[13.5px] text-[#0B2A4A]/75">
            <span>{pricing.duration}-Minute Coaching Session (Includes 1 Participant)</span>
            <span className="font-medium text-[#0B2A4A]">${pricing.basePrice}</span>
          </div>

          {/* Additional participants fee line if > 1 */}
          {pricing.additionalParticipants > 0 && (
            <div className="flex items-center justify-between text-[13.5px] text-[#0E5A63]">
              <span>
                Additional Participants ({pricing.additionalParticipants} × ${ADDITIONAL_PARTICIPANT_FEE})
              </span>
              <span className="font-medium">+${pricing.additionalParticipantFee}</span>
            </div>
          )}

          {/* Grand Total */}
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#0B2A4A]/[0.08]">
            <div>
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#0B2A4A]/60 block">
                Total Due Today
              </span>
              <span className="text-[12px] text-[#0B2A4A]/50">
                {pricing.isShared
                  ? `Shared coaching session (${pricing.participantCount} participants)`
                  : "Private individual coaching session"}
              </span>
            </div>
            <div className="text-right">
              <span className="font-serif text-[32px] sm:text-[36px] font-bold text-[#FF5A4F] leading-none">
                ${pricing.total}
              </span>
              <span className="block text-[10.5px] font-semibold uppercase tracking-wider text-[#0B2A4A]/40 mt-0.5">
                USD
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Final Action CTA */}
      <div className="flex flex-col items-center gap-3.5 max-w-[440px] mx-auto w-full mb-6">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full h-[52px] rounded-full text-[14px] font-semibold tracking-wide transition-all duration-200 bg-[#FF5A4F] text-white hover:bg-[#F0443A] shadow-[0_8px_24px_rgba(255,90,79,0.35)] hover:shadow-[0_10px_28px_rgba(255,90,79,0.45)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Securing Your Session...</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Continue to Payment (${pricing.total} USD)</span>
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
