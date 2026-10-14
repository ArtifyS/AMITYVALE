"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Coaching", href: "/coaching" },
  { name: "Articles", href: "/articles" },
  { name: "Pricing", href: "/pricing" },
];

const emptySubscribe = () => () => {};

/**
 * Premium Art-Directed Multicolor Micro-Dotted Pattern System
 * Refined 8.5px grid with tiny ~1.2px-1.4px crisp dots and balanced opacities
 * Brand Colors: Coral (#FF5A4F), Deep Navy (#0B2A4A), and Warm Gold (#D8A23D)
 */
function NavbarDottedBackground({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  // Soft radial masks for organic edge dissolving
  const maskStyle: React.CSSProperties = {
    maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.2) 75%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0.65) 55%, rgba(0,0,0,0.2) 75%, transparent 100%)",
  };

  const wideMaskStyle: React.CSSProperties = {
    maskImage: "radial-gradient(ellipse 72% 62% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 34%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.2) 78%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse 72% 62% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 34%, rgba(0,0,0,0.65) 58%, rgba(0,0,0,0.2) 78%, transparent 100%)",
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
      {/* DESKTOP CLUSTERS (Hidden on small screens, shown lg+) */}
      <div className="hidden lg:block w-full h-full relative">
        
        {/* CLUSTER 1 — FAR LEFT: Delicate Coral + Gold mix around logo (0.85px/0.75px tiny dots) */}
        <div
          className="absolute -left-[50px] top-0 w-[360px] h-full"
          style={{
            ...wideMaskStyle,
            opacity: 0.20,
            backgroundImage: `radial-gradient(circle, #FF5A4F 0.85px, transparent 1.1px), radial-gradient(circle, #D8A23D 0.75px, transparent 1.0px)`,
            backgroundSize: "8.5px 8.5px, 8.5px 8.5px",
            backgroundPosition: "0 0, 4.25px 4.25px",
          }}
        />

        {/* CLUSTER 2 — LEFT-CENTER: Deep Navy between logo and navigation links (Subtle 20s drift motion) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 4, 0],
                  y: [0, -3, 0],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
          className="absolute left-[22%] top-0 w-[260px] h-full"
          style={{
            ...maskStyle,
            opacity: 0.15,
            backgroundImage: "radial-gradient(circle, #0B2A4A 0.85px, transparent 1.1px)",
            backgroundSize: "8.5px 8.5px",
          }}
        />

        {/* CLUSTER 3 — CENTER: Warm Gold around Coaching / Articles */}
        <div
          className="absolute left-[44%] top-0 w-[280px] h-full"
          style={{
            ...wideMaskStyle,
            opacity: 0.17,
            backgroundImage: "radial-gradient(circle, #D8A23D 0.85px, transparent 1.1px)",
            backgroundSize: "8.5px 8.5px",
          }}
        />

        {/* CLUSTER 4 — RIGHT-CENTER: Vibrant Coral around Pricing / Login region */}
        <div
          className="absolute left-[66%] top-0 w-[240px] h-full"
          style={{
            ...maskStyle,
            opacity: 0.19,
            backgroundImage: "radial-gradient(circle, #FF5A4F 0.85px, transparent 1.1px)",
            backgroundSize: "8.5px 8.5px",
          }}
        />

        {/* CLUSTER 5 — FAR RIGHT: Navy + Gold mix behind/around CTA region (22s drift motion) */}
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, -3, 0],
                  y: [0, 3, 0],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
          className="absolute -right-[30px] top-0 w-[340px] h-full"
          style={{
            ...wideMaskStyle,
            opacity: 0.16,
            backgroundImage: `radial-gradient(circle, #0B2A4A 0.85px, transparent 1.1px), radial-gradient(circle, #D8A23D 0.75px, transparent 1.0px)`,
            backgroundSize: "8.5px 8.5px, 8.5px 8.5px",
            backgroundPosition: "0 0, 4.25px 4.25px",
          }}
        />
      </div>

      {/* MOBILE CLUSTERS (Refined micro dots, tuned for 375px–430px) */}
      <div className="block lg:hidden w-full h-full relative">
        {/* Mobile Cluster 1: Coral + Gold near logo */}
        <div
          className="absolute -left-[30px] top-0 w-[210px] h-full"
          style={{
            ...wideMaskStyle,
            opacity: 0.18,
            backgroundImage: `radial-gradient(circle, #FF5A4F 0.85px, transparent 1.1px), radial-gradient(circle, #D8A23D 0.75px, transparent 1.0px)`,
            backgroundSize: "8.5px 8.5px, 8.5px 8.5px",
            backgroundPosition: "0 0, 4.25px 4.25px",
          }}
        />

        {/* Mobile Cluster 2: Subtle Navy around center */}
        <div
          className="absolute left-[36%] top-0 w-[170px] h-full"
          style={{
            ...maskStyle,
            opacity: 0.13,
            backgroundImage: "radial-gradient(circle, #0B2A4A 0.85px, transparent 1.1px)",
            backgroundSize: "8.5px 8.5px",
          }}
        />

        {/* Mobile Cluster 3: Gold + Coral near hamburger menu button */}
        <div
          className="absolute -right-[25px] top-0 w-[200px] h-full"
          style={{
            ...wideMaskStyle,
            opacity: 0.15,
            backgroundImage: `radial-gradient(circle, #D8A23D 0.85px, transparent 1.1px), radial-gradient(circle, #FF5A4F 0.75px, transparent 1.0px)`,
            backgroundSize: "8.5px 8.5px, 8.5px 8.5px",
            backgroundPosition: "0 0, 4.25px 4.25px",
          }}
        />
      </div>
    </div>
  );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Framer Motion's high-performance scroll tracking (fires as soon as scroll > 20px)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 20);
    };

    // Safely check on mount / page reload
    const timer = setTimeout(handleScroll, 0);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleToggleMenu = () => setIsMobileMenuOpen(true);
    window.addEventListener("toggleMobileMenu", handleToggleMenu);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
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
            key="global-header"
            initial={isHome ? { y: prefersReducedMotion ? 0 : "-100%", opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            exit={isHome ? { y: prefersReducedMotion ? 0 : "-100%", opacity: 0 } : undefined}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className={`${
              isHome ? "fixed inset-x-0" : "sticky"
            } top-0 z-50 w-full bg-white border-b border-[#FF5A4F]/20 shadow-sm flex justify-center px-6 md:px-8 h-[72px] lg:h-[76px] shrink-0 overflow-hidden`}
            style={{ isolation: "isolate" }}
          >
            {/* Dotted Decorative Pattern Layer */}
            <NavbarDottedBackground prefersReducedMotion={prefersReducedMotion} />

            <div className="flex items-center justify-between w-full max-w-[1260px] h-full relative z-10">
              {/* Logo */}
              <Link 
                href="/" 
                aria-label="Amity Vale"
                className="flex items-center justify-center relative group shrink-0"
              >
                <Image
                  src="/nav_logo.png"
                  alt="Amity Vale"
                  width={2172}
                  height={724}
                  priority
                  className="w-[clamp(125px,34vw,145px)] sm:w-[clamp(150px,20vw,180px)] lg:w-[clamp(170px,15vw,215px)] h-auto max-h-[42px] sm:max-h-[44px] lg:max-h-[48px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center h-full">
                <div 
                  className="flex items-center space-x-8"
                  style={{ textShadow: "0 1px 6px rgba(255,255,255,0.9), 0 0 3px rgba(255,255,255,0.8)" }}
                >
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
                  style={{ textShadow: "0 1px 6px rgba(255,255,255,0.9), 0 0 3px rgba(255,255,255,0.8)" }}
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
