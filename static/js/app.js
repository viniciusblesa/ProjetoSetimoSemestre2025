const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle-icon');

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
  themeToggle.title = isDark ? 'Ativar tema claro' : 'Ativar tema escuro';
  themeIcon.textContent = isDark ? '☀' : '☾';
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#141a16' : '#dff4c9';
}

const savedTheme = localStorage.getItem('patinhas-theme');
setTheme(savedTheme || 'light');

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('patinhas-theme', nextTheme);
  setTheme(nextTheme);
});

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const chatLauncher = document.querySelector('.chat-launcher');
const chatBox = document.querySelector('.chat-box');
const chatClose = document.querySelector('.chat-close');
const chatForm = document.querySelector('.chat-form');
const chatInput = document.getElementById('chat-input');
const chatOutput = document.querySelector('.chat-output');

function setChat(open) {
  chatBox.classList.toggle('open', open);
  chatBox.setAttribute('aria-hidden', String(!open));
  chatLauncher.setAttribute('aria-expanded', String(open));
  if (open) chatInput.focus();
}

chatLauncher.addEventListener('click', () => {
  setChat(!chatBox.classList.contains('open'));
});

chatClose.addEventListener('click', () => setChat(false));

function addMessage(text, sender) {
  const message = document.createElement('p');
  message.className = sender === 'user' ? 'user-message' : 'bot-message';
  message.textContent = text;
  chatOutput.appendChild(message);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

chatForm.addEventListener('submit', async event => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  chatInput.value = '';
  chatInput.disabled = true;

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!response.ok) throw new Error('Falha no atendimento');

    const data = await response.json();
    addMessage(data.response, 'bot');
  } catch (_) {
    addMessage('Não consegui responder agora. Tente novamente em instantes.', 'bot');
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
  }
});
