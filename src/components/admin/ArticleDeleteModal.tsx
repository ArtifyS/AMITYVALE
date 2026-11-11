"use client";

import React, { useState } from "react";
import { AdminArticleItem } from "@/lib/admin/types";
import { deleteMockArticle } from "@/lib/admin/repositories";
import { X, AlertTriangle } from "lucide-react";

interface ArticleDeleteModalProps {
  article: AdminArticleItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export function ArticleDeleteModal({
  article,
  isOpen,
  onClose,
  onDeleted,
}: ArticleDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !article) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    const success = await deleteMockArticle(article.id);
    setIsDeleting(false);
    if (success) {
      onDeleted(article.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-stone-200/80 flex items-center justify-between bg-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">
              Delete &ldquo;{article.title}&rdquo;?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-stone-600 leading-relaxed">
            This cannot be undone once backend storage is connected. In this mock phase, the article will be removed from your current editorial workspace.
          </p>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 space-y-1">
            <div className="flex justify-between">
              <span className="text-stone-400">Category:</span>
              <span className="font-semibold text-stone-900">{article.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Status:</span>
              <span className="font-semibold text-stone-900 capitalize">{article.status}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-700 bg-stone-100 hover:bg-stone-200 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors shadow-2xs disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Article"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

