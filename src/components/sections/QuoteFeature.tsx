"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function QuoteFeature() {
  return (
    <section className="pt-10 md:pt-12 pb-20 md:pb-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="relative flex flex-col md:flex-row items-center justify-end">
          
          {/* Large Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[70%] lg:w-[75%] h-[60vh] md:h-[70vh] relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
          >
            {/* The gradient seam on desktop for blending */}
            <div className="absolute inset-y-0 left-0 w-40 md:w-56 bg-gradient-to-r from-dark via-dark/60 to-transparent z-10 hidden md:block opacity-90" />
            
            <motion.div 
              initial={{ scale: 1.02 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src="/shift_image.png"
                alt="Adult couple experiencing a relationship shift"
                fill
                className="object-cover object-[center_20%] md:object-[center_25%]"
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </motion.div>
          </motion.div>

          {/* Overlapping Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative md:absolute md:-left-4 lg:-left-6 md:top-1/2 md:-translate-y-1/2 w-[92%] md:w-[46%] lg:w-[40%] -mt-16 md:mt-0 mx-auto md:mx-0 z-20"
          >
            <div className="bg-dark p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-[32px] shadow-2xl border border-white/5">
              <span className="text-accent-soft text-xs md:text-sm font-semibold tracking-widest uppercase mb-5 block">
                The Shift
              </span>
              <blockquote className="font-serif text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] text-[#FDFBF7] mb-8 font-medium">
                &ldquo;The same argument does not need to have the same ending.&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="h-[1px] w-8 bg-[#FDFBF7]/30 mr-4" />
                <span className="text-[#FDFBF7]/70 text-sm tracking-wide">Angel Coaching Philosophy</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
