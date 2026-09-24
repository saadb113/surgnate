/* ==========================================================================
   SURGNATE — Shared site behaviour
   Preloader, nav, scroll reveals, counters, toast, inquiry list, FAQ, footer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  if (preloader){
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('done'), 250);
    });
    // safety fallback in case load event is delayed
    setTimeout(() => preloader.classList.add('done'), 1800);
  }

  /* ---------- Header scroll state ---------- */
  const header = document.querySelector('header.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
    backToTop && backToTop.classList.toggle('show', window.scrollY > 500);
  };
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Mobile nav ---------- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  const scrim = document.querySelector('.nav-scrim');
  const toggleNav = (open) => {
    burger?.classList.toggle('open', open);
    mobileNav?.classList.toggle('open', open);
    scrim?.classList.toggle('open', open);
    document.body.classList.toggle('nav-lock', open);
  };
  burger?.addEventListener('click', () => toggleNav(!mobileNav.classList.contains('open')));
  scrim?.addEventListener('click', () => toggleNav(false));
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleNav(false)));

  /* ---------- Active nav link ---------- */
  const path = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const clean = href.split('#')[0];
    if (clean === path || (clean === 'index.html' && (path === '' || path === '/'))) {
      a.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el, i) => {
      const group = el.closest('[data-stagger]');
      if (group) el.style.setProperty('--d', [...group.children].indexOf(el));
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Count-up stats ---------- */
  const counters = document.querySelectorAll('.count-up');
  if ('IntersectionObserver' in window && counters.length){
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count || el.textContent);
        const decimals = (el.dataset.count || '').includes('.') ? 1 : 0;
        const duration = 1600;
        const start = performance.now();
        const suffix = el.dataset.suffix || '';
        function tick(now){
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        cIo.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cIo.observe(el));
  }

  /* ---------- Marquee: duplicate content for seamless loop ---------- */
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- Toast ---------- */
  window.showToast = function (message, icon) {
    let toast = document.querySelector('.toast');
    if (!toast){
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `<span data-icon="${icon || 'check'}"></span><span class="toast-msg"></span>`;
      document.body.appendChild(toast);
      paintIcons(toast);
    }
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  /* ---------- Newsletter (front-end only) ---------- */
  document.querySelectorAll('.footer-newsletter').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.trim()){
        showToast('Thanks — you’re on the list.', 'mail');
        input.value = '';
      }
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());
});

/* ---------- Helper: send a visitor to Contact with product context pre-filled ---------- */
function requestQuoteFor(productName, qty){
  const params = new URLSearchParams();
  params.set('product', productName);
  if (qty) params.set('qty', qty);
  window.location.href = 'contact.html?' + params.toString();
}
