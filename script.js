const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.desktop-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
  menuButton.textContent = isOpen ? '☰' : '×';
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

document.querySelector('#booking-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const notice = form.querySelector('.form-success');
  const button = form.querySelector('button[type="submit"]');
  const originalLabel = button.innerHTML;

  button.disabled = true;
  button.textContent = 'Enviando...';

  try {
    const data = Object.fromEntries(new FormData(form).entries());
    const response = await fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'No se pudo enviar la solicitud');
    }

    notice.textContent = '¡Gracias! Recibimos tu solicitud y te responderé muy pronto.';
    notice.style.color = '#5f754e';
    notice.style.display = 'block';
    form.reset();
  } catch (error) {
    notice.textContent = error.message || 'No se pudo enviar ahora. Intenta nuevamente o escribe por Instagram.';
    notice.style.color = '#a54b4b';
    notice.style.display = 'block';
  } finally {
    button.disabled = false;
    button.innerHTML = originalLabel;
  }
});
