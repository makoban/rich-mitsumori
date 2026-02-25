// リッチ見積もり LP v0.1
// app.js - アニメーション・インタラクション

(function () {
  'use strict';

  // --- Scroll fade-up animation ---
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 100px 0px' }
  );

  fadeEls.forEach((el) => observer.observe(el));

  // 初回ロード時にビューポート内の要素は即表示 + 遅延フォールバック
  requestAnimationFrame(() => {
    fadeEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 50) {
        el.classList.add('visible');
      }
    });
  });
  // 1.5秒後に残り全要素を表示（スクロール不要のユーザー対応）
  setTimeout(() => {
    fadeEls.forEach((el) => el.classList.add('visible'));
  }, 1500);

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-slate-950/80', 'backdrop-blur-lg', 'border-b', 'border-slate-800');
    } else {
      navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-lg', 'border-b', 'border-slate-800');
    }
  });

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // --- Demo amount counter animation ---
  const demoAmount = document.getElementById('demo-amount');
  if (demoAmount) {
    let counted = false;
    const targetAmount = 150000;
    const duration = 1500;

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            counted = true;
            animateCounter(demoAmount, 0, targetAmount, duration);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(demoAmount);
  }

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * eased);
      el.textContent = '¥' + current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }
})();
