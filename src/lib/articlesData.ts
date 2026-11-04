export type ArticleCategory =
  | "Relationships"
  | "Faith & Spiritual Life"
  | "Personal Growth"
  | "Business";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  readTime: string;
  image: string;
  featured?: boolean;
  publishedDate: string; // ISO date for newest -> oldest sorting
}

export const CATEGORIES: ("All Articles" | ArticleCategory)[] = [
  "All Articles",
  "Relationships",
  "Faith & Spiritual Life",
  "Personal Growth",
  "Business",
];

export const ARTICLES_DATA: Article[] = [
  {
    id: "communicate-better",
    slug: "communicate-better",
    title: "How to Communicate Better Without Turning It Into a Fight",
    excerpt: "Practical ways to express what matters, listen differently, and keep difficult conversations from becoming another argument.",
    category: "Relationships",
    readTime: "5–7 min read",
    image: "/article_communication_1791392276197.jpg",
    featured: true,
    publishedDate: "2026-10-04",
  },
  {
    id: "set-boundaries-with-family",
    slug: "set-boundaries-with-family",
    title: "How to Set Boundaries with Colleagues Without Feeling Compromised",
    excerpt: "How to safeguard professionalism while navigating the corporate terrain.",
    category: "Business",
    readTime: "6–8 min read",
    image: "/business_article.png",
    featured: false,
    publishedDate: "2026-09-28",
  },
  {
    id: "when-god-feels-distant",
    slug: "when-god-feels-distant",
    title: "When God Feels Distant: God Is Never Distant. Reconnect!",
    excerpt: "A profound look at your faith and how it equates to your understanding of spirituality. Remove any self-doubts. Your questions; your answers.",
    category: "Faith & Spiritual Life",
    readTime: "5–7 min read",
    image: "/article_faith_1791392297766.jpg",
    featured: false,
    publishedDate: "2026-09-22",
  },
];

