// Smooth scroll for in-page fragment links (used with TOC or anywhere smooth scrolling is needed)
(function () {
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothFragmentScroll);
  } else {
    initSmoothFragmentScroll();
  }

  function initSmoothFragmentScroll() {
    // Select all anchor links that start with "#" but are not just "#"
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    if (!links.length) return;

    const baseDuration = 1500; // milliseconds

    // Cubic easing for natural acceleration/deceleration
    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    links.forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();

        const startY = window.scrollY;
        const targetY = target.getBoundingClientRect().top + window.scrollY;
        const distance = Math.abs(targetY - startY);
        const duration = Math.min(baseDuration, 300 + distance * 0.4);
        const startTime = performance.now();

        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeInOutCubic(progress);
          const newY = startY + (targetY - startY) * eased;
          window.scrollTo(0, newY);
          if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
      });
    });
  }
})();