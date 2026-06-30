function createViewerOverlay(mediaElement) {
  const viewerOverlayElement = document.createElement("div");
  viewerOverlayElement.classList.add("overlay-background");
  viewerOverlayElement.appendChild(mediaElement);

  viewerOverlayElement.addEventListener("pointerup", (e) => {
    viewerOverlayElement.classList.remove("is-visible");
    setTimeout(() => viewerOverlayElement.remove(), 300);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOverlay();
      document.removeEventListener('keydown', handleKeydown);
    }
  });

  return viewerOverlayElement;
}


const initViewerContainers = () => {
  const viewerOverlay = document.getElementById("viewer-overlay");
  const viewerContainers = document.querySelectorAll(".viewer-container");

  if (!viewerOverlay) {
    console.error('Контейнер для оверлейв не найден');
    return;
  }

  viewerContainers.forEach(container => {
    container.addEventListener("pointerup", (e) => {
      const mediaElement = e.target.closest("img, video");
      
      if (!mediaElement) return;

      const viewerOverlayElement = createViewerOverlay(mediaElement.cloneNode(true));

      viewerOverlay.appendChild(viewerOverlayElement);

      requestAnimationFrame(() => {
        viewerOverlayElement.classList.add("is-visible");
      });
    });
  });
};


document.addEventListener('DOMContentLoaded', initViewerContainers);
