const PARALLAX_AMPLITUDE = 100;
const items = document.querySelectorAll('.with-parallax');

const originalTransforms = new Map(
  [...items].map(item => [
    item,
    window.getComputedStyle(item).transform !== 'none' 
      ? window.getComputedStyle(item).transform 
      : ''
  ])
);

let ticking = false;

function updateParallax() {
  const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) - 0.5;
  
  items.forEach(item => {
    const depth = parseFloat(item.dataset.depth || 0);
    const offset = -progress * depth * PARALLAX_AMPLITUDE;
    const original = originalTransforms.get(item);
    item.style.transform = original ? `${original} translateY(${offset}px)` : `translateY(${offset}px)`;
  });
  
  ticking = false;
}

function handleScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateParallax);
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('load', updateParallax);
window.addEventListener('resize', updateParallax);