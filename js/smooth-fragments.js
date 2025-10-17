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
    const offset = 25; // Adjust this value based on fixed header height or desired margin

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

        e.preventDefault(); // Prevent default to control scroll

        // Add a temporary class to apply :target-like styles before scrolling
        target.classList.add('target-highlight');

        // Calculate target position with offset
        const startY = window.scrollY;
        const targetRect = target.getBoundingClientRect();
        const targetY = targetRect.top + window.scrollY - offset; // Subtract offset
        const distance = Math.abs(targetY - startY);
        const duration = Math.min(baseDuration, 300 + distance * 0.4);
        const startTime = performance.now();

        // Temporarily clear hash to avoid jump
        history.replaceState(null, null, ' ');

        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeInOutCubic(progress);
          const newY = startY + (targetY - startY) * eased;
          window.scrollTo({ top: newY, behavior: 'auto' });
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Set hash to trigger :target
            location.hash = id;
            // Ensure scroll position accounts for offset
            window.scrollTo({ top: targetY, behavior: 'auto' });
            // Remove temporary class and rely on :target
            target.classList.remove('target-highlight');
            // Make target focusable for accessibility
            if (!target.hasAttribute('tabindex')) {
              target.setAttribute('tabindex', '-1');
            }
            target.focus({ preventScroll: true });
          }
        }

        requestAnimationFrame(animate);
      });
    });
  }
})();