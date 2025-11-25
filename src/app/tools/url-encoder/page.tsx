"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { CopyButton } from "@/components/ui/CopyButton";

export default function UrlEncoderPage() {
  const { t } = useLanguage();
  const tool = getToolBySlug("url-encoder")!;
  const toolT = t.tools.urlEncoder;

  const [decoded, setDecoded] = useState("");
  const [encoded, setEncoded] = useState("");
  const [error, setError] = useState("");

  const encodeUrl = () => {
    try {
      const result = encodeURIComponent(decoded);
      setEncoded(result);
      setError("");
    } catch {
      setError(t.errors.invalidInput);
    }
  };

  const decodeUrl = () => {
    try {
      const result = decodeURIComponent(encoded);
      setDecoded(result);
      setError("");
    } catch {
      setError(t.errors.invalidInput);
    }
  };

  const encodeFullUrl = () => {
    try {
      const result = encodeURI(decoded);
      setEncoded(result);
      setError("");
    } catch {
      setError(t.errors.invalidInput);
    }
  };

  const clearAll = () => {
    setDecoded("");
    setEncoded("");
    setError("");
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Decoded Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              {t.input} (Decoded)
            </label>
            {decoded && <CopyButton text={decoded} />}
          </div>
          <TextArea
            value={decoded}
            onChange={(e) => setDecoded(e.target.value)}
            placeholder={toolT.urlPlaceholder}
            rows={6}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={encodeUrl} className="min-w-[140px]">
            {t.encode} (Component) ↓
          </Button>
          <Button
            variant="secondary"
            onClick={encodeFullUrl}
            className="min-w-[140px]"
          >
            {t.encode} (Full URL) ↓
          </Button>
          <Button
            variant="outline"
            onClick={decodeUrl}
            className="min-w-[120px]"
          >
            ↑ {t.decode}
          </Button>
          <Button variant="ghost" onClick={clearAll}>
            {t.clear}
          </Button>
        </div>

        {/* Encoded Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              {t.output} (Encoded)
            </label>
            {encoded && <CopyButton text={encoded} />}
          </div>
          <TextArea
            value={encoded}
            onChange={(e) => setEncoded(e.target.value)}
            placeholder="Encoded URL..."
            rows={6}
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
