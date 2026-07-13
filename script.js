/* ==========================================================================
   Sarah Johnson — Portfolio
   Main script: navbar behaviour, mobile menu, scroll reveal,
   active link highlighting, back-to-top, contact form validation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initScrollReveal();
  initActiveNavLink();
  initBackToTop();
  initContactForm();
  initYear();
});

/* -------------------- Navbar: shrink / shadow on scroll -------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggle = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* -------------------- Mobile hamburger menu -------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  if (!toggleBtn || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    menuIcon.style.display = isOpen ? 'none' : 'block';
    closeIcon.style.display = isOpen ? 'block' : 'none';
  });

  // Close menu after clicking a link (mobile)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });
}

/* -------------------- Scroll reveal (IntersectionObserver) -------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* -------------------- Highlight active nav link on scroll -------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const linkFor = (id) => document.querySelector(`.nav-links a[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -------------------- Back to top button -------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => btn.classList.toggle('visible', window.scrollY > 500),
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------- Contact form validation -------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');
  const fields = {
    name: { el: form.querySelector('#name'), error: form.querySelector('#nameError') },
    email: { el: form.querySelector('#email'), error: form.querySelector('#emailError') },
    subject: { el: form.querySelector('#subject'), error: form.querySelector('#subjectError') },
    message: { el: form.querySelector('#message'), error: form.querySelector('#messageError') },
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(key) {
    const { el, error } = fields[key];
    let message = '';

    if (!el.value.trim()) {
      message = 'This field is required.';
    } else if (key === 'email' && !emailPattern.test(el.value.trim())) {
      message = 'Enter a valid email address.';
    } else if (key === 'message' && el.value.trim().length < 10) {
      message = 'Message should be at least 10 characters.';
    }

    error.textContent = message;
    el.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('blur', () => validateField(key));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const allValid = Object.keys(fields)
      .map(validateField)
      .every(Boolean);

    if (!allValid) {
      statusEl.textContent = 'Please fix the errors above and try again.';
      statusEl.className = 'form-status error';
      return;
    }

    // No backend is wired up yet — this is where a real endpoint
    // (e.g. Formspree, EmailJS, or a custom API) would be called.
    // Example:
    // fetch('/api/contact', { method: 'POST', body: new FormData(form) })

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    setTimeout(() => {
      statusEl.textContent = "Thanks! Your message has been noted — I'll reply soon.";
      statusEl.className = 'form-status success';
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 900);
  });
}

/* -------------------- Footer year -------------------- */
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
