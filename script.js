/* ===================================
   Jagoweb.site - Main JavaScript
   =================================== */

(function () {
  'use strict';

  /* ---- Wait for DOM ---- */
  document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       Initialize AOS
       ========================= */
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: function () {
          return window.innerWidth < 768 && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
      });
    }

    /* =========================
       Navbar Scroll Effect
       ========================= */
    var navbar = document.getElementById('navbar');
    var scrollThreshold = 50;

    function handleNavbarScroll() {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    /* =========================
       Mobile Nav Toggle
       ========================= */
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu on link click
      var navLinks = navMenu.querySelectorAll('.navbar__link');
      navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }

    /* =========================
       Smooth Scrolling
       ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var navHeight = navbar ? navbar.offsetHeight : 0;
          var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    /* =========================
       Counter Animations
       ========================= */
    function initCountUp() {
      if (typeof CountUp === 'undefined') return;

      var counters = document.querySelectorAll('[data-count]');
      var observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
      };

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var endVal = parseInt(el.getAttribute('data-count'), 10);
            var counter = new CountUp(el, endVal, {
              duration: 2,
              separator: ''
            });

            if (!counter.error) {
              counter.start();
            }
            observer.unobserve(el);
          }
        });
      }, observerOptions);

      counters.forEach(function (counter) {
        observer.observe(counter);
      });
    }

    initCountUp();

    /* =========================
       FAQ Accordion
       ========================= */
    var faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq__question');

      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* =========================
       Order Form → WhatsApp
       ========================= */
    var orderForm = document.getElementById('orderForm');

    if (orderForm) {
      orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var nama = document.getElementById('nama').value.trim();
        var bisnis = document.getElementById('bisnis').value.trim();
        var domain = document.getElementById('domain').value.trim();

        if (!nama || !bisnis || !domain) return;

        var message = 'Halo Jagoweb.site\n\n' +
          'Saya ingin memesan website.\n\n' +
          'Nama: ' + nama + '\n' +
          'Nama Bisnis: ' + bisnis + '\n' +
          'Domain yang Diinginkan: ' + domain + '\n\n' +
          'Mohon informasi selanjutnya.';

        var waUrl = 'https://wa.me/6282347303153?text=' + encodeURIComponent(message);
        window.open(waUrl, '_blank');
      });
    }

    /* =========================
       Footer Year
       ========================= */
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    /* =========================
       Parallax on Hero Blurs
       ========================= */
    var heroBlurs = document.querySelectorAll('.hero__bg-blur');

    if (heroBlurs.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;
        heroBlurs.forEach(function (blur, i) {
          var speed = (i + 1) * 0.04;
          blur.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
        });
      }, { passive: true });
    }

  });
})();