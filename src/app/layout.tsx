import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollManager } from "@/components/layout/ScrollManager";
const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Relationship & Intimacy Coaching | Private Online Sessions",
  description: "Private, confidential relationship and intimacy coaching online. Learn how to communicate better, resolve conflict, and rebuild intimacy.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Relationship & Intimacy Coaching | Private Online Sessions",
    description: "Private online coaching to help you rebuild connection and intimacy.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent-soft selection:text-foreground">
        <ScrollManager />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
