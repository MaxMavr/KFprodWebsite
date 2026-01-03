const stickyFooter = document.querySelector(".sticky-footer"),
  buttonUp = document.querySelector(".button-up"),
  bodyHeight = document.body.scrollHeight - window.innerHeight,
  showStickyFooterOnTop = 40,
  showStickyFooterOnBottom = document.querySelector("footer").clientHeight;


function upScroll() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function onScroll(event) {
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
buttonUp.addEventListener("click", upScroll);
