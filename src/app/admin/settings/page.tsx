"use client";

import React, { useState, useEffect } from "react";
import {
  DaySchedule,
  BlockedDate,
  PricingSettings,
} from "@/lib/admin/types";
import {
  getWeeklySchedule,
  updateWeeklySchedule,
  getBlockedDates,
  addBlockedDate,
  removeBlockedDate,
  getPricingSettings,
  updatePricingSettings,
} from "@/lib/admin/repositories";
import { useToast } from "@/components/admin/ToastProvider";
import {
  Clock,
  DollarSign,
  Plus,
  Trash2,
  Save,
  AlertCircle,
} from "lucide-react";

type SettingsTab = "availability" | "pricing";

const TABS: { id: SettingsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "availability", label: "Availability", icon: Clock },
  { id: "pricing", label: "Pricing", icon: DollarSign },
];

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>("availability");

  // State for Availability
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");

  // State for Pricing
  const [pricing, setPricing] = useState<PricingSettings>({
    duration15: 100,
    duration30: 190,
    duration45: 270,
    duration60: 300,
    additionalParticipant: 25,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [schedData, blockedData, pricingData] = await Promise.all([
        getWeeklySchedule(),
        getBlockedDates(),
        getPricingSettings(),
      ]);
      setSchedule(schedData);
      setBlockedDates(blockedData);
      setPricing(pricingData);
      setLoading(false);
    }
    load();
  }, []);

  // Availability handlers
  const handleToggleDay = (dayIndex: number) => {
    setSchedule((prev) => {
      const next = [...prev];
      next[dayIndex] = {
        ...next[dayIndex],
        enabled: !next[dayIndex].enabled,
        windows:
          !next[dayIndex].enabled && next[dayIndex].windows.length === 0
            ? [{ start: "09:00 AM", end: "04:00 PM" }]
            : next[dayIndex].windows,
      };
      return next;
    });
  };

  const handleAddTimeWindow = (dayIndex: number) => {
    setSchedule((prev) => {
      const next = [...prev];
      next[dayIndex] = {
        ...next[dayIndex],
        windows: [...next[dayIndex].windows, { start: "01:00 PM", end: "05:00 PM" }],
      };
      return next;
    });
  };

  const handleRemoveTimeWindow = (dayIndex: number, windowIndex: number) => {
    setSchedule((prev) => {
      const next = [...prev];
      next[dayIndex] = {
        ...next[dayIndex],
        windows: next[dayIndex].windows.filter((_, idx) => idx !== windowIndex),
      };
      return next;
    });
  };

  const handleSaveAvailability = async () => {
    await updateWeeklySchedule(schedule);
    toast("Weekly schedule saved locally");
  };

  const handleAddBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedDate) return;
    const added = await addBlockedDate(
      newBlockedDate,
      newBlockedReason.trim() || "Practice Unavailable"
    );
    setBlockedDates((prev) => [added, ...prev]);
    setNewBlockedDate("");
    setNewBlockedReason("");
    toast("Blocked date added");
  };

  const handleRemoveBlockedDate = async (id: string) => {
    await removeBlockedDate(id);
    setBlockedDates((prev) => prev.filter((b) => b.id !== id));
    toast("Blocked date removed");
  };

  // Pricing handlers
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePricingSettings(pricing);
    toast("Consultation rates saved locally (UI staging mode)");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="pb-3 border-b border-stone-200/80">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
          Settings & Practice Controls
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Manage consultation hours, weekly schedule, blocked dates, and session rate structures.
        </p>
      </div>

      {/* COMPACT SUB-NAVIGATION TABS */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-stone-100/90 p-1.5 rounded-xl border border-stone-200/80 shadow-2xs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-stone-900 shadow-xs font-semibold"
                    : "text-stone-500 hover:text-stone-900 hover:bg-stone-200/60"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isActive ? "text-[#0B2A4A]" : "text-stone-400"
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. AVAILABILITY TAB */}
      {activeTab === "availability" && (
        <div className="space-y-6 max-w-4xl animate-in fade-in duration-150">
          {/* WEEKLY SCHEDULE */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-stone-900">
                  Weekly Consultation Hours
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Set recurring days and hours when clients can book check-ins and sessions.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSaveAvailability}
                className="px-4 py-2 bg-[#0B2A4A] hover:bg-[#143B63] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Schedule</span>
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-stone-400">
                Loading schedule...
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {schedule.map((dayItem, dIdx) => (
                  <div
                    key={dayItem.day}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    {/* Day switch */}
                    <div className="flex items-center gap-3 w-36">
                      <input
                        type="checkbox"
                        checked={dayItem.enabled}
                        onChange={() => handleToggleDay(dIdx)}
                        className="w-4 h-4 text-[#0B2A4A] rounded border-stone-300 focus:ring-[#0B2A4A]"
                      />
                      <span
                        className={`font-semibold ${
                          dayItem.enabled ? "text-stone-900" : "text-stone-400"
                        }`}
                      >
                        {dayItem.day}
                      </span>
                    </div>

                    {/* Windows */}
                    <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-wrap">
                      {dayItem.enabled ? (
                        dayItem.windows.map((win, wIdx) => (
                          <div
                            key={wIdx}
                            className="flex items-center gap-2 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg"
                          >
                            <input
                              type="text"
                              value={win.start}
                              onChange={(e) => {
                                const next = [...schedule];
                                next[dIdx].windows[wIdx].start = e.target.value;
                                setSchedule(next);
                              }}
                              className="w-20 bg-transparent text-xs font-mono font-medium text-stone-900 text-center outline-none border-b border-stone-300 focus:border-[#0B2A4A]"
                            />
                            <span className="text-stone-400">–</span>
                            <input
                              type="text"
                              value={win.end}
                              onChange={(e) => {
                                const next = [...schedule];
                                next[dIdx].windows[wIdx].end = e.target.value;
                                setSchedule(next);
                              }}
                              className="w-20 bg-transparent text-xs font-mono font-medium text-stone-900 text-center outline-none border-b border-stone-300 focus:border-[#0B2A4A]"
                            />
                            {dayItem.windows.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveTimeWindow(dIdx, wIdx)}
                                className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                                title="Remove time window"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <span className="text-stone-400 italic">Unavailable</span>
                      )}

                      {dayItem.enabled && (
                        <button
                          type="button"
                          onClick={() => handleAddTimeWindow(dIdx)}
                          className="text-[11px] font-semibold text-[#0B2A4A] hover:underline flex items-center gap-1 px-2 py-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Window</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BLOCKED DATES */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-sm font-bold text-stone-900">
                Blocked Dates & Holidays
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Block specific days on your calendar for vacations, holidays, or personal development.
              </p>
            </div>

            {/* Add blocked date form */}
            <form onSubmit={handleAddBlockedDate} className="flex flex-col sm:flex-row gap-3 text-xs">
              <input
                type="date"
                required
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
              <input
                type="text"
                placeholder="Reason (e.g. Winter Holiday, Practice Closed)..."
                value={newBlockedReason}
                onChange={(e) => setNewBlockedReason(e.target.value)}
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Block Date</span>
              </button>
            </form>

            {/* Blocked dates list */}
            <div className="space-y-2 pt-2">
              {blockedDates.length === 0 ? (
                <div className="py-4 text-center text-xs text-stone-400">
                  No blocked dates configured.
                </div>
              ) : (
                blockedDates.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-stone-900">
                        {b.date}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-700 font-medium">{b.reason}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveBlockedDate(b.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove block"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. PRICING TAB */}
      {activeTab === "pricing" && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs max-w-2xl space-y-5 text-xs animate-in fade-in duration-150">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-stone-900">
              Consultation Rates & Duration Tiers
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Configure rates for single check-ins, deep-dives, and additional participants.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Staging / Preparation Mode</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              These values configure administrative draft pricing. They do not alter the public pricing engine until backend sync is enabled in Phase 5.
            </p>
          </div>

          <form onSubmit={handleSavePricing} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  15 Minutes Check-In ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    value={pricing.duration15}
                    onChange={(e) =>
                      setPricing({ ...pricing, duration15: Number(e.target.value) })
                    }
                    className="w-full pl-7 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  30 Minutes Focused Session ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    value={pricing.duration30}
                    onChange={(e) =>
                      setPricing({ ...pricing, duration30: Number(e.target.value) })
                    }
                    className="w-full pl-7 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  45 Minutes Extended Session ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    value={pricing.duration45}
                    onChange={(e) =>
                      setPricing({ ...pricing, duration45: Number(e.target.value) })
                    }
                    className="w-full pl-7 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  60 Minutes Comprehensive ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    value={pricing.duration60}
                    onChange={(e) =>
                      setPricing({ ...pricing, duration60: Number(e.target.value) })
                    }
                    className="w-full pl-7 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-600 font-medium mb-1">
                  Additional Participant Fee ($ per extra attendee)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono">
                    $
                  </span>
                  <input
                    type="number"
                    value={pricing.additionalParticipant}
                    onChange={(e) =>
                      setPricing({
                        ...pricing,
                        additionalParticipant: Number(e.target.value),
                      })
                    }
                    className="w-full pl-7 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 font-mono font-bold focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                  />
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Every session includes 1 person. Each added participant adds this flat surcharge.
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0B2A4A] hover:bg-[#143B63] text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
