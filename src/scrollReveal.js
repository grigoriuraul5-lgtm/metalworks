// Lightweight scroll reveal using IntersectionObserver
const reveals = () => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12,
    },
  );

  items.forEach((el) => {
    obs.observe(el);
  });

  // Force active on elements already in viewport on page load
  // Use requestAnimationFrame to ensure layout is complete
  requestAnimationFrame(() => {
    items.forEach((el) => {
      if (!el.classList.contains('active')) {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('active');
          obs.unobserve(el);
        }
      }
    });
  });
};

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    reveals();
  });
  // In case of SPA navigations, run on DOMContentLoaded as well
  document.addEventListener('DOMContentLoaded', reveals);
}

export default reveals;
