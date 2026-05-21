# NOWAY Portfolio v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship v1 of the NOWAY portfolio site — a single-page bio card at `noway.vercel.app` with the BLACKMAGE aesthetic, and scaffold the project structure for v2 (projects gallery) to be added later by dropping in markdown files.

**Architecture:** Static site built with Astro 5+, plain CSS with custom-property design tokens, deployed via Vercel from a public GitHub repo. No backend, no database, no build complexity beyond `npm run build`. Visual identity carried by typography + texture (grain overlay, red bleed/glow on the wordmark, slow motion). Content collections folder pre-scaffolded but empty in v1.

**Tech Stack:**
- **Framework:** Astro 5
- **Styling:** Plain CSS (no Tailwind) using CSS custom properties
- **Display font:** Metal Mania (free, Google Fonts) — distressed metal-band style
- **Body font:** JetBrains Mono (free, Google Fonts)
- **Icons:** Simple Icons SVGs (license-free brand logos)
- **Source control:** Git + GitHub (public repo `noway-site`)
- **Hosting:** Vercel (free tier)
- **Local environment:** Windows + PowerShell + VS Code + Node.js LTS

**Project location:** `E:\Claude Stuff\noway-site\`

**Source spec:** `docs/superpowers/specs/2026-05-20-noway-portfolio-design.md`

---

## File Structure (target end-state after this plan)

```
noway-site/
├── docs/
│   └── superpowers/
│       ├── plans/    ← this file
│       └── specs/    ← design spec
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── About.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   └── Socials.astro
│   ├── content/
│   │   ├── config.ts            ← Zod schema for projects (v2 prep)
│   │   └── projects/
│   │       └── .gitkeep         ← empty in v1
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── .gitignore
├── astro.config.mjs
├── package.json
└── README.md
```

---

## Milestone 1 — Setup & "blank site live"

### Task 1: Install prerequisites on Windows

**Files:** None (one-time machine setup)

- [ ] **Step 1: Install Git for Windows**

If not already installed, download from https://git-scm.com/download/win and run the installer. Accept defaults except: select "Git from the command line and also from 3rd-party software" when asked.

Verify in PowerShell:
```powershell
git --version
```
Expected: `git version 2.x.x` or similar.

- [ ] **Step 2: Install Node.js LTS**

Download the **LTS** version from https://nodejs.org/ (NOT "Current") and run the installer. Accept defaults — npm is bundled.

Verify in PowerShell:
```powershell
node --version
npm --version
```
Expected: `v20.x.x` (or higher LTS) and `10.x.x` (or higher).

- [ ] **Step 3: Install VS Code**

If not already installed, download from https://code.visualstudio.com/ and run the installer. When asked, check "Add to PATH" so the `code` command works from PowerShell.

Verify:
```powershell
code --version
```
Expected: a version number.

- [ ] **Step 4: Install Astro VS Code extension**

In VS Code: extensions sidebar → search "Astro" → install the official one from "Astro Build."

---

### Task 2: Create GitHub repo

**Files:** None (web UI action)

- [ ] **Step 1: Sign in to GitHub**

Go to https://github.com/. If no account, sign up (free). Choose username — `noway` if available, otherwise an acceptable variant.

- [ ] **Step 2: Create new repo**

Click "+" top-right → "New repository":
- **Name:** `noway-site`
- **Description:** "Personal portfolio site — noway.vercel.app"
- **Visibility:** Public
- **Initialize this repository with:** leave all unchecked (no README, no .gitignore, no license — we'll handle these locally)
- Click "Create repository"

GitHub shows the empty-repo quick-start page. Keep this tab open — we need the repo URL in Task 4.

---

### Task 3: Initialize Astro project locally

**Files:** Creates the entire project skeleton

- [ ] **Step 1: Open PowerShell at the project location**

```powershell
cd 'E:\Claude Stuff\noway-site'
```

Verify the directory has the `docs` folder already (from spec/plan creation):
```powershell
ls
```
Expected: `docs` folder present.

- [ ] **Step 2: Initialize Astro into the existing folder**

```powershell
npm create astro@latest -- --template minimal --no-install --no-git .
```

When prompted "Directory not empty, continue?" answer **Yes**. Choose:
- Template: **minimal** (already specified by flag)
- Use TypeScript: **Yes**
- TypeScript strictness: **Strict**

Don't let it install dependencies yet, and don't let it init git — we already have a docs folder we want to preserve and we'll init git separately.

- [ ] **Step 3: Install dependencies**

```powershell
npm install
```

Expected: completes in 30-90 seconds, `node_modules/` folder appears.

- [ ] **Step 4: Verify Astro dev server starts**

```powershell
npm run dev
```

Expected output includes a line like `Local: http://localhost:4321/`. Open that URL in a browser — you should see the Astro minimal starter page. Then return to PowerShell and press `Ctrl+C` to stop the dev server.

---

### Task 4: Connect local project to GitHub

**Files:**
- Modify: `.gitignore` (Astro creates this; check it's reasonable)

- [ ] **Step 1: Initialize git in the project folder**

```powershell
git init -b main
```

Expected: `Initialized empty Git repository in E:/Claude Stuff/noway-site/.git/`

- [ ] **Step 2: Verify .gitignore exists and contains node_modules**

Open `.gitignore` in VS Code. Confirm it includes at minimum:
```
node_modules
.DS_Store
dist
.env
.env.production
```

If `node_modules` isn't listed, add it. Save.

- [ ] **Step 3: First commit**

```powershell
git add .
git commit -m "chore: scaffold Astro project + import design docs"
```

Expected: commit succeeds with many files added including the docs folder, src/, package.json, etc.

- [ ] **Step 4: Connect to the GitHub remote**

Copy the HTTPS URL from your GitHub repo page (format: `https://github.com/<username>/noway-site.git`).

```powershell
git remote add origin https://github.com/<username>/noway-site.git
git push -u origin main
```

Replace `<username>` with actual GitHub username. The first push will prompt for GitHub credentials — sign in via the browser popup if it appears.

Expected: push succeeds. Refresh the GitHub repo page in your browser — files should now be visible.

---

### Task 5: Deploy to Vercel

**Files:** None (web UI action)

- [ ] **Step 1: Sign in to Vercel with GitHub**

Go to https://vercel.com/. Click "Continue with GitHub" — authorize Vercel to read your repos.

- [ ] **Step 2: Import the noway-site repo**

Dashboard → "Add New..." → "Project" → find `noway-site` in the list → click "Import."

- [ ] **Step 3: Accept defaults and deploy**

Vercel auto-detects Astro. Don't change build settings. Click "Deploy."

Wait ~1 minute. Expected: green "Congratulations!" screen with a preview URL like `noway-site-<random>.vercel.app`.

- [ ] **Step 4: Configure the cleaner subdomain**

Project settings → "Domains" → add `noway.vercel.app` (or `noway-site.vercel.app` if the first is taken). Set it as primary.

Open the URL in a browser. Expected: Astro minimal starter page renders.

- [ ] **Step 5: Verify the auto-deploy pipeline**

Back in PowerShell, edit `src/pages/index.astro` and change any visible text (e.g., add `<p>deploy test</p>`). Save.

```powershell
git add src/pages/index.astro
git commit -m "test: verify auto-deploy pipeline"
git push
```

Watch the Vercel dashboard. A new deployment should start within ~10 seconds. When it finishes (~30 seconds), refresh `noway.vercel.app` — the new text should be visible.

Revert the test change:
```powershell
git revert HEAD --no-edit
git push
```

Milestone 1 complete: blank site live, deploy pipeline confirmed.

---

## Milestone 2 — Base layout, design tokens, HERO

### Task 6: Define design tokens in global.css

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create the styles folder and global.css**

```powershell
New-Item -ItemType Directory -Path 'src\styles' -Force | Out-Null
```

Then create `src/styles/global.css` with this exact content:

```css
/* ---------- Design Tokens (BLACKMAGE) ---------- */
:root {
  /* Color */
  --color-bg: #000000;
  --color-text: #ffffff;
  --color-text-dim: #888888;
  --color-text-very-dim: #444444;
  --color-accent: #dc1414;
  --color-accent-bleed: rgba(220, 20, 20, 0.55);

  /* Typography */
  --font-display: 'Metal Mania', system-ui, serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Sizing */
  --size-wordmark: clamp(4rem, 14vw, 10rem);
  --size-body: 1rem;
  --size-small: 0.875rem;

  /* Motion */
  --ease-slow: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-slow: 800ms;
  --duration-fast: 200ms;
}

/* ---------- Reset ---------- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: var(--size-body);
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-slow),
              text-shadow var(--duration-fast) var(--ease-slow);
}

a:hover {
  color: var(--color-accent);
  text-shadow: 0 0 12px var(--color-accent-bleed);
}

/* ---------- Grain overlay (applied via BaseLayout) ---------- */
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.18;
  mix-blend-mode: overlay;
}

/* ---------- Vignette ---------- */
.vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  background: radial-gradient(
    ellipse at center,
    transparent 40%,
    rgba(0, 0, 0, 0.9) 100%
  );
}

/* ---------- Layout helpers ---------- */
.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  gap: 3rem;
}
```

- [ ] **Step 2: Verify file saved**

```powershell
ls src\styles\
```
Expected: `global.css` present.

---

### Task 7: Set up BaseLayout with font loading + grain overlay

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create the layouts folder**

```powershell
New-Item -ItemType Directory -Path 'src\layouts' -Force | Out-Null
```

- [ ] **Step 2: Create BaseLayout.astro with this exact content:**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'NOWAY',
  description = 'NOWAY — creative tech',
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:type" content="website" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Metal+Mania&display=swap"
    />

    <title>{title}</title>
  </head>
  <body>
    <!-- Grain overlay -->
    <svg
      class="grain"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0.6 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>

    <!-- Vignette -->
    <div class="vignette" aria-hidden="true"></div>

    <main class="page">
      <slot />
    </main>
  </body>
</html>
```

- [ ] **Step 3: Update index.astro to use BaseLayout**

Replace the entire contents of `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout>
  <h1 style="font-family: var(--font-display); font-size: var(--size-wordmark);">
    NOWAY
  </h1>
</BaseLayout>
```

- [ ] **Step 4: Run dev server and verify**

```powershell
npm run dev
```

Open http://localhost:4321/ in browser. Expected:
- Black background
- "NOWAY" rendered in distressed Metal Mania font, very large, centered
- Subtle grain texture visible across the page
- Dark vignette around edges

If Metal Mania didn't load (fallback to serif), wait 5 seconds and hard-refresh (Ctrl+Shift+R) — Google Fonts can take a moment first load.

Stop dev server (Ctrl+C) when satisfied.

- [ ] **Step 5: Commit**

```powershell
git add src/
git commit -m "feat: add BaseLayout with design tokens and grain overlay"
git push
```

---

### Task 8: Build the Hero component with red bleed/glow

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create the components folder**

```powershell
New-Item -ItemType Directory -Path 'src\components' -Force | Out-Null
```

- [ ] **Step 2: Create `src/components/Hero.astro` with this exact content:**

```astro
---
// Hero — the NOWAY wordmark with Treatment B red bleed/glow
---

<section class="hero">
  <h1 class="wordmark">NOWAY</h1>
  <p class="tagline">creative tech</p>
</section>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  .wordmark {
    font-family: var(--font-display);
    font-size: var(--size-wordmark);
    line-height: 0.9;
    color: var(--color-text);
    letter-spacing: 0.02em;

    /* Treatment B: red bleed/glow stacked text-shadows */
    text-shadow:
      0 0 4px var(--color-accent-bleed),
      0 0 16px var(--color-accent-bleed),
      0 0 32px var(--color-accent),
      0 0 64px rgba(220, 20, 20, 0.35);

    transition: text-shadow var(--duration-slow) var(--ease-slow);

    /* Page-load assemble animation */
    animation: wordmark-in 1200ms var(--ease-slow) both;
  }

  .wordmark:hover {
    text-shadow:
      0 0 6px var(--color-accent),
      0 0 24px var(--color-accent),
      0 0 56px var(--color-accent),
      0 0 96px rgba(220, 20, 20, 0.55);
  }

  .tagline {
    font-family: var(--font-mono);
    font-size: var(--size-body);
    color: var(--color-text-dim);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    animation: tagline-in 1400ms var(--ease-slow) 400ms both;
  }

  @keyframes wordmark-in {
    from {
      opacity: 0;
      filter: blur(20px);
      transform: scale(1.05);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: scale(1);
    }
  }

  @keyframes tagline-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
```

- [ ] **Step 3: Wire Hero into index.astro**

Replace entire `src/pages/index.astro` contents with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
---

<BaseLayout>
  <Hero />
</BaseLayout>
```

- [ ] **Step 4: Verify in browser**

```powershell
npm run dev
```

Open http://localhost:4321/. Expected:
- Page loads with grain in, then NOWAY blurs in with red glow
- NOWAY wordmark in distressed Metal Mania font, huge
- Red bleed/glow visible underneath (multiple stacked shadows give a "hot iron" feel)
- "CREATIVE TECH" tagline below, in mono, dim grey, letter-spaced
- Hover over NOWAY: glow intensifies

Stop dev server when satisfied.

- [ ] **Step 5: Commit**

```powershell
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero component with red bleed/glow wordmark"
git push
```

**Review checkpoint:** wait for Vercel deploy (~30 sec), open `noway.vercel.app`, confirm hero looks correct in production. If anything's off (glow too much, font wrong, animation feels weird), iterate here before adding more sections.

---

## Milestone 3 — Remaining sections

### Task 9: Build the About component

**Files:**
- Create: `src/components/About.astro`

- [ ] **Step 1: Create `src/components/About.astro` with this exact content:**

```astro
---
// About — short bio paragraph
---

<section class="about">
  <p class="lead">
    creative tech · shader scribbler · learning out loud
  </p>
  <p class="status">
    <span class="status-label">&gt; status:</span>
    currently building things in public
  </p>
</section>

<style>
  .about {
    max-width: 36rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }

  .lead {
    font-family: var(--font-mono);
    font-size: var(--size-body);
    color: var(--color-text);
    letter-spacing: 0.05em;
  }

  .status {
    font-family: var(--font-mono);
    font-size: var(--size-small);
    color: var(--color-text-dim);
  }

  .status-label {
    color: var(--color-accent);
  }
</style>
```

- [ ] **Step 2: Wire into index.astro**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
---

<BaseLayout>
  <Hero />
  <About />
</BaseLayout>
```

- [ ] **Step 3: Verify in browser**

`npm run dev` → http://localhost:4321/. Expected: About section appears under Hero with two centered lines. The `> status:` prefix is red, the rest is dim white/grey.

- [ ] **Step 4: Commit**

```powershell
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add About component"
git push
```

---

### Task 10: Build the Socials component

**Files:**
- Create: `src/components/Socials.astro`

- [ ] **Step 1: Decide which social links to include**

Ask the user during implementation: which of these do they actually have/use? Default set: GitHub, X (Twitter), Discord. Optional adds: YouTube, Bluesky.

Get exact usernames/URLs from the user before writing the component.

- [ ] **Step 2: Create `src/components/Socials.astro` with this exact content:**

(Replace `YOUR_USERNAME` placeholders with actual values gathered in Step 1. The SVGs below are Simple Icons paths for each brand — used inline so no extra HTTP request.)

```astro
---
// Socials — link row with Simple Icons SVGs

const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/YOUR_USERNAME',
    svgPath:
      'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    name: 'X',
    url: 'https://x.com/YOUR_USERNAME',
    svgPath:
      'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    name: 'Discord',
    url: 'https://discord.com/users/YOUR_USER_ID',
    svgPath:
      'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z',
  },
];
---

<section class="socials" aria-label="Social links">
  <ul class="link-row">
    {
      links.map((link) => (
        <li>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            class="social-link"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={link.svgPath} />
            </svg>
          </a>
        </li>
      ))
    }
  </ul>
</section>

<style>
  .socials {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .link-row {
    display: flex;
    gap: 1.75rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text);
    width: 2.5rem;
    height: 2.5rem;
    transition:
      color var(--duration-fast) var(--ease-slow),
      filter var(--duration-fast) var(--ease-slow),
      transform var(--duration-fast) var(--ease-slow);
  }

  .social-link:hover {
    color: var(--color-accent);
    filter: drop-shadow(0 0 12px var(--color-accent));
    transform: scale(1.08);
    text-shadow: none;
  }
</style>
```

- [ ] **Step 3: Wire into index.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Socials from '../components/Socials.astro';
---

<BaseLayout>
  <Hero />
  <About />
  <Socials />
</BaseLayout>
```

- [ ] **Step 4: Verify in browser**

`npm run dev` → http://localhost:4321/. Expected: row of 3 icons (GitHub, X, Discord) under About. White at rest, red with glow on hover. Clicking opens link in new tab.

- [ ] **Step 5: Commit**

```powershell
git add src/components/Socials.astro src/pages/index.astro
git commit -m "feat: add Socials component with brand icons"
git push
```

---

### Task 11: Build the Footer component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Footer.astro` with this exact content:**

```astro
---
const year = new Date().getFullYear();
---

<footer class="footer">
  <svg
    class="sigil"
    viewBox="0 0 32 32"
    width="20"
    height="20"
    aria-hidden="true"
  >
    <polygon
      points="16,4 28,26 4,26"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <circle cx="16" cy="20" r="2" fill="currentColor" />
  </svg>
  <p class="copy">&copy; {year} NOWAY</p>
</footer>

<style>
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    color: var(--color-text-very-dim);
  }

  .sigil {
    color: var(--color-text-dim);
    transition: color var(--duration-slow) var(--ease-slow);
    animation: sigil-pulse 4s ease-in-out infinite;
  }

  .copy {
    font-family: var(--font-mono);
    font-size: var(--size-small);
    letter-spacing: 0.15em;
  }

  @keyframes sigil-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; color: var(--color-accent); }
  }
</style>
```

- [ ] **Step 2: Wire into index.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Socials from '../components/Socials.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout>
  <Hero />
  <About />
  <Socials />
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Verify in browser**

`npm run dev` → http://localhost:4321/. Expected: small triangle sigil with a dot in it at the bottom, pulsing subtly between dim grey and red. © year NOWAY beneath it.

- [ ] **Step 4: Commit**

```powershell
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Footer with pulsing sigil"
git push
```

---

## Milestone 4 — Polish pass

### Task 12: Responsive behavior + mobile-safe sizing

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Test current site on mobile viewport**

In Chrome devtools (F12) → toggle device toolbar (Ctrl+Shift+M) → set to iPhone SE (375px wide). Reload.

Note any issues: text overflow, wordmark too big, sections too cramped, socials wrapping awkwardly.

- [ ] **Step 2: Patch `src/styles/global.css` `.page` rule**

Find the `.page` rule and replace with:

```css
.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  gap: 3rem;
}

@media (max-width: 480px) {
  .page {
    padding: 2.5rem 1rem;
    gap: 2rem;
  }
}
```

- [ ] **Step 3: Verify on mobile viewport**

Reload Chrome devtools mobile view. Expected: wordmark scales down via `clamp()` (already in tokens), spacing tightens, nothing overflows horizontally. If the wordmark *still* overflows on the narrowest devices, reduce the lower bound of `--size-wordmark` from `4rem` to `3rem` in `global.css`.

- [ ] **Step 4: Commit**

```powershell
git add src/styles/global.css
git commit -m "fix: tighten spacing on mobile viewports"
git push
```

---

### Task 13: SEO + social preview

**Files:**
- Create: `public/og-image.png` (manual asset, see step 1)
- Create: `public/favicon.svg`

- [ ] **Step 1: Create the OG image**

Open any image editor. Create a 1200×630px PNG with:
- Black background
- "NOWAY" in large white text with red glow underneath (use any font close to Metal Mania, or just bold sans if you don't have access to the font installed)
- Save as `public/og-image.png`

If lacking image-editor access, defer this — Vercel will use a default placeholder. Site still works.

- [ ] **Step 2: Create favicon.svg**

Create `public/favicon.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#000"/>
  <polygon points="16,6 28,26 4,26" fill="none" stroke="#dc1414" stroke-width="2"/>
  <circle cx="16" cy="20" r="2.5" fill="#dc1414"/>
</svg>
```

- [ ] **Step 3: Test the favicon**

Reload http://localhost:4321/ — the browser tab icon should be the red triangle sigil on black. (Tab icons sometimes cache; hard refresh if old icon persists.)

- [ ] **Step 4: Commit**

```powershell
git add public/
git commit -m "feat: add favicon and og-image"
git push
```

---

### Task 14: Performance + Lighthouse pass

**Files:** None (verification only)

- [ ] **Step 1: Build production version locally**

```powershell
npm run build
npm run preview
```

The preview server starts at http://localhost:4321/ (or similar). This serves the *built* version, not the dev version — closer to what Vercel ships.

- [ ] **Step 2: Run Lighthouse**

In Chrome on the preview URL: devtools (F12) → "Lighthouse" tab → check "Performance," "Accessibility," "Best Practices," "SEO" → Analyze.

Expected scores:
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90
- SEO: ≥ 90

- [ ] **Step 3: Address any failing audits**

Common issues:
- "Image elements do not have explicit width/height" — add to any `<img>` or `<svg>` tags
- "Document does not have a meta description" — already handled in BaseLayout
- "Background and foreground colors do not have a sufficient contrast ratio" — bump `--color-text-dim` from `#888888` to `#aaaaaa` in global.css if flagged

Fix any blockers, commit.

- [ ] **Step 4: Stop preview, commit any fixes**

Ctrl+C. If you made changes:
```powershell
git add -A
git commit -m "perf: address lighthouse audits"
git push
```

---

## Milestone 5 — Content collections scaffold (v2 prep)

### Task 15: Create projects content collection schema

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/.gitkeep`

- [ ] **Step 1: Create the content folder structure**

```powershell
New-Item -ItemType Directory -Path 'src\content\projects' -Force | Out-Null
New-Item -ItemType File -Path 'src\content\projects\.gitkeep' -Force | Out-Null
```

- [ ] **Step 2: Create `src/content/config.ts` with this exact content:**

```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      cover: image(),
      gallery: z.array(image()).optional(),
      liveUrl: z.string().url().nullable().optional(),
      repoUrl: z.string().url().nullable().optional(),
      videoUrl: z.string().url().nullable().optional(),
      date: z.date(),
      status: z.enum(['live', 'wip', 'dead']),
      featured: z.boolean().default(false),
    }),
});

export const collections = { projects };
```

- [ ] **Step 3: Verify Astro recognizes the schema**

```powershell
npm run build
```

Expected: build succeeds. No errors about the empty projects collection.

- [ ] **Step 4: Commit**

```powershell
git add src/content/
git commit -m "feat: scaffold projects content collection (v2 prep)"
git push
```

---

### Task 16: Update README with project doc + workflow

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md` contents with:**

```markdown
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

Optional: `gallery`, `liveUrl`, `repoUrl`, `videoUrl`. See `src/content/config.ts` for the full schema.

Push to `main` → Vercel auto-deploys → new project appears at `/projects/<slug>/`.

## Project docs

- Design spec: `docs/superpowers/specs/2026-05-20-noway-portfolio-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-20-noway-portfolio-v1-implementation.md`
```

- [ ] **Step 2: Commit + final push**

```powershell
git add README.md
git commit -m "docs: update README with run + add-project instructions"
git push
```

---

## Final verification

### Task 17: End-to-end ship check

**Files:** None (verification only)

- [ ] **Step 1: Confirm Vercel deploy is current**

Vercel dashboard → noway-site project. Latest deployment should be from the most recent push, status "Ready."

- [ ] **Step 2: Open the live site**

Visit `noway.vercel.app`. Expected:
- Page loads in under 2 seconds
- Grain texture overlaid throughout
- NOWAY wordmark with red bleed/glow, distressed Metal Mania font
- "CREATIVE TECH" tagline
- About paragraph with red `> status:` prefix
- Three social icons (GitHub, X, Discord) — all clickable, all open correct URLs in new tab
- Footer with pulsing sigil
- Tab icon (favicon) shows red triangle

- [ ] **Step 3: Cross-device check**

- Desktop browser (1920×1080) — looks correct
- Phone (or Chrome devtools mobile view) — looks correct, no horizontal scroll
- Tablet (Chrome devtools 768px) — looks correct

- [ ] **Step 4: Console check**

Open devtools (F12) → Console tab. Expected: zero errors. (Warnings about Lighthouse / favicon are fine.)

- [ ] **Step 5: Tag the v1 release**

```powershell
git tag v1.0.0
git push --tags
```

v1 is shipped.

---

## Open implementation decisions (resolve as encountered)

1. **Exact display font** — defaulted to Metal Mania (Google Fonts). If user dislikes during Task 7 review, swap to another Google Font like Nosifer, Eater, Butcherman, or Lacquer — replace the `Metal Mania` references in `BaseLayout.astro` font link and `global.css` `--font-display` token. Single rename.

2. **Tagline copy** — defaulted to "creative tech" in Hero. User can change `<p class="tagline">creative tech</p>` to anything in Task 8 review.

3. **About paragraph copy** — defaulted to "creative tech · shader scribbler · learning out loud" + status line. User overrides in Task 9 review.

4. **Social links and usernames** — Task 10 Step 1 explicitly requires user input before writing the component.

5. **Custom cursor** — skipped in v1. Add later if desired (one new CSS rule).

6. **Scanline overlay** — skipped in v1. Grain alone should carry the texture. Revisit if user wants more CRT vibe.

7. **Custom domain purchase** — explicitly deferred per spec. Triggered when user starts using the site in job applications.

---

## Self-review notes (post-write check)

- [x] Spec coverage: every section of the spec maps to at least one task. v1 scope (4 sections) → Tasks 8, 9, 10, 11. Visual design (BLACKMAGE) → Tasks 6, 7, 8. Content model → Task 15. Hosting → Tasks 2, 5. Workflow / README → Task 16.
- [x] No placeholder language ("TBD", "implement later", etc.) — open questions section explicitly defaults each.
- [x] All file paths absolute relative to repo root.
- [x] All commands shown with expected output.
- [x] CSS custom-property names (`--color-bg`, `--font-display`, etc.) consistent across global.css and component files.
- [x] No type / signature drift — components use props consistently.
