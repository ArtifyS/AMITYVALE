"use client";

import React, { useState, useEffect } from "react";
import { AdminNotification } from "@/lib/admin/types";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/admin/repositories";
import {
  Bell,
  X,
  CalendarCheck,
  CalendarClock,
  Sparkles,
  BookOpen,
  Check,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClicked?: () => void;
}

export function NotificationsDrawer({
  isOpen,
  onClose,
  onNotificationClicked,
}: NotificationsDrawerProps) {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getNotifications();
      setNotifications(data);
    }
    if (isOpen) {
      load();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMarkAllRead = async () => {
    await markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleItemClick = async (notif: AdminNotification) => {
    if (!notif.read) {
      await markNotificationRead(notif.id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
      );
    }
    onNotificationClicked?.();
    onClose();
  };

  const getIcon = (type: AdminNotification["type"]) => {
    switch (type) {
      case "booking":
        return <CalendarCheck className="w-4 h-4 text-emerald-600" />;
      case "reschedule":
        return <CalendarClock className="w-4 h-4 text-blue-600" />;
      case "lead":
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case "article":
        return <BookOpen className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/30 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-sm bg-white shadow-2xl border-l border-stone-200 flex flex-col h-full animate-in slide-in-from-right duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="px-5 py-4 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-stone-700" />
              <h3 className="text-sm font-bold text-stone-900">Notifications</h3>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleMarkAllRead}
                className="px-2 py-1 text-[11px] text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded transition-colors flex items-center gap-1"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark Read</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 text-xs">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-stone-400">
                No notifications right now.
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleItemClick(n)}
                  className={`p-4 transition-colors cursor-pointer flex items-start gap-3 hover:bg-stone-50/80 ${
                    !n.read ? "bg-stone-50/50" : ""
                  }`}
                >
                  <div className="p-2 rounded-lg bg-stone-100 shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-stone-900 truncate">
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#FF5A4F] shrink-0" />
                      )}
                    </div>
                    <p className="text-stone-600 text-[11px] mt-0.5 leading-relaxed">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono mt-1 block">
                      {new Date(n.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

