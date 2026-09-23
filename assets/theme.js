(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.hidden = expanded;
      document.body.classList.toggle('menu-open', !expanded);
    });
  }

  document.querySelectorAll('.product-gallery__thumbs img').forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const main = document.querySelector('.product-gallery__main img');
      if (main) main.src = thumbnail.currentSrc || thumbnail.src;
    });
  });
})();
