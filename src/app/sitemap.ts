import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thecraftyceo.com";
  const slugs = getAllSlugs();
  const staticPages = ["", "about", "contact", "privacy", "affiliate-disclosure"];

  return [
    ...staticPages.map((page) => ({
      url: `${baseUrl}/${page}`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1.0 : 0.5,
    })),
    ...slugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date("2026-03-23"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
