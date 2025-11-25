"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { tools } from "@/lib/tools";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-800 bg-gray-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                DH
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.siteName}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.siteDescription}
            </p>
          </div>

          {/* Tools */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">{t.allTools}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tools.map((tool) => {
                const toolTranslation = t.tools[tool.id as keyof typeof t.tools];
                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {toolTranslation?.name || tool.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.about}</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {t.about}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {t.siteName}. {t.footer.rights}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              {t.footer.madeWith}{" "}
              <span className="text-red-500">❤</span>{" "}
              {t.footer.forDevelopers}
            </p>
          </div>
        </div>
      </div>

      {/* AdSense Placeholder */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="h-24 bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-600 text-sm">
            {/* Google AdSense - Footer Banner */}
            Advertisement Space
          </div>
        </div>
      </div>
    </footer>
  );
}
