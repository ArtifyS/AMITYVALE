"use client";

import React from "react";
import { motion } from "framer-motion";
import { DecorativeAccent } from "@/components/ui/DecorativeAccent";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ArticlesNewsletterCTA() {
  return (
    <section className="relative w-full bg-[#FF5A4F] py-24 lg:py-32 overflow-hidden border-t-8 border-[#0B2A4A]">
      {/* Decorative Swirls in Navy */}
      <DecorativeAccent
        src="/3.png"
        opacity={0.15}
        animateVariant="float"
        className="w-[400px] md:w-[700px] right-[-10%] top-[-10%] md:right-[-5%] md:top-[-20%] z-0"
        style={{ filter: "brightness(0.2) sepia(1) hue-rotate(180deg) saturate(300%)" }}
      />
      
      <div className="container mx-auto px-6 max-w-[800px] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans uppercase tracking-[0.2em] text-[#0B2A4A] text-[12px] md:text-[13px] font-bold mb-6 block">
            STAY CONNECTED
          </span>
          <h2 className="font-serif text-[38px] md:text-[50px] lg:text-[56px] leading-[1.05] text-white mb-6">
            Insights for the <br className="hidden md:block" />
            <span className="italic text-[#0B2A4A]">Relationships That Matter.</span>
          </h2>
          <p className="text-white/90 text-[16px] md:text-[18px] leading-[1.6] max-w-[540px] mx-auto mb-10 font-medium">
            Join the newsletter for thoughtful guidance on connection, conflict, and personal growth, delivered straight to your inbox.
          </p>
          
          {/* Newsletter Form Placeholder / CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="h-[56px] w-full sm:w-[320px] px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:bg-white/20 focus:border-white/40 transition-all font-sans text-[15px]"
            />
            <button className="h-[56px] w-full sm:w-auto px-8 rounded-full bg-[#0B2A4A] text-white font-sans font-bold text-[14px] tracking-wide hover:bg-[#163a62] transition-colors shadow-[0_8px_20px_rgba(11,42,74,0.3)] flex items-center justify-center group">
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          
          <div className="mt-8">
            <p className="text-white/60 text-[12px] font-medium">
              Or if you’re ready to start doing the work, <Link href="/book" className="text-white underline hover:text-[#0B2A4A] transition-colors">book a private session.</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
