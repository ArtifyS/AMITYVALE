"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { globalSearch, SearchGroupResult } from "@/lib/admin/repositories";
import { StatusBadge } from "./StatusBadge";
import {
  Search,
  CalendarCheck,
  Users,
  Sparkles,
  BookOpen,
  X,
  ArrowRight,
  Command,
} from "lucide-react";

interface CommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBooking?: (booking: any) => void;
  onSelectLead?: (lead: any) => void;
}

export function CommandSearchModal({
  isOpen,
  onClose,
  onSelectBooking,
  onSelectLead,
}: CommandSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    bookings: SearchGroupResult[];
    clients: SearchGroupResult[];
    leads: SearchGroupResult[];
    articles: SearchGroupResult[];
    totalCount: number;
  }>({
    bookings: [],
    clients: [],
    leads: [],
    articles: [],
    totalCount: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults({ bookings: [], clients: [], leads: [], articles: [], totalCount: 0 });
    }
  }, [isOpen]);

  useEffect(() => {
    async function search() {
      const res = await globalSearch(query);
      setResults(res);
    }
    const t = setTimeout(search, 150);
    return () => clearTimeout(t);
  }, [query]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (item: SearchGroupResult) => {
    onClose();
    if (item.type === "booking" && onSelectBooking && item.data) {
      onSelectBooking(item.data);
    } else if (item.type === "lead" && onSelectLead && item.data) {
      onSelectLead(item.data);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* INPUT BAR */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50/70">
          <Search className="w-4 h-4 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search bookings, clients, leads, articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-stone-900 placeholder-stone-400 font-medium"
          />
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200 text-stone-400">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RESULTS AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {query.trim().length === 0 ? (
            <div className="py-8 text-center text-stone-400 space-y-1">
              <Command className="w-6 h-6 mx-auto mb-2 text-stone-300" />
              <p className="font-medium text-stone-600">Quick Global Command Search</p>
              <p className="text-[11px] text-stone-400">
                Type a client name, booking reference #, lead email, or article title.
              </p>
            </div>
          ) : results.totalCount === 0 ? (
            <div className="py-8 text-center text-stone-400">
              No matching records found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            <>
              {/* BOOKINGS GROUP */}
              {results.bookings.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 px-2">
                    <CalendarCheck className="w-3 h-3 text-[#0B2A4A]" /> Bookings
                  </span>
                  <div className="space-y-1">
                    {results.bookings.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => handleItemClick(b)}
                        className="p-2.5 rounded-lg hover:bg-stone-100/80 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                            {b.title}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {b.subtitle}
                          </div>
                        </div>
                        {b.badge && <StatusBadge status={b.badge} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CLIENTS GROUP */}
              {results.clients.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 px-2">
                    <Users className="w-3 h-3 text-emerald-700" /> Clients
                  </span>
                  <div className="space-y-1">
                    {results.clients.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleItemClick(c)}
                        className="p-2.5 rounded-lg hover:bg-stone-100/80 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                            {c.title}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {c.subtitle}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-800" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LEADS GROUP */}
              {results.leads.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 px-2">
                    <Sparkles className="w-3 h-3 text-amber-600" /> Check-In Leads
                  </span>
                  <div className="space-y-1">
                    {results.leads.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => handleItemClick(l)}
                        className="p-2.5 rounded-lg hover:bg-stone-100/80 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                            {l.title}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {l.subtitle}
                          </div>
                        </div>
                        {l.badge && <StatusBadge status={l.badge} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ARTICLES GROUP */}
              {results.articles.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 px-2">
                    <BookOpen className="w-3 h-3 text-teal-700" /> Articles
                  </span>
                  <div className="space-y-1">
                    {results.articles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => handleItemClick(a)}
                        className="p-2.5 rounded-lg hover:bg-stone-100/80 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div>
                          <div className="font-semibold text-stone-900 group-hover:text-[#0B2A4A]">
                            {a.title}
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            {a.subtitle}
                          </div>
                        </div>
                        {a.badge && <StatusBadge status={a.badge} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-4 py-2.5 border-t border-stone-200 bg-stone-50/70 flex items-center justify-between text-[11px] text-stone-400">
          <span>Quick action search</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded font-mono">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

