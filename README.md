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

## Nikesh AI

The homepage chat answers questions about Nikesh's background, research, projects,
published articles, and website. Its approved answer catalog is built from
`src/data/chat.ts`, project data, and published blog entries.

During local development, Astro serves a private `/api/chat` endpoint. Put
`OPENROUTER_API_KEY` in `.env` and run `npm run dev`. Common, exact questions and
supported follow-ups use prepared answers. Unfamiliar wording uses OpenRouter
with `google/gemini-2.5-flash-lite`, configurable through `OPENROUTER_MODEL`.

The model selects a catalog ID and whether to show its overview or additional
detail. It never writes the displayed answer. The server accepts only valid IDs,
returns the authored text and canonical source links, and refuses unrelated or
unsupported questions. Arbitrary model text, extra fields, invented links, and
client-supplied assistant history cannot introduce new facts into responses.
Questions and provider responses are bounded, cancelled requests stop upstream
work, and provider errors never expose credentials or upstream response bodies.
Both local and standalone APIs limit valid requests to 20 per visitor per minute;
rejected requests do not consume that budget.

The key is read only by server code from private environment variables. Never
prefix credentials with `PUBLIC_`. `.env` files are ignored by Git.

Replies use a short thinking indicator and a progressive text reveal. Reduced
motion skips the presentation delay and animation; screen readers announce the
completed response once.

Edit `src/data/chat.ts` for prepared answers and aliases. Projects live in
`src/data/projects.ts`; each project generates its own `/projects/[slug]` page.
Blog topics are derived in `src/lib/blog.ts` without changing existing article URLs.

Run `npm test` for answer matching, backend boundaries, and date checks; run
`npm run check` for Astro/TypeScript.

### Production chat backend

The website remains static on GitHub Pages. GitHub Pages cannot execute the
private chat backend, so the development API is excluded from static builds.
A small standalone Node backend is provided for deployment on a Node host:

```bash
npm run build
npm run chat:serve
```

The backend uses `dist/chat-knowledge.json`, the public answer catalog produced
by the site build. Rebuild and restart it when site content changes. It runs on
`127.0.0.1:8787` by default. Set `CHAT_HOST=0.0.0.0` and `PORT` as required by your
host, and set `OPENROUTER_API_KEY` as a private runtime secret. `CHAT_ALLOWED_ORIGINS`
is a comma-separated list of allowed website origins. The standalone server
bounds requests and applies a limit of 20 POST requests per connecting address
per minute. Behind a proxy that appends verified `X-Forwarded-For` addresses, set
`CHAT_TRUSTED_PROXY_IPS` to its exact connecting addresses so visitors receive
independent quotas; forwarded addresses from other callers are ignored.
Use Node 22.18 or newer.

Set `PUBLIC_CHAT_ENDPOINT` in the website's build environment to the deployed
backend's `/api/chat` URL. This URL is public; the key remains on the backend.
Without a production endpoint, the static site answers only approved exact
questions and follow-ups; other questions receive a scoped refusal.

The browser sends a JSON POST:

```json
{ "messages": [{ "role": "user", "content": "Tell me about FunDLM" }] }
```

The backend should return JSON:

```json
{
  "reply": "An approved answer from the website",
  "sources": [{ "title": "Explore research", "url": "/research" }]
}
```

The client sends the latest 12 messages,
times out after 30 seconds, and supports retry and clearing the conversation.
When a configured backend fails, the interface displays an error and preserves the
question for retry.

Review new edits locally with `npm run dev` at `http://localhost:4321`; no GitHub
push is needed. The production build can be reviewed with `npm run build` followed
by `npm run preview`.
Production deployment remains tied to `main`.

## Deployment

Pushing to `main` triggers the `.github/workflows/deploy.yml` workflow, which builds the site and deploys `dist/` with the official `actions/deploy-pages` action.

**One-time setup in the repo settings (Settings > Pages):** under _Build and deployment_, set _Source_ to **GitHub Actions**. No `CNAME` is configured, so the site is served at `https://gnikesh.github.io/`.

## License

MIT - see [LICENSE](LICENSE).
