// ═══════════════════════════════════════════════════
// CUSTOM MAGNETIC CURSOR
// ═══════════════════════════════════════════════════

// Only initialize on devices with a fine pointer (mouse/trackpad)
if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHovering = false;

    // Fast dot tracking
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth ring follow using requestAnimationFrame
    const render = () => {
        // Easing interpolation
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        const scale = isHovering ? 1.5 : 1;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(${scale})`;

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Function to bind hover events to an element
    const bindHover = (el) => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            ring.classList.add('hovered');
            dot.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            isHovering = false;
            ring.classList.remove('hovered');
            dot.classList.remove('hovered');
        });
    };

    // Bind initially
    const interactiveSelectors = 'a, button, input, select, textarea, .product-card, .work-card, .nav__logo';
    document.querySelectorAll(interactiveSelectors).forEach(bindHover);

    // Mutation Observer to bind dynamically added elements (like shop products)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        if (node.matches && node.matches(interactiveSelectors)) {
                            bindHover(node);
                        }
                        const children = node.querySelectorAll ? node.querySelectorAll(interactiveSelectors) : [];
                        children.forEach(bindHover);
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
