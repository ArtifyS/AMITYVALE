"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminClient } from "@/lib/admin/types";
import { getClients } from "@/lib/admin/repositories";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  Users,
  Search,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<AdminClient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getClients(searchQuery, activeFilter);
      setClients(data);
      setLoading(false);
    }
    load();
  }, [searchQuery, activeFilter]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-200/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Clients
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            View client history, upcoming sessions, and contact information.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs self-start sm:self-auto">
          Client Records: <strong className="text-stone-900">{clients.length}</strong>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Quick Filter Tabs */}
        <div className="flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/70 overflow-x-auto">
          {[
            { id: "all", label: "All Clients" },
            { id: "active", label: "Active" },
            { id: "upcoming", label: "Has Upcoming Session" },
            { id: "past", label: "Past Clients" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                activeFilter === tab.id
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#0B2A4A] shadow-2xs"
          />
        </div>
      </div>

      {/* DESKTOP TABLE (HIDDEN ON MOBILE) */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/70 border-b border-stone-200/80 text-stone-500 font-medium">
              <tr>
                <th className="py-3 px-4 font-semibold">Client</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Sessions</th>
                <th className="py-3 px-4 font-semibold">Last Session</th>
                <th className="py-3 px-4 font-semibold">Next Session</th>
                <th className="py-3 px-4 font-semibold">Lifetime Value</th>
                <th className="py-3 px-4 font-semibold text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    Loading clients...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400">
                    No client records found.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-stone-50/70 transition-colors group"
                  >
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="group-hover:text-[#0B2A4A] flex items-center gap-1.5"
                      >
                        <span>{client.name}</span>
                      </Link>
                    </td>

                    <td className="py-3 px-4 text-stone-600 font-mono text-[11px]">
                      {client.email}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-stone-100 font-semibold text-stone-800 font-mono">
                        {client.totalBookings}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-stone-600">
                      {client.lastSessionDate || "—"}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      {client.nextSessionDate ? (
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200/70">
                          {client.nextSessionDate}
                        </span>
                      ) : (
                        <span className="text-stone-400 italic">None scheduled</span>
                      )}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap font-mono font-bold text-stone-900">
                      ${client.totalSpend.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3 h-3 text-stone-400" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE COMPACT LIST ROWS (HIDDEN ON DESKTOP) */}
      <div className="block md:hidden space-y-2">
        {loading ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            Loading clients...
          </div>
        ) : clients.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            No clients found.
          </div>
        ) : (
          clients.map((client) => (
            <Link
              key={client.id}
              href={`/admin/clients/${client.id}`}
              className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-center justify-between gap-3 active:bg-stone-50 transition-colors shadow-2xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm truncate">
                    {client.name}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-stone-100 text-[10px] font-mono text-stone-600 shrink-0">
                    {client.totalBookings} sess.
                  </span>
                </div>
                <div className="text-xs text-stone-500 truncate mt-0.5 font-mono">
                  {client.email}
                </div>
                {client.nextSessionDate && (
                  <div className="text-[11px] text-emerald-700 font-medium mt-1 truncate">
                    Next: {client.nextSessionDate}
                  </div>
                )}
              </div>

              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-stone-900 text-xs">
                  ${client.totalSpend.toLocaleString()}
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 ml-auto mt-1" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
