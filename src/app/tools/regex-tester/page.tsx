"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Card, CardContent } from "@/components/ui/Card";

interface Match {
  match: string;
  index: number;
  groups: string[];
}

export default function RegexTesterPage() {
  const { t } = useLanguage();
  const tool = getToolBySlug("regex-tester")!;
  const toolT = t.tools.regexTester;

  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError("");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const results: Match[] = [];

      if (flags.includes("g")) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          // Prevent infinite loop for zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(results);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const highlightMatches = () => {
    if (!pattern || !testString || matches.length === 0) {
      return testString;
    }

    try {
      const regex = new RegExp(pattern, flags);
      return testString.replace(
        regex,
        (match) => `<mark class="bg-yellow-500/30 text-yellow-300 px-0.5 rounded">${match}</mark>`
      );
    } catch {
      return testString;
    }
  };

  const flagOptions = [
    { flag: "g", label: "Global", description: "Find all matches" },
    { flag: "i", label: "Case Insensitive", description: "Ignore case" },
    { flag: "m", label: "Multiline", description: "^ and $ match line boundaries" },
    { flag: "s", label: "Dotall", description: ". matches newlines" },
  ];

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Pattern Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  {toolT.pattern}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">/</span>
                  <Input
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    placeholder="[a-z]+"
                    className="font-mono flex-1"
                  />
                  <span className="text-gray-500">/</span>
                  <span className="text-blue-400 font-mono">{flags}</span>
                </div>
              </div>
            </div>

            {/* Flags */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                {toolT.flags}
              </label>
              <div className="flex flex-wrap gap-2">
                {flagOptions.map((opt) => (
                  <button
                    key={opt.flag}
                    onClick={() => toggleFlag(opt.flag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      flags.includes(opt.flag)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                    title={opt.description}
                  >
                    {opt.flag} - {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="mt-3 text-red-400 text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Test String */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            {toolT.testString}
          </label>
          <TextArea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex..."
            rows={8}
          />
        </div>

        {/* Highlighted Preview */}
        {testString && pattern && matches.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Highlighted Matches
              </h3>
              <div
                className="p-4 bg-gray-900/50 rounded-lg font-mono text-sm whitespace-pre-wrap break-all text-gray-300"
                dangerouslySetInnerHTML={{ __html: highlightMatches() }}
              />
            </CardContent>
          </Card>
        )}

        {/* Match Results */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              {toolT.matches}
              {matches.length > 0 && (
                <span className="ml-2 text-blue-400">
                  ({matches.length} {toolT.matchCount})
                </span>
              )}
            </h3>

            {matches.length === 0 ? (
              <p className="text-gray-500 text-sm">{toolT.noMatch}</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {matches.map((match, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-900/50 rounded-lg font-mono text-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-500">Match {index + 1}</span>
                      <span className="text-gray-500">
                        Index: {match.index}
                      </span>
                    </div>
                    <p className="text-green-400">&quot;{match.match}&quot;</p>
                    {match.groups.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-800">
                        <span className="text-gray-500 text-xs">Groups:</span>
                        {match.groups.map((group, gi) => (
                          <span key={gi} className="ml-2 text-yellow-400">
                            ${gi + 1}: &quot;{group}&quot;
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
