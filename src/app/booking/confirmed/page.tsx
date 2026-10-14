import { Metadata } from "next";
import { ConfirmedPageContent } from "@/components/sections/book/ConfirmedPage";

export const metadata: Metadata = {
  title: "Booking Confirmed | Amity Vale",
  robots: "noindex",
};

export default function BookingConfirmedPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden selection:bg-[#FF5A4F]/20 selection:text-[#0B2A4A]">
      <main className="flex-1 w-full flex flex-col">
        <ConfirmedPageContent />
      </main>
    </div>
  );
}
