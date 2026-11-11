"use client";

import React, { useState } from "react";
import { AdminBooking } from "@/lib/admin/types";
import { useAdminData } from "./AdminDataContext";
import { X, AlertTriangle } from "lucide-react";

interface CancelModalProps {
  booking: AdminBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelled: (updated: AdminBooking) => void;
}

export function CancelModal({
  booking,
  isOpen,
  onClose,
  onCancelled,
}: CancelModalProps) {
  const { cancelBooking } = useAdminData();
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const handleCancel = async () => {
    setIsSubmitting(true);
    const updated = await cancelBooking(booking.id, reason);
    setIsSubmitting(false);
    if (updated) {
      onCancelled(updated);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200/80 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">Cancel This Session?</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <p className="text-stone-600 leading-relaxed">
            Are you sure you want to cancel the upcoming consultation for{" "}
            <strong className="text-stone-900">{booking.primaryClientName}</strong>?
          </p>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-stone-400">Scheduled Date:</span>
              <span className="font-semibold text-stone-900">{booking.sessionDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Scheduled Time:</span>
              <span className="font-semibold text-stone-900">{booking.sessionTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Coaching Focus:</span>
              <span className="font-semibold text-stone-900">
                {booking.coachingArea}
                {booking.coachingSubArea ? ` · ${booking.coachingSubArea}` : ""}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1.5">
              Cancellation Reason (Optional):
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Client requested refund, emergency schedule conflict..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-700 bg-stone-100 hover:bg-stone-200 font-medium rounded-lg transition-colors"
            >
              Keep Session
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleCancel}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors shadow-2xs disabled:opacity-50"
            >
              {isSubmitting ? "Cancelling..." : "Cancel Session"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

