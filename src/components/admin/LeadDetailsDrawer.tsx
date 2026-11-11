"use client";

import React, { useState } from "react";
import { AdminLead, LeadStatus } from "@/lib/admin/types";
import { updateMockLeadStatus } from "@/lib/admin/repositories";
import { StatusBadge } from "./StatusBadge";
import {
  X,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Archive,
  ArrowRight,
  ExternalLink,
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
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/80 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* STATUS UPDATE CONTROLLER */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-stone-800 block text-xs">
                  Lead Management Status
                </span>
                <span className="text-[11px] text-stone-400">
                  Update intake stage in practice pipeline
                </span>
              </div>

              <select
                disabled={updating}
                value={activeLead.status}
                onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#0B2A4A] shadow-2xs"
              >
                <option value="new">New Lead</option>
                <option value="contacted">Contacted</option>
                <option value="booked">Booked Consultation</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* CONTACT & DATE INFO */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
              <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-400">
                Contact & Assessment Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <span className="text-stone-800 font-medium">
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

            {/* SELECTED COACHING DISCIPLINE */}
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

            {/* INTAKE / PRIMARY STATED CHALLENGE */}
            <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-400">
                  Stated Challenge & Reflection
                </h3>
                <span className="text-[10px] text-stone-400">Confidential response</span>
              </div>

              {activeLead.primaryChallenge ? (
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-stone-800 italic leading-relaxed">
                  &ldquo;{activeLead.primaryChallenge}&rdquo;
                </div>
              ) : (
                <p className="text-stone-400 italic">No specific challenge entered.</p>
              )}

              {activeLead.assessmentSummary && (
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-stone-400 block text-[11px] mb-1">
                    Assessment Summary:
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    {activeLead.assessmentSummary}
                  </p>
                </div>
              )}
            </div>

            {/* QUICK ACTIONS BAR */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Quick Pipeline Actions
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleStatusChange("contacted")}
                  disabled={activeLead.status === "contacted"}
                  className="p-2.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-center font-medium disabled:opacity-40 transition-colors shadow-2xs"
                >
                  Mark Contacted
                </button>

                <button
                  onClick={() => handleStatusChange("booked")}
                  disabled={activeLead.status === "booked"}
                  className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-center font-medium disabled:opacity-40 transition-colors shadow-2xs"
                >
                  Mark Booked
                </button>

                <button
                  onClick={() => handleStatusChange("archived")}
                  disabled={activeLead.status === "archived"}
                  className="p-2.5 rounded-lg border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-600 text-center font-medium disabled:opacity-40 transition-colors shadow-2xs"
                >
                  Archive
                </button>
              </div>
            </div>

            {/* PRIVACY SHIELD FOOTNOTE */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex items-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Assessment privacy protected: raw quiz answers are kept isolated and are not rendered unnecessarily.
              </span>
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
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg transition-colors text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

