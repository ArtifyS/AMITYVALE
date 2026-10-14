"use client";

import React from "react";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube, 
  FaTiktok, 
  FaXTwitter 
} from "react-icons/fa6";

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, href: "#", hoverColor: "group-hover:text-[#1877F2]" },
  { name: "Instagram", icon: FaInstagram, href: "#", hoverColor: "group-hover:text-[#E4405F]" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "#", hoverColor: "group-hover:text-[#0A66C2]" },
  { name: "YouTube", icon: FaYoutube, href: "#", hoverColor: "group-hover:text-[#FF0000]" },
  { name: "TikTok", icon: FaTiktok, href: "#", hoverColor: "group-hover:text-[#111111]" },
  { name: "X", icon: FaXTwitter, href: "#", hoverColor: "group-hover:text-[#111111]" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F7F3EF] py-16 md:py-24 text-[#151312]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16">
          
          {/* LEFT COLUMN: Brand & CTA */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex flex-col mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/50 rounded-sm">
              <span className="font-serif text-[28px] font-bold leading-none tracking-tight text-[#151312]">
                ANGEL
              </span>
              <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#5C5550] mt-2 font-bold">
                Relationship & Intimacy Coaching
              </span>
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

          {/* CENTER COLUMN: Navigation */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col">
            <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-[#151312] mb-6">
              Explore
            </h4>
            <nav className="flex flex-col space-y-3.5">
              {[
                { name: "About", href: "/about" },
                { name: "Coaching", href: "/coaching" },
                { name: "Pricing", href: "/pricing" },
                { name: "Articles", href: "#" },
                { name: "Assessment", href: "/assessment" },
                { name: "Contact", href: "#" }
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

          {/* RIGHT COLUMN: Contact & Socials */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col">
            <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-[#151312] mb-6">
              Contact
            </h4>
            
            <div className="flex flex-col space-y-1.5 mb-8">
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

            {/* Social Icons Row */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-[44px] h-[44px] rounded-full bg-white border border-[#151312]/[0.06] flex items-center justify-center transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_4px_12px_rgb(0,0,0,0.05)] hover:border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A4F]/50"
                  >
                    <Icon className={`w-[18px] h-[18px] text-[#151312]/60 transition-colors duration-300 ${social.hoverColor}`} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#151312]/[0.06] mt-20 mb-8" />

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-center md:text-left">
          <p className="text-[#5C5550] text-[13px]">
            &copy; {currentYear} Angel Coaching. All rights reserved.
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
