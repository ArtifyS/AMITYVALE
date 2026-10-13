"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Coaching", href: "/coaching" },
  { name: "Articles", href: "/articles" },
  { name: "Pricing", href: "/pricing" },
];

const emptySubscribe = () => () => {};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isScrolled = useSyncExternalStore(
    (callback) => {
      window.addEventListener("scroll", callback, { passive: true });
      return () => window.removeEventListener("scroll", callback);
    },
    () => window.scrollY > 60,
    () => false
  );
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleToggleMenu = () => setIsMobileMenuOpen(true);
    window.addEventListener("toggleMobileMenu", handleToggleMenu);
    
    return () => {
      window.removeEventListener("toggleMobileMenu", handleToggleMenu);
    };
  }, []);

  if (!mounted) return null;

  const isHome = pathname === "/";
  const showHeader = !isHome || isScrolled;

  return (
    <>
      <AnimatePresence>
        {showHeader && (
          <motion.header 
            initial={isHome ? { y: prefersReducedMotion ? 0 : "-100%", opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={isHome ? { y: prefersReducedMotion ? 0 : "-100%", opacity: 0 } : undefined}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`${
              isHome ? "fixed" : "sticky"
            } top-0 z-50 w-full bg-white border-b border-[#FF5A4F]/20 shadow-sm flex justify-center px-6 md:px-8 h-[72px] lg:h-[76px] shrink-0`}
          >
            <div className="flex items-center justify-between w-full max-w-[1260px] h-full">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center justify-center relative group pt-1">
            <span className="font-serif text-[22px] lg:text-[24px] font-bold leading-none tracking-[0.02em]">
              <span className="text-[#0B2A4A]">AMITY</span> <span className="text-[#FF5A4F]">VALE</span>
            </span>
            <span className="text-[7.5px] lg:text-[8.5px] uppercase tracking-[0.2em] mt-1 text-[#6E747A] font-medium text-center">
              Relationship & Intimacy Coaching
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center h-full">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === '/articles' && pathname.startsWith('/articles'));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[13px] font-medium relative group py-2 transition-colors duration-300 ${
                      isActive ? "text-[#FF5A4F]" : "text-[#4D5358] hover:text-[#FF5A4F]"
                    }`}
                  >
                    {link.name}
                    <span 
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#FF5A4F] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} 
                    />
                  </Link>
                );
              })}
            </div>

            <div className="w-[1px] h-[14px] bg-[#0B2A4A]/10 mx-7" />
            
            <Link
              href="/login"
              className={`text-[13px] font-medium relative group py-2 transition-colors duration-300 ${
                pathname === "/login" ? "text-[#FF5A4F]" : "text-[#4D5358] hover:text-[#FF5A4F]"
              }`}
            >
              Login
              <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#FF5A4F] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                pathname === "/login" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
            
            <Link 
              href="/book" 
              className="relative flex items-center justify-center h-[42px] px-[24px] pr-[28px] text-[13.5px] rounded-full ml-8 font-[600] tracking-[0.01em] bg-[#FF5A4F] text-white shadow-[0_4px_16px_rgba(255,90,79,0.3)] hover:bg-[#F0443A] hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(255,90,79,0.4)] transition-all duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)] group overflow-hidden"
            >
              Book a Session
              <ArrowRight className="ml-1.5 w-[14px] h-[14px] transition-transform duration-[320ms] group-hover:translate-x-[2px]" />
              
              {/* Decorative Spark Marks */}
              <div className="absolute top-[6px] right-[10px] flex gap-[2px] rotate-[15deg] pointer-events-none">
                <div className="w-[1.5px] h-[3px] bg-white/90 rounded-full animate-pulse" style={{ animationDuration: '2s' }} />
                <div className="w-[1.5px] h-[5px] bg-white/90 rounded-full animate-pulse -translate-y-[1px]" style={{ animationDelay: '0.2s', animationDuration: '2s' }} />
                <div className="w-[1.5px] h-[3px] bg-white/90 rounded-full animate-pulse" style={{ animationDelay: '0.4s', animationDuration: '2s' }} />
              </div>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 relative text-[#0B2A4A] bg-[#F4EAE4]/50 rounded-full hover:bg-[#F4EAE4] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 flex flex-col pt-[100px] px-6 pb-8 h-[100dvh] overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 text-center mt-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === '/articles' && pathname.startsWith('/articles'));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-serif text-[32px] transition-colors ${
                      isActive ? "text-[#FF5A4F]" : "text-[#0B2A4A] hover:text-[#FF5A4F]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-8 flex flex-col items-center space-y-6 w-full max-w-[280px] mx-auto border-t border-[#0B2A4A]/10 mt-8">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[16px] font-sans font-medium transition-colors ${
                    pathname === "/login" ? "text-[#FF5A4F]" : "text-[#6E747A] hover:text-[#0B2A4A]"
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/book" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="flex items-center justify-center w-full h-[54px] bg-[#FF5A4F] hover:bg-[#F0443A] text-white rounded-full text-[15px] font-[600] tracking-[0.01em] shadow-[0_8px_22px_rgba(255,90,79,0.22)] transition-colors"
                >
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
