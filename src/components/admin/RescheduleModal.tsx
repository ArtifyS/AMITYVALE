"use client";

import React, { useState, useEffect } from "react";
import { AdminBooking } from "@/lib/admin/types";
import { useAdminData } from "./AdminDataContext";
import { X, Calendar, Clock, AlertCircle } from "lucide-react";

interface RescheduleModalProps {
  booking: AdminBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onRescheduled: (updated: AdminBooking) => void;
}

export function RescheduleModal({
  booking,
  isOpen,
  onClose,
  onRescheduled,
}: RescheduleModalProps) {
  const { reschedule } = useAdminData();
  const [newDate, setNewDate] = useState(booking?.sessionDate ?? "");
  const [newTime, setNewTime] = useState(booking?.sessionTime ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (booking) {
      setNewDate(booking.sessionDate);
      setNewTime(booking.sessionTime);
    }
  }, [booking]);

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updated = await reschedule(booking.id, newDate, newTime);
    setIsSubmitting(false);
    if (updated) {
      onRescheduled(updated);
      onClose();
    }
  };

  const timeOptions = [
    "09:00 AM",
    "10:00 AM",
    "11:15 AM",
    "01:00 PM",
    "02:30 PM",
    "03:30 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/70">
          <div>
            <h3 className="text-sm font-bold text-stone-900">Reschedule Session</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Select a new date and time for {booking.primaryClientName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current info */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between">
            <span className="text-stone-500 font-medium">Current Appointment:</span>
            <span className="font-semibold text-stone-900">
              {booking.sessionDate} · {booking.sessionTime}
            </span>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" /> New Date
            </label>
            <input
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" /> New Time Slot
            </label>
            <select
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
            >
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t} ({booking.timezone.split(" ")[0]})
                </option>
              ))}
            </select>
          </div>

          <div className="p-2.5 bg-blue-50/70 border border-blue-200/70 rounded-lg text-[11px] text-blue-800 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-600" />
            <span>
              Mock Update: In Phase 2, this will automatically sync with Google Calendar and notify the client via Resend.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-700 bg-stone-100 hover:bg-stone-200 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#0B2A4A] hover:bg-[#143B63] text-white font-semibold rounded-lg transition-colors shadow-2xs disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Confirm Reschedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

