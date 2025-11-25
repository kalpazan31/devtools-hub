import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder/Decoder - Ücretsiz Online URL Kodlayıcı",
  description:
    "URL'leri encode veya decode edin. Özel karakterleri URL-safe formata dönüştürün. Ücretsiz online URL encoder decoder aracı.",
  keywords: [
    "url encoder",
    "url decoder",
    "url kodlama",
    "url çözme",
    "encodeURIComponent",
    "decodeURIComponent",
  ],
  openGraph: {
    title: "URL Encoder/Decoder - DevTools Hub",
    description:
      "URL'leri encode veya decode edin. Özel karakterleri URL-safe formata dönüştürün.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
