import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookPage as BookPageContent } from "@/components/sections/book/BookPage";

export const metadata: Metadata = {
  title: "Book a Private Session | Amity Vale",
  description: "Choose your Amity Vale relationship and intimacy coaching session length and schedule a private online appointment.",
};

export default function BookPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#E98267]/20 selection:text-[#161514]">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        <BookPageContent />
      </main>
      <Footer />
    </div>
  );
}
