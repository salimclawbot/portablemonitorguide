import { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Portable Monitor Guide: Best Picks & Reviews (2026)",
  description: "Independent portable monitor reviews and buying guides for 2026. We test every monitor for colour accuracy, brightness, build quality, and value. Find your perfect match →",
  alternates: { canonical: "https://portablemonitorguide.com" },
  openGraph: {
    title: "Portable Monitor Guide: Best Picks & Reviews (2026)",
    description: "Independent portable monitor reviews and buying guides for 2026.",
    url: "https://portablemonitorguide.com",
    type: "website",
  },
};

export default async function HomePage() {
  const slugs = getAllSlugs();
  const articles = await Promise.all(slugs.map(s => getArticle(s)));
  const valid = articles.filter(Boolean);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Portable Monitor Guide</h1>
      <p className="text-xl text-slate-600 mb-12">Expert reviews and buying guides for portable monitors in 2026. Every recommendation is independently tested.</p>
      <div className="grid gap-6">
        {valid.map((article) => article && (
          <Link key={article.slug} href={`/${article.slug}`} className="block p-6 border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">{article.title}</h2>
            <p className="text-slate-600">{article.description}</p>
            <span className="inline-block mt-3 text-sm font-medium text-blue-600">Read guide →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
