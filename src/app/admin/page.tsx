"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useAdminData } from "@/components/admin/AdminDataContext";
import {
  getDashboardStats,
  getLeads,
  getArticlesAdmin,
  getCurrentAdminUser,
  getEffectiveBookingStatus,
} from "@/lib/admin/repositories";
import { TODAY_STRING } from "@/lib/admin/mock-data";
import { StatCard } from "@/components/admin/StatCard";
import { TodaySchedule } from "@/components/admin/TodaySchedule";
import { UpcomingBookingsTable } from "@/components/admin/UpcomingBookingsTable";
import { RecentLeadsList } from "@/components/admin/RecentLeadsList";
import { RecentArticlesList } from "@/components/admin/RecentArticlesList";
import { QuickActions } from "@/components/admin/QuickActions";
import Link from "next/link";
import {
  Calendar,
  Users,
  DollarSign,
  Sparkles,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  AdminLead,
  AdminArticleItem,
  AdminUser,
  DashboardStats,
} from "@/lib/admin/types";

export default function AdminOverviewPage() {
  const { bookings, counts, needsReviewCount, isLoaded } = useAdminData();

  const [baseStats, setBaseStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [articles, setArticles] = useState<AdminArticleItem[]>([]);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    async function loadData() {
      const [s, l, a, u] = await Promise.all([
        getDashboardStats(),
        getLeads({ status: "all" }),
        getArticlesAdmin(),
        getCurrentAdminUser(),
      ]);
      setBaseStats(s);
      setLeads(l);
      setArticles(a);
      setUser(u);
    }
    loadData();
  }, []);

  // Live today schedule calculated from shared reactive bookings
  const todaySchedule = useMemo(() => {
    return bookings
      .filter((b) => b.sessionDate === TODAY_STRING && b.status !== "cancelled")
      .map((b) => ({ ...b, status: getEffectiveBookingStatus(b) }));
  }, [bookings]);

  // Live upcoming bookings calculated from shared reactive bookings
  const upcomingBookings = useMemo(() => {
    return bookings
      .filter((b) => getEffectiveBookingStatus(b) === "confirmed")
      .map((b) => ({ ...b, status: getEffectiveBookingStatus(b) }))
      .sort((a, b) => {
        const dateA = new Date(`${a.sessionDate} ${a.sessionTime}`).getTime();
        const dateB = new Date(`${b.sessionDate} ${b.sessionTime}`).getTime();
        return dateA - dateB;
      })
      .slice(0, 6);
  }, [bookings]);

  // Determine greeting based on current hour
  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else if (hour >= 17) {
    greeting = "Good evening";
  }

  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const todayConfirmedCount = todaySchedule.filter(
    (b) => b.status === "confirmed"
  ).length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* GREETING & CONTEXT HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-stone-200/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            {greeting}, {user?.name || "Angel"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {todayFormatted} • Welcome to your private coaching console.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-stone-600 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">System Active</span>
          <span className="text-stone-300">|</span>
          <span className="font-mono text-stone-500">v1.0 (Phase 1)</span>
        </div>
      </div>

      {/* SESSIONS NEEDING REVIEW COMPACT ACTIONABLE BLOCK (Dynamically rendered only if needsReviewCount > 0) */}
      {isLoaded && needsReviewCount > 0 && (
        <Link
          href="/admin/bookings?status=needs_review"
          className="flex items-center justify-between p-3.5 sm:p-4 bg-amber-50/90 hover:bg-amber-100/80 border border-amber-200/90 rounded-xl transition-all group shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300/60 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-2">
                <span>Sessions Needing Review</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-200 text-amber-900 border border-amber-300/80">
                  {needsReviewCount}
                </span>
              </div>
              <p className="text-[11px] text-amber-800/90 mt-0.5">
                Past scheduled consultations awaiting confirmation of outcome (Completed or No-Show).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 group-hover:translate-x-0.5 transition-transform shrink-0 ml-4">
            <span className="hidden sm:inline">Review sessions</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>
      )}

      {/* TOP KPI STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Sessions"
          value={todayConfirmedCount}
          subtitle="Confirmed appointments today"
          icon={Calendar}
          iconColor="text-emerald-700"
          iconBg="bg-emerald-50"
          badge={todayConfirmedCount > 0 ? "Active" : "Open"}
        />

        <StatCard
          title="Upcoming Bookings"
          value={counts.upcoming}
          change={{
            value: "+14%",
            positive: true,
            period: "vs last month",
          }}
          icon={Users}
          iconColor="text-[#0B2A4A]"
          iconBg="bg-stone-100"
        />

        <StatCard
          title="Monthly Revenue"
          value={`$${(baseStats?.totalRevenueMonth ?? 18450).toLocaleString()}`}
          change={{
            value: `+${baseStats?.revenueGrowthPercent ?? 12}%`,
            positive: true,
            period: "target on track",
          }}
          icon={DollarSign}
          iconColor="text-emerald-700"
          iconBg="bg-emerald-50"
        />

        <StatCard
          title="New Inquiries"
          value={baseStats?.newLeadsCount ?? 14}
          subtitle="From assessment & site forms"
          icon={Sparkles}
          iconColor="text-amber-700"
          iconBg="bg-amber-50"
        />
      </div>

      {/* TODAY'S SCHEDULE BANNER */}
      <TodaySchedule bookings={todaySchedule} />

      {/* QUICK ACTIONS PANEL */}
      <QuickActions />

      {/* TWO-COLUMN GRID: UPCOMING BOOKINGS + LEADS/CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Main Column (8 cols): Upcoming sessions */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <UpcomingBookingsTable bookings={upcomingBookings} />
        </div>

        {/* Side Column (4 cols): Recent Leads & Content */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <RecentLeadsList leads={leads} />
          <RecentArticlesList articles={articles} />
        </div>
      </div>
    </div>
  );
}
