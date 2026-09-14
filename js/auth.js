// Логика входа (заглушка — позже подключим Supabase)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const message = document.getElementById('message');

  // Вход
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;

      // Имитация отправки
      showMessage('Ссылка для входа отправлена на ' + email, 'success');

      // TODO: заменить на supabase.auth.signInWithOtp({ email })
    });
  }

  // Регистрация
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const role = document.getElementById('role').value;

      // Сохраняем локально (пока нет Supabase)
      localStorage.setItem('user', JSON.stringify({ name, email, role }));

      showMessage('Регистрация успешна! Перенаправляем...', 'success');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    });
  }

  function showMessage(text, type) {
    if (!message) return;
    message.textContent = text;
    message.className = 'message ' + type;
  }
});
