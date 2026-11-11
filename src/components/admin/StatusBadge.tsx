import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "confirmed"
  | "needs_review"
  | "completed"
  | "no_show"
  | "cancelled"
  | "in_progress"
  | "paid"
  | "pending"
  | "refunded"
  | "new"
  | "contacted"
  | "scheduled"
  | "archived"
  | "active"
  | "published"
  | "draft";

interface StatusBadgeProps {
  status: BadgeVariant | string;
  label?: string;
  className?: string;
  showDot?: boolean;
}

const BADGE_STYLES: Record<string, { bg: string; text: string; dot: string; defaultLabel: string }> = {
  confirmed: {
    bg: "bg-emerald-50 border-emerald-200/80",
    text: "text-emerald-800",
    dot: "bg-emerald-500",
    defaultLabel: "Confirmed",
  },
  needs_review: {
    bg: "bg-amber-50 border-amber-200/90",
    text: "text-amber-800",
    dot: "bg-amber-500",
    defaultLabel: "Needs Review",
  },
  completed: {
    bg: "bg-teal-50 border-teal-200/80",
    text: "text-teal-800",
    dot: "bg-teal-500",
    defaultLabel: "Completed",
  },
  no_show: {
    bg: "bg-orange-50 border-orange-200/80",
    text: "text-orange-800",
    dot: "bg-orange-500",
    defaultLabel: "No-Show",
  },
  in_progress: {
    bg: "bg-amber-50 border-amber-200/80",
    text: "text-amber-800",
    dot: "bg-amber-500 animate-pulse",
    defaultLabel: "In Progress",
  },
  cancelled: {
    bg: "bg-rose-50 border-rose-200/80",
    text: "text-rose-700",
    dot: "bg-rose-400",
    defaultLabel: "Cancelled",
  },
  paid: {
    bg: "bg-emerald-50 border-emerald-200/80",
    text: "text-emerald-800",
    dot: "bg-emerald-500",
    defaultLabel: "Paid",
  },
  pending: {
    bg: "bg-amber-50 border-amber-200/80",
    text: "text-amber-800",
    dot: "bg-amber-500",
    defaultLabel: "Pending",
  },
  refunded: {
    bg: "bg-rose-50 border-rose-200/80",
    text: "text-rose-800",
    dot: "bg-rose-500",
    defaultLabel: "Refunded",
  },
  new: {
    bg: "bg-teal-50 border-teal-200/80",
    text: "text-teal-800",
    dot: "bg-teal-500",
    defaultLabel: "New Lead",
  },
  contacted: {
    bg: "bg-sky-50 border-sky-200/80",
    text: "text-sky-800",
    dot: "bg-sky-500",
    defaultLabel: "Contacted",
  },
  scheduled: {
    bg: "bg-purple-50 border-purple-200/80",
    text: "text-purple-800",
    dot: "bg-purple-500",
    defaultLabel: "Scheduled",
  },
  archived: {
    bg: "bg-stone-100 border-stone-200",
    text: "text-stone-500",
    dot: "bg-stone-400",
    defaultLabel: "Archived",
  },
  active: {
    bg: "bg-emerald-50 border-emerald-200/80",
    text: "text-emerald-800",
    dot: "bg-emerald-500",
    defaultLabel: "Active",
  },
  published: {
    bg: "bg-teal-50 border-teal-200/80",
    text: "text-teal-800",
    dot: "bg-teal-500",
    defaultLabel: "Published",
  },
  draft: {
    bg: "bg-stone-100 border-stone-200",
    text: "text-stone-600",
    dot: "bg-stone-400",
    defaultLabel: "Draft",
  },
};

export function StatusBadge({ status, label, className, showDot = true }: StatusBadgeProps) {
  const key = status.toLowerCase();
  const config = BADGE_STYLES[key] || {
    bg: "bg-stone-100 border-stone-200",
    text: "text-stone-700",
    dot: "bg-stone-400",
    defaultLabel: status,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11.5px] font-medium border tracking-wide select-none transition-colors",
        config.bg,
        config.text,
        className
      )}
    >
      {showDot && <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />}
      <span>{label || config.defaultLabel}</span>
    </span>
  );
}

