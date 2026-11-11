"use client";

import React, { useState } from "react";
import { Link2, Check, ExternalLink, CalendarPlus, UserCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getOrigin = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "https://amityhale.com";
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-stone-400" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Quick Actions & Links
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* ACTION 1: Copy 30m link */}
        <button
          onClick={() =>
            copyToClipboard(`${getOrigin()}/book?duration=30`, "30m")
          }
          className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200/80 rounded-lg text-left transition-all group flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
              Copy 30m Booking Link
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">$190 • Featured Single Check-in</div>
          </div>
          <div className="p-1.5 rounded bg-white text-stone-500 shadow-2xs">
            {copiedKey === "30m" ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Link2 className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700" />
            )}
          </div>
        </button>

        {/* ACTION 2: Copy 60m link */}
        <button
          onClick={() =>
            copyToClipboard(`${getOrigin()}/book?duration=60`, "60m")
          }
          className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200/80 rounded-lg text-left transition-all group flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
              Copy 60m Booking Link
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">$300 • Deep Dive Session</div>
          </div>
          <div className="p-1.5 rounded bg-white text-stone-500 shadow-2xs">
            {copiedKey === "60m" ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Link2 className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700" />
            )}
          </div>
        </button>

        {/* ACTION 3: Lead Intake Link */}
        <Link
          href="/admin/leads"
          className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200/80 rounded-lg text-left transition-all group flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
              Check-in Assessment
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Review prospective leads</div>
          </div>
          <div className="p-1.5 rounded bg-white text-stone-500 shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700" />
          </div>
        </Link>

        {/* ACTION 4: Client Booking Portal */}
        <a
          href="/book"
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-stone-50 hover:bg-stone-100 border border-stone-200/80 rounded-lg text-left transition-all group flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
              Test Live Booking Flow
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Open client checkout</div>
          </div>
          <div className="p-1.5 rounded bg-white text-stone-500 shadow-2xs">
            <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700" />
          </div>
        </a>
      </div>
    </div>
  );
}

