"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { CopyButton } from "@/components/ui/CopyButton";

export default function Base64Page() {
  const { t } = useLanguage();
  const tool = getToolBySlug("base64")!;
  const toolT = t.tools.base64;

  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");

  const encodeToBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setBase64(encoded);
      setError("");
    } catch {
      setError(t.errors.invalidInput);
    }
  };

  const decodeFromBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64)));
      setText(decoded);
      setError("");
    } catch {
      setError(t.errors.invalidInput);
    }
  };

  const clearAll = () => {
    setText("");
    setBase64("");
    setError("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Text Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              {t.input} (Text)
            </label>
            {text && <CopyButton text={text} />}
          </div>
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={toolT.textPlaceholder}
            rows={8}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={encodeToBase64} className="min-w-[120px]">
            {t.encode} ↓
          </Button>
          <Button
            variant="secondary"
            onClick={decodeFromBase64}
            className="min-w-[120px]"
          >
            ↑ {t.decode}
          </Button>
          <Button variant="ghost" onClick={clearAll}>
            {t.clear}
          </Button>
        </div>

        {/* Base64 Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Base64</label>
            {base64 && <CopyButton text={base64} />}
          </div>
          <TextArea
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
            placeholder={toolT.base64Placeholder}
            rows={8}
            className="font-mono"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
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
    </ToolLayout>
  );
}
