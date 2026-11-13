"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminArticleItem } from "@/lib/admin/types";
import {
  X,
  Star,
  Calendar,
  Clock,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Tag,
} from "lucide-react";

interface ArticleDetailsDrawerProps {
  article: AdminArticleItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSetFeatured: (id: string) => void;
}

export function ArticleDetailsDrawer({
  article,
  isOpen,
  onClose,
  onSetFeatured,
}: ArticleDetailsDrawerProps) {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div
          className="w-screen max-w-full sm:max-w-md md:max-w-lg bg-white shadow-2xl border-l border-stone-200 flex flex-col h-full animate-in slide-in-from-right duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="px-6 py-5 border-b border-stone-200 bg-stone-50/80 flex items-start justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                  {article.category}
                </span>

                {article.featured ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    Featured
                  </span>
                ) : (
                  <span className="text-[11px] text-stone-400 font-medium">
                    Standard Article
                  </span>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight leading-snug">
                {article.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/80 transition-colors shrink-0"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* FEATURED IMAGE (IF AVAILABLE) */}
            {article.featuredImage && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* EXCERPT / SUMMARY */}
            <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200/80 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                Article Summary & Excerpt
              </span>
              <p className="text-sm text-stone-700 leading-relaxed font-serif italic border-l-2 border-[#0B2A4A] pl-3">
                {article.excerpt || "No excerpt provided for this article."}
              </p>
            </div>

            {/* METADATA GRID */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-stone-50/60 rounded-xl border border-stone-200/60">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Reading Time
                </span>
                <div className="flex items-center gap-1.5 mt-1 font-semibold text-stone-800">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{article.readTime || "5 min read"}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50/60 rounded-xl border border-stone-200/60">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Last Updated
                </span>
                <div className="flex items-center gap-1.5 mt-1 font-semibold text-stone-800">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{article.updatedDate || article.publishedDate || "Recently"}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50/60 rounded-xl border border-stone-200/60">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Category
                </span>
                <div className="flex items-center gap-1.5 mt-1 font-semibold text-stone-800">
                  <Tag className="w-3.5 h-3.5 text-stone-400" />
                  <span>{article.category}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50/60 rounded-xl border border-stone-200/60">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                  Public Path
                </span>
                <div className="mt-1 font-mono text-[11px] text-stone-700 truncate" title={`/articles/${article.slug}`}>
                  /{article.slug}
                </div>
              </div>
            </div>

            {/* PUBLIC ARTICLE LINK BUTTON */}
            <div className="pt-2">
              <Link
                href={`/articles/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-stone-50 rounded-xl border border-stone-200/90 text-stone-800 font-medium transition-colors shadow-2xs group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#0B2A4A]" />
                  <span className="text-xs font-semibold text-[#0B2A4A] group-hover:underline">
                    View Live Public Article
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 transition-colors" />
              </Link>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="p-5 border-t border-stone-200 bg-stone-50/80">
            {article.featured ? (
              <div className="w-full py-2.5 px-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold rounded-xl flex items-center justify-center gap-2">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Currently Featured on Site</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onSetFeatured(article.id)}
                className="w-full py-2.5 px-4 bg-[#0B2A4A] hover:bg-[#143B63] text-white text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Set as Featured</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

