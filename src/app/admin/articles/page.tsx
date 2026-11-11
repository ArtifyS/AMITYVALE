"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminArticleItem } from "@/lib/admin/types";
import {
  getArticles,
  duplicateMockArticle,
  togglePublishMockArticle,
} from "@/lib/admin/repositories";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ArticleDeleteModal } from "@/components/admin/ArticleDeleteModal";
import { ArticlePreviewModal } from "@/components/admin/ArticlePreviewModal";
import {
  BookOpen,
  Plus,
  Search,
  Eye,
  Edit,
  Copy,
  Trash2,
  Star,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Globe,
} from "lucide-react";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<AdminArticleItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Modals & Menu State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [previewArticle, setPreviewArticle] = useState<AdminArticleItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminArticleItem | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await getArticles({
      status: statusFilter,
      category: categoryFilter,
      search: searchQuery,
    });
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [categoryFilter, statusFilter, searchQuery]);

  const handleDuplicate = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveMenuId(null);
    const duplicated = await duplicateMockArticle(id);
    if (duplicated) {
      loadData();
    }
  };

  const handleTogglePublish = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setActiveMenuId(null);
    const updated = await togglePublishMockArticle(id);
    if (updated) {
      loadData();
    }
  };

  const handleDeleted = (deletedId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== deletedId));
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-200/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
            Articles
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Manage thought leadership pieces, relationship essays, and published guidance.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B2A4A] hover:bg-[#143B63] rounded-lg transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Article</span>
        </Link>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        {/* Category & Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
          >
            <option value="all">All Categories</option>
            <option value="Relationships">Relationships</option>
            <option value="Business">Business</option>
            <option value="Faith & Spiritual Life">Faith & Spiritual Life</option>
            <option value="Personal Growth">Personal Growth</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
          />
        </div>
      </div>

      {/* DESKTOP TABLE VIEW (HIDDEN ON MOBILE) */}
      <div className="hidden md:block bg-white rounded-xl border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50/70 border-b border-stone-200/80 text-stone-500 font-medium">
              <tr>
                <th className="py-3 px-4 font-semibold">Article</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Featured</th>
                <th className="py-3 px-4 font-semibold">Updated</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    Loading articles...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">
                    No articles found matching filters.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-stone-50/70 transition-colors group cursor-pointer"
                    onClick={() => setPreviewArticle(article)}
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
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                        {article.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={article.status} />
                    </td>

                    {/* Featured */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {article.featured ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>

                    {/* Updated / Published Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-600">
                      <div>{article.updatedDate || article.publishedDate}</div>
                      <div className="text-[10px] text-stone-400">{article.readTime}</div>
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3.5 px-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="px-2.5 py-1 text-[11px] font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors inline-flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => setPreviewArticle(article)}
                          className="p-1 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded transition-colors"
                          title="Preview Article"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* More menu */}
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActiveMenuId(
                                activeMenuId === article.id ? null : article.id
                              )
                            }
                            className="p-1 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded transition-colors"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>

                          {activeMenuId === article.id && (
                            <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-stone-200 py-1 z-30 text-left text-xs">
                              <Link
                                href={`/admin/articles/${article.id}/edit`}
                                className="w-full px-3 py-1.5 text-stone-700 hover:bg-stone-50 transition-colors block"
                              >
                                Edit Content
                              </Link>

                              <button
                                onClick={(e) => handleTogglePublish(e, article.id)}
                                className="w-full px-3 py-1.5 text-stone-700 hover:bg-stone-50 transition-colors text-left"
                              >
                                {article.status === "published"
                                  ? "Unpublish to Draft"
                                  : "Publish Article"}
                              </button>

                              <button
                                onClick={(e) => handleDuplicate(e, article.id)}
                                className="w-full px-3 py-1.5 text-stone-700 hover:bg-stone-50 transition-colors text-left flex items-center gap-1.5"
                              >
                                <Copy className="w-3 h-3 text-stone-400" />
                                <span>Duplicate</span>
                              </button>

                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  setDeleteTarget(article);
                                }}
                                className="w-full px-3 py-1.5 text-rose-600 hover:bg-rose-50 transition-colors text-left flex items-center gap-1.5"
                              >
                                <Trash2 className="w-3 h-3 text-rose-500" />
                                <span>Delete Article</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE COMPACT LIST (HIDDEN ON DESKTOP) */}
      <div className="block md:hidden space-y-2.5">
        {loading ? (
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
              className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-stone-900 text-sm line-clamp-1">
                    {article.title}
                  </h3>
                  <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <StatusBadge status={article.status} />
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 font-mono">
                  Updated {article.updatedDate || article.publishedDate}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewArticle(article)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 rounded bg-stone-50 border border-stone-200"
                    title="Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="px-3 py-1 text-xs font-semibold text-white bg-[#0B2A4A] rounded-lg"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PREVIEW MODAL */}
      <ArticlePreviewModal
        isOpen={!!previewArticle}
        onClose={() => setPreviewArticle(null)}
        title={previewArticle?.title || ""}
        category={previewArticle?.category || "Relationships"}
        readTime={previewArticle?.readTime || "5 min read"}
        featuredImage={previewArticle?.featuredImage || ""}
        excerpt={previewArticle?.excerpt || ""}
        content={previewArticle?.content || ""}
        publishedDate={previewArticle?.publishedDate || "Today"}
      />

      {/* DELETE MODAL */}
      <ArticleDeleteModal
        article={deleteTarget}
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
