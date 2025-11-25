"use client";

import { useState, useRef, useEffect } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";

type Language = "javascript" | "python" | "html";

interface LanguageConfig {
  id: Language;
  name: string;
  icon: string;
  color: string;
  defaultCode: string;
}

const languages: LanguageConfig[] = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "JS",
    color: "from-yellow-400 to-yellow-600",
    defaultCode: `// JavaScript Playground - DevTools Hub
// Tarayıcınızda JavaScript kodu çalıştırın!

// Değişkenler
const isim = "DevTools Hub";
const sayi = 42;

console.log("Merhaba, " + isim + "!");
console.log("Cevap:", sayi);

// Array işlemleri
const meyveler = ["elma", "armut", "muz", "çilek"];
console.log("\\nMeyveler:", meyveler);

meyveler.forEach((meyve, index) => {
  console.log(\`  \${index + 1}. \${meyve}\`);
});

// Fonksiyonlar
function faktoriyel(n) {
  if (n <= 1) return 1;
  return n * faktoriyel(n - 1);
}

console.log("\\n5! =", faktoriyel(5));

// Arrow function ve map
const sayilar = [1, 2, 3, 4, 5];
const kareler = sayilar.map(x => x * x);
console.log("\\nKareler:", kareler);

// Object
const kullanici = {
  ad: "Ahmet",
  yas: 25,
  meslek: "Geliştirici"
};

console.log("\\nKullanıcı:", JSON.stringify(kullanici, null, 2));
`,
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    color: "from-blue-400 to-yellow-500",
    defaultCode: `# Python Playground - DevTools Hub
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

# List comprehension
sayilar = [1, 2, 3, 4, 5]
kareler = [x**2 for x in sayilar]
print(f"\\nKareler: {kareler}")
`,
  },
  {
    id: "html",
    name: "HTML/CSS/JS",
    icon: "</>",
    color: "from-orange-400 to-red-500",
    defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }
    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 25px 50px rgba(0,0,0,0.3);
    }
    h1 {
      color: white;
      margin: 0 0 20px 0;
      font-size: 2.5em;
    }
    p {
      color: #a0aec0;
      margin: 0 0 30px 0;
    }
    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 15px 40px;
      font-size: 16px;
      border-radius: 30px;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    button:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
    #counter {
      font-size: 4em;
      color: #667eea;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 DevTools Hub</h1>
    <p>HTML/CSS/JS Playground</p>
    <div id="counter">0</div>
    <button onclick="artir()">Tıkla!</button>
  </div>
  
  <script>
    let sayac = 0;
    function artir() {
      sayac++;
      document.getElementById('counter').textContent = sayac;
    }
  </script>
</body>
</html>`,
  },
];

const jsExamples = [
  {
    name: "Merhaba Dünya",
    code: `console.log("Merhaba, Dünya!");
console.log("JavaScript'e hoş geldiniz!");`,
  },
  {
    name: "Array Metodları",
    code: `const sayilar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter - Çift sayılar
const ciftler = sayilar.filter(x => x % 2 === 0);
console.log("Çift sayılar:", ciftler);

// Map - Kareler
const kareler = sayilar.map(x => x * x);
console.log("Kareler:", kareler);

// Reduce - Toplam
const toplam = sayilar.reduce((acc, x) => acc + x, 0);
console.log("Toplam:", toplam);

// Find
const ilkBuyuk = sayilar.find(x => x > 5);
console.log("5'ten büyük ilk sayı:", ilkBuyuk);

// Some & Every
console.log("Hepsi pozitif mi?", sayilar.every(x => x > 0));
console.log("10'dan büyük var mı?", sayilar.some(x => x > 10));`,
  },
  {
    name: "Promise & Async",
    code: `// Promise örneği
function bekle(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("Başladı...");
  
  await bekle(1000);
  console.log("1 saniye geçti");
  
  await bekle(1000);
  console.log("2 saniye geçti");
  
  // Promise.all
  const promises = [
    Promise.resolve("Bir"),
    Promise.resolve("İki"),
    Promise.resolve("Üç")
  ];
  
  const sonuclar = await Promise.all(promises);
  console.log("Sonuçlar:", sonuclar);
  
  console.log("Bitti!");
}

main();`,
  },
  {
    name: "Class ve OOP",
    code: `class Hayvan {
  constructor(isim, yas) {
    this.isim = isim;
    this.yas = yas;
  }
  
  sesCikar() {
    return "...";
  }
  
  bilgi() {
    return \`\${this.isim}, \${this.yas} yaşında\`;
  }
}

class Kopek extends Hayvan {
  constructor(isim, yas, cins) {
    super(isim, yas);
    this.cins = cins;
  }
  
  sesCikar() {
    return "Hav hav!";
  }
  
  bilgi() {
    return \`\${super.bilgi()}, \${this.cins} cinsi köpek\`;
  }
}

class Kedi extends Hayvan {
  sesCikar() {
    return "Miyav!";
  }
}

const kopek = new Kopek("Karabaş", 3, "Golden Retriever");
const kedi = new Kedi("Pamuk", 2);

console.log(kopek.bilgi());
console.log("Köpek sesi:", kopek.sesCikar());
console.log();
console.log(kedi.bilgi());
console.log("Kedi sesi:", kedi.sesCikar());`,
  },
  {
    name: "Fetch API",
    code: `// JSONPlaceholder API'den veri çekme
async function kullanicilariGetir() {
  try {
    console.log("Kullanıcılar yükleniyor...");
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const kullanicilar = await response.json();
    
    console.log("\\nİlk 5 Kullanıcı:");
    kullanicilar.slice(0, 5).forEach((user, i) => {
      console.log(\`\${i + 1}. \${user.name} (@\${user.username})\`);
      console.log(\`   Email: \${user.email}\`);
      console.log(\`   Şehir: \${user.address.city}\`);
      console.log();
    });
    
  } catch (error) {
    console.error("Hata:", error.message);
  }
}

kullanicilariGetir();`,
  },
  {
    name: "DOM Manipülasyonu",
    code: `// Not: Bu kod sadece HTML modunda çalışır
// JavaScript modunda console.log kullanın

const obj = {
  isim: "DevTools Hub",
  ozellikler: ["Ücretsiz", "Hızlı", "Güvenli"],
  versiyon: 2.0
};

console.log("Nesne:", JSON.stringify(obj, null, 2));

// Destructuring
const { isim, ozellikler } = obj;
console.log("\\nİsim:", isim);
console.log("Özellikler:", ozellikler.join(", "));

// Spread operator
const yeniObj = { ...obj, yazar: "DevTools Team" };
console.log("\\nYeni nesne:", JSON.stringify(yeniObj, null, 2));

// Template literals
const mesaj = \`
Hoş geldiniz \${isim}!
Toplam \${ozellikler.length} özellik mevcut.
Versiyon: \${obj.versiyon}
\`;
console.log(mesaj);`,
  },
];

const pythonExamples = [
  {
    name: "Matematiksel İşlemler",
    code: `import math

# Temel işlemler
a, b = 15, 4
print(f"Toplama: {a} + {b} = {a + b}")
print(f"Çıkarma: {a} - {b} = {a - b}")
print(f"Çarpma: {a} * {b} = {a * b}")
print(f"Bölme: {a} / {b} = {a / b:.2f}")

# Math kütüphanesi
print(f"\\nPi sayısı: {math.pi:.6f}")
print(f"Karekök(16): {math.sqrt(16)}")`,
  },
  {
    name: "NumPy Örneği",
    code: `import numpy as np

# Dizi oluşturma
arr = np.array([1, 2, 3, 4, 5])
print(f"NumPy Dizisi: {arr}")

# Matris işlemleri
matris = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(f"\\nMatris:\\n{matris}")
print(f"Toplam: {matris.sum()}")
print(f"Ortalama: {matris.mean():.2f}")`,
  },
  {
    name: "Fibonacci Serisi",
    code: `def fibonacci(n):
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib[:n]

print("İlk 15 Fibonacci sayısı:")
print(fibonacci(15))`,
  },
];

const htmlExamples = [
  {
    name: "Animasyonlu Kart",
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: sans-serif;
      background: #0f0f23;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      width: 300px;
      padding: 30px;
      background: linear-gradient(145deg, #1a1a2e, #16213e);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      text-align: center;
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    h2 { color: #fff; margin: 0 0 15px 0; }
    p { color: #888; margin: 0; }
  </style>
</head>
<body>
  <div class="card">
    <h2>✨ Merhaba!</h2>
    <p>Animasyonlu kart örneği</p>
  </div>
</body>
</html>`,
  },
  {
    name: "To-Do List",
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }
    .container {
      background: white;
      border-radius: 15px;
      padding: 30px;
      width: 350px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h2 { margin: 0 0 20px 0; color: #333; }
    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    input {
      flex: 1;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
    }
    button {
      padding: 12px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    ul { list-style: none; padding: 0; margin: 0; }
    li {
      padding: 12px;
      background: #f5f5f5;
      margin-bottom: 8px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .delete { color: #f44336; cursor: pointer; }
  </style>
</head>
<body>
  <div class="container">
    <h2>📝 Yapılacaklar</h2>
    <div class="input-group">
      <input type="text" id="input" placeholder="Yeni görev...">
      <button onclick="ekle()">Ekle</button>
    </div>
    <ul id="list"></ul>
  </div>
  <script>
    function ekle() {
      const input = document.getElementById('input');
      const list = document.getElementById('list');
      if (input.value.trim()) {
        const li = document.createElement('li');
        li.innerHTML = input.value + '<span class="delete" onclick="this.parentElement.remove()">✕</span>';
        list.appendChild(li);
        input.value = '';
      }
    }
    document.getElementById('input').addEventListener('keypress', e => {
      if (e.key === 'Enter') ekle();
    });
  </script>
</body>
</html>`,
  },
];

declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
  }
}

export default function CodePlaygroundPage() {
  const tool = getToolBySlug("code-playground")!;
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState(languages[0].defaultCode);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const pyodideRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Pyodide'ı sadece Python seçildiğinde yükle
  useEffect(() => {
    if (language === "python" && !pyodideRef.current && !pyodideLoading) {
      loadPyodide();
    }
  }, [language, pyodideLoading]);

  const loadPyodide = async () => {
    setPyodideLoading(true);
    setOutput("⏳ Python ortamı yükleniyor (ilk kez biraz zaman alabilir)...");
    
    try {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      script.async = true;
      
      script.onload = async () => {
        try {
          const pyodide = await window.loadPyodide();
          await pyodide.loadPackage(["numpy"]);
          pyodideRef.current = pyodide;
          setPyodideReady(true);
          setOutput("✅ Python ortamı hazır! NumPy destekli.");
        } catch (err) {
          setOutput(`❌ Pyodide başlatma hatası: ${err}`);
        }
        setPyodideLoading(false);
      };
      
      script.onerror = () => {
        setOutput("❌ Pyodide yüklenemedi.");
        setPyodideLoading(false);
      };
      
      document.head.appendChild(script);
    } catch (err) {
      setOutput(`❌ Hata: ${err}`);
      setPyodideLoading(false);
    }
  };

  const runCode = async () => {
    setIsLoading(true);
    
    if (language === "javascript") {
      runJavaScript();
    } else if (language === "python") {
      await runPython();
    } else if (language === "html") {
      runHTML();
    }
    
    setIsLoading(false);
  };

  const runJavaScript = () => {
    const logs: string[] = [];
    const originalConsole = { ...console };
    
    // Console metodlarını override et
    const customConsole = {
      log: (...args: any[]) => logs.push(args.map(formatValue).join(" ")),
      error: (...args: any[]) => logs.push("❌ " + args.map(formatValue).join(" ")),
      warn: (...args: any[]) => logs.push("⚠️ " + args.map(formatValue).join(" ")),
      info: (...args: any[]) => logs.push("ℹ️ " + args.map(formatValue).join(" ")),
    };
    
    try {
      // Kodu bir fonksiyon içinde çalıştır
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
      const fn = new AsyncFunction("console", code);
      
      fn(customConsole).then(() => {
        setOutput(logs.join("\n") || "✅ Kod başarıyla çalıştı (çıktı yok)");
      }).catch((err: any) => {
        setOutput(logs.join("\n") + "\n❌ Hata: " + err.message);
      });
    } catch (err: any) {
      setOutput("❌ Sözdizimi Hatası: " + err.message);
    }
  };

  const formatValue = (value: any): string => {
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (typeof value === "object") {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  const runPython = async () => {
    if (!pyodideRef.current) {
      setOutput("⏳ Python ortamı henüz hazır değil. Lütfen bekleyin...");
      return;
    }

    try {
      pyodideRef.current.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      await pyodideRef.current.runPythonAsync(code);

      const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
      const stderr = pyodideRef.current.runPython("sys.stderr.getvalue()");

      let result = "";
      if (stdout) result += stdout;
      if (stderr) result += "\n⚠️ Stderr:\n" + stderr;
      
      setOutput(result || "✅ Kod başarıyla çalıştı (çıktı yok)");
    } catch (err: any) {
      setOutput(`❌ Hata:\n${err.message || err}`);
    }
  };

  const runHTML = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
    setOutput("✅ HTML çıktısı sağ panelde gösteriliyor");
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    const langConfig = languages.find(l => l.id === newLang);
    if (langConfig) {
      setCode(langConfig.defaultCode);
    }
    setOutput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
    
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  };

  const getCurrentExamples = () => {
    if (language === "javascript") return jsExamples;
    if (language === "python") return pythonExamples;
    return htmlExamples;
  };

  const currentLang = languages.find(l => l.id === language)!;

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Language Tabs */}
        <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => handleLanguageChange(lang.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                language === lang.id
                  ? `bg-gradient-to-r ${lang.color} text-white shadow-lg`
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-lg">{lang.icon}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentLang.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
              {currentLang.icon}
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">
                {language === "javascript" && "JavaScript - Tarayıcı Tabanlı"}
                {language === "python" && "Python - Pyodide (WebAssembly)"}
                {language === "html" && "HTML/CSS/JS - Canlı Önizleme"}
              </h3>
              <p className="text-gray-400 text-sm">
                {language === "javascript" && "Kodunuz tarayıcınızda güvenli bir şekilde çalışır. Async/await, fetch API ve modern JS desteklenir."}
                {language === "python" && "Python kodu WebAssembly ile tarayıcıda çalışır. NumPy dahil birçok kütüphane desteklenir."}
                {language === "html" && "HTML, CSS ve JavaScript ile tam web sayfaları oluşturun. Canlı önizleme ile anında sonuç görün."}
              </p>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-400 text-sm py-2">Örnekler:</span>
          {getCurrentExamples().map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setCode(example.code);
                setOutput("");
              }}
              className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              {example.name}
            </button>
          ))}
        </div>

        {/* Editor and Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white font-medium flex items-center gap-2">
                <span>📝</span> Kod
              </label>
              <span className="text-xs text-gray-500">Ctrl+Enter ile çalıştır</span>
            </div>
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`w-full h-[450px] bg-gray-900/80 border border-white/10 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                  language === "python" ? "text-green-400" : language === "html" ? "text-orange-400" : "text-yellow-400"
                }`}
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
                <span>📤</span> {language === "html" ? "Önizleme" : "Çıktı"}
              </label>
              {language !== "html" && (
                <button
                  onClick={() => setOutput("")}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Temizle
                </button>
              )}
            </div>
            
            {language === "html" ? (
              <iframe
                ref={iframeRef}
                className="w-full h-[450px] bg-white rounded-xl border border-white/10"
                sandbox="allow-scripts allow-modals"
              />
            ) : (
              <div className="w-full h-[450px] bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-sm overflow-auto">
                {language === "python" && !pyodideReady && pyodideLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                    <p>Python ortamı yükleniyor...</p>
                    <p className="text-xs mt-2 text-gray-500">İlk yükleme biraz zaman alabilir</p>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={runCode}
            disabled={isLoading || (language === "python" && !pyodideReady && pyodideLoading)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              !isLoading && !(language === "python" && !pyodideReady && pyodideLoading)
                ? `bg-gradient-to-r ${currentLang.color} hover:opacity-90 text-white shadow-lg`
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
                Çalıştır
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              const langConfig = languages.find(l => l.id === language);
              if (langConfig) setCode(langConfig.defaultCode);
              setOutput("");
            }}
            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sıfırla
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Kopyala
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">🌐</div>
            <h4 className="text-white font-medium mb-1">3 Dil Desteği</h4>
            <p className="text-gray-400 text-sm">JavaScript, Python ve HTML/CSS/JS desteklenir.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="text-white font-medium mb-1">Güvenli</h4>
            <p className="text-gray-400 text-sm">Kod sunucuya gönderilmez, tarayıcıda çalışır.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="text-white font-medium mb-1">Kurulum Yok</h4>
            <p className="text-gray-400 text-sm">Hiçbir şey yüklemenize gerek yok, hemen başlayın.</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
