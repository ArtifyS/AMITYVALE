"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AdminLead } from "@/lib/admin/types";
import { useAdminData } from "@/components/admin/AdminDataContext";
import { StatusBadge } from "./StatusBadge";
import { LeadDetailsDrawer } from "./LeadDetailsDrawer";
import { ChevronRight, Sparkles } from "lucide-react";

interface RecentLeadsListProps {
  leads?: AdminLead[];
}

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

function formatArea(area: string): string {
  if (!area) return "";
  const norm = area.toLowerCase().trim();
  return areaLabelMap[norm] || area;
}

function formatFocus(focus?: string | null): string {
  if (!focus) return "";
  const norm = focus.toLowerCase().trim();
  return focusLabelMap[norm] || focus;
}

function formatLeadDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export function RecentLeadsList({ leads: propLeads }: RecentLeadsListProps) {
  const { leads: contextLeads, updateLead } = useAdminData();
  const leads = propLeads || contextLeads;

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Exactly 3 most recently created non-archived leads, newest first
  const recentLeads = useMemo(() => {
    return (leads || [])
      .filter((lead) => lead.status !== "archived")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }, [leads]);

  // Keep selectedLead in sync with shared reactive leads state
  const selectedLead = useMemo(() => {
    if (!selectedLeadId) return null;
    return leads.find((l) => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  const handleOpenLead = (lead: AdminLead) => {
    setSelectedLeadId(lead.id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLeadUpdated = (updated: AdminLead) => {
    updateLead(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-semibold text-stone-900 tracking-tight">
            Recent Leads
          </h2>
        </div>
        <Link
          href="/admin/leads"
          className="text-xs font-medium text-[#0B2A4A] hover:text-[#FF5A4F] flex items-center gap-1 transition-colors"
        >
          All Leads <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Leads list */}
      <div className="divide-y divide-stone-100">
        {recentLeads.length === 0 ? (
          <div className="p-6 text-center text-xs space-y-1">
            <p className="font-semibold text-stone-700">No leads yet.</p>
            <p className="text-stone-400">New Free Check-In leads will appear here.</p>
          </div>
        ) : (
          recentLeads.map((lead) => {
            const area = formatArea(lead.selectedArea);
            const focus = formatFocus(lead.relationshipFocus);
            const coachingDetails = focus ? `${area} · ${focus}` : area;

            return (
              <div
                key={lead.id}
                onClick={() => handleOpenLead(lead)}
                className="p-4 hover:bg-stone-50/70 transition-colors flex items-start justify-between gap-3 text-xs cursor-pointer group"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A] truncate">
                    {lead.name}
                  </div>
                  <div className="text-[11px] text-stone-500 truncate mt-0.5">
                    {lead.email}
                  </div>
                  {coachingDetails && (
                    <div className="text-[11px] text-stone-600 truncate mt-0.5">
                      {coachingDetails}
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                  <StatusBadge
                    status={lead.status}
                    label={lead.status === "converted" ? "Converted" : undefined}
                  />
                  <div
                    className="text-[10px] text-stone-400 font-mono"
                    suppressHydrationWarning
                  >
                    {formatLeadDate(lead.createdAt)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Shared Lead Details Drawer */}
      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onLeadUpdated={handleLeadUpdated}
      />
    </div>
  );
}
