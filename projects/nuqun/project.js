const totalBlocks = 6;
let currentBlock = 0;

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && currentBlock < totalBlocks) {
    loadNext();
  }
}, { threshold: 0.1 });

async function loadNext() {
  observer.disconnect();

  const blockNum = currentBlock + 1;
  const html = await fetch(`block/block${blockNum}.html`).then(r => r.text());
  const container = document.getElementById('loading-container');
  container.insertAdjacentHTML('beforeend', html);

  const lastChild = container.lastElementChild;
  if (lastChild) observer.observe(lastChild);

  currentBlock++;
}

loadNext();