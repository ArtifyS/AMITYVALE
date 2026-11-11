"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminArticleItem } from "@/lib/admin/types";
import { getArticleById } from "@/lib/admin/repositories";
import { ArticleEditor } from "@/components/admin/ArticleEditor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params?.id as string;

  const [article, setArticle] = useState<AdminArticleItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!articleId) return;
      setLoading(true);
      const found = await getArticleById(articleId);
      setArticle(found);
      setLoading(false);
    }
    load();
  }, [articleId]);

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-stone-400">
        Loading article editor...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-12 text-center space-y-3">
        <h2 className="text-base font-bold text-stone-900">Article Not Found</h2>
        <p className="text-xs text-stone-500">
          The requested article does not exist or has been removed from your workspace.
        </p>
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-1.5 text-xs text-[#0B2A4A] font-semibold hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
        </Link>
      </div>
    );
  }

  return <ArticleEditor initialArticle={article} isNew={false} />;
}

