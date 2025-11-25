import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator - Ücretsiz Online UUID/GUID Oluşturucu",
  description:
    "UUID v4 ve GUID oluşturun. Toplu UUID üretimi yapın. Ücretsiz online UUID generator aracı.",
  keywords: [
    "uuid generator",
    "guid generator",
    "uuid v4",
    "unique id",
    "random uuid",
    "uuid oluşturucu",
  ],
  openGraph: {
    title: "UUID Generator - DevTools Hub",
    description: "UUID v4 ve GUID oluşturun. Ücretsiz online UUID generator.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
