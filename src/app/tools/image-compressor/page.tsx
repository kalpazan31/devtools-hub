"use client";
import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      setOriginalSize(file.size);
      setPreview(URL.createObjectURL(file));
      setCompressedFile(null);
    }
  };

  const compressImage = async () => {
    if (!originalFile) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
      };
      const compressed = await imageCompression(originalFile, options);
      setCompressedFile(compressed);
      setCompressedSize(compressed.size);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const downloadCompressed = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed_${originalFile?.name}`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const reduction = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : 0;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Resim Sikistirma</h1>
      <p className="text-gray-400 mb-6">PNG ve JPG resimlerinizi kucultun</p>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
            ) : (
              <div className="text-gray-400">
                <p className="text-xl mb-2">Resim yuklemek icin tiklayin</p>
                <p className="text-sm">PNG, JPG, WebP desteklenir</p>
              </div>
            )}
          </label>
        </div>

        {originalFile && (
          <>
            <div>
              <label className="block mb-2">Kalite: {Math.round(quality * 100)}%</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={compressImage}
              disabled={loading}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Sikistiriliyor..." : "Sikistir"}
            </button>
          </>
        )}

        {compressedFile && (
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <p className="text-gray-400 text-sm">Orijinal</p>
                <p className="text-xl font-bold">{formatSize(originalSize)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Sikistirilmis</p>
                <p className="text-xl font-bold text-green-500">{formatSize(compressedSize)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Azalma</p>
                <p className="text-xl font-bold text-purple-500">%{reduction}</p>
              </div>
            </div>
            <button
              onClick={downloadCompressed}
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg"
            >
              Indir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
