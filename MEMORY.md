# Project memory

## Product direction

- GNIKESH is a personal AI workspace; the user wants inline homepage chat with site-grounded answers and no preview/demo labels.
- Keep provider credentials on the private backend; the public site remains a static Astro application.
- OpenRouter selects approved answer IDs instead of drafting prose; the server returns authored site text and canonical links to prevent invented facts and unrelated answers.
- The user approved an editorial refresh (2026-10-03): warm paper light theme (`#f5f3ee` background, `#1d5a43` forest accent) and near-black/mint dark theme (`#0f1110` background, `#8fd4b6` accent), Newsreader serif headings, Inter body, IBM Plex Mono labels. Preserve the canonical `--color-*` values, derive extra state colors from them, and keep text at 4.5:1 or better (small gray text is the weak spot).
- Fonts are self-hosted through the Astro Fonts API (`fonts` in `astro.config.mjs`, `<Font>` in `BaseLayout.astro`); do not reintroduce Google Fonts imports.

## Chat backend

- Use early Vite middleware and the shared bounded Node handler for local chat; Astro's endpoint layer buffers bodies before route-level origin and size checks.

## Styling gotchas

- In Astro components, wrap the document-level `[data-theme]` ancestor in `:global(...)`; scoped selectors otherwise fail to match dark-mode icons and state styles.

## Content dates

- Frontmatter `pubDate` values are calendar dates at UTC midnight; format them in UTC to avoid displaying the previous day when builds run in America/Chicago.

## Contact flow

- Restore the submit button in `finally` even when the form is hidden after success; otherwise “Send another message” leaves submission disabled.

## Mouse-following portrait

- The user rejected a 3D Pixar-style bust as weird and chose a professional 2D anime bust with a closed-mouth smile (no teeth); keep that direction for portrait updates.
- `HeadFollow` frames are produced outside the repo in `~/projects/headturn` (a comfy project): Qwen-Image-Edit 2511 still, MiniMax H3 first/last-frame head circle, BiRefNet matting, then `tools/pose.py` and `tools/build_frames.py` pick 96 frames evenly by measured head angle and write `sheet.webp`, `still.webp` and `meta.json`; copy the `meta.json` geometry into `src/data/head-follow.ts`.
- Visitors' cursors sit below the hero most of the time, so the downward poses matter most. A smiling squint in the source portrait makes the anime eyes close whenever the head looks down (reads sleepy or smug); the user approved a relaxed, slightly more open-eyed portrait (`portrait_open.png`) to fix it.
- Keep the still/loop switch near-instant; a slow cross-fade between two head poses reads as a double exposure.

## Dev server

- Vite can keep injecting a stale page `<style>` module after edits; if a new rule is missing in the browser, touch the file and reload.
