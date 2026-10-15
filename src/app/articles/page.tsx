import { ArticlesJournal } from "@/components/sections/articles/ArticlesJournal";
import { ArticlesNewsletterCTA } from "@/components/sections/articles/ArticlesNewsletterCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles & Journal | Amity Vale",
  description: "Explore our latest thoughts, insights, and guidance on relationships, family, faith, and personal growth.",
};

export default function ArticlesPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#FF5A4F]/20 selection:text-[#161514]">
      <main className="flex-1 w-full flex flex-col bg-white">
        <ArticlesJournal />
        <ArticlesNewsletterCTA />
      </main>
    </div>
  );
}
