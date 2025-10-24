const offset = 25; // pixels above scrolled element

// Cubic easing for natural acceleration/deceleration
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Function to handle smooth scrolling and highlighting
function handleFragment(targetID) {
  if (!targetID) return;

  const targetEl = document.getElementById(targetID);
  if (!targetEl) return;

  // Calculate target position with offset
  const startY = window.scrollY;
  const targetRect = targetEl.getBoundingClientRect();
  const targetY = targetRect.top + window.scrollY - offset;
  const distance = Math.abs(targetY - startY);
  const baseDuration = 1500; // milliseconds
  const duration = Math.min(baseDuration, 300 + distance * 0.4); // Dynamic duration based on distance
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    const newY = startY + (targetY - startY) * eased;
    window.scrollTo({ top: newY, behavior: "auto" });
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);

  // Remove previous footnote highlights
  document.querySelectorAll(".target-highlight").forEach(el => {
    el.classList.remove("target-highlight");
  });

  // Apply highlight only for footnotes
  if (/^fn(:|ref:)/.test(targetID)) {
    targetEl.classList.add("target-highlight");
  }
}

// Add smooth-fragments class to body
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("smooth-fragments");

  // Handle page load with fragment in URL
  const targetID = window.location.hash.substring(1);
  if (targetID) {
    handleFragment(targetID);
  }
});

// Handle click events on fragment links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (event) {
    const targetID = this.getAttribute("href").substring(1);
    if (!targetID) return;

    event.preventDefault();
    handleFragment(targetID);

    // Update URL hash without jumping
    history.pushState(null, "", `#${targetID}`);
  });
});