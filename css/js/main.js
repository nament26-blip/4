// Демо-данные психологов
const psychologists = [
  {
    name: 'Анна Иванова',
    specializations: ['Тревога', 'Депрессия'],
    experience: 8,
    price: 3000,
    rating: 4.9
  },
  {
    name: 'Мария Петрова',
    specializations: ['Отношения', 'Семейная терапия'],
    experience: 12,
    price: 4500,
    rating: 4.8
  },
  {
    name: 'Дмитрий Соколов',
    specializations: ['Депрессия', 'КПТ'],
    experience: 6,
    price: 2500,
    rating: 4.7
  },
  {
    name: 'Елена Кузнецова',
    specializations: ['Детская психология'],
    experience: 10,
    price: 3500,
    rating: 5.0
  },
  {
    name: 'Игорь Морозов',
    specializations: ['Психоанализ', 'Тревога'],
    experience: 15,
    price: 5000,
    rating: 4.9
  },
  {
    name: 'Ольга Новикова',
    specializations: ['Отношения', 'Самооценка'],
    experience: 7,
    price: 3200,
    rating: 4.8
  }
];

// Получить инициалы
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

// Создать карточку психолога
function createCard(p) {
  const badges = p.specializations
    .map(s => `<span class="badge">${s}</span>`)
    .join('');

  return `
    <div class="card">
      <div class="avatar">${getInitials(p.name)}</div>
      <h3>${p.name}</h3>
      <div>${badges}</div>
      <div class="rating">★ ${p.rating}</div>
      <div>Опыт: ${p.experience} лет</div>
      <div class="price">${p.price} ₽ / сессия</div>
      <a href="#" class="btn btn-primary">Записаться</a>
    </div>
  `;
}

// Отрисовать все карточки
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('psychologistsGrid');
  if (grid) {
    grid.innerHTML = psychologists.map(createCard).join('');
  }
});
