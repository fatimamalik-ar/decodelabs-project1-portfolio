const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  primaryNav.classList.toggle('open');
});

primaryNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
  });
});

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = form.querySelector('button[type="submit"]');

const API_URL = 'http://localhost:3000/api/messages';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showStatus('Please fill in every field before sending.', 'error');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();

    if (!response.ok) {
      const errorText = result.errors ? result.errors.join(' ') : 'Something went wrong. Please try again.';
      showStatus(errorText, 'error');
      return;
    }

    showStatus(`Thanks, ${name}! Your message has been received.`, 'success');
    form.reset();

  } catch (err) {
    showStatus('Could not reach the server. Is the backend running?', 'error');
    console.error(err);
  } finally {
    setLoading(false);
  }
});

function showStatus(text, type) {
  status.textContent = text;
  status.style.color = type === 'error' ? '#B3261E' : '#3D6B4A';
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? 'Sending...' : 'Send Message';
}