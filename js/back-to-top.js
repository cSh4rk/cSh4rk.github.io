// Check if DOM is ready before running
function initBackToTop() {
  const btn = document.getElementById("toTopButton");
  if (!btn) return; // Exit gracefully if button is missing

  // Minimal browser feature check
  if (
    !window.requestAnimationFrame ||
    !window.performance ||
    !btn.classList
  ) return;

  const showAfter = 800;
  let isVisible = false;
  let isScrolling = false;

  // Throttled visibility toggle with ticking
  const toggleBtn = () => {
    const shouldBeVisible = window.scrollY > showAfter;
    if (shouldBeVisible !== isVisible) {
      btn.classList.toggle("visible", shouldBeVisible);
      isVisible = shouldBeVisible;
    }
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleBtn();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  toggleBtn(); // Run immediately to check initial state

  // Smooth non-linear scroll (easeInOutCubic)
  function scrollToTopSmooth() {
    if (isScrolling) return; // Prevent overlapping animations
    isScrolling = true;

    const start = window.scrollY;
    const duration = 1500;
    const startTime = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, start * (1 - eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isScrolling = false;
      }
    }

    requestAnimationFrame(animate);
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToTopSmooth();
    btn.blur();
  });
}

// Run immediately if DOM is ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
  initBackToTop();
}