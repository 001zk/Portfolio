/* ============================================
   LUIZ GUSTAVO · PORTFOLIO SCRIPT
   - Network canvas background
   - Scroll-triggered fade-ins
   - Staggered animations
   - Lightbox
   ============================================ */

// ---- NETWORK CANVAS ----
(function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, nodes, animFrame;

    const ACCENT = 'rgba(245, 160, 0,';
    const DIM    = 'rgba(30, 45, 58,';

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = document.documentElement.scrollHeight;
        buildNodes();
    }

    function buildNodes() {
        const count = Math.floor((W * H) / 28000);
        nodes = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 2 + 1,
            pulse: Math.random() * Math.PI * 2,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            n.pulse += 0.02;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    const alpha = (1 - dist / 160) * 0.4;
                    ctx.beginPath();
                    ctx.strokeStyle = `${DIM} ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        nodes.forEach(n => {
            const glow = 0.5 + 0.5 * Math.sin(n.pulse);
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = n.r > 2 
                ? `${ACCENT} ${0.4 + glow * 0.4})`
                : `${DIM} ${0.5 + glow * 0.2})`;
            ctx.fill();
        });

        animFrame = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animFrame);
        resize();
        draw();
    });

    resize();
    draw();
})();


// ---- SCROLL FADE-IN ----
(function initFadeIn() {
    const sectionEls = document.querySelectorAll('.fade');
    const itemEls    = document.querySelectorAll('.fade-item');

    const sectionObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const itemObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger siblings in same parent
                const siblings = entry.target.parentElement.querySelectorAll('.fade-item');
                siblings.forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), i * 80);
                });
                itemObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sectionEls.forEach(el => sectionObs.observe(el));
    itemEls.forEach(el => itemObs.observe(el));
})();


// ---- LIGHTBOX ----
(function initLightbox() {
    const lightbox  = document.getElementById('lightbox');
    const lbImg     = document.getElementById('lightbox-img');
    const lbClose   = document.querySelector('.lightbox-close');
    const lbBackdrop = document.querySelector('.lightbox-backdrop');

    if (!lightbox) return;

    document.querySelectorAll('.cert-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            if (!img) return;
            lbImg.src = img.src;
            lbImg.alt = img.alt;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lbImg.src = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    lbBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
})();