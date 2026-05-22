# NOWAY

Personal portfolio site.

Built with [Astro](https://astro.build) — self-hosted as a static site.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:4321/

## Build for deployment

```sh
npm run build
```

Output is a fully static site in `dist/`. Serve that directory with any static web server (nginx, Caddy, Apache, or a simple Node static server).

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

Rebuild (`npm run build`) and redeploy `dist/` → new project appears at `/projects/<slug>/`.

## Project docs

- Design spec: `docs/superpowers/specs/2026-05-20-noway-portfolio-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-20-noway-portfolio-v1-implementation.md`
