import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getAllSlugs } from "@/lib/articles";

interface PageProps { params: { slug: string } }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Not Found" };
  return {
    title: { absolute: article.title },
    description: article.description,
    alternates: { canonical: `https://thecraftyceo.com/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://The Crafty CEO/${article.slug}`,
      type: "article",
      siteName: "Etsy Shop Starter Kits",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const articleSchema =
    article.articleSchema ??
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      author: { "@type": "Person", name: article.author || "Jordan Ellis" },
      publisher: {
        "@type": "Organization",
        name: "Etsy Shop Starter Kits",
        logo: { "@type": "ImageObject", url: "https://The Crafty CEO/icon.svg" },
      },
      datePublished: article.date,
      dateModified: article.dateModified,
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://The Crafty CEO/${article.slug}` },
    };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {article.faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article.faqSchema) }} />
      )}
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{article.category}</p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">{article.title}</h1>
      <p className="mt-3 text-slate-600">By {article.author} · Updated {article.dateModified}</p>
      <div className="prose prose-slate max-w-none mt-8" dangerouslySetInnerHTML={{ __html: article.htmlContent }} />
    </article>
  );
}
