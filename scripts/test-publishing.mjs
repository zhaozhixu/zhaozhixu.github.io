import {
  mkdtemp,
  cp,
  symlink,
  writeFile,
  readFile,
  rm,
  access,
  mkdir,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

// Exercise real static builds in a disposable directory, never the working content.
const root = resolve(".");
const scratch = await mkdtemp(join(tmpdir(), "zhixu-publishing-"));
const exists = async (path) =>
  access(path).then(
    () => true,
    () => false,
  );
const build = () =>
  execFileSync(
    process.execPath,
    [join(root, "node_modules/.bin/astro"), "build"],
    { cwd: scratch, encoding: "utf8", stdio: "pipe" },
  );
const fixture = (lang, slug, extra) =>
  `---\ntitle: Fixture ${lang} ${slug}\ndescription: Test fixture only\nslug: ${slug}\nlang: ${lang}\n${extra}\n---\nPublication fixture body.\n`;
try {
  for (const file of [
    "src",
    "public",
    "scripts",
    "package.json",
    "astro.config.mjs",
    "tsconfig.json",
  ])
    await cp(join(root, file), join(scratch, file), { recursive: true });
  await symlink(
    join(root, "node_modules"),
    join(scratch, "node_modules"),
    "dir",
  );
  const content = join(scratch, "src/content/writing");
  // Keep fixture counts independent of the site's real publication schedule.
  await rm(content, { recursive: true, force: true });
  await mkdir(join(content, "en"), { recursive: true });
  await mkdir(join(content, "zh"), { recursive: true });
  // Even when local draft media is present, no media route or bytes may ship.
  const media = join(scratch, ".local/draft-media");
  await mkdir(media, { recursive: true });
  await writeFile(join(media, "qa-private-image.jpg"), "private-image-fixture");
  await writeFile(join(media, "qa-private-image.png"), "private-png-fixture");
  const approved =
    "draft: false\npublishedAt: 2025-01-02\ntranslationKey: bilingual-fixture";
  await writeFile(
    join(content, "en/qa-public.md"),
    fixture("en", "qa-public", approved),
  );
  await writeFile(
    join(content, "zh/qa-public.md"),
    fixture("zh", "qa-public", approved),
  );
  await writeFile(
    join(content, "en/qa-draft.md"),
    fixture("en", "qa-private-sentinel", "draft: true") +
      '\n<img src="/preview/media/qa-private-image.jpg" alt="Local JPEG draft fixture" />\n' +
      '\n<img src="/preview/media/qa-private-image.png" alt="Local PNG draft fixture" />\n',
  );
  await writeFile(
    join(content, "zh/qa-default.md"),
    fixture("zh", "qa-default-draft", ""),
  );
  await writeFile(
    join(content, "en/qa-future.md"),
    fixture("en", "qa-future", "draft: false\npublishedAt: 2999-01-01"),
  );
  build();
  const output = join(scratch, "dist");
  const en = await readFile(
    join(output, "writing/qa-public/index.html"),
    "utf8",
  );
  const zh = await readFile(
    join(output, "zh/writing/qa-public/index.html"),
    "utf8",
  );
  assert(
    en.includes('hreflang="zh-CN"') && en.includes("/zh/writing/qa-public/"),
  );
  assert(zh.includes('hreflang="en"') && zh.includes('lang="zh-CN"'));
  assert(en.includes("2025-01-02T00:00:00.000Z"));
  const rss = await readFile(join(output, "rss.xml"), "utf8");
  assert.equal((rss.match(/<item>/g) || []).length, 2);
  assert(
    rss.includes("/writing/qa-public/") &&
      rss.includes("/zh/writing/qa-public/"),
  );
  const sitemap = await readFile(join(output, "sitemap-0.xml"), "utf8");
  for (const marker of [
    "qa-private-sentinel",
    "qa-default-draft",
    "qa-future",
    "/preview/",
  ]) {
    assert(!rss.includes(marker) && !sitemap.includes(marker));
  }
  for (const path of [
    "preview",
    "preview/media/qa-private-image.jpg",
    "preview/media/qa-private-image.png",
    "writing/qa-private-sentinel",
    "zh/writing/qa-default-draft",
    "writing/qa-future",
  ])
    assert(!(await exists(join(output, path))), `Unexpected route ${path}`);
  execFileSync(process.execPath, [join(scratch, "scripts/verify-build.mjs")], {
    cwd: scratch,
    stdio: "pipe",
  });
  await writeFile(
    join(content, "en/qa-invalid.md"),
    fixture("en", "qa-invalid", "draft: false"),
  );
  let invalidOutput = "";
  try {
    build();
  } catch (error) {
    invalidOutput = `${error.stdout ?? ""}${error.stderr ?? ""}`;
  }
  assert(
    invalidOutput.includes(
      "Published articles require their actual publication date.",
    ),
    "An undated published article must fail validation.",
  );
  console.log(
    "Publishing checks passed: bilingual routes, translation links, RSS dates, draft defaults, future-date exclusion, no preview output, required publication dates.",
  );
} finally {
  await rm(scratch, { recursive: true, force: true });
}
