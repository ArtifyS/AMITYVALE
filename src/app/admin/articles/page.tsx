"use client";

import React, { useState } from "react";
import { AdminArticleItem } from "@/lib/admin/types";
import { useAdminData } from "@/components/admin/AdminDataContext";
import { useToast } from "@/components/admin/ToastProvider";
import { ArticleDetailsDrawer } from "@/components/admin/ArticleDetailsDrawer";
import { Star, Eye } from "lucide-react";

export default function AdminArticlesPage() {
  const { articles, setFeaturedArticle, isLoaded } = useAdminData();
  const { success } = useToast();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = articles.find((a) => a.id === selectedArticleId) || null;

  const handleSetFeatured = (id: string) => {
    setFeaturedArticle(id);
    const target = articles.find((a) => a.id === id);
    if (target) {
      success(`"${target.title}" is now the featured article.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & METRIC SUMMARY */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-stone-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Articles
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review the AmityHale article library and manage the featured article.
          </p>
        </div>

        {/* Dynamic Article Count */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-xl border border-stone-200/80 shadow-2xs self-start sm:self-auto">
          <div className="w-2 h-2 rounded-full bg-[#0B2A4A]" />
          <span className="text-[11px] font-bold tracking-wider text-stone-500 uppercase">
            Total Articles
          </span>
          <span className="text-sm font-bold text-stone-900 font-mono">
            {articles.length}
          </span>
        </div>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/80 border-b border-stone-200/80 text-stone-500 font-medium">
              <tr>
                <th className="py-3 px-4 font-semibold">Article</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Featured</th>
                <th className="py-3 px-4 font-semibold">Updated</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {!isLoaded ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-400">
                    Loading articles...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-400">
                    No articles found.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className="hover:bg-stone-50/70 transition-colors group cursor-pointer"
                  >
                    {/* Article Title & Excerpt */}
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A] line-clamp-1">
                        {article.title}
                      </div>
                      <div className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                        {article.excerpt || `/articles/${article.slug}`}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium text-[11px]">
                        {article.category}
                      </span>
                    </td>

                    {/* Featured */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {article.featured ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 shadow-2xs">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          Featured
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetFeatured(article.id);
                          }}
                          className="text-xs text-stone-500 hover:text-[#0B2A4A] font-medium hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer"
                          title="Set this article as the site featured story"
                        >
                          Set as Featured
                        </button>
                      )}
                    </td>

                    {/* Updated */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-600">
                      <div>{article.updatedDate || article.publishedDate}</div>
                      <div className="text-[10px] text-stone-400">{article.readTime}</div>
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3.5 px-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedArticleId(article.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-500" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE COMPACT CARD LIST */}
      <div className="block md:hidden space-y-3">
        {!isLoaded ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400 bg-white rounded-xl border border-stone-200">
            No articles found.
          </div>
        ) : (
          articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-3 cursor-pointer hover:border-stone-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-stone-900 text-sm line-clamp-1">
                    {article.title}
                  </h3>
                  <div className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                    <span className="font-medium text-stone-700">{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {article.featured ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    Featured
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetFeatured(article.id);
                    }}
                    className="text-[11px] text-stone-500 hover:text-[#0B2A4A] font-medium hover:underline shrink-0"
                  >
                    Set as Featured
                  </button>
                )}
              </div>

              {article.excerpt && (
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-mono">
                  Updated {article.updatedDate || article.publishedDate}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArticleId(article.id);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ARTICLE DETAILS DRAWER */}
      <ArticleDetailsDrawer
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticleId(null)}
        onSetFeatured={handleSetFeatured}
      />
    </div>
  );
}
