import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import assert from "node:assert/strict";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(join(directory, entry.name))
          : join(directory, entry.name),
      ),
    )
  ).flat();
}
const files = await walk("dist");
for (const required of [
  "index.html",
  "about/index.html",
  "projects/index.html",
  "writing/index.html",
  "zh/index.html",
  "zh/writing/index.html",
  "404.html",
  "rss.xml",
  "sitemap-index.xml",
  "robots.txt",
  "favicon.svg",
  "og.png",
]) {
  assert((await stat(join("dist", required))).isFile(), `Missing ${required}`);
}
assert(
  !files.some((file) =>
    /(?:preview|private-sources|\.agent-shell|_draft)/.test(file),
  ),
  "Private paths found in build.",
);
const documents = await Promise.all(
  files
    .filter((file) => /\.(?:html|xml|txt|js|json)$/.test(file))
    .map(async (file) => [file, await readFile(file, "utf8")]),
);
const output = documents.map(([, body]) => body).join("\n");
for (const file of await walk("src/content/writing")) {
  if (!file.endsWith(".md")) continue;
  const markdown = await readFile(file, "utf8");
  const frontmatter = markdown.split("---")[1] ?? "";
  if (/^draft:\s*false\s*$/m.test(frontmatter)) continue;
  const slug = frontmatter.match(/^slug:\s*["']?([^\s"']+)/m)?.[1];
  if (slug) assert(!output.includes(slug), `Unpublished slug leaked: ${slug}`);
  // A sentence from the body catches content accidentally embedded in JS/JSON.
  const body = markdown.slice(markdown.indexOf("---", 3) + 3).trim();
  const sentence = body
    .split("\n")
    .find((line) => line.length > 100 && !line.startsWith("#"));
  if (sentence)
    assert(!output.includes(sentence), `Unpublished content leaked: ${file}`);
}
for (const [file, html] of documents.filter(([file]) =>
  file.endsWith(".html"),
)) {
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${file}: expected one h1`,
  );
  assert(
    html.includes("https://zhaozhixu.github.io"),
    `${file}: missing canonical site`,
  );
  for (const match of html.matchAll(
    /(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g,
  )) {
    const target = match[1];
    const destination = join(
      "dist",
      target.endsWith("/") ? `${target}index.html` : target,
    );
    assert(
      (await stat(destination)).isFile(),
      `${file}: broken local URL ${target}`,
    );
  }
}
assert(
  !/localhost|127\.0\.0\.1|\/preview\//.test(
    (await readFile("dist/rss.xml", "utf8")) +
      (await readFile("dist/sitemap-0.xml", "utf8")),
  ),
  "Non-public URLs found in feeds.",
);
console.log(
  `Verified ${files.length} build files: required routes, local links, metadata, and draft exclusion.`,
);
