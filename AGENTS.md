# Working on this site

- This is Zhixu Zhao’s personal website, using an Astro Nano adaptation. Keep its narrow layout, restrained colors, typography, semantic HTML, visible keyboard focus, and accessible light/dark/system themes.
- Use Astro, TypeScript, ordinary Markdown, and simple CSS. Avoid adding a client framework or dependencies without a concrete need.
- Scope changes to this repository. Do not modify other projects or private source archives as part of site work.
- Only owner-approved projects belong in public pages, metadata, or repository documentation. Keep unreleased project names and details in ignored local notes until the owner explicitly authorizes disclosure.
- Verify capability claims against current public source and tests, and record primary-source links in `docs/sources.md`. A status report is an environment-specific observation, not a guarantee. Never present planned functionality as implemented.
- Keep unapproved writing in `_draft-*.md` with `draft: true`. It is deliberately ignored by Git. Keep the original Chinese archive outside this repository. Owner-authorized media review copies belong in ignored `.local/draft-media/`, served only through the development-only `/preview/media/` route. Never publish a private archive, session transcript, credentials, personal email, or private life details.
- The first English article is an adaptation of the existing Emacs/agent-shell essay. Read its complete supplied source before changing the argument. Distinguish personal extensions from upstream behavior and proposed integrations.
- Require an actual `publishedAt` only for published entries; keep original publication dates in `originalPublishedAt`. Stable slugs are hand-authored. All public article consumers must use `publishedWriting()`.
- Preview routes are development-only and must never appear in production output, RSS, or sitemap. Do not add a build flag that can expose drafts.
- After relevant implementation changes, run `npm run build`. For publication logic, run `npm test`; its fixtures use a temporary directory. Inspect desktop/mobile rendering for layout changes. Do not broaden tests without a relevant concern.
- Preserve the Astro Nano license and attribution. Supplied article media is not automatically cleared for publication.
- Public pushes, Pages settings, deployment, and article publication need the owner’s authorization. The manual workflow is intentional. Complete local implementation and checks before seeking launch approval. Do not force-push.

## Author's translation and editing preferences

- Preserve the original's voice, wording, emotional force, enthusiasm, conviction, metaphors, and emphasis. Natural English should carry the same passion as the Chinese source, including strong conclusions.
- Treat the latest author-edited draft as the starting point. For a copyedit, fix typos, grammar, idiom, awkward phrasing, and flow while preserving the author's argument, personal experience, and degree of certainty.
- Do not turn passionate writing into a cautious, neutral technical report. Do not add hedges, disclaimers, or caveats merely to soften the author's voice, or restore qualifications the author deliberately removed.
- Keep factual verification separate from language editing. If a substantive concern arises, record it separately rather than silently weakening or changing the author's claims. Do not invent claims or amplify certainty beyond the source.
- Use Lark consistently in English prose and captions. The owner requested English translations of Chinese screenshot text; preserve the original image copies.
