const containers = document.querySelectorAll('.horizontal-scroll-container');

containers.forEach((container) => {
  let target = 0;
  let current = 0;
  let raf = null;

  const ease = 0.12;

  function animate() {
    current += (target - current) * ease;
    container.scrollLeft = current;

    if (Math.abs(target - current) > 0.5) {
      raf = requestAnimationFrame(animate);
    } else {
      raf = null;
      current = target;
    }
  }

  container.addEventListener(
    'wheel',
    (e) => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;

      const atLeftEdge = target <= 0 && delta < 0;
      const atRightEdge = target >= maxScroll && delta > 0;

      if (atLeftEdge || atRightEdge) {
        return;
      }

      e.preventDefault();

      target += delta;
      target = Math.max(0, Math.min(target, maxScroll));

      if (!raf) {
        current = container.scrollLeft;
        raf = requestAnimationFrame(animate);
      }
    },
    { passive: false }
  );
});