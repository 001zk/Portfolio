
"use strict";

/* ────────────────────────────────────────
   LOADER
──────────────────────────────────────── */
(function initLoader() {
    const loader  = document.getElementById('loader');
    const bar     = document.getElementById('loader-bar');
    const text    = document.getElementById('loader-text');

    const steps = [
        { pct: 20,  msg: 'CARREGANDO ASSETS...'   },
        { pct: 45,  msg: 'CONECTANDO À REDE...'   },
        { pct: 70,  msg: 'INICIANDO NOC...'        },
        { pct: 90,  msg: 'VERIFICANDO STATUS...'  },
        { pct: 100, msg: 'SISTEMA PRONTO.'        },
    ];

    let idx = 0;
    const tick = () => {
        if (idx >= steps.length) {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.dispatchEvent(new Event('portfolio-ready'));
            }, 300);
            return;
        }
        const s = steps[idx++];
        bar.style.width  = s.pct + '%';
        text.textContent = s.msg;
        setTimeout(tick, idx === steps.length ? 400 : 280);
    };

    setTimeout(tick, 200);
})();


/* ────────────────────────────────────────
   NETWORK CANVAS BACKGROUND
──────────────────────────────────────── */
(function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, nodes, raf;

    const AMBER = 'rgba(245, 158, 11,';
    const BLUE  = 'rgba(30, 50, 70,';

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = document.documentElement.scrollHeight;
        createNodes();
    }

    function createNodes() {
        const density = Math.floor((W * H) / 25000);
        const count   = Math.min(density, 100);
        nodes = Array.from({ length: count }, () => ({
            x:     Math.random() * W,
            y:     Math.random() * H,
            vx:    (Math.random() - 0.5) * 0.25,
            vy:    (Math.random() - 0.5) * 0.25,
            r:     Math.random() * 1.8 + 0.8,
            pulse: Math.random() * Math.PI * 2,
            bright: Math.random() > 0.85,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Update
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            n.pulse += 0.018;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });

        // Connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const alpha = (1 - dist / 180) * 0.35;
                    ctx.beginPath();
                    ctx.strokeStyle = `${BLUE} ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        // Nodes
        nodes.forEach(n => {
            const glow = 0.5 + 0.5 * Math.sin(n.pulse);
            if (n.bright) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `${AMBER} ${0.05 * glow})`;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = n.bright
                ? `${AMBER} ${0.5 + glow * 0.4})`
                : `${BLUE}  ${0.4 + glow * 0.15})`;
            ctx.fill();
        });

        raf = requestAnimationFrame(draw);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            cancelAnimationFrame(raf);
            resize();
            draw();
        }, 200);
    });

    resize();
    draw();
})();


/* ────────────────────────────────────────
   CUSTOM CURSOR
──────────────────────────────────────── */
(function initCursor() {
    const ring = document.getElementById('cursor-ring');
    const dot  = document.getElementById('cursor-dot');
    if (!ring || !dot) return;

    let ringX = 0, ringY = 0;
    let dotX  = 0, dotY  = 0;

    window.addEventListener('mousemove', e => {
        dotX  = e.clientX;
        dotY  = e.clientY;
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animateCursor() {
        ringX = lerp(ringX, dotX, 0.12);
        ringY = lerp(ringY, dotY, 0.12);
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        dot.style.left  = dotX  + 'px';
        dot.style.top   = dotY  + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
})();


/* ────────────────────────────────────────
   TYPEWRITER
──────────────────────────────────────── */
(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'Analista de NOC',
        'Especialista em Redes',
        'GPON / EPON Engineer',
        'Infraestrutura & TI',
        'Troubleshooting L2/L3',
    ];

    let pi = 0, ci = 0, deleting = false;

    function type() {
        const current = phrases[pi];
        if (!deleting) {
            el.textContent = current.slice(0, ++ci);
            if (ci === current.length) {
                deleting = true;
                setTimeout(type, 2200);
                return;
            }
        } else {
            el.textContent = current.slice(0, --ci);
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
                setTimeout(type, 300);
                return;
            }
        }
        setTimeout(type, deleting ? 42 : 68);
    }

    setTimeout(type, 2000);
})();


/* ────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────── */
(function initReveal() {
    const els = document.querySelectorAll('.reveal-up');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => obs.observe(el));
})();


/* ────────────────────────────────────────
   ANIMATED COUNTERS
──────────────────────────────────────── */
(function initCounters() {
    const counters = document.querySelectorAll('.metric-num[data-count]');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el  = entry.target;
            const end = parseInt(el.dataset.count);
            const dur = 1600;
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / dur, 1);
                const eased    = 1 - Math.pow(1 - progress, 4);
                el.textContent = Math.round(eased * end);
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = end;
            }
            requestAnimationFrame(update);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => obs.observe(c));
})();


/* ────────────────────────────────────────
   SKILL BARS ANIMATION
──────────────────────────────────────── */
(function initSkillBars() {
    const fills = document.querySelectorAll('.sb-fill[data-w]');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            setTimeout(() => {
                el.style.width = el.dataset.w + '%';
            }, 100);
            obs.unobserve(el);
        });
    }, { threshold: 0.3 });

    fills.forEach(f => obs.observe(f));
})();


/* ────────────────────────────────────────
   SIDEBAR ACTIVE SECTION
──────────────────────────────────────── */
(function initSidebarActive() {
    const links    = document.querySelectorAll('.sb-link');
    const sections = document.querySelectorAll('section[id]');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            links.forEach(l => {
                l.classList.toggle('active', l.dataset.section === id);
            });
        });
    }, { threshold: 0.4 });

    sections.forEach(s => obs.observe(s));
})();


/* ────────────────────────────────────────
   MOBILE MENU
──────────────────────────────────────── */
(function initMobileMenu() {
    const btn     = document.getElementById('mob-menu-btn');
    const overlay = document.getElementById('mob-overlay');
    const links   = document.querySelectorAll('.mob-link');
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

    links.forEach(l => l.addEventListener('click', close));
})();


/* ────────────────────────────────────────
   CERTIFICATE FILTER
──────────────────────────────────────── */
(function initCertFilter() {
    const tabs  = document.querySelectorAll('.ftab');
    const cards = document.querySelectorAll('.cert-card[data-cat]');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            cards.forEach(card => {
                const match = filter === 'all' || card.dataset.cat === filter;
                card.style.transition = 'opacity 0.3s, transform 0.3s';
                if (match) {
                    card.classList.remove('hidden');
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96)';
                    setTimeout(() => { card.classList.add('hidden'); }, 300);
                }
            });
        });
    });
})();


/* ────────────────────────────────────────
   LIGHTBOX
──────────────────────────────────────── */
(function initLightbox() {
    const lb     = document.getElementById('lightbox');
    const lbImg  = document.getElementById('lb-img');
    const close  = document.getElementById('lb-close');
    const back   = lb?.querySelector('.lb-backdrop');
    if (!lb) return;

    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (!img) return;
            lbImg.src = img.src;
            lbImg.alt = img.alt;
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLB() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { lbImg.src = ''; }, 300);
    }

    close.addEventListener('click', closeLB);
    back.addEventListener('click', closeLB);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
})();


/* ────────────────────────────────────────
   SMOOTH SCROLL (nav links)
──────────────────────────────────────── */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();


/* ────────────────────────────────────────
   TILT EFFECT ON TERMINAL CARD
──────────────────────────────────────── */
(function initTilt() {
    const cards = document.querySelectorAll('.terminal-card, .deco-frame, .hero-metrics');
    if (window.matchMedia('(max-width: 900px)').matches) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect   = card.getBoundingClientRect();
            const cx     = rect.left + rect.width  / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = (e.clientX - cx) / (rect.width  / 2);
            const dy     = (e.clientY - cy) / (rect.height / 2);
            card.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
})();