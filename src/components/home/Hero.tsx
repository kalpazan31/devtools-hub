"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Hero({ searchQuery, setSearchQuery }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative container mx-auto px-4 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 hover:bg-white/10 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-gray-300 text-sm font-medium">Free & Open Source Developer Tools</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
          <span className="text-white">Developer</span>{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Tools Hub
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.siteDescription}. No ads, no tracking, just pure utility.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-200"></div>
          <div className="relative flex items-center bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-2">
            <div className="pl-4 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for tools (e.g. JSON, Base64, QR)..." 
              className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-2 outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="p-2 text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-white/5 pt-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">18+</div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Free</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">0ms</div>
            <div className="text-gray-500 text-sm font-medium uppercase tracking-wider">Latency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
