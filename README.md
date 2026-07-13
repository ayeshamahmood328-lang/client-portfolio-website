# Sarah Johnson — Portfolio Website

A single-page, responsive portfolio website built with plain **HTML, CSS, and
JavaScript** (no frameworks, no build step). Designed to be shared with
recruiters, hiring managers, and clients.

**Live sections:** Home · About · Skills · Projects · Contact

---

## 1. Folder structure

```
novatech-portfolio/
├── index.html              Single page — all sections live here
├── css/
│   └── style.css           All styles (design tokens, layout, animations)
├── js/
│   └── script.js           All interactivity (nav, form, scroll reveal)
├── images/
│   ├── hero-portrait.svg   Placeholder — replace with a real photo
│   ├── about-photo.svg     Placeholder — replace with a real photo
│   ├── project-1.svg … project-6.svg   Placeholder project thumbnails
│   └── favicon.svg
├── icons/                  Standalone SVG icons (github, linkedin, mail, …)
├── resume/
│   └── Sarah-Johnson-Resume.pdf   Placeholder — replace with the real CV
├── README.md                This file
└── DOCUMENTATION.md          Section-by-section editing guide
```

Everything is split into its own file/folder on purpose — HTML, CSS, JS,
images, and icons are never mixed — so another developer can find and change
things without reading through the whole project.

## 2. Running the site locally

No build tools or installs are required.

**Option A — just open it**
Double-click `index.html`, or right-click → "Open with" your browser.

**Option B — local server (recommended, avoids browser file:// restrictions)**
```bash
# From inside the project folder
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```
or, with Node installed:
```bash
npx serve .
```

## 3. What to customize before going live

| What | Where |
|---|---|
| Name, role, intro text | `index.html` → Hero section |
| Bio, education, experience | `index.html` → About section |
| Skills list | `index.html` → Skills section |
| Projects (images, links, tags) | `index.html` → Projects section |
| Email, phone, location | `index.html` → Contact + Footer |
| Resume file | `resume/Sarah-Johnson-Resume.pdf` |
| Photos | `images/hero-portrait.svg`, `images/about-photo.svg` |
| Project screenshots | `images/project-1.svg` … `project-6.svg` |
| Colors / fonts | `css/style.css` → `:root` variables at the top |

See **DOCUMENTATION.md** for a more detailed, line-by-line guide.

## 4. Contact form

The form currently validates input in the browser and shows a success
message — it is **not wired to send real email yet**, since that needs a
backend or a third-party form service. To make it functional, pick one:

- [Formspree](https://formspree.io) — no backend needed, add an `action`
  attribute to the `<form>` in `index.html`.
- [EmailJS](https://www.emailjs.com) — send email directly from JavaScript.
- A custom backend endpoint — replace the `setTimeout` block in
  `js/script.js` (`initContactForm`) with a real `fetch()` call.

## 5. Deployment

This is a static site, so it can be hosted for free on any of:
- **GitHub Pages** — push this repo, enable Pages on the `main` branch.
- **Netlify** or **Vercel** — drag-and-drop the folder or connect the repo.

## 6. Browser support

Tested against current versions of Chrome, Edge, Firefox, and Safari.
Uses standard CSS (Grid, custom properties) and vanilla JS
(`IntersectionObserver`) — no polyfills needed for modern browsers.

## 7. Performance & SEO notes

- Images are lightweight SVGs; swap in compressed JPG/WebP photos and keep
  them under ~200KB each for fast loading.
- `index.html` already has a descriptive `<title>`, meta description, and
  semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`).
- Add `alt` text to any new images you add.

## 8. License

Free to use and modify for this portfolio.
