// リッチ見積もり LP v0.1
// app.js - アニメーション・インタラクション

(function () {
  'use strict';

  // --- Fade-up animation: 即時stagger表示 + スクロール連動 ---
  const fadeEls = document.querySelectorAll('.fade-up');

  // ビューポート内は即表示、ビューポート外はstagger表示（全要素500ms以内に表示完了）
  fadeEls.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    } else {
      setTimeout(() => el.classList.add('visible'), Math.min(i * 60, 500));
    }
  });

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
