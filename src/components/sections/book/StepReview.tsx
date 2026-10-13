import React from "react";
import { BookingState } from "./BookPage";
import { getSessionOption } from "@/lib/pricingConfig";
import { useRouter } from "next/navigation";

export function StepReview({ state, gotoStep, back }: { state: BookingState, gotoStep: (step: number) => void, back: () => void }) {
  const router = useRouter();
  const session = state.duration ? getSessionOption(state.duration) : null;

  const handleCheckout = () => {
    // In a real app, this would create a Stripe Checkout Session or similar
    // For now, redirect to confirmation page
    router.push("/book/confirmed");
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-serif text-[28px] md:text-[32px] text-[#161514] mb-8">
        Review Your Session.
      </h2>

      <div className="bg-white p-8 md:p-10 rounded-[16px] border-[1px] border-[#161514]/10 mb-10 flex flex-col gap-8 shadow-[0_12px_30px_rgba(0,0,0,0.02)]">
        
        {/* Session Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b-[1px] border-[#161514]/10">
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#FF5A4F] mb-1">
              {session?.label}
            </span>
            <h3 className="font-serif text-[24px] text-[#161514]">
              {session?.duration} Minutes
            </h3>
          </div>
          <button onClick={() => gotoStep(1)} className="text-[12px] font-medium tracking-wide uppercase text-[#161514]/50 hover:text-[#FF5A4F] text-left md:text-right">
            Change Session
          </button>
        </div>

        {/* Date & Time */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-8 border-b-[1px] border-[#161514]/10">
          <div className="flex flex-col gap-1 text-[15px] text-[#161514]">
            <span className="font-medium">
              {state.date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
            <span>{state.timeSlot}</span>
            <span className="text-[#161514]/50 text-[13px] mt-1">{state.timezone.replace("_", " ")}</span>
            <span className="text-[#161514]/50 text-[13px] mt-2 italic">Online</span>
          </div>
          <button onClick={() => gotoStep(2)} className="text-[12px] font-medium tracking-wide uppercase text-[#161514]/50 hover:text-[#FF5A4F] text-left md:text-right mt-1">
            Change Time
          </button>
        </div>

        {/* Details */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-8 border-b-[1px] border-[#161514]/10">
          <div className="flex flex-col gap-1 text-[15px] text-[#161514]">
            <span className="text-[#161514]/60 text-[13px] mb-1 uppercase tracking-wide">For: {state.sessionFor === "couple" ? "My Partner and Me" : "Individual Session"}</span>
            <span className="font-medium">{state.firstName} {state.lastName}</span>
            <span>{state.email}</span>
            {state.phone && <span>{state.phone}</span>}
          </div>
          <button onClick={() => gotoStep(3)} className="text-[12px] font-medium tracking-wide uppercase text-[#161514]/50 hover:text-[#FF5A4F] text-left md:text-right mt-1">
            Edit Details
          </button>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-sans text-[13px] font-medium tracking-[0.16em] uppercase text-[#161514]/60">
            Session Total
          </span>
          <span className="font-serif text-[32px] text-[#161514]">
            ${session?.price}
          </span>
        </div>

      </div>

      <div className="flex flex-col gap-4 items-center max-w-[400px] mx-auto w-full">
        <button
          onClick={handleCheckout}
          className="flex items-center justify-center w-full h-[54px] rounded-[3px] text-[14px] font-medium tracking-wide uppercase transition-colors bg-[#FF5A4F] text-white hover:bg-[#F0443A] shadow-[0_8px_20px_rgba(233,130,103,0.2)]"
        >
          Continue to Secure Payment
        </button>
        <p className="text-[11px] text-[#161514]/40 text-center">
          You will review the payment details before completing your booking.
        </p>
      </div>
      
      <div className="mt-12 text-center">
        <button
          onClick={back}
          className="text-[13px] font-medium uppercase tracking-wide text-[#161514]/50 hover:text-[#161514]"
        >
          &larr; Back to Details
        </button>
      </div>

    </div>
  );
}
