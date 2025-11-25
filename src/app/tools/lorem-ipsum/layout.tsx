import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Örnek Metin Oluşturucu",
  description:
    "Lorem Ipsum örnek metinleri oluşturun. Paragraf, cümle veya kelime sayısına göre metin üretin. Ücretsiz online lorem ipsum generator.",
  keywords: [
    "lorem ipsum generator",
    "dummy text",
    "placeholder text",
    "örnek metin",
    "lorem ipsum",
    "metin oluşturucu",
  ],
  openGraph: {
    title: "Lorem Ipsum Generator - DevTools Hub",
    description:
      "Lorem Ipsum örnek metinleri oluşturun. Ücretsiz online lorem ipsum generator.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
