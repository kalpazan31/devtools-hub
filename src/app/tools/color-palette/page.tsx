"use client";
import { useState } from "react";

export default function ColorPalette() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [palettes, setPalettes] = useState<string[][]>([]);
  const [copiedColor, setCopiedColor] = useState("");

  const hexToHsl = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generatePalettes = () => {
    const [h, s, l] = hexToHsl(baseColor);
    
    // Monochromatic
    const mono = [10, 30, 50, 70, 90].map(light => hslToHex(h, s, light));
    
    // Complementary
    const comp = [
      hslToHex(h, s, l),
      hslToHex((h + 180) % 360, s, l),
      hslToHex(h, s, Math.min(l + 20, 90)),
      hslToHex((h + 180) % 360, s, Math.min(l + 20, 90)),
      hslToHex(h, s, Math.max(l - 20, 10)),
    ];
    
    // Analogous
    const analog = [
      hslToHex((h - 30 + 360) % 360, s, l),
      hslToHex((h - 15 + 360) % 360, s, l),
      hslToHex(h, s, l),
      hslToHex((h + 15) % 360, s, l),
      hslToHex((h + 30) % 360, s, l),
    ];
    
    // Triadic
    const triadic = [
      hslToHex(h, s, l),
      hslToHex((h + 120) % 360, s, l),
      hslToHex((h + 240) % 360, s, l),
      hslToHex(h, s, Math.min(l + 25, 90)),
      hslToHex(h, s, Math.max(l - 25, 10)),
    ];

    // Split Complementary
    const split = [
      hslToHex(h, s, l),
      hslToHex((h + 150) % 360, s, l),
      hslToHex((h + 210) % 360, s, l),
      hslToHex(h, Math.min(s + 20, 100), l),
      hslToHex(h, Math.max(s - 20, 0), l),
    ];

    setPalettes([mono, comp, analog, triadic, split]);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(""), 1500);
  };

  const generateRandom = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setBaseColor(randomHex);
  };

  const paletteNames = ["Monokromatik", "Tamamlayici", "Analog", "Uclu", "Bolumlenmis"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Renk Paleti Olusturucu</h1>
      <p className="text-gray-400 mb-6">Uyumlu renk paletleri olusturun</p>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Ana Renk</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-16 h-12 rounded cursor-pointer"
              />
              <input
                type="text"
                value={baseColor.toUpperCase()}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-28 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white uppercase"
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button
              onClick={generateRandom}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              🎲 Rastgele
            </button>
            <button
              onClick={generatePalettes}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              Palet Olustur
            </button>
          </div>
        </div>
      </div>

      {palettes.length > 0 && (
        <div className="space-y-6">
          {palettes.map((palette, i) => (
            <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-gray-300">{paletteNames[i]}</h3>
              <div className="flex gap-2">
                {palette.map((color, j) => (
                  <button
                    key={j}
                    onClick={() => copyColor(color)}
                    className="flex-1 group relative"
                  >
                    <div
                      className="h-20 rounded-lg transition-transform hover:scale-105 shadow-lg"
                      style={{ backgroundColor: color }}
                    />
                    <div className="mt-2 text-center">
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                        {copiedColor === color ? "Kopyalandi!" : color.toUpperCase()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-gray-300">CSS Degiskenleri</h3>
            <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
              <code className="text-green-400">
{`:root {
${palettes[0].map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}
}`}
              </code>
            </pre>
            <button
              onClick={() => {
                const css = `:root {\n${palettes[0].map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
                navigator.clipboard.writeText(css);
              }}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
            >
              CSS Kopyala
            </button>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-gray-300">Tailwind Config</h3>
            <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
              <code className="text-blue-400">
{`colors: {
  primary: {
${palettes[0].map((c, i) => `    ${(i + 1) * 100}: '${c}',`).join('\n')}
  }
}`}
              </code>
            </pre>
            <button
              onClick={() => {
                const tw = `colors: {\n  primary: {\n${palettes[0].map((c, i) => `    ${(i + 1) * 100}: '${c}',`).join('\n')}\n  }\n}`;
                navigator.clipboard.writeText(tw);
              }}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
            >
              Tailwind Kopyala
            </button>
          </div>
        </div>
      )}

      {palettes.length === 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-gray-400">Bir renk secin ve "Palet Olustur" butonuna tiklayin</p>
        </div>
      )}
    </div>
  );
}
