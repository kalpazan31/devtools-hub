import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester - Regular Expression Test ve Debug Aracı",
  description:
    "Regular expression'larınızı test edin, eşleşmeleri görün. Regex pattern'lerinizi debug edin. Ücretsiz online regex tester.",
  keywords: [
    "regex tester",
    "regular expression",
    "regex debugger",
    "pattern matching",
    "regex online",
    "regex test",
  ],
  openGraph: {
    title: "Regex Tester - DevTools Hub",
    description:
      "Regular expression'larınızı test edin ve debug edin. Ücretsiz online regex tester.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
