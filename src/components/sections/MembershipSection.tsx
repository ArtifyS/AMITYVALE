"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const features = [
  "One 15-minute private session each month",
  "Member-only relationship resources",
  "Simple recurring monthly access"
];

export function MembershipSection() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-dark rounded-3xl md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
          
          {/* Decorative Elements */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-beige opacity-5 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center relative z-10"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-soft mb-4 block">
              Ongoing Support
            </span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-surface mb-2">
              Private Coaching Membership
            </h2>
            <div className="mb-8">
              <span className="text-4xl md:text-5xl font-serif text-surface">$75</span>
              <span className="text-surface/60 text-base ml-2">/ month</span>
            </div>
            
            <ul className="space-y-4 mb-10">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-accent" />
                  </div>
                  <span className="text-surface/80 text-sm md:text-base leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col items-start gap-3">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Membership
              </Button>
              <span className="text-xs text-surface/50">
                Cancel or manage online at any time.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full hidden md:block"
          >
            <Image
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2070&auto=format&fit=crop"
              alt="Calm morning coffee"
              fill
              className="object-cover object-center opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle gradient blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent w-32" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
