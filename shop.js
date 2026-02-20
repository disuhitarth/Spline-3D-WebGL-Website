/* ═══════════════════════════════════════════════════
   SHOP.JS — BOLO CREATE E-Commerce Store Logic
   Features: Product catalog, Cart, Checkout (Stripe-ready),
             Category/price filtering, Sort, Quick-view
═══════════════════════════════════════════════════ */

'use strict';

// ─── PRODUCT CATALOG ─────────────────────────────────────────
// Each product has: id, name, category (top-level), subcategory,
// price (starting), priceNote, badge, emoji, gradient, description,
// options (array of size/qty variants), featured, isNew
const PRODUCTS = [

    /* ── BUSINESS ESSENTIALS ── */
    {
        id: 'bc-001', name: 'Premium Business Cards', category: 'business-essentials',
        subcategory: 'business-cards', price: 9.99, priceNote: 'per 100',
        badge: 'BESTSELLER', emoji: '💳',
        gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)',
        description: 'Professional business cards on ultra-thick 16pt card stock with a silky matte or gloss finish. Full-colour front & back printing.',
        options: ['100 cards', '250 cards', '500 cards', '1,000 cards', '2,500 cards'],
        featured: true, isNew: false
    },
    {
        id: 'bc-002', name: 'Luxury Soft-Touch Cards', category: 'business-essentials',
        subcategory: 'business-cards', price: 19.99, priceNote: 'per 100',
        badge: 'POPULAR', emoji: '✨',
        gradient: 'linear-gradient(135deg, #2d1b4e 0%, #0d0a1e 100%)',
        description: 'Velvet soft-touch lamination with optional gold or silver foil embossing. Make a lasting first impression.',
        options: ['100 cards', '250 cards', '500 cards'],
        featured: false, isNew: true
    },
    {
        id: 'lh-001', name: 'Custom Letterhead', category: 'business-essentials',
        subcategory: 'letterhead', price: 16.99, priceNote: 'per 25',
        badge: null, emoji: '📄',
        gradient: 'linear-gradient(135deg, #1a2a1a 0%, #0a0f0a 100%)',
        description: 'Branded letterhead on 60lb premium paper stock. Makes every communication feel professional.',
        options: ['25 sheets', '50 sheets', '100 sheets', '250 sheets'],
        featured: false, isNew: false
    },
    {
        id: 'env-001', name: 'Printed Envelopes', category: 'business-essentials',
        subcategory: 'envelopes', price: 12.99, priceNote: 'per 25',
        badge: null, emoji: '✉️',
        gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)',
        description: 'Custom printed envelopes with your return address and branding. Available in #10 business and A2 sizes.',
        options: ['25 envelopes', '50 envelopes', '100 envelopes', '250 envelopes'],
        featured: false, isNew: false
    },
    {
        id: 'fld-001', name: 'Presentation Folders', category: 'business-essentials',
        subcategory: 'folders', price: 29.99, priceNote: 'per 10',
        badge: null, emoji: '📁',
        gradient: 'linear-gradient(135deg, #1e2a3a 0%, #0a1018 100%)',
        description: 'Heavy-duty 14pt presentation folders with business card slits. Perfect for proposals, sales kits, and client meetings.',
        options: ['10 folders', '25 folders', '50 folders', '100 folders'],
        featured: false, isNew: false
    },
    {
        id: 'nc-001', name: 'Branded Note Cards', category: 'business-essentials',
        subcategory: 'note-cards', price: 18.99, priceNote: 'per 25',
        badge: null, emoji: '🗒️',
        gradient: 'linear-gradient(135deg, #2a1e1e 0%, #100a0a 100%)',
        description: 'Custom folded note cards for handwritten messages, thank-you notes, and brand touchpoints.',
        options: ['25 cards', '50 cards', '100 cards'],
        featured: false, isNew: false
    },

    /* ── MARKETING MATERIALS ── */
    {
        id: 'fl-001', name: 'Custom Flyers', category: 'marketing-materials',
        subcategory: 'flyers', price: 14.99, priceNote: 'per 100',
        badge: 'BESTSELLER', emoji: '📢',
        gradient: 'linear-gradient(135deg, #1a2e1e 0%, #0a1a0d 100%)',
        description: 'Full-colour promotional flyers on 60–100lb paper stocks. A4, letter, and half-size options available. Fast turnaround.',
        options: ['100 flyers', '250 flyers', '500 flyers', '1,000 flyers', '2,500 flyers'],
        featured: true, isNew: false
    },
    {
        id: 'br-001', name: 'Tri-Fold Brochures', category: 'marketing-materials',
        subcategory: 'brochures', price: 24.99, priceNote: 'per 50',
        badge: 'POPULAR', emoji: '📖',
        gradient: 'linear-gradient(135deg, #1a1e2e 0%, #0a0d1a 100%)',
        description: 'Professional tri-fold or bi-fold brochures on gloss or matte 100lb text stock. 6 panels of full-colour impact.',
        options: ['50 brochures', '100 brochures', '250 brochures', '500 brochures'],
        featured: true, isNew: false
    },
    {
        id: 'pc-001', name: 'Postcards', category: 'marketing-materials',
        subcategory: 'postcards', price: 16.99, priceNote: 'per 100',
        badge: null, emoji: '📬',
        gradient: 'linear-gradient(135deg, #2a1e2a 0%, #100a10 100%)',
        description: 'Direct-mail postcards in 4×6, 5×7, or 6×9 sizes. USPS-compliant or full custom design. Great for promotions and events.',
        options: ['100 cards', '250 cards', '500 cards', '1,000 cards'],
        featured: false, isNew: false
    },
    {
        id: 'dh-001', name: 'Door Hangers', category: 'marketing-materials',
        subcategory: 'door-hangers', price: 18.99, priceNote: 'per 50',
        badge: null, emoji: '🚪',
        gradient: 'linear-gradient(135deg, #1e2a1a 0%, #0d1a0a 100%)',
        description: 'Custom door hangers with die-cut hole. Perfect for local marketing campaigns, real estate, and service businesses.',
        options: ['50 units', '100 units', '250 units', '500 units'],
        featured: false, isNew: false
    },
    {
        id: 'bk-001', name: 'Booklets & Catalogues', category: 'marketing-materials',
        subcategory: 'booklets', price: 39.99, priceNote: 'per 25',
        badge: null, emoji: '📚',
        gradient: 'linear-gradient(135deg, #2a2a1a 0%, #1a1a0a 100%)',
        description: 'Saddle-stitched or perfect-bound booklets, product catalogues, and look-books. 8–100+ pages.',
        options: ['25 (8pg)', '25 (16pg)', '25 (32pg)', '50 (8pg)', '100 (8pg)'],
        featured: false, isNew: false
    },
    {
        id: 'tt-001', name: 'Table Tents', category: 'marketing-materials',
        subcategory: 'table-tents', price: 16.99, priceNote: 'per 25',
        badge: null, emoji: '🍽️',
        gradient: 'linear-gradient(135deg, #1e1a2a 0%, #0a0d1a 100%)',
        description: 'Freestanding table tent cards for restaurants, hotels, trade shows, and events. A-frame design, full colour.',
        options: ['25 units', '50 units', '100 units'],
        featured: false, isNew: false
    },

    /* ── SIGNS & DISPLAYS ── */
    {
        id: 'ru-001', name: 'Roll-Up Banner Stand', category: 'signs-displays',
        subcategory: 'roll-up-banners', price: 59.99, priceNote: 'each',
        badge: 'POPULAR', emoji: '🎌',
        gradient: 'linear-gradient(135deg, #1a2440 0%, #0a0f20 100%)',
        description: '33"×80" retractable roll-up banner with aluminum base and carry bag included. Full-colour print on wrinkle-resistant polyester.',
        options: ['33×80" Standard', '36×80" Wide', '48×80" Premium'],
        featured: true, isNew: false
    },
    {
        id: 'vb-001', name: 'Vinyl Banners', category: 'signs-displays',
        subcategory: 'vinyl-banners', price: 39.99, priceNote: 'each',
        badge: 'BESTSELLER', emoji: '🏳️',
        gradient: 'linear-gradient(135deg, #24201a 0%, #100d0a 100%)',
        description: 'Heavy-duty 13oz vinyl banners with hemmed edges and metal grommets. Weatherproof for indoor & outdoor use. Custom sizes available.',
        options: ['2×4 ft', '3×6 ft', '4×8 ft', '5×10 ft', '6×12 ft', 'Custom size'],
        featured: true, isNew: false
    },
    {
        id: 'ff-001', name: 'Feather Flags', category: 'signs-displays',
        subcategory: 'feather-flags', price: 69.99, priceNote: 'each',
        badge: null, emoji: '🏴',
        gradient: 'linear-gradient(135deg, #1a1a24 0%, #0a0a10 100%)',
        description: 'Eye-catching feather or teardrop flags for storefronts, car dealerships, and events. Ground stake + carry bag included.',
        options: ['Small (9.5 ft)', 'Medium (11.5 ft)', 'Large (13.5 ft)', 'Extra Large (15 ft)'],
        featured: false, isNew: false
    },
    {
        id: 'ys-001', name: 'Yard Signs', category: 'signs-displays',
        subcategory: 'yard-signs', price: 29.99, priceNote: 'each',
        badge: null, emoji: '🪧',
        gradient: 'linear-gradient(135deg, #1a2a1a 0%, #0a100a 100%)',
        description: 'Corrugated plastic yard signs with wire H-stakes. Waterproof, UV-resistant. Perfect for real estate, events, and campaigns.',
        options: ['18×12" (H-stake)', '24×18" (H-stake)', '24×24" (H-stake)'],
        featured: false, isNew: false
    },
    {
        id: 'po-001', name: 'Posters & Foam Board', category: 'signs-displays',
        subcategory: 'posters', price: 24.99, priceNote: 'each',
        badge: null, emoji: '🖼️',
        gradient: 'linear-gradient(135deg, #2a1a1a 0%, #100a0a 100%)',
        description: 'Vivid full-colour posters on gloss paper, or mounted on lightweight foam board for tabletops and easels.',
        options: ['11×17" Poster', '18×24" Poster', '24×36" Poster', '24×36" Foam Board'],
        featured: false, isNew: false
    },
    {
        id: 'wd-001', name: 'Window & Wall Decals', category: 'signs-displays',
        subcategory: 'window-decals', price: 24.99, priceNote: 'each',
        badge: 'NEW', emoji: '🪟',
        gradient: 'linear-gradient(135deg, #1a241e 0%, #0a100d 100%)',
        description: 'Custom die-cut vinyl decals for storefronts, vehicle windows, and walls. Removable adhesive, no residue.',
        options: ['12×12"', '18×18"', '24×24"', '36×36"', 'Custom size'],
        featured: false, isNew: true
    },
    {
        id: 'af-001', name: 'A-Frame Sandwich Boards', category: 'signs-displays',
        subcategory: 'aframe-signs', price: 89.99, priceNote: 'each',
        badge: null, emoji: '🔰',
        gradient: 'linear-gradient(135deg, #201a24 0%, #0d0a10 100%)',
        description: 'Heavy-duty aluminum A-frame sign with magnetic-clip header. Weatherproof for sidewalk and outdoor use.',
        options: ['18×24" Inserts', '22×28" Inserts'],
        featured: false, isNew: false
    },

    /* ── CLOTHING & APPAREL ── */
    {
        id: 'ts-001', name: 'Custom T-Shirts', category: 'clothing-apparel',
        subcategory: 't-shirts', price: 19.99, priceNote: 'each',
        badge: 'BESTSELLER', emoji: '👕',
        gradient: 'linear-gradient(135deg, #1e1e3a 0%, #0a0a1a 100%)',
        description: '100% cotton, pre-shrunk crew-neck tees. Screen-printed or digitally printed. Available in 30+ colours, XS–5XL.',
        options: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
        featured: true, isNew: false
    },
    {
        id: 'hd-001', name: 'Custom Hoodies', category: 'clothing-apparel',
        subcategory: 'hoodies', price: 44.99, priceNote: 'each',
        badge: 'POPULAR', emoji: '🧥',
        gradient: 'linear-gradient(135deg, #2a1e2a 0%, #100a10 100%)',
        description: 'Premium 8oz fleece pullover or zip-up hoodies. Embroidered or printed. Kangaroo pocket, ribbed cuffs. S–5XL.',
        options: ['S Pullover', 'M Pullover', 'L Pullover', 'XL Pullover', 'S Zip-Up', 'L Zip-Up'],
        featured: true, isNew: false
    },
    {
        id: 'po-002', name: 'Custom Polo Shirts', category: 'clothing-apparel',
        subcategory: 'polo-shirts', price: 34.99, priceNote: 'each',
        badge: null, emoji: '👔',
        gradient: 'linear-gradient(135deg, #1a2a1e 0%, #0a100d 100%)',
        description: 'Moisture-wicking or piqué cotton polo shirts. Left-chest embroidery or print. Perfect for uniforms and corporate wear.',
        options: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
        featured: false, isNew: false
    },
    {
        id: 'tn-001', name: 'Tank Tops', category: 'clothing-apparel',
        subcategory: 'tank-tops', price: 18.99, priceNote: 'each',
        badge: null, emoji: '🩱',
        gradient: 'linear-gradient(135deg, #1e2a2a 0%, #0a1010 100%)',
        description: 'Custom-printed tank tops in jersey or performance fabrics. Great for gyms, sports teams, and summer events.',
        options: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
        featured: false, isNew: false
    },
    {
        id: 'ht-001', name: 'Custom Hats & Caps', category: 'clothing-apparel',
        subcategory: 'hats', price: 24.99, priceNote: 'each',
        badge: 'NEW', emoji: '🧢',
        gradient: 'linear-gradient(135deg, #2a2a1e 0%, #10100a 100%)',
        description: 'Structured baseball caps, trucker hats, and beanies with embroidered logos. Snap-back, flex-fit, or adjustable.',
        options: ['Baseball Cap (Snapback)', 'Baseball Cap (Flex)', 'Trucker Hat', 'Bucket Hat'],
        featured: false, isNew: true
    },
    {
        id: 'jk-001', name: 'Branded Jackets', category: 'clothing-apparel',
        subcategory: 'jackets', price: 69.99, priceNote: 'each',
        badge: null, emoji: '🧣',
        gradient: 'linear-gradient(135deg, #1e1e1e 0%, #0a0a0a 100%)',
        description: 'Softshell, fleece-lined, or bomber jackets with embroidered logos. Professional outerwear for any team.',
        options: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
        featured: false, isNew: false
    },
    {
        id: 'bn-001', name: 'Toques & Beanies', category: 'clothing-apparel',
        subcategory: 'beanies', price: 19.99, priceNote: 'each',
        badge: null, emoji: '🧤',
        gradient: 'linear-gradient(135deg, #241e2a 0%, #100a10 100%)',
        description: 'Warm knit toques and beanies with embroidered or woven patch logos. One size fits most. Bulk pricing available.',
        options: ['One Size', 'Kids Size'],
        featured: false, isNew: false
    },

    /* ── BAGS & TOTES ── */
    {
        id: 'tb-001', name: 'Custom Tote Bags', category: 'bags-totes',
        subcategory: 'tote-bags', price: 18.99, priceNote: 'each',
        badge: 'POPULAR', emoji: '👜',
        gradient: 'linear-gradient(135deg, #1a1e2a 0%, #0a0d10 100%)',
        description: '12oz natural canvas or non-woven tote bags with full-colour print or silkscreen. Great for retail, events, and eco branding.',
        options: ['Logo Front Only', 'Full Front Print', 'Front + Back Print'],
        featured: true, isNew: false
    },
    {
        id: 'bp-001', name: 'Custom Backpacks', category: 'bags-totes',
        subcategory: 'backpacks', price: 39.99, priceNote: 'each',
        badge: null, emoji: '🎒',
        gradient: 'linear-gradient(135deg, #1a2420 0%, #0a100d 100%)',
        description: 'Polyester drawstring or laptop backpacks with embroidered or screen-printed logos. Multiple compartments, padded straps.',
        options: ['Drawstring (light)', 'Sport Backpack', 'Laptop Backpack (15")'],
        featured: false, isNew: false
    },
    {
        id: 'ds-001', name: 'Drawstring Sport Bags', category: 'bags-totes',
        subcategory: 'drawstring-bags', price: 14.99, priceNote: 'each',
        badge: null, emoji: '🎽',
        gradient: 'linear-gradient(135deg, #201a1e 0%, #0d0a10 100%)',
        description: 'Lightweight drawstring bags in vibrant colours with 1-colour logo screen print. Great for gyms, schools, and team events.',
        options: ['Logo Front', 'Full Front'],
        featured: false, isNew: false
    },

    /* ── LABELS & STICKERS ── */
    {
        id: 'st-001', name: 'Die-Cut Vinyl Stickers', category: 'labels-stickers',
        subcategory: 'die-cut-stickers', price: 12.99, priceNote: 'per 50',
        badge: 'NEW', emoji: '⭐',
        gradient: 'linear-gradient(135deg, #2a1a1e 0%, #100a0d 100%)',
        description: 'Custom-shaped die-cut stickers on waterproof vinyl with UV-resistant print. Indoor/outdoor durable. Dishwasher safe.',
        options: ['50 (2" avg)', '100 (2" avg)', '250 (2" avg)', '50 (4" avg)', '100 (4" avg)'],
        featured: false, isNew: true
    },
    {
        id: 'rl-001', name: 'Roll Labels', category: 'labels-stickers',
        subcategory: 'roll-labels', price: 29.99, priceNote: 'per 250',
        badge: 'POPULAR', emoji: '🏷️',
        gradient: 'linear-gradient(135deg, #1e2a1a 0%, #0d100a 100%)',
        description: 'Custom roll labels on white, kraft, or clear stock. Perfect for product packaging, bottles, and retail. CMYK full colour.',
        options: ['250 (2×2")', '500 (2×2")', '1,000 (2×2")', '250 (2×3")', '500 (2×3")'],
        featured: false, isNew: false
    },
    {
        id: 'cl-001', name: 'Clear Stickers', category: 'labels-stickers',
        subcategory: 'clear-stickers', price: 14.99, priceNote: 'per 50',
        badge: null, emoji: '🔮',
        gradient: 'linear-gradient(135deg, #1a1a2a 0%, #0a0a10 100%)',
        description: 'Transparent BOPP material that gives a "printed on glass" effect. Waterproof and UV-resistant. Great for packaging and laptops.',
        options: ['50 (2" avg)', '100 (2" avg)', '250 (2" avg)'],
        featured: false, isNew: false
    },
    {
        id: 'bs-001', name: 'Bumper Stickers', category: 'labels-stickers',
        subcategory: 'bumper-stickers', price: 11.99, priceNote: 'per 10',
        badge: null, emoji: '🚗',
        gradient: 'linear-gradient(135deg, #241e1a 0%, #100d0a 100%)',
        description: 'Weatherproof vinyl bumper stickers in standard 11.5×3" or custom sizes. UV-fade resistant outdoor adhesive.',
        options: ['10 units', '25 units', '50 units', '100 units'],
        featured: false, isNew: false
    },

    /* ── PROMO & MERCH ── */
    {
        id: 'mg-001', name: 'Custom Mugs & Tumblers', category: 'promo-products',
        subcategory: 'mugs', price: 18.99, priceNote: 'each',
        badge: 'POPULAR', emoji: '☕',
        gradient: 'linear-gradient(135deg, #2a1e1a 0%, #100d0a 100%)',
        description: '11oz ceramic mugs or 20oz stainless steel tumblers with vibrant full-wrap custom printing. Dishwasher safe options available.',
        options: ['11oz Ceramic Mug', '15oz Ceramic Mug', '20oz Stainless Tumbler', '30oz Stainless Tumbler'],
        featured: true, isNew: false
    },
    {
        id: 'wb-001', name: 'Custom Water Bottles', category: 'promo-products',
        subcategory: 'water-bottles', price: 24.99, priceNote: 'each',
        badge: null, emoji: '🍶',
        gradient: 'linear-gradient(135deg, #1a2a24 0%, #0a1010 100%)',
        description: 'Stainless steel insulated water bottles with laser-engraved or printed logo. Keeps drinks cold 24h, hot 12h.',
        options: ['16oz Sport Bottle', '20oz Wide Mouth', '32oz Wide Mouth'],
        featured: false, isNew: false
    },
    {
        id: 'pn-001', name: 'Branded Pens', category: 'promo-products',
        subcategory: 'pens', price: 0.99, priceNote: 'per pen',
        badge: null, emoji: '✒️',
        gradient: 'linear-gradient(135deg, #1e1e2a 0%, #0d0d10 100%)',
        description: 'Custom ballpoint pens with 1-4 colour imprint. Smooth-writing and great for trade shows, offices, and giveaways. Min. 50.',
        options: ['50 pens', '100 pens', '250 pens', '500 pens', '1,000 pens'],
        featured: false, isNew: false
    },
    {
        id: 'kc-001', name: 'Custom Keychains', category: 'promo-products',
        subcategory: 'keychains', price: 4.99, priceNote: 'each',
        badge: null, emoji: '🔑',
        gradient: 'linear-gradient(135deg, #24201a 0%, #100d0a 100%)',
        description: 'Metal or acrylic keychains with engraved or epoxy-dome logo. Great for real estate, automotive, and brand giveaways.',
        options: ['Metal Oval', 'Metal Rectangle', 'Acrylic Custom Shape', 'Bottle Opener'],
        featured: false, isNew: false
    },
    {
        id: 'ln-001', name: 'Custom Lanyards', category: 'promo-products',
        subcategory: 'lanyards', price: 3.99, priceNote: 'each',
        badge: null, emoji: '🏅',
        gradient: 'linear-gradient(135deg, #1a241e 0%, #0a100d 100%)',
        description: 'Full-colour polyester lanyards with safety breakaway or lobster clasp. Ideal for events, schools, and offices. Min. 50.',
        options: ['50 units', '100 units', '250 units', '500 units'],
        featured: false, isNew: false
    },
    {
        id: 'nb-001', name: 'Custom Notebooks', category: 'promo-products',
        subcategory: 'notebooks', price: 12.99, priceNote: 'each',
        badge: null, emoji: '📓',
        gradient: 'linear-gradient(135deg, #2a2a1e 0%, #10100d 100%)',
        description: 'Softcover or hardcover branded journals, A5 and A4 sizes, with 100 ruled pages. Logo on cover plus optional inner page print.',
        options: ['A5 Softcover', 'A5 Hardcover', 'A4 Softcover', 'A4 Hardcover'],
        featured: false, isNew: false
    },
    {
        id: 'ta-001', name: 'Tech Accessories', category: 'promo-products',
        subcategory: 'tech-accessories', price: 9.99, priceNote: 'each',
        badge: 'NEW', emoji: '💡',
        gradient: 'linear-gradient(135deg, #1e2a2a 0%, #0a1010 100%)',
        description: 'Branded USB flash drives, wireless charging pads, screen cleaners, and pop sockets. Premium tech merch for modern brands.',
        options: ['USB Drive (8GB)', 'USB Drive (16GB)', 'Wireless Charging Pad', 'Pop Socket'],
        featured: false, isNew: true
    },

    /* ── PACKAGING ── */
    {
        id: 'cb-001', name: 'Custom Product Boxes', category: 'packaging',
        subcategory: 'custom-boxes', price: 2.99, priceNote: 'each',
        badge: 'POPULAR', emoji: '📦',
        gradient: 'linear-gradient(135deg, #2a1e1e 0%, #100a0a 100%)',
        description: 'Custom-printed folding cartons and rigid boxes. CMYK + Pantone matching, matte or gloss lamination, embossing available.',
        options: ['25 units (small)', '25 units (medium)', '50 units (small)', '100 units (small)', 'Custom quote'],
        featured: false, isNew: false
    },
    {
        id: 'mb-001', name: 'Custom Mailer Boxes', category: 'packaging',
        subcategory: 'mailer-boxes', price: 3.99, priceNote: 'each',
        badge: null, emoji: '🎁',
        gradient: 'linear-gradient(135deg, #1e2a1e 0%, #0a100a 100%)',
        description: 'Self-locking kraft or white mailer boxes with full inside/outside printing. Perfect for e-commerce and subscription boxes.',
        options: ['25 units (6×6×2")', '25 units (9×6×4")', '50 units (6×6×2")', '100 units'],
        featured: false, isNew: false
    },
    {
        id: 'tp-001', name: 'Custom Tissue Paper', category: 'packaging',
        subcategory: 'tissue-paper', price: 9.99, priceNote: 'per 25 sheets',
        badge: null, emoji: '🎀',
        gradient: 'linear-gradient(135deg, #1a1a2a 0%, #0a0a10 100%)',
        description: 'Printed tissue paper in your brand colours and pattern. Elevate unboxing experiences for retail and gifting.',
        options: ['25 sheets', '50 sheets', '100 sheets'],
        featured: false, isNew: false
    },
    {
        id: 'kb-001', name: 'Kraft Paper Bags', category: 'packaging',
        subcategory: 'kraft-bags', price: 1.49, priceNote: 'each',
        badge: null, emoji: '🛍️',
        gradient: 'linear-gradient(135deg, #2a241e 0%, #10100a 100%)',
        description: 'Custom printed kraft paper shopping bags with twisted paper or flat handles. Retail-grade, eco-friendly. Min. 50.',
        options: ['50 small', '50 medium', '50 large', '100 small', '100 medium'],
        featured: false, isNew: false
    },

];

// ─── STATE ────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('boloCart') || '[]');
let activeCategory = 'all';
let maxPrice = 200;
let searchQuery = '';
let sortMode = 'featured';
let qvProduct = null;
let checkoutStep = 1;
let shippingCost = 9.99;
let shippingData = {};
const SHIPPING_RATES = { standard: 9.99, express: 19.99, rush: 39.99 };

// ─── DOM REFS ─────────────────────────────────────────────────
const productGrid = document.getElementById('productGrid');
const cartCountBadge = document.getElementById('cartCount');
const cartBody = document.getElementById('cartBody');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartFooter = document.getElementById('cartFooter');
const resultCount = document.getElementById('resultCount');
const activeFiltersEl = document.getElementById('activeFilters');
const shopEmpty = document.getElementById('shopEmpty');
const priceSlider = document.getElementById('priceMax');
const priceMaxLabel = document.getElementById('priceMaxLabel');
const searchInput = document.getElementById('searchInput');

// ─── CATEGORY META (for display names) ───────────────────────
const CAT_LABELS = {
    'all': 'All Products',
    'business-essentials': 'Business Essentials',
    'marketing-materials': 'Marketing Materials',
    'signs-displays': 'Signs & Displays',
    'clothing-apparel': 'Clothing & Apparel',
    'bags-totes': 'Bags & Totes',
    'labels-stickers': 'Labels & Stickers',
    'promo-products': 'Promo & Merch',
    'packaging': 'Packaging',
    // subcats
    'business-cards': 'Business Cards', 'letterhead': 'Letterhead',
    'envelopes': 'Envelopes', 'folders': 'Presentation Folders', 'note-cards': 'Note Cards',
    'flyers': 'Flyers & Leaflets', 'brochures': 'Brochures', 'postcards': 'Postcards',
    'door-hangers': 'Door Hangers', 'booklets': 'Booklets', 'table-tents': 'Table Tents',
    'roll-up-banners': 'Roll-Up Banners', 'vinyl-banners': 'Vinyl Banners',
    'feather-flags': 'Feather Flags', 'yard-signs': 'Yard Signs', 'posters': 'Posters',
    'window-decals': 'Window Decals', 'aframe-signs': 'A-Frame Signs',
    't-shirts': 'T-Shirts', 'hoodies': 'Hoodies', 'polo-shirts': 'Polo Shirts',
    'tank-tops': 'Tank Tops', 'hats': 'Hats & Caps', 'jackets': 'Jackets',
    'beanies': 'Beanies', 'tote-bags': 'Tote Bags', 'backpacks': 'Backpacks',
    'drawstring-bags': 'Drawstring Bags', 'shopping-bags': 'Shopping Bags',
    'die-cut-stickers': 'Die-Cut Stickers', 'roll-labels': 'Roll Labels',
    'product-labels': 'Product Labels', 'clear-stickers': 'Clear Stickers',
    'bumper-stickers': 'Bumper Stickers', 'pens': 'Pens', 'mugs': 'Mugs & Tumblers',
    'water-bottles': 'Water Bottles', 'keychains': 'Keychains', 'lanyards': 'Lanyards',
    'notebooks': 'Notebooks', 'tech-accessories': 'Tech Accessories',
    'custom-boxes': 'Custom Boxes', 'mailer-boxes': 'Mailer Boxes',
    'tissue-paper': 'Tissue Paper', 'kraft-bags': 'Kraft Bags',
};

// ─── PREMIUM IMAGES ───────────────────────────────────────────
const CAT_IMAGES = {
    'business-essentials': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    'marketing-materials': 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop',
    'signs-displays': 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop',
    'clothing-apparel': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
    'bags-totes': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
    'labels-stickers': 'https://images.unsplash.com/photo-1572379373977-03ea265eccc2?q=80&w=800&auto=format&fit=crop',
    'promo-products': 'https://images.unsplash.com/photo-1605335198031-6e9f28ec9ee0?q=80&w=800&auto=format&fit=crop',
    'packaging': 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
};

function getProductImage(product) {
    return CAT_IMAGES[product.category] || CAT_IMAGES['default'];
}

// ─── FILTER & SORT ────────────────────────────────────────────
function getFilteredProducts() {
    let items = PRODUCTS.filter(p => {
        // Category filter
        if (activeCategory !== 'all') {
            if (p.category !== activeCategory && p.subcategory !== activeCategory) return false;
        }
        // Price filter
        if (p.price > maxPrice) return false;
        // Search filter
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        return true;
    });

    // Sort
    switch (sortMode) {
        case 'price-asc': items.sort((a, b) => a.price - b.price); break;
        case 'price-desc': items.sort((a, b) => b.price - a.price); break;
        case 'name-asc': items.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'new': items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
        case 'featured': items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }
    return items;
}

function renderProducts() {
    const items = getFilteredProducts();
    productGrid.innerHTML = '';
    resultCount.textContent = `Showing ${items.length} product${items.length !== 1 ? 's' : ''}`;

    if (items.length === 0) {
        shopEmpty.style.display = 'block';
        productGrid.style.display = 'none';
        return;
    }
    shopEmpty.style.display = 'none';
    productGrid.style.display = 'grid';

    items.forEach(p => {
        const bgImg = getProductImage(p);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-id', p.id);
        card.innerHTML = `
      ${p.badge ? `<span class="product-card__badge badge--${badgeClass(p.badge)}">${p.badge}</span>` : ''}
      <div class="product-card__image" style="background: linear-gradient(to bottom, rgba(13,13,13,0.1), rgba(13,13,13,0.9)), url('${bgImg}'); background-size: cover; background-position: center;">
        <button class="product-card__quick-view" data-id="${p.id}" aria-label="Quick view ${p.name}">QUICK VIEW</button>
      </div>
      <div class="product-card__body">
        <div class="product-card__cat">${CAT_LABELS[p.subcategory] || ''}</div>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${truncate(p.description, 80)}</p>
        <div class="product-card__footer">
          <div class="product-card__price">
            <strong>$${p.price.toFixed(2)}</strong>
            <span>${p.priceNote}</span>
          </div>
          <button class="product-card__add" data-id="${p.id}" aria-label="Add ${p.name} to cart">
            + ADD
          </button>
        </div>
      </div>`;
        productGrid.appendChild(card);
    });

    // Events on newly rendered cards
    productGrid.querySelectorAll('.product-card__add').forEach(btn =>
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const p = PRODUCTS.find(x => x.id === btn.dataset.id);
            addToCart(p, p.options[0], 1);
            btn.textContent = '✓ ADDED';
            btn.classList.add('added');
            setTimeout(() => { btn.textContent = '+ ADD'; btn.classList.remove('added'); }, 1800);
        })
    );
    productGrid.querySelectorAll('.product-card__quick-view').forEach(btn =>
        btn.addEventListener('click', e => { e.stopPropagation(); openQuickView(btn.dataset.id); })
    );
    productGrid.querySelectorAll('.product-card').forEach(card =>
        card.addEventListener('click', () => openQuickView(card.dataset.id))
    );
}

function badgeClass(badge) {
    const map = { 'BESTSELLER': 'best', 'NEW': 'new', 'SALE': 'sale', 'POPULAR': 'popular' };
    return map[badge] || 'best';
}
function truncate(str, len) {
    return str.length > len ? str.slice(0, len) + '...' : str;
}

function renderActiveFilters() {
    activeFiltersEl.innerHTML = '';
    if (activeCategory !== 'all') {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `${CAT_LABELS[activeCategory] || activeCategory} <button onclick="setCategory('all')" aria-label="Remove category filter">✕</button>`;
        activeFiltersEl.appendChild(tag);
    }
    if (maxPrice < 200) {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `Under $${maxPrice} <button onclick="resetPrice()" aria-label="Remove price filter">✕</button>`;
        activeFiltersEl.appendChild(tag);
    }
}

// ─── CATEGORY SELECTION ───────────────────────────────────────
function setCategory(cat) {
    activeCategory = cat;
    // Update sidebar UI
    document.querySelectorAll('.sidebar__cat, .sidebar__sub-btn').forEach(el => {
        el.classList.remove('active', 'sidebar__cat--active');
    });
    const target = document.querySelector(`[data-cat="${cat}"]`);
    if (target) target.classList.add('active', 'sidebar__cat--active');
    renderActiveFilters();
    renderProducts();
}

window.setCategory = setCategory;
window.resetFilters = () => {
    setCategory('all');
    resetPrice();
    searchInput.value = '';
    searchQuery = '';
    renderProducts();
};
window.resetPrice = () => { maxPrice = 200; priceSlider.value = 200; updatePriceLabel(); renderProducts(); renderActiveFilters(); };

// ─── SIDEBAR INTERACTIONS ─────────────────────────────────────
document.querySelectorAll('.sidebar__cat[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
        // Top-level category — just filter
        if (!btn.classList.contains('sidebar__group-toggle')) {
            setCategory(btn.dataset.cat);
        }
    });
});

document.querySelectorAll('.sidebar__group-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const grpId = btn.dataset.group;
        const list = document.getElementById(grpId);
        const isOpen = list.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        // Also filter by parent category
        setCategory(btn.dataset.cat);
    });
});

document.querySelectorAll('.sidebar__sub-btn').forEach(btn => {
    btn.addEventListener('click', () => setCategory(btn.dataset.cat));
});

// Mobile sidebar
const sidebarEl = document.getElementById('shopSidebar');
document.getElementById('sidebarOpen').addEventListener('click', () => sidebarEl.classList.add('open'));
document.getElementById('sidebarClose').addEventListener('click', () => sidebarEl.classList.remove('open'));

// Sort
document.getElementById('sortSelect').addEventListener('change', e => {
    sortMode = e.target.value;
    renderProducts();
});

// Price range
function updatePriceLabel() {
    const v = parseInt(priceSlider.value);
    priceMaxLabel.textContent = v >= 200 ? '$200+' : `$${v}`;
    const pct = ((v - 0) / (200 - 0)) * 100;
    priceSlider.style.setProperty('--pct', pct + '%');
}
priceSlider.addEventListener('input', () => {
    maxPrice = parseInt(priceSlider.value);
    updatePriceLabel();
    renderProducts();
    renderActiveFilters();
});
updatePriceLabel();

// Search Input
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

// ─── CART ─────────────────────────────────────────────────────
function saveCart() { localStorage.setItem('boloCart', JSON.stringify(cart)); }

function showToast(product, qty) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <img src="${getProductImage(product)}" class="toast__img" alt="${product.name}">
        <div class="toast__body">
            <span class="toast__title">Added to Cart</span>
            <span class="toast__msg">${qty} × ${product.name}</span>
        </div>
        <button class="toast__close" aria-label="Close">✕</button>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('toast--visible');
        });
    });

    const removeToast = () => {
        toast.classList.remove('toast--visible');
        setTimeout(() => toast.remove(), 400); // Wait for CSS transition
    };

    toast.querySelector('.toast__close').addEventListener('click', removeToast);

    // Auto remove after 3.5 seconds
    setTimeout(removeToast, 3500);
}

function addToCart(product, variant, qty = 1) {
    const existing = cart.find(i => i.id === product.id && i.variant === variant);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: product.id, name: product.name, category: product.category,
            price: product.price, priceNote: product.priceNote,
            variant, qty
        });
    }
    saveCart();
    updateCartCount();
    renderCart();

    // Pop up the sleek toast instead of aggressively opening the drawer
    showToast(product, qty);
}

function updateCartCount() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    cartCountBadge.textContent = total;
    cartCountBadge.classList.toggle('visible', total > 0);
}

function cartTotal() {
    return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function renderCart() {
    const isEmpty = cart.length === 0;
    cartEmpty.style.display = isEmpty ? 'flex' : 'none';
    cartItems.style.display = isEmpty ? 'none' : 'flex';
    cartFooter.style.display = isEmpty ? 'none' : 'flex';

    cartItems.innerHTML = cart.map((item, idx) => `
    <li class="cart-item">
      <div class="cart-item__img" style="background: linear-gradient(to bottom, rgba(13,13,13,0.1), rgba(13,13,13,0.8)), url('${getProductImage(item)}'); background-size: cover; background-position: center; border-radius: 4px;"></div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__variant">${item.variant}</div>
        <div class="cart-item__controls">
          <button class="cart-qty-btn" data-idx="${idx}" data-dir="-1" aria-label="Decrease qty">−</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" data-idx="${idx}" data-dir="1" aria-label="Increase qty">+</button>
          <button class="cart-item__remove" data-idx="${idx}" aria-label="Remove item">✕ Remove</button>
        </div>
      </div>
      <div class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</div>
    </li>`
    ).join('');

    const total = cartTotal();
    cartSubtotal.textContent = `$${total.toFixed(2)}`;

    // Qty + remove events
    cartItems.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            cart[idx].qty += parseInt(btn.dataset.dir);
            if (cart[idx].qty <= 0) cart.splice(idx, 1);
            saveCart(); updateCartCount(); renderCart();
        });
    });
    cartItems.querySelectorAll('.cart-item__remove').forEach(btn => {
        btn.addEventListener('click', () => {
            cart.splice(parseInt(btn.dataset.idx), 1);
            saveCart(); updateCartCount(); renderCart();
        });
    });
}

function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
}
window.closeCart = closeCart;

document.getElementById('cartToggle').addEventListener('click', () => {
    document.getElementById('cartDrawer').classList.contains('open') ? closeCart() : openCart();
});
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// ─── QUICK VIEW ───────────────────────────────────────────────
function openQuickView(id) {
    qvProduct = PRODUCTS.find(p => p.id === id);
    if (!qvProduct) return;
    const p = qvProduct;
    let qvQty = 1;

    document.getElementById('qvContent').innerHTML = `
    <div class="qv-img-panel" style="background: linear-gradient(to bottom, rgba(13,13,13,0.1), rgba(13,13,13,0.8)), url('${getProductImage(p)}'); background-size: cover; background-position: center;">
    </div>
    <div class="qv-info-panel">
      <div class="qv-cat">${CAT_LABELS[p.subcategory] || ''}</div>
      <h2 class="qv-name">${p.name}</h2>
      <p class="qv-desc">${p.description}</p>
      <div class="qv-price">$${p.price.toFixed(2)} <span class="qv-price-note">${p.priceNote}</span></div>
      ${p.options.length ? `
      <div class="qv-options">
        <label>CHOOSE OPTION</label>
        <select class="qv-select" id="qvOption">
          ${p.options.map(o => `<option>${o}</option>`).join('')}
        </select>
      </div>` : ''}
      <div class="qv-actions">
        <div class="qv-qty">
          <button class="qv-qty-btn" id="qvMinus" aria-label="Decrease quantity">−</button>
          <span class="qv-qty-val" id="qvQtyVal">1</span>
          <button class="qv-qty-btn" id="qvPlus" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn--primary qv-add-btn" id="qvAddBtn">+ ADD TO CART</button>
      </div>
    </div>`;

    document.getElementById('qvMinus').addEventListener('click', () => {
        if (qvQty > 1) { qvQty--; document.getElementById('qvQtyVal').textContent = qvQty; }
    });
    document.getElementById('qvPlus').addEventListener('click', () => {
        qvQty++;
        document.getElementById('qvQtyVal').textContent = qvQty;
    });
    document.getElementById('qvAddBtn').addEventListener('click', () => {
        const variant = document.getElementById('qvOption') ? document.getElementById('qvOption').value : p.options[0];
        addToCart(p, variant, qvQty);
        closeQV();
    });

    document.getElementById('qvModal').classList.add('open');
    document.getElementById('qvOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeQV() {
    document.getElementById('qvModal').classList.remove('open');
    document.getElementById('qvOverlay').classList.remove('open');
    document.body.style.overflow = '';
}
document.getElementById('qvClose').addEventListener('click', closeQV);
document.getElementById('qvOverlay').addEventListener('click', closeQV);

// ─── CHECKOUT ─────────────────────────────────────────────────
function openCheckout() {
    closeCart();
    checkoutStep = 1;
    renderCheckoutStep1();
    document.getElementById('checkoutModal').classList.add('open');
    document.getElementById('checkoutOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('open');
    document.getElementById('checkoutOverlay').classList.remove('open');
    document.body.style.overflow = '';
}
document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
document.getElementById('checkoutOverlay').addEventListener('click', closeCheckout);

function goToStep(n) {
    if (n === 2) {
        const form = document.getElementById('shippingForm');
        if (!validateShippingForm()) return;
        shippingData = Object.fromEntries(new FormData(form).entries());
        const sel = form.querySelector('input[name="shipping"]:checked');
        shippingCost = SHIPPING_RATES[sel ? sel.value : 'standard'];
    }
    checkoutStep = n;
    document.querySelectorAll('.checkout-panel').forEach((p, i) => p.classList.toggle('active', i === n - 1));
    document.querySelectorAll('.checkout-step').forEach((s, i) => {
        s.classList.toggle('active', i === n - 1);
        s.classList.toggle('done', i < n - 1);
    });
    if (n === 3) renderPaymentSummary();
    document.getElementById('checkoutModal').scrollTop = 0;
}
window.goToStep = goToStep;

function renderCheckoutStep1() {
    const list = document.getElementById('coItemList');
    list.innerHTML = cart.map(i => `
    <li class="co-item">
      <div class="co-item__img" style="background:${i.gradient}">${i.emoji}</div>
      <div class="co-item__info">
        <div class="co-item__name">${i.name}</div>
        <div class="co-item__variant">${i.variant} × ${i.qty}</div>
      </div>
      <div class="co-item__price">$${(i.price * i.qty).toFixed(2)}</div>
    </li>`).join('');
    const sub = cartTotal();
    document.getElementById('coSubtotal').textContent = `$${sub.toFixed(2)}`;
    document.getElementById('coShipping').textContent = 'Calculated next';
    document.getElementById('coTotal').textContent = `$${sub.toFixed(2)}`;
}

function renderPaymentSummary() {
    const sub = cartTotal();
    const total = sub + shippingCost;
    document.getElementById('paymentTotals').innerHTML = `
    <div class="co-total-row"><span>Subtotal</span><span>$${sub.toFixed(2)}</span></div>
    <div class="co-total-row"><span>Shipping</span><span>$${shippingCost.toFixed(2)}</span></div>
    <div class="co-total-row co-total-row--total"><span>TOTAL</span><span>$${total.toFixed(2)}</span></div>`;
    document.getElementById('paymentSummary').innerHTML = `
    Shipping to: <strong>${shippingData.city || ''}, ${shippingData.province || ''}</strong> &nbsp;·&nbsp;
    Contact: <strong>${shippingData.email || ''}</strong>`;
    document.getElementById('payBtnLabel').textContent = `PAY $${total.toFixed(2)} →`;
}

function validateShippingForm() {
    const required = ['co-firstName', 'co-lastName', 'co-email', 'co-address', 'co-city', 'co-province', 'co-postal'];
    let valid = true;
    required.forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) { el.style.borderColor = '#ef4444'; valid = false; }
        else el.style.borderColor = '';
    });
    if (!valid) { alert('Please fill in all required fields.'); }
    return valid;
}

// Shipping form submit → go to payment
document.getElementById('shippingForm').addEventListener('submit', e => {
    e.preventDefault();
    goToStep(3);
});

// Payment form submit (Stripe integration point)
document.getElementById('paymentForm').addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('payNowBtn');
    btn.disabled = true;
    document.getElementById('payBtnLabel').textContent = 'Processing...';

    /* ─────────────────────────────────────────────────
       STRIPE INTEGRATION POINT
       Replace the setTimeout below with:
  
       const result = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
           card: cardElement,
           billing_details: {
             name: document.getElementById('cardName').value,
             email: shippingData.email,
           }
         }
       });
       if (result.error) {
         document.getElementById('stripe-errors').textContent = result.error.message;
         btn.disabled = false;
       } else if (result.paymentIntent.status === 'succeeded') {
         showConfirmation();
       }
    ───────────────────────────────────────────────── */

    setTimeout(() => {
        showConfirmation();
    }, 1800);
});

function showConfirmation() {
    const orderId = 'BOLO-' + Date.now().toString(36).toUpperCase();
    document.getElementById('confirmOrderId').textContent = `Order ID: ${orderId}`;
    document.getElementById('confirmMessage').textContent =
        `Thank you, ${shippingData.firstName || 'Valued Customer'}! Your order has been placed and you'll receive a confirmation at ${shippingData.email || 'your email'}. Our team will reach out with artwork upload instructions within 24 hours.`;
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
    // Show step 4
    document.querySelectorAll('.checkout-panel').forEach((p, i) => p.classList.toggle('active', i === 3));
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.add('done'));
}

// Promo code placeholder
document.getElementById('applyPromo').addEventListener('click', () => {
    const code = document.getElementById('promoCode').value.trim().toUpperCase();
    const errEl = document.getElementById('stripe-errors');
    if (code === 'BOLO10') {
        errEl.style.color = 'var(--accent-green)';
        errEl.textContent = '✓ 10% discount applied! (Not yet reflected — coming with Stripe integration)';
    } else if (code) {
        errEl.style.color = '#ef4444';
        errEl.textContent = 'Invalid promo code.';
    }
});

// Credit card number formatting
const cardNumInput = document.getElementById('cardNumber');
if (cardNumInput) {
    cardNumInput.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 16);
        e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
}
const cardExpInput = document.getElementById('cardExpiry');
if (cardExpInput) {
    cardExpInput.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (v.length >= 3) v = v.slice(0, 2) + ' / ' + v.slice(2);
        e.target.value = v;
    });
}

// ─── NAV SCROLL BEHAVIOR ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20
        ? 'rgba(10,10,10,0.95)' : 'rgba(17,17,17,0.80)';
}, { passive: true });

// ─── INIT ─────────────────────────────────────────────────────
updateCartCount();
renderCart();
renderProducts();
renderActiveFilters();
