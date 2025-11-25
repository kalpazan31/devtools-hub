"use client";
import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = "";
    if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (!chars) return;
    
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    setCopied(false);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (length < 8) return { text: "Zayif", color: "bg-red-500", width: "25%" };
    if (length < 12) return { text: "Orta", color: "bg-yellow-500", width: "50%" };
    if (length < 16) return { text: "Guclu", color: "bg-blue-500", width: "75%" };
    return { text: "Cok Guclu", color: "bg-green-500", width: "100%" };
  };

  const strength = getStrength();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Sifre Olusturucu</h1>
      <p className="text-gray-400 mb-6">Guclu ve guvenli sifreler olusturun</p>

      <div className="space-y-6">
        {password && (
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between gap-4">
              <code className="text-xl font-mono break-all">{password}</code>
              <button
                onClick={copyPassword}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg whitespace-nowrap"
              >
                {copied ? "Kopyalandi!" : "Kopyala"}
              </button>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Guc:</span>
                <span>{strength.text}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div className={`h-full rounded-full ${strength.color}`} style={{width: strength.width}}></div>
              </div>
            </div>
          </div>
        )}

        <div>
          <label className="block mb-2">Uzunluk: {length}</label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg cursor-pointer">
            <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} />
            <span>Buyuk Harf (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg cursor-pointer">
            <input type="checkbox" checked={useLowercase} onChange={(e) => setUseLowercase(e.target.checked)} />
            <span>Kucuk Harf (a-z)</span>
          </label>
          <label className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg cursor-pointer">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
            <span>Rakamlar (0-9)</span>
          </label>
          <label className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg cursor-pointer">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
            <span>Semboller (!@#$)</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          Sifre Olustur
        </button>
      </div>
    </div>
  );
}
