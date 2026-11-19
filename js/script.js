/* ========================================================
   ДАННЫЕ ЖИВОТНЫХ
   ======================================================== */
const animals = [
  {
    id:1, name:"Лаки", species:"Собака", breed:"Метис",
    age:"2 года", gender:"Мальчик", size:"Средний",
    img:"https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=80",
    tag:"Ласковый и игривый",
    desc:"Лаки попал к нам полгода назад. Он очень дружелюбный, обожает детей и других собак. Знает команду «сидеть», приучен к поводку. Идеальный компаньон для активной семьи."
  },
  {
    id:2, name:"Мурка", species:"Кошка", breed:"Домашняя",
    age:"1 год", gender:"Девочка", size:"Мини",
    img:"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    tag:"Тихая и ласковая",
    desc:"Мурка — нежная и спокойная кошечка. Она любит сидеть на коленях и мурлыкать. Приучена к лотку. Ищет тихую семью без маленьких детей."
  },
  {
    id:3, name:"Рекс", species:"Собака", breed:"Овчарка",
    age:"4 года", gender:"Мальчик", size:"Крупный",
    img:"https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80",
    tag:"Умный и преданный",
    desc:"Рекс — настоящий защитник. Он отлично слушается команд, не агрессивен к людям. Идеально подойдёт для проживания в частном доме."
  },
  {
    id:4, name:"Барсик", species:"Кошка", breed:"Британская",
    age:"3 года", gender:"Мальчик", size:"Мини",
    img:"https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80",
    tag:"Важный и спокойный",
    desc:"Барсик — настоящий джентльмен. Спокойный, чистоплотный, любит спать на подоконнике. Хорошо уживается с другими кошками."
  },
  {
    id:5, name:"Белла", species:"Собака", breed:"Лабрадор",
    age:"1.5 года", gender:"Девочка", size:"Средний",
    img:"https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80",
    tag:"Энергичная и добрая",
    desc:"Белла — молодая и жизнерадостная собака. Обожает бегать, играть с мячом и плавать. Станет отличным другом для активных людей."
  },
  {
    id:6, name:"Пушок", species:"Кошка", breed:"Персидская",
    age:"5 лет", gender:"Мальчик", size:"Мини",
    img:"https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80",
    tag:"Мягкий и уютный",
    desc:"Пушок — пушистый и ласковый кот. Любит расчёсывания и внимание. Требует регулярного ухода за шерстью. Прекрасный компаньон для спокойных людей."
  }
];

/* ========================================================
   НАСТРОЙКИ ДОСТУПНОСТИ
   ======================================================== */
const htmlEl = document.documentElement;
const FONT_STEP = 0.15;      // шаг изменения шрифта
const FONT_MIN  = 0.75;      // минимум
const FONT_MAX  = 1.9;       // максимум

// --- Загрузка сохранённых настроек ---
function loadSettings(){
  const savedScale    = parseFloat(localStorage.getItem('a11y-font-scale'));
  const savedTheme    = localStorage.getItem('a11y-theme');
  const savedContrast = localStorage.getItem('a11y-contrast');

  if(!isNaN(savedScale)){
    htmlEl.style.setProperty('--font-scale', savedScale);
  }
  if(savedTheme === 'dark'){
    htmlEl.setAttribute('data-theme','dark');
  }
  if(savedContrast === 'on'){
    htmlEl.setAttribute('data-contrast','on');
    document.getElementById('contrastToggle').setAttribute('aria-pressed','true');
  }
  updateThemeButtonLabel();
}

// --- Получить текущий масштаб ---
function getFontScale(){
  const val = parseFloat(getComputedStyle(htmlEl).getPropertyValue('--font-scale'));
  return isNaN(val) ? 1 : val;
}

// --- Установить масштаб шрифта ---
function setFontScale(scale){
  scale = Math.min(FONT_MAX, Math.max(FONT_MIN, scale));
  htmlEl.style.setProperty('--font-scale', scale);
  localStorage.setItem('a11y-font-scale', scale);
}

// --- Увеличение / уменьшение / сброс ---
document.getElementById('fontPlus').addEventListener('click', () => {
  setFontScale(getFontScale() + FONT_STEP);
});
document.getElementById('fontMinus').addEventListener('click', () => {
  setFontScale(getFontScale() - FONT_STEP);
});
document.getElementById('fontReset').addEventListener('click', () => {
  setFontScale(1);
});

// --- Переключение темы ---
const themeToggle = document.getElementById('themeToggle');
function updateThemeButtonLabel(){
  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  themeToggle.textContent = isDark ? '☀️ Тема' : '🌙 Тема';
}
themeToggle.addEventListener('click', () => {
  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  if(isDark){
    htmlEl.removeAttribute('data-theme');
    localStorage.setItem('a11y-theme','light');
  } else {
    htmlEl.setAttribute('data-theme','dark');
    localStorage.setItem('a11y-theme','dark');
  }
  updateThemeButtonLabel();
});

// --- Контрастный режим ---
const contrastToggle = document.getElementById('contrastToggle');
contrastToggle.addEventListener('click', () => {
  const isOn = htmlEl.getAttribute('data-contrast') === 'on';
  if(isOn){
    htmlEl.removeAttribute('data-contrast');
    contrastToggle.setAttribute('aria-pressed','false');
    localStorage.setItem('a11y-contrast','off');
  } else {
    htmlEl.setAttribute('data-contrast','on');
    contrastToggle.setAttribute('aria-pressed','true');
    localStorage.setItem('a11y-contrast','on');
  }
});

// Применяем сохранённые настройки сразу
loadSettings();

/* ========================================================
   РЕНДЕР КАРТОЧЕК ЖИВОТНЫХ
   ======================================================== */
const cardsBox = document.getElementById('cards');
animals.forEach(a => {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('tabindex','0');
  card.setAttribute('role','button');
  card.setAttribute('aria-label', `Открыть анкету: ${a.name}, ${a.species}, ${a.age}`);
  card.innerHTML = `
    <img src="${a.img}" alt="${a.name} — ${a.species}, ${a.breed}">
    <div class="card-body">
      <h3>${a.name}</h3>
      <div class="meta">${a.species} · ${a.breed} · ${a.age}</div>
      <p>${a.tag}</p>
      <span class="more">Подробнее →</span>
    </div>
  `;
  card.addEventListener('click', () => openModal(a));
  card.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      openModal(a);
    }
  });
  cardsBox.appendChild(card);
});

/* ========================================================
   МОДАЛЬНОЕ ОКНО
   ======================================================== */
const overlay       = document.getElementById('modalOverlay');
const closeBtn      = document.getElementById('closeModal');
const adoptBtn      = document.getElementById('adoptBtn');
const adoptFormBox  = document.getElementById('adoptFormBox');
const adoptForm     = document.getElementById('adoptForm');
const adoptMsg      = document.getElementById('adoptMsg');

let lastFocusedElement = null;

function openModal(a){
  lastFocusedElement = document.activeElement;

  document.getElementById('modalImg').src = a.img;
  document.getElementById('modalImg').alt = `${a.name} — ${a.species}, ${a.breed}`;
  document.getElementById('modalTitle').textContent = a.name;
  document.getElementById('modalTag').textContent = a.tag;
  document.getElementById('modalDesc').textContent = a.desc;

  document.getElementById('modalFacts').innerHTML = `
    <li><strong>Вид:</strong> ${a.species}</li>
    <li><strong>Порода:</strong> ${a.breed}</li>
    <li><strong>Возраст:</strong> ${a.age}</li>
    <li><strong>Пол:</strong> ${a.gender}</li>
    <li><strong>Размер:</strong> ${a.size}</li>
    <li><strong>ID:</strong> #${String(a.id).padStart(3,'0')}</li>
  `;

  // сброс формы усыновления
  adoptFormBox.style.display = 'none';
  adoptForm.reset();
  adoptForm.style.display = 'grid';
  adoptMsg.style.display = 'none';
  adoptBtn.style.display = 'inline-block';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeModal(){
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  if(lastFocusedElement) lastFocusedElement.focus();
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
  if(e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
});

/* ========================================================
   АНКЕТА УСЫНОВЛЕНИЯ
   ======================================================== */
adoptBtn.addEventListener('click', () => {
  adoptFormBox.style.display = 'block';
  adoptBtn.style.display = 'none';
  adoptFormBox.scrollIntoView({behavior:'smooth', block:'nearest'});
  document.getElementById('aname').focus();
});

adoptForm.addEventListener('submit', e => {
  e.preventDefault();
  adoptForm.style.display = 'none';
  adoptMsg.style.display = 'block';
});

/* ========================================================
   ФОРМА ВОЛОНТЁРА
   ======================================================== */
const volunteerForm = document.getElementById('volunteerForm');
const formMsg = document.getElementById('formMsg');
volunteerForm.addEventListener('submit', e => {
  e.preventDefault();
  formMsg.style.display = 'block';
  e.target.reset();
});

/* ========================================================
   ПЛАВНЫ