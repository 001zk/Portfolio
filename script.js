document.body.classList.add('js-on');

const sections = document.querySelectorAll('section[id]');
const sbLinks  = document.querySelectorAll('.sb-link');

function updateActive() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 180) current = s.id;
  });
  sbLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.section === current);
  });
}
window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  if (!target) return;
  const steps    = 60;
  const interval = 1400 / steps;
  let current    = 0;
  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, interval);
}
setTimeout(() => {
  document.querySelectorAll('.metric-num[data-count]').forEach(animateCount);
}, 300);

const menuBtn = document.getElementById('mob-menu-btn');
const overlay = document.getElementById('mob-overlay');
menuBtn?.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  overlay?.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(a => {
  a.addEventListener('click', () => {
    menuBtn?.classList.remove('open');
    overlay?.classList.remove('open');
  });
});

const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lb-img');
const lbClose    = document.getElementById('lb-close');
const lbBackdrop = lightbox?.querySelector('.lb-backdrop');
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.querySelector('img')?.src;
    if (src && lightbox && lbImg) { lbImg.src = src; lightbox.classList.add('open'); }
  });
});
lbClose?.addEventListener('click',    () => lightbox?.classList.remove('open'));
lbBackdrop?.addEventListener('click', () => lightbox?.classList.remove('open'));
document.addEventListener('keydown',  e  => { if (e.key === 'Escape') lightbox?.classList.remove('open'); });

document.querySelectorAll('.ftab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.cert-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  });
});

document.querySelectorAll('.proj-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.proj-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const lang     = btn.dataset.lang;
    const filtered = lang === 'all'
      ? window._allRepos || []
      : (window._allRepos || []).filter(r => r.language === lang);
    renderCards(filtered);
  });
});

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Shell:      '#89e051',
  C:          '#555555',
};

const IGNORE = ['Portfolio'];

async function fetchRepos(user) {
  const controller = new AbortController();
  const timeout    = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?sort=updated&per_page=50`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);
    if (!res.ok) return [];
    const repos = await res.json();
    return repos
      .filter(r => !r.fork && !IGNORE.includes(r.name))
      .map(r => ({ ...r, _owner: user }));
  } catch {
    clearTimeout(timeout);
    return [];
  }
}

function renderCards(repos) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  if (!repos.length) {
    grid.innerHTML = `<p class="proj-status">Nenhum projeto encontrado.</p>`;
    return;
  }
  grid.innerHTML = repos.map(r => `
    <a class="proj-card" href="${r.html_url}" target="_blank" rel="noopener noreferrer">
      <div class="proj-card-header">
        <span class="proj-name">${r.name}</span>
        <span class="proj-owner">@${r._owner}</span>
      </div>
      <p class="proj-desc">${r.description || '—'}</p>
      <div class="proj-footer">
        <span class="proj-lang">
          <span class="proj-lang-dot" style="background:${LANG_COLORS[r.language] || '#888'}"></span>
          ${r.language || 'Other'}
        </span>
        <span class="proj-stars">★ ${r.stargazers_count}</span>
      </div>
    </a>
  `).join('');
}

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = `<p class="proj-status">Carregando repositórios...</p>`;
  try {
    const [r1, r2] = await Promise.all([fetchRepos('001zk'), fetchRepos('Luiz-alt001')]);
    window._allRepos = [...r1, ...r2].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    renderCards(window._allRepos);
  } catch {
    grid.innerHTML = `<p class="proj-status">Não foi possível carregar os repositórios. <a href="https://github.com/001zk" target="_blank" rel="noopener" style="color:var(--amber)">Ver no GitHub →</a></p>`;
  }
}

loadProjects();
