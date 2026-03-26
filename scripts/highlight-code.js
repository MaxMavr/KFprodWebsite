document.querySelectorAll('pre.code-block').forEach((block) => {
  Prism.highlightElement(block);
});