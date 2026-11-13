"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AdminLead } from "@/lib/admin/types";
import { useAdminData } from "@/components/admin/AdminDataContext";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { LeadDetailsDrawer } from "@/components/admin/LeadDetailsDrawer";
import {
  Search,
  ExternalLink,
} from "lucide-react";

function AdminLeadsContent() {
  const searchParams = useSearchParams();
  const {
    leads,
    updateLead,
    isLoaded,
  } = useAdminData();

  const statusParam = searchParams.get("status");

  // Main navigation tabs: all_leads, contacted, converted (archived is secondary)
  const [statusFilter, setStatusFilter] = useState<string>(() => {
    if (statusParam && ["contacted", "converted", "archived", "all_leads", "all_active"].includes(statusParam)) {
      return statusParam === "all_active" ? "all_leads" : statusParam;
    }
    return "all_leads";
  });

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (statusParam && ["contacted", "converted", "archived", "all_leads", "all_active"].includes(statusParam)) {
      setStatusFilter(statusParam === "all_active" ? "all_leads" : statusParam);
    }
  }, [statusParam]);

  // Derived metrics dynamically computed from shared reactive leads
  const counts = useMemo(() => {
    const contacted = leads.filter((l) => l.status === "contacted").length;
    const converted = leads.filter((l) => l.status === "converted" || (l.status as string) === "booked").length;
    const archived = leads.filter((l) => l.status === "archived").length;
    // All Leads shows all current active leads who have NOT converted and are NOT archived
    const allLeads = leads.filter(
      (l) => l.status !== "converted" && (l.status as string) !== "booked" && l.status !== "archived"
    ).length;
    const total = leads.length;
    const conversionRate = total > 0 ? Math.round((converted / total) * 1000) / 10 : 0;

    return {
      allLeads,
      contacted,
      converted,
      archived,
      total,
      conversionRate,
    };
  }, [leads]);

  // Filtered and sorted leads
  const filteredLeads = useMemo(() => {
    let list = [...leads];

    if (statusFilter === "all_leads" || statusFilter === "all_active") {
      // All Leads strictly excludes converted and archived
      list = list.filter((l) => l.status !== "converted" && (l.status as string) !== "booked" && l.status !== "archived");
    } else if (statusFilter === "contacted") {
      list = list.filter((l) => l.status === "contacted");
    } else if (statusFilter === "converted") {
      list = list.filter((l) => l.status === "converted" || (l.status as string) === "booked");
    } else if (statusFilter === "archived") {
      list = list.filter((l) => l.status === "archived");
    }

    if (areaFilter !== "all") {
      list = list.filter((l) => l.selectedArea === areaFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.phone && l.phone.toLowerCase().includes(q)) ||
          (l.primaryChallenge && l.primaryChallenge.toLowerCase().includes(q)) ||
          (l.clientId && l.clientId.toLowerCase().includes(q)) ||
          (l.convertedBookingId && l.convertedBookingId.toLowerCase().includes(q))
      );
    }

    // Sort by lead creation / intake timestamp
    list.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "oldest" ? timeA - timeB : timeB - timeA;
    });

    return list;
  }, [leads, statusFilter, areaFilter, searchQuery, sortOrder]);

  const handleLeadUpdated = (updated: AdminLead) => {
    updateLead(updated);
    if (selectedLead?.id === updated.id) {
      setSelectedLead(updated);
    }
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
    business: "Business Coaching",
    family: "Family Coaching",
    partnerships: "Partnership Coaching",
  };

  const tabs = [
    { id: "all_leads", label: "All Leads", mobileLabel: "All", count: counts.allLeads },
    { id: "contacted", label: "Contacted", mobileLabel: "Contacted", count: counts.contacted },
    { id: "converted", label: "Converted Leads", mobileLabel: "Converted", count: counts.converted },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-200/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Check-In Leads
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Active client consultation pipeline and historical conversions.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs self-start sm:self-auto">
          Active In Pipeline: <strong className="text-stone-900">{counts.allLeads}</strong>
        </div>
      </div>

      {/* TOP PIPELINE KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1: Active Leads */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Active Leads
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {counts.allLeads}
          </div>
          <p className="text-[11px] text-stone-600 font-medium mt-1">In follow-up pipeline</p>
        </div>

        {/* Metric 2: Contacted */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Contacted
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {counts.contacted}
          </div>
          <p className="text-[11px] text-sky-700 font-medium mt-1">Followed up · Awaiting booking</p>
        </div>

        {/* Metric 3: Converted */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Converted Leads
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {counts.converted}
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-1">Became paying clients</p>
        </div>

        {/* Metric 4: Conversion Rate */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
            Conversion Rate
          </span>
          <div className="text-2xl font-bold text-stone-900 font-mono">
            {counts.conversionRate}%
          </div>
          <p className="text-[11px] text-stone-400 mt-1">Leads to client conversion</p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs space-y-3">
        {/* Navigation Tabs and Search / Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Main Navigation Tabs */}
          <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/70 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white text-stone-900 shadow-xs font-semibold"
                      : "text-stone-600 hover:text-stone-900 font-medium"
                  }`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="inline sm:hidden">{tab.mobileLabel}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono font-bold ${
                      isActive
                        ? "bg-[#0B2A4A]/10 text-[#0B2A4A]"
                        : "bg-stone-200/70 text-stone-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}

            {counts.archived > 0 && (
              <button
                onClick={() => setStatusFilter(statusFilter === "archived" ? "all_leads" : "archived")}
                className={`px-2.5 py-1.5 text-xs rounded-lg transition-all whitespace-nowrap ml-1 ${
                  statusFilter === "archived"
                    ? "bg-stone-200 text-stone-900 font-semibold"
                    : "text-stone-400 hover:text-stone-700"
                }`}
                title="View archived leads"
              >
                Archived ({counts.archived})
              </button>
            )}
          </div>

          {/* Search bar and Sort Control on the RIGHT */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leads by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
            </div>

            {/* Compact Sorting Control */}
            <div className="flex items-center shrink-0">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                className="w-full sm:w-auto px-2.5 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-800 font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A] cursor-pointer shadow-2xs"
                aria-label="Sort leads by creation date"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Coaching Area Dropdown Filter */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Coaching Area:</span>
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
            >
              <option value="all">All Coaching Areas</option>
              <option value="intimacy">Intimacy Coaching</option>
              <option value="relationship">Relationship Coaching</option>
              <option value="health">Health Coaching</option>
              <option value="spiritual">Spiritual Coaching</option>
              <option value="personal_growth">Personal Growth</option>
            </select>
          </div>

          <div className="text-[11px] text-stone-400">
            Showing <strong className="text-stone-700">{filteredLeads.length}</strong> {statusFilter === "converted" ? "converted records" : "leads"}
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          {statusFilter === "converted" ? (
            /* CONVERTED LEADS TABLE */
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50/70 border-b border-stone-200/80 text-stone-500 font-medium">
                <tr>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Original Interest</th>
                  <th className="py-3 px-4 font-semibold">Relationship Focus</th>
                  <th className="py-3 px-4 font-semibold">Converted Date</th>
                  <th className="py-3 px-4 font-semibold">First Booking</th>
                  <th className="py-3 px-4 font-semibold">Client</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {!isLoaded ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-400">
                      Loading converted leads...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-400">
                      No converted leads found matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => openDrawer(lead)}
                      className="hover:bg-stone-50/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A] flex items-center gap-2">
                          <span>{lead.name}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                            Client
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                          {lead.email}
                        </div>
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

                      <td className="py-3.5 px-4 whitespace-nowrap text-stone-600" suppressHydrationWarning>
                        {lead.convertedAt
                          ? new Date(lead.convertedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[11px] font-medium text-emerald-800">
                        {lead.firstBookingDetails || (lead.firstBookingAmount ? `$${lead.firstBookingAmount}` : "45 min · $270")}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Link
                          href={lead.clientId ? `/admin/clients/${lead.clientId}` : `/admin/clients`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#0B2A4A] hover:text-[#FF5A4F] font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                        >
                          <span>View Client</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDrawer(lead);
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            /* ACTIVE LEADS TABLE (All Active, New, Contacted) */
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50/70 border-b border-stone-200/80 text-stone-500 font-medium">
                <tr>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Interest</th>
                  <th className="py-3 px-4 font-semibold">Relationship Focus</th>
                  <th className="py-3 px-4 font-semibold">Intake Date</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {!isLoaded ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-400">
                      Loading check-in leads...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-400">
                      No active leads found matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
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

                      <td className="py-3.5 px-4 whitespace-nowrap text-stone-600" suppressHydrationWarning>
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
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
                          className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MOBILE COMPACT LIST (HIDDEN ON DESKTOP) */}
      <div className="block md:hidden space-y-2.5">
        {!isLoaded ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            Loading leads...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            No leads found.
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isConverted = lead.status === "converted" || (lead.status as string) === "booked";
            return (
              <div
                key={lead.id}
                onClick={() => openDrawer(lead)}
                className="bg-white p-3.5 rounded-xl border border-stone-200 active:bg-stone-50 transition-colors shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
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
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[11px] text-stone-400" suppressHydrationWarning>
                      {new Date(lead.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11.5px]">
                  <div className="text-stone-600 flex items-center gap-1.5 truncate">
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

                  {isConverted && lead.firstBookingDetails && (
                    <span className="font-mono text-emerald-800 font-semibold shrink-0">
                      {lead.firstBookingDetails}
                    </span>
                  )}
                </div>

                {/* Mobile action bar */}
                <div className="flex items-center justify-end pt-2 border-t border-stone-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDrawer(lead);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })
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

function LeadsFallback() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-stone-100 rounded w-48 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-white rounded-xl border border-stone-200/80 p-4 animate-pulse"
          />
        ))}
      </div>
      <div className="h-96 bg-white rounded-xl border border-stone-200/80 animate-pulse" />
    </div>
  );
}

export default function AdminLeadsPage() {
  return (
    <Suspense fallback={<LeadsFallback />}>
      <AdminLeadsContent />
    </Suspense>
  );
}
