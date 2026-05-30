/* Corporate Arts — interactions */
(function () {
  'use strict';

  /* ---- nav scrolled state ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  function closeMenu() { menu.classList.remove('open'); }
  burger.addEventListener('click', function () { menu.classList.toggle('open'); });
  Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* ---- active link on scroll (scrollspy) ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var map = {};
  links.forEach(function (l) {
    var id = l.getAttribute('href').slice(1);
    var sec = document.getElementById(id);
    if (sec) map[id] = { link: l, sec: sec };
  });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        var id = e.target.id;
        if (map[id]) map[id].link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  Object.keys(map).forEach(function (id) { spy.observe(map[id].sec); });

  /* ---- reveal on scroll ---- */
  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); revealer.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
    revealer.observe(el);
  });

  /* ---- floating CMYK dots in hero ---- */
  var dots = document.getElementById('dots');
  if (dots) {
    var colors = ['var(--cyan)', 'var(--magenta)', 'var(--yellow)'];
    var specs = [
      { s: 360, x: 72, y: 10, c: 0, dur: 18 },
      { s: 280, x: 6, y: 52, c: 1, dur: 22 },
      { s: 200, x: 50, y: 68, c: 2, dur: 26 },
      { s: 150, x: 86, y: 60, c: 1, dur: 20 }
    ];
    specs.forEach(function (sp, i) {
      var d = document.createElement('span');
      d.className = 'dot';
      d.style.width = sp.s + 'px';
      d.style.height = sp.s + 'px';
      d.style.left = sp.x + '%';
      d.style.top = sp.y + '%';
      d.style.background = 'radial-gradient(circle at 35% 35%, ' + colors[sp.c] + ', transparent 70%)';
      d.style.animation = 'floatDot' + i + ' ' + sp.dur + 's ease-in-out infinite alternate';
      dots.appendChild(d);
      var kf = '@keyframes floatDot' + i + '{from{transform:translate(0,0)}to{transform:translate(' +
        (i % 2 ? -40 : 40) + 'px,' + (i % 2 ? 50 : -50) + 'px)}}';
      var st = document.createElement('style');
      st.textContent = kf;
      document.head.appendChild(st);
    });
  }

  /* ---- hero headline accent word rotation ---- */
  var swap = document.querySelector('.hero h1 .swap');
  if (swap) {
    var words = ['customer experience.', 'audience\u2019s heart.', 'next chapter.', 'boldest ideas.'];
    var i = 0;
    setInterval(function () {
      if (document.body.getAttribute('data-motion') === 'off') return;
      i = (i + 1) % words.length;
      swap.style.transition = 'opacity .35s, transform .35s';
      swap.style.opacity = '0';
      swap.style.transform = 'translateY(8px)';
      setTimeout(function () {
        swap.textContent = words[i];
        swap.style.opacity = '1';
        swap.style.transform = 'none';
      }, 360);
    }, 3200);
  }

  /* ---- contact form (fake submit) ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.checkValidity();
      if (!ok) { form.reportValidity(); return; }
      document.getElementById('formMsg').style.display = 'block';
      var btn = document.getElementById('submitBtn');
      btn.firstChild.textContent = 'Sent ';
      form.reset();
    });
  }
})();
