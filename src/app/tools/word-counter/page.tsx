"use client";
import { useState, useEffect } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: "0 dk",
    speakingTime: "0 dk",
  });

  useEffect(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    
    // Ortalama okuma hızı: 200 kelime/dk
    const readingMinutes = Math.ceil(words / 200);
    // Ortalama konuşma hızı: 150 kelime/dk
    const speakingMinutes = Math.ceil(words / 150);

    setStats({
      characters: chars,
      charactersNoSpaces: charsNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime: readingMinutes < 1 ? "< 1 dk" : `${readingMinutes} dk`,
      speakingTime: speakingMinutes < 1 ? "< 1 dk" : `${speakingMinutes} dk`,
    });
  }, [text]);

  const getTopWords = () => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().match(/\b[a-zA-ZğüşıöçĞÜŞİÖÇ]+\b/g) || [];
    const frequency: Record<string, number> = {};
    words.forEach(word => {
      if (word.length > 2) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    });
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  };

  const topWords = getTopWords();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Kelime Sayaci</h1>
      <p className="text-gray-400 mb-6">Metin analizi ve kelime istatistikleri</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Metninizi buraya yazin veya yapisitirin..."
            className="w-full h-80 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white resize-none focus:border-purple-500 focus:outline-none"
          />
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setText("")}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Temizle
            </button>
            <button
              onClick={() => setText(text.toUpperCase())}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              BUYUK HARF
            </button>
            <button
              onClick={() => setText(text.toLowerCase())}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              kucuk harf
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(text)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              Kopyala
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-4 text-purple-400">Istatistikler</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Kelime</span>
                <span className="font-bold text-xl">{stats.words}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Karakter</span>
                <span className="font-bold">{stats.characters}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Karakter (bosluksuz)</span>
                <span className="font-bold">{stats.charactersNoSpaces}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cumle</span>
                <span className="font-bold">{stats.sentences}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Paragraf</span>
                <span className="font-bold">{stats.paragraphs}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-4 text-green-400">Tahmini Sure</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">📖 Okuma suresi</span>
                <span className="font-bold">{stats.readingTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">🎤 Konusma suresi</span>
                <span className="font-bold">{stats.speakingTime}</span>
              </div>
            </div>
          </div>

          {topWords.length > 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-yellow-400">En Cok Kullanilan</h3>
              <div className="space-y-2">
                {topWords.map(([word, count], i) => (
                  <div key={word} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {i + 1}. {word}
                    </span>
                    <span className="text-gray-300">{count}x</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
