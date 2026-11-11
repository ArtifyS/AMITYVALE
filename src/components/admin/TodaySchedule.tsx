"use client";

import React, { useState } from "react";
import { AdminBooking } from "@/lib/admin/types";
import { StatusBadge } from "./StatusBadge";
import { BookingDetailModal } from "./BookingDetailModal";
import { Clock, Video, Users, ExternalLink, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

interface TodayScheduleProps {
  bookings: AdminBooking[];
}

export function TodaySchedule({ bookings }: TodayScheduleProps) {
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);

  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <>
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Card Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-semibold text-stone-900 tracking-tight">
              Today&apos;s Schedule
            </h2>
            <span className="text-xs text-stone-400 font-normal">({todayFormatted})</span>
          </div>
          <Link
            href="/admin/calendar"
            className="text-xs font-medium text-[#0B2A4A] hover:text-[#FF5A4F] flex items-center gap-1 transition-colors"
          >
            Open Calendar <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* List of Sessions */}
        {bookings.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-stone-700">No sessions scheduled for today</p>
            <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
              Your calendar is open today. Use this time for client check-ins or article writing.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 sm:p-5 hover:bg-stone-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Time & Client */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center min-w-[76px] px-3 py-2 bg-stone-100/90 rounded-lg text-stone-800 border border-stone-200/60">
                    <span className="text-xs font-bold font-mono tracking-tight">
                      {booking.sessionTime}
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium mt-0.5">
                      {booking.duration} mins
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-stone-900">
                        {booking.primaryClientName}
                      </span>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="mt-1 flex items-center gap-3 text-xs text-stone-500 flex-wrap">
                      <span className="font-medium text-stone-700">{booking.coachingArea}</span>
                      {booking.coachingSubArea && (
                        <>
                          <span className="text-stone-300">•</span>
                          <span>{booking.coachingSubArea}</span>
                        </>
                      )}
                      <span className="text-stone-300">•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-stone-400" />
                        {booking.participantCount}{" "}
                        {booking.participantCount === 1 ? "person" : "people"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors shadow-2xs"
                  >
                    Intake Details
                  </button>

                  {booking.googleMeetLink && (
                    <a
                      href={booking.googleMeetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Join Meet
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BookingDetailModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
}

