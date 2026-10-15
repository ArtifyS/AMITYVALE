export type ArticleCategory =
  | "Relationships"
  | "Family"
  | "Faith & Spiritual Life"
  | "Personal Growth";

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
  "Family",
  "Faith & Spiritual Life",
  "Personal Growth",
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
    title: "How to Set Boundaries With Family Without Feeling Guilty",
    excerpt: "How to protect your needs while navigating love, shared history, expectations, and difficult family dynamics.",
    category: "Family",
    readTime: "6–8 min read",
    image: "/article_family_1791392286386.jpg",
    featured: false,
    publishedDate: "2026-09-28",
  },
  {
    id: "when-god-feels-distant",
    slug: "when-god-feels-distant",
    title: "When God Feels Distant: How to Reconnect With Your Faith",
    excerpt: "An honest look at spiritual distance, doubt, meaning, and finding your way back to a relationship with faith.",
    category: "Faith & Spiritual Life",
    readTime: "5–7 min read",
    image: "/article_faith_1791392297766.jpg",
    featured: false,
    publishedDate: "2026-09-22",
  },
  {
    id: "moving-beyond-roommate-mode",
    slug: "moving-beyond-roommate-mode",
    title: "Moving Beyond Roommate Mode in Long-Term Love",
    excerpt: "When the spark fades into routine logistics, here is how couples rediscover intimacy, presence, and shared emotional playfulness.",
    category: "Relationships",
    readTime: "4–6 min read",
    image: "/coaching_romantic.jpg",
    featured: false,
    publishedDate: "2026-09-16",
  },
  {
    id: "untangling-self-worth",
    slug: "untangling-self-worth",
    title: "Untangling Self-Worth From Relationship Approval",
    excerpt: "Cultivating genuine internal security so you can love and communicate from abundance rather than anxiety or fear of rejection.",
    category: "Personal Growth",
    readTime: "5–7 min read",
    image: "/coaching_personal_growth.jpg",
    featured: false,
    publishedDate: "2026-09-10",
  },
  {
    id: "healing-generational-patterns",
    slug: "healing-generational-patterns",
    title: "Healing Generational Patterns in Modern Families",
    excerpt: "Recognizing inherited cycles of defensiveness, emotional distance, and unspoken expectations, and choosing a healthier path forward.",
    category: "Family",
    readTime: "6–7 min read",
    image: "/coaching_family.jpg",
    featured: false,
    publishedDate: "2026-09-02",
  },
  {
    id: "grace-over-perfection",
    slug: "grace-over-perfection",
    title: "Grace Over Perfection: Navigating Faith Together",
    excerpt: "Creating space for spiritual differences and organic growth between partners without pressure, rigidity, or moral comparison.",
    category: "Faith & Spiritual Life",
    readTime: "5–6 min read",
    image: "/coaching_faith.jpg",
    featured: false,
    publishedDate: "2026-08-25",
  },
  {
    id: "quiet-power-of-emotional-regulation",
    slug: "quiet-power-of-emotional-regulation",
    title: "The Quiet Power of Emotional Regulation Under Stress",
    excerpt: "Practical mental and physiological techniques to calm your nervous system before reacting to sudden emotional triggers.",
    category: "Personal Growth",
    readTime: "5–7 min read",
    image: "/transformation_shift_1791382015308.jpg",
    featured: false,
    publishedDate: "2026-08-18",
  },
  {
    id: "listening-without-defending",
    slug: "listening-without-defending",
    title: "The Art of Listening Without Preparing Your Defense",
    excerpt: "Why our reflexive need to defend ourselves derails conversations, and how to stay emotionally present when feelings run high.",
    category: "Relationships",
    readTime: "5–7 min read",
    image: "/about_philosophy_couple.jpg",
    featured: false,
    publishedDate: "2026-08-10",
  },
];
