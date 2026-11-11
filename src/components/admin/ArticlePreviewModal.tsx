"use client";

import React from "react";
import Image from "next/image";
import { X, Calendar, Clock, BookOpen, ExternalLink } from "lucide-react";

interface ArticlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category: string;
  readTime: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  publishedDate: string;
}

export function ArticlePreviewModal({
  isOpen,
  onClose,
  title,
  category,
  readTime,
  featuredImage,
  excerpt,
  content,
  publishedDate,
}: ArticlePreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP BAR */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Article Preview — Reader View
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/80 transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE ARTICLE VIEW */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-12 space-y-8 font-sans">
          {/* CATEGORY & METADATA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#0B2A4A]/10 text-[#0B2A4A] font-bold tracking-wide uppercase text-[11px]">
                {category || "Relationships"}
              </span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readTime || "5 min read"}
              </span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {publishedDate || "Today"}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
              {title || "Untitled Article"}
            </h1>

            {/* EXCERPT */}
            {excerpt && (
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-serif italic border-l-2 border-[#FF5A4F] pl-4">
                {excerpt}
              </p>
            )}
          </div>

          {/* FEATURED IMAGE */}
          {featuredImage && (
            <div className="relative w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* ARTICLE CONTENT */}
          <div className="prose prose-stone max-w-none space-y-4 text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {content || "No article content written yet."}
          </div>

          {/* COACH BIO FOOTER IN ARTICLE */}
          <div className="pt-8 border-t border-stone-200 flex items-center gap-4 bg-stone-50/60 p-6 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-[#0B2A4A] text-white flex items-center justify-center font-bold text-base shrink-0">
              A
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">Mr. Angel</div>
              <div className="text-xs text-stone-500">
                Master Relationship & Intimacy Coach • AmityHale
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

