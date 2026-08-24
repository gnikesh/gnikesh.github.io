# gnikesh.github.io

Personal website and blog of Nikesh Gyawali, built with [Astro](https://astro.build) and deployed to [GitHub Pages](https://pages.github.com).

## Tech stack

- **Astro** - static site generation
- **TypeScript** - typed content collections and data
- **Markdown** - blog posts via Astro content collections
- **CSS custom properties** - theming (light / dark, with `prefers-color-scheme` support)

## Project structure

```
.
├── .github/workflows/deploy.yml   # GitHub Pages deploy workflow
├── public/                        # static assets (images, files, favicon, robots.txt)
├── src/
│   ├── components/                # Astro components (Header, Footer, cards, ...)
│   ├── content/blog/              # blog posts in Markdown
│   ├── data/                      # site, navigation, projects, publications
│   ├── layouts/                   # BaseLayout, BlogPostLayout
│   ├── pages/                     # routes (/, /about, /projects, /blog/[...slug], ...)
│   ├── styles/                    # global, variables, markdown styles
│   └── utils/                     # date & reading-time helpers
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── ...
```

## Getting started

```bash
# install dependencies
npm install

# start the dev server at http://localhost:4321
npm run dev

# run the type/lint check
npm run check

# build the static site into dist/
npm run build

# preview the production build locally
npm run preview
```

## Writing a new blog post

Create a Markdown file in `src/content/blog/` with frontmatter:

```md
---
title: 'My new post'
description: 'A short summary shown on cards and in search results.'
pubDate: 2026-01-15
tags: ['Machine Learning']
draft: false
---

Post content in Markdown...
```

Post URLs follow the filename: `src/content/blog/my-new-post.md` becomes `/blog/my-new-post`.

## Deployment

Pushing to `main` triggers the `.github/workflows/deploy.yml` workflow, which builds the site and deploys `dist/` with the official `actions/deploy-pages` action.

**One-time setup in the repo settings (Settings > Pages):** under *Build and deployment*, set *Source* to **GitHub Actions**. No `CNAME` is configured, so the site is served at `https://gnikesh.github.io/`.

## License

MIT - see [LICENSE](LICENSE).
