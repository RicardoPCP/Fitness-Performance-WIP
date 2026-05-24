
  const imagens2 = document.querySelector('.imagens2');
  const segundasecao = document.querySelector('.segundasecao');
  const originalParent = imagens2.parentElement;
  const originalNext = imagens2.nextElementSibling;

  function ajustarLayout() {
    if (window.innerWidth <= 768) {
      segundasecao.appendChild(imagens2);
    } else {
      originalParent.insertBefore(imagens2, originalNext);
    }
  }

  ajustarLayout();
  window.addEventListener('resize', ajustarLayout);