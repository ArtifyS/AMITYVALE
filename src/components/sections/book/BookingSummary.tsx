import React from "react";
import { BookingState } from "./BookPage";
import { getSessionOption } from "@/lib/pricingConfig";
import { motion } from "framer-motion";

export function BookingSummary({ state }: { state: BookingState }) {
  const session = state.duration ? getSessionOption(state.duration) : null;

  return (
    <div className="w-full bg-[#FCFAF8] rounded-[16px] border-[1px] border-[#161514]/5 shadow-[0_12px_30px_rgba(0,0,0,0.03)] flex flex-col overflow-hidden">
      
      {/* Mobile Header (can be made collapsible, keeping simple for now) */}
      <div className="p-6 md:p-8 flex flex-col">
        <h3 className="font-sans text-[11px] font-medium tracking-[0.16em] uppercase text-[#E98267] mb-6">
          Your Session
        </h3>

        {!session ? (
          <div className="text-[14px] text-[#161514]/40 italic">
            No session selected yet.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            {/* Session Info */}
            <div className="flex flex-col">
              <span className="font-serif text-[20px] text-[#161514] leading-tight mb-1">
                {session.label}
              </span>
              <span className="font-sans text-[13px] tracking-widest uppercase text-[#161514]/50">
                {session.duration} Min
              </span>
            </div>

            {/* Progressively reveal other details */}
            {state.date && state.timeSlot && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-col border-t-[1px] border-[#161514]/5 pt-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#161514]/40 mb-2">
                  Date & Time
                </span>
                <span className="font-sans text-[14px] text-[#161514]">
                  {state.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </span>
                <span className="font-sans text-[14px] text-[#161514]">
                  {state.timeSlot}
                </span>
                <span className="font-sans text-[11px] text-[#161514]/50 mt-1">
                  {state.timezone.replace("_", " ")}
                </span>
              </motion.div>
            )}

            {state.step > 2 && state.firstName && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-col border-t-[1px] border-[#161514]/5 pt-6">
                <span className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#161514]/40 mb-2">
                  Session For
                </span>
                <span className="font-sans text-[14px] text-[#161514] capitalize">
                  {state.sessionFor === "couple" ? "My Partner and Me" : "Individual Session"}
                </span>
                <span className="font-sans text-[14px] text-[#161514]">
                  {state.firstName} {state.lastName}
                </span>
              </motion.div>
            )}

          </motion.div>
        )}
      </div>

      {/* Footer / Total */}
      <div className="mt-auto bg-[#161514]/[0.02] p-6 md:p-8 flex items-center justify-between border-t-[1px] border-[#161514]/5">
        <span className="font-sans text-[12px] font-medium tracking-[0.16em] uppercase text-[#161514]/60">
          Total
        </span>
        <span className="font-serif text-[28px] text-[#161514] leading-none">
          {session ? `$${session.price}` : "—"}
        </span>
      </div>

    </div>
  );
}
