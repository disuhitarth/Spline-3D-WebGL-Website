<div align="center">
  <img src="https://i.ibb.co/CKh9RvVj/Screenshot-2026-02-20-at-3-31-00-AM.png" alt="BOLO CREATE Website Preview" width="100%" style="border-radius: 14px; margin-bottom: 24px;" border="0">

  # BOLO CREATE — Spline 3D E-Commerce Experience
  **The all-in-one platform for 3D and design — Reimagined as a premium Print & Merch Store.**

  ![HTML5](https://img.shields.io/badge/HTML5-0A0A0A?style=for-the-badge&logo=html5&logoColor=3A7BFD)
  ![Vanilla CSS](https://img.shields.io/badge/CSS3-161616?style=for-the-badge&logo=css3&logoColor=A855F7)
  ![Vanilla JS](https://img.shields.io/badge/JavaScript-1E1E1E?style=for-the-badge&logo=javascript&logoColor=EC4899)
  ![Spline 3D](https://img.shields.io/badge/Spline_3D-0A0A0A?style=for-the-badge&logo=spline&logoColor=22C55E)

  <p align="center">
    Built by <b>Hitarth Mehta</b>
  </p>

  <p align="center">
    <b><a href="https://bolocreate.netlify.app">🚀 View Live Demo</a></b>
  </p>
</div>

---

## ✦ Overview

A blazingly fast, vanilla web application that fuses high-end **dark-space premium aesthetics** with **interactive WebGL 3D elements** (powered by Spline). This project serves as a fully functional front-end e-commerce concept for a modern print and branding agency (BOLO CREATE), showcasing how immersive 3D, micro-interactions, and premium styling can elevate the standard shopping experience.

---

## ✦ Key Features

- **Interactive 3D Hero & Elements:** A centerpiece Spline 3D rig that tracks mouse movements, integrated flawlessly with a toggle to disable tracking for performance on low-end devices.
- **Custom Magnetic Cursor:** A sleek, neon-green trailing dot and ring that snaps aggressively to interactive elements with exclusion blend modes.
- **Instant Live Search & Filtering:** A highly-optimized vanilla JS product grid (48 items) that filters alphabetically, by price, and via instant keystroke search without page reloads.
- **Cinematic Page Transitions:** Smooth fade-in and out routines that intercept internal clicks, effectively mimicking a Single-Page Application (SPA) without the heavy React/Next.js bundle footprint.
- **Scroll-Aware Neon Marquee:** An infinite scrolling ticker that aggressively changes speed and direction based on the user's immediate scroll velocity.
- **Premium Toast Notifications:** A glassmorphic toast alert system providing immediate feedback for cart interactions, replacing clunky default alerts.

---

## ✦ Design System Philosophy

This interface is heavily inspired by modern developer and 3D web tooling aesthetics. Elements are designed to feel weightless but punchy.

*   **Canvas:** Near-black (`#0A0A0A`) overlaid with subtle violet and electric blue radial glows.
*   **Typography:** [Inter](https://fonts.google.com/specimen/Inter). Display headers are aggressively tight (tracking `-0.04em`) with white-to-transparent text clipping.
*   **Components:** 100px border-radius full pills for CTAs, 14px rounded glassmorphism cards (`rgba(22, 22, 22, 0.8)`) with `backdrop-filter: blur(12px)`.
*   **Motion:** Spring-based transitions and non-linear micro-hovers. Everything responds energetically to the user.

---

## ✦ Execution

This project completely avoids monolithic frontend frameworks. It is orchestrated purely via:
1. `index.html` / `shop.html`
2. Hand-crafted CSS layout systems using Grid, Flexbox, and CSS Variables.
3. Lightweight DOM-manipulation JavaScript (`main.js`, `shop.js`, `cursor.js`, `trans.js`).

Performance is prioritized through `IntersectionObserver` scroll reveals, CSS `will-change` hardware acceleration, and defensive media querying for `prefers-reduced-motion` and `pointer: fine`.

---

## ✦ Hosting & Deployment

This project is inherently a Static Site. It requires zero build steps, bundlers, or server-side rendering (SSR), and is hosted live through **Netlify's** continuous deployment.

🌐 **Live Website:** [bolocreate.netlify.app](https://bolocreate.netlify.app)

<br>

<div align="center">
  <i>"Where small gets big."</i>
</div>
