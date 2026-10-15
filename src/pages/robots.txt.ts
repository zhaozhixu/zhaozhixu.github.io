import type { APIContext } from "astro";
export function GET({ site }: APIContext) {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: ${new URL("/sitemap-index.xml", site)}
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
