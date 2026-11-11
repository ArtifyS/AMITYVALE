"use client";

import React, { useState, useEffect } from "react";
import {
  DaySchedule,
  BlockedDate,
  PricingSettings,
  BookingPolicySettings,
  ProfileSettings,
} from "@/lib/admin/types";
import {
  getWeeklySchedule,
  updateWeeklySchedule,
  getBlockedDates,
  addBlockedDate,
  removeBlockedDate,
  getPricingSettings,
  updatePricingSettings,
  getBookingPolicySettings,
  updateBookingPolicySettings,
  getProfileSettings,
  updateProfileSettings,
} from "@/lib/admin/repositories";
import { useToast } from "@/components/admin/ToastProvider";
import {
  Clock,
  DollarSign,
  Calendar,
  User,
  Cpu,
  Shield,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Lock,
} from "lucide-react";

type SettingsTab =
  | "availability"
  | "pricing"
  | "booking"
  | "profile"
  | "integrations"
  | "security";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>("availability");

  // State for all settings sub-sections
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");
  const [pricing, setPricing] = useState<PricingSettings>({
    duration15: 100,
    duration30: 190,
    duration45: 270,
    duration60: 300,
    additionalParticipant: 25,
  });
  const [bookingPolicy, setBookingPolicy] = useState<BookingPolicySettings>({
    minimumNoticeHours: 24,
    rescheduleCutoffHours: 24,
    cancellationCutoffHours: 24,
    defaultTimezone: "America/New_York (EST)",
  });
  const [profile, setProfile] = useState<ProfileSettings>({
    displayName: "Mr. Angel",
    businessEmail: "angel@amityhale.com",
    phone: "+1 (555) 782-3490",
    timezone: "America/New_York (EST)",
    businessName: "AmityHale",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [schedData, blockedData, pricingData, policyData, profileData] =
        await Promise.all([
          getWeeklySchedule(),
          getBlockedDates(),
          getPricingSettings(),
          getBookingPolicySettings(),
          getProfileSettings(),
        ]);
      setSchedule(schedData);
      setBlockedDates(blockedData);
      setPricing(pricingData);
      setBookingPolicy(policyData);
      setProfile(profileData);
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
        windows: !next[dayIndex].enabled && next[dayIndex].windows.length === 0
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

  // Booking policy handlers
  const handleSaveBookingPolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBookingPolicySettings(bookingPolicy);
    toast("Booking cutoff policies saved");
  };

  // Profile handlers
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfileSettings(profile);
    toast("Profile details updated");
  };

  const TABS = [
    { id: "availability", label: "Availability", icon: Clock },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "booking", label: "Booking", icon: Calendar },
    { id: "profile", label: "Profile", icon: User },
    { id: "integrations", label: "Integrations", icon: Cpu },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="pb-2 border-b border-stone-200/70">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
          Settings & Practice Controls
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Manage consultation hours, rate structures, booking policies, and integration endpoints.
        </p>
      </div>

      {/* SUB-NAVIGATION TABS */}
      <div className="flex items-center gap-1 bg-stone-100/90 p-1 rounded-xl border border-stone-200/80 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                isActive
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
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
                onClick={handleSaveAvailability}
                className="px-4 py-2 bg-[#0B2A4A] hover:bg-[#143B63] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Schedule</span>
              </button>
            </div>

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
                              onClick={() => handleRemoveTimeWindow(dIdx, wIdx)}
                              className="text-stone-400 hover:text-rose-600 transition-colors"
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
                        onClick={() => handleAddTimeWindow(dIdx)}
                        className="text-[11px] font-semibold text-[#0B2A4A] hover:underline flex items-center gap-1 px-2 py-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Window</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Block Date</span>
              </button>
            </form>

            {/* Blocked dates list */}
            <div className="space-y-2 pt-2">
              {blockedDates.map((b) => (
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
                    onClick={() => handleRemoveBlockedDate(b.id)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Remove block"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
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
                className="px-5 py-2.5 bg-[#0B2A4A] hover:bg-[#143B63] text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. BOOKING TAB */}
      {activeTab === "booking" && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs max-w-2xl space-y-5 text-xs animate-in fade-in duration-150">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-stone-900">
              Booking & Policy Windows
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Set minimum advance notices and cancellation/reschedule cutoffs.
            </p>
          </div>

          <form onSubmit={handleSaveBookingPolicy} className="space-y-4">
            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Minimum Booking Notice
              </label>
              <select
                value={bookingPolicy.minimumNoticeHours}
                onChange={(e) =>
                  setBookingPolicy({
                    ...bookingPolicy,
                    minimumNoticeHours: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              >
                <option value={12}>12 hours in advance</option>
                <option value={24}>24 hours in advance (Recommended)</option>
                <option value={48}>48 hours in advance</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Reschedule Cutoff Window
              </label>
              <select
                value={bookingPolicy.rescheduleCutoffHours}
                onChange={(e) =>
                  setBookingPolicy({
                    ...bookingPolicy,
                    rescheduleCutoffHours: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              >
                <option value={12}>Up to 12 hours before appointment</option>
                <option value={24}>Up to 24 hours before appointment</option>
                <option value={48}>Up to 48 hours before appointment</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Cancellation & Refund Cutoff
              </label>
              <select
                value={bookingPolicy.cancellationCutoffHours}
                onChange={(e) =>
                  setBookingPolicy({
                    ...bookingPolicy,
                    cancellationCutoffHours: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              >
                <option value={24}>24 hours (Full refund permitted)</option>
                <option value={48}>48 hours before session</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Default Practice Timezone
              </label>
              <input
                type="text"
                disabled
                value={bookingPolicy.defaultTimezone}
                className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-600 font-mono cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0B2A4A] hover:bg-[#143B63] text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Cutoff Policies</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. PROFILE TAB */}
      {activeTab === "profile" && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs max-w-2xl space-y-5 text-xs animate-in fade-in duration-150">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-stone-900">
              Admin & Business Profile
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Contact identities shown on appointment confirmations and email receipts.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={profile.businessName}
                onChange={(e) =>
                  setProfile({ ...profile, businessName: e.target.value })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Display Name (Coach)
              </label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) =>
                  setProfile({ ...profile, displayName: e.target.value })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Business Email Address
              </label>
              <input
                type="email"
                value={profile.businessEmail}
                onChange={(e) =>
                  setProfile({ ...profile, businessEmail: e.target.value })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
            </div>

            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0B2A4A] hover:bg-[#143B63] text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Update Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 5. INTEGRATIONS TAB */}
      {activeTab === "integrations" && (
        <div className="space-y-4 max-w-3xl text-xs animate-in fade-in duration-150">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <h2 className="text-sm font-bold text-stone-900">
                Connected Services & Backend Integrations
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Status indicators for third-party cloud services. No production API keys are exposed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Supabase */}
              <div className="p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Supabase DB</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    PostgreSQL persistence for bookings & clients
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                  Not Connected
                </span>
              </div>

              {/* Stripe */}
              <div className="p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Stripe Payments</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Checkout sessions and card processing
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                  Not Connected
                </span>
              </div>

              {/* Google Calendar */}
              <div className="p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Google Calendar</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Bi-directional availability synchronization
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                  Not Connected
                </span>
              </div>

              {/* Google Meet */}
              <div className="p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Google Meet</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Auto-generated video consultation rooms
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Available through Calendar
                </span>
              </div>

              {/* Resend */}
              <div className="p-4 rounded-xl border border-stone-200 flex items-center justify-between sm:col-span-2">
                <div>
                  <div className="font-bold text-stone-900 text-sm">Resend Email API</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Automated booking confirmations, calendar invites, and reminder sequences
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                  Not Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SECURITY TAB */}
      {activeTab === "security" && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-2xs max-w-2xl space-y-5 text-xs animate-in fade-in duration-150">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold text-stone-900">
              Security & Credential Management
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Access credentials and authentication protection.
            </p>
          </div>

          <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-800">
              <Lock className="w-4 h-4 text-stone-500" />
              <span>Multi-Factor Authentication (MFA)</span>
            </div>
            <p className="text-stone-500 leading-relaxed text-[11px]">
              Coming after Supabase authentication is connected in Phase 5.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-stone-900 text-xs">
              Change Admin Password
            </h3>
            <div className="space-y-2 max-w-sm">
              <input
                type="password"
                placeholder="Current Password"
                disabled
                className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-400 cursor-not-allowed"
              />
              <input
                type="password"
                placeholder="New Password"
                disabled
                className="w-full px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-stone-400 cursor-not-allowed"
              />
              <button
                disabled
                className="px-4 py-2 bg-stone-200 text-stone-400 rounded-lg font-semibold cursor-not-allowed"
              >
                Update Password
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100">
            <span className="font-semibold text-stone-900 block mb-1">
              Active Browser Sessions
            </span>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 block">Current Workstation</span>
                <span className="text-[11px] text-stone-400 font-mono">
                  Windows • Chrome / Edge • Active now
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
