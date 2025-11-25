import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hash Generator - MD5, SHA1, SHA256, SHA512 Hash Oluşturucu",
  description:
    "MD5, SHA1, SHA256, SHA512 ve daha fazla hash algoritması ile metinlerinizi hashleyin. Ücretsiz online hash generator aracı.",
  keywords: [
    "hash generator",
    "md5 hash",
    "sha1 hash",
    "sha256 hash",
    "sha512 hash",
    "hash oluşturucu",
    "checksum",
  ],
  openGraph: {
    title: "Hash Generator - DevTools Hub",
    description:
      "MD5, SHA1, SHA256, SHA512 hash oluşturun. Ücretsiz online hash generator.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
