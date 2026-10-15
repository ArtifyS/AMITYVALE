import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ARTICLES_DATA } from "@/lib/articlesData";
import { ArticleDetailView } from "@/components/sections/articles/ArticleDetailView";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found | Amity Vale" };

  return {
    title: `${article.title} | Amity Vale`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Amity Vale`,
      description: article.excerpt,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Amity Vale`,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Up to 3 related articles, preferring same category or latest
  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id)
    .sort((a, b) => {
      // Prioritize same category, then newer dates
      if (a.category === article.category && b.category !== article.category) return -1;
      if (b.category === article.category && a.category !== article.category) return 1;
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    })
    .slice(0, 3);

  // Structured Data (Schema.org Article)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.publishedDate,
    publisher: {
      "@type": "Organization",
      name: "Amity Vale",
      url: "https://amityvale.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetailView article={article} relatedArticles={relatedArticles} />
    </>
  );
}
