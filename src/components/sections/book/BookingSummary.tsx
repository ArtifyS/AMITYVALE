"use client";

import React, { useState } from "react";
import { BookingState } from "./BookPage";
import { getSessionOption } from "@/lib/pricingConfig";
import { COACHING_AREAS } from "./StepCoaching";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, ChevronDown, ChevronUp, Sparkles, Compass } from "lucide-react";

interface BookingSummaryProps {
  state: BookingState;
}

function AnimatedValue({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Mobile-only collapsible summary accordion (visible ONLY on < lg screens)
 */
export function MobileBookingSummary({ state }: BookingSummaryProps) {
  const session = state.duration ? getSessionOption(state.duration) : null;
  const coachingItem = COACHING_AREAS.find((a) => a.id === state.coachingArea);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const formattedDate = state.date
    ? state.date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  const totalFormatted = session ? `$${session.price}` : "—";

  return (
    <div className="block lg:hidden w-full mb-6">
      <div className="bg-white rounded-[16px] border border-[#FF5A4F]/25 shadow-[0_4px_16px_rgba(11,42,74,0.05)] overflow-hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between text-left select-none cursor-pointer bg-[#FCFAF8] hover:bg-white transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#FF5A4F]">
              Your Session
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              {session ? (
                <span className="text-[14px] font-semibold text-[#0B2A4A]">
                  {session.duration} min • <span className="text-[#FF5A4F]">${session.price}</span>
                </span>
              ) : (
                <span className="text-[13px] text-[#0B2A4A]/50 italic">
                  {coachingItem ? coachingItem.title : "Nothing selected yet"}
                </span>
              )}
              {state.date && state.timeSlot && (
                <span className="text-[11.5px] text-[#0E5A63] font-medium hidden sm:inline">
                  ({formattedDate} • {state.timeSlot})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11.5px] font-semibold text-[#0E5A63] shrink-0">
            <span>{mobileExpanded ? "Hide" : "Details"}</span>
            {mobileExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#0B2A4A]/[0.08] px-4 py-3 bg-white flex flex-col gap-2.5 text-[13px]"
            >
              {coachingItem && (
                <div className="flex items-center justify-between">
                  <span className="text-[#0B2A4A]/60">Coaching:</span>
                  <span className="font-semibold text-[#0B2A4A]">{coachingItem.title}</span>
                </div>
              )}
              {session && (
                <div className="flex items-center justify-between">
                  <span className="text-[#0B2A4A]/60">Session:</span>
                  <span className="font-semibold text-[#0B2A4A]">{session.duration} Min (${session.price})</span>
                </div>
              )}
              {state.date && (
                <div className="flex items-center justify-between">
                  <span className="text-[#0B2A4A]/60">Date:</span>
                  <span className="font-medium text-[#D8A23D]">{formattedDate}</span>
                </div>
              )}
              {state.timeSlot && (
                <div className="flex items-center justify-between">
                  <span className="text-[#0B2A4A]/60">Time:</span>
                  <span className="font-medium text-[#0E5A63]">{state.timeSlot}</span>
                </div>
              )}
              {state.duration && (
                <div className="flex items-center justify-between">
                  <span className="text-[#0B2A4A]/60">Format:</span>
                  <span className="font-medium text-[#0B2A4A]">
                    {state.sessionFor === "joint" ? "Joint Session" : "Individual Session"}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-[#0B2A4A]/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#0B2A4A]/60">
                  Total
                </span>
                <span className="font-serif text-[19px] font-bold text-[#FF5A4F]">
                  {totalFormatted}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Desktop-only persistent sticky summary card (visible ONLY on lg+ screens in the RIGHT column)
 */
export function DesktopBookingSummary({ state }: BookingSummaryProps) {
  const session = state.duration ? getSessionOption(state.duration) : null;
  const coachingItem = COACHING_AREAS.find((a) => a.id === state.coachingArea);

  const formattedDate = state.date
    ? state.date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

  const totalFormatted = session ? `$${session.price}` : "—";

  return (
    <aside className="w-full sticky top-[96px]">
      <div className="relative bg-white rounded-[22px] border-[1.5px] border-[#FF5A4F]/25 shadow-[0_14px_36px_rgba(11,42,74,0.06)] overflow-hidden flex flex-col">
        
        {/* Subtle Decorative Corner Motif */}
        <div
          className="absolute top-3 right-3 w-14 h-14 pointer-events-none select-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, #FF5A4F 0.85px, transparent 1.1px), radial-gradient(circle, #D8A23D 0.75px, transparent 1.0px)`,
            backgroundSize: "7px 7px, 7px 7px",
            backgroundPosition: "0 0, 3.5px 3.5px",
            maskImage: "radial-gradient(circle at top right, black 25%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at top right, black 25%, transparent 80%)",
          }}
        />

        {/* Card Body */}
        <div className="p-6 xl:p-7 flex flex-col relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#FF5A4F]">
              Your Session
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A4F]" />
          </div>

          {/* Empty State when nothing chosen */}
          {!coachingItem && !session ? (
            <div className="py-5 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-[#FCFAF8] border border-dashed border-[#0B2A4A]/15 flex items-center justify-center text-[#0B2A4A]/30 mb-2.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-[13.5px] text-[#0B2A4A]/55 italic">
                Nothing selected yet.
              </p>
              <p className="text-[11.5px] text-[#0B2A4A]/40 mt-1 max-w-[200px]">
                Choose your coaching area on the left to begin your summary.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {/* 1. Coaching Area */}
              {coachingItem && (
                <AnimatedValue id={`coaching-${coachingItem.id}`}>
                  <div className="flex items-start gap-2.5 pb-3 border-b border-[#0B2A4A]/[0.07]">
                    <div className="w-6 h-6 rounded-full bg-[#0B2A4A]/5 flex items-center justify-center text-[#0B2A4A]/60 shrink-0 mt-0.5">
                      <Compass className="w-3.5 h-3.5" style={{ color: coachingItem.accentColor }} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/45">
                        Coaching
                      </span>
                      <span className="text-[13.5px] font-semibold text-[#0B2A4A]">
                        {coachingItem.title}
                      </span>
                    </div>
                  </div>
                </AnimatedValue>
              )}

              {/* 2. Session Duration & Price */}
              {session && (
                <AnimatedValue id={`session-${session.duration}`}>
                  <div className="flex items-start justify-between pb-3 border-b border-[#0B2A4A]/[0.07]">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/45 block">
                        Session
                      </span>
                      <span className="font-serif text-[18px] font-semibold text-[#0B2A4A] leading-tight">
                        {session.duration} Minutes
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#FF5A4F] block">
                        Price
                      </span>
                      <span className="font-serif text-[18px] font-semibold text-[#0B2A4A]">
                        ${session.price}
                      </span>
                    </div>
                  </div>
                </AnimatedValue>
              )}

              {/* 3. Date */}
              {state.date && (
                <AnimatedValue id={`date-${state.date.toISOString()}`}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#D8A23D]/15 flex items-center justify-center text-[#D8A23D] shrink-0 mt-0.5">
                      <Calendar className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/45">
                        Date
                      </span>
                      <span className="text-[13px] font-medium text-[#0B2A4A]">
                        {state.date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </AnimatedValue>
              )}

              {/* 4. Time */}
              {state.timeSlot && (
                <AnimatedValue id={`time-${state.timeSlot}`}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#0E5A63]/10 flex items-center justify-center text-[#0E5A63] shrink-0 mt-0.5">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/45">
                        Time
                      </span>
                      <span className="text-[13px] font-medium text-[#0E5A63]">
                        {state.timeSlot}
                      </span>
                    </div>
                  </div>
                </AnimatedValue>
              )}

              {/* 5. Format (Individual or Joint) */}
              {state.duration && (
                <AnimatedValue id={`format-${state.sessionFor}`}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#0B2A4A]/5 flex items-center justify-center text-[#0B2A4A]/60 shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B2A4A]/45">
                        Format
                      </span>
                      <span className="text-[13px] font-medium text-[#0B2A4A]">
                        {state.sessionFor === "joint" ? "Joint Session" : "Individual Session"}
                      </span>
                    </div>
                  </div>
                </AnimatedValue>
              )}
            </div>
          )}
        </div>

        {/* Lower Total Area */}
        <div className="mt-auto bg-[#FCFAF8] p-5 xl:p-6 border-t border-[#0B2A4A]/[0.08] flex items-center justify-between">
          <div>
            <span className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#0B2A4A]/65 block">
              Total
            </span>
            <span className="text-[11px] text-[#0B2A4A]/45">
              {session ? "All fees included" : "Awaiting selection"}
            </span>
          </div>
          <div className="text-right">
            <span className="font-serif text-[26px] font-bold text-[#0B2A4A] leading-none">
              {totalFormatted}
            </span>
            {session && (
              <span className="block text-[9.5px] font-semibold uppercase tracking-wider text-[#0B2A4A]/45 mt-0.5">
                USD
              </span>
            )}
          </div>
        </div>

      </div>
    </aside>
  );
}

// Default export for backward compatibility
export const BookingSummary = DesktopBookingSummary;
