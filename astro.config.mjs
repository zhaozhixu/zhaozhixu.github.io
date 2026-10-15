import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://zhaozhixu.github.io",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith("/preview/"),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
  devToolbar: { enabled: false },
});
