import { getCollection, type CollectionEntry } from "astro:content";
export type Article = CollectionEntry<"writing">;
export function articleDate(article: Article) {
  return article.data.originalPublishedAt ?? article.data.publishedAt;
}
export function articlePath(article: Article) {
  return `${article.data.lang === "zh" ? "/zh" : ""}/writing/${article.data.slug}/`;
}
export function previewPath(article: Article) {
  return `/preview/${article.data.lang}/${article.data.slug}/`;
}
export function formatDate(date: Date, lang = "en") {
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
export async function publishedWriting(lang?: "en" | "zh") {
  const now = Date.now();
  return (await getCollection("writing"))
    .filter(
      ({ data }) =>
        !data.draft &&
        data.publishedAt &&
        data.publishedAt.valueOf() <= now &&
        (!lang || data.lang === lang),
    )
    .sort(
      (a, b) => articleDate(b)!.valueOf() - articleDate(a)!.valueOf(),
    );
}
