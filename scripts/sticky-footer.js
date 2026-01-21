const stickyFooter = document.querySelector(".sticky-footer");
const buttonUp = document.querySelector(".button-up");
const bodyHeight = document.body.scrollHeight - window.innerHeight;
const showStickyFooterOnTop = 40;

function upScroll() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function onScroll(event) {
  const footer = document.querySelector("footer");
  if (!footer) return;

  const showStickyFooterOnBottom = footer.clientHeight;

  if (
    scrollY >= showStickyFooterOnTop &&
    bodyHeight - showStickyFooterOnBottom >= scrollY
  ) {
    stickyFooter.classList.add("isvisible");
  } else {
    stickyFooter.classList.remove("isvisible");
  }
}

window.addEventListener("scroll", onScroll, false);
buttonUp?.addEventListener("click", upScroll);