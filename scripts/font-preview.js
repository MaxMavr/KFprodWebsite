const PLACEHOLDER = 'Напишите что-нибудь'


function initFontPreview() {
    const textInput = document.getElementById('font-preview');
    
    if (!textInput) {
        console.error('Поле для демонстрации шрифта не найдено');
        return;
    }

    const setSelection = () => {
        if (!textInput.firstChild) {
            textInput.textContent = PLACEHOLDER;
        }
        
        const range = document.createRange();
        const selection = window.getSelection();
        const textLength = textInput.textContent.length;
        
        range.setStart(textInput.firstChild, textLength);
        range.setEnd(textInput.firstChild, textLength);
        selection.removeAllRanges(); 
        selection.addRange(range); 
        textInput.focus(); 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                setSelection();
            }
        });
    });

    observer.observe(textInput);
}


document.addEventListener('DOMContentLoaded', initFontPreview);
