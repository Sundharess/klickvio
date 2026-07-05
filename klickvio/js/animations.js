/* ==========================================================================
   Klickvio — animations.js
   Scroll reveals, custom cursor, mouse glow, hero typing effect,
   parallax blobs, page transition.
   ========================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ------------------------------------------------------------------
     1. Scroll Reveal via Intersection Observer
     ------------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale'
  );

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in-view'));
  }

  /* ------------------------------------------------------------------
     2. Custom Cursor (desktop / fine pointer only)
     ------------------------------------------------------------------ */
  if (isFinePointer && !prefersReducedMotion) {
    document.body.classList.add('no-cursor');

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    window.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;
      cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    const interactiveSelectors = 'a, button, .btn, input, textarea, .service-card, .portfolio-item, .filter-btn';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-active'));
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorOutline.style.opacity = '1';
    });
  }

  /* ------------------------------------------------------------------
     3. Mouse Glow (ambient light following cursor in hero)
     ------------------------------------------------------------------ */
  const heroSection = document.querySelector('.hero');

  if (isFinePointer && heroSection && !prefersReducedMotion) {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    heroSection.appendChild(glow);

    heroSection.addEventListener('mousemove', (event) => {
      const rect = heroSection.getBoundingClientRect();
      glow.style.transform = `translate(${event.clientX - rect.left}px, ${event.clientY - rect.top}px) translate(-50%, -50%)`;
    });
  }

  /* ------------------------------------------------------------------
     4. Parallax on Floating Blobs
     ------------------------------------------------------------------ */
  const blobs = document.querySelectorAll('.hero-blob');

  if (isFinePointer && blobs.length && !prefersReducedMotion) {
    window.addEventListener('mousemove', (event) => {
      const xRatio = event.clientX / window.innerWidth - 0.5;
      const yRatio = event.clientY / window.innerHeight - 0.5;

      blobs.forEach((blob, index) => {
        const strength = (index + 1) * 12;
        blob.style.marginLeft = `${xRatio * strength}px`;
        blob.style.marginTop = `${yRatio * strength}px`;
      });
    });
  }

  /* ------------------------------------------------------------------
     5. Hero Typing Effect
     ------------------------------------------------------------------ */
  const typingTarget = document.querySelector('[data-typing]');

  if (typingTarget && !prefersReducedMotion) {
    const phrases = JSON.parse(typingTarget.getAttribute('data-typing'));
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typingTarget.textContent = currentPhrase.slice(0, charIndex);

        if (charIndex === currentPhrase.length) {
          deleting = true;
          setTimeout(typeLoop, 1800);
          return;
        }
      } else {
        charIndex--;
        typingTarget.textContent = currentPhrase.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      const speed = deleting ? 35 : 65;
      setTimeout(typeLoop, speed);
    }

    typeLoop();
  } else if (typingTarget) {
    const phrases = JSON.parse(typingTarget.getAttribute('data-typing'));
    typingTarget.textContent = phrases[0];
  }

  /* ------------------------------------------------------------------
     6. Smooth Internal Anchor Scrolling (fallback for older browsers)
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const headerOffset = 84;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  });
})();
