# Zhixu Zhao

A small, static personal website based on [Astro Nano](https://github.com/markhorn-dev/astro-nano), adapted for `https://zhaozhixu.github.io/`.

The site keeps Nano’s narrow editorial layout, Inter/Lora typography, stone-colored light/dark palette, arrow cards, and three theme preferences. Its styles are expressed in ordinary CSS. Astro 7, TypeScript, and Markdown content collections provide the build; no client framework, CMS, analytics, or external font service is used.

## Local development

Use Node 24 (or a supported Node version >=22.12) and npm.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4321/`. The development server binds to loopback only.

```sh
npm run check       # Astro and TypeScript diagnostics
npm run build       # Check, build, verify routes/links/draft exclusion
npm run preview     # Serve the production build locally
npm test            # Isolated publication and bilingual-route regression checks
npm run release     # Run publishing tests, then check and build the release
```

The production build is `dist/`. Local draft previews exist only in the development server at `/preview/`; they do not exist in `dist/` or `npm run preview`.

## Structure

```text
src/
  data/                 Name, links, project descriptions
  components/           Navigation, cards, theme controls, writing lists
  layouts/              Shared metadata and article rendering
  content.config.ts     Validated writing schema
  content/writing/
    en/                 English Markdown
    zh/                 Chinese Markdown
  lib/writing.ts        Shared publication filter and stable URLs
  pages/                Home, projects, about, writing, Chinese routes, 404
  styles/global.css     Astro Nano adaptation
public/                 Favicon, OpenGraph artwork, approved article images
scripts/                Build and publishing checks
docs/sources.md         Evidence behind project copy
.github/workflows/      Manual GitHub Pages deployment
```

Change the public name and social links in `src/data/site.ts`, homepage copy in `src/pages/index.astro`, and project descriptions in `src/data/projects.ts`. If the name changes, update the OpenGraph artwork and its metadata too. The checked-in `og.png` is a raster export of the original `public/og.svg`. Approved article images live under `public/images/writing/`; private source archives remain outside the public repository.

## Writing and approval

Start an unapproved article at `src/content/writing/en/_draft-my-article.md` (or `zh/`). `_draft-*.md` is ignored by Git so unapproved prose stays out of the public source repository too. The private source archive must remain outside this repository.

```yaml
---
title: My article
description: A concise description.
slug: my-article
lang: en
draft: true
tags:
  - Systems
translationKey: optional-shared-key
---
```

Visit `/preview/` to review drafts. A draft does not need a publication date. `originalUrl`, `originalPublishedAt`, and `adaptedFrom` record an adaptation’s provenance. Article headers, writing lists, article metadata, and RSS use `originalPublishedAt` when available, falling back to `publishedAt`. The homepage, writing indexes, and RSS sort newest first by that same date. Draft previews also show the original date when supplied.

Local JPEG and PNG review copies can live in the ignored `.local/draft-media/` directory, using lowercase names with hyphens. Reference them as `/preview/media/<name>.jpg` or `/preview/media/<name>.png` from a Markdown HTML figure. They are served only by the development server and are never automatically copied into the production build. Keep unpublished media out of `public/`. Upon article approval, copy only its approved images into `public/images/writing/<slug>/` and replace the preview URLs in the article. Keep the original review copies in ignored local storage.

After the owner approves an article:

1. Rename the file to remove `_draft-`.
2. Set `draft: false` and set `publishedAt` to its actual site release date. Keep an adaptation’s original date in `originalPublishedAt`.
3. Run `npm run build` and review the generated page, metadata, and RSS.
4. Review `git status` before committing. Publication to GitHub is a separate approval step.

Published entries without `publishedAt` fail validation, even if they have an original date. Entries with a future `publishedAt` remain hidden until a build on or after that date. Drafts are excluded by the same shared filter from the homepage, indexes, public routes, translations, RSS, and sitemap. Development preview routes generate no production paths. Production output is scanned for local draft slugs and representative prose.

Give both translations the same `translationKey`. They may share a slug because IDs include the language. The language switch appears only when both articles are published. There is no promise that every page will be translated.

## First-launch state

The repository was public and empty when rechecked on 2026-10-14 (no remote branches). The local branch is `feat/astronano-homepage`, with no pre-existing commit and no configured remote. The unauthenticated Pages endpoint returned 404; authenticated Pages settings could not be verified. No push, Pages settings change, or deployment was performed.

The first-release project selection is LightNet. Home, About, Projects, Chinese pages, metadata, and public source notes include only approved project details. Editor backups and undo history are ignored alongside local drafts and review media.

The owner approved **Emacs Is My AI Coding Workbench** and its eight figures for the first release on 2026-10-14. Its source is `src/content/writing/en/emacs-is-my-ai-coding-workbench.md`, with `draft: false` and `publishedAt: 2026-10-14`. The article appears at `/writing/emacs-is-my-ai-coding-workbench/`, on Home and Writing, and in RSS and the sitemap. Its eight approved images are in `public/images/writing/emacs-is-my-ai-coding-workbench/`; seven are watermark-cleaned PNGs and five include English-localized text. Original images, the pre-publication draft, editor backups, and editorial notes remain ignored. The author-approved body is unchanged apart from image URLs. If the first public launch moves to a later date, set `publishedAt` to that actual launch date before deploying.

## GitHub Pages

The workflow follows the [official Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) with `withastro/action@v6`, Node 24, and the npm lockfile. It runs **only on manual dispatch**; pushing alone does not deploy. Its build command is `npm run release`, so publishing regression tests, Astro/TypeScript checks, and output verification must pass before an artifact is uploaded.

After approval of the site copy and public source files:

1. Review the staged file list; keep original sources, transcripts, local drafts, and editorial notes excluded.
2. Create the initial commit and push an agreed initial default branch to `zhaozhixu/zhaozhixu.github.io`. The empty remote needs an initial branch before a conventional pull request can exist. Do not force-push.
3. In repository Settings → Pages, select GitHub Actions as the source.
4. Manually run “Deploy to GitHub Pages” from Actions on the approved branch.

Reproduce the release locally with `npm ci`, `npm run release`, and `npm run preview`. Review the production preview, which serves exactly the generated public files in `dist/`.

The `site` value is the user-site root. Do not add a `/zhaozhixu.github.io` base path. The workflow deploys only `dist/`, after the checks in `npm run build` pass.

## Attribution

Astro Nano by Mark Horn, upstream commit `66aa017d614828ba5dba02a9e51a1a714850ad31`, is MIT-licensed; the original notice is retained in `LICENSE`. The layout and components are adapted from that theme. Inter and Lora are self-hosted through their Fontsource packages with their bundled license notices. Original site writing is not automatically licensed by the theme’s software license.
