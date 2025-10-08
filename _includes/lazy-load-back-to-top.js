function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.body.appendChild(script);
}

let scriptLoaded = false;
const showAfter = 800;

function checkScroll() {
  if (!scriptLoaded && window.scrollY > showAfter - 200) {
    scriptLoaded = true;
    loadScript('{{ "/js/back-to-top.js" | prepend: site.baseurl | replace: "//", "/" }}');
    window.removeEventListener('scroll', checkScroll);
  }
}

window.addEventListener('scroll', checkScroll, { passive: true });