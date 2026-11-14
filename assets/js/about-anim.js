// ===== About page: scroll animations =====
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('anim')) return; // reduced motion: everything stays static
  window.__animReady = true;

  // 1. Split headings into words
  document.querySelectorAll('[data-reveal="split"]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
  });

  // 2. Delays
  document.querySelectorAll('[data-delay]').forEach(el => el.style.setProperty('--d', el.dataset.delay + 'ms'));

  // 3. Count-up numbers
  const countUp = el => {
    const end = +el.dataset.count, suffix = el.dataset.suffix || '', t0 = performance.now(), dur = 1800;
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0' + suffix;
    requestAnimationFrame(tick);
  };

  // 4. Reveal on scroll
  // (clipped images are watched through their parent, since a fully clipped image never "intersects")
  const reveal = el => {
    if (el.classList.contains('is-in')) return;
    el.classList.add('is-in');
    el.querySelectorAll('[data-count]').forEach(countUp);
  };
  const watchTarget = el => el.dataset.reveal === 'clip' ? el.parentElement : el;
  const pending = new Map();
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      (pending.get(entry.target) || []).forEach(reveal);
      pending.delete(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const t = watchTarget(el);
    if (!pending.has(t)) { pending.set(t, []); io.observe(t); }
    pending.get(t).push(el);
  });
  // Anything already scrolled past (e.g. after a fast jump) is revealed straight away
  const revealPassed = () => pending.forEach((els, t) => {
    if (t.getBoundingClientRect().bottom < 0) { els.forEach(reveal); pending.delete(t); io.unobserve(t); }
  });

  // 5. Scroll-linked effects (parallax, flowing words, steps line, progress bar)
  const parallax = [...document.querySelectorAll('[data-parallax]')];
  const flows = [...document.querySelectorAll('[data-flow]')];
  const bar = document.querySelector('.scroll-progress');
  const stepsList = document.querySelector('[data-steps]');
  const stepsLine = stepsList && stepsList.querySelector('.steps__progress');
  const stepItems = stepsList ? [...stepsList.querySelectorAll('li[data-reveal]')] : [];
  if (stepsLine) stepsLine.style.setProperty('--p', 0);

  let ticking = false;
  const update = () => {
    const vh = innerHeight, y = scrollY;
    const max = document.documentElement.scrollHeight - vh;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    parallax.forEach(el => {
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });

    flows.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const dir = parseFloat(el.dataset.flow);
      const shift = (vh - r.top) * 0.45 * dir - (dir > 0 ? el.scrollWidth * 0.35 : 0);
      el.style.transform = `translate3d(${shift.toFixed(1)}px, 0, 0)`;
    });

    if (stepsList) {
      const r = stepsList.getBoundingClientRect();
      const p = Math.min(Math.max((vh * 0.8 - r.top) / (vh * 0.45), 0), 1);
      if (stepsLine) stepsLine.style.setProperty('--p', p.toFixed(3));
      const mobile = innerWidth <= 768;
      stepItems.forEach((li, i) => {
        const at = stepItems.length > 1 ? i / (stepItems.length - 1) : 0;
        li.classList.toggle('is-on', mobile ? li.classList.contains('is-in') : p >= at - 0.001 && p > 0);
      });
    }
    revealPassed();
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  update();

  // 6. Pillar cards follow the mouse in 3D (desktop only)
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        if (!card.classList.contains('is-in')) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.classList.add('is-tilting');
        card.style.transform = `rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) translateZ(10px)`;
        card.style.setProperty('--mx', x * 100 + '%');
        card.style.setProperty('--my', y * 100 + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        setTimeout(() => card.classList.remove('is-tilting'), 150);
      });
    });
  }
})();
