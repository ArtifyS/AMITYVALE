"use client";

import React, { FormEvent, useState } from "react";
import { BookingState } from "./BookPage";
import { ArrowRight, ArrowLeft, User, Users } from "lucide-react";

interface StepDetailsProps {
  state: BookingState;
  setState: (updates: Partial<BookingState>) => void;
  next: () => void;
  back: () => void;
}

export function StepDetails({ state, setState, next, back }: StepDetailsProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isFormValid =
    state.firstName.trim().length > 0 &&
    state.lastName.trim().length > 0 &&
    state.email.trim().length > 0 &&
    /^\S+@\S+\.\S+$/.test(state.email.trim());

  const validateAndNext = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!state.firstName.trim()) {
      newErrors.firstName = "Please enter your first name.";
    }
    if (!state.lastName.trim()) {
      newErrors.lastName = "Please enter your last name.";
    }
    if (!state.email.trim() || !/^\S+@\S+\.\S+$/.test(state.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      next();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[740px] mx-auto">
      {/* Step Heading */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[36px] text-[#0B2A4A] tracking-[-0.01em] leading-tight mb-2">
          Your Details
        </h2>
        <p className="text-[14.5px] sm:text-[15.5px] text-[#0B2A4A]/70 leading-relaxed">
          Tell us who this session is for and where to send your confirmation.
        </p>
      </div>

      <form onSubmit={validateAndNext} className="flex flex-col gap-6">
        {/* Session Format: EXACTLY TWO CHOICES (Universal Individual vs Joint) */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#0B2A4A]/70">
            Session Format
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. INDIVIDUAL SESSION */}
            <button
              type="button"
              onClick={() => setState({ sessionFor: "individual" })}
              className={`p-4 rounded-[16px] border text-left flex items-start gap-3.5 transition-all duration-200 cursor-pointer ${
                state.sessionFor === "individual"
                  ? "border-[#FF5A4F] bg-[#FF5A4F]/[0.04] ring-2 ring-[#FF5A4F]/20 shadow-sm"
                  : "border-[#0B2A4A]/12 bg-white hover:border-[#0B2A4A]/30"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  state.sessionFor === "individual"
                    ? "bg-[#FF5A4F] text-white"
                    : "bg-[#0B2A4A]/5 text-[#0B2A4A]/50"
                }`}
              >
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-[14px] font-semibold text-[#0B2A4A]">
                  INDIVIDUAL SESSION
                </span>
                <span className="block text-[12.5px] text-[#0B2A4A]/65 mt-0.5">
                  Just you and Angel.
                </span>
              </div>
            </button>

            {/* 2. JOINT SESSION */}
            <button
              type="button"
              onClick={() => setState({ sessionFor: "joint" })}
              className={`p-4 rounded-[16px] border text-left flex items-start gap-3.5 transition-all duration-200 cursor-pointer ${
                state.sessionFor === "joint"
                  ? "border-[#FF5A4F] bg-[#FF5A4F]/[0.04] ring-2 ring-[#FF5A4F]/20 shadow-sm"
                  : "border-[#0B2A4A]/12 bg-white hover:border-[#0B2A4A]/30"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  state.sessionFor === "joint"
                    ? "bg-[#FF5A4F] text-white"
                    : "bg-[#0B2A4A]/5 text-[#0B2A4A]/50"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-[14px] font-semibold text-[#0B2A4A]">
                  JOINT SESSION
                </span>
                <span className="block text-[12.5px] text-[#0B2A4A]/65 mt-0.5">
                  With a partner, family member, friend, or another person.
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Input Fields Card */}
        <div className="bg-white rounded-[20px] border border-[#0B2A4A]/10 p-6 sm:p-7 shadow-[0_10px_30px_rgba(11,42,74,0.03)] flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
              >
                First Name <span className="text-[#FF5A4F]">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                value={state.firstName}
                onChange={(e) => {
                  setState({ firstName: e.target.value });
                  if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                }}
                className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                  errors.firstName ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10" : "border-[#0B2A4A]/15"
                }`}
                placeholder="e.g. Sarah"
              />
              {errors.firstName && (
                <span className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                  {errors.firstName}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
              >
                Last Name <span className="text-[#FF5A4F]">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                value={state.lastName}
                onChange={(e) => {
                  setState({ lastName: e.target.value });
                  if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                }}
                className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                  errors.lastName ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10" : "border-[#0B2A4A]/15"
                }`}
                placeholder="e.g. Jenkins"
              />
              {errors.lastName && (
                <span className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                  {errors.lastName}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col sm:col-span-2">
              <label
                htmlFor="email"
                className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
              >
                Email Address <span className="text-[#FF5A4F]">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={state.email}
                onChange={(e) => {
                  setState({ email: e.target.value });
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                className={`h-[46px] px-4 rounded-[12px] border bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all ${
                  errors.email ? "border-[#FF5A4F] ring-2 ring-[#FF5A4F]/10" : "border-[#0B2A4A]/15"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="text-[#FF5A4F] text-[11.5px] mt-1 font-medium">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone Number (Optional) */}
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
              >
                Phone Number <span className="text-[#0B2A4A]/40 font-normal italic">(Optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={state.phone}
                onChange={(e) => setState({ phone: e.target.value })}
                className="h-[46px] px-4 rounded-[12px] border border-[#0B2A4A]/15 bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Other Participant Name (If Joint Session) */}
            {state.sessionFor === "joint" && (
              <div className="flex flex-col">
                <label
                  htmlFor="otherParticipantName"
                  className="text-[12.5px] font-medium text-[#0B2A4A] mb-1.5"
                >
                  Other Participant Name <span className="text-[#0B2A4A]/40 font-normal italic">(Optional)</span>
                </label>
                <input
                  id="otherParticipantName"
                  type="text"
                  value={state.otherParticipantName}
                  onChange={(e) => setState({ otherParticipantName: e.target.value })}
                  className="h-[46px] px-4 rounded-[12px] border border-[#0B2A4A]/15 bg-white text-[14px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all"
                  placeholder="e.g. Alex"
                />
              </div>
            )}
          </div>

          {/* Context Note (Optional) */}
          <div className="flex flex-col pt-3 border-t border-[#0B2A4A]/[0.08]">
            <label
              htmlFor="contextNote"
              className="text-[12.5px] font-medium text-[#0B2A4A] mb-1"
            >
              What would you like to discuss?
            </label>
            <span className="text-[11.5px] text-[#0B2A4A]/50 italic mb-2">
              Optional — a few sentences are enough.
            </span>
            <textarea
              id="contextNote"
              rows={3}
              value={state.contextNote}
              onChange={(e) => setState({ contextNote: e.target.value })}
              placeholder="Share what is currently happening or what you hope to address in the session..."
              className="p-3.5 rounded-[12px] border border-[#0B2A4A]/15 bg-white text-[13.5px] text-[#0B2A4A] placeholder:text-[#0B2A4A]/30 focus:outline-none focus:border-[#FF5A4F] focus:ring-2 focus:ring-[#FF5A4F]/20 transition-all resize-y"
            />
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-[#0B2A4A]/[0.06]">
          <button
            type="button"
            onClick={back}
            className="group flex items-center gap-2 text-[13px] font-semibold tracking-wide text-[#0B2A4A]/60 hover:text-[#0B2A4A] transition-colors py-2 px-3 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Time</span>
          </button>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`group flex items-center justify-center gap-2 h-[48px] px-8 rounded-full text-[13.5px] font-semibold tracking-wide transition-all duration-200 ${
              isFormValid
                ? "bg-[#FF5A4F] text-white hover:bg-[#F0443A] shadow-[0_6px_20px_rgba(255,90,79,0.3)] hover:shadow-[0_8px_25px_rgba(255,90,79,0.4)] hover:-translate-y-0.5 cursor-pointer"
                : "bg-[#0B2A4A]/10 text-[#0B2A4A]/40 cursor-not-allowed"
            }`}
          >
            <span>Review Booking</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
