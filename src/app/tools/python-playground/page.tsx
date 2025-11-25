"use client";

import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
  }
}

const defaultCode = `# Python Playground - DevTools Hub
# Tarayıcınızda Python kodu çalıştırın!

# Basit bir örnek
print("Merhaba, DevTools Hub!")

# Matematiksel işlemler
sayi1 = 10
sayi2 = 25
toplam = sayi1 + sayi2
print(f"{sayi1} + {sayi2} = {toplam}")

# Liste işlemleri
meyveler = ["elma", "armut", "muz", "çilek"]
print("\\nMeyveler:")
for meyve in meyveler:
    print(f"  - {meyve}")

# Fonksiyon tanımlama
def faktoriyel(n):
    if n <= 1:
        return 1
    return n * faktoriyel(n - 1)

print(f"\\n5! = {faktoriyel(5)}")
`;

const exampleCodes = [
  {
    name: "Merhaba Dünya",
    code: `print("Merhaba, Dünya!")
print("Python'a hoş geldiniz!")`,
  },
  {
    name: "Matematiksel İşlemler",
    code: `import math

# Temel işlemler
a, b = 15, 4
print(f"Toplama: {a} + {b} = {a + b}")
print(f"Çıkarma: {a} - {b} = {a - b}")
print(f"Çarpma: {a} * {b} = {a * b}")
print(f"Bölme: {a} / {b} = {a / b:.2f}")
print(f"Mod: {a} % {b} = {a % b}")
print(f"Üs: {a} ** {b} = {a ** b}")

# Math kütüphanesi
print(f"\\nPi sayısı: {math.pi:.6f}")
print(f"Karekök(16): {math.sqrt(16)}")
print(f"Sin(90°): {math.sin(math.radians(90))}")`,
  },
  {
    name: "Liste ve Döngüler",
    code: `# Liste oluşturma
sayilar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# List comprehension
kareler = [x**2 for x in sayilar]
print(f"Sayılar: {sayilar}")
print(f"Kareleri: {kareler}")

# Filtreleme
ciftler = [x for x in sayilar if x % 2 == 0]
print(f"Çift sayılar: {ciftler}")

# Map ve filter
tekler = list(filter(lambda x: x % 2 == 1, sayilar))
print(f"Tek sayılar: {tekler}")

# Toplam, min, max
print(f"\\nToplam: {sum(sayilar)}")
print(f"Ortalama: {sum(sayilar)/len(sayilar)}")
print(f"Min: {min(sayilar)}, Max: {max(sayilar)}")`,
  },
  {
    name: "Sınıf ve OOP",
    code: `class Hayvan:
    def __init__(self, isim, yas):
        self.isim = isim
        self.yas = yas
    
    def ses_cikar(self):
        pass
    
    def bilgi(self):
        return f"{self.isim}, {self.yas} yaşında"

class Kopek(Hayvan):
    def __init__(self, isim, yas, cins):
        super().__init__(isim, yas)
        self.cins = cins
    
    def ses_cikar(self):
        return "Hav hav!"
    
    def bilgi(self):
        return f"{super().bilgi()}, {self.cins} cinsi köpek"

class Kedi(Hayvan):
    def ses_cikar(self):
        return "Miyav!"

# Nesneler oluştur
kopek = Kopek("Karabaş", 3, "Golden Retriever")
kedi = Kedi("Pamuk", 2)

print(kopek.bilgi())
print(f"Köpek sesi: {kopek.ses_cikar()}")
print(f"\\n{kedi.bilgi()}")
print(f"Kedi sesi: {kedi.ses_cikar()}")`,
  },
  {
    name: "Fibonacci Serisi",
    code: `def fibonacci(n):
    """İlk n Fibonacci sayısını döndür"""
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib[:n]

def fibonacci_recursive(n):
    """Rekürsif Fibonacci (n. sayı)"""
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

# İlk 15 Fibonacci sayısı
n = 15
print(f"İlk {n} Fibonacci sayısı:")
print(fibonacci(n))

# Rekürsif örnek
print(f"\\n10. Fibonacci sayısı: {fibonacci_recursive(10)}")

# Fibonacci oranları (Altın oran'a yaklaşır)
fib = fibonacci(10)
print("\\nFibonacci oranları (Altın Oran ≈ 1.618):")
for i in range(2, len(fib)):
    oran = fib[i] / fib[i-1]
    print(f"{fib[i]}/{fib[i-1]} = {oran:.6f}")`,
  },
  {
    name: "Sözlük İşlemleri",
    code: `# Sözlük oluşturma
ogrenci = {
    "isim": "Ahmet",
    "yas": 20,
    "bolum": "Bilgisayar Mühendisliği",
    "notlar": {"matematik": 85, "fizik": 90, "programlama": 95}
}

# Değerlere erişim
print(f"İsim: {ogrenci['isim']}")
print(f"Bölüm: {ogrenci['bolum']}")
print(f"Programlama notu: {ogrenci['notlar']['programlama']}")

# Sözlük metodları
print(f"\\nAnahtarlar: {list(ogrenci.keys())}")
print(f"Değerler: {list(ogrenci.values())}")

# Not ortalaması
notlar = ogrenci["notlar"]
ortalama = sum(notlar.values()) / len(notlar)
print(f"\\nNot ortalaması: {ortalama:.2f}")

# Sözlük güncelleme
ogrenci["email"] = "ahmet@example.com"
ogrenci["notlar"]["kimya"] = 88
print(f"\\nGüncellenmiş öğrenci: {ogrenci}")`,
  },
  {
    name: "NumPy Örneği",
    code: `import numpy as np

# Dizi oluşturma
arr = np.array([1, 2, 3, 4, 5])
print(f"NumPy Dizisi: {arr}")
print(f"Tip: {arr.dtype}")

# Matris işlemleri
matris = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(f"\\nMatris:\\n{matris}")
print(f"Şekil: {matris.shape}")
print(f"Toplam: {matris.sum()}")
print(f"Ortalama: {matris.mean():.2f}")

# Linspace ve arange
print(f"\\n0-10 arası 5 eleman: {np.linspace(0, 10, 5)}")
print(f"0-10 arası 2'şer: {np.arange(0, 10, 2)}")

# Rastgele sayılar
np.random.seed(42)
rastgele = np.random.randint(1, 100, 5)
print(f"\\nRastgele sayılar: {rastgele}")
print(f"Sıralanmış: {np.sort(rastgele)}")`,
  },
  {
    name: "Asal Sayı Bulucu",
    code: `def asal_mi(n):
    """Bir sayının asal olup olmadığını kontrol et"""
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def asal_sayilar(limit):
    """Belirli bir limite kadar asal sayıları bul"""
    return [n for n in range(2, limit + 1) if asal_mi(n)]

def eratosthenes_kalburu(limit):
    """Eratosthenes Kalburu algoritması"""
    asal = [True] * (limit + 1)
    asal[0] = asal[1] = False
    
    for i in range(2, int(limit**0.5) + 1):
        if asal[i]:
            for j in range(i*i, limit + 1, i):
                asal[j] = False
    
    return [i for i in range(limit + 1) if asal[i]]

# Test
limit = 50
print(f"1-{limit} arası asal sayılar:")
print(asal_sayilar(limit))

print(f"\\nEratosthenes Kalburu ile:")
print(eratosthenes_kalburu(limit))

# İkiz asallar (farkı 2 olan asal çiftleri)
asallar = asal_sayilar(100)
ikiz_asallar = [(asallar[i], asallar[i+1]) 
                for i in range(len(asallar)-1) 
                if asallar[i+1] - asallar[i] == 2]
print(f"\\n100'e kadar ikiz asallar: {ikiz_asallar}")`,
  },
];

export default function PythonPlaygroundPage() {
  const tool = getToolBySlug("python-playground")!;
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState("Pyodide yükleniyor...");
  const pyodideRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        setLoadingProgress("Pyodide CDN'den yükleniyor...");
        
        // Pyodide script'ini yükle
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
        script.async = true;
        
        script.onload = async () => {
          setLoadingProgress("Python ortamı başlatılıyor...");
          try {
            const pyodide = await window.loadPyodide();
            setLoadingProgress("NumPy yükleniyor...");
            await pyodide.loadPackage(["numpy"]);
            pyodideRef.current = pyodide;
            setPyodideReady(true);
            setOutput("✅ Python ortamı hazır! Kodunuzu yazıp çalıştırabilirsiniz.\n\n📦 Yüklü paketler: numpy");
          } catch (err) {
            setOutput(`❌ Pyodide başlatma hatası: ${err}`);
          }
        };
        
        script.onerror = () => {
          setOutput("❌ Pyodide yüklenemedi. Lütfen internet bağlantınızı kontrol edin.");
        };
        
        document.head.appendChild(script);
      } catch (err) {
        setOutput(`❌ Hata: ${err}`);
      }
    };

    loadPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodideRef.current) {
      setOutput("⏳ Python ortamı henüz hazır değil. Lütfen bekleyin...");
      return;
    }

    setIsLoading(true);
    setOutput("⏳ Kod çalıştırılıyor...");

    try {
      // stdout'u yakalamak için
      pyodideRef.current.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      // Kullanıcı kodunu çalıştır
      await pyodideRef.current.runPythonAsync(code);

      // Çıktıyı al
      const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
      const stderr = pyodideRef.current.runPython("sys.stderr.getvalue()");

      let result = "";
      if (stdout) result += stdout;
      if (stderr) result += "\n⚠️ Stderr:\n" + stderr;
      
      setOutput(result || "✅ Kod başarıyla çalıştı (çıktı yok)");
    } catch (err: any) {
      setOutput(`❌ Hata:\n${err.message || err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearOutput = () => {
    setOutput("");
  };

  const loadExample = (exampleCode: string) => {
    setCode(exampleCode);
    setOutput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab tuşu için girinti
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      // Cursor pozisyonunu ayarla
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
    
    // Ctrl+Enter ile çalıştır
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Header Info */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              🐍
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Tarayıcı Tabanlı Python</h3>
              <p className="text-gray-400 text-sm">
                Pyodide sayesinde Python kodunuz tamamen tarayıcınızda çalışır. 
                Sunucuya veri gönderilmez, güvenli ve hızlıdır. NumPy dahil birçok kütüphane desteklenir.
              </p>
            </div>
          </div>
        </div>

        {/* Example Selector */}
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-400 text-sm py-2">Örnekler:</span>
          {exampleCodes.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(example.code)}
              className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              {example.name}
            </button>
          ))}
        </div>

        {/* Main Editor Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium flex items-center gap-2">
                <span className="text-xl">📝</span> Python Kodu
              </label>
              <span className="text-xs text-gray-500">Ctrl+Enter ile çalıştır</span>
            </div>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-[500px] bg-gray-900/80 border border-white/10 rounded-xl p-4 text-green-400 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                placeholder="Python kodunuzu buraya yazın..."
                spellCheck={false}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-600">
                {code.split("\n").length} satır
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium flex items-center gap-2">
                <span className="text-xl">📤</span> Çıktı
              </label>
              <button
                onClick={clearOutput}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Temizle
              </button>
            </div>
            <div className="w-full h-[500px] bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-auto">
              {!pyodideReady ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                  <p>{loadingProgress}</p>
                  <p className="text-xs mt-2 text-gray-500">İlk yükleme biraz zaman alabilir...</p>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={runCode}
            disabled={!pyodideReady || isLoading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              pyodideReady && !isLoading
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Çalışıyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Çalıştır (Ctrl+Enter)
              </>
            )}
          </button>
          
          <button
            onClick={() => setCode(defaultCode)}
            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sıfırla
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Kodu Kopyala
          </button>
        </div>

        {/* Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="text-white font-medium mb-1">Güvenli</h4>
            <p className="text-gray-400 text-sm">Kodunuz tarayıcınızda çalışır, sunucuya gönderilmez.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="text-white font-medium mb-1">Hızlı</h4>
            <p className="text-gray-400 text-sm">WebAssembly teknolojisi ile neredeyse native hızda.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">📦</div>
            <h4 className="text-white font-medium mb-1">Kütüphaneler</h4>
            <p className="text-gray-400 text-sm">NumPy, math ve standart Python kütüphaneleri desteklenir.</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
