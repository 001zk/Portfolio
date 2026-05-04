'use strict';

const LANG_COLORS = {
  Python:     '#3572A5',
  JavaScript: '#f1e05a',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  C:          '#555555',
  Shell:      '#89e051',
};

const IGNORE = ['001zk', 'Luiz-alt001'];

async function fetchRepos(user) {
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter(r => !r.fork && !IGNORE.includes(r.name));
  } catch {
    return [];
  }
}

function buildCard(repo) {
  const lang  = repo.language || '';
  const color = LANG_COLORS[lang] || '#4e4e4e';
  const desc  = repo.description || 'Sem descrição.';
  const hp    = repo.homepage;

  return `
    <div class="proj-card" data-lang="${lang}">
      <div class="proj-card-top">
        <span class="proj-name">${repo.name}</span>
        <div class="proj-links">
          <a href="${repo.html_url}" target="_blank" rel="noopener" class="proj-link-btn">Code</a>
          ${hp ? `<a href="${hp}" target="_blank" rel="noopener" class="proj-link-btn">Demo</a>` : ''}
        </div>
      </div>
      <p class="proj-desc">${desc}</p>
      <div class="proj-meta">
        ${lang ? `<span class="proj-lang"><span class="lang-dot" style="background:${color}"></span>${lang}</span>` : ''}
        ${repo.stargazers_count > 0 ? `<span class="proj-stars">★ ${repo.stargazers_count}</span>` : ''}
        ${repo.archived ? `<span class="proj-archived">Arquivado</span>` : ''}
      </div>
    </div>`;
}

function renderProjects(repos) {
  const grid = document.getElementById('projects-grid');

  if (!repos.length) {
    grid.innerHTML = '<p class="proj-status">Nenhum repositório encontrado.</p>';
    return;
  }

  grid.innerHTML = repos.map(buildCard).join('');

  grid.querySelectorAll('.proj-card').forEach((card, i) => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(12px)';
    card.style.transition = `opacity 0.35s ease ${i * 0.04}s, transform 0.35s ease ${i * 0.04}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.style.opacity   = '1';
      card.style.transform = 'translateY(0)';
    }));
  });
}

function initProjectTabs(all) {
  document.querySelectorAll('.proj-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.proj-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      renderProjects(lang === 'all' ? all : all.filter(r => r.language === lang));
    });
  });
}

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const [a, b] = await Promise.all([fetchRepos('001zk'), fetchRepos('Luiz-alt001')]);
  const all    = [...a, ...b].sort((x, y) => new Date(y.updated_at) - new Date(x.updated_at));

  if (!all.length) {
    grid.innerHTML = `<p class="proj-status">Não foi possível carregar. <a href="https://github.com/001zk?tab=repositories" target="_blank" rel="noopener" style="color:var(--accent)">Ver no GitHub →</a></p>`;
    return;
  }

  window._allRepos = all;
  renderProjects(all);
  initProjectTabs(all);
}

function initCertFilter() {
  const tabs  = document.querySelectorAll('.ftab');
  const cards = document.querySelectorAll('.cert-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const f = tab.dataset.filter;
      cards.forEach(c => { c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none'; });
    });
  });
}

function initLightbox() {
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  if (!lb) return;
  const close = () => lb.classList.remove('open');
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => { lbImg.src = card.querySelector('img').src; lb.classList.add('open'); });
  });
  document.querySelector('.lb-backdrop').addEventListener('click', close);
  document.getElementById('lb-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));
}

function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count;
      let n = 0;
      const t = setInterval(() => { n = Math.min(n + Math.ceil(target / 30), target); el.textContent = n; if (n >= target) clearInterval(t); }, 40);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.metric-num').forEach(el => io.observe(el));
}

function initSidebarActive() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.sb-link');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.dataset.section === e.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
}

function initMobileMenu() {
  const btn     = document.getElementById('mob-menu-btn');
  const overlay = document.getElementById('mob-overlay');
  if (!btn) return;
  btn.addEventListener('click', () => overlay.classList.toggle('open'));
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => overlay.classList.remove('open')));
}

document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  initCertFilter();
  initLightbox();
  initReveal();
  initCounters();
  initSidebarActive();
  initMobileMenu();
});
