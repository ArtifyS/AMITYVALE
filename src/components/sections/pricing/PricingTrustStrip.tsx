"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Video, Users, CalendarCheck } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "100% Confidential",
    detail: "Strict privacy in a safe, judgment-free space",
  },
  {
    icon: Video,
    title: "Private Online Video",
    detail: "Join securely from anywhere in the world",
  },
  {
    icon: Users,
    title: "Individual or Couple",
    detail: "Same straightforward pricing for either format",
  },
  {
    icon: CalendarCheck,
    title: "No Locked Contracts",
    detail: "Book session by session as you need support",
  },
];

export function PricingTrustStrip() {
  return (
    <section className="bg-[#FAF7F4] border-y border-[#0B2A4A]/8 py-7 md:py-8 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#0B2A4A]/8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? "pt-5 sm:pt-0 lg:pl-8" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white border border-[#FF5A4F]/20 flex items-center justify-center shrink-0 shadow-sm text-[#FF5A4F]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-[13.5px] font-bold text-[#0B2A4A] tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#5C5550] leading-snug">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
