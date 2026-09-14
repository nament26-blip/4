// Логика страницы профиля психолога
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('profileContent');
  if (!container) return;

  // Получить ID из URL: profile.html?id=1
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);

  // Найти психолога
  const psychologist = psychologists.find(p => p.id === id);

  if (!psychologist) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 60px;">
        <h2>Психолог не найден</h2>
        <p style="color: var(--text-muted); margin: 20px 0;">
          Возможно, ссылка устарела.
        </p>
        <a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a>
      </div>
    `;
    return;
  }

  // Рендер профиля
  const badges = psychologist.specializations
    .map(s => `<span class="badge">${s}</span>`)
    .join('');

  const approaches = psychologist.approaches
    .map(a => `<span class="badge badge-outline">${a}</span>`)
    .join('');

  const reviewsHTML = psychologist.reviews.length > 0
    ? psychologist.reviews.map(r => `
        <div class="review">
          <div class="review-header">
            <strong>${r.author}</strong>
            <span class="rating">★ ${r.rating}</span>
          </div>
          <p>${r.text}</p>
        </div>
      `).join('')
    : '<p style="color: var(--text-muted);">Пока нет отзывов</p>';

  container.innerHTML = `
    <div class="profile-header">
      <div class="avatar avatar-large">${getInitials(psychologist.name)}</div>
      <div class="profile-info">
        <h1>${psychologist.name}</h1>
        <div>${badges}</div>
        <div class="rating">★ ${psychologist.rating} <span class="reviews-count">(${psychologist.reviewsCount} отзывов)</span></div>
        <p class="profile-meta">
          Опыт: ${psychologist.experience} лет · 
          ${formatLabel(psychologist.format)} · 
          ${psychologist.duration} мин
        </p>
      </div>
    </div>

    <div class="profile-body">
      <div class="profile-main">
        <div class="card">
          <h2>О себе</h2>
          <p style="margin-top: 12px;">${psychologist.bio}</p>
        </div>

        <div class="card">
          <h2>Подходы в работе</h2>
          <div style="margin-top: 12px;">${approaches}</div>
        </div>

        <div class="card">
          <h2>Образование</h2>
          <p style="margin-top: 12px;">${psychologist.education}</p>
        </div>

        <div class="card">
          <h2>Отзывы</h2>
          <div style="margin-top: 16px;">${reviewsHTML}</div>
        </div>
      </div>

      <aside class="profile-sidebar">
        <div class="card booking-card">
          <div class="price-big">${formatPrice(psychologist.price)}</div>
          <p class="price-label">за сессию ${psychologist.duration} мин</p>

          <form id="bookingForm" class="booking-form">
            <label for="clientName">Ваше имя</label>
            <input type="text" id="clientName" required placeholder="Иван">

            <label for="clientEmail">Email</label>
            <input type="email" id="clientEmail" required placeholder="your@email.com">

            <label for="clientDate">Желаемая дата</label>
            <input type="date" id="clientDate" required>

            <label for="clientMessage">Сообщение (необязательно)</label>
            <textarea id="clientMessage" rows="3" placeholder="Опишите, с чем хотите работать"></textarea>

            <button type="submit" class="btn btn-primary btn-full">Записаться</button>
          </form>

          <div id="bookingMessage" class="message"></div>
        </div>
      </aside>
    </div>
  `;

  // Обработка формы записи
  const form = document.getElementById('bookingForm');
  const message = document.getElementById('bookingMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const booking = {
      psychologistId: psychologist.id,
      psychologistName: psychologist.name,
      clientName: document.getElementById('clientName').value,
      clientEmail: document.getElementById('clientEmail').value,
      date: document.getElementById('clientDate').value,
      message: document.getElementById('clientMessage').value,
      price: psychologist.price,
      createdAt: new Date().toISOString()
    };

    // Сохраняем в localStorage (позже заменим на Supabase)
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    message.textContent = 'Заявка отправлена! Психолог свяжется с вами.';
    message.className = 'message success';
    form.reset();

    setTimeout(() => {
      message.className = 'message';
    }, 5000);
  });
});

// Формат цены
function formatPrice(price) {
  return price.toLocaleString('ru-RU') + ' ₽';
}

// Формат психолога
function formatLabel(format) {
  if (format === 'online') return 'Онлайн';
  if (format === 'offline') return 'Офлайн';
  return 'Онлайн и офлайн';
}
