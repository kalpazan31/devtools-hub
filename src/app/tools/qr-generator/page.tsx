"use client";
import { useState, useRef } from "react";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    if (!text.trim()) return;
    try {
      const url = await QRCode.toDataURL(text, { width: 300, margin: 2 });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrUrl;
    link.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">QR Kod Olusturucu</h1>
      <p className="text-gray-400 mb-6">Metin veya URL icin QR kod olusturun</p>

      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Metin veya URL girin..."
          className="w-full h-32 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
        
        <button
          onClick={generateQR}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          QR Kod Olustur
        </button>

        {qrUrl && (
          <div className="flex flex-col items-center gap-4 p-6 bg-gray-800 rounded-lg">
            <img src={qrUrl} alt="QR Code" className="rounded-lg" />
            <button
              onClick={downloadQR}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
            >
              PNG Indir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
