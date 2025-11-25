"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CopyButton } from "@/components/ui/CopyButton";
import { Card, CardContent } from "@/components/ui/Card";

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGeneratorPage() {
  const { t } = useLanguage();
  const tool = getToolBySlug("uuid-generator")!;
  const toolT = t.tools.uuidGenerator;

  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [quantity, setQuantity] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [withHyphens, setWithHyphens] = useState(true);

  const formatUuid = (uuid: string): string => {
    let formatted = withHyphens ? uuid : uuid.replace(/-/g, "");
    return uppercase ? formatted.toUpperCase() : formatted;
  };

  const generateNew = () => {
    const newUuids = Array.from({ length: quantity }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyAll = () => {
    const all = uuids.map(formatUuid).join("\n");
    navigator.clipboard.writeText(all);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-300">{toolT.quantity}:</label>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">{toolT.uppercase}</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={withHyphens}
                  onChange={(e) => setWithHyphens(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">{toolT.withHyphens}</span>
              </label>

              <div className="flex gap-2 ml-auto">
                <Button onClick={generateNew}>{t.generate}</Button>
                {uuids.length > 1 && (
                  <Button variant="secondary" onClick={copyAll}>
                    {t.copy} All
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UUID List */}
        <div className="space-y-3">
          {uuids.map((uuid, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <code className="flex-1 font-mono text-lg text-gray-100 break-all">
                    {formatUuid(uuid)}
                  </code>
                  <CopyButton text={formatUuid(uuid)} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">
              UUID v4 Info
            </h3>
            <p className="text-sm text-gray-400">
              UUID v4 uses random numbers. The format is
              xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx where x is any hex digit and y
              is one of 8, 9, A, or B.
            </p>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
