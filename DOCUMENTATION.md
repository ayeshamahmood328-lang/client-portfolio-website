# Documentation — Editing Guide

This file is for whoever maintains this site next. It explains how the code
is organized and how to make common changes safely.

## Design system (`css/style.css`)

All colors, fonts, spacing, and radii are defined once as CSS custom
properties at the top of the file, inside `:root`:

```css
:root {
  --color-primary: #2563EB;   /* main blue accent */
  --color-secondary: #1E293B; /* dark gray, used for headings & footer */
  --color-bg: #FFFFFF;
  --color-text: #0F172A;
  --font-display: 'Space Grotesk', ...;  /* headings */
  --font-body: 'Inter', ...;             /* paragraphs */
  --font-mono: 'JetBrains Mono', ...;    /* code-styled accents, tags */
  ...
}
```

Change a value here and it updates everywhere — never hardcode a new color
directly in a component rule; add or reuse a variable instead.

The stylesheet is organized into numbered sections (search for `/* ----`):
1. Design tokens
2. Reset
3. Buttons
4. Navbar
5. Hero
6. About
7. Skills
8. Projects
9. Contact
10. Footer
11. Scroll reveal animation
12. Mobile nav / responsive breakpoints

## HTML structure (`index.html`)

The page is one file, split into clearly commented sections in this order:
`navbar → hero → about → skills → projects → contact → footer`.

Each `<section>` has an `id` (`#home`, `#about`, `#skills`, `#projects`,
`#contact`) that the navbar links to and that the scroll-based "active link"
JavaScript listens for. If you add a new section, give it an `id` and add a
matching link in `.nav-links`.

### Adding a project

Copy one `<article class="project-card">…</article>` block inside
`.projects-grid` and edit:
- `src` in `.project-thumb img` → your screenshot
- `<h3>` → project title
- `<p>` → one or two sentence description
- `.project-tags` → technologies used
- the two `<a>` links → GitHub repo and live demo URLs

### Adding a skill

Copy one `.skill-card` block inside `.skills-grid`:
```html
<div class="skill-card"><div class="skill-icon">TS</div><span>TypeScript</span></div>
```

## JavaScript (`js/script.js`)

Each behavior is its own function, called once from the `DOMContentLoaded`
listener at the top of the file:

| Function | Responsibility |
|---|---|
| `initNavbarScroll` | Adds a shadow/background to the navbar after scrolling |
| `initMobileMenu` | Opens/closes the hamburger menu on small screens |
| `initScrollReveal` | Fades sections in as they enter the viewport |
| `initActiveNavLink` | Highlights the nav link for the section in view |
| `initBackToTop` | Shows/hides and wires the "back to top" button |
| `initContactForm` | Validates the contact form and shows a status message |
| `initYear` | Fills in the current year in the footer copyright line |

No external JS libraries are used — everything is vanilla JavaScript, so
there is nothing to install or update.

### Wiring the contact form to a real inbox

`initContactForm` currently fakes a successful submission with
`setTimeout`. To send real emails, replace that block with a `fetch()` call
to a form service (Formspree, EmailJS) or your own API, and update the
success/error handling based on the response. Search for the comment
`// No backend is wired up yet` in `js/script.js`.

## Images and icons

- `images/` holds photos and project screenshots. The placeholders are SVGs
  so the page works out of the box; replace them with real photos (JPG/WebP,
  optimized, ideally under 200KB) using the **same file names** so you don't
  need to touch the HTML.
- `icons/` holds small UI icons (social links, buttons) as standalone SVG
  files, referenced with `<img src="icons/....svg">`. To add a new icon,
  drop an SVG in this folder and reference it the same way.

## Accessibility notes already in place

- All interactive icons have `aria-label`s.
- Form fields have associated `<label>`s and live error messages.
- Focus states are visible (`:focus-visible` in `style.css`).
- `prefers-reduced-motion` is respected — animations shorten automatically
  for users who request less motion.

## Known placeholders to replace before launch

- `resume/Sarah-Johnson-Resume.pdf` — placeholder file, swap for the real CV.
- `images/hero-portrait.svg`, `images/about-photo.svg` — placeholder art.
- `images/project-1.svg` … `project-6.svg` — placeholder thumbnails.
- Social links (`https://github.com/`, `https://linkedin.com/`) and the
  email/phone in the Hero, Contact, and Footer sections.
