"use client";

import React, { useState, useEffect } from "react";
import { AdminBooking, AdminBookingParticipant } from "@/lib/admin/types";
import { StatusBadge } from "./StatusBadge";
import { RescheduleModal } from "./RescheduleModal";
import { CancelModal } from "./CancelModal";
import { useAdminData } from "./AdminDataContext";
import {
  X,
  Calendar,
  Clock,
  Video,
  DollarSign,
  User,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  CheckCircle2,
  CalendarClock,
  Ban,
  ShieldCheck,
  Send,
  ExternalLink,
  Sparkles,
  UserX,
} from "lucide-react";

interface BookingDetailsDrawerProps {
  booking: AdminBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingUpdated?: (updated: AdminBooking) => void;
}

export function BookingDetailsDrawer({
  booking,
  isOpen,
  onClose,
  onBookingUpdated,
}: BookingDetailsDrawerProps) {
  const { markCompleted, markNoShow, addNote, updateBooking } = useAdminData();
  // Local state for interactive operations
  const [currentBooking, setCurrentBooking] = useState<AdminBooking | null>(booking);
  const [expandedParticipants, setExpandedParticipants] = useState<Record<number, boolean>>({});
  const [newNote, setNewNote] = useState("");
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [savingNote, setSavingNote] = useState(false);

  // Sync state if booking prop changes
  useEffect(() => {
    setCurrentBooking(booking);
    setExpandedParticipants({});
    setIsMoreMenuOpen(false);
  }, [booking]);

  const activeBooking = currentBooking ?? booking;

  if (!isOpen || !booking || !activeBooking) return null;

  const toggleParticipantIntake = (index: number) => {
    setExpandedParticipants((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleMarkCompleted = async () => {
    const updated = await markCompleted(activeBooking.id);
    if (updated) {
      setCurrentBooking(updated);
      onBookingUpdated?.(updated);
      setIsMoreMenuOpen(false);
    }
  };

  const handleMarkNoShow = async () => {
    const updated = await markNoShow(activeBooking.id);
    if (updated) {
      setCurrentBooking(updated);
      onBookingUpdated?.(updated);
      setIsMoreMenuOpen(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSavingNote(true);
    const updated = await addNote(activeBooking.id, newNote.trim());
    setSavingNote(false);
    if (updated) {
      setCurrentBooking(updated);
      setNewNote("");
      onBookingUpdated?.(updated);
    }
  };

  const handleBookingMutated = (updated: AdminBooking) => {
    setCurrentBooking(updated);
    updateBooking(updated);
    onBookingUpdated?.(updated);
  };

  const formatLongDate = (dateStr: string) => {
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const additionalCount = Math.max(0, activeBooking.participantCount - 1);
  const additionalFeeTotal = additionalCount * 25;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <div
            className="w-screen max-w-full sm:max-w-xl md:max-w-2xl bg-white shadow-2xl border-l border-stone-200 flex flex-col h-full animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DRAWER HEADER */}
            <div className="px-6 py-5 border-b border-stone-200 bg-stone-50/80 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-lg font-bold text-stone-900 tracking-tight font-sans">
                    {activeBooking.primaryClientName}
                  </h2>
                  <span className="text-xs font-mono font-medium text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200 shadow-2xs">
                    #{activeBooking.bookingNumber}
                  </span>
                  <StatusBadge status={activeBooking.status} />
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  {activeBooking.coachingArea}
                  {activeBooking.coachingSubArea ? ` · ${activeBooking.coachingSubArea}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* PRIMARY ACTION */}
                {activeBooking.status === "needs_review" ? (
                  <button
                    onClick={handleMarkCompleted}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                    title="Mark Session Completed"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </button>
                ) : activeBooking.googleMeetLink && activeBooking.status !== "cancelled" ? (
                  <a
                    href={activeBooking.googleMeetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Meeting</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="px-3.5 py-1.5 text-xs font-semibold text-stone-400 bg-stone-100 rounded-lg flex items-center gap-1.5 cursor-not-allowed"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Meet Not Ready</span>
                  </button>
                )}

                {/* MORE ACTIONS DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/80 rounded-lg transition-colors border border-stone-200 bg-white shadow-2xs"
                    title="Session Actions"
                    aria-label="More actions"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {isMoreMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-20 text-xs">
                      {activeBooking.status !== "completed" && (
                        <button
                          onClick={handleMarkCompleted}
                          className="w-full px-3.5 py-2 text-left text-stone-700 hover:bg-stone-50 hover:text-emerald-700 flex items-center gap-2 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Mark Completed</span>
                        </button>
                      )}

                      {(activeBooking.status === "needs_review" || activeBooking.status === "confirmed") && (
                        <button
                          onClick={handleMarkNoShow}
                          className="w-full px-3.5 py-2 text-left text-stone-700 hover:bg-stone-50 hover:text-orange-700 flex items-center gap-2 transition-colors"
                        >
                          <UserX className="w-3.5 h-3.5 text-orange-600" />
                          <span>Mark No-Show</span>
                        </button>
                      )}

                      {activeBooking.status !== "cancelled" && (
                        <>
                          <button
                            onClick={() => {
                              setIsMoreMenuOpen(false);
                              setIsRescheduleOpen(true);
                            }}
                            className="w-full px-3.5 py-2 text-left text-stone-700 hover:bg-stone-50 hover:text-[#0B2A4A] flex items-center gap-2 transition-colors"
                          >
                            <CalendarClock className="w-3.5 h-3.5 text-stone-500" />
                            <span>Reschedule Session</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsMoreMenuOpen(false);
                              setIsCancelOpen(true);
                            }}
                            className="w-full px-3.5 py-2 text-left text-rose-700 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                          >
                            <Ban className="w-3.5 h-3.5 text-rose-600" />
                            <span>Cancel Session</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/80 transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* DRAWER BODY (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* OUTCOME CONFIRMATION BANNER FOR NEEDS REVIEW */}
              {activeBooking.status === "needs_review" && (
                <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-950 font-bold text-xs">
                      <Clock className="w-4 h-4 text-amber-700" />
                      <span>Outcome Confirmation Needed</span>
                    </div>
                    <p className="text-[11px] text-amber-800/90 mt-0.5">
                      The scheduled session time has passed. Please confirm whether this consultation was completed or if the client was a no-show.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleMarkCompleted}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Completed</span>
                    </button>
                    <button
                      onClick={handleMarkNoShow}
                      className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <UserX className="w-3.5 h-3.5 text-stone-500" />
                      <span>Mark No-Show</span>
                    </button>
                  </div>
                </div>
              )}
              {/* SECTION 1: SESSION DETAILS */}
              <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-500">
                    Session Details
                  </h3>
                  <span className="font-semibold text-stone-800">
                    {activeBooking.participantCount > 1
                      ? "Shared Session"
                      : "Individual Session"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div>
                    <span className="text-stone-400 block mb-0.5">Coaching</span>
                    <span className="font-semibold text-stone-900">
                      {activeBooking.coachingArea}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5">Focus</span>
                    <span className="font-semibold text-stone-900">
                      {activeBooking.coachingSubArea || "General Practice"}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5">Duration</span>
                    <span className="font-semibold text-stone-900 font-mono">
                      {activeBooking.duration} Minutes
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5">Participants</span>
                    <span className="font-semibold text-stone-900 font-mono">
                      {activeBooking.participantCount}{" "}
                      {activeBooking.participantCount === 1 ? "Person" : "People"}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5">Date</span>
                    <span className="font-semibold text-stone-900">
                      {formatLongDate(activeBooking.sessionDate)}
                    </span>
                  </div>

                  <div>
                    <span className="text-stone-400 block mb-0.5">Time</span>
                    <span className="font-semibold text-stone-900 font-mono">
                      {activeBooking.sessionTime} ({activeBooking.timezone.split(" ")[0]})
                    </span>
                  </div>

                  <div className="col-span-2 pt-1 border-t border-stone-200/60">
                    <span className="text-stone-400 block mb-1">Meeting Platform</span>
                    {activeBooking.googleMeetLink ? (
                      <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-stone-200 text-stone-700">
                        <span className="font-mono text-[11px] truncate max-w-xs text-teal-800">
                          {activeBooking.googleMeetLink}
                        </span>
                        <a
                          href={activeBooking.googleMeetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
                        >
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-stone-500 italic">
                        Google Meet — Not connected yet / placeholder state
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 2: PAYMENT SUMMARY */}
              <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-500">
                    Payment Summary
                  </h3>
                  <StatusBadge
                    status={activeBooking.paymentStatus}
                    label={activeBooking.paymentStatus === "paid" ? "Paid in Full" : "Pending"}
                  />
                </div>

                <div className="space-y-2 font-mono text-[11.5px]">
                  <div className="flex justify-between text-stone-600">
                    <span>Base session ({activeBooking.duration} min):</span>
                    <span className="font-semibold text-stone-900">
                      ${activeBooking.basePrice || (activeBooking.amountTotal - additionalFeeTotal)}
                    </span>
                  </div>

                  {additionalCount > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span>Additional participant ({additionalCount} × $25):</span>
                      <span className="font-semibold text-stone-900">
                        +${additionalFeeTotal}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-stone-200 font-sans font-bold text-stone-900 text-xs">
                    <span>Total Paid</span>
                    <span className="font-mono text-sm">${activeBooking.amountTotal} USD</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Helcim Transaction ID:</span>
                  <span className="font-mono text-stone-500">
                    HX-84920194 (Mock ID)
                  </span>
                </div>
              </div>

              {/* SECTION 3: PARTICIPANTS & FULL INTAKE DETAILS */}
              {(() => {
                const participantsList: AdminBookingParticipant[] =
                  activeBooking.participants && activeBooking.participants.length > 0
                    ? activeBooking.participants
                    : [
                        {
                          participantNumber: 1,
                          isPrimaryContact: true,
                          firstName: activeBooking.primaryClientName.split(" ")[0] || "Client",
                          lastName: activeBooking.primaryClientName.split(" ").slice(1).join(" ") || "",
                          email: activeBooking.primaryClientEmail,
                          phone: activeBooking.primaryClientPhone,
                          consultationPurpose: activeBooking.clientNotes || "General consultation",
                        } as AdminBookingParticipant,
                      ];

                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-500">
                        Participants &amp; Intake ({participantsList.length})
                      </h3>
                      <span className="text-[11px] text-stone-400">
                        Confidential Client Records
                      </span>
                    </div>

                    <div className="space-y-3">
                      {participantsList.map((p, idx) => {
                        const isExpanded = !!expandedParticipants[idx];

                        return (
                          <div
                            key={idx}
                            className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs"
                          >
                            {/* Summary Bar */}
                            <div className="p-4 flex items-center justify-between bg-stone-50/50">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-[#0B2A4A] text-white text-[10px] font-bold flex items-center justify-center">
                                    {p.participantNumber || idx + 1}
                                  </span>
                                  <span className="font-bold text-stone-900 text-xs">
                                    {p.firstName} {p.lastName}
                                  </span>
                                  {p.isPrimaryContact ? (
                                    <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#FF5A4F]/10 text-[#FF5A4F] px-2 py-0.5 rounded-full">
                                      Primary Contact
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-semibold tracking-wider uppercase bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                                      Participant
                                    </span>
                                  )}
                                </div>
                                {(p.email || p.phone) && (
                                  <div className="mt-1 flex items-center gap-3 text-[11px] text-stone-500">
                                    {p.email && <span>{p.email}</span>}
                                    {p.phone && (
                                      <>
                                        {p.email && <span className="text-stone-300">•</span>}
                                        <span>{p.phone}</span>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => toggleParticipantIntake(idx)}
                                className="px-2.5 py-1 text-[11px] font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors flex items-center gap-1 border border-stone-200 bg-white"
                              >
                                <span>{isExpanded ? "Hide Intake" : "View Full Intake"}</span>
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                                )}
                              </button>
                            </div>

                            {/* Collapsible Full Intake Details */}
                            {isExpanded && (
                              <div className="p-4 bg-stone-50/30 border-t border-stone-100 space-y-3 animate-in fade-in duration-150">
                                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-2">
                                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                                  <span>Protected Participant Intake Record</span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-white p-3 rounded-lg border border-stone-200/80">
                                  <div>
                                    <span className="text-stone-400 block mb-0.5 text-[11px]">First Name</span>
                                    <span className="font-medium text-stone-900">{p.firstName || "—"}</span>
                                  </div>

                                  <div>
                                    <span className="text-stone-400 block mb-0.5 text-[11px]">Last Name</span>
                                    <span className="font-medium text-stone-900">{p.lastName || "—"}</span>
                                  </div>

                                  <div>
                                    <span className="text-stone-400 block mb-0.5 text-[11px]">Date of Birth</span>
                                    <span className="font-mono font-medium text-stone-800">
                                      {p.dateOfBirth || "—"}
                                    </span>
                                  </div>

                                  <div>
                                    <span className="text-stone-400 block mb-0.5 text-[11px]">Age at Booking</span>
                                    <span className="font-mono font-medium text-stone-800">
                                      {p.ageAtBooking || p.age || "—"}
                                    </span>
                                  </div>

                                  <div>
                                    <span className="text-stone-400 block mb-0.5 text-[11px]">Place of Birth</span>
                                    <span className="font-medium text-stone-800">
                                      {p.placeOfBirth || "—"}
                                    </span>
                                  </div>

                                  <div>
                                    <span className="text-stone-400 block mb-0.5 text-[11px]">Sex</span>
                                    <span className="font-medium text-stone-800">{p.sex || "—"}</span>
                                  </div>

                                  <div className="sm:col-span-2">
                                    <span className="text-stone-400 block mb-0.5 text-[11px]">Sexual Orientation</span>
                                    <span className="font-medium text-stone-800">
                                      {p.sexualOrientation || "—"}
                                      {p.sexualOrientationSelfDescribe
                                        ? ` (${p.sexualOrientationSelfDescribe})`
                                        : ""}
                                    </span>
                                  </div>

                                  <div>
                                    <span className="text-stone-400 block mb-0.5 text-[11px]">Profession</span>
                                    <span className="font-medium text-stone-800">
                                      {p.profession || "—"}
                                    </span>
                                  </div>

                                  {p.email && (
                                    <div>
                                      <span className="text-stone-400 block mb-0.5 text-[11px]">Email</span>
                                      <span className="font-mono font-medium text-stone-800 truncate block">
                                        {p.email}
                                      </span>
                                    </div>
                                  )}

                                  {p.phone && (
                                    <div>
                                      <span className="text-stone-400 block mb-0.5 text-[11px]">Phone</span>
                                      <span className="font-medium text-stone-800">{p.phone}</span>
                                    </div>
                                  )}
                                </div>

                                {p.consultationPurpose && (
                                  <div className="p-3 bg-white rounded-lg border border-stone-200/80 space-y-1">
                                    <span className="text-stone-400 block text-[11px]">
                                      Stated Purpose for Consultation:
                                    </span>
                                    <p className="text-stone-700 italic leading-relaxed">
                                      &ldquo;{p.consultationPurpose}&rdquo;
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* SECTION 4: PRIVATE ADMIN NOTES */}
              <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-500">
                      Private Admin Notes
                    </h3>
                    <span className="px-1.5 py-0.5 bg-stone-200/80 text-stone-700 text-[9px] font-bold rounded uppercase tracking-wider">
                      Admin-Only
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400">Never shown to client</span>
                </div>

                {activeBooking.adminNotes && (
                  <div className="p-3 bg-white border border-stone-200 rounded-lg text-stone-800 whitespace-pre-wrap leading-relaxed">
                    {activeBooking.adminNotes}
                  </div>
                )}

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Add a private note regarding this session or client progress..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={savingNote || !newNote.trim()}
                      className="px-3 py-1.5 bg-[#0B2A4A] hover:bg-[#143B63] text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
                    >
                      <Send className="w-3 h-3" />
                      <span>{savingNote ? "Saving..." : "Save Note"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* SECTION 5: BOOKING ACTIVITY TIMELINE */}
              <div className="bg-stone-50/70 border border-stone-200/80 rounded-xl p-4 space-y-3">
                <div className="border-b border-stone-200/60 pb-2">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-500">
                    Booking Activity Timeline
                  </h3>
                </div>

                <div className="space-y-3 pl-2 border-l-2 border-stone-200">
                  {activeBooking.activityTimeline?.map((item) => (
                    <div key={item.id} className="relative pl-4">
                      <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-stone-400 ring-2 ring-white" />
                      <div className="font-semibold text-stone-900 text-xs">
                        {item.title}
                      </div>
                      {item.description && (
                        <p className="text-stone-500 text-[11px] mt-0.5">
                          {item.description}
                        </p>
                      )}
                      <div className="text-[10px] text-stone-400 mt-0.5 font-mono">
                        {new Date(item.timestamp).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DRAWER FOOTER */}
            <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between text-xs text-stone-500">
              <span>Booked on {new Date(activeBooking.createdAt).toLocaleDateString()}</span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-MODALS */}
      <RescheduleModal
        booking={activeBooking}
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        onRescheduled={handleBookingMutated}
      />

      <CancelModal
        booking={activeBooking}
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onCancelled={handleBookingMutated}
      />
    </>
  );
}

