# NOWAY

Personal site → [noway.vercel.app](https://noway.vercel.app)

Built with [Astro](https://astro.build) · deployed on [Vercel](https://vercel.com).

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:4321/

## Adding a project (v2 workflow)

Each project lives at `src/content/projects/<slug>/`:

```
src/content/projects/example-project/
├── index.md           # frontmatter + writeup
├── cover.png          # gallery thumbnail
└── screenshot-1.png   # optional additional images
```

Required frontmatter:

```yaml
---
title: "Project Title"
description: "One-line shown on the card"
tags: ["Tech", "Tag", "List"]
cover: "./cover.png"
date: 2026-01-15
status: "live"   # live | wip | dead
featured: false
---
```

Optional: `gallery`, `liveUrl`, `repoUrl`, `videoUrl`. See `src/content.config.ts` for the full schema.

Push to `main` → Vercel auto-deploys → new project appears at `/projects/<slug>/`.

## Project docs

- Design spec: `docs/superpowers/specs/2026-05-20-noway-portfolio-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-20-noway-portfolio-v1-implementation.md`
