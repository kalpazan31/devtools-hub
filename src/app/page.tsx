"use client";

import { useState } from "react";
import { Hero } from "@/components/home/Hero";
import { ToolsGrid } from "@/components/home/ToolsGrid";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      {/* Hero Section */}
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* AdSense - Top Banner */}
      <div className="border-y border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="h-24 bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-600 text-sm">
            {/* Google AdSense - Homepage Top Banner */}
            Advertisement Space
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <section id="tools" className="py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.allTools}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t.siteDescription}
            </p>
          </div>

          {/* Tools Grid */}
          <ToolsGrid searchQuery={searchQuery} />
        </div>
      </section>

      {/* AdSense - Bottom Banner */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="h-24 bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-600 text-sm">
            {/* Google AdSense - Homepage Bottom Banner */}
            Advertisement Space
          </div>
        </div>
      </div>
    </div>
  );
}
