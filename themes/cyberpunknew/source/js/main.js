/* Monowire — theme behaviour */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initDrawer();
    initToc();
    initTimeline();
  });

  function initDrawer() {
    var drawer = document.getElementById('drawer');
    var overlay = document.getElementById('drawer-overlay');
    var openBtn = document.getElementById('drawer-open');
    var closeBtn = document.getElementById('drawer-close');
    if (!drawer || !overlay || !openBtn) return;

    var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var isOpen = false;

    function setInert(on) {
      if ('inert' in HTMLElement.prototype) drawer.inert = on;
    }

    function open() {
      isOpen = true;
      setInert(false);
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      openBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setInert(true);
      openBtn.focus();
    }

    openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        close();
        return;
      }

      if (e.key !== 'Tab') return;

      var items = drawer.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    setInert(true);
  }

  /* Highlight the heading currently in view */
  function initToc() {
    var toc = document.getElementById('cb-toc');
    if (!toc || !('IntersectionObserver' in window)) return;

    var links = {};
    Array.prototype.forEach.call(toc.querySelectorAll('a[href^="#"]'), function (link) {
      links[decodeURIComponent(link.getAttribute('href').slice(1))] = link;
    });

    var headings = Array.prototype.filter.call(
      document.querySelectorAll('.cb-prose h1[id], .cb-prose h2[id], .cb-prose h3[id]'),
      function (h) { return links[h.id]; }
    );
    if (!headings.length) return;

    var visible = new Set();

    function highlight() {
      var active = null;
      for (var i = 0; i < headings.length; i++) {
        if (visible.has(headings[i].id)) { active = headings[i].id; break; }
      }
      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle('is-active', id === active);
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      highlight();
    }, { rootMargin: '-80px 0px -70% 0px' });

    headings.forEach(function (h) { observer.observe(h); });
  }

  /* Archive drawers — years and months */
  function initTimeline() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.cb-tl-btn, .cb-tl-month-btn');
      if (!btn) return;

      var group = btn.parentElement;
      var open = group.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
