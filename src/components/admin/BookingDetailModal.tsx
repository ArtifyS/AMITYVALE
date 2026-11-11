"use client";

import React from "react";
import { AdminBooking } from "@/lib/admin/types";
import { StatusBadge } from "./StatusBadge";
import {
  X,
  Calendar,
  Clock,
  Video,
  DollarSign,
  User,
  Mail,
  Phone,
  Briefcase,
  Compass,
  FileText,
  ExternalLink,
} from "lucide-react";

interface BookingDetailModalProps {
  booking: AdminBooking | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDetailModal({
  booking,
  isOpen,
  onClose,
}: BookingDetailModalProps) {
  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                {booking.bookingNumber}
              </span>
              <StatusBadge status={booking.status} />
              <StatusBadge status={booking.paymentStatus} label={booking.paymentStatus === "paid" ? "Paid" : "Pending"} />
            </div>
            <h2 className="mt-1 text-lg font-semibold text-stone-900">
              {booking.primaryClientName} — {booking.coachingArea}
              {booking.coachingSubArea ? ` (${booking.coachingSubArea})` : ""}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="px-6 py-6 overflow-y-auto space-y-6">
          {/* SESSION METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200/70 text-xs">
            <div>
              <span className="text-stone-500 flex items-center gap-1.5 mb-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-stone-400" /> Date
              </span>
              <span className="font-semibold text-stone-900">{booking.sessionDate}</span>
            </div>
            <div>
              <span className="text-stone-500 flex items-center gap-1.5 mb-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-stone-400" /> Time & Duration
              </span>
              <span className="font-semibold text-stone-900">
                {booking.sessionTime} ({booking.duration} mins)
              </span>
            </div>
            <div>
              <span className="text-stone-500 flex items-center gap-1.5 mb-1 font-medium">
                <User className="w-3.5 h-3.5 text-stone-400" /> Attendees
              </span>
              <span className="font-semibold text-stone-900">
                {booking.participantCount} {booking.participantCount === 1 ? "Person" : "People"}
              </span>
            </div>
            <div>
              <span className="text-stone-500 flex items-center gap-1.5 mb-1 font-medium">
                <DollarSign className="w-3.5 h-3.5 text-stone-400" /> Total Fee
              </span>
              <span className="font-semibold text-stone-900">${booking.amountTotal} USD</span>
            </div>
          </div>

          {/* GOOGLE MEET ACTION */}
          {booking.googleMeetLink && (
            <div className="flex items-center justify-between p-3.5 bg-teal-50/60 border border-teal-200/80 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-600 text-white rounded-lg">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-teal-950">Google Meet Video Call</div>
                  <div className="text-[11px] text-teal-700 font-mono truncate max-w-sm">
                    {booking.googleMeetLink}
                  </div>
                </div>
              </div>
              <a
                href={booking.googleMeetLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
              >
                Join Meet <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* PARTICIPANTS INTAKE PROFILES */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Participant Profiles ({booking.participants.length})
              </h3>
              <span className="text-[11px] text-stone-400">Complete intake information</span>
            </div>

            <div className="space-y-4">
              {booking.participants.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white border border-stone-200 rounded-xl shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                        {p.participantNumber || idx + 1}
                      </span>
                      <span className="text-sm font-bold text-stone-900">
                        {p.firstName} {p.lastName}
                      </span>
                      {p.isPrimaryContact && (
                        <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#FF5A4F]/10 text-[#FF5A4F] px-2 py-0.5 rounded-full">
                          Primary Contact
                        </span>
                      )}
                    </div>
                    {p.ageAtBooking ? (
                      <span className="text-xs font-medium text-stone-600">
                        Age: <strong className="text-stone-900">{p.ageAtBooking}</strong>
                      </span>
                    ) : null}
                  </div>

                  {/* Field Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-stone-400 block mb-0.5">Date of Birth</span>
                      <span className="font-medium text-stone-800 font-mono">
                        {p.dateOfBirth || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Place of Birth</span>
                      <span className="font-medium text-stone-800">{p.placeOfBirth || "—"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Sex</span>
                      <span className="font-medium text-stone-800">{p.sex || "—"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Sexual Orientation</span>
                      <span className="font-medium text-stone-800">
                        {p.sexualOrientation || "—"}
                        {p.sexualOrientationSelfDescribe
                          ? ` (${p.sexualOrientationSelfDescribe})`
                          : ""}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Profession</span>
                      <span className="font-medium text-stone-800">{p.profession || "—"}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Email</span>
                      <span className="font-medium text-stone-800 truncate block">
                        {p.email || "—"}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Phone</span>
                      <span className="font-medium text-stone-800">{p.phone || "—"}</span>
                    </div>
                  </div>

                  {/* Purpose */}
                  {p.consultationPurpose && (
                    <div className="pt-2 border-t border-stone-100">
                      <span className="text-stone-400 block text-xs mb-1">
                        Purpose for Consultation:
                      </span>
                      <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-lg leading-relaxed border border-stone-100">
                        &ldquo;{p.consultationPurpose}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* NOTES */}
          {(booking.clientNotes || booking.adminNotes) && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Session Notes
              </h3>
              {booking.clientNotes && (
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs">
                  <span className="font-semibold text-stone-700 block mb-1">Client Note:</span>
                  <p className="text-stone-600">{booking.clientNotes}</p>
                </div>
              )}
              {booking.adminNotes && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs">
                  <span className="font-semibold text-amber-900 block mb-1">Coach Notes (Private):</span>
                  <p className="text-amber-800">{booking.adminNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between text-xs">
          <span className="text-stone-400">Created on {new Date(booking.createdAt).toLocaleDateString()}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-lg transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

