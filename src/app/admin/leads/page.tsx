"use client";

import React, { useState, useEffect } from "react";
import { AdminLead, LeadMetrics, LeadStatus } from "@/lib/admin/types";
import { getLeads, getLeadMetrics } from "@/lib/admin/repositories";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LeadDetailsDrawer } from "@/components/admin/LeadDetailsDrawer";
import {
  Sparkles,
  Search,
  Filter,
  Users,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Mail,
  ChevronRight,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [metrics, setMetrics] = useState<LeadMetrics>({
    newLeads: 0,
    booked: 0,
    conversionRate: 0,
    thisWeek: 0,
    total: 0,
  });

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [relationshipFocusFilter, setRelationshipFocusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [metricsData, listData] = await Promise.all([
      getLeadMetrics(),
      getLeads({
        status: statusFilter,
        coachingArea: areaFilter,
        relationshipFocus: relationshipFocusFilter,
        search: searchQuery,
      }),
    ]);
    setMetrics(metricsData);
    setLeads(listData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, areaFilter, relationshipFocusFilter, searchQuery]);

  const handleLeadUpdated = (updated: AdminLead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    if (selectedLead?.id === updated.id) {
      setSelectedLead(updated);
    }
    getLeadMetrics().then(setMetrics);
  };

  const openDrawer = (lead: AdminLead) => {
    setSelectedLead(lead);
    setIsDrawerOpen(true);
  };

  const areaLabelMap: Record<string, string> = {
    intimacy: "Intimacy Coaching",
    relationship: "Relationship Coaching",
    health: "Health Coaching",
    spiritual: "Spiritual Coaching",
    personal_growth: "Personal Growth",
  };

  const focusLabelMap: Record<string, string> = {
    business: "Business",
    family: "Family",
    partnerships: "Partnership",
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-200/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Check-In Leads
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            View people who completed or started the Free Connection Check-In.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs self-start sm:self-auto">
          Total Submissions: <strong className="text-stone-900">{metrics.total}</strong>
        </div>
      </div>

      {/* TOP LEAD SUMMARY METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1: New Leads */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            New Leads
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {metrics.newLeads}
          </div>
          <p className="text-[11px] text-teal-700 font-medium mt-1">Awaiting initial follow-up</p>
        </div>

        {/* Metric 2: Booked */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Booked
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {metrics.booked}
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Converted to clients</p>
        </div>

        {/* Metric 3: Conversion Rate */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Conversion
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {metrics.conversionRate}%
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Lead to booking conversion</p>
        </div>

        {/* Metric 4: This Week */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            This Week
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {metrics.thisWeek}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Received past 7 days</p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
        {/* Status Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/70 overflow-x-auto">
            {[
              { id: "all", label: "All" },
              { id: "new", label: "New" },
              { id: "contacted", label: "Contacted" },
              { id: "booked", label: "Booked" },
              { id: "archived", label: "Archived" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  statusFilter === tab.id
                    ? "bg-white text-stone-900 shadow-xs font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
            />
          </div>
        </div>

        {/* Coaching Area & Relationship Focus Dropdowns */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Coaching Area:</span>
            <select
              value={areaFilter}
              onChange={(e) => {
                setAreaFilter(e.target.value);
                if (e.target.value !== "relationship") {
                  setRelationshipFocusFilter("all");
                }
              }}
              className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
            >
              <option value="all">All Areas</option>
              <option value="intimacy">Intimacy</option>
              <option value="relationship">Relationship</option>
              <option value="health">Health</option>
              <option value="spiritual">Spiritual</option>
              <option value="personal_growth">Personal Growth</option>
            </select>
          </div>

          {/* Conditional Relationship Focus Filter */}
          {areaFilter === "relationship" && (
            <div className="flex items-center gap-2 animate-in fade-in duration-150">
              <span className="text-stone-500 font-medium">Focus:</span>
              <select
                value={relationshipFocusFilter}
                onChange={(e) => setRelationshipFocusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              >
                <option value="all">All Focuses</option>
                <option value="business">Business</option>
                <option value="family">Family</option>
                <option value="partnerships">Partnerships</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP TABLE (HIDDEN ON MOBILE) */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/70 border-b border-stone-200/80 text-stone-500 font-medium">
              <tr>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Interest</th>
                <th className="py-3 px-4 font-semibold">Relationship Focus</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    Loading check-in leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    No leads found matching current filters.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => openDrawer(lead)}
                    className="hover:bg-stone-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                      {lead.name}
                    </td>

                    <td className="py-3.5 px-4 text-stone-600 font-mono text-[11px]">
                      {lead.email}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-stone-800">
                      {areaLabelMap[lead.selectedArea] || lead.selectedArea}
                    </td>

                    <td className="py-3.5 px-4 text-stone-600">
                      {lead.relationshipFocus ? (
                        <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                          {focusLabelMap[lead.relationshipFocus] || lead.relationshipFocus}
                        </span>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-600">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={lead.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDrawer(lead);
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE COMPACT LIST (HIDDEN ON DESKTOP) */}
      <div className="block md:hidden space-y-2">
        {loading ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            No leads found.
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => openDrawer(lead)}
              className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-center justify-between gap-3 active:bg-stone-50 transition-colors shadow-2xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm truncate">
                    {lead.name}
                  </span>
                  <StatusBadge status={lead.status} />
                </div>
                <div className="text-xs text-stone-500 font-mono truncate mt-0.5">
                  {lead.email}
                </div>
                <div className="text-[11px] text-stone-600 mt-1 flex items-center gap-1.5">
                  <span>{areaLabelMap[lead.selectedArea] || lead.selectedArea}</span>
                  {lead.relationshipFocus && (
                    <>
                      <span>•</span>
                      <span className="font-medium text-stone-700">
                        {focusLabelMap[lead.relationshipFocus] || lead.relationshipFocus}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-[11px] text-stone-400">
                  {new Date(lead.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 ml-auto mt-1" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* LEAD DETAIL DRAWER */}
      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onLeadUpdated={handleLeadUpdated}
      />
    </div>
  );
}
