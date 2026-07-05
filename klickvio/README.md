# Klickvio — Digital Marketing Agency Website

A premium, fully responsive digital marketing agency website built with **HTML5, CSS3, and vanilla JavaScript (ES6)** — no frameworks, no build step. Ready to deploy directly to **GitHub Pages**.

## Project Structure

```
klickvio/
├── index.html              # Main HTML file (all sections)
├── css/
│   ├── style.css            # Variables, layout, and component styles
│   ├── animations.css       # Keyframes and scroll-reveal classes
│   └── responsive.css       # Mobile-first responsive breakpoints
├── js/
│   ├── script.js             # Navigation, counters, filtering, form validation
│   └── animations.js         # Scroll reveals, cursor, typing effect, parallax
├── images/
│   ├── hero.svg              # Hero illustration
│   ├── about.svg              # About section illustration
│   ├── services.svg           # Services illustration
│   ├── background.svg         # Ambient background graphic
│   ├── logo.png                # Site logo
│   └── favicon.png             # Favicon
├── assets/
│   └── icons/
│       └── whatsapp.svg        # WhatsApp icon asset
├── robots.txt
├── sitemap.xml
└── README.md
```

## Features

- Fully responsive, mobile-first layout (desktop, laptop, tablet, phone, small phone)
- Sticky glassmorphism navigation with scroll-spy and mobile hamburger menu
- Animated hero with floating gradient blobs, typing effect, and animated stat counters
- Service cards, "why choose us" cards, and filterable portfolio grid
- Contact form with full client-side validation (name, phone, email, message)
- Click-to-call and click-to-email links, embedded map, and business hours
- Floating WhatsApp button and back-to-top button
- Scroll-triggered reveal animations via Intersection Observer
- Custom cursor and mouse-glow effects on desktop (disabled on touch devices and when `prefers-reduced-motion` is set)
- SEO: meta description/keywords, Open Graph, Twitter Card, canonical tag, Schema.org structured data, semantic HTML, ARIA labels
- `robots.txt` and `sitemap.xml` placeholders

## Customization

- **Colors & fonts**: edit the CSS custom properties at the top of `css/style.css` (`:root` block).
- **Copy & content**: edit directly inside `index.html` — every section is clearly commented.
- **Portfolio items**: duplicate a `.portfolio-item` block inside the Portfolio section and update its `data-category`, image label, and text.
- **Contact details**: update the phone numbers, email, and address inside the Contact section and footer of `index.html`.
- **Map**: replace the `src` of the `iframe` in the Contact section with your exact Google Maps embed URL once you have a precise business address.

## Running Locally

No build step is required. Simply open `index.html` in a browser, or serve the folder with any static server, for example:

```bash
npx serve .
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (for example `klickvio`).
2. Push the contents of this folder to the repository's `main` branch.
3. In the repository settings, go to **Pages** and set the source branch to `main` (root folder).
4. Your site will be published at `https://<your-username>.github.io/<repository-name>/`.
5. Update the `canonical`, Open Graph, and `sitemap.xml` URLs in `index.html` and `sitemap.xml` to match your final GitHub Pages URL.

## Performance Notes

- Scripts are loaded with `defer` so they don't block rendering.
- Images are SVG (vector, tiny file size) except the logo/favicon.
- Fonts are loaded from Google Fonts with `preconnect` for faster delivery.
- Below-the-fold images use `loading="lazy"`.

## License

This codebase is provided for Klickvio's exclusive use and customization.
