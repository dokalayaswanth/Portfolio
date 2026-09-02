const root = document.documentElement;
const header = document.querySelector('[data-header]');
const themeButton = document.querySelector('.theme-toggle');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const toast = document.querySelector('[data-toast]');

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton?.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    theme === 'dark' ? '#070708' : '#fafafa'
  );
}

const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(savedTheme || (systemPrefersLight ? 'light' : 'dark'));

themeButton?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('.brand')?.addEventListener('click', () => {
  nav?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.site-nav a').forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

const filterButtons = document.querySelectorAll('[data-filter]');
const projectItems = document.querySelectorAll('[data-categories]');
const supportingGrid = document.querySelector('.supporting-grid');
const emptyMessage = document.querySelector('.filter-empty');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));

    let visibleCount = 0;
    projectItems.forEach((project) => {
      const categories = project.dataset.categories?.split(' ') || [];
      const visible = filter === 'all' || categories.includes(filter);
      project.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (supportingGrid) {
      const hasVisibleChild = [...supportingGrid.children].some((child) => !child.hidden);
      supportingGrid.hidden = !hasVisibleChild;
    }
    if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
  });
});

document.querySelector('[data-copy-email]')?.addEventListener('click', async () => {
  const email = 'yaswanthdokala1801@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const input = document.createElement('textarea');
    input.value = email;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
  toast?.classList.add('is-visible');
  window.setTimeout(() => toast?.classList.remove('is-visible'), 2200);
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
