# Verification

## Emacs article included in the first release — 2026-10-14

Following the owner's explicit approval, `emacs-is-my-ai-coding-workbench.md` is published content with a 2026-10-14 English publication date. Its eight referenced figures are included under `public/images/writing/emacs-is-my-ai-coding-workbench/`. The pre-publication Markdown and original review media remain in ignored local storage. A comparison with the approved draft confirmed the body is unchanged except for image URLs.

`npm run release` passed: publication regression tests, 32 Astro/TypeScript files with zero diagnostics, eight generated HTML pages, and 32 verified output files. The article appears on Home and Writing, in the single-item RSS feed, and in the sitemap. Its canonical URL and publication metadata point to the public article path. It has no draft notice or noindex tag. All eight image URLs return 200 with the correct MIME type and bytes identical to the approved copies. Development preview paths still return 404 in production. Scans of Git-eligible source files and textual build assets found no withheld project references.

Browser review verified the homepage article link, the desktop left-side ToC and its sticky positioning, section navigation, a rendered release image, the mobile contents menu, and mobile image sizing with no horizontal page overflow. The desktop viewport was restored. The first-release build includes the essay and figures; no public push or deployment has occurred.

## First-release preparation — 2026-10-14

The first release lists LightNet as the only public project. Unapproved project names, descriptions, links, and metadata have been removed from all site pages and public repository notes. A scan of all 48 Git-eligible source files and the generated textual assets found no remaining references. Earlier project notes are preserved only in ignored local storage. Editor backup, autosave, lock, and undo files are now ignored so they cannot expose unpublished article text in the public source repository.

`npm run release` runs publication regression tests followed by Astro checks, the static build, and output verification. The manual Pages workflow now uses this same command. Publication fixtures are isolated from real articles, so adding the first approved essay will not invalidate fixture counts.

- `npm run release`: passed; 32 checked files, zero diagnostics, seven static HTML pages, 23 output files.
- `npm audit --omit=dev --audit-level=moderate`: zero vulnerabilities reported.
- Production preview: 18 HTTP route checks and nine internal anchors passed. Draft pages and review media return 404; RSS and sitemap contain only public routes.
- Browser review: desktop Home and Projects; 390px Home, About, and Chinese home. No horizontal page overflow. Dark theme persists across navigation; the original light preference and desktop viewport were restored.
- GitHub's public API reports the destination repository is public with no branches. The unauthenticated Pages endpoint returns 404; authenticated settings were not verified.

At this checkpoint, the production build was ready for a site-only first release, with the Emacs essay pending the owner's content selection. The subsequent approval and article inclusion are recorded above. Nothing had been committed, pushed, or deployed.

## Article contents navigation — 2026-10-14

Article pages now generate a table of contents from their rendered H2/H3 headings. It stays to the left of the centered article on screens at least 1280px wide, and becomes a native expandable menu above the article on smaller screens. The links work without JavaScript, the label follows the article language, and navigation is hidden when printing.

`npm run build` passed with no diagnostics and verified 23 public output files. Both menu variants link to all eight Emacs article sections. Browser checks covered the desktop sidebar, sticky positioning, anchor navigation, a 390px mobile viewport, keyboard activation, and the 1280px breakpoint. Neither checked viewport had horizontal overflow; the temporary viewport override was reset. Article prose and images were not changed by this layout update.

## Initial site verification

- `npm install`: completed; audit reported zero vulnerabilities at installation.
- `npm run build`: passed. Astro/TypeScript reported zero errors, warnings, or hints. Seven static HTML pages, RSS, sitemap, robots, favicon, and OpenGraph artwork emitted.
- `npm test`: passed with fixtures in a disposable directory. Both languages can use the same slug; translation links and RSS dates are correct; explicit/default drafts and future-dated entries are hidden; preview routes emit no production output; an undated published entry fails schema validation.
- The real Emacs adaptation remains an ignored local Markdown draft. Build scanning found no draft slug or representative draft prose in public output. Git ignore rules also cover the private source directory and agent transcripts.
- HTTP checks against the production preview returned 200 for the public routes and feeds, and 404 for the unpublished article, draft previews, and an unknown page.
- Internal assets/links and 15 internal anchors were checked successfully.
- Browser QA: desktop and a 390 × 844 mobile viewport; Home, Projects, About, Writing, Chinese pages, and the local article preview fit without horizontal page overflow. Long code blocks scroll inside their container.
- Light/dark controls work and persist across navigation. The system preference option follows `prefers-color-scheme`. Reduced-motion CSS disables entrance effects. The first keyboard Tab reveals “Skip to content”; Enter moves focus to the main region.
- Body and accent text color pairs meet 4.5:1 contrast in the checked light/dark combinations (lowest checked ratio 4.65:1). Semantic heading checks found one H1 per generated page. No browser console errors observed.
- External links were attempted. Several GitHub HTML requests returned temporary 503/504 responses, while the corresponding public source/API reads succeeded. Zhihu blocked automated requests with 403; those author-supplied URLs were retained. Full external-site availability is therefore not asserted.
- No source screenshots or media from the private bundle were copied. No commit, push, Pages settings change, or public deployment was performed.

## Review remaining

The owner should review the site copy and design before the initial public push/deployment. Article approval is separate; the English Emacs adaptation remains unpublished. Local editorial questions are in the ignored `editorial-review.local.md` file. The empty GitHub repository needs an initial default-branch commit before a normal PR workflow is possible; the authenticated Pages setting was not available to inspect.

## Image review update — 2026-10-09

The owner confirmed ownership and requested the original figures in the local Emacs draft. All eight images were restored, unchanged, with English alt text, captions, responsive sizing, and links to their full-size versions. Review copies are ignored under `.local/draft-media/` and served by a development-only endpoint; the original archive remains untouched.

`npm run build` and `npm test` passed (run sequentially). All eight image URLs returned 200 with bytes matching the review copies during development, and 404 from the production preview. A hash comparison confirmed none of the original image files occur in `dist/`. The regression fixture now covers draft media as well as prose. Desktop and mobile figures fit the article width with no horizontal page overflow; no browser console errors were observed. No publication or push was performed.

## Watermark cleanup update — 2026-10-09

At the owner's request, built-in image_gen removed “知乎 @Favoryoung” from the seven marked figures. The draft references separate cleaned PNGs; the original JPEGs and unchanged GNU illustration are preserved. Image dimensions in the draft match the generated files. The screenshots were reduced in intrinsic resolution by image generation, so the original files remain available for comparison. Prompts and output paths are recorded in ignored `.local/watermark-cleanup-prompts.json`.

The final `npm run build` and `npm test` passed sequentially with JPEG and PNG exclusion fixtures. All eight active image URLs return 200 with matching bytes and MIME types during development and 404 from production preview. No original or cleaned image bytes occur in `dist/`. Browser inspection confirmed the cleaned diagram and screenshots render in the essay without horizontal page overflow. The article remains a local draft.

## English image localization — 2026-10-09

The essay, captions, and alt text now use Lark consistently. Five screenshots containing Chinese text were localized into English with built-in image_gen: permissions, callback configuration, retries, formulas, and Markdown. The other figures needed no translation. Localized files use `-en.png` names; original and watermark-cleaned copies are preserved. The article explicitly identifies the screenshot text as translated. Prompts, source paths, and two targeted corrections are recorded in `.local/image-localization-prompts.json`.

Visual review checked the translations, callback identifier, retry counts and delays, equations, and code. A mistaken agent label in the first retry output was corrected to Codex, and an unreadable clipped Chinese fragment was cleared from the permission image. `npm run build` passed with no diagnostics and verified 23 public output files. All eight article images returned matching bytes in development and 404 from production preview; no original, cleaned, or localized media bytes occur in `dist/`. The browser showed the translated images within the article width, with no remaining Feishu wording or horizontal page overflow. No article publication or deployment was performed.
