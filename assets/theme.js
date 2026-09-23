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

  document.querySelectorAll('form.product-form').forEach((form) => {
    const details = form.closest('.product-details');
    const productJson = details?.querySelector('[data-product-json]');
    const variantInput = form.querySelector('[data-product-variant-id]');
    const submitButton = form.querySelector('[name="add"]');
    const selects = [...form.querySelectorAll('select[name^="options["]')];

    if (!productJson || !variantInput || !submitButton || !selects.length) return;

    let product;
    try {
      product = JSON.parse(productJson.textContent);
    } catch (error) {
      return;
    }

    const updateVariant = () => {
      const selectedOptions = selects.map((select) => select.value);
      const variant = product.variants.find((candidate) => candidate.options.every((option, index) => option === selectedOptions[index]));

      if (!variant) {
        variantInput.value = '';
        submitButton.disabled = true;
        submitButton.textContent = 'Indisponível';
        return;
      }

      variantInput.value = variant.id;
      submitButton.disabled = !variant.available;
      submitButton.textContent = variant.available ? 'Adicionar ao carrinho' : 'Indisponível';
    };

    selects.forEach((select) => select.addEventListener('change', updateVariant));
    updateVariant();
  });
})();
