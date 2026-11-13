"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminClient, AdminBooking } from "@/lib/admin/types";
import { getClientById, addClientPrivateNote } from "@/lib/admin/repositories";
import { useAdminData, getClientMetrics } from "@/components/admin/AdminDataContext";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { BookingDetailsDrawer } from "@/components/admin/BookingDetailsDrawer";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  ChevronRight,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function ClientProfilePage() {
  const params = useParams();
  const clientId = params?.id as string;

  const { bookings: allLiveBookings, updateBooking } = useAdminData();
  const [client, setClient] = useState<AdminClient | null>(null);
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
      }
      setLoading(false);
    }
    load();
  }, [clientId]);

  // Dynamically compute live metrics based on shared booking state
  const metrics = useMemo(() => {
    if (!client) return null;
    return getClientMetrics(client, allLiveBookings);
  }, [client, allLiveBookings]);

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
    updateBooking(updated);
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

  if (!client || !metrics) {
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

  const { upcomingSessions, pastSessions } = metrics;

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
              {metrics.completedCount} Completed
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

      {/* REFINED SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        {/* 1. Client Since */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Client Since
          </span>
          <span className="text-sm font-bold text-stone-900">
            {client.clientSince}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">
            First session {client.firstSessionDate || "Recorded"}
          </span>
        </div>

        {/* 2. Completed Sessions */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Completed Sessions
          </span>
          <span className="text-sm font-bold text-stone-900 font-mono">
            {metrics.completedCount}
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">
            Completed appointments
          </span>
        </div>

        {/* 3. Total Paid / LTV */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Total Paid (LTV)
          </span>
          <span className="text-sm font-bold text-stone-900 font-mono">
            ${metrics.totalPaid.toLocaleString()} USD
          </span>
          <span className="text-[10px] text-stone-400 block mt-0.5">
            Succeeded payments across sessions
          </span>
        </div>

        {/* 4. Next Session */}
        <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Next Session
          </span>
          {metrics.nextSessionDate ? (
            <span className="text-sm font-bold text-emerald-800">
              {metrics.nextSessionDate}
            </span>
          ) : (
            <span className="text-sm font-medium text-stone-400 italic">
              None Scheduled
            </span>
          )}
          <span className="text-[10px] text-stone-400 block mt-0.5">
            {metrics.nextSessionDate ? "Confirmed in calendar" : "Open for booking"}
          </span>
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: SESSIONS (LEFT) & ADMIN NOTES (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: UPCOMING SESSIONS & PAST SESSIONS (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {/* UPCOMING SESSIONS SECTION */}
          <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span>Upcoming Sessions</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#0B2A4A] text-white">
                  {upcomingSessions.length}
                </span>
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
                    className="p-4 hover:bg-stone-50/70 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                          {b.sessionDate} · {b.sessionTime}
                        </span>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="text-stone-600">
                        <span className="font-medium text-stone-800">{b.coachingArea}</span>
                        {b.coachingSubArea && (
                          <span className="text-stone-500"> · {b.coachingSubArea}</span>
                        )}
                      </div>
                      <div className="text-stone-400 text-[11px]">
                        {b.duration} min · {b.participantCount}{" "}
                        {b.participantCount === 1 ? "participant" : "participants"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                      <div className="font-mono font-bold text-stone-900">
                        ${b.amountTotal}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookingDrawer(b);
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3 h-3 text-stone-400" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* PAST SESSIONS SECTION */}
          <div className="bg-white rounded-xl border border-stone-200/80 shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span>Past Sessions</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-stone-200 text-stone-700">
                  {pastSessions.length}
                </span>
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
                    className="p-4 hover:bg-stone-50/70 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-stone-800 group-hover:text-[#0B2A4A]">
                          {b.sessionDate} · {b.sessionTime}
                        </span>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="text-stone-600">
                        <span className="font-medium text-stone-700">{b.coachingArea}</span>
                        {b.coachingSubArea && (
                          <span className="text-stone-500"> · {b.coachingSubArea}</span>
                        )}
                      </div>
                      <div className="text-stone-400 text-[11px]">
                        {b.duration} min · {b.participantCount}{" "}
                        {b.participantCount === 1 ? "participant" : "participants"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                      <div className="font-mono font-semibold text-stone-700">
                        ${b.amountTotal}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookingDrawer(b);
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-3 h-3 text-stone-400" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRIVATE ADMIN NOTES ONLY (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
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
