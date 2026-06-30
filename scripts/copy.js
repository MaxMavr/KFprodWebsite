const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Ошибка копирования:', error);
    throw error;
  }
};


const initCopyButtons = () => {
  const copyButtons = document.querySelectorAll('.copy-button');
  
  copyButtons.forEach((button) => {
    const textToCopy = button.dataset.copyText;
    
    if (!textToCopy) {
      console.warn('Кнопка копирования без data-copy-text:', button);
      return;
    }
    
    button.addEventListener('pointerup', () => {
      copyToClipboard(textToCopy);
    });
  });
};


document.addEventListener('DOMContentLoaded', initCopyButtons);
