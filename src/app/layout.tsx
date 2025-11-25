import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevTools Hub - GeliÅŸtiriciler iÃ§in Ãœcretsiz Online AraÃ§lar",
    template: "%s | DevTools Hub",
  },
  description:
    "JSON Formatter, Base64 Encoder, Hash Generator, UUID Generator ve daha fazla Ã¼cretsiz geliÅŸtirici aracÄ±. TÃ¼m araÃ§lar tarayÄ±cÄ±nÄ±zda Ã§alÄ±ÅŸÄ±r, veri gÃ¶nderilmez.",
  keywords: [
    "developer tools",
    "geliÅŸtirici araÃ§larÄ±",
    "json formatter",
    "base64 encoder",
    "hash generator",
    "uuid generator",
    "regex tester",
    "online tools",
    "Ã¼cretsiz araÃ§lar",
  ],
  authors: [{ name: "DevTools Hub" }],
  creator: "DevTools Hub",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: "https://devtools-hub.com",
    siteName: "DevTools Hub",
    title: "DevTools Hub - GeliÅŸtiriciler iÃ§in Ãœcretsiz Online AraÃ§lar",
    description:
      "JSON Formatter, Base64 Encoder, Hash Generator, UUID Generator ve daha fazla Ã¼cretsiz geliÅŸtirici aracÄ±.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Hub - GeliÅŸtiriciler iÃ§in Ãœcretsiz Online AraÃ§lar",
    description:
      "JSON Formatter, Base64 Encoder, Hash Generator, UUID Generator ve daha fazla Ã¼cretsiz geliÅŸtirici aracÄ±.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <meta name="google-site-verification" content="FT_cpirtRlqzncH3p-WM6iWW6H98WLNmfvIImKSzisM" />
        {/* Google AdSense */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
