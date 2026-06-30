const isMobile = () => {
  return window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
};


function createToast(image_path, message, counter) {
  const toast = document.createElement("div");
  toast.id = `toast-${counter}`;
  toast.className = "toast";

  const image = document.createElement("img");
  image.src = image_path;
  image.classList.add("icon", "medium");

  const span = document.createElement("span");
  span.textContent = message;

  toast.appendChild(image);
  toast.appendChild(span);

  toast.addEventListener('pointerup', () => {
    removeToast(toast);
  });

  setTimeout(() => {
    removeToast(toast);
  }, 3000);

  return toast;
}


function removeToast(toast) {
  if (toast.dataset.removing === 'true') return;
  toast.dataset.removing = 'true';

  toast.classList.remove('show');

  toast.addEventListener('transitionend', () => {
    toast.remove();
  }, { once: true });
}


const initToastButtons = () => {
  let counter = 0;
  const toastButtons = document.querySelectorAll(".toast-button");
  const toastContainer = document.getElementById("toast-container");
  
  if (!toastContainer) {
    console.error('Контейнер для тостов не найден');
    return;
  }

  toastButtons.forEach((button) => {
    const image = button.dataset.image;
    const message = button.dataset.message;
    const mobileDisabled = button.dataset.mobile === 'false';
    
    if (!image) {
      console.warn('Тост-кнопка без data-image:', button);
      return;
    }

    if (!message) {
      console.warn('Тост-кнопка без data-message:', button);
      return;
    }
    
    button.addEventListener('pointerup', () => {
      if (isMobile() && mobileDisabled) {
        return;
      }
      
      toastContainer.style.display = "flex";
      
      const toast = createToast(image, message, counter);
      toastContainer.appendChild(toast);

      void toast.offsetHeight;
      toast.classList.add('show');
      
      counter++;
    });
  });
};


document.addEventListener('DOMContentLoaded', initToastButtons);
