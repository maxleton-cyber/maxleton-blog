// Cyberpunk Blog Theme — Main JS
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons (in case of dynamic content)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Nav scroll state
    var nav = document.getElementById('global-nav');
    if (nav) {
        var onScroll = function () {
            if (window.scrollY > 10) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Mobile sidebar
    var sidebar = document.getElementById('mobile-sidebar');
    var overlay = document.getElementById('mobile-sidebar-overlay');
    var openBtn = document.getElementById('mobile-menu-btn');
    var closeBtn = document.getElementById('mobile-close-btn');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // TOC scroll highlight
    var toc = document.getElementById('cb-toc');
    if (toc) {
        var headings = document.querySelectorAll('.cb-article-body h1[id], .cb-article-body h2[id], .cb-article-body h3[id]');
        var tocLinks = toc.querySelectorAll('a');
        if (headings.length > 0 && tocLinks.length > 0) {
            var tocMap = {};
            tocLinks.forEach(function (link) {
                var href = link.getAttribute('href');
                if (href && href.charAt(0) === '#') {
                    tocMap[href.substring(1)] = link;
                }
            });

            var current = null;

            function updateToc() {
                var scrollY = window.scrollY + 100;
                var lastHeading = null;

                headings.forEach(function (heading) {
                    if (heading.offsetTop <= scrollY) {
                        lastHeading = heading;
                    }
                });

                if (lastHeading && lastHeading.id !== current) {
                    current = lastHeading.id;
                    tocLinks.forEach(function (link) {
                        link.classList.remove('cb-toc-active');
                    });
                    if (tocMap[lastHeading.id]) {
                        tocMap[lastHeading.id].classList.add('cb-toc-active');
                    }
                }

                if (scrollY < headings[0].offsetTop - 100) {
                    current = null;
                    tocLinks.forEach(function (link) {
                        link.classList.remove('cb-toc-active');
                    });
                }
            }

            window.addEventListener('scroll', updateToc, { passive: true });
            updateToc();
        }
    }

    // Timeline drawer (archive page)
    document.querySelectorAll('.cb-timeline-year-header').forEach(function (header) {
        header.addEventListener('click', function () {
            var group = this.parentElement;
            var isOpen = group.classList.toggle('open');
            this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

    // Month drawer (second level)
    document.querySelectorAll('.cb-timeline-month-header').forEach(function (header) {
        header.addEventListener('click', function () {
            var group = this.parentElement;
            var isOpen = group.classList.toggle('open');
            this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });
});
