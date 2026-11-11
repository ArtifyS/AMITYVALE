"use client";

import React, { FormEvent, useState, useEffect, useRef } from "react";
import { BookingState } from "./BookPage";
import {
  ParticipantProfile,
  createEmptyParticipantProfile,
  calculateAgeFromDob,
  validateParticipantProfile,
  ParticipantErrors,
  SEX_OPTIONS,
  SEXUAL_ORIENTATION_OPTIONS,
} from "@/lib/participantProfile";
import { ArrowRight, ArrowLeft, Check, Users, User, ChevronRight, ChevronLeft } from "lucide-react";

interface StepDetailsProps {
  state: BookingState;
  setState: (updates: Partial<BookingState>) => void;
  next: () => void;
  back: () => void;
}

export function StepDetails({ state, setState, next, back }: StepDetailsProps) {
  const participantCount = Math.max(1, state.participantCount || 1);

  // Active participant index in the navigator (0 to participantCount - 1)
  const [activeIndex, setActiveIndex] = useState(0);

  // Inline errors dictionary for each participant index: errorsMap[index] = { ...errors }
  const [errorsMap, setErrorsMap] = useState<Record<number, ParticipantErrors>>({});

  // Scroll anchor ref for the active participant form
  const participantFormTopRef = useRef<HTMLDivElement>(null);

  const scrollToParticipantFormTop = () => {
    if (typeof window === "undefined") return;
    if (participantFormTopRef.current) {
      const navbarOffset = window.innerWidth >= 1024 ? 90 : 84;
      const elementRect = participantFormTopRef.current.getBoundingClientRect();
      const absoluteTop = elementRect.top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, absoluteTop - navbarOffset),
        left: 0,
        behavior: "instant",
      });
    }
  };

  // Scroll to the active participant form whenever activeIndex changes
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToParticipantFormTop();
  }, [activeIndex]);

  // Ensure participants array in state matches participantCount
  useEffect(() => {
    const current = state.participants || [];
    if (current.length !== participantCount) {
      let updated: ParticipantProfile[];
      if (current.length < participantCount) {
        updated = [
          ...current,
          ...Array.from(
            { length: participantCount - current.length },
            () => createEmptyParticipantProfile()
          ),
        ];
      } else {
        updated = current.slice(0, participantCount);
      }
      setState({ participants: updated });
    }
  }, [participantCount, state.participants, setState]);

  // Ensure activeIndex is within bounds if participantCount decreased
  useEffect(() => {
    if (activeIndex >= participantCount) {
      setActiveIndex(Math.max(0, participantCount - 1));
    }
  }, [participantCount, activeIndex]);

  const participants = state.participants && state.participants.length >= participantCount
    ? state.participants.slice(0, participantCount)
    : Array.from({ length: participantCount }, (_, i) => state.participants?.[i] || createEmptyParticipantProfile());

  const currentProfile = participants[activeIndex] || createEmptyParticipantProfile();
  const currentErrors = errorsMap[activeIndex] || {};
  const isPrimary = activeIndex === 0;

  // Update a single field on the currently active participant
  const handleFieldChange = (field: keyof ParticipantProfile, value: any) => {
    const updatedParticipants = participants.map((p, idx) => {
      if (idx !== activeIndex) return p;

      const updated = { ...p, [field]: value };

      // Automatic Age calculation when Date of Birth changes
      if (field === "dateOfBirth") {
        updated.age = calculateAgeFromDob(value);
      }

      // If sexualOrientation changed away from self-describe, clear self-describe text
      if (field === "sexualOrientation" && value !== "Prefer to self-describe") {
        updated.sexualOrientationSelfDescribe = "";
      }

      return updated;
    });

    setState({ participants: updatedParticipants });

    // Clear error for this field if it was previously flagged
    if (currentErrors[field as keyof ParticipantErrors]) {
      setErrorsMap((prev) => ({
        ...prev,
        [activeIndex]: {
          ...prev[activeIndex],
          [field]: undefined,
        },
      }));
    }
  };

  // Check completion status for each participant (Participant 1 requires email/phone, 2+ optional)
  const participantStatuses = participants.map((p, idx) => {
    const { isValid } = validateParticipantProfile(p, { isPrimary: idx === 0 });
    return isValid;
  });

  // Today's date in YYYY-MM-DD for max DOB validation
  const todayDateString = new Date().toISOString().split("T")[0];

  // Navigate to another participant tab with validation of current if moving forward
  const handleTabClick = (targetIndex: number) => {
    if (targetIndex === activeIndex) return;

    // If moving forward, validate current participant to give immediate feedback
    if (targetIndex > activeIndex) {
      const { isValid, errors } = validateParticipantProfile(currentProfile, { isPrimary });
      if (!isValid) {
        setErrorsMap((prev) => ({ ...prev, [activeIndex]: errors }));
      }
    }
    setActiveIndex(targetIndex);
  };

  // Next participant button handler
  const handleNextParticipant = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const { isValid, errors } = validateParticipantProfile(currentProfile, { isPrimary });

    if (!isValid) {
      setErrorsMap((prev) => ({ ...prev, [activeIndex]: errors }));
      return;
    }

    // Clear current errors and advance
    setErrorsMap((prev) => ({ ...prev, [activeIndex]: {} }));
    if (activeIndex < participantCount - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Previous participant button handler
  const handlePrevParticipant = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Final submit handler to advance to Review step
  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();

    let allValid = true;
    const newErrorsMap: Record<number, ParticipantErrors> = {};
    let firstIncompleteIndex = -1;

    participants.forEach((p, idx) => {
      const { isValid, errors } = validateParticipantProfile(p, { isPrimary: idx === 0 });
      if (!isValid) {
        allValid = false;
        newErrorsMap[idx] = errors;
        if (firstIncompleteIndex === -1) {
          firstIncompleteIndex = idx;
        }
      }
    });

    setErrorsMap(newErrorsMap);

    if (allValid) {
      next();
    } else {
      // Focus the first participant with errors so the user can easily complete them
      if (firstIncompleteIndex !== -1 && firstIncompleteIndex !== activeIndex) {
        setActiveIndex(firstIncompleteIndex);
      }
    }
  };

  // Display label for current participant
  const currentDisplayName = currentProfile.firstName.trim() || currentProfile.lastName.trim()
    ? `${currentProfile.firstName} ${currentProfile.lastName}`.trim()
    : `Participant ${activeIndex + 1}`;

  return (
    <div className="flex flex-col w-full max-w-[800px] mx-auto">
      {/* Step Heading */}
      <div className="text-center mb-6 sm:mb-7">
        <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[36px] text-[#0B2A4A] tracking-[-0.01em] leading-tight mb-2">
          Client Intake Details
        </h2>
        <p className="text-[14.5px] sm:text-[15.5px] text-[#0B2A4A]/70 leading-relaxed max-w-[540px] mx-auto">
          Please provide confidential intake details for each person attending the session.
        </p>
      </div>

      {/* MULTIPLE PARTICIPANTS NAVIGATOR (Visible ONLY when participantCount > 1) */}
      {participantCount > 1 && (
        <div className="mb-6">
          {/* Desktop & Tablet Horizontal Tab Rail */}
          <div className="hidden sm:flex items-center gap-2 p-1.5 rounded-[16px] bg-[#FAF7F4] border border-[#0B2A4A]/10">
            {participants.map((p, idx) => {
              const isCurrent = idx === activeIndex;
              const isCompleted = participantStatuses[idx];
              const label =
                idx === 0
                  ? "01 Primary"
                  : `0${idx + 1} Participant`;
              const nameSnippet =
                p.firstName.trim()
                  ? ` • ${p.firstName}`
                  : "";

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTabClick(idx)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-[12px] text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? "bg-white text-[#0B2A4A] shadow-[0_2px_8px_rgba(11,42,74,0.06)] border border-[#0B2A4A]/10"
                      : "text-[#0B2A4A]/60 hover:text-[#0B2A4A] hover:bg-white/60"
                  }`}
                  aria-selected={isCurrent}
                  role="tab"
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCompleted
                        ? "bg-[#0E5A63] text-white"
                        : isCurrent
                        ? "bg-[#FF5A4F] text-white"
                        : "bg-[#0B2A4A]/10 text-[#0B2A4A]/60"
                    }`}
                  >
                    {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : idx + 1}
                  </div>
                  <span className="truncate">
                    {label}
                    {nameSnippet}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Compact Navigator (< 640px) */}
          <div className="flex sm:hidden items-center justify-between p-2 rounded-[14px] bg-[#FAF7F4] border border-[#0B2A4A]/10 text-[13px]">
            <button
              type="button"
              onClick={handlePrevParticipant}
              disabled={activeIndex === 0}
              className={`p-1.5 rounded-lg flex items-center justify-center ${
                activeIndex === 0
                  ? "text-[#0B2A4A]/25 cursor-not-allowed"
                  : "text-[#0B2A4A] hover:bg-white cursor-pointer"
              }`}
              aria-label="Previous Participant"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/60">
                Participant {activeIndex + 1} of {participantCount}
              </span>
              {participantStatuses[activeIndex] && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0E5A63] bg-[#0E5A63]/10 px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  <span>Complete</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleNextParticipant}
              disabled={activeIndex === participantCount - 1}
              className={`p-1.5 rounded-lg flex items-center justify-center ${
                activeIndex === participantCount - 1
                  ? "text-[#0B2A4A]/25 cursor-not-allowed"
                  : "text-[#0B2A4A] hover:bg-white cursor-pointer"
              }`}
              aria-label="Next Participant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* INTAKE FORM CONTAINER */}
      <form onSubmit={handleFinalSubmit} className="flex flex-col gap-6">
        <div
          ref={participantFormTopRef}
          className="scroll-mt-[84px] lg:scroll-mt-[90px] bg-white rounded-[22px] border border-[#0B2A4A]/10 p-6 sm:p-8 md:p-9 shadow-[0_12px_36px_rgba(11,42,74,0.04)] flex flex-col gap-7"
        >
          
          {/* PARTICIPANT HEADER */}
          <div className="flex items-center justify-between pb-4 border-b border-[#0B2A4A]/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0E5A63]/10 text-[#0E5A63] flex items-center justify-center font-bold shrink-0">
                {participantCount > 1 ? <Users className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#0B2A4A]/50 block">
                  Participant Details
                </span>
                <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#0B2A4A] leading-snug">
                  {currentDisplayName}
                </h3>
              </div>
            </div>

            <div className="text-right">
              {activeIndex === 0 ? (
                <div>
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#FF5A4F] block">
                    Primary Contact
                  </span>
                  <span className="text-[11.5px] text-[#0B2A4A]/55">
                    Booking Coordinator
                  </span>
                </div>
              ) : (
                <span className="text-[11.5px] font-semibold text-[#0E5A63] bg-[#0E5A63]/10 px-3 py-1 rounded-full">
                  Participant {activeIndex + 1}
                </span>
              )}
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION A: PERSONAL DETAILS                                    */}
          {/* ============================================================== */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-1 border-b border-[#0B2A4A]/[0.06]">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/70">
                Section A — Personal Details
              </span>
            </div>

            {/* Row 1: First Name | Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor={`firstName_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  First Name <span className="text-[#FF5A4F]">*</span>
                </label>
                <input
                  id={`firstName_${activeIndex}`}
                  type="text"
                  autoComplete="given-name"
                  value={currentProfile.firstName}
                  onChange={(e) => handleFieldChange("firstName", e.target.value)}
                  placeholder="e.g. Sarah"
                  aria-invalid={Boolean(currentErrors.firstName)}
                  aria-describedby={currentErrors.firstName ? `err_firstName_${activeIndex}` : undefined}
                  className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                    currentErrors.firstName
                      ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                      : "border-[#0B2A4A]/15"
                  }`}
                />
                {currentErrors.firstName && (
                  <span id={`err_firstName_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                    {currentErrors.firstName}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor={`lastName_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  Last Name <span className="text-[#FF5A4F]">*</span>
                </label>
                <input
                  id={`lastName_${activeIndex}`}
                  type="text"
                  autoComplete="family-name"
                  value={currentProfile.lastName}
                  onChange={(e) => handleFieldChange("lastName", e.target.value)}
                  placeholder="e.g. Jenkins"
                  aria-invalid={Boolean(currentErrors.lastName)}
                  aria-describedby={currentErrors.lastName ? `err_lastName_${activeIndex}` : undefined}
                  className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                    currentErrors.lastName
                      ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                      : "border-[#0B2A4A]/15"
                  }`}
                />
                {currentErrors.lastName && (
                  <span id={`err_lastName_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                    {currentErrors.lastName}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Date of Birth | Age (Read-Only Derived) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor={`dob_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  Date of Birth <span className="text-[#FF5A4F]">*</span>
                </label>
                <div
                  className="relative w-full cursor-pointer"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector<HTMLInputElement>(`#dob_${activeIndex}`);
                    if (input) {
                      input.focus();
                      if ("showPicker" in HTMLInputElement.prototype) {
                        try {
                          input.showPicker();
                        } catch {
                          // ignore if picker is already open or browser restricts
                        }
                      }
                    }
                  }}
                >
                  <input
                    id={`dob_${activeIndex}`}
                    type="date"
                    max={todayDateString}
                    value={currentProfile.dateOfBirth}
                    onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
                    onClick={(e) => {
                      if ("showPicker" in HTMLInputElement.prototype) {
                        try {
                          e.currentTarget.showPicker();
                        } catch {
                          // ignore if already open
                        }
                      }
                    }}
                    aria-invalid={Boolean(currentErrors.dateOfBirth)}
                    aria-describedby={currentErrors.dateOfBirth ? `err_dob_${activeIndex}` : undefined}
                    className={`w-full h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] cursor-pointer focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                      currentErrors.dateOfBirth
                        ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                        : "border-[#0B2A4A]/15"
                    }`}
                  />
                </div>
                {currentErrors.dateOfBirth && (
                  <span id={`err_dob_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                    {currentErrors.dateOfBirth}
                  </span>
                )}
              </div>

              {/* Age: Automatically Calculated from DOB, Read-Only */}
              <div className="flex flex-col">
                <label
                  htmlFor={`age_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5 flex items-center justify-between"
                >
                  <span>Age</span>
                  <span className="text-[11px] text-[#0B2A4A]/45 font-normal italic">
                    Derived from Date of Birth
                  </span>
                </label>
                <div
                  id={`age_${activeIndex}`}
                  className="h-[46px] px-4 rounded-[12px] border border-[#0B2A4A]/15 bg-[#FAF7F4] flex items-center text-[14px] text-[#0B2A4A]/80 font-medium select-none cursor-default"
                >
                  {currentProfile.age !== null && currentProfile.age !== undefined
                    ? `${currentProfile.age} years old`
                    : "—"}
                </div>
              </div>
            </div>

            {/* Row 3: Place of Birth (Full Width) */}
            <div className="flex flex-col">
              <label
                htmlFor={`pob_${activeIndex}`}
                className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
              >
                Place of Birth <span className="text-[#FF5A4F]">*</span>
              </label>
              <input
                id={`pob_${activeIndex}`}
                type="text"
                value={currentProfile.placeOfBirth}
                onChange={(e) => handleFieldChange("placeOfBirth", e.target.value)}
                placeholder="City, State/Province, Country"
                aria-invalid={Boolean(currentErrors.placeOfBirth)}
                aria-describedby={currentErrors.placeOfBirth ? `err_pob_${activeIndex}` : undefined}
                className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                  currentErrors.placeOfBirth
                    ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                    : "border-[#0B2A4A]/15"
                }`}
              />
              {currentErrors.placeOfBirth && (
                <span id={`err_pob_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                  {currentErrors.placeOfBirth}
                </span>
              )}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION B: ABOUT YOU                                           */}
          {/* ============================================================== */}
          <section className="flex flex-col gap-4 pt-4 border-t border-[#0B2A4A]/[0.08]">
            <div className="flex items-center gap-2 pb-1 border-b border-[#0B2A4A]/[0.06]">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/70">
                Section B — About You
              </span>
            </div>

            {/* Row 1: Sex | Sexual Orientation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sex */}
              <div className="flex flex-col">
                <label
                  htmlFor={`sex_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  Sex <span className="text-[#FF5A4F]">*</span>
                </label>
                <select
                  id={`sex_${activeIndex}`}
                  value={currentProfile.sex}
                  onChange={(e) => handleFieldChange("sex", e.target.value)}
                  aria-invalid={Boolean(currentErrors.sex)}
                  aria-describedby={currentErrors.sex ? `err_sex_${activeIndex}` : undefined}
                  className={`h-[46px] px-3.5 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                    currentErrors.sex
                      ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                      : "border-[#0B2A4A]/15"
                  }`}
                >
                  <option value="">Select Sex...</option>
                  {SEX_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {currentErrors.sex && (
                  <span id={`err_sex_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                    {currentErrors.sex}
                  </span>
                )}
              </div>

              {/* Sexual Orientation */}
              <div className="flex flex-col">
                <label
                  htmlFor={`orientation_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  Sexual Orientation <span className="text-[#FF5A4F]">*</span>
                </label>
                <select
                  id={`orientation_${activeIndex}`}
                  value={currentProfile.sexualOrientation}
                  onChange={(e) => handleFieldChange("sexualOrientation", e.target.value)}
                  aria-invalid={Boolean(currentErrors.sexualOrientation)}
                  aria-describedby={currentErrors.sexualOrientation ? `err_orientation_${activeIndex}` : undefined}
                  className={`h-[46px] px-3.5 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                    currentErrors.sexualOrientation
                      ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                      : "border-[#0B2A4A]/15"
                  }`}
                >
                  <option value="">Select Sexual Orientation...</option>
                  {SEXUAL_ORIENTATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {currentErrors.sexualOrientation && (
                  <span id={`err_orientation_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                    {currentErrors.sexualOrientation}
                  </span>
                )}
              </div>
            </div>

            {/* Subfield if "Prefer to self-describe" */}
            {currentProfile.sexualOrientation === "Prefer to self-describe" && (
              <div className="flex flex-col">
                <label
                  htmlFor={`orientation_specify_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  Please specify <span className="text-[#FF5A4F]">*</span>
                </label>
                <input
                  id={`orientation_specify_${activeIndex}`}
                  type="text"
                  value={currentProfile.sexualOrientationSelfDescribe || ""}
                  onChange={(e) => handleFieldChange("sexualOrientationSelfDescribe", e.target.value)}
                  placeholder="e.g. Pan-romantic asexual"
                  aria-invalid={Boolean(currentErrors.sexualOrientationSelfDescribe)}
                  aria-describedby={
                    currentErrors.sexualOrientationSelfDescribe
                      ? `err_orientation_specify_${activeIndex}`
                      : undefined
                  }
                  className={`h-[44px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                    currentErrors.sexualOrientationSelfDescribe
                      ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                      : "border-[#0B2A4A]/15"
                  }`}
                />
                {currentErrors.sexualOrientationSelfDescribe && (
                  <span
                    id={`err_orientation_specify_${activeIndex}`}
                    className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium"
                  >
                    {currentErrors.sexualOrientationSelfDescribe}
                  </span>
                )}
              </div>
            )}

            {/* Row 2: Profession (Full Width) */}
            <div className="flex flex-col">
              <label
                htmlFor={`profession_${activeIndex}`}
                className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
              >
                Profession <span className="text-[#FF5A4F]">*</span>
              </label>
              <input
                id={`profession_${activeIndex}`}
                type="text"
                autoComplete="organization-title"
                value={currentProfile.profession}
                onChange={(e) => handleFieldChange("profession", e.target.value)}
                placeholder="e.g. Attorney, Business Owner, Teacher"
                aria-invalid={Boolean(currentErrors.profession)}
                aria-describedby={currentErrors.profession ? `err_profession_${activeIndex}` : undefined}
                className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                  currentErrors.profession
                    ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                    : "border-[#0B2A4A]/15"
                }`}
              />
              {currentErrors.profession && (
                <span id={`err_profession_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                  {currentErrors.profession}
                </span>
              )}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION C: CONTACT & CONSULTATION                             */}
          {/* ============================================================== */}
          <section className="flex flex-col gap-4 pt-4 border-t border-[#0B2A4A]/[0.08]">
            <div className="flex items-center gap-2 pb-1 border-b border-[#0B2A4A]/[0.06]">
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/70">
                Section C — Contact &amp; Consultation
              </span>
            </div>

            {/* Row 1: Email Address | Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor={`email_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  {isPrimary ? (
                    <>
                      Email Address <span className="text-[#FF5A4F]">*</span>
                    </>
                  ) : (
                    "Email Address (Optional)"
                  )}
                </label>
                <input
                  id={`email_${activeIndex}`}
                  type="email"
                  autoComplete="email"
                  value={currentProfile.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  placeholder={isPrimary ? "you@example.com" : "participant@example.com"}
                  aria-invalid={Boolean(currentErrors.email)}
                  aria-describedby={
                    currentErrors.email
                      ? `err_email_${activeIndex}`
                      : !isPrimary
                      ? `help_email_${activeIndex}`
                      : undefined
                  }
                  className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                    currentErrors.email
                      ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                      : "border-[#0B2A4A]/15"
                  }`}
                />
                {!isPrimary && (
                  <span
                    id={`help_email_${activeIndex}`}
                    className="text-[11px] text-[#0B2A4A]/50 mt-1 leading-tight"
                  >
                    Add an email if this participant should receive the session invitation directly.
                  </span>
                )}
                {currentErrors.email && (
                  <span id={`err_email_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                    {currentErrors.email}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor={`phone_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  {isPrimary ? (
                    <>
                      Phone Number <span className="text-[#FF5A4F]">*</span>
                    </>
                  ) : (
                    "Phone Number (Optional)"
                  )}
                </label>
                <input
                  id={`phone_${activeIndex}`}
                  type="tel"
                  autoComplete="tel"
                  value={currentProfile.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  aria-invalid={Boolean(currentErrors.phone)}
                  aria-describedby={currentErrors.phone ? `err_phone_${activeIndex}` : undefined}
                  className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                    currentErrors.phone
                      ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                      : "border-[#0B2A4A]/15"
                  }`}
                />
                {currentErrors.phone && (
                  <span id={`err_phone_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                    {currentErrors.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Purpose for the Consultation (Full Width Textarea) */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor={`purpose_${activeIndex}`}
                  className="text-[12.5px] font-medium text-[#0B2A4A]"
                >
                  Purpose for the Consultation <span className="text-[#FF5A4F]">*</span>
                </label>
                <span className="text-[11px] text-[#0B2A4A]/45">
                  {currentProfile.consultationPurpose.length} / 800
                </span>
              </div>
              <textarea
                id={`purpose_${activeIndex}`}
                rows={4}
                maxLength={800}
                value={currentProfile.consultationPurpose}
                onChange={(e) => handleFieldChange("consultationPurpose", e.target.value)}
                placeholder="Briefly describe what you would like to address during the session."
                aria-invalid={Boolean(currentErrors.consultationPurpose)}
                aria-describedby={
                  currentErrors.consultationPurpose ? `err_purpose_${activeIndex}` : undefined
                }
                className={`p-3.5 rounded-[12px] border bg-white text-[13.5px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all resize-y ${
                  currentErrors.consultationPurpose
                    ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10"
                    : "border-[#0B2A4A]/15"
                }`}
              />
              {currentErrors.consultationPurpose && (
                <span id={`err_purpose_${activeIndex}`} className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                  {currentErrors.consultationPurpose}
                </span>
              )}
            </div>
          </section>

        </div>

        {/* BOTTOM NAVIGATION CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Back button or Previous Participant */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeIndex > 0 ? (
              <button
                type="button"
                onClick={handlePrevParticipant}
                className="group flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#0B2A4A]/70 hover:text-[#0B2A4A] transition-colors py-2 px-3 rounded-lg hover:bg-[#0B2A4A]/5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Previous Participant</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={back}
                className="group flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#0B2A4A]/60 hover:text-[#0B2A4A] transition-colors py-2 px-3 rounded-lg hover:bg-[#0B2A4A]/5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Back to Time</span>
              </button>
            )}

            {/* Secondary link to step 3 when deeper in participant list */}
            {activeIndex > 0 && (
              <button
                type="button"
                onClick={back}
                className="text-[11.5px] text-[#0B2A4A]/40 hover:text-[#0B2A4A]/70 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Back to Time
              </button>
            )}
          </div>

          {/* Forward button: Next Participant or Review */}
          <div className="w-full sm:w-auto">
            {activeIndex < participantCount - 1 ? (
              <button
                type="button"
                onClick={handleNextParticipant}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 h-[48px] px-7 rounded-full text-[13.5px] font-semibold tracking-wide bg-[#0E5A63] text-white hover:bg-[#0b484f] shadow-[0_6px_20px_rgba(14,90,99,0.25)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Next Participant</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 h-[48px] px-8 rounded-full text-[13.5px] font-semibold tracking-wide bg-[#FF5A4F] text-white hover:bg-[#F0443A] shadow-[0_6px_20px_rgba(255,90,79,0.3)] hover:shadow-[0_8px_25px_rgba(255,90,79,0.4)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
