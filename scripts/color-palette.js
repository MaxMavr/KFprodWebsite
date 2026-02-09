const colorElements = document.querySelectorAll('.color');

let currentExpanded = colorElements[0];
currentExpanded.classList.add('expand');

function handleColorMouseEnter(event) {
  const target = event.currentTarget;

  if (currentExpanded) {
    currentExpanded.classList.remove('expand');
  }
  target.classList.add('expand');
  currentExpanded = target;
}

for (let i = 0; i < colorElements.length; i++) {
  colorElements[i].addEventListener('mouseenter', handleColorMouseEnter);
  console.log(colorElements[i]);
}
