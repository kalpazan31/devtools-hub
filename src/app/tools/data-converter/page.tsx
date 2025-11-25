"use client";
import { useState } from "react";

export default function DataConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [fromFormat, setFromFormat] = useState("json");
  const [toFormat, setToFormat] = useState("csv");
  const [error, setError] = useState("");

  const jsonToCsv = (jsonStr: string) => {
    const data = JSON.parse(jsonStr);
    const arr = Array.isArray(data) ? data : [data];
    if (arr.length === 0) return "";
    const headers = Object.keys(arr[0]);
    const csv = [
      headers.join(","),
      ...arr.map(row => headers.map(h => JSON.stringify(row[h] ?? "")).join(","))
    ].join("\n");
    return csv;
  };

  const csvToJson = (csvStr: string) => {
    const lines = csvStr.trim().split("\n");
    const headers = lines[0].split(",").map(h => h.trim());
    const result = lines.slice(1).map(line => {
      const values = line.split(",");
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => obj[h] = values[i]?.trim() ?? "");
      return obj;
    });
    return JSON.stringify(result, null, 2);
  };

  const jsonToXml = (jsonStr: string) => {
    const data = JSON.parse(jsonStr);
    const arr = Array.isArray(data) ? data : [data];
    
    const objToXml = (obj: any, root = "item") => {
      let xml = `<${root}>`;
      for (const [key, val] of Object.entries(obj)) {
        xml += `<${key}>${val}</${key}>`;
      }
      xml += `</${root}>`;
      return xml;
    };
    
    return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${arr.map(item => "  " + objToXml(item)).join("\n")}\n</root>`;
  };

  const handleConvert = () => {
    setError("");
    try {
      let result = "";
      if (fromFormat === "json" && toFormat === "csv") {
        result = jsonToCsv(input);
      } else if (fromFormat === "csv" && toFormat === "json") {
        result = csvToJson(input);
      } else if (fromFormat === "json" && toFormat === "xml") {
        result = jsonToXml(input);
      } else {
        result = input;
      }
      setOutput(result);
    } catch (e) {
      setError("Donusturulemedi. Girdi formatini kontrol edin.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Veri Format Donusturucu</h1>
      <p className="text-gray-400 mb-6">JSON, CSV ve XML arasinda donusum yapin</p>

      <div className="flex gap-4 mb-4 items-center">
        <select
          value={fromFormat}
          onChange={(e) => setFromFormat(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        >
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select>
        <span className="text-gray-400"></span>
        <select
          value={toFormat}
          onChange={(e) => setToFormat(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        >
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-semibold">Girdi ({fromFormat.toUpperCase()})</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={fromFormat === "json" ? '[{"name": "Ali", "age": 25}]' : "name,age\nAli,25"}
            className="w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm"
          />
        </div>
        
        <div>
          <label className="block mb-2 font-semibold">Cikti ({toFormat.toUpperCase()})</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm"
          />
        </div>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={handleConvert}
        className="w-full mt-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
      >
        Donustur
      </button>
    </div>
  );
}
