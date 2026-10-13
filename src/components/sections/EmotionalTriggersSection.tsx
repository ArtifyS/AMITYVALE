"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function EmotionalTriggersSection() {
  return (
    <section className="py-20 md:py-32 bg-accent-soft relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          {/* Floating Content Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[55%] lg:w-[45%] order-2 md:order-1 relative z-10 -mt-16 md:mt-0 md:-mr-16"
          >
            <div className="bg-surface p-8 md:p-12 lg:p-16 rounded-2xl md:rounded-[32px] shadow-xl">
              <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-4 block">
                Why Connection Breaks Down
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground mb-6">
                Emotional Triggers Can Change The Way We Respond to Each Other.
              </h2>
              <p className="text-text-secondary text-base md:text-lg mb-8 leading-relaxed">
                When we feel misunderstood or disconnected, our emotional reflexes take over. Defensiveness, shutting down, or escalation are rarely about the topic at handâ€”they are attempts to feel safe or heard. Coaching helps you identify these underlying triggers.
              </p>
              
              <Link 
                href="#" 
                className="inline-flex items-center text-sm font-semibold text-foreground hover:text-accent transition-colors group"
              >
                Learn what may be happening
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Large Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-[60%] lg:w-[65%] order-1 md:order-2"
          >
            <div className="relative aspect-[4/5] md:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-beige shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1595777124376-74ba377bcf4d?q=80&w=1964&auto=format&fit=crop"
                alt="Partner looking thoughtful"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
