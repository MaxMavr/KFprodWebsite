const connectionButton = document.querySelector(".connection-button");
const preview = document.querySelector('.preview');

connectionButton.onclick = () => {
    if (preview.classList.contains('no-connection')) {
        preview.classList.remove('no-connection')
        connectionButton.textContent = 'Разъединить';
    }
    else {
        preview.classList.add('no-connection')
        connectionButton.textContent = 'Соединить';
    }
};
