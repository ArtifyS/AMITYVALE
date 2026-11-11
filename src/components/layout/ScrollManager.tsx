"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Global Scroll Manager for AmityHale
 *
 * Ensures:
 * 1. Normal page navigation starts immediately at scroll position top = 0.
 * 2. Instant scroll reset (no animated or delayed smooth scrolling during page navigation).
 * 3. Anchor navigation (e.g. /coaching#health) scrolls to the target anchor, not the top.
 * 4. Browser back/forward navigation preserves history scroll restoration.
 */
export function ScrollManager() {
  const pathname = usePathname();
  const isPopStateRef = useRef(false);

  useEffect(() => {
    // Listen for browser Back/Forward navigation
    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    // 1. If navigation was triggered by browser Back/Forward, allow native history scroll restoration
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      return;
    }

    // 2. If the URL contains an anchor/hash, scroll to the targeted section
    const hash = window.location.hash;
    if (hash) {
      const rawId = hash.replace("#", "");
      // Support alias if someone lands on #relationship instead of #relationships
      const targetId = rawId === "relationship" ? "relationships" : rawId;

      const scrollToTarget = () => {
        const element = document.getElementById(targetId) || document.getElementById(rawId);
        if (element) {
          element.scrollIntoView({ behavior: "instant", block: "start" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        // If element is not yet rendered, retry on next animation frame
        const frame = requestAnimationFrame(() => {
          if (!scrollToTarget()) {
            // Secondary safety check after micro-delay for async client components
            setTimeout(scrollToTarget, 50);
          }
        });
        return () => cancelAnimationFrame(frame);
      }
      return;
    }

    // 3. Normal page navigation without hash: immediate instant scroll to top = 0
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Enforce top = 0 on next animation frame in case async content or hydration shifts layout
    const frame = requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

