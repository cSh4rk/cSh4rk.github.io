const offset = 25; // pixels above scrolled element

// Function to handle smooth scrolling and highlighting
function handleFragment(targetID) {
  if (!targetID) return;

  const targetEl = document.getElementById(targetID);
  if (!targetEl) return;

  // Compute top position with offset
  const targetY = targetEl.getBoundingClientRect().top + window.scrollY - offset;

  // Smooth scroll
  window.scrollTo({ top: targetY, behavior: "smooth" });

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