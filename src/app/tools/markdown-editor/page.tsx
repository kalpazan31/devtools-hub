"use client";
import { useState } from "react";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(`# Baslik

Bu bir **kalin** ve *italik* metin ornegi.

## Liste
- Madde 1
- Madde 2
- Madde 3

## Kod
\`\`\`javascript
const hello = "Merhaba Dunya";
console.log(hello);
\`\`\`

## Link
[DevTools Hub](https://devtools-hub-masb.vercel.app)
`);

  const parseMarkdown = (text: string) => {
    let html = text
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\`\`\`(\w+)?\n([\s\S]*?)\`\`\`/g, '<pre class="bg-gray-800 p-4 rounded-lg my-2 overflow-x-auto"><code>$2</code></pre>')
      .replace(/\`(.*?)\`/g, '<code class="bg-gray-800 px-1 rounded">$1</code>')
      .replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-400 hover:underline" target="_blank">$1</a>')
      .replace(/\n\n/g, '</p><p class="my-2">')
      .replace(/\n/g, '<br/>');
    return `<p class="my-2">${html}</p>`;
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(parseMarkdown(markdown));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Markdown Editor</h1>
      <p className="text-gray-400 mb-6">Canli onizleme ile Markdown duzenleyin</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Markdown</h2>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-96 p-4 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Onizleme</h2>
            <button
              onClick={copyHtml}
              className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded"
            >
              HTML Kopyala
            </button>
          </div>
          <div 
            className="w-full h-96 p-4 bg-gray-800 border border-gray-700 rounded-lg overflow-auto prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}
