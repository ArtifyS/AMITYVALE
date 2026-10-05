import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent-soft selection:text-foreground">
        {children}
      </body>
    </html>
  );
}
