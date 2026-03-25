const imageViewerOverlay = document.querySelector(".image-viewer-overlay");
const imageViewerContainers = document.querySelectorAll(".image-viewer-container");


imageViewerContainers.forEach(container => {
  container.addEventListener("click", (e) => {
    const mediaElement = e.target.closest("img, video");
    
    if (!mediaElement) return;

    popUpPosterCreate(mediaElement.cloneNode(true));
  });
});

function popUpPosterCreate(mediaElement) {
  const newPopup = document.createElement("div");
  newPopup.classList.add("image-viewer-overlay-bg");
  newPopup.appendChild(mediaElement);

  newPopup.onclick = () => {
    newPopup.classList.remove("is-visible");
    setTimeout(() => newPopup.remove(), 300);
  };

  imageViewerOverlay.appendChild(newPopup);

  requestAnimationFrame(() => {
    newPopup.classList.add("is-visible");
  });
}
