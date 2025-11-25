import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Ücretsiz Online JSON Güzelleştirici",
  description:
    "JSON verilerinizi güzelleştirin, formatlatın ve doğrulayın. Ücretsiz online JSON formatter ve validator aracı. JSON minify, beautify ve validate işlemleri.",
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minify",
    "json pretty print",
    "json güzelleştirici",
    "json doğrulama",
  ],
  openGraph: {
    title: "JSON Formatter & Validator - DevTools Hub",
    description:
      "JSON verilerinizi güzelleştirin, formatlatın ve doğrulayın. Ücretsiz online JSON formatter aracı.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
