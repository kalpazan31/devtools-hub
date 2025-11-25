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
    description: "JSON verilerini formatla ve dogrula",
    icon: "{ }",
    color: "from-yellow-500 to-orange-500",
    category: "formatter",
  },
  {
    id: "base64",
    slug: "base64",
    name: "Base64 Encoder/Decoder",
    description: "Base64 kodlama ve cozme",
    icon: "B64",
    color: "from-blue-500 to-cyan-500",
    category: "encoder",
  },
  {
    id: "urlEncoder",
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "URL kodlama ve cozme",
    icon: "URL",
    color: "from-green-500 to-emerald-500",
    category: "encoder",
  },
  {
    id: "hashGenerator",
    slug: "hash-generator",
    name: "Hash Generator",
    description: "MD5, SHA-1, SHA-256 hash olustur",
    icon: "#",
    color: "from-purple-500 to-pink-500",
    category: "generator",
  },
  {
    id: "uuidGenerator",
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Benzersiz kimlik olustur",
    icon: "ID",
    color: "from-red-500 to-rose-500",
    category: "generator",
  },
  {
    id: "colorConverter",
    slug: "color-converter",
    name: "Color Converter",
    description: "HEX, RGB, HSL donusumu",
    icon: "🎨",
    color: "from-pink-500 to-violet-500",
    category: "converter",
  },
  {
    id: "regexTester",
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Regular expression test et",
    icon: ".*",
    color: "from-indigo-500 to-blue-500",
    category: "tester",
  },
  {
    id: "loremIpsum",
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Ornek metin olustur",
    icon: "Aa",
    color: "from-teal-500 to-green-500",
    category: "generator",
  },
  {
    id: "timestampConverter",
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Unix timestamp donusumu",
    icon: "⏱",
    color: "from-amber-500 to-yellow-500",
    category: "converter",
  },
  {
    id: "qrGenerator",
    slug: "qr-generator",
    name: "QR Kod Olusturucu",
    description: "Metin ve URL icin QR kod",
    icon: "📱",
    color: "from-gray-500 to-slate-500",
    category: "generator",
  },
  {
    id: "passwordGenerator",
    slug: "password-generator",
    name: "Sifre Olusturucu",
    description: "Guclu rastgele sifre uret",
    icon: "🔐",
    color: "from-emerald-500 to-teal-500",
    category: "generator",
  },
  {
    id: "imageCompressor",
    slug: "image-compressor",
    name: "Resim Sikistirma",
    description: "PNG/JPG boyut kucultme",
    icon: "🖼️",
    color: "from-cyan-500 to-blue-500",
    category: "converter",
  },
  {
    id: "markdownEditor",
    slug: "markdown-editor",
    name: "Markdown Editor",
    description: "Canli onizleme ile Markdown",
    icon: "📝",
    color: "from-violet-500 to-purple-500",
    category: "editor",
  },
  {
    id: "cssMinifier",
    slug: "css-minifier",
    name: "CSS/JS Minifier",
    description: "Kod kucultme ve guzellestirme",
    icon: "✂️",
    color: "from-orange-500 to-red-500",
    category: "formatter",
  },
  {
    id: "imageConverter",
    slug: "image-converter",
    name: "Resim Format Donusturucu",
    description: "PNG, JPG, WebP donusumu",
    icon: "🔄",
    color: "from-lime-500 to-green-500",
    category: "converter",
  },
  {
    id: "dataConverter",
    slug: "data-converter",
    name: "Veri Donusturucu",
    description: "JSON, CSV, XML donusumu",
    icon: "📊",
    color: "from-sky-500 to-indigo-500",
    category: "converter",
  },
  {
    id: "wordCounter",
    slug: "word-counter",
    name: "Kelime Sayaci",
    description: "Metin analizi ve istatistikler",
    icon: "📝",
    color: "from-rose-500 to-pink-500",
    category: "text",
  },
  {
    id: "colorPalette",
    slug: "color-palette",
    name: "Renk Paleti Olusturucu",
    description: "Uyumlu renk paletleri",
    icon: "🎨",
    color: "from-fuchsia-500 to-purple-500",
    category: "design",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
