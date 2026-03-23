// =============================================
// AGIDIGBO 88.7FM — MAIN JAVASCRIPT
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ── NAVBAR SCROLL EFFECT ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── ACTIVE NAV LINK ON SCROLL ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observerNav.observe(s));

    // ── HAMBURGER MENU ──
    const hamburger = document.getElementById('hamburger');
    const navLinksEl = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinksEl.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        const isOpen = navLinksEl.classList.contains('open');
        spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = isOpen ? '0' : '1';
        spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });

    // Close menu on nav link click
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksEl.classList.remove('open');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });

    // ── SCROLL REVEAL ANIMATION ──
    const revealEls = document.querySelectorAll('.section > .section-container, .staff-card, .milestone, .pillar');
    revealEls.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── SMOOTH SCROLL for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 76;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

    // ── CONTACT FORM FEEDBACK ──
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.textContent = '✅ Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #2e7a4a, #1a4a2e)';
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        });
    }

    // ── STAFF CARDS STAGGER ──
    const staffCards = document.querySelectorAll('.staff-card');
    const staffObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            staffCards.forEach((card, i) => {
                setTimeout(() => card.classList.add('visible'), i * 120);
            });
            staffObserver.disconnect();
        }
    }, { threshold: 0.1 });

    const staffSection = document.querySelector('.staff');
    if (staffSection) staffObserver.observe(staffSection);

    // ── LISTEN LIVE BUTTON FEEDBACK ──
    const listenBtn = document.querySelector('.btn-primary');
    if (listenBtn && listenBtn.textContent.trim().includes('Listen')) {
        listenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const txt = listenBtn.innerHTML;
            listenBtn.innerHTML = '🔴 &nbsp;Connecting...';
            setTimeout(() => { listenBtn.innerHTML = txt; }, 2000);
        });
    }

});
