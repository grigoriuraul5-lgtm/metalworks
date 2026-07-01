// Simple parallax effect for elements with .parallax class
let ticking = false;

function updateParallax() {
  const els = document.querySelectorAll('.parallax');
  if (!els.length) return;

  els.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    // Calculate progress of element in viewport (0..1)
    const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), -1), 1);
    // Move background slower than scroll
    const offset = Math.round(progress * 20); // tweak multiplier for intensity
    el.style.backgroundPosition = `center ${offset}px`;
  });
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // initial call
  window.addEventListener('load', updateParallax);
  document.addEventListener('DOMContentLoaded', updateParallax);
}

export default updateParallax;
