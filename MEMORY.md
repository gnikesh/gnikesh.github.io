# Project memory

## Product direction

- GNIKESH is a personal AI workspace; the user wants inline homepage chat with prepared, site-grounded answers and no preview/demo labels until they supply a live LLM endpoint.
- Keep provider credentials on the future backend; the public site remains a static Astro application.

## Styling gotchas

- In Astro components, wrap the document-level `[data-theme]` ancestor in `:global(...)`; scoped selectors otherwise fail to match dark-mode icons and state styles.

## Content dates

- Frontmatter `pubDate` values are calendar dates at UTC midnight; format them in UTC to avoid displaying the previous day when builds run in America/Chicago.
