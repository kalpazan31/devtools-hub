"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { CopyButton } from "@/components/ui/CopyButton";
import { Select } from "@/components/ui/Select";

export default function JsonFormatterPage() {
  const { t } = useLanguage();
  const tool = getToolBySlug("json-formatter")!;
  const toolT = t.tools.jsonFormatter;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState("2");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, parseInt(indent));
      setOutput(formatted);
      setError("");
    } catch {
      setError(toolT.invalidJson);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
    } catch {
      setError(toolT.invalidJson);
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError("");
      setOutput(toolT.validJson + " ✓");
    } catch {
      setError(toolT.invalidJson);
      setOutput("");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={formatJson}>{toolT.beautify}</Button>
          <Button variant="secondary" onClick={minifyJson}>
            {toolT.minify}
          </Button>
          <Button variant="outline" onClick={validateJson}>
            {t.validate}
          </Button>
          <Button variant="ghost" onClick={clearAll}>
            {t.clear}
          </Button>
          <div className="ml-auto w-32">
            <Select
              value={indent}
              onChange={(e) => setIndent(e.target.value)}
              options={[
                { value: "2", label: "2 spaces" },
                { value: "4", label: "4 spaces" },
                { value: "8", label: "8 spaces" },
              ]}
            />
          </div>
        </div>

        {/* Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                {t.input}
              </label>
            </div>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={toolT.placeholder}
              rows={20}
              className="font-mono text-sm"
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                {t.output}
              </label>
              {output && <CopyButton text={output} />}
            </div>
            <TextArea
              value={output}
              readOnly
              placeholder={t.output}
              rows={20}
              className={`font-mono text-sm ${
                error ? "border-red-500" : output ? "border-green-500" : ""
              }`}
            />
            {error && (
              <p className="text-red-400 text-sm flex items-center gap-2">
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
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
