"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function RelationshipStrengths() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-4 block">
              Perspective
            </span>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight text-foreground mb-6">
              Strong Relationships Learn to Use Differences as Strengths.
            </h2>
            <div className="space-y-6 text-text-secondary text-base md:text-lg mb-8 leading-relaxed">
              <p>
                People do not need to become identical to have a peaceful, connected relationship. In fact, attempting to change your partner often creates the very distance you are trying to close.
              </p>
              <p>
                Coaching helps partners understand different needs, communication styles, and emotional patternsâ€”shifting the focus from "who is right" to "how do we work together."
              </p>
            </div>
            
            <Button variant="outline" size="lg">
              Learn About the Approach
            </Button>
          </motion.div>

          {/* Editorial Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2"
          >
            <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[24px] md:rounded-[40px] overflow-hidden bg-beige">
              <Image
                src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=2071&auto=format&fit=crop"
                alt="Couple sharing a quiet moment"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
