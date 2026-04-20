import Script from 'next/script';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "The Crafty CEO — Etsy Shop Starter Guides (2026)", template: "%s | The Crafty CEO" },
  description: "Expert Etsy shop guides, product ideas and seller tips for 2026. Build a profitable Etsy business with our step-by-step strategies and tool reviews.",
  metadataBase: new URL("https://thecraftyceo.com"),
  alternates: { canonical: "https://thecraftyceo.com" },
  openGraph: {
    siteName: "The Crafty CEO",
    type: "website",
    title: "The Crafty CEO — Etsy Shop Starter Guides (2026)",
    description: "Expert Etsy shop guides, product ideas and seller tips for 2026. Build a profitable Etsy business with our step-by-step strategies and tool reviews.",
    url: "https://thecraftyceo.com",
    images: [{ url: "https://thecraftyceo.com/og-image.jpg", width: 1200, height: 630, alt: "The Crafty CEO — Etsy Shop Starter Guides (2026)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Crafty CEO — Etsy Shop Starter Guides (2026)",
    description: "Expert Etsy shop guides, product ideas and seller tips for 2026. Build a profitable Etsy business with our step-by-step strategies and tool reviews.",
    images: ["https://thecraftyceo.com/og-image.jpg"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The Crafty CEO",
  "url": "https://thecraftyceo.com",
  "description": "Etsy shop guides and creative business resources",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://thecraftyceo.com/?s={{search_term_string}}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E3WKB7T2V2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E3WKB7T2V2');
          `}
        </Script>
      </body>
    </html>
  );
}
