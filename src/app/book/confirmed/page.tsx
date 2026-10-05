import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConfirmedPageContent } from "@/components/sections/book/ConfirmedPage";

export const metadata: Metadata = {
  title: "Booking Confirmed | Amity Vale",
  robots: "noindex",
};

export default function ConfirmedPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#E98267]/20 selection:text-[#161514]">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        <ConfirmedPageContent />
      </main>
      <Footer />
    </div>
  );
}
