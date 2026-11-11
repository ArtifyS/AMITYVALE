import React from "react";
import { AdminLead } from "@/lib/admin/types";
import { StatusBadge } from "./StatusBadge";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface RecentLeadsListProps {
  leads: AdminLead[];
}

export function RecentLeadsList({ leads }: RecentLeadsListProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-semibold text-stone-900 tracking-tight">
            Recent Assessment Leads
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
        {leads.length === 0 ? (
          <div className="p-6 text-center text-xs text-stone-400">
            No recent assessment leads.
          </div>
        ) : (
          leads.slice(0, 5).map((lead) => (
            <div
              key={lead.id}
              className="p-4 hover:bg-stone-50/60 transition-colors flex items-start justify-between gap-3 text-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 truncate">
                    {lead.name}
                  </span>
                  <StatusBadge status={lead.status} />
                </div>
                <div className="text-stone-500 truncate mt-0.5">{lead.email}</div>
                {lead.primaryChallenge && (
                  <p className="text-[11px] text-stone-600 line-clamp-1 mt-1.5 bg-stone-50 p-1.5 rounded border border-stone-100">
                    &ldquo;{lead.primaryChallenge}&rdquo;
                  </p>
                )}
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                  {lead.selectedArea}
                </span>
                <div className="text-[10px] text-stone-400 mt-1">
                  {new Date(lead.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

