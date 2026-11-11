"use client";

import React, { useState, useEffect } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { CommandSearchModal } from "./CommandSearchModal";
import { NotificationsDrawer } from "./NotificationsDrawer";
import { BookingDetailsDrawer } from "./BookingDetailsDrawer";
import { LeadDetailsDrawer } from "./LeadDetailsDrawer";
import { getNotifications } from "@/lib/admin/repositories";
import { AdminBooking, AdminLead } from "@/lib/admin/types";

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export function AdminHeader({
  onOpenMobileSidebar,
  title,
  subtitle,
}: AdminHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  // Search inspection drawers
  const [inspectedBooking, setInspectedBooking] = useState<AdminBooking | null>(null);
  const [inspectedLead, setInspectedLead] = useState<AdminLead | null>(null);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    getNotifications().then((list) => {
      setUnreadCount(list.filter((n) => !n.read).length);
    });
  }, [isNotifOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-xs border-b border-stone-200/80 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {title && (
            <div>
              <h1 className="text-base font-semibold text-stone-900 tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[11px] text-stone-500 hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right: Search, Status, Notifications, Action */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Availability Badge */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[11px] font-medium text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Calendar Online</span>
          </div>

          {/* Global Search shortcut button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative hidden sm:flex items-center gap-2 px-3 py-1.5 bg-stone-100/90 hover:bg-stone-200/80 text-stone-500 rounded-lg border border-stone-200/70 text-xs w-56 text-left transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-stone-400 font-normal truncate">
              Search clients, bookings...
            </span>
            <kbd className="ml-auto text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200 text-stone-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Mobile search icon button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="sm:hidden p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Open search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors relative"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF5A4F] rounded-full ring-2 ring-white" />
            )}
          </button>
        </div>
      </header>

      {/* GLOBAL SEARCH COMMAND MODAL */}
      <CommandSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectBooking={(b) => setInspectedBooking(b)}
        onSelectLead={(l) => setInspectedLead(l)}
      />

      {/* NOTIFICATIONS DRAWER */}
      <NotificationsDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />

      {/* INSPECTED BOOKING DRAWER */}
      <BookingDetailsDrawer
        booking={inspectedBooking}
        isOpen={!!inspectedBooking}
        onClose={() => setInspectedBooking(null)}
      />

      {/* INSPECTED LEAD DRAWER */}
      <LeadDetailsDrawer
        lead={inspectedLead}
        isOpen={!!inspectedLead}
        onClose={() => setInspectedLead(null)}
        onLeadUpdated={(updated) => setInspectedLead(updated)}
      />
    </>
  );
}
