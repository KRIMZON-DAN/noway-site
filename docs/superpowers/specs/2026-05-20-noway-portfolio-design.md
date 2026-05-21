# NOWAY Portfolio Site — Design Spec

**Date:** 2026-05-20
**Status:** Design approved, awaiting implementation plan
**Owner:** noway (Daniel)
**Project location:** `E:\Claude Stuff\noway-site\`

---

## 1. Overview

A personal portfolio website for the handle **NOWAY**, intended to support job applications in the creative-tech space (junior frontend, technical artist, VRChat-creator-economy, indie game dev, music-tech). Site launches as a bio card (v1) and grows into a project showcase (v2) as the owner builds work to display.

### Goals

- Ship a polished, distinctive web presence the owner can link from job applications
- Demonstrate web development capability through the site itself (the site IS a portfolio piece)
- Provide a content structure that makes adding future projects mechanical, not creative work
- Establish the NOWAY brand identity with a strong, audience-appropriate visual language

### Non-goals (out of scope)

- Contact form, comment system, or any backend (static site only)
- Authentication, user accounts, or dynamic content
- E-commerce, payment integration
- Multi-language support
- Heavy CMS — markdown files are the content system

---

## 2. Strategy & positioning

### Audience target

**Primary:** creative tech employers and communities — VRChat creator economy (Booth.pm sellers, avatar artists), indie game studios (especially horror/occult/dark fantasy), music tech / creator-economy startups, demoscene / creative coding circles, underground web agencies, junior frontend roles with design-forward employers.

**Explicitly out of audience:** traditional corporate IT support, FAANG-adjacent companies, banks/healthcare/government tech, "professional services" consulting firms, conservative hiring managers. The aesthetic commitments rule these out, by design.

### Handle / brand

**NOWAY** (all caps). Distinct identity from the owner's existing KRIMZON shader brand. Clean break — different color story and visual language.

### Aesthetic commitment

Full ghostemane / trash-gang influence. Reference image: Ghostemane "BLACKMAGE" album cover (distressed metal-band wordmark, heavy chromatic-fringing-like glow effects, black/red/grey palette, film-grain texture). Aesthetic carries through entire site, not just logo.

---

## 3. v1 scope — bio card

A single-page website at `noway.vercel.app` (custom domain deferred), four stacked sections, no nav, no project section yet.

```
┌──────────────────────────────────┐
│  HERO       NOWAY                │  ← big stylized handle + tagline
│             "creative tech"      │
├──────────────────────────────────┤
│  ABOUT      short paragraph      │  ← bio + "currently learning"
├──────────────────────────────────┤
│  LINKS      GitHub  X  Discord   │  ← icon row of socials
│             YouTube  Bluesky     │
├──────────────────────────────────┤
│  FOOTER     sigil / © NOWAY      │
└──────────────────────────────────┘
```

---

## 4. Growth plan

### v2 — projects gallery (triggered when 2+ real projects exist)

- New `/projects` route shows project gallery (card grid)
- Each project gets `/projects/[slug]/` detail page
- Homepage Links section gains a "projects →" entry
- No homepage restructure required

### v3 — optional, opportunistic

- `/blog` page for devlogs about projects
- `/uses` page (popular dev portfolio convention listing gear/software)

### Custom domain — triggered when v1 is ready to use in actual job applications

- Buy `noway.lol` (or fallback) at Namecheap/Porkbun
- Point at Vercel via DNS
- ~10 minutes of configuration

---

## 5. Site structure & architecture

### Tech stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Astro** | Beginner-friendly (HTML-like syntax), modern enough to signal current dev skill, designed for content-driven sites, easy v2 growth path via content collections |
| Styling | **Plain CSS** with custom properties (CSS variables) | Aligned with Astro's "use the platform" ethos; no Tailwind because the bespoke aesthetic doesn't benefit from utility classes |
| Hosting | **Vercel** | Best Astro support, free tier, automatic preview deploys for branches, custom domain free |
| Source control | **GitHub** (public repo `noway-site`) | Standard; public so recruiters can browse code |

### Folder structure (v1)

```
noway-site/
├── src/
│   ├── pages/
│   │   └── index.astro              ← the homepage
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Socials.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro         ← shared shell (head, fonts, grain overlay)
│   ├── styles/
│   │   └── global.css               ← design tokens + base styles
│   └── content/
│       └── projects/                ← empty in v1, ready for v2 markdown files
├── public/
│   ├── favicon.svg                  ← tab icon
│   └── og-image.png                 ← link preview image for socials
├── docs/superpowers/specs/          ← this spec lives here
├── astro.config.mjs                 ← Astro settings
├── package.json                     ← project metadata + dependencies
└── README.md                        ← 8-line minimal README
```

### README content (minimal)

```markdown
# NOWAY

Personal site → [noway.vercel.app](https://noway.vercel.app)

Built with [Astro](https://astro.build) · deployed on [Vercel](https://vercel.com).

## Run locally

```sh
npm install
npm run dev
```
```

---

## 6. Visual design — "BLACKMAGE" mood

### Color palette

| Token | Hex | Use |
|-------|-----|-----|
| Background | `#000000` | Page base |
| Primary text | `#ffffff` | Body, links default |
| Dim text | `#888888` | Secondary, captions |
| Very dim | `#444444` | Borders, dividers |
| Accent red | `#dc1414` | Wordmark bleed/glow, hover states, key splashes |

Defined in `global.css` as CSS custom properties for one-line theme changes.

### Typography

| Use | Font | Source |
|-----|------|--------|
| Wordmark "NOWAY" | Distressed metal-band style display font | Free font from dafont/fontspace (candidates: MetalLord, Misfits, BloodLust) — start with free, possibly commission custom logo later |
| Body text, links, captions | **JetBrains Mono** | Free, Google Fonts |
| Section headers (optional) | Distressed display font, sized smaller than wordmark | Same as wordmark |

### Wordmark treatment

**Treatment B — Red bleed/glow:** NOWAY rendered in white, with heavy red `#dc1414` blur/glow underneath (resembles blood seeping through or hot metal). NO RGB-split chromatic aberration. Hover triggers more intense glow.

CSS approach: `text-shadow` with multiple stacked red glows at increasing blur radii, plus `filter: drop-shadow()` for additional bleed.

### Texture & atmosphere

- **Film grain overlay**: SVG noise filter applied across entire page (CSS-only, no images). Subtle animation (drifts slowly).
- **Vignette**: dark gradient at page edges.
- **Optional scanlines**: CRT-style horizontal lines as a toggleable overlay (defer to implementation).

### Decorative elements

- Small triangle/sigil SVG used as section divider or footer mark, echoing the BLACKMAGE triangle motif.
- Section breaks may use distressed horizontal lines or ASCII-style breaks.

### Iconography

Social links use SVGs from **Simple Icons** (simpleicons.org) — these are the official, license-free brand-logo SVGs for GitHub, X, Discord, YouTube, Bluesky, etc. Icons are styled monochrome white at rest, glow red on hover.

Non-brand decorative elements (sigil, dividers) are custom hand-authored SVGs created during Milestone 4.

### Motion

- **Page load**: grain animates in, then NOWAY wordmark assembles with brief glow flicker.
- **Hover on links**: red glow intensifies, slight scale, slow timing (NOT bouncy).
- **Idle**: subtle grain drift, optional sigil pulse.
- **Easing**: slow, deliberate — never elastic, bouncy, or playful.

### Cursor (optional)

Custom crosshair or sigil SVG cursor. Toggleable in case of accessibility/usability complaints. Decision deferred to implementation polish phase.

---

## 7. Content model (for v2 projects)

### File structure per project

```
src/content/projects/[slug]/
├── index.md           ← writeup with frontmatter
├── cover.png          ← gallery thumbnail
├── screenshot-1.png   ← optional additional images
└── screenshot-2.png
```

Folder name = URL slug. So `discord-rpc/` produces `/projects/discord-rpc/`.

### Frontmatter schema

```yaml
---
title: "Project Title"                       # required, string
description: "One-line shown on the card"    # required, string
tags: ["Python", "Discord API", "asyncio"]   # required, string[]
cover: "./cover.png"                         # required, image path
gallery:                                     # optional, image[]
  - "./screenshot-1.png"
  - "./screenshot-2.png"
liveUrl: null                                # optional, string|null
repoUrl: "https://github.com/noway/..."      # optional, string|null
videoUrl: null                               # optional, string|null (YouTube/Vimeo embed)
date: 2025-01-15                             # required, YYYY-MM-DD
status: "live"                               # required, enum: "live" | "wip" | "dead"
featured: true                               # optional, boolean (default false)
---

Body markdown content here…
```

### Validation

Astro content collections + Zod schema. Frontmatter typos or missing required fields fail the build with a clear error message.

### Auto-generated routes

| URL | Renders |
|-----|---------|
| `/projects/` | Gallery grid: cover + title + description + tag pills per card |
| `/projects/[slug]/` | Detail page: hero image/video + tags + live/repo/video links + image gallery + full markdown body |

### `featured: true` behavior

Featured projects appear **in addition to** the `/projects` gallery — they surface on the homepage Hero/Links area as well. Non-featured projects only live on the gallery page.

### `status` visual treatment

- `live` — full styling, default look
- `wip` — subtle indicator (e.g., "WIP" label, slightly different glow)
- `dead` — dimmed/desaturated card, "archived" label

---

## 8. Hosting & infrastructure

### Source control

- **GitHub repo:** `noway-site` (public)
- Standard `main` branch deploy workflow

### Hosting

- **Vercel**, free tier
- Connected to the GitHub repo
- Auto-deploys on push to `main`
- Branch pushes generate preview URLs (`noway-git-[branch].vercel.app`)

### Initial URL

`noway.vercel.app` (or fallback if taken). Free, no setup beyond Vercel account creation.

### Custom domain (deferred to "before first job-app use")

- **Primary candidate:** `noway.lol` (~$5/yr, matches the akryst.lol reference, aesthetic-coded)
- **Fallbacks if taken:** `n0way.lol`, `noway.dev`, `0xnoway.com`
- DNS pointed at Vercel; configured via Vercel dashboard

### Deploy workflow (after setup)

```
Edit file locally
  ↓
git add .  →  git commit -m "..."  →  git push
  ↓
Vercel builds + deploys in ~30 sec
  ↓
Refresh browser, change is live
```

---

## 9. Build order

### Milestone 1 — Setup & "blank site live" ✅ Review checkpoint

1. Install Git, Node.js LTS, VS Code (Windows installers)
2. Create GitHub account (if needed) + Vercel account (sign in with GitHub)
3. Create empty `noway-site` public repo on GitHub
4. Clone locally to `E:\Claude Stuff\noway-site\`, run `npm create astro@latest`, push initial commit
5. Connect repo to Vercel, get blank Astro starter live at `noway.vercel.app`

**Estimated:** 1-2 hours

### Milestone 2 — Base layout, design tokens, HERO ✅ Review checkpoint

6. Build `BaseLayout.astro` (HTML shell, font loading, grain overlay)
7. Define design tokens in `global.css` (colors, fonts, motion timings as CSS custom properties)
8. Source and load the distressed metal-band display font
9. Build `Hero.astro`: NOWAY wordmark with Treatment B red bleed/glow
10. Implement page-load motion: grain fade-in, wordmark assemble

**Key checkpoint:** confirm aesthetic actually lands before scaling effort. Iterate here.

**Estimated:** 2-3 hours over 1-2 sessions

### Milestone 3 — Remaining sections

11. `About.astro` (short paragraph, mono body)
12. `Socials.astro` (link row with icons, red hover glow)
13. `Footer.astro` (sigil SVG + © line)
14. Wire all sections into `index.astro`

**Estimated:** 1-2 hours

### Milestone 4 — Polish pass ✅ Review checkpoint

15. Consistent hover states across all interactive elements
16. Subtle idle animations (grain drift, optional sigil pulse)
17. Optional custom cursor with toggle
18. Responsive behavior (mobile, tablet)
19. Performance check (Lighthouse score)
20. SEO basics (title, meta description, og-image)

**Estimated:** 1-2 hours

### Milestone 5 — v2 scaffolding (no UI yet)

21. Create `src/content/projects/` with config + Zod schema
22. `.gitkeep` so empty folder commits
23. Update README with "how to add a project" workflow

**Estimated:** 30 minutes

### After v1 ships

| Trigger | Action |
|---------|--------|
| First real project worth showing exists | Write markdown file, push — `/projects` page auto-appears |
| Ready to use site in job applications | Buy `noway.lol`, point DNS at Vercel |
| 3+ projects exist | Consider v3 (blog or uses page) |

**Total v1 estimate:** 6-10 hours of working time over 4-6 sessions. About a week of casual evenings, or a focused weekend.

---

## 10. Workflow — who does what

| Task | Owner |
|------|-------|
| Write Astro/CSS/JS code | Claude (types; user reads & approves) |
| Decide what looks "right" aesthetically | User (taste decisions) |
| Test in browser, report issues | User |
| Install software, create accounts | User (Claude provides exact instructions) |
| Run terminal commands (`git`, `npm`) | User (Claude provides exact commands) |
| Architecture decisions | Together (Claude proposes, user decides) |
| Deploy / push to GitHub | User (with Claude's guidance the first few times) |

---

## 11. Open questions (deferred to implementation)

These are decisions that don't need answering until we hit them:

1. **Exact display font** — try several free metal-band fonts, pick whichever reads best at the NOWAY wordmark scale
2. **Exact tagline copy** — "creative tech" is the placeholder; final wording can be iterated in implementation
3. **About paragraph copy** — needs to be written by user during Milestone 3
4. **Social links to include** — at minimum GitHub; others (X, Discord, YouTube, Bluesky) depend on which accounts user actually uses
5. **Sigil/triangle SVG design** — simple geometric vector, designed during Milestone 4 polish
6. **Custom cursor decision** — keep or skip; decide during Milestone 4
7. **Scanline overlay** — include or skip; decide during Milestone 4 based on whether grain alone feels sufficient

---

## 12. Success criteria

v1 ships successfully when all of the following are true:

- [ ] Site is live at `noway.vercel.app`
- [ ] Repo `noway-site` exists on GitHub, public, with at least one polished commit history
- [ ] All four homepage sections (Hero, About, Socials, Footer) are present and styled per BLACKMAGE mood
- [ ] Site renders correctly on desktop and mobile
- [ ] Lighthouse Performance score ≥ 90
- [ ] No console errors in browser devtools
- [ ] User has confirmed the aesthetic feels right
- [ ] Content collections scaffold for `src/content/projects/` exists and is documented in README
- [ ] User can confidently `git push` and see deploy land on Vercel
