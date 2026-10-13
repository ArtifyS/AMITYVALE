"use client";

import React from "react";
import { motion } from "framer-motion";
import { Laptop, Clock, Lock, HeartHandshake } from "lucide-react";

const trustItems = [
  {
    icon: Laptop,
    title: "Private Online Sessions",
    description: "Connect securely from anywhere",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "15 to 60-minute session options",
  },
  {
    icon: Lock,
    title: "Confidential Support",
    description: "Completely private environment",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Guidance",
    description: "Tailored to your unique dynamic",
  },
];

export function TrustStrip() {
  return (
    <section className="py-12 border-b border-foreground/5 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center mb-4 text-accent">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h4 className="font-serif text-lg text-foreground mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
