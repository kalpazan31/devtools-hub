"use client";
import { useState } from "react";

type Format = "png" | "jpeg" | "webp";

export default function ImageConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [originalFormat, setOriginalFormat] = useState("");
  const [targetFormat, setTargetFormat] = useState<Format>("png");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.split(".")[0]);
    setOriginalFormat(file.type.split("/")[1]?.toUpperCase() || "UNKNOWN");

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      setConvertedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const convertImage = () => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      
      if (targetFormat === "jpeg") {
        ctx!.fillStyle = "#FFFFFF";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx?.drawImage(img, 0, 0);

      const mimeType = `image/${targetFormat}`;
      const converted = canvas.toDataURL(mimeType, 0.9);
      setConvertedImage(converted);
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!convertedImage) return;
    const link = document.createElement("a");
    link.href = convertedImage;
    link.download = `${fileName}.${targetFormat}`;
    link.click();
  };

  const formats: { value: Format; label: string; desc: string }[] = [
    { value: "png", label: "PNG", desc: "Seffaflik destekli" },
    { value: "jpeg", label: "JPEG", desc: "Kucuk boyut" },
    { value: "webp", label: "WebP", desc: "Modern format" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Resim Format Donusturucu</h1>
      <p className="text-gray-400 mb-6">PNG, JPEG ve WebP arasi donusum</p>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="text-4xl mb-4">🖼️</div>
            <p className="text-gray-300 mb-2">Resim yuklemek icin tiklayin</p>
            <p className="text-gray-500 text-sm">PNG, JPG, WebP, GIF</p>
          </label>
        </div>
      </div>

      {originalImage && (
        <>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Hedef Format Secin</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setTargetFormat(format.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    targetFormat === format.value
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  <div className="font-bold">{format.label}</div>
                  <div className="text-xs text-gray-400">{format.desc}</div>
                </button>
              ))}
            </div>
            <button
              onClick={convertImage}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              🔄 {originalFormat} → {targetFormat.toUpperCase()} Donustur
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Orijinal ({originalFormat})</h3>
              <img src={originalImage} alt="Original" className="w-full rounded-lg" />
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Donusturulmus ({targetFormat.toUpperCase()})</h3>
              {convertedImage ? (
                <>
                  <img src={convertedImage} alt="Converted" className="w-full rounded-lg mb-4" />
                  <button
                    onClick={downloadImage}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
                  >
                    💾 {targetFormat.toUpperCase()} Indir
                  </button>
                </>
              ) : (
                <div className="h-48 flex items-center justify-center bg-gray-700 rounded-lg">
                  <p className="text-gray-500">Donusturmek icin butona tiklayin</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
