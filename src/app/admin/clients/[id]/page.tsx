"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminClient, AdminBooking } from "@/lib/admin/types";
import {
  getClientById,
  getClientBookings,
  addClientPrivateNote,
} from "@/lib/admin/repositories";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { BookingDetailsDrawer } from "@/components/admin/BookingDetailsDrawer";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  Users,
  FileText,
  Send,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  History,
} from "lucide-react";

export default function ClientProfilePage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;

  const [client, setClient] = useState<AdminClient | null>(null);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!clientId) return;
      setLoading(true);
      const clientData = await getClientById(clientId);
      if (clientData) {
        setClient(clientData);
        const clientBookings = await getClientBookings(clientData.id);
        setBookings(clientBookings);
      }
      setLoading(false);
    }
    load();
  }, [clientId]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !client) return;
    const updated = await addClientPrivateNote(client.id, newNote.trim());
    if (updated) {
      setClient(updated);
      setNewNote("");
    }
  };

  const openBookingDrawer = (b: AdminBooking) => {
    setSelectedBooking(b);
    setIsDrawerOpen(true);
  };

  const handleBookingMutated = (updated: AdminBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
    if (selectedBooking?.id === updated.id) {
      setSelectedBooking(updated);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-stone-400">
        Loading client profile...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-12 text-center space-y-3">
        <h2 className="text-base font-bold text-stone-900">Client Not Found</h2>
        <p className="text-xs text-stone-500">
          The requested client record does not exist or has been archived.
        </p>
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-1.5 text-xs text-[#0B2A4A] font-semibold hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Clients
        </Link>
      </div>
    );
  }

  const upcomingSessions = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "in_progress"
  );
  const pastSessions = bookings.filter(
    (b) => b.status === "completed" || b.status === "cancelled"
  );

  return (
    <div className="space-y-6">
      {/* BREADCRUMB */}
      <div>
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Clients
        </Link>
      </div>

      {/* HEADER SECTION */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight font-sans">
              {client.name}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
              {client.totalBookings} Sessions
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0B2A4A]/10 text-[#0B2A4A]">
              {client.primaryCoachingArea}
            </span>
            {client.primaryFocus && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                {client.primaryFocus}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-4 text-xs text-stone-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-mono text-stone-700">{client.email}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>{client.phone}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{client.location}</span>
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <a
            href={`mailto:${client.email}?subject=AmityHale Consultation`}
            className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Client</span>
          </a>
        </div>
      </div>

      {/* CLIENT OVERVIEW METRICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Client Since
          </span>
          <span className="text-sm font-bold text-stone-900">
            {client.clientSince}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">First session {client.firstSessionDate}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Total Sessions
          </span>
          <span className="text-sm font-bold text-stone-900 font-mono">
            {client.totalBookings} Completed
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">Lifetime appointments</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Total Paid (LTV)
          </span>
          <span className="text-sm font-bold text-stone-900 font-mono">
            ${client.totalSpend.toLocaleString()} USD
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">Succeeded Stripe charges</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Next Session
          </span>
          {client.nextSessionDate ? (
            <span className="text-sm font-bold text-emerald-800">
              {client.nextSessionDate}
            </span>
          ) : (
            <span className="text-sm font-medium text-stone-400 italic">
              None scheduled
            </span>
          )}
          <span className="text-[10px] text-stone-400 block mt-0.5">
            {client.nextSessionDate ? "Confirmed in calendar" : "Open for booking"}
          </span>
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: SESSION HISTORY & INTAKE/NOTES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: SESSION HISTORY (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {/* UPCOMING SESSIONS */}
          <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900">
                Upcoming Sessions ({upcomingSessions.length})
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              {upcomingSessions.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-400">
                  No upcoming sessions currently booked.
                </div>
              ) : (
                upcomingSessions.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => openBookingDrawer(b)}
                    className="p-4 hover:bg-stone-50/70 transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900">
                          {b.sessionDate} · {b.sessionTime}
                        </span>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="text-stone-500 mt-0.5">
                        {b.coachingArea} {b.coachingSubArea ? `(${b.coachingSubArea})` : ""} · {b.duration} min
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-stone-900">
                        ${b.amountTotal}
                      </div>
                      <span className="text-[11px] text-[#0B2A4A] font-semibold hover:underline inline-flex items-center gap-0.5">
                        Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* PAST SESSIONS */}
          <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900">
                Past Sessions ({pastSessions.length})
              </h2>
            </div>

            <div className="divide-y divide-stone-100">
              {pastSessions.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-400">
                  No historical sessions recorded yet.
                </div>
              ) : (
                pastSessions.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => openBookingDrawer(b)}
                    className="p-4 hover:bg-stone-50/70 transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-800">
                          {b.sessionDate}
                        </span>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="text-stone-500 mt-0.5">
                        {b.coachingArea} · {b.duration} min · {b.participantCount}{" "}
                        {b.participantCount === 1 ? "participant" : "participants"}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-semibold text-stone-700">
                        ${b.amountTotal}
                      </div>
                      <span className="text-[11px] text-stone-400">
                        Ref #{b.bookingNumber}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTAKE RECORDS & ADMIN NOTES (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* HISTORICAL INTAKE RECORDS */}
          <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100">
              <h2 className="text-sm font-bold text-stone-900">
                Intake Records ({bookings.length})
              </h2>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Participant intake captured at time of booking (preserved historically)
              </p>
            </div>

            <div className="divide-y divide-stone-100">
              {bookings.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-400">
                  No intake records found.
                </div>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-stone-900">
                        {b.sessionDate}
                      </div>
                      <div className="text-stone-400 text-[11px] font-mono">
                        Booking #{b.bookingNumber}
                      </div>
                      <div className="text-stone-500 text-[11px] mt-0.5">
                        {b.participants.length} attendee profiles recorded
                      </div>
                    </div>

                    <button
                      onClick={() => openBookingDrawer(b)}
                      className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
                    >
                      View Intake
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* PRIVATE INTERNAL ADMIN NOTES */}
          <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs p-5 space-y-4">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-stone-900">
                  Private Admin Notes
                </h2>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Internal practitioner notes for Mr. Angel
                </p>
              </div>
              <span className="px-1.5 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold rounded uppercase">
                Admin-Only
              </span>
            </div>

            {/* List of existing private notes */}
            {client.privateNotes && client.privateNotes.length > 0 ? (
              <div className="space-y-2.5">
                {client.privateNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-stone-50 border border-stone-200/80 rounded-lg text-xs text-stone-800 leading-relaxed"
                  >
                    {note}
                  </div>
                ))}
              </div>
            ) : client.notes ? (
              <div className="p-3 bg-stone-50 border border-stone-200/80 rounded-lg text-xs text-stone-800 leading-relaxed">
                {client.notes}
              </div>
            ) : (
              <p className="text-xs text-stone-400 italic">No notes added yet.</p>
            )}

            {/* Note entry form */}
            <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-stone-100">
              <textarea
                rows={3}
                placeholder="Add a private note about this client or progress framework..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3 py-1.5 bg-[#0B2A4A] hover:bg-[#143B63] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
                >
                  <Send className="w-3 h-3" />
                  <span>Save Note</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SIDE DRAWER FOR SESSION & INTAKE DETAILS */}
      <BookingDetailsDrawer
        booking={selectedBooking}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onBookingUpdated={handleBookingMutated}
      />
    </div>
  );
}

