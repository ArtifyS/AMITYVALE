"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AdminBooking } from "@/lib/admin/types";
import { useAdminData } from "@/components/admin/AdminDataContext";
import { BookingDetailsDrawer } from "@/components/admin/BookingDetailsDrawer";
import { useToast } from "@/components/admin/ToastProvider";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Users,
  ExternalLink,
  Sparkles,
} from "lucide-react";

type CalendarView = "month" | "week" | "day";

export default function AdminCalendarPage() {
  const { toast } = useToast();
  const { bookings, updateBooking, isLoaded } = useAdminData();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>("week");
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);

  const handleBookingMutated = (updated: AdminBooking) => {
    updateBooking(updated);
    if (selectedBooking?.id === updated.id) {
      setSelectedBooking(updated);
    }
    toast("Booking schedule updated");
  };

  const openDrawer = (b: AdminBooking) => {
    setSelectedBooking(b);
    setIsDrawerOpen(true);
  };

  // Date Navigation
  const handleToday = () => setCurrentDate(new Date());

  const handlePrev = () => {
    const next = new Date(currentDate);
    if (view === "month") next.setMonth(next.getMonth() - 1);
    else if (view === "week") next.setDate(next.getDate() - 7);
    else next.setDate(next.getDate() - 1);
    setCurrentDate(next);
  };

  const handleNext = () => {
    const next = new Date(currentDate);
    if (view === "month") next.setMonth(next.getMonth() + 1);
    else if (view === "week") next.setDate(next.getDate() + 7);
    else next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  // Header Title
  const headerDateLabel = useMemo(() => {
    if (view === "month") {
      return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
    if (view === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    // Week range
    const start = new Date(currentDate);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday
    start.setDate(diff);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  }, [currentDate, view]);

  // Week days calculation (Monday to Sunday)
  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      const isToday = iso === new Date().toISOString().split("T")[0];
      return {
        date: d,
        iso,
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: d.getDate(),
        isToday,
      };
    });
  }, [currentDate]);

  // Connect Google Calendar mock action
  const handleConnectGoogle = () => {
    setGoogleConnected(true);
    toast("Google Calendar connect UI ready (OAuth integration connects in Phase 5)");
  };

  return (
    <div className="space-y-6">
      {/* HEADER & GOOGLE CALENDAR BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-200/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Calendar
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Review appointments, consultation windows, and live Google Meet schedules.
          </p>
        </div>

        {/* GOOGLE CALENDAR STATUS & BUTTON */}
        <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-stone-200/80 shadow-2xs self-start sm:self-auto text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                googleConnected ? "bg-emerald-500" : "bg-stone-300"
              }`}
            />
            <span className="font-semibold text-stone-800">Google Calendar:</span>
            <span className="text-stone-500">
              {googleConnected ? "Sync Simulated" : "Not Connected"}
            </span>
          </div>

          <button
            onClick={handleConnectGoogle}
            className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-colors shadow-2xs ${
              googleConnected
                ? "bg-stone-100 text-stone-600 hover:bg-stone-200"
                : "bg-[#0B2A4A] text-white hover:bg-[#143B63]"
            }`}
          >
            {googleConnected ? "Settings" : "Connect Google Calendar"}
          </button>
        </div>
      </div>

      {/* CALENDAR CONTROLS BAR */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToday}
            className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
          >
            Today
          </button>

          <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50">
            <button
              onClick={handlePrev}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-l-lg transition-colors"
              aria-label="Previous period"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-stone-200" />
            <button
              onClick={handleNext}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-r-lg transition-colors"
              aria-label="Next period"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="text-sm font-bold text-stone-900 ml-2">
            {headerDateLabel}
          </span>
        </div>

        {/* View Switcher: Month / Week / Day (Default: Week) */}
        <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200/80">
          {(["month", "week", "day"] as CalendarView[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                view === v
                  ? "bg-white text-stone-900 font-semibold shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* CALENDAR VIEW GRID */}
      {view === "week" && (
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-50/70 text-xs">
            {weekDays.map((d) => (
              <div
                key={d.iso}
                className={`py-3 px-2 text-center border-r last:border-r-0 border-stone-200 ${
                  d.isToday ? "bg-amber-50/40" : ""
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  {d.dayName}
                </div>
                <div
                  className={`mt-1 font-mono text-sm inline-flex items-center justify-center w-7 h-7 rounded-full font-bold ${
                    d.isToday
                      ? "bg-[#0B2A4A] text-white"
                      : "text-stone-800"
                  }`}
                >
                  {d.dayNumber}
                </div>
              </div>
            ))}
          </div>

          {/* Week Columns / Event Slots */}
          <div className="grid grid-cols-7 min-h-[520px] divide-x divide-stone-100">
            {weekDays.map((d) => {
              const dayBookings = bookings.filter((b) => b.sessionDate === d.iso);

              return (
                <div
                  key={d.iso}
                  className={`p-2 space-y-2 text-xs flex flex-col ${
                    d.isToday ? "bg-amber-50/10" : ""
                  }`}
                >
                  {dayBookings.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[11px] text-stone-300 italic p-4 text-center">
                      Open slot
                    </div>
                  ) : (
                    dayBookings.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => openDrawer(b)}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer shadow-2xs hover:shadow-xs text-left ${
                          b.status === "cancelled"
                            ? "bg-stone-100/70 border-stone-200 text-stone-500 opacity-60"
                            : b.status === "completed"
                            ? "bg-stone-50 border-stone-200/80 text-stone-700"
                            : "bg-[#0B2A4A]/5 border-[#0B2A4A]/20 text-stone-900 hover:border-[#0B2A4A]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-stone-700 mb-1">
                          <span>{b.sessionTime}</span>
                          <span className="text-[10px] text-stone-400 font-sans">
                            {b.duration}m
                          </span>
                        </div>

                        <div className="font-semibold text-stone-900 text-xs truncate">
                          {b.primaryClientName}
                        </div>

                        <div className="text-[10px] text-stone-500 truncate mt-0.5">
                          {b.coachingArea}
                        </div>

                        {b.googleMeetLink && (
                          <div className="mt-1.5 pt-1.5 border-t border-stone-200/60 flex items-center gap-1 text-[10px] text-teal-700 font-medium">
                            <Video className="w-3 h-3" />
                            <span>Meet Ready</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DAY VIEW */}
      {view === "day" && (
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-bold text-stone-900 text-sm">
              Schedule for {headerDateLabel}
            </h3>
            <span className="text-xs text-stone-400">Timezone: America/New_York (EST)</span>
          </div>

          {bookings.filter((b) => b.sessionDate === currentDate.toISOString().split("T")[0]).length === 0 ? (
            <div className="py-16 text-center text-xs text-stone-400">
              No sessions scheduled for this day.
            </div>
          ) : (
            <div className="space-y-3">
              {bookings
                .filter((b) => b.sessionDate === currentDate.toISOString().split("T")[0])
                .map((b) => (
                  <div
                    key={b.id}
                    onClick={() => openDrawer(b)}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition-colors cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-lg border border-stone-200 font-mono font-bold text-xs text-stone-800 text-center min-w-[80px]">
                        <div>{b.sessionTime}</div>
                        <div className="text-[10px] text-stone-400 font-sans mt-0.5">
                          {b.duration} mins
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-stone-900 text-sm">
                          {b.primaryClientName}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {b.coachingArea} {b.coachingSubArea ? `· ${b.coachingSubArea}` : ""} · {b.participantCount} attendee(s)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.googleMeetLink && (
                        <a
                          href={b.googleMeetLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-2xs"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join</span>
                        </a>
                      )}
                      <button
                        onClick={() => openDrawer(b)}
                        className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg shadow-2xs"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* MONTH VIEW */}
      {view === "month" && (
        <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs p-6 text-center text-xs text-stone-500 space-y-4">
          <div className="text-sm font-bold text-stone-900">
            Month Overview — {headerDateLabel}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {bookings.map((b) => (
              <div
                key={b.id}
                onClick={() => openDrawer(b)}
                className="p-3 bg-stone-50 border border-stone-200 rounded-lg hover:border-stone-400 cursor-pointer transition-colors"
              >
                <div className="font-mono text-[11px] font-bold text-stone-800">
                  {b.sessionDate} · {b.sessionTime}
                </div>
                <div className="font-semibold text-stone-900 text-xs mt-1 truncate">
                  {b.primaryClientName}
                </div>
                <div className="text-[11px] text-stone-400 truncate">
                  {b.coachingArea}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REUSED BOOKING DETAILS DRAWER */}
      <BookingDetailsDrawer
        booking={selectedBooking}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onBookingUpdated={handleBookingMutated}
      />
    </div>
  );
}
