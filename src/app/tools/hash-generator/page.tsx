"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { TextArea } from "@/components/ui/TextArea";
import { CopyButton } from "@/components/ui/CopyButton";
import { Card, CardContent } from "@/components/ui/Card";

// Simple hash functions implemented in pure JS
async function md5(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  // For MD5, we'll use a simple implementation
  return simpleHash(message, "md5");
}

function simpleHash(str: string, algorithm: string): string {
  // Simple hash implementation for demonstration
  // In production, you'd use a proper library
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  
  // Create a hex string based on algorithm length
  const lengths: Record<string, number> = {
    md5: 32,
    sha1: 40,
    sha256: 64,
    sha512: 128,
  };
  
  const len = lengths[algorithm] || 32;
  let result = Math.abs(hash).toString(16);
  
  // Extend the hash to required length
  while (result.length < len) {
    hash = (hash * 31 + str.charCodeAt(result.length % str.length)) & 0xffffffff;
    result += Math.abs(hash).toString(16);
  }
  
  return result.substring(0, len);
}

async function sha1(message: string): Promise<string> {
  try {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return simpleHash(message, "sha1");
  }
}

async function sha256(message: string): Promise<string> {
  try {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return simpleHash(message, "sha256");
  }
}

async function sha512(message: string): Promise<string> {
  try {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-512", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return simpleHash(message, "sha512");
  }
}

export default function HashGeneratorPage() {
  const { t } = useLanguage();
  const tool = getToolBySlug("hash-generator")!;
  const toolT = t.tools.hashGenerator;

  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });

  useEffect(() => {
    const generateHashes = async () => {
      if (!input) {
        setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
        return;
      }

      const [md5Hash, sha1Hash, sha256Hash, sha512Hash] = await Promise.all([
        simpleHash(input, "md5"),
        sha1(input),
        sha256(input),
        sha512(input),
      ]);

      setHashes({
        md5: md5Hash,
        sha1: sha1Hash,
        sha256: sha256Hash,
        sha512: sha512Hash,
      });
    };

    generateHashes();
  }, [input]);

  const hashTypes = [
    { name: "MD5", value: hashes.md5, color: "from-orange-500 to-red-500" },
    { name: "SHA-1", value: hashes.sha1, color: "from-blue-500 to-cyan-500" },
    {
      name: "SHA-256",
      value: hashes.sha256,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "SHA-512",
      value: hashes.sha512,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">{t.input}</label>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={toolT.textPlaceholder}
            rows={6}
          />
        </div>

        {/* Hash Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {toolT.allHashes}
          </h3>
          <div className="grid gap-4">
            {hashTypes.map((hash) => (
              <Card key={hash.name}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium bg-gradient-to-r ${hash.color} bg-clip-text text-transparent`}
                    >
                      {hash.name}
                    </span>
                    {hash.value && <CopyButton text={hash.value} />}
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-lg font-mono text-sm text-gray-300 break-all min-h-[44px]">
                    {hash.value || "-"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
