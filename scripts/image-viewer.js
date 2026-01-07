const imageViewerOverlay = document.querySelector(".image-viewer-overlay");
const imageViewerContainers = document.querySelectorAll(".image-viewer-container");


imageViewerContainers.forEach(container => {
  container.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    popUpPosterCreate(img.cloneNode(true));
  });
});

function popUpPosterCreate(img) {
  const newPopup = document.createElement("div");
  newPopup.classList.add("image-viewer-overlay-bg");
  newPopup.appendChild(img);

  newPopup.onclick = () => {
    newPopup.classList.remove("is-visible");
    setTimeout(() => newPopup.remove(), 300);
  };

  imageViewerOverlay.appendChild(newPopup);

  requestAnimationFrame(() => {
    newPopup.classList.add("is-visible");
  });
}
