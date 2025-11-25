"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { Input } from "@/components/ui/Input";
import { CopyButton } from "@/components/ui/CopyButton";
import { Card, CardContent } from "@/components/ui/Card";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, x)).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export default function ColorConverterPage() {
  const { t } = useLanguage();
  const tool = getToolBySlug("color-converter")!;
  const toolT = t.tools.colorConverter;

  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState<HSL>({ h: 217, s: 91, l: 60 });

  const updateFromHex = (value: string) => {
    setHex(value);
    const rgbValue = hexToRgb(value);
    if (rgbValue) {
      setRgb(rgbValue);
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const rgbValue = hslToRgb(h, s, l);
    setRgb(rgbValue);
    setHex(rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b));
  };

  const hexString = hex.toUpperCase();
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Color Preview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Color Picker */}
              <div className="relative">
                <div
                  className="w-32 h-32 rounded-2xl shadow-lg border-4 border-gray-700 cursor-pointer"
                  style={{ backgroundColor: hex }}
                />
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Color Info */}
              <div className="flex-1 space-y-4 w-full">
                <h3 className="text-lg font-semibold text-white">
                  {toolT.preview}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-900/50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{toolT.hex}</p>
                    <p className="font-mono text-white">{hexString}</p>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{toolT.rgb}</p>
                    <p className="font-mono text-white">{rgbString}</p>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{toolT.hsl}</p>
                    <p className="font-mono text-white">{hslString}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HEX Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">
                {toolT.hex}
              </h3>
              <CopyButton text={hexString} />
            </div>
            <Input
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              placeholder="#000000"
              className="font-mono"
            />
          </CardContent>
        </Card>

        {/* RGB Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">
                {toolT.rgb}
              </h3>
              <CopyButton text={rgbString} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-500">R</label>
                <Input
                  type="number"
                  min={0}
                  max={255}
                  value={rgb.r}
                  onChange={(e) =>
                    updateFromRgb(parseInt(e.target.value) || 0, rgb.g, rgb.b)
                  }
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">G</label>
                <Input
                  type="number"
                  min={0}
                  max={255}
                  value={rgb.g}
                  onChange={(e) =>
                    updateFromRgb(rgb.r, parseInt(e.target.value) || 0, rgb.b)
                  }
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">B</label>
                <Input
                  type="number"
                  min={0}
                  max={255}
                  value={rgb.b}
                  onChange={(e) =>
                    updateFromRgb(rgb.r, rgb.g, parseInt(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HSL Input */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">
                {toolT.hsl}
              </h3>
              <CopyButton text={hslString} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-500">H (0-360)</label>
                <Input
                  type="number"
                  min={0}
                  max={360}
                  value={hsl.h}
                  onChange={(e) =>
                    updateFromHsl(parseInt(e.target.value) || 0, hsl.s, hsl.l)
                  }
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">S (0-100%)</label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.s}
                  onChange={(e) =>
                    updateFromHsl(hsl.h, parseInt(e.target.value) || 0, hsl.l)
                  }
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">L (0-100%)</label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={hsl.l}
                  onChange={(e) =>
                    updateFromHsl(hsl.h, hsl.s, parseInt(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
