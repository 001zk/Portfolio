"use strict";

/* ── SCROLL REVEAL ── */
(function () {
    const els = document.querySelectorAll('.reveal-up');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    els.forEach(el => obs.observe(el));
})();


/* ── ANIMATED COUNTERS ── */
(function () {
    const nums = document.querySelectorAll('.metric-num[data-count]');
    const obs  = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el  = e.target;
            const end = parseInt(el.dataset.count);
            const dur = 1400;
            const t0  = performance.now();
            function tick(now) {
                const p = Math.min((now - t0) / dur, 1);
                el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * end);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = end;
            }
            requestAnimationFrame(tick);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    nums.forEach(n => obs.observe(n));
})();


/* ── SKILL BARS ── */
(function () {
    const fills = document.querySelectorAll('.sb-fill[data-w]');
    const obs   = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.style.width = e.target.dataset.w + '%';
            obs.unobserve(e.target);
        });
    }, { threshold: 0.3 });
    fills.forEach(f => obs.observe(f));
})();


/* ── SIDEBAR ACTIVE SECTION ── */
(function () {
    const links    = document.querySelectorAll('.sb-link');
    const sections = document.querySelectorAll('section[id]');
    const obs      = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const id = e.target.id;
            links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
})();


/* ── MOBILE MENU ── */
(function () {
    const btn     = document.getElementById('mob-menu-btn');
    const overlay = document.getElementById('mob-overlay');
    if (!btn) return;

    function close() {
        btn.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
        const open = overlay.classList.toggle('open');
        btn.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', close));
})();


/* ── CERTIFICATE FILTER ── */
(function () {
    const tabs  = document.querySelectorAll('.ftab');
    const cards = document.querySelectorAll('.cert-card[data-cat]');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;
            cards.forEach(card => {
                const show = filter === 'all' || card.dataset.cat === filter;
                if (show) {
                    card.classList.remove('hidden');
                    requestAnimationFrame(() => {
                        card.style.opacity   = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity   = '0';
                    card.style.transform = 'translateY(8px)';
                    setTimeout(() => card.classList.add('hidden'), 250);
                }
            });
        });
    });
})();


/* ── LIGHTBOX ── */
(function () {
    const lb    = document.getElementById('lightbox');
    const img   = document.getElementById('lb-img');
    const close = document.getElementById('lb-close');
    const back  = lb?.querySelector('.lb-backdrop');
    if (!lb) return;

    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            const src = card.querySelector('img');
            if (!src) return;
            img.src = src.src;
            img.alt = src.alt;
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLB() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { img.src = ''; }, 300);
    }

    close?.addEventListener('click', closeLB);
    back?.addEventListener('click', closeLB);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
})();


/* ── SMOOTH SCROLL ── */
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.getElementById(a.getAttribute('href').slice(1));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();