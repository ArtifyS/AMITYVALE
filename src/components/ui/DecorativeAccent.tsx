"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";

interface DecorativeAccentProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
  priority?: boolean;
  style?: React.CSSProperties;
  animateVariant?: "none" | "float" | "float1" | "float2" | "float3" | "arc" | "arc2" | "glow" | "glow2" | "pulse";
}

export function DecorativeAccent({
  src,
  alt = "Decorative element",
  className = "",
  width = 800,
  height = 800,
  opacity = 0.8,
  priority = false,
  style,
  animateVariant = "none"
}: DecorativeAccentProps) {
  const prefersReducedMotion = useReducedMotion();

  // Entrance animation
  const entranceVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: opacity, 
      y: 0, 
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } 
    }
  };

  // Continuous animation maps
  const getContinuousAnimation = (): TargetAndTransition | undefined => {
    if (prefersReducedMotion || animateVariant === "none") return undefined;
    
    switch (animateVariant) {
      case "float":
      case "float1":
        return {
          y: [0, -6, 0],
          rotate: [20, 23, 20],
          transition: { duration: 14, ease: "easeInOut" as const, repeat: Infinity }
        };
      case "pulse":
        return {
          scale: [1, 1.05, 1],
          opacity: [opacity, opacity * 0.75, opacity],
          transition: { duration: 12, ease: "easeInOut" as const, repeat: Infinity }
        };
      case "float2":
        return {
          y: [0, -8, 0],
          rotate: [-18, -14, -18],
          transition: { duration: 16, ease: "easeInOut" as const, repeat: Infinity }
        };
      case "float3":
        return {
          x: [0, 5, 0],
          y: [0, -4, 0],
          rotate: [-18, -15, -18],
          transition: { duration: 13, ease: "easeInOut" as const, repeat: Infinity }
        };
      case "arc":
        return {
          y: [0, -9, 0],
          rotate: [-8, -5, -8],
          transition: { duration: 16, ease: "easeInOut" as const, repeat: Infinity }
        };
      case "arc2":
        return {
          y: [0, 7, 0],
          rotate: [12, 15, 12],
          transition: { duration: 18, ease: "easeInOut" as const, repeat: Infinity }
        };
      case "glow":
        return {
          rotate: [-12, -9, -12],
          y: [0, -4, 0],
          transition: { duration: 18, ease: "easeInOut" as const, repeat: Infinity }
        };
      case "glow2":
        return {
          x: [0, 5, 0],
          y: [0, -4, 0],
          transition: { duration: 17, ease: "easeInOut" as const, repeat: Infinity }
        };
      default:
        return undefined;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={entranceVariants}
      className={`absolute pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <motion.div
        animate={getContinuousAnimation()}
        className="w-full h-full relative"
      >
        <Image 
          src={src} 
          alt={alt} 
          width={width} 
          height={height} 
          priority={priority} 
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
