export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
}

export const tools: Tool[] = [
  {
    id: "jsonFormatter",
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "JSON verilerini formatla ve doğrula",
    icon: "{ }",
    color: "from-amber-500 to-orange-600",
    category: "formatter",
  },
  {
    id: "base64",
    slug: "base64",
    name: "Base64 Encoder/Decoder",
    description: "Base64 kodlama ve çözme",
    icon: "<>",
    color: "from-blue-500 to-cyan-500",
    category: "encoder",
  },
  {
    id: "urlEncoder",
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "URL kodlama ve çözme",
    icon: "%",
    color: "from-green-500 to-emerald-600",
    category: "encoder",
  },
  {
    id: "hashGenerator",
    slug: "hash-generator",
    name: "Hash Generator",
    description: "MD5, SHA-1, SHA-256 hash oluştur",
    icon: "#",
    color: "from-purple-500 to-violet-600",
    category: "generator",
  },
  {
    id: "uuidGenerator",
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Benzersiz kimlik oluştur",
    icon: "ID",
    color: "from-red-500 to-rose-600",
    category: "generator",
  },
  {
    id: "colorConverter",
    slug: "color-converter",
    name: "Color Converter",
    description: "HEX, RGB, HSL dönüşümü",
    icon: "◐",
    color: "from-pink-500 to-rose-500",
    category: "converter",
  },
  {
    id: "regexTester",
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Regular expression test et",
    icon: ".*",
    color: "from-indigo-500 to-blue-600",
    category: "tester",
  },
  {
    id: "loremIpsum",
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Örnek metin oluştur",
    icon: "¶",
    color: "from-teal-500 to-cyan-600",
    category: "generator",
  },
  {
    id: "timestampConverter",
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Unix timestamp dönüşümü",
    icon: "⏰",
    color: "from-amber-500 to-yellow-500",
    category: "converter",
  },
  {
    id: "qrGenerator",
    slug: "qr-generator",
    name: "QR Kod Oluşturucu",
    description: "Metin ve URL için QR kod",
    icon: "▣",
    color: "from-slate-500 to-gray-600",
    category: "generator",
  },
  {
    id: "passwordGenerator",
    slug: "password-generator",
    name: "Şifre Oluşturucu",
    description: "Güçlü rastgele şifre üret",
    icon: "⚿",
    color: "from-emerald-500 to-green-600",
    category: "generator",
  },
  {
    id: "imageCompressor",
    slug: "image-compressor",
    name: "Resim Sıkıştırma",
    description: "PNG/JPG boyut küçültme",
    icon: "◫",
    color: "from-cyan-500 to-blue-500",
    category: "converter",
  },
  {
    id: "markdownEditor",
    slug: "markdown-editor",
    name: "Markdown Editör",
    description: "Canlı önizleme ile Markdown",
    icon: "M↓",
    color: "from-violet-500 to-purple-600",
    category: "editor",
  },
  {
    id: "cssMinifier",
    slug: "css-minifier",
    name: "CSS/JS Minifier",
    description: "Kod küçültme ve güzelleştirme",
    icon: "{ }",
    color: "from-orange-500 to-red-500",
    category: "formatter",
  },
  {
    id: "imageConverter",
    slug: "image-converter",
    name: "Resim Format Dönüştürücü",
    description: "PNG, JPG, WebP dönüşümü",
    icon: "⇄",
    color: "from-lime-500 to-green-500",
    category: "converter",
  },
  {
    id: "dataConverter",
    slug: "data-converter",
    name: "Veri Dönüştürücü",
    description: "JSON, CSV, XML dönüşümü",
    icon: "⋮⋮",
    color: "from-sky-500 to-indigo-600",
    category: "converter",
  },
  {
    id: "wordCounter",
    slug: "word-counter",
    name: "Kelime Sayacı",
    description: "Metin analizi ve istatistikler",
    icon: "Σ",
    color: "from-rose-500 to-pink-600",
    category: "text",
  },
  {
    id: "colorPalette",
    slug: "color-palette",
    name: "Renk Paleti Oluşturucu",
    description: "Uyumlu renk paletleri",
    icon: "◔◑",
    color: "from-fuchsia-500 to-purple-600",
    category: "design",
  },
  {
    id: "codePlayground",
    slug: "code-playground",
    name: "Code Playground",
    description: "JS, Python, HTML çalıştır",
    icon: "</>",
    color: "from-blue-500 to-indigo-600",
    category: "code",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
