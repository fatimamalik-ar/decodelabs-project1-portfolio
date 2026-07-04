
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  primaryNav.classList.toggle('open');
});

// Close the menu automatically once a link is tapped (mobile UX nicety)
primaryNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
  });
});
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in every field before sending.';
    status.style.color = '#B3261E';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.style.color = '#B3261E';
    return;
  }

  // Simulate a successful send (real submission needs a backend/API)
  status.textContent = `Thanks, ${name}! Your message has been noted.`;
  status.style.color = '#3D6B4A';
  form.reset();
});