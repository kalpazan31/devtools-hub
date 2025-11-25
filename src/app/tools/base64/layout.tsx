import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder/Decoder - Ücretsiz Online Base64 Dönüştürücü",
  description:
    "Metinleri Base64 formatına dönüştürün veya Base64 kodlarını çözün. Ücretsiz online Base64 encoder decoder aracı.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "base64 dönüştürücü",
    "base64 çözücü",
    "base64 kodlama",
  ],
  openGraph: {
    title: "Base64 Encoder/Decoder - DevTools Hub",
    description:
      "Metinleri Base64 formatına dönüştürün veya Base64 kodlarını çözün.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
