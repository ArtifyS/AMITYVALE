import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: string;
    positive: boolean;
    period?: string;
  };
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  badge?: string;
  href?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  iconColor = "text-[#0B2A4A]",
  iconBg = "bg-stone-100",
  badge,
  href,
}: StatCardProps) {
  const card = (
    <div
      className={cn(
        "bg-white rounded-xl border border-stone-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all",
        href
          ? "hover:border-stone-300 hover:shadow-xs cursor-pointer group"
          : "hover:border-stone-300"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[12px] font-medium uppercase tracking-wider text-stone-500">
            {title}
          </span>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-[26px] font-semibold text-stone-900 tracking-tight font-sans tabular-nums">
              {value}
            </span>
            {badge && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                {badge}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={cn(
              "p-2.5 rounded-lg flex items-center justify-center transition-transform",
              iconBg,
              href && "group-hover:scale-105"
            )}
          >
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[12px]">
          {change ? (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium tabular-nums",
                  change.positive ? "text-emerald-700" : "text-rose-700"
                )}
              >
                {change.positive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {change.value}
              </span>
              <span className="text-stone-400">{change.period || "vs last month"}</span>
            </div>
          ) : (
            <span className="text-stone-500">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus:outline-hidden">
        {card}
      </Link>
    );
  }

  return card;
}

