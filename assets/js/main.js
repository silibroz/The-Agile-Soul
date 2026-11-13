// ===== WhatsApp number (country code + number, no + or spaces) =====
const WA_NUMBER = '917044979474';

// Any link with data-wa="message" opens WhatsApp with that message
document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(link.dataset.wa)}`;
  link.target = '_blank';
  link.rel = 'noopener';
});

// Review stars from data-rating (e.g. 4.8)
document.querySelectorAll('.review').forEach(card => {
  const r = parseFloat(card.dataset.rating) || 5;
  const stars = card.querySelector('.stars');
  stars.innerHTML = `<i style="--fill:${(r / 5) * 100}%">★★★★★</i>${r.toFixed(1)}`;
  stars.setAttribute('aria-label', `Rated ${r} out of 5`);
});

// Testimonial marquee: repeat cards to fill the row, then loop seamlessly
document.querySelectorAll('.marquee').forEach(marquee => {
  const track = marquee.querySelector('.marquee__track');
  const originals = [...track.children];
  if (!originals.length) return;
  const addSet = hidden => originals.forEach(card => {
    const c = card.cloneNode(true);
    if (hidden) c.setAttribute('aria-hidden', 'true');
    track.appendChild(c);
  });
  while (track.scrollWidth < marquee.offsetWidth) addSet(true);
  const setCount = track.children.length;
  [...track.children].slice(0, setCount).forEach(card => {
    const c = card.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    track.appendChild(c);
  });
  track.style.setProperty('--dur', `${setCount * 7}s`);
});

// FAQ: only one answer open at a time
const faqItems = document.querySelectorAll('.faq__item');
faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) faqItems.forEach(other => { if (other !== item) other.open = false; });
  });
});

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Close mobile menu after tapping a link
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
