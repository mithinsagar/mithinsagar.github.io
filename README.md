# Mithin Sagar — Portfolio

A cinematic personal portfolio for **Mithin Sagar S**, AI / ML Engineer.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export-ready production build
```

---

## Editing content

All copy and data live in `src/data/`. Nothing in `src/components/` needs to be
touched to update the site.

| File | Holds |
|---|---|
| `site.ts` | Name, role, contact links, nav structure, hero copy, disciplines |
| `projects.ts` | Every project: problem, approach, highlights, metrics, tech, links |
| `experience.ts` | The timeline (education, work, leadership, research) |
| `publications.ts` | Publications, research work, research interests |
| `leadership.ts` | Leadership roles, stats, philosophy |
| `achievements.ts` | Awards, certifications, hackathon slots |
| `skills.ts` | Skill groups and engineering principles |
| `currently.ts` | The "Currently" page — building / learning / exploring |
| `photos.ts` | Photo titles, captions and series metadata |
| `media.json` | **Generated.** Image paths, dimensions and blur placeholders |

### Adding a project

Append an object to `projects` in `src/data/projects.ts`. Only `github`, `demo`
and `coverKey` are optional:

- **With screenshots** — put them under `public/projects/<slug>/` as
  `cover.webp` plus `shot-01.webp`…, add the entry to `media.json`, and set
  `coverKey: "<slug>"`.
- **Without screenshots** — omit `coverKey`. The card renders a schematic cover
  built in code from the project's `glyph`, `accent` and first two `metrics`,
  so it still belongs to the same visual system.

### Adding a publication

Append to `publications` in `src/data/publications.ts`. Placeholder entries
(`placeholder: true`) render in a dashed, muted state — use them to reserve a
slot rather than inventing a record.

### Photography

Drop optimised `.webp` files into `public/photography/`, add them to
`media.json` with `w`, `h`, `lqip` and `series`, then write a title and caption
in `src/data/photos.ts`.

---

## Before deploying

1. Set the real domain in `src/data/site.ts` → `site.url`. It drives canonical
   URLs, `sitemap.xml`, `robots.txt` and Open Graph image resolution.
2. Replace `public/Mithin-Sagar-S-Resume.pdf` when the résumé changes.
3. `public/og.png` is the social preview card — regenerate it if the hero copy
   changes.

Deploy target: any static host. `npm run build` prerenders all 21 routes.

---

## Architecture

```
src/
  app/                     one route per page + template.tsx (page transitions)
  components/
    chrome/                Navbar, MobileMenu, Footer, CustomCursor,
                           SmoothScroll (Lenis), Embers, Grain,
                           ScrollProgress, Transition (route wipe)
    ui/                    Section, SectionHeading, Reveal, RevealText,
                           ScrollWords, Marquee, MagneticButton, ArrowLink,
                           Lightbox
    home/                  Hero, Statement, WorkPreview, Capabilities,
                           TrackPreview, PhotoStrip, CurrentlyStrip
    projects/              ProjectCard, ProjectCover, ProjectGallery,
                           ProjectsExplorer (filter + search)
    sections/              PageHeader, Timeline, PublicationCard,
                           PhotoGallery, ContactCTA
  data/                    content only — see the table above
  lib/                     motion presets, media-query hooks
```

### Design system

Defined once in `src/app/globals.css` under `@theme`:

- **Surfaces** — `void` `ink` `ash` `char` `stone` (warm blacks, never neutral grey)
- **Light** — `ember` `flame` `glow` `rust` `blood`
- **Type** — `bone` `linen` `dust` `mute`
- **Fonts** — Geist (display + body), Geist Mono (labels, metrics),
  Instrument Serif italic (accents only)
- **Utilities** — `display` `label` `label-sm` `accent` `body-lg` `glass`
  `panel` `hairline` `edge-fade-x`

### Motion

- Entrances use masked line reveals (`RevealText`) or a simple rise (`Reveal`).
- Scroll-linked effects use `useScroll` + `useTransform`; nothing animates on
  a timer that could run off screen.
- The ember canvas pauses via `IntersectionObserver` when off screen and on
  `visibilitychange`.
- `MotionConfig reducedMotion="user"` plus a CSS `prefers-reduced-motion` block
  give a genuinely static experience when the OS asks for one.
