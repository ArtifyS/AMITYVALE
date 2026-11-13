"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLead, LeadStatus } from "@/lib/admin/types";
import { updateMockLeadStatus } from "@/lib/admin/repositories";
import { StatusBadge } from "./StatusBadge";
import {
  X,
  Mail,
  ExternalLink,
  UserCheck,
} from "lucide-react";

interface LeadDetailsDrawerProps {
  lead: AdminLead | null;
  isOpen: boolean;
  onClose: () => void;
  onLeadUpdated: (updated: AdminLead) => void;
}

export function LeadDetailsDrawer({
  lead,
  isOpen,
  onClose,
  onLeadUpdated,
}: LeadDetailsDrawerProps) {
  const [currentLead, setCurrentLead] = useState<AdminLead | null>(lead);
  const [updating, setUpdating] = useState(false);

  React.useEffect(() => {
    setCurrentLead(lead);
  }, [lead]);

  const activeLead = currentLead ?? lead;

  if (!isOpen || !lead || !activeLead) return null;

  const handleStatusChange = async (newStatus: LeadStatus) => {
    setUpdating(true);
    const updated = await updateMockLeadStatus(activeLead.id, newStatus);
    setUpdating(false);
    if (updated) {
      setCurrentLead(updated);
      onLeadUpdated(updated);
    }
  };

  const areaLabelMap: Record<string, string> = {
    intimacy: "Intimacy Coaching",
    relationship: "Relationship Coaching",
    health: "Health Coaching",
    spiritual: "Spiritual Coaching",
    personal_growth: "Personal Growth",
  };

  const focusLabelMap: Record<string, string> = {
    business: "Business Coaching",
    family: "Family Coaching",
    partnerships: "Partnership Coaching",
  };

  const isConverted = activeLead.status === "converted" || (activeLead.status as string) === "booked";
  const isContacted = activeLead.status === "contacted";
  const isArchived = activeLead.status === "archived";
  const isUntouchedActive = !isConverted && !isContacted && !isArchived;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div
          className="w-screen max-w-full sm:max-w-lg md:max-w-xl bg-white shadow-2xl border-l border-stone-200 flex flex-col h-full animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="px-6 py-5 border-b border-stone-200 bg-stone-50/80 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg font-bold text-stone-900 tracking-tight font-sans">
                  {activeLead.name}
                </h2>
                <StatusBadge status={activeLead.status} />
              </div>
              <p className="text-xs text-stone-500 mt-1 font-mono">{activeLead.email}</p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/80 transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* CONTACT DETAILS */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
              <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-400">
                Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <span className="text-stone-400 block text-[11px] mb-0.5">Email</span>
                  <span className="font-mono text-stone-800 font-medium select-all">
                    {activeLead.email}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block text-[11px] mb-0.5">Phone</span>
                  <span className="text-stone-800 font-medium">
                    {activeLead.phone || "Not provided"}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block text-[11px] mb-0.5">Assessment Date</span>
                  <span className="text-stone-800 font-medium" suppressHydrationWarning>
                    {new Date(activeLead.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div>
                  <span className="text-stone-400 block text-[11px] mb-0.5">Intake Source</span>
                  <span className="font-mono text-stone-600 text-[11px]">
                    {activeLead.leadSource}
                  </span>
                </div>
              </div>
            </div>

            {/* COACHING AREA OF INTEREST */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
              <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-400">
                Coaching Area of Interest
              </h3>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-lg bg-[#0B2A4A] text-white font-semibold text-xs">
                  {areaLabelMap[activeLead.selectedArea] || activeLead.selectedArea}
                </span>

                {activeLead.relationshipFocus && (
                  <span className="px-3 py-1 rounded-lg bg-stone-100 text-stone-800 font-semibold text-xs border border-stone-200">
                    {focusLabelMap[activeLead.relationshipFocus] || activeLead.relationshipFocus}
                  </span>
                )}
              </div>
            </div>

            {/* CONVERSION DETAILS (Only shown for converted leads) */}
            {isConverted && (
              <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Client Conversion Record</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-emerald-800/70 block text-[11px] mb-0.5">Converted Date</span>
                    <span className="text-emerald-950 font-semibold" suppressHydrationWarning>
                      {activeLead.convertedAt
                        ? new Date(activeLead.convertedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Nov 8, 2026"}
                    </span>
                  </div>

                  <div>
                    <span className="text-emerald-800/70 block text-[11px] mb-0.5">First Paid Booking</span>
                    <span className="text-emerald-950 font-semibold font-mono">
                      {activeLead.firstBookingDetails || (activeLead.firstBookingAmount ? `$${activeLead.firstBookingAmount}` : "60 min · $300")}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/admin/bookings?search=${encodeURIComponent(activeLead.name)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-300/80 hover:bg-emerald-100/60 text-emerald-900 font-semibold text-xs transition-colors shadow-2xs"
                  >
                    <span>View Booking</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={activeLead.clientId ? `/admin/clients/${activeLead.clientId}` : `/admin/clients`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-2xs"
                  >
                    <span>View Client Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* LEAD MANAGEMENT ACTIONS */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Lead Management
              </span>

              {isConverted ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-lg">
                  <span className="text-xs text-emerald-900 font-medium">
                    Converted automatically upon booking payment.
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/bookings?search=${encodeURIComponent(activeLead.name)}`}
                      className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-md transition-colors"
                    >
                      View Booking
                    </Link>
                    <Link
                      href={activeLead.clientId ? `/admin/clients/${activeLead.clientId}` : `/admin/clients`}
                      className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors"
                    >
                      View Client
                    </Link>
                  </div>
                </div>
              ) : isUntouchedActive ? (
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("contacted")}
                    className="p-2.5 rounded-lg border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-800 text-center font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    Mark Contacted
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("archived")}
                    className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 text-center font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    Archive Lead
                  </button>
                </div>
              ) : isContacted ? (
                <div className="flex items-center gap-2.5">
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("archived")}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 text-center font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    Archive Lead
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <button
                    disabled={updating}
                    onClick={() => handleStatusChange("active")}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-center font-medium transition-colors shadow-2xs cursor-pointer"
                  >
                    Restore to Active
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between">
            <a
              href={`mailto:${activeLead.email}?subject=AmityHale Connection Assessment Follow-Up`}
              className="px-4 py-2 bg-[#0B2A4A] hover:bg-[#143B63] text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs text-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Lead</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg transition-colors text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

