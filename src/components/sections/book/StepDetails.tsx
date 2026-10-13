import React, { FormEvent, useState } from "react";
import { BookingState } from "./BookPage";

export function StepDetails({ state, setState, next, back }: { state: BookingState, setState: (updates: Partial<BookingState>) => void, next: () => void, back: () => void }) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndNext = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!state.firstName.trim()) newErrors.firstName = "Please enter your first name.";
    if (!state.lastName.trim()) newErrors.lastName = "Please enter your last name.";
    if (!state.email.trim() || !/^\S+@\S+\.\S+$/.test(state.email)) newErrors.email = "Please enter a valid email address.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      next();
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-serif text-[28px] md:text-[32px] text-[#161514] mb-2">
        A Few Details Before We Confirm.
      </h2>
      <p className="text-[15px] text-[#161514]/70 mb-10 max-w-[500px]">
        Tell us who this session is for and how we can reach you.
      </p>

      <form onSubmit={validateAndNext} className="flex flex-col gap-10">
        
        {/* Who is it for */}
        <div className="flex flex-col gap-4">
          <label className="font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#161514]/60">
            Who is this session for?
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setState({ sessionFor: "individual" })}
              className={`flex-1 h-[60px] flex items-center justify-center rounded-[8px] border-[1px] text-[14px] transition-colors ${
                state.sessionFor === "individual" 
                  ? "border-[#161514] bg-[#161514] text-white" 
                  : "border-[#161514]/10 bg-white text-[#161514] hover:border-[#161514]/30"
              }`}
            >
              Just Me
            </button>
            <button
              type="button"
              onClick={() => setState({ sessionFor: "couple" })}
              className={`flex-1 h-[60px] flex items-center justify-center rounded-[8px] border-[1px] text-[14px] transition-colors ${
                state.sessionFor === "couple" 
                  ? "border-[#161514] bg-[#161514] text-white" 
                  : "border-[#161514]/10 bg-white text-[#161514] hover:border-[#161514]/30"
              }`}
            >
              My Partner and Me
            </button>
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#161514]/70">First Name <span className="text-[#FF5A4F]">*</span></label>
            <input
              type="text"
              autoComplete="given-name"
              value={state.firstName}
              onChange={e => { setState({ firstName: e.target.value }); if(errors.firstName) setErrors(prev => ({...prev, firstName: ""})); }}
              className={`h-[48px] px-4 rounded-[6px] border-[1px] bg-white focus:outline-none focus:border-[#FF5A4F] ${errors.firstName ? "border-red-500" : "border-[#161514]/10"}`}
            />
            {errors.firstName && <span className="text-red-500 text-[11px]">{errors.firstName}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#161514]/70">Last Name <span className="text-[#FF5A4F]">*</span></label>
            <input
              type="text"
              autoComplete="family-name"
              value={state.lastName}
              onChange={e => { setState({ lastName: e.target.value }); if(errors.lastName) setErrors(prev => ({...prev, lastName: ""})); }}
              className={`h-[48px] px-4 rounded-[6px] border-[1px] bg-white focus:outline-none focus:border-[#FF5A4F] ${errors.lastName ? "border-red-500" : "border-[#161514]/10"}`}
            />
            {errors.lastName && <span className="text-red-500 text-[11px]">{errors.lastName}</span>}
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-[13px] text-[#161514]/70">Email Address <span className="text-[#FF5A4F]">*</span></label>
            <input
              type="email"
              autoComplete="email"
              value={state.email}
              onChange={e => { setState({ email: e.target.value }); if(errors.email) setErrors(prev => ({...prev, email: ""})); }}
              className={`h-[48px] px-4 rounded-[6px] border-[1px] bg-white focus:outline-none focus:border-[#FF5A4F] ${errors.email ? "border-red-500" : "border-[#161514]/10"}`}
            />
            {errors.email && <span className="text-red-500 text-[11px]">{errors.email}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] text-[#161514]/70">Phone Number <span className="text-[#161514]/40 italic">(Optional)</span></label>
            <input
              type="tel"
              autoComplete="tel"
              value={state.phone}
              onChange={e => setState({ phone: e.target.value })}
              className="h-[48px] px-4 rounded-[6px] border-[1px] border-[#161514]/10 bg-white focus:outline-none focus:border-[#FF5A4F]"
            />
          </div>
          {state.sessionFor === "couple" && (
            <div className="flex flex-col gap-2">
              <label className="text-[13px] text-[#161514]/70">Partner's First Name <span className="text-[#161514]/40 italic">(Optional)</span></label>
              <input
                type="text"
                value={state.partnerName}
                onChange={e => setState({ partnerName: e.target.value })}
                className="h-[48px] px-4 rounded-[6px] border-[1px] border-[#161514]/10 bg-white focus:outline-none focus:border-[#FF5A4F]"
              />
            </div>
          )}
        </div>

        {/* Note */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] text-[#161514]/70">
            Is there anything you would like Angel to know before the session?
            <span className="block text-[#161514]/40 italic mt-1">Optional â€” a few sentences are enough.</span>
          </label>
          <textarea
            rows={4}
            value={state.contextNote}
            onChange={e => setState({ contextNote: e.target.value })}
            className="p-4 rounded-[6px] border-[1px] border-[#161514]/10 bg-white focus:outline-none focus:border-[#FF5A4F] resize-y"
          />
        </div>

        <p className="text-[11px] text-[#161514]/40 italic">
          Your information is used to arrange and manage your private session.
        </p>

        <div className="flex items-center justify-between pt-6 border-t-[1px] border-[#161514]/10">
          <button
            type="button"
            onClick={back}
            className="text-[13px] font-medium uppercase tracking-wide text-[#161514]/60 hover:text-[#161514]"
          >
            &larr; Back
          </button>
          <button
            type="submit"
            className="flex items-center justify-center h-[50px] px-8 rounded-[3px] text-[13px] font-medium tracking-wide uppercase transition-colors bg-[#161514] text-white hover:bg-[#161514]/90"
          >
            Review Booking &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}
