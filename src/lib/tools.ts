export interface Tool {
  id: string;
  slug: string;
  icon: string;
  color: string;
  category: string;
}

export const tools: Tool[] = [
  {
    id: "jsonFormatter",
    slug: "json-formatter",
    icon: "{ }",
    color: "from-yellow-500 to-orange-500",
    category: "formatter",
  },
  {
    id: "base64",
    slug: "base64",
    icon: "B64",
    color: "from-blue-500 to-cyan-500",
    category: "encoder",
  },
  {
    id: "urlEncoder",
    slug: "url-encoder",
    icon: "URL",
    color: "from-green-500 to-emerald-500",
    category: "encoder",
  },
  {
    id: "hashGenerator",
    slug: "hash-generator",
    icon: "#",
    color: "from-purple-500 to-pink-500",
    category: "generator",
  },
  {
    id: "uuidGenerator",
    slug: "uuid-generator",
    icon: "ID",
    color: "from-red-500 to-rose-500",
    category: "generator",
  },
  {
    id: "colorConverter",
    slug: "color-converter",
    icon: "🎨",
    color: "from-pink-500 to-violet-500",
    category: "converter",
  },
  {
    id: "regexTester",
    slug: "regex-tester",
    icon: ".*",
    color: "from-indigo-500 to-blue-500",
    category: "tester",
  },
  {
    id: "loremIpsum",
    slug: "lorem-ipsum",
    icon: "Aa",
    color: "from-teal-500 to-green-500",
    category: "generator",
  },
  {
    id: "timestampConverter",
    slug: "timestamp-converter",
    icon: "⏱",
    color: "from-amber-500 to-yellow-500",
    category: "converter",
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
