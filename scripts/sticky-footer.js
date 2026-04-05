const SHOW_STICKY_FOOTER_ON_TOP = 40;

const FOOTER = document.querySelector("footer");
const STICKY_FOOTER = document.getElementById('sticky-footer');
const BUTTON_UP = STICKY_FOOTER?.querySelector(".button-up");

function upScroll() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

let isTicking = false;
function onScroll() {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      handleScrollLogic();
      isTicking = false;
    });
    isTicking = true;
  }
}

function handleScrollLogic() {
  if (!FOOTER || !STICKY_FOOTER) return;

  const scrollY = window.scrollY;
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  const footerHeight = FOOTER.offsetHeight;

  const isVisible = scrollY >= SHOW_STICKY_FOOTER_ON_TOP && scrollY <= maxScrollY - footerHeight;
  STICKY_FOOTER.classList.toggle("isvisible", isVisible);
}


if (FOOTER && STICKY_FOOTER) {
  window.addEventListener("scroll", onScroll, { passive: true });
} else console.warn('Предупреждение: не найден футер или прилипающий футер');


if (BUTTON_UP) {
  BUTTON_UP.addEventListener("click", upScroll);
} else console.warn('Предупреждение: не найдена кнопка «Наверх»');
