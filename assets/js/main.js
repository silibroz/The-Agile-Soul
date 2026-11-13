// ===== WhatsApp number (country code + number, no + or spaces) =====
const WA_NUMBER = '+917044979474';

// Any link with data-wa="message" opens WhatsApp with that message
document.querySelectorAll('[data-wa]').forEach(link => {
  link.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(link.dataset.wa)}`;
  link.target = '_blank';
  link.rel = 'noopener';
});

// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
