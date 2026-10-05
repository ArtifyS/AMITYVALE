"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Coaching", href: "/coaching" },
  { name: "Articles", href: "#" },
  { name: "Pricing", href: "/pricing" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (window.scrollY > 20) {
      setIsScrolled(true);
    }
    
    const handleToggleMenu = () => setIsMobileMenuOpen(true);
    window.addEventListener("toggleMobileMenu", handleToggleMenu);
    
    return () => {
      window.removeEventListener("toggleMobileMenu", handleToggleMenu);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  if (!mounted) return null;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? "bg-[#F8F5F1]/95 backdrop-blur-md border-b border-foreground/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] py-[14px]" 
            : "bg-[#F8F5F1] py-[16px]"
        }`}
      >
        <div className="flex items-center justify-between w-full px-6 md:px-[48px] lg:px-[64px] max-w-[1600px] mx-auto h-[44px]">
          {/* Logo */}
          <Link href="/" className="flex flex-col z-50 relative">
            <span className="font-serif text-[22px] lg:text-2xl font-bold leading-none tracking-tight text-foreground">
              AMITY VALE
            </span>
            <span className="hidden lg:block text-[9px] lg:text-[10px] uppercase tracking-wider text-text-secondary mt-1">
              Relationship & Intimacy Coaching
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-text-secondary hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="h-4 w-px bg-foreground/10 mx-2" />
            <Link
              href="#"
              className="text-[13px] font-medium text-text-secondary hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link href="/book" className="flex items-center justify-center h-[40px] px-6 text-[13px] rounded-[3px] ml-4 bg-[#E98267] hover:bg-[#D77156] text-white">
              Book a Session
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 z-50 relative text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#F7F4F0] z-40 flex flex-col pt-[100px] px-6 pb-8 h-screen overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-serif text-3xl transition-colors ${
                      isActive ? "text-[#E98267]" : "text-foreground hover:text-[#E98267]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-8 flex flex-col items-center space-y-6">
                <Link
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-text-secondary"
                >
                  Login
                </Link>
                <Link href="/book" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full max-w-sm h-[52px] bg-[#E98267] hover:bg-[#D77156] text-white rounded-[4px] text-lg">
                  Book a Session
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
