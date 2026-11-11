"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck,
  Users,
  Sparkles,
  CreditCard,
  BookOpen,
  Settings,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

const NAV_ITEMS = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
  },
  {
    name: "Calendar",
    href: "/admin/calendar",
    icon: CalendarDays,
  },
  {
    name: "Clients",
    href: "/admin/clients",
    icon: Users,
  },
  {
    name: "Leads",
    href: "/admin/leads",
    icon: Sparkles,
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    name: "Articles",
    href: "/admin/articles",
    icon: BookOpen,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="w-64 bg-[#0B2A4A] text-white flex flex-col h-full border-r border-[#153D66] select-none">
      {/* BRAND & HEADER */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-[#153D66]/80 shrink-0">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/60 rounded"
          onClick={onCloseMobile}
        >
          <div className="relative w-7 h-7 rounded-lg bg-[#FF5A4F] flex items-center justify-center font-bold text-white text-sm shadow-xs">
            A
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-stone-100 tracking-tight text-sm">
              AmityHale
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#D8A23D]/20 text-[#D8A23D] border border-[#D8A23D]/30">
              Admin
            </span>
          </div>
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-stone-400 hover:text-white rounded-md hover:bg-[#153D66] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* NAVIGATION LINKS */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Operations
        </div>
        {NAV_ITEMS.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group",
                active
                  ? "bg-[#143B63] text-white shadow-xs font-semibold"
                  : "text-stone-300 hover:text-white hover:bg-[#123356]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors shrink-0",
                  active
                    ? "text-[#FF5A4F]"
                    : "text-stone-400 group-hover:text-stone-200"
                )}
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* FOOTER & LOGOUT */}
      <div className="p-3 border-t border-[#153D66]/80 shrink-0 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-300 hover:text-white hover:bg-[#123356] rounded-lg transition-colors group"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-200" />
            <span>View Public Site</span>
          </span>
          <span className="text-[10px] text-stone-500 group-hover:text-stone-400">amityhale.com</span>
        </a>

        {/* User Card */}
        <div className="p-2.5 bg-[#081F38] rounded-lg border border-[#143B63]/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#D8A23D] text-[#0B2A4A] font-bold text-xs flex items-center justify-center shrink-0">
              A
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-stone-100 truncate">
                Angel
              </div>
              <div className="text-[10px] text-stone-400 truncate">
                Master Coach / Owner
              </div>
            </div>
          </div>

          <Link
            href="/admin/login"
            className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-[#123356] rounded transition-colors"
            title="Sign out of Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

