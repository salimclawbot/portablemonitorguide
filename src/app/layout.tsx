import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Portable Monitor Guide — Expert Reviews & Buying Guides (2026)",
    template: "%s | Portable Monitor Guide",
  },
  description: "Expert portable monitor reviews, comparisons and buying guides for 2026. Find the best portable monitor for your laptop, travel, or home office setup.",
  metadataBase: new URL("https://portablemonitorguide.com"),
  openGraph: {
    siteName: "Portable Monitor Guide",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
