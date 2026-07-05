/* ==========================================================================
   Klickvio — script.js
   Core site functionality: loader, navigation, counters, portfolio filter,
   contact form validation, back-to-top, ripple buttons.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. Loading Screen
     ------------------------------------------------------------------ */
  const loader = document.querySelector('.loader');

  function hideLoader() {
    if (!loader) return;
    loader.classList.add('loaded');
  }

  window.addEventListener('load', () => {
    setTimeout(hideLoader, 500);
  });

  // Safety net in case load event is delayed by slow assets
  setTimeout(hideLoader, 3500);

  /* ------------------------------------------------------------------
     2. Navbar: scroll state, mobile menu, scroll spy
     ------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateNavbarState() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateNavbarState();
  window.addEventListener('scroll', updateNavbarState, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Scroll spy — highlight active section link
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  function updateScrollSpy() {
    const scrollPos = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 40;
    let currentId = sections.length ? sections[0].id : null;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const targetId = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', targetId === currentId);
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  window.addEventListener('load', updateScrollSpy);

  /* ------------------------------------------------------------------
     3. Animated Counters
     ------------------------------------------------------------------ */
  const counters = document.querySelectorAll('[data-counter]');

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
        el.classList.add('counted');
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => {
      counter.textContent = counter.getAttribute('data-counter') + (counter.getAttribute('data-suffix') || '');
    });
  }

  /* ------------------------------------------------------------------
     4. Portfolio Filtering
     ------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || filter === category;

        if (shouldShow) {
          item.classList.remove('hide');
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.94)';
          setTimeout(() => {
            if (item.style.opacity === '0') item.classList.add('hide');
          }, 300);
        }
      });
    });
  });

  /* ------------------------------------------------------------------
     5. Contact Form Validation
     ------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');

  function setError(field, message) {
    const errorEl = document.getElementById(field.id + 'Error');
    if (errorEl) errorEl.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateName(field) {
    const value = field.value.trim();
    if (!value) {
      setError(field, 'Please enter your name.');
      return false;
    }
    if (value.length < 2) {
      setError(field, 'Name looks too short.');
      return false;
    }
    setError(field, '');
    return true;
  }

  function validatePhone(field) {
    const value = field.value.trim();
    const phonePattern = /^[+]?[\d\s()-]{7,15}$/;
    if (!value) {
      setError(field, 'Please enter your phone number.');
      return false;
    }
    if (!phonePattern.test(value)) {
      setError(field, 'Please enter a valid phone number.');
      return false;
    }
    setError(field, '');
    return true;
  }

  function validateEmail(field) {
    const value = field.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setError(field, 'Please enter your email.');
      return false;
    }
    if (!emailPattern.test(value)) {
      setError(field, 'Please enter a valid email address.');
      return false;
    }
    setError(field, '');
    return true;
  }

  function validateMessage(field) {
    const value = field.value.trim();
    if (!value) {
      setError(field, 'Please tell us a little about your project.');
      return false;
    }
    if (value.length < 10) {
      setError(field, 'Message should be at least 10 characters.');
      return false;
    }
    setError(field, '');
    return true;
  }

  if (contactForm) {
    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const successMessage = document.getElementById('formSuccess');

    [
      [nameField, validateName],
      [phoneField, validatePhone],
      [emailField, validateEmail],
      [messageField, validateMessage],
    ].forEach(([field, validator]) => {
      if (!field) return;
      field.addEventListener('blur', () => validator(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validator(field);
      });
    });

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const isNameValid = validateName(nameField);
      const isPhoneValid = validatePhone(phoneField);
      const isEmailValid = validateEmail(emailField);
      const isMessageValid = validateMessage(messageField);

      if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
        if (successMessage) {
          successMessage.classList.add('show');
          successMessage.textContent =
            'Thanks! Your message has been received — our team will reach out shortly.';
        }
        contactForm.reset();
        setTimeout(() => {
          if (successMessage) successMessage.classList.remove('show');
        }, 6000);
      }
    });
  }

  /* ------------------------------------------------------------------
     6. Back To Top Button
     ------------------------------------------------------------------ */
  const backToTop = document.querySelector('.back-to-top');

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('show', window.scrollY > 600);
  }

  window.addEventListener('scroll', updateBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     7. Ripple Effect for Buttons
     ------------------------------------------------------------------ */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (event) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = event.clientY - rect.top - size / 2 + 'px';

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ------------------------------------------------------------------
     8. Current Year in Footer
     ------------------------------------------------------------------ */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
