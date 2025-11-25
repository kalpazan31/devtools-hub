"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { tools } from "@/lib/tools";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-black/50 backdrop-blur-xl mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                DH
              </div>
              <span className="text-xl font-bold text-white">
                {t.siteName}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.siteDescription}. Built for developers, by developers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          {/* Tools */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-6">{t.allTools}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
              {tools.slice(0, 12).map((tool) => {
                const toolTranslation = t.tools[tool.id as keyof typeof t.tools];
                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    {toolTranslation?.name || tool.name}
                  </Link>
                );
              })}
              <Link href="/#tools" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 mt-2">
                View All <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t.about}</h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {t.about}
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {t.siteName}. {t.footer.rights}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              {t.footer.madeWith}{" "}
              <span className="text-red-500 animate-pulse">❤</span>{" "}
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
