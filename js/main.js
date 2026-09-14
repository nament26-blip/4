// Демо-данные психологов (с ID и расширенными полями)
const psychologists = [
  {
    id: 1,
    name: 'Анна Иванова',
    specializations: ['Тревога', 'Депрессия'],
    approaches: ['КПТ', 'ACT'],
    experience: 8,
    price: 3000,
    duration: 50,
    format: 'online',
    rating: 4.9,
    reviewsCount: 47,
    education: 'МГУ им. Ломоносова, факультет психологии',
    bio: 'Помогаю справляться с тревогой, паническими атаками и депрессией. Работаю в подходе КПТ — это доказательный метод, который даёт результат уже через несколько сессий.',
    reviews: [
      { author: 'Марина К.', rating: 5, text: 'Анна помогла мне справиться с паническими атаками. Очень благодарна!' },
      { author: 'Дмитрий Л.', rating: 5, text: 'Профессионал своего дела. Работали 3 месяца, результат отличный.' }
    ]
  },
  {
    id: 2,
    name: 'Мария Петрова',
    specializations: ['Отношения', 'Семейная терапия'],
    approaches: ['Гештальт', 'ЭФТ'],
    experience: 12,
    price: 4500,
    duration: 60,
    format: 'both',
    rating: 4.8,
    reviewsCount: 63,
    education: 'СПбГУ, семейная психология',
    bio: 'Семейный психолог с 12-летним опытом. Помогаю парам наладить отношения, пережить кризис, восстановить доверие.',
    reviews: [
      { author: 'Ольга и Сергей', rating: 5, text: 'Спасли наш брак. Спасибо Марии!' }
    ]
  },
  {
    id: 3,
    name: 'Дмитрий Соколов',
    specializations: ['Депрессия', 'Выгорание'],
    approaches: ['КПТ', 'ACT'],
    experience: 6,
    price: 2500,
    duration: 50,
    format: 'online',
    rating: 4.7,
    reviewsCount: 28,
    education: 'ВШЭ, клиническая психология',
    bio: 'Работаю с депрессией и профессиональным выгоранием. Помогаю вернуть интерес к жизни и работе.',
    reviews: []
  },
  {
    id: 4,
    name: 'Елена Кузнецова',
    specializations: ['Детская психология', 'Подростки'],
    approaches: ['Игровая терапия', 'АРТ'],
    experience: 10,
    price: 3500,
    duration: 50,
    format: 'both',
    rating: 5.0,
    reviewsCount: 52,
    education: 'МПГУ, детская психология',
    bio: 'Детский психолог. Работаю с детьми от 3 лет и подростками. Помогаю с адаптацией, страхами, поведением.',
    reviews: [
      { author: 'Наталья В.', rating: 5, text: 'Елена нашла подход к моему сыну. Он ждёт каждую встречу!' }
    ]
  },
  {
    id: 5,
    name: 'Игорь Морозов',
    specializations: ['Психоанализ', 'Тревога'],
    approaches: ['Психоанализ'],
    experience: 15,
    price: 5000,
    duration: 60,
    format: 'offline',
    rating: 4.9,
    reviewsCount: 89,
    education: 'Институт психоанализа, Москва',
    bio: 'Психоаналитик с 15-летней практикой. Работаю с глубинными причинами тревоги и внутренних конфликтов.',
    reviews: []
  },
  {
    id: 6,
    name: 'Ольга Новикова',
    specializations: ['Отношения', 'Самооценка'],
    approaches: ['КПТ', 'Схема-терапия'],
    experience: 7,
    price: 3200,
    duration: 50,
    format: 'online',
    rating: 4.8,
    reviewsCount: 41,
    education: 'РГГУ, психология личности',
    bio: 'Помогаю наладить отношения с собой и другими. Работаю с самооценкой, границами, повторяющимися сценариями.',
    reviews: []
  }
];

// Получить инициалы
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

// Формат цены
function formatPrice(price) {
  return price.toLocaleString('ru-RU') + ' ₽';
}

// Формат психолога: онлайн/офлайн/оба
function formatLabel(format) {
  if (format === 'online') return 'Онлайн';
  if (format === 'offline') return 'Офлайн';
  return 'Онлайн и офлайн';
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
      <div class="rating">★ ${p.rating} <span class="reviews-count">(${p.reviewsCount})</span></div>
      <div class="card-meta">Опыт: ${p.experience} лет · ${formatLabel(p.format)}</div>
      <div class="price">${formatPrice(p.price)} / сессия</div>
      <a href="profile.html?id=${p.id}" class="btn btn-primary">Записаться</a>
    </div>
  `;
}

// Отрисовать карточки на главной и в каталоге
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('psychologistsGrid');
  if (grid) {
    grid.innerHTML = psychologists.map(createCard).join('');
  }
});
