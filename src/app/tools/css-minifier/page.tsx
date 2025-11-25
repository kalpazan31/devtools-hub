"use client";
import { useState } from "react";

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"css" | "js">("css");
  const [stats, setStats] = useState({ original: 0, minified: 0 });

  const minifyCSS = (code: string) => {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*:\s*/g, ":")
      .replace(/\s*;\s*/g, ";")
      .replace(/;}/g, "}")
      .trim();
  };

  const minifyJS = (code: string) => {
    return code
      .replace(/\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}();,:])\s*/g, "$1")
      .trim();
  };

  const handleMinify = () => {
    const minified = mode === "css" ? minifyCSS(input) : minifyJS(input);
    setOutput(minified);
    setStats({
      original: input.length,
      minified: minified.length,
    });
  };

  const beautifyCSS = (code: string) => {
    return code
      .replace(/}/g, "}\n\n")
      .replace(/{/g, " {\n  ")
      .replace(/;/g, ";\n  ")
      .replace(/\n  \n/g, "\n")
      .trim();
  };

  const handleBeautify = () => {
    const beautified = mode === "css" ? beautifyCSS(input) : input;
    setOutput(beautified);
    setStats({
      original: input.length,
      minified: beautified.length,
    });
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const reduction = stats.original > 0 
    ? ((1 - stats.minified / stats.original) * 100).toFixed(1) 
    : 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">CSS/JS Minifier</h1>
      <p className="text-gray-400 mb-6">Kodunuzu kucultun veya guzelstirin</p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("css")}
          className={`px-4 py-2 rounded-lg ${mode === "css" ? "bg-purple-600" : "bg-gray-700"}`}
        >
          CSS
        </button>
        <button
          onClick={() => setMode("js")}
          className={`px-4 py-2 rounded-lg ${mode === "js" ? "bg-purple-600" : "bg-gray-700"}`}
        >
          JavaScript
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Girdi</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "css" ? "CSS kodunu yapistirin..." : "JS kodunu yapistirin..."}
            className="w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-semibold">Cikti</label>
            {output && (
              <button onClick={copyOutput} className="text-sm text-purple-400 hover:underline">
                Kopyala
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleMinify}
          className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          Kucult (Minify)
        </button>
        <button
          onClick={handleBeautify}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Guzellestir (Beautify)
        </button>
      </div>

      {stats.original > 0 && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-sm">Orijinal</p>
            <p className="text-xl font-bold">{stats.original} karakter</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Sonuc</p>
            <p className="text-xl font-bold">{stats.minified} karakter</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Degisim</p>
            <p className={`text-xl font-bold ${Number(reduction) > 0 ? "text-green-500" : "text-yellow-500"}`}>
              {Number(reduction) > 0 ? `-${reduction}%` : `+${Math.abs(Number(reduction))}%`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
