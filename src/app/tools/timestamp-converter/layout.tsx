import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timestamp Converter - Unix Timestamp Dönüştürücü",
  description:
    "Unix timestamp'leri tarih formatına veya tarihleri timestamp'e dönüştürün. Ücretsiz online timestamp converter.",
  keywords: [
    "timestamp converter",
    "unix timestamp",
    "epoch converter",
    "date to timestamp",
    "timestamp to date",
    "zaman damgası",
  ],
  openGraph: {
    title: "Timestamp Converter - DevTools Hub",
    description:
      "Unix timestamp'leri tarih formatına dönüştürün. Ücretsiz online timestamp converter.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
