"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F7F3EF] py-16 md:py-24 text-[#151312]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16">
          
          {/* LEFT COLUMN: Brand & CTA */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start">
            <Link 
              href="/" 
              className="inline-block mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/50 rounded-sm group"
              aria-label="AmityHale"
            >
              <Image
                src="/nav_logo.png"
                alt="AmityHale"
                width={1980}
                height={322}
                className="w-auto h-[42px] sm:h-[48px] md:h-[52px] object-contain object-left transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
            
            <p className="text-[#5C5550] text-[15px] leading-[1.65] max-w-[320px] mb-8">
              Private relationship and intimacy coaching for individuals and couples seeking stronger communication, connection, and closeness.
            </p>
            
            <Link 
              href="/book"
              className="h-[48px] px-8 rounded-full bg-[#FF5A4F] text-white font-sans font-bold text-[13.5px] tracking-wide hover:bg-[#D9735A] hover:-translate-y-0.5 transition-all duration-300 shadow-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/50 w-full sm:w-auto"
            >
              Book a Private Session
            </Link>
          </div>

          {/* Spacer for 3-column desktop layout */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* CENTER COLUMN: Navigation (Alphabetical Order) */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col">
            <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-[#151312] mb-6">
              Explore
            </h4>
            <nav className="flex flex-col space-y-3.5">
              {[
                { name: "About", href: "/about" },
                { name: "Articles", href: "/articles" },
                { name: "Assessment", href: "/assessment" },
                { name: "Coaching", href: "/coaching" },
                { name: "Contact", href: "mailto:hello@angelcoaching.placeholder" },
                { name: "Pricing", href: "/pricing" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#5C5550] text-[15px] font-medium hover:text-[#FF5A4F] transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/50 rounded-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT COLUMN: Contact */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col">
            <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-[#151312] mb-6">
              Contact
            </h4>
            
            <div className="flex flex-col space-y-1.5">
              <a
                href="mailto:hello@angelcoaching.placeholder"
                className="text-[#5C5550] text-[15px] font-medium hover:text-[#FF5A4F] transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/50 rounded-sm"
              >
                hello@angelcoaching.placeholder
              </a>
              <span className="text-[#5C5550]/80 text-[13.5px]">
                Online sessions available by appointment.
              </span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#151312]/[0.06] mt-20 mb-8" />

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-center md:text-left">
          <p className="text-[#5C5550] text-[13px]">
            &copy; {currentYear} AmityHale. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-5 sm:gap-8">
            {["Privacy Policy", "Terms", "Disclaimer"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[#5C5550] text-[13px] hover:text-[#151312] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/50 rounded-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
