"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AdminBooking } from "@/lib/admin/types";
import { useAdminData } from "@/components/admin/AdminDataContext";
import { BookingActionMenu } from "@/components/admin/BookingActionMenu";
import { getEffectiveBookingStatus } from "@/lib/admin/repositories";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { BookingDetailsDrawer } from "@/components/admin/BookingDetailsDrawer";
import { RescheduleModal } from "@/components/admin/RescheduleModal";
import { CancelModal } from "@/components/admin/CancelModal";
import {
  Search,
  Users,
  Video,
  CheckCircle2,
  SlidersHorizontal,
  UserX,
} from "lucide-react";

export default function AdminBookingsPage() {
  const searchParams = useSearchParams();
  const {
    bookings: allBookings,
    counts,
    isLoaded,
    markCompleted,
    markNoShow,
    updateBooking,
  } = useAdminData();

  // Filters State
  const [statusTab, setStatusTab] = useState<
    "upcoming" | "needs_review" | "completed" | "cancelled" | "all"
  >("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [coachingArea, setCoachingArea] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Active Modals & Drawer State
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState<AdminBooking | null>(null);
  const [cancelTarget, setCancelTarget] = useState<AdminBooking | null>(null);

  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (
      statusParam &&
      (statusParam === "upcoming" ||
        statusParam === "needs_review" ||
        statusParam === "completed" ||
        statusParam === "cancelled" ||
        statusParam === "all")
    ) {
      setStatusTab(statusParam);
    }
  }, [searchParams]);

  // Derived filtered bookings
  const filteredBookings = useMemo(() => {
    let list = allBookings.map((b) => ({
      ...b,
      status: getEffectiveBookingStatus(b),
    }));

    // Status tab filter
    if (statusTab === "upcoming") {
      list = list.filter((b) => b.status === "confirmed" || b.status === "rescheduled");
    } else if (statusTab === "needs_review") {
      list = list.filter((b) => b.status === "needs_review");
    } else if (statusTab === "completed") {
      list = list.filter((b) => b.status === "completed");
    } else if (statusTab === "cancelled") {
      list = list.filter((b) => b.status === "cancelled");
    }

    // Coaching area filter
    if (coachingArea !== "all") {
      list = list.filter((b) => b.coachingArea === coachingArea);
    }

    // Payment status filter
    if (paymentStatus !== "all") {
      list = list.filter((b) => b.paymentStatus === paymentStatus);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.primaryClientName.toLowerCase().includes(q) ||
          b.primaryClientEmail.toLowerCase().includes(q) ||
          b.bookingNumber.toLowerCase().includes(q) ||
          b.participants.some((p) =>
            `${p.firstName} ${p.lastName}`.toLowerCase().includes(q)
          )
      );
    }

    return list;
  }, [allBookings, statusTab, coachingArea, paymentStatus, searchQuery]);

  // Handle single booking updates
  const handleBookingMutated = (updated: AdminBooking) => {
    updateBooking(updated);
    if (selectedBooking?.id === updated.id) {
      setSelectedBooking(updated);
    }
  };

  const handleQuickMarkCompleted = async (booking: AdminBooking) => {
    const updated = await markCompleted(booking.id);
    if (updated && selectedBooking?.id === updated.id) {
      setSelectedBooking(updated);
    }
  };

  const handleQuickMarkNoShow = async (booking: AdminBooking) => {
    const updated = await markNoShow(booking.id);
    if (updated && selectedBooking?.id === updated.id) {
      setSelectedBooking(updated);
    }
  };

  const openDrawer = (booking: AdminBooking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const activeFiltersCount = [
    coachingArea !== "all",
    paymentStatus !== "all",
  ].filter(Boolean).length;

  const resetFilters = () => {
    setCoachingArea("all");
    setPaymentStatus("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="pb-2 border-b border-stone-200/70">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
          Bookings
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Manage upcoming, completed, rescheduled, and cancelled sessions.
        </p>
      </div>

      {/* TOP CONTROLS: STATUS TABS & SEARCH/FILTER TRIGGER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Compact Status Tabs with Dynamic Live Counts */}
        <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/70 overflow-x-auto">
          {[
            { id: "upcoming", label: "Upcoming", count: counts.upcoming },
            { id: "needs_review", label: "Needs Review", count: counts.needs_review },
            { id: "completed", label: "Completed", count: counts.completed },
            { id: "cancelled", label: "Cancelled", count: counts.cancelled },
            { id: "all", label: "All", count: counts.all },
          ].map((tab) => {
            const isNeedsReview = tab.id === "needs_review";
            const hasReviewItems = isNeedsReview && (tab.count ?? 0) > 0;
            const isTabActive = statusTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setStatusTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isTabActive
                    ? "bg-white text-stone-900 shadow-xs font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                    isTabActive
                      ? hasReviewItems
                        ? "bg-amber-100 text-amber-900 font-bold border border-amber-300"
                        : "bg-[#0B2A4A] text-white"
                      : hasReviewItems
                      ? "bg-amber-200/90 text-amber-900 font-bold"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search bar + Filters Button */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client, email, #ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#0B2A4A] shadow-2xs"
            />
          </div>

          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className={`px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs ${
              isFilterPanelOpen || activeFiltersCount > 0
                ? "bg-[#0B2A4A] text-white border-[#0B2A4A]"
                : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#FF5A4F] text-white text-[10px] font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* EXPANDABLE COMPACT FILTERS PANEL */}
      {isFilterPanelOpen && (
        <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-sm animate-in fade-in duration-150 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Filter Consultations
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#FF5A4F] hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-stone-500 mb-1 font-medium">Coaching Area</label>
              <select
                value={coachingArea}
                onChange={(e) => setCoachingArea(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              >
                <option value="all">All Coaching Areas</option>
                <option value="Intimacy Coaching">Intimacy Coaching</option>
                <option value="Relationship Coaching">Relationship Coaching</option>
                <option value="Health Coaching">Health Coaching</option>
                <option value="Spiritual Coaching">Spiritual Coaching</option>
                <option value="Personal Growth">Personal Growth</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-500 mb-1 font-medium">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              >
                <option value="all">All Payment Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP TABLE VIEW (HIDDEN ON MOBILE) */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/70 border-b border-stone-200/80 text-stone-500 font-medium">
              <tr>
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Session</th>
                <th className="py-3 px-4 font-semibold">Date & Time</th>
                <th className="py-3 px-4 font-semibold">Duration</th>
                <th className="py-3 px-4 font-semibold">Participants</th>
                <th className="py-3 px-4 font-semibold">Payment</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {!isLoaded ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-400">
                    Loading bookings...
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-400">
                    No bookings found matching the current criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    onClick={() => openDrawer(booking)}
                    className="hover:bg-stone-50/70 transition-colors cursor-pointer group"
                  >
                    {/* 1. Client */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                        {booking.primaryClientName}
                      </div>
                      <div className="text-[11px] text-stone-400 truncate max-w-[160px]">
                        {booking.primaryClientEmail}
                      </div>
                    </td>

                    {/* 2. Session */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-stone-800">
                        {booking.coachingArea}
                      </div>
                      {booking.coachingSubArea && (
                        <div className="text-[11px] text-stone-400">
                          {booking.coachingSubArea}
                        </div>
                      )}
                    </td>

                    {/* 3. Date & Time */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-medium text-stone-900">
                        {booking.sessionDate}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {booking.sessionTime}
                      </div>
                    </td>

                    {/* 4. Duration */}
                    <td className="py-3 px-4 whitespace-nowrap text-stone-600 font-mono">
                      {booking.duration} min
                    </td>

                    {/* 5. Participants */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-mono font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                        <Users className="w-3 h-3 text-stone-400" />
                        {booking.participantCount}
                      </span>
                    </td>

                    {/* 6. Payment */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-semibold text-stone-900 font-mono">
                        ${booking.amountTotal}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-medium capitalize">
                        {booking.paymentStatus}
                      </div>
                    </td>

                    {/* 7. Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>

                    {/* 8. Actions */}
                    <td
                      className="py-3 px-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Primary Quick Action Button */}
                        {booking.status === "needs_review" ? (
                          <button
                            onClick={() => handleQuickMarkCompleted(booking)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors inline-flex items-center gap-1 shadow-2xs"
                            title="Mark Consultation Completed"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Mark Completed</span>
                          </button>
                        ) : booking.googleMeetLink && booking.status !== "cancelled" ? (
                          <a
                            href={booking.googleMeetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 text-[11px] font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-md transition-colors inline-flex items-center gap-1 shadow-2xs"
                            title="Join Google Meet Call"
                          >
                            <Video className="w-3 h-3" />
                            <span>Join</span>
                          </a>
                        ) : null}

                        {/* Portal Floating 3-Dot Action Menu (Does NOT clip) */}
                        <BookingActionMenu
                          booking={booking}
                          onViewDetails={openDrawer}
                          onMarkCompleted={handleQuickMarkCompleted}
                          onMarkNoShow={handleQuickMarkNoShow}
                          onReschedule={(b) => setRescheduleTarget(b)}
                          onCancel={(b) => setCancelTarget(b)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE BOOKINGS VIEW: COMPACT CARDS (HIDDEN ON DESKTOP) */}
      <div className="block md:hidden space-y-3">
        {!isLoaded ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            Loading bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            No bookings found matching current filters.
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => openDrawer(booking)}
              className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs active:bg-stone-50 transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">
                    {booking.primaryClientName}
                  </h3>
                  <div className="text-xs text-stone-500 font-medium mt-0.5">
                    {booking.sessionDate} · {booking.sessionTime}
                  </div>
                </div>
                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <StatusBadge status={booking.status} />
                  <BookingActionMenu
                    booking={booking}
                    onViewDetails={openDrawer}
                    onMarkCompleted={handleQuickMarkCompleted}
                    onMarkNoShow={handleQuickMarkNoShow}
                    onReschedule={(b) => setRescheduleTarget(b)}
                    onCancel={(b) => setCancelTarget(b)}
                  />
                </div>
              </div>

              <div className="text-xs text-stone-600 flex items-center gap-1.5">
                <span className="font-semibold text-stone-800">{booking.coachingArea}</span>
                {booking.coachingSubArea && (
                  <>
                    <span className="text-stone-300">•</span>
                    <span>{booking.coachingSubArea}</span>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>
                  {booking.duration} min · {booking.participantCount}{" "}
                  {booking.participantCount === 1 ? "participant" : "participants"}
                </span>
                <span className="font-mono font-bold text-stone-900">
                  ${booking.amountTotal} {booking.paymentStatus === "paid" ? "Paid" : "Pending"}
                </span>
              </div>

              {booking.status === "needs_review" && (
                <div
                  className="pt-2 border-t border-amber-100 flex items-center justify-end gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleQuickMarkCompleted(booking)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Mark Completed</span>
                  </button>
                  <button
                    onClick={() => handleQuickMarkNoShow(booking)}
                    className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center gap-1"
                  >
                    <UserX className="w-3 h-3 text-stone-500" />
                    <span>No-Show</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* SIDE DRAWER FOR BOOKING DETAILS */}
      <BookingDetailsDrawer
        booking={selectedBooking}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onBookingUpdated={handleBookingMutated}
      />

      {/* RESCHEDULE MODAL */}
      <RescheduleModal
        booking={rescheduleTarget}
        isOpen={!!rescheduleTarget}
        onClose={() => setRescheduleTarget(null)}
        onRescheduled={handleBookingMutated}
      />

      {/* CANCEL MODAL */}
      <CancelModal
        booking={cancelTarget}
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onCancelled={handleBookingMutated}
      />
    </div>
  );
}
