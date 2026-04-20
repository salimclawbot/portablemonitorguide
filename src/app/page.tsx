import { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Etsy Shop Starter Kits: Launch & Grow Your Etsy Store",
  description: "Free guides, checklists, and starter kits for new Etsy sellers in 2026. Learn what to sell, how much it costs, and how to set up your shop the right way.",
  alternates: { canonical: "https://thecraftyceo.com" },
  openGraph: {
    title: "Etsy Shop Starter Kits: Launch & Grow Your Etsy Store",
    description: "Free guides, checklists, and starter kits for new Etsy sellers in 2026.",
    url: "https://The Crafty CEO",
    type: "website",
  },
};

export default async function HomePage() {
  const slugs = getAllSlugs();
  const articles = await Promise.all(slugs.map(s => getArticle(s)));
  const valid = articles.filter(Boolean);
      return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Etsy Shop Starter Kits</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Everything you need to launch and grow your Etsy shop in 2026 — free guides, checklists, and step-by-step tutorials from sellers who have done it.</p>
      </div>
      <div className="grid gap-6">
        {valid.map((article) => article && (
          <Link key={article.slug} href={`/${article.slug}`} className="block p-6 border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-md transition-all">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{article.title}</h2>
            <p className="text-slate-600">{article.description}</p>
            <span className="inline-block mt-3 text-sm font-medium text-teal-600">Read guide →</span>
          </Link>
        ))}
      </div>
    
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type":"Question","name":"What sells best on Etsy in 2026?","acceptedAnswer":{"@type":"Answer","text":"Top-selling categories on Etsy in 2026 include digital downloads (planners, templates, SVGs), personalised jewellery, handmade candles, wedding items and vintage clothing."}},
            {"@type":"Question","name":"How much does it cost to open an Etsy shop?","acceptedAnswer":{"@type":"Answer","text":"Opening an Etsy shop is free. You pay a $0.20 listing fee per item, a 6.5% transaction fee on each sale, and payment processing fees. There are no monthly subscription fees for a basic shop."}},
            {"@type":"Question","name":"How long does it take to make money on Etsy?","acceptedAnswer":{"@type":"Answer","text":"Most new Etsy sellers make their first sale within 1-3 months. Building a consistent income typically takes 6-12 months of regular listing, SEO optimisation and marketing activity."}}
          ]
        })}}
      />
      </main>
  );
}
