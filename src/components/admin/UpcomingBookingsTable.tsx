"use client";

import React, { useState } from "react";
import { AdminBooking } from "@/lib/admin/types";
import { StatusBadge } from "./StatusBadge";
import { BookingDetailModal } from "./BookingDetailModal";
import { Calendar, ChevronRight, Eye, Users } from "lucide-react";
import Link from "next/link";

interface UpcomingBookingsTableProps {
  bookings: AdminBooking[];
}

export function UpcomingBookingsTable({ bookings }: UpcomingBookingsTableProps) {
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-stone-900 tracking-tight">
              Upcoming Sessions
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Next confirmed client sessions across all coaching areas
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-medium text-[#0B2A4A] hover:text-[#FF5A4F] flex items-center gap-1 transition-colors"
          >
            All Bookings <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/70 border-b border-stone-100 text-stone-500 font-medium">
              <tr>
                <th className="py-3 px-4 font-medium">Date & Time</th>
                <th className="py-3 px-4 font-medium">Client / Attendees</th>
                <th className="py-3 px-4 font-medium">Focus Area</th>
                <th className="py-3 px-4 font-medium">Duration</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-stone-400">
                    No upcoming sessions found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-stone-50/60 transition-colors group cursor-pointer"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="py-3.5 px-4 font-medium text-stone-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        <div>
                          <div>{booking.sessionDate}</div>
                          <div className="text-[11px] text-stone-400 font-normal">
                            {booking.sessionTime}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900">
                        {booking.primaryClientName}
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3 text-stone-400" />
                        {booking.participantCount}{" "}
                        {booking.participantCount === 1 ? "participant" : "participants"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-stone-800 font-medium">{booking.coachingArea}</div>
                      {booking.coachingSubArea && (
                        <div className="text-[11px] text-stone-400">
                          {booking.coachingSubArea}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-stone-600 whitespace-nowrap">
                      {booking.duration} mins
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-stone-900 font-mono">
                        ${booking.amountTotal}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBooking(booking);
                        }}
                        className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                        title="View Full Intake Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BookingDetailModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  );
}

