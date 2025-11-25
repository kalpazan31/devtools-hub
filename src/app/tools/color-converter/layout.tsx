import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Converter - HEX, RGB, HSL Renk Dönüştürücü",
  description:
    "Renk kodlarını HEX, RGB, HSL formatları arasında dönüştürün. Renk seçici ile kolayca renk seçin. Ücretsiz online color converter.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hsl converter",
    "renk dönüştürücü",
    "color picker",
  ],
  openGraph: {
    title: "Color Converter - DevTools Hub",
    description:
      "Renk kodlarını HEX, RGB, HSL formatları arasında dönüştürün.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
