document.body.classList.add('js-on');

const PROJECTS = [
  {
    name: 'CGNAT-AUDIT-PUBLIC',
    owner: '001zk',
    desc: 'Auditoria CGNAT para ISPs — correlaciona logs de acesso com ranges de porta para identificar assinantes por trás de IPs compartilhados.',
    lang: 'Python',
    url: 'https://github.com/001zk/CGNAT-AUDIT-PUBLIC',
    stars: 0,
    details: {
      status: 'Concluído',
      stack: ['Python 3.x', 'pandas', 'openpyxl'],
      context: 'Em redes CGNAT, múltiplos assinantes compartilham um único IP público. Quando há uma solicitação judicial ou de segurança referenciando IP + porta, é necessário cruzar com a tabela de alocação do roteador de borda para identificar o usuário real.',
      how: 'Lê um JSON com logs de acesso (IP público, porta TCP, timestamp) e tabela de mapeamento CGNAT. Percorre o JSON recursivamente, identifica blocos de range e cruza cada porta de log com o range correspondente por interseção numérica. Agrega ocorrências por (IP CGNAT, range TCP) e exporta para .xlsx.',
      highlights: [
        'Travessia recursiva de JSON profundamente aninhado — compatível com output real de roteadores de borda',
        'Detecção de outliers: assinantes com volume anômalo de conexões ficam evidentes no relatório',
        'Dataset sintético com IPs RFC 5737 — nenhum dado real de produção exposto',
        'Possibilidade de extensão para consulta automática em ERPs (IXCsoft, SGP) para identificação completa do assinante',
      ],
    },
  },
  {
    name: 'painel',
    owner: '001zk',
    desc: 'Painel web com interface de login e área administrativa — frontend HTML/CSS/JS com backend Node.js.',
    lang: 'JavaScript',
    url: 'https://github.com/001zk/painel',
    stars: 0,
    details: {
      status: 'Em desenvolvimento',
      stack: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      context: 'Aplicação web full-stack com duas camadas de acesso: interface pública e painel administrativo separado.',
      how: 'Frontend em HTML/CSS/JS puro com duas views (index.html e painel-adm.html). Backend em Node.js (server.js) servindo as rotas e gerenciando a lógica de autenticação e dados do painel.',
      highlights: [
        'Separação clara entre interface pública e painel admin',
        'Backend Node.js com server.js dedicado',
        'Linting configurado via .hintrc',
      ],
    },
  },
  {
    name: 'SLR_bot',
    owner: '001zk',
    desc: 'Bot Discord com múltiplos comandos e funcionalidades — construído em JavaScript com discord.js.',
    lang: 'JavaScript',
    url: 'https://github.com/001zk/SLR_bot',
    stars: 0,
    details: {
      status: 'Concluído',
      stack: ['JavaScript', 'Node.js', 'discord.js'],
      context: 'Segundo bot Discord desenvolvido como exercício de retorno aos estudos em JavaScript. Foco em expandir comandos e funcionalidades em relação ao bot anterior.',
      how: 'Construído com discord.js, gerenciando eventos e comandos via index.js. Configurações centralizadas em config.json para facilitar manutenção. Usa prefixo de comandos tradicional (não slash commands).',
      highlights: [
        'Múltiplos comandos implementados progressivamente',
        'Configuração centralizada via config.json',
        '1 fork por terceiros',
        'Versão evoluída do bot_one.py, reescrita em JavaScript',
      ],
    },
  },
  {
    name: 'slr_notslash',
    owner: '001zk',
    desc: 'Variante do SLR_bot sem slash commands — bot Discord em JavaScript com comandos por prefixo.',
    lang: 'JavaScript',
    url: 'https://github.com/001zk/slr_notslash',
    stars: 0,
    details: {
      status: 'Concluído',
      stack: ['JavaScript', 'Node.js', 'discord.js'],
      context: 'Fork experimental do SLR_bot que mantém comandos por prefixo em vez de migrar para slash commands da API Discord v10+.',
      how: 'Mantém a mesma estrutura do SLR_bot mas com o handler de comandos adaptado para prefixo customizado — abordagem mais simples para bots sem registro de slash commands na API do Discord.',
      highlights: [
        'Alternativa sem necessidade de registro de slash commands',
        'Mais rápido para desenvolver e testar novos comandos',
        'Compatível com servidores sem permissões de aplicação',
      ],
    },
  },
  {
    name: 'tcc-estacio-tec-inf',
    owner: '001zk',
    desc: 'Trabalho de Conclusão de Curso — Técnico em Informática pela Estácio de Sá.',
    lang: 'HTML',
    url: 'https://github.com/001zk/tcc-estacio-tec-inf',
    stars: 0,
    details: {
      status: 'Concluído',
      stack: ['HTML', 'CSS'],
      context: 'Projeto final do curso Técnico em Informática pela Estácio de Sá. Documentação e apresentação do trabalho de conclusão.',
      how: 'Desenvolvido como parte dos requisitos de conclusão do curso técnico, consolidando os conhecimentos adquiridos ao longo da formação.',
      highlights: [
        'Projeto de conclusão do Técnico em Informática — Estácio de Sá',
        'Base da trajetória formal em TI',
      ],
    },
  },
  {
    name: 'bot_one.py',
    owner: '001zk',
    desc: 'Bot Python para automação de tarefas e integração com APIs externas.',
    lang: 'Python',
    url: 'https://github.com/001zk/bot_one.py',
    stars: 1,
    details: {
      status: 'Concluído',
      stack: ['Python 3.x'],
      context: 'Primeiro bot desenvolvido em Python — foco em automação de tarefas repetitivas e consumo de APIs.',
      how: 'Script Python com handlers de comandos e integração com APIs externas. Ponto de partida para os projetos de automação subsequentes.',
      highlights: [
        'Primeiro projeto de automação com Python',
        '1 star, 1 fork',
        'Base para a evolução para SLR_bot em JavaScript',
      ],
    },
  },
  {
    name: 'c---cs50',
    owner: '001zk',
    desc: 'Exercícios e projetos do CS50 de Harvard resolvidos em C.',
    lang: 'C',
    url: 'https://github.com/001zk/c---cs50',
    stars: 1,
    details: {
      status: 'Concluído',
      stack: ['C', 'CS50 Library'],
      context: 'Repositório com as soluções dos problem sets do CS50 Introduction to Computer Science de Harvard — um dos cursos de ciência da computação mais completos disponíveis online.',
      how: 'Implementações em C cobrindo fundamentos: algoritmos de ordenação e busca, estruturas de dados, gerenciamento de memória, manipulação de strings e resolução de problemas com complexidade crescente.',
      highlights: [
        'Algoritmos clássicos implementados do zero em C',
        'Gerenciamento manual de memória (malloc, free)',
        'Problem sets com dificuldade crescente — do básico ao avançado',
        '1 star',
      ],
    },
  },
];

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Shell:      '#89e051',
  C:          '#555555',
};

const STATUS_COLOR = {
  'Concluído':        '#22c55e',
  'Em desenvolvimento': '#f59e0b',
  'Arquivado':        '#7a9ab5',
};

function buildModal() {
  const el = document.createElement('div');
  el.id = 'proj-modal';
  el.className = 'proj-modal-overlay';
  el.innerHTML = `
    <div class="proj-modal-box">
      <div class="pm-header">
        <div class="pm-title-wrap">
          <span class="pm-name" id="pm-name"></span>
          <span class="pm-owner" id="pm-owner"></span>
          <span class="pm-status" id="pm-status"></span>
        </div>
        <button class="pm-close" id="pm-close">✕</button>
      </div>
      <div class="pm-body">
        <div class="pm-stack-wrap">
          <span class="pm-label">Stack</span>
          <div class="pm-stack" id="pm-stack"></div>
        </div>
        <div class="pm-block">
          <span class="pm-label">Contexto</span>
          <p id="pm-context"></p>
        </div>
        <div class="pm-block">
          <span class="pm-label">Como funciona</span>
          <p id="pm-how"></p>
        </div>
        <div class="pm-block">
          <span class="pm-label">Destaques técnicos</span>
          <ul class="pm-highlights" id="pm-highlights"></ul>
        </div>
      </div>
      <div class="pm-footer">
        <a id="pm-gh-link" href="#" target="_blank" rel="noopener noreferrer" class="pm-gh-btn">
          Ver repositório no GitHub →
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(el);

  el.addEventListener('click', e => { if (e.target === el) closeModal(); });
  document.getElementById('pm-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(proj) {
  document.getElementById('pm-name').textContent    = proj.name;
  document.getElementById('pm-owner').textContent   = '@' + proj.owner;
  document.getElementById('pm-context').textContent = proj.details.context;
  document.getElementById('pm-how').textContent     = proj.details.how;
  document.getElementById('pm-gh-link').href        = proj.url;

  const statusEl = document.getElementById('pm-status');
  statusEl.textContent  = proj.details.status;
  statusEl.style.color  = STATUS_COLOR[proj.details.status] || '#7a9ab5';
  statusEl.style.borderColor = STATUS_COLOR[proj.details.status] || '#7a9ab5';

  document.getElementById('pm-stack').innerHTML = proj.details.stack
    .map(s => `<span class="pm-tag">${s}</span>`).join('');

  document.getElementById('pm-highlights').innerHTML = proj.details.highlights
    .map(h => `<li>${h}</li>`).join('');

  document.getElementById('proj-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('proj-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCards(repos) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  if (!repos.length) {
    grid.innerHTML = `<p class="proj-status">Nenhum projeto encontrado.</p>`;
    return;
  }
  grid.innerHTML = repos.map((r, i) => `
    <div class="proj-card" data-index="${i}">
      <div class="proj-card-header">
        <span class="proj-name">${r.name}</span>
        <span class="proj-owner">@${r.owner}</span>
      </div>
      <p class="proj-desc">${r.desc}</p>
      <div class="proj-footer">
        <span class="proj-lang">
          <span class="proj-lang-dot" style="background:${LANG_COLORS[r.lang] || '#888'}"></span>
          ${r.lang}
        </span>
        <span class="proj-stars">★ ${r.stars}</span>
      </div>
      <div class="proj-actions">
        <button class="proj-detail-btn" data-index="${i}">Detalhes</button>
        <a class="proj-gh-btn-sm" href="${r.url}" target="_blank" rel="noopener noreferrer">GitHub →</a>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.proj-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const proj = repos[parseInt(btn.dataset.index)];
      if (proj) openModal(proj);
    });
  });
}

buildModal();
renderCards(PROJECTS);

document.querySelectorAll('.proj-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.proj-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const lang     = btn.dataset.lang;
    const filtered = lang === 'all' ? PROJECTS : PROJECTS.filter(r => r.lang === lang);
    renderCards(filtered);
  });
});

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
  const interval = 1400 / 60;
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
