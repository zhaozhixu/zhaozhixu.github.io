import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "@/data/site";
import { publishedWriting, articleDate, articlePath } from "@/lib/writing";
export async function GET(context: APIContext) {
  return rss({
    title: `${site.name} — Writing`,
    description: site.description,
    site: context.site!,
    items: (await publishedWriting()).map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: articleDate(article)!,
      link: articlePath(article),
      categories: article.data.tags,
    })),
  });
}
