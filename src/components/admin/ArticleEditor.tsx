"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AdminArticleItem, ArticleStatus } from "@/lib/admin/types";
import {
  createMockArticle,
  updateMockArticle,
} from "@/lib/admin/repositories";
import { SeoPreview } from "./SeoPreview";
import { ArticlePreviewModal } from "./ArticlePreviewModal";
import {
  Save,
  Eye,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Trash2,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  List,
  ListOrdered,
  Minus,
  Link2,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface ArticleEditorProps {
  initialArticle?: AdminArticleItem | null;
  isNew?: boolean;
}

export function ArticleEditor({ initialArticle, isNew = false }: ArticleEditorProps) {
  const router = useRouter();

  // Core form fields
  const [title, setTitle] = useState(initialArticle?.title || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [category, setCategory] = useState<AdminArticleItem["category"]>(
    initialArticle?.category || "Relationships"
  );
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt || "");
  const [content, setContent] = useState(initialArticle?.content || "");
  const [featuredImage, setFeaturedImage] = useState(
    initialArticle?.featuredImage || "/article_communication_1791392276197.jpg"
  );
  const [status, setStatus] = useState<ArticleStatus>(
    initialArticle?.status || "draft"
  );
  const [featured, setFeatured] = useState(Boolean(initialArticle?.featured));
  const [seoTitle, setSeoTitle] = useState(initialArticle?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(
    initialArticle?.seoDescription || ""
  );

  // UI state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"clean" | "dirty" | "saved">("clean");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!isNew);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug from title if not manually edited
  useEffect(() => {
    if (!slugManuallyEdited && isNew && title) {
      const generated = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  }, [title, slugManuallyEdited, isNew]);

  // Track unsaved changes
  useEffect(() => {
    setSaveStatus("dirty");
  }, [title, slug, category, excerpt, content, featuredImage, status, featured, seoTitle, seoDescription]);

  // Calculate read time dynamically
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const calculatedReadTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  // Toolbar action helpers
  const insertFormatting = (prefix: string, suffix: string = "", sample: string = "") => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || sample;
    const before = content.substring(0, start);
    const after = content.substring(end);

    const replacement = `${prefix}${selectedText}${suffix}`;
    setContent(`${before}${replacement}${after}`);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  const handleSave = async (targetStatus?: ArticleStatus) => {
    setIsSaving(true);
    const finalStatus = targetStatus || status;

    const payload = {
      title: title.trim() || "Untitled Article",
      slug: slug.trim() || "untitled-article",
      category,
      excerpt: excerpt.trim(),
      content: content.trim(),
      featuredImage,
      readTime: calculatedReadTime,
      publishedDate: initialArticle?.publishedDate || new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
      status: finalStatus,
      featured,
      seoTitle: seoTitle.trim() || `${title} | AmityHale`,
      seoDescription: seoDescription.trim() || excerpt.trim(),
    };

    if (isNew) {
      await createMockArticle(payload);
      setSaveStatus("saved");
      setIsSaving(false);
      router.push("/admin/articles");
    } else if (initialArticle) {
      await updateMockArticle(initialArticle.id, payload);
      setStatus(finalStatus);
      setSaveStatus("saved");
      setIsSaving(false);
    }
  };

  const handleImageUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Local object URL for preview without uploading to a server
      const localUrl = URL.createObjectURL(file);
      setFeaturedImage(localUrl);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* TOP BAR / BREADCRUMB & PRIMARY ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles"
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              title="Back to Articles"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-sans">
                {isNew ? "Write New Article" : `Edit Article`}
              </h1>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                <span>{calculatedReadTime}</span>
                <span>•</span>
                {saveStatus === "dirty" ? (
                  <span className="text-amber-700 font-medium">Unsaved Changes</span>
                ) : (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Saved Locally
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* PREVIEW BUTTON */}
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>

            {/* SAVE DRAFT */}
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave("draft")}
              className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors shadow-2xs disabled:opacity-50"
            >
              Save Draft
            </button>

            {/* PUBLISH / UPDATE */}
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave("published")}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0B2A4A] hover:bg-[#143B63] rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isNew ? "Publish Article" : "Update Article"}</span>
            </button>
          </div>
        </div>

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: MAIN ARTICLE CONTENT EDITOR (8 COLS) */}
          <div className="lg:col-span-8 space-y-6">
            {/* TITLE INPUT */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">
                Article Title
              </label>
              <input
                type="text"
                placeholder="Enter a compelling editorial title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl sm:text-2xl font-bold text-stone-900 placeholder-stone-300 border-none outline-none focus:ring-0 p-0 leading-tight tracking-tight"
              />
            </div>

            {/* EXCERPT INPUT */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-400">
                  Article Excerpt / Subtitle
                </label>
                <span className="text-[11px] text-stone-400">
                  Displayed on article cards and search results
                </span>
              </div>
              <textarea
                rows={2}
                placeholder="Brief summary of the article's core guidance and insights..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
              />
            </div>

            {/* EDITORIAL CONTENT EDITOR */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden flex flex-col">
              {/* TOOLBAR */}
              <div className="px-4 py-2.5 bg-stone-50/90 border-b border-stone-200 flex items-center gap-1 flex-wrap text-stone-700 text-xs">
                <button
                  type="button"
                  onClick={() => insertFormatting("## ", "\n", "Heading 2")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting("### ", "\n", "Heading 3")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-stone-300 mx-1" />

                <button
                  type="button"
                  onClick={() => insertFormatting("**", "**", "bold text")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting("*", "*", "italic text")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>

                <div className="w-px h-4 bg-stone-300 mx-1" />

                <button
                  type="button"
                  onClick={() => insertFormatting("> ", "\n", "Reflective quote...")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting("- ", "\n", "List item")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Bulleted List"
                >
                  <List className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting("1. ", "\n", "First item")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting("\n---\n\n")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Horizontal Divider"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => insertFormatting("[", "](https://example.com)", "Link Text")}
                  className="p-1.5 rounded hover:bg-stone-200/70 transition-colors"
                  title="Insert Link"
                >
                  <Link2 className="w-4 h-4" />
                </button>

                <span className="ml-auto text-[11px] text-stone-400 font-mono">
                  {wordCount} words
                </span>
              </div>

              {/* EDITOR TEXTAREA */}
              <div className="p-5 flex-1 min-h-[420px]">
                <textarea
                  ref={contentTextareaRef}
                  rows={18}
                  placeholder="Begin writing your article here. Use the formatting toolbar above for headings, lists, and quotes..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full min-h-[400px] border-none outline-none focus:ring-0 p-0 text-sm sm:text-base text-stone-800 leading-relaxed font-sans placeholder-stone-300 resize-y"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: PUBLISHING & SEO SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-6">
            {/* PUBLISHING CONTROLS CARD */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4 text-xs">
              <div className="border-b border-stone-100 pb-2">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-500">
                  Publishing Settings
                </h3>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Article Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                >
                  <option value="draft">Draft (Private)</option>
                  <option value="published">Published (Live)</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                >
                  <option value="Relationships">Relationships</option>
                  <option value="Business">Business</option>
                  <option value="Faith & Spiritual Life">Faith & Spiritual Life</option>
                  <option value="Personal Growth">Personal Growth</option>
                </select>
              </div>

              {/* Featured Article Toggle (Rule 25: Only one featured at a time) */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-900 block text-xs">
                    Featured Article
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Highlights on homepage
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#0B2A4A] rounded border-stone-300 focus:ring-[#0B2A4A]"
                />
              </div>

              {/* Slug Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-stone-600 font-medium">URL Slug</label>
                  {slugManuallyEdited && (
                    <span className="text-[10px] text-stone-400">Custom</span>
                  )}
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                  }}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                />
              </div>
            </div>

            {/* FEATURED IMAGE UPLOAD CARD */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3 text-xs">
              <div className="border-b border-stone-100 pb-2">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-500">
                  Featured Header Image
                </h3>
              </div>

              {featuredImage ? (
                <div className="space-y-2">
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={featuredImage}
                      alt="Featured Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg cursor-pointer transition-colors inline-flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Replace</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUploadMock}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setFeaturedImage("")}
                      className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-stone-200 hover:border-stone-400 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group">
                  <ImageIcon className="w-6 h-6 text-stone-400 group-hover:text-stone-600 mb-2" />
                  <span className="font-medium text-stone-700">Upload Image</span>
                  <span className="text-[11px] text-stone-400 mt-0.5">
                    Click to browse local files
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadMock}
                    className="hidden"
                  />
                </label>
              )}

              {/* Preset quick image selection */}
              <div className="pt-2 border-t border-stone-100">
                <span className="text-[11px] text-stone-400 block mb-1.5">
                  Or select brand photography:
                </span>
                <div className="flex gap-2">
                  {[
                    { label: "Communication", src: "/article_communication_1791392276197.jpg" },
                    { label: "Business", src: "/business_article.png" },
                    { label: "Faith", src: "/article_faith_1791392297766.jpg" },
                  ].map((preset) => (
                    <button
                      key={preset.src}
                      type="button"
                      onClick={() => setFeaturedImage(preset.src)}
                      className="text-[10px] px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO & SEARCH PREVIEW CARD */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4 text-xs">
              <div className="border-b border-stone-100 pb-2">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-stone-500">
                  Search Engine Optimization (SEO)
                </h3>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  placeholder={title || "SEO Title..."}
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  placeholder={excerpt || "Search engine description..."}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                />
              </div>

              {/* Compact Google Search Snippet Preview */}
              <SeoPreview
                title={seoTitle || title}
                slug={slug}
                description={seoDescription || excerpt}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE PREVIEW MODAL */}
      <ArticlePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={title}
        category={category}
        readTime={calculatedReadTime}
        featuredImage={featuredImage}
        excerpt={excerpt}
        content={content}
        publishedDate={initialArticle?.publishedDate || "Today"}
      />
    </>
  );
}

