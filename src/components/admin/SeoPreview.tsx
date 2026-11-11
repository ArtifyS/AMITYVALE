import React from "react";
import { Globe } from "lucide-react";

interface SeoPreviewProps {
  title: string;
  slug: string;
  description: string;
}

export function SeoPreview({ title, slug, description }: SeoPreviewProps) {
  const displayTitle = title || "Article Title | AmityHale";
  const displaySlug = slug || "article-slug";
  const displayDesc =
    description ||
    "Private, confidential relationship and intimacy coaching online with Mr. Angel. Read this article for practical guidance.";

  return (
    <div className="bg-stone-50/80 p-3.5 rounded-xl border border-stone-200/80 space-y-1.5 text-xs">
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
        <Globe className="w-3.5 h-3.5 text-stone-400" />
        <span>Google Search Preview</span>
      </div>

      <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
        <div className="text-[11px] text-stone-500 font-mono truncate">
          https://amityhale.com › articles › {displaySlug}
        </div>
        <div className="text-sm font-semibold text-blue-700 hover:underline line-clamp-1 cursor-pointer">
          {displayTitle}
        </div>
        <div className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
          {displayDesc}
        </div>
      </div>
    </div>
  );
}

