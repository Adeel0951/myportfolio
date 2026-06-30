(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');

  // Sticky header
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll(
    '.service-card, .portfolio-card, .why-card, .process-step, .pricing-card, .stat-card, .about-content, .about-stats'
  ).forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Contact form — opens email client with prefilled message
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service');
    const serviceLabel = service.options[service.selectedIndex].text;
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Project Inquiry — ${serviceLabel}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${serviceLabel}\n\n${message}`
    );

    window.location.href = `mailto:malikadeelawan1212@gmail.com?subject=${subject}&body=${body}`;
  });

  // Smooth active nav highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = navLinks.querySelectorAll('a[href^="#"]:not(.btn)');

  function highlightNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((item) => {
          item.style.color =
            item.getAttribute('href') === `#${id}` ? '#F1F5F9' : '';
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
})();
