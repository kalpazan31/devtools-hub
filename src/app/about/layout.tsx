import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkında - DevTools Hub",
  description:
    "DevTools Hub hakkında bilgi edinin. Geliştiriciler için ücretsiz online araçlar sunan platformumuz hakkında her şey.",
  openGraph: {
    title: "Hakkında - DevTools Hub",
    description: "DevTools Hub hakkında bilgi edinin.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
