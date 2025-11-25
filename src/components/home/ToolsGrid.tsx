"use client";

import React from "react";
import Link from "next/link";
import { tools, Tool } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
}

function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group">
      <div className="relative h-full p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-300 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {tool.icon}
        </div>

        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
          {tool.name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {tool.description}
        </p>

        <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
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
