// ===== Blog: filter articles by category =====
(() => {
  const buttons = document.querySelectorAll('.blog-filter button');
  const cards = document.querySelectorAll('.blog-list .post-card');
  const empty = document.querySelector('.blog-empty');
  const list = document.querySelector('.blog-list');

  const apply = cat => {
    let shown = 0;
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.cats.split('|').includes(cat);
      card.hidden = !match;
      if (match) { shown++; card.classList.add('is-in'); }
    });
    list.classList.toggle('is-filtered', cat !== 'all');
    if (empty) empty.hidden = shown > 0;
    buttons.forEach(b => {
      const on = b.dataset.filter === cat;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
    });
  };

  buttons.forEach(b => b.addEventListener('click', () => {
    apply(b.dataset.filter);
    history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : '#' + encodeURIComponent(b.dataset.filter));
  }));

  // Open a category straight from a link, e.g. blog.html#Yoga
  const fromHash = () => {
    const cat = decodeURIComponent(location.hash.slice(1));
    if ([...buttons].some(b => b.dataset.filter === cat)) apply(cat);
  };
  fromHash();
  addEventListener('hashchange', fromHash);
})();
