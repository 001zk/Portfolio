document.body.classList.add('js-on');

// sidebar active link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a, .mobile-menu a');

function setActive() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

// mobile menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  });
});

// tenure counter
(function () {
  const el = document.getElementById('tenure');
  if (!el) return;
  const start = new Date(2022, 0, 1);
  const now   = new Date();
  const years = now.getFullYear() - start.getFullYear();
  el.textContent = years + '+';
})();

// cert count
(function () {
  const el = document.getElementById('cert-count');
  if (!el) return;
  const count = document.querySelectorAll('.cert-card').length;
  el.textContent = count + '+';
})();

// modal
const modalOverlay = document.getElementById('modal-overlay');
const modalImg     = document.getElementById('modal-img');
const modalClose   = document.getElementById('modal-close');

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.querySelector('.cert-thumb')?.src;
    if (src && modalImg && modalOverlay) {
      modalImg.src = src;
      modalOverlay.classList.add('open');
    }
  });
});

modalClose?.addEventListener('click', () => modalOverlay?.classList.remove('open'));
modalOverlay?.addEventListener('click', e => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('open');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modalOverlay?.classList.remove('open');
});

// cert filters
const certFilters = document.querySelectorAll('.cert-filter');
certFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    certFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.cert-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// project filters
const projFilters = document.querySelectorAll('.proj-filter');
projFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    projFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const lang = btn.dataset.filter;
    const filtered = lang === 'all'
      ? window._allRepos
      : (window._allRepos || []).filter(r => r.language === lang);
    renderCards(filtered);
  });
});

// github projects
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
  const res = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=30`);
  if (!res.ok) return [];
  const repos = await res.json();
  return repos
    .filter(r => !r.fork && !IGNORE.includes(r.name) && r.description)
    .map(r => ({ ...r, _owner: user }));
}

function renderCards(repos) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  if (!repos.length) {
    grid.innerHTML = `<p style="color:var(--text-muted);font-family:var(--mono);font-size:.85rem">Nenhum projeto encontrado.</p>`;
    return;
  }
  grid.innerHTML = repos.map((r, i) => `
    <a class="proj-card reveal-up" href="${r.html_url}" target="_blank" rel="noopener noreferrer"
       style="transition-delay:${i * 60}ms">
      <div class="proj-card-header">
        <span class="proj-name">${r.name}</span>
        <span class="proj-owner">@${r._owner}</span>
      </div>
      <p class="proj-desc">${r.description}</p>
      <div class="proj-footer">
        <span class="proj-lang">
          <span class="proj-lang-dot" style="background:${LANG_COLORS[r.language] || '#888'}"></span>
          ${r.language || 'Other'}
        </span>
        <span class="proj-stars">★ ${r.stargazers_count}</span>
      </div>
    </a>
  `).join('');

  grid.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));
}

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const [r1, r2] = await Promise.all([
      fetchRepos('001zk'),
      fetchRepos('Luiz-alt001'),
    ]);
    const all = [...r1, ...r2].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    window._allRepos = all;
    renderCards(all);
  } catch {
    if (grid) {
      grid.innerHTML = `<p style="color:var(--text-muted);font-family:var(--mono);font-size:.85rem">Erro ao carregar repositórios.</p>`;
    }
  }
}

const projectsSection = document.getElementById('projetos');
if (projectsSection) {
  const projectsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadProjects();
      projectsObserver.disconnect();
    }
  }, { threshold: 0.1 });
  projectsObserver.observe(projectsSection);
}
