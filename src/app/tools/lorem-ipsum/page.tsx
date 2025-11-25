"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { getToolBySlug } from "@/lib/tools";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import { CopyButton } from "@/components/ui/CopyButton";
import { Card, CardContent } from "@/components/ui/Card";

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
  "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
  "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi",
  "nesciunt", "neque", "porro", "quisquam", "nihil", "numquam", "eius", "modi",
  "tempora", "incidunt", "magnam", "quaerat", "minima", "nostrum",
  "exercitationem", "ullam", "corporis", "suscipit", "laboriosam"
];

function generateWords(count: number, startWithLorem: boolean): string {
  const words: string[] = [];
  
  if (startWithLorem) {
    words.push("Lorem", "ipsum", "dolor", "sit", "amet");
    count = Math.max(0, count - 5);
  }
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * loremWords.length);
    words.push(loremWords[randomIndex]);
  }
  
  return words.join(" ");
}

function generateSentence(wordCount: number = 10): string {
  const count = wordCount + Math.floor(Math.random() * 5);
  const words = generateWords(count, false).split(" ");
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentenceCount: number = 5): string {
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(8 + Math.floor(Math.random() * 8)));
  }
  return sentences.join(" ");
}

export default function LoremIpsumPage() {
  const { t } = useLanguage();
  const tool = getToolBySlug("lorem-ipsum")!;
  const toolT = t.tools.loremIpsum;

  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");

  const generate = () => {
    let result = "";

    switch (type) {
      case "paragraphs":
        const paragraphs: string[] = [];
        for (let i = 0; i < count; i++) {
          let para = generateParagraph(4 + Math.floor(Math.random() * 3));
          if (i === 0 && startWithLorem) {
            para = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + para;
          }
          paragraphs.push(para);
        }
        result = paragraphs.join("\n\n");
        break;

      case "sentences":
        const sentences: string[] = [];
        for (let i = 0; i < count; i++) {
          let sentence = generateSentence(10);
          if (i === 0 && startWithLorem) {
            sentence = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
          }
          sentences.push(sentence);
        }
        result = sentences.join(" ");
        break;

      case "words":
        result = generateWords(count, startWithLorem);
        // Capitalize first letter
        result = result.charAt(0).toUpperCase() + result.slice(1);
        break;
    }

    setOutput(result);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                label={toolT.type}
                value={type}
                onChange={(e) => setType(e.target.value)}
                options={[
                  { value: "paragraphs", label: toolT.paragraphs },
                  { value: "sentences", label: toolT.sentences },
                  { value: "words", label: toolT.words },
                ]}
              />

              <Input
                label={toolT.count}
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              />

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer pb-2">
                  <input
                    type="checkbox"
                    checked={startWithLorem}
                    onChange={(e) => setStartWithLorem(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">
                    {toolT.startWithLorem}
                  </span>
                </label>
              </div>

              <div className="flex items-end">
                <Button onClick={generate} className="w-full">
                  {t.generate}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              {t.output}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <TextArea
            value={output}
            readOnly
            placeholder="Generated text will appear here..."
            rows={15}
          />
        </div>

        {/* Stats */}
        {output && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-400">
                    {output.split(/\n\n/).length}
                  </p>
                  <p className="text-sm text-gray-500">{toolT.paragraphs}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">
                    {output.split(/[.!?]+/).filter(Boolean).length}
                  </p>
                  <p className="text-sm text-gray-500">{toolT.sentences}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">
                    {output.split(/\s+/).filter(Boolean).length}
                  </p>
                  <p className="text-sm text-gray-500">{toolT.words}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
