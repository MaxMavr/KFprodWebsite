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
    }
  }

  container.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();

      target += e.deltaY;
      target = Math.max(
        0,
        Math.min(target, container.scrollWidth - container.clientWidth)
      );

      if (!raf) {
        current = container.scrollLeft;
        raf = requestAnimationFrame(animate);
      }
    },
    { passive: false }
  );
});