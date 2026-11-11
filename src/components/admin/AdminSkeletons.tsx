import React from "react";

export function TableSkeletonRows({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="animate-pulse">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx} className="py-4 px-4">
              <div className="h-3.5 bg-stone-200/70 rounded w-full max-w-[120px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 animate-pulse space-y-3">
      <div className="h-3 bg-stone-200 rounded w-24" />
      <div className="h-7 bg-stone-300 rounded w-32" />
      <div className="h-2.5 bg-stone-100 rounded w-40" />
    </div>
  );
}

export function DrawerSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-6 bg-stone-200 rounded w-48" />
      <div className="h-24 bg-stone-100 rounded-xl" />
      <div className="h-32 bg-stone-100 rounded-xl" />
      <div className="h-40 bg-stone-100 rounded-xl" />
    </div>
  );
}

