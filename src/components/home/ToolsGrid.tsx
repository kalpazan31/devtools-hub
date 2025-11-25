"use client";

import React from "react";
import Link from "next/link";
import { tools, Tool } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
}

function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group relative block h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-50 blur transition duration-500" />
      <div className="relative h-full p-6 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 flex flex-col">
        
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {tool.icon}
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
            <svg className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          {tool.description}
        </p>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-gray-400 border border-white/5 uppercase tracking-wider">
            {tool.category}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
