document.documentElement.classList.add('js');

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add('visible'));
}

// Project galleries
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('img') : null;

document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const main = gallery.querySelector('.gallery-main img');
    const caption = gallery.querySelector('.gallery-caption');
    const buttons = gallery.querySelectorAll('.thumbs button');

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const img = btn.querySelector('img');
            main.src = img.src;
            main.alt = img.alt;
            if (caption) caption.textContent = img.alt;
            buttons.forEach((b) => b.removeAttribute('aria-current'));
            btn.setAttribute('aria-current', 'true');
        });
    });

    gallery.querySelector('.gallery-main').addEventListener('click', () => {
        if (!lightbox || typeof lightbox.showModal !== 'function') {
            window.open(main.src, '_blank', 'noopener');
            return;
        }
        lightboxImg.src = main.src;
        lightboxImg.alt = main.alt;
        lightbox.showModal();
    });
});

if (lightbox) {
    lightbox.addEventListener('click', () => lightbox.close());
}
