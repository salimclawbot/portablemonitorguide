import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export interface Article {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  htmlContent: string;
  date: string;
  dateModified: string;
  category: string;
  author: string;
  faqSchema?: Record<string, unknown> | null;
  articleSchema?: Record<string, unknown> | null;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function toSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

function extractJsonLdBlocks(raw: string): { articleSchema: Record<string, unknown> | null; faqSchema: Record<string, unknown> | null; content: string } {
  let articleSchema: Record<string, unknown> | null = null;
  let faqSchema: Record<string, unknown> | null = null;
  let content = raw;

  // Match ```json\n<script type="application/ld+json">...```  or bare <script> blocks
  const scriptRegex = /```json\s*\n?\s*<script[^>]*>\s*([\s\S]*?)\s*<\/script>\s*\n?```|<script[^>]*>\s*([\s\S]*?)\s*<\/script>/g;
  let match;
  while ((match = scriptRegex.exec(raw)) !== null) {
    const jsonStr = (match[1] || match[2] || "").trim();
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed["@type"] === "Article") {
        articleSchema = parsed;
      } else if (parsed["@type"] === "FAQPage") {
        faqSchema = parsed;
      }
    } catch {
      // skip unparseable blocks
    }
  }

  // Remove the JSON-LD code blocks from content
  content = content.replace(/```json\s*\n?\s*<script[^>]*>[\s\S]*?<\/script>\s*\n?```/g, "").trim();
  content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/g, "").trim();

  return { articleSchema, faqSchema, content };
}

function processContent(raw: string): string {
  let processed = raw;
  processed = processed.trimStart().replace(/^#\s+.*\n+/, "");
  processed = processed.replace(/\[INTERNAL:\s*([\w-]+)\]\((.*?)\)/g, "[$2](/$1)");
  processed = processed.replace(/\[INTERNAL:\s*([\w-]+)\]/g, "[$1](/$1)");
  return processed;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { articleSchema, faqSchema, content: strippedContent } = extractJsonLdBlocks(raw);

  const content = processContent(strippedContent);
  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content);

  const title = (articleSchema?.headline as string) || slug;
  const description = (articleSchema?.description as string) || "Etsy shop guide article.";
  const authorObj = articleSchema?.author as Record<string, unknown> | undefined;
  const author = (authorObj?.name as string) || "Jordan Ellis";
  const date = (articleSchema?.datePublished as string) || "2026-03-11";
  const dateModified = (articleSchema?.dateModified as string) || date;
  const category = "Guide";

  let htmlContent = result.toString();

  htmlContent = htmlContent.replace(/<(h[2-4])>(.*?)<\/\1>/g, (match, tag, text) => {
    const cleanText = text.replace(/<[^>]+>/g, "");
    const id = toSlug(cleanText);
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  const excerptMatch = strippedContent.match(/\*\*(.*?)\*\*/);
  const excerpt = excerptMatch ? excerptMatch[1].trim() : description;

  return {
    slug,
    title,
    description,
    excerpt,
    content,
    htmlContent,
    date,
    dateModified,
    category,
    author,
    faqSchema,
    articleSchema,
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getAllArticles(): Promise<Article[]> {
  const slugs = getAllSlugs();
  const articles = await Promise.all(slugs.map((slug) => getArticle(slug)));
  return articles.filter(Boolean) as Article[];
}
