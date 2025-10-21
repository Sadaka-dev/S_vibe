// Main interactivity: theme toggle, mobile menu, typewriter, smooth scroll, and scroll animations.
// Vanilla ES6+

// ---------- Theme Toggle ----------
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

const applyTheme = (theme) => {
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
  localStorage.setItem('theme', theme);
};

const current = localStorage.getItem('theme') || 'dark';
applyTheme(current);

if (themeToggle) themeToggle.addEventListener('click', () => applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark'));
if (themeToggleMobile) themeToggleMobile.addEventListener('click', () => applyTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark'));

// ---------- Mobile Menu ----------
const mobileMenuBtn = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  // close on nav click
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));
}

// ---------- Smooth scrolling for CTA and nav links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---------- Typewriter effect ----------
const typewriterEl = document.getElementById('typewriter');
const phrases = ['Mohamed Sadaka', 'Frontend Developer | Building Digital Experiences.'];
let phraseIndex = 0;
let letterIndex = 0;
let typing = true;

const typeSpeed = 60;
const pauseBetween = 1000;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];
  if (typing) {
    if (letterIndex <= currentPhrase.length) {
      typewriterEl.textContent = currentPhrase.slice(0, letterIndex);
      letterIndex++;
      setTimeout(typeLoop, typeSpeed);
    } else {
      typing = false;
      setTimeout(typeLoop, pauseBetween);
    }
  } else {
    if (letterIndex >= 0) {
      typewriterEl.textContent = currentPhrase.slice(0, letterIndex);
      letterIndex--;
      setTimeout(typeLoop, typeSpeed / 2);
    } else {
      typing = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, typeSpeed);
    }
  }
}
typeLoop();

// ---------- IntersectionObserver: animate-on-scroll ----------
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.12
};

const ioCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0', 'translate-y-6');
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.style.transition = 'opacity 500ms ease-out, transform 500ms cubic-bezier(.2,.8,.2,1)';
      observer.unobserve(entry.target);
    }
  });
};

const io = new IntersectionObserver(ioCallback, observerOptions);
document.querySelectorAll('.animate-on-scroll').forEach(el => io.observe(el));
document.querySelectorAll('article.animate-on-scroll').forEach(el => io.observe(el));

// ---------- Micro-interactions: keyboard accessibility for project buttons (disabled placeholders) ----------
document.querySelectorAll('button[disabled]').forEach(btn => {
  btn.setAttribute('aria-disabled', 'true');
});