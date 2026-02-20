/* ═══════════════════════════════════════════════════
   trans.js — BOLO CREATE
   Handles smooth fade-in/out transitions between pages.
═══════════════════════════════════════════════════ */

// Initialize immediately so it blocks the page from rendering naked
document.documentElement.style.backgroundColor = '#0a0a0d'; // Match body dark

document.addEventListener('DOMContentLoaded', () => {
    // Inject the overlay into the body
    const overlay = document.createElement('div');
    overlay.className = 'page-trans-overlay';
    document.body.appendChild(overlay);

    // Fade in on load
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.classList.add('page-trans-overlay--loaded');
        });
    });

    // Intercept clicks on links pointing to other pages
    document.addEventListener('click', (e) => {
        // Find closest anchor tag
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        // Ignore links without href, anchors, javascript links, and open-in-new-tab links
        if (!href ||
            href.startsWith('#') ||
            href.startsWith('javascript:') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:') ||
            link.target === '_blank' ||
            e.ctrlKey || e.metaKey // Let user handle new tab open manually
        ) {
            return;
        }

        // If it's an internal actual page link (like index.html or shop.html), fade out
        if (!href.startsWith('http') || href.includes(window.location.hostname)) {
            e.preventDefault();
            overlay.classList.remove('page-trans-overlay--loaded');

            // Wait for fade to finish before navigating
            setTimeout(() => {
                window.location.href = href;
            }, 300); // 300ms matches the CSS transition time
        }
    });
});
