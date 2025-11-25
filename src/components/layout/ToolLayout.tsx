"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Tool } from "@/lib/tools";

interface ToolLayoutProps {
  tool: Tool;
  children: ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const { t } = useLanguage();
  const toolTranslation = t.tools[tool.id as keyof typeof t.tools];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              {t.home}
            </Link>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href="/#tools"
              className="text-gray-400 hover:text-white transition-colors"
            >
              {t.allTools}
            </Link>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-white font-medium">{toolTranslation.name}</span>
          </div>
        </div>
      </div>

      {/* AdSense - Top Banner */}
      <div className="border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="h-24 bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-600 text-sm">
            {/* Google AdSense - Top Banner */}
            Advertisement Space
          </div>
        </div>
      </div>

      {/* Tool Header */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
            >
              {tool.icon}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {toolTranslation.name}
              </h1>
              <p className="text-gray-400">{toolTranslation.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>

          {/* Sidebar - AdSense */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="h-64 bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                {/* Google AdSense - Sidebar */}
                Advertisement Space
              </div>
              <div className="h-64 bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                {/* Google AdSense - Sidebar 2 */}
                Advertisement Space
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
