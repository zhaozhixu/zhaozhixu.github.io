import type { APIRoute, GetStaticPaths } from "astro";
import { readdir, readFile } from "node:fs/promises";
import { resolve, join } from "node:path";

// Local review copies never enter public/ or the bundler's asset graph.
const directory = resolve(".local/draft-media");

export const mediaPaths = (extension: "jpg" | "png"): GetStaticPaths => async () => {
  if (!import.meta.env.DEV) return [];
  const files = await readdir(directory).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  return files
    .filter((name) => /^[a-z0-9-]+\.(jpg|png)$/.test(name) && name.endsWith(`.${extension}`))
    .map((name) => ({
      params: { asset: name.slice(0, -4) },
      props: { name },
    }));
};

export const serveMedia: APIRoute = async ({ props }) => {
  if (!import.meta.env.DEV) return new Response(null, { status: 404 });
  const bytes = await readFile(join(directory, props.name));
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": props.name.endsWith(".png") ? "image/png" : "image/jpeg",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
