// Логика личного кабинета
document.addEventListener('DOMContentLoaded', () => {
  // Проверка входа
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Приветствие и email в шапке
  document.getElementById('welcome').textContent = 'Привет, ' + user.name + '!';
  const emailEl = document.getElementById('userEmail');
  if (emailEl) emailEl.textContent = user.email;

  // Текущий активный таб
  let activeTab = 'upcoming';

  // Кнопки табов
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTab = btn.dataset.tab;
      renderBookings();
    });
  });

  // Рендер записей
  function renderBookings() {
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const listEl = document.getElementById('bookingsList');
    const emptyEl = document.getElementById('emptyState');

    // Разделяем по статусу
    const now = new Date();
    const upcoming = allBookings.filter(b => 
      b.status !== 'cancelled' && new Date(b.date) >= now
    );
    const past = allBookings.filter(b => 
      b.status !== 'cancelled' && new Date(b.date) < now
    );
    const cancelled = allBookings.filter(b => b.status === 'cancelled');

    let items = [];
    if (activeTab === 'upcoming') items = upcoming;
    if (activeTab === 'past') items = past;
    if (activeTab === 'cancelled') items = cancelled;

    // Пустое состояние
    if (items.length === 0) {
      listEl.innerHTML = '';
      emptyEl.style.display = 'block';

      // Меняем текст пустого состояния под таб
      const emptyTitle = emptyEl.querySelector('h3');
      const emptyText = emptyEl.querySelector('p');
      if (activeTab === 'upcoming') {
        emptyTitle.textContent = 'Пока нет предстоящих записей';
        emptyText.textContent = 'Найдите психолога и запишитесь на сессию';
      } else if (activeTab === 'past') {
        emptyTitle.textContent = 'Прошедших записей нет';
        emptyText.textContent = 'Здесь появятся завершённые сессии';
      } else {
        emptyTitle.textContent = 'Отменённых записей нет';
        emptyText.textContent = 'Здесь появятся отменённые сессии';
      }
      return;
    }

    emptyEl.style.display = 'none';

    // Рендер карточек
    listEl.innerHTML = items.map(b => {
      const date = new Date(b.date);
      const dateStr = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const psychologist = psychologists.find(p => p.id === b.psychologistId);
      const initials = psychologist ? getInitials(psychologist.name) : '?';

      const statusLabel = b.status === 'cancelled' 
        ? '<span class="status-badge status-cancelled">Отменена</span>'
        : new Date(b.date) < new Date()
          ? '<span class="status-badge status-past">Завершена</span>'
          : '<span class="status-badge status-upcoming">Предстоит</span>';

      const cancelBtn = b.status !== 'cancelled' && new Date(b.date) >= new Date()
        ? `<button class="btn btn-secondary btn-small" onclick="cancelBooking('${b.createdAt}')">Отменить</button>`
        : '';

      return `
        <div class="booking-item">
          <div class="avatar">${initials}</div>
          <div class="booking-info">
            <div class="booking-header">
              <h3>${b.psychologistName}</h3>
              ${statusLabel}
            </div>
            <p class="booking-date">📅 ${dateStr}</p>
            ${b.message ? `<p class="booking-message">${b.message}</p>` : ''}
            <p class="booking-price">${b.price.toLocaleString('ru-RU')} ₽</p>
          </div>
          <div class="booking-actions">
            <a href="profile.html?id=${b.psychologistId}" class="btn btn-primary btn-small">К профилю</a>
            ${cancelBtn}
          </div>
        </div>
      `;
    }).join('');
  }

  // Отмена записи
  window.cancelBooking = function(createdAt) {
    if (!confirm('Вы уверены, что хотите отменить запись?')) return;

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updated = bookings.map(b => 
      b.createdAt === createdAt ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('bookings', JSON.stringify(updated));
    renderBookings();
  };

  // Выход
  window.logout = function() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  };

  // Первый рендер
  renderBookings();
});
