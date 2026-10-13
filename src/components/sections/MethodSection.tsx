"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const points = [
  {
    num: "01",
    title: "Understand the Pattern",
    desc: "Identify the hidden cycles keeping you stuck."
  },
  {
    num: "02",
    title: "Improve the Conversation",
    desc: "Learn to communicate without triggering defense mechanisms."
  },
  {
    num: "03",
    title: "Practice a Better Response",
    desc: "Replace old reactions with secure, intentional responses."
  }
];

export function MethodSection() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[60%] relative z-0"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-2xl md:rounded-[32px] overflow-hidden bg-beige shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1576483584852-c2834b6b6ec0?q=80&w=2070&auto=format&fit=crop"
                alt="Practical relationship coaching approach"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </motion.div>

          {/* Overlapping Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[45%] relative z-10 lg:-ml-24"
          >
            <div className="bg-surface border border-foreground/5 p-8 md:p-12 lg:p-14 rounded-2xl md:rounded-[32px] shadow-xl">
              <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-4 block">
                A Practical Approach
              </span>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight text-foreground mb-6">
                Better Patterns Can Be Learned.
              </h2>
              <p className="text-text-secondary text-base mb-10 leading-relaxed">
                Relationship dynamics often become repeated habits. The coaching process focuses on identifying these ingrained patterns, understanding where they come from, and actively changing them in real-time.
              </p>
              
              <div className="space-y-6 mb-10">
                {points.map((point) => (
                  <div key={point.num} className="flex items-start">
                    <span className="text-accent font-serif text-lg md:text-xl font-medium mr-4">
                      {point.num}
                    </span>
                    <div>
                      <h4 className="font-semibold text-foreground text-base mb-1">
                        {point.title}
                      </h4>
                      <p className="text-text-secondary text-sm">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
