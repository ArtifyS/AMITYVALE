import React from "react";
import { AdminArticleItem } from "@/lib/admin/types";
import { BookOpen, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";

interface RecentArticlesListProps {
  articles: AdminArticleItem[];
}

export function RecentArticlesList({ articles }: RecentArticlesListProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-stone-500" />
          <h2 className="text-sm font-semibold text-stone-900 tracking-tight">
            Published Articles & Editorial
          </h2>
        </div>
        <Link
          href="/admin/articles"
          className="text-xs font-medium text-[#0B2A4A] hover:text-[#FF5A4F] flex items-center gap-1 transition-colors"
        >
          Manage <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      <div className="divide-y divide-stone-100">
        {articles.slice(0, 4).map((art) => (
          <div
            key={art.id}
            className="p-4 hover:bg-stone-50/60 transition-colors flex items-center justify-between gap-3 text-xs"
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-stone-900 truncate hover:text-[#0B2A4A]">
                <Link href={`/articles/${art.slug}`} target="_blank">
                  {art.title}
                </Link>
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                <span className="text-stone-600 font-medium">{art.category}</span>
                <span>•</span>
                <span>{art.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-stone-500 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                {art.views.toLocaleString()}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-sans font-medium uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                Live
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

