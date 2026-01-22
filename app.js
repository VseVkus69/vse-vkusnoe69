// ===== Мобильное меню + плавный скролл =====
const mobileNav = document.getElementById('mobileNav');
const burger = document.getElementById('burger');
const header = document.querySelector('.header');

function closeMobile(){ if (mobileNav) mobileNav.style.display = 'none'; }
function toggleMobile(){ if (mobileNav) mobileNav.style.display = (mobileNav.style.display === 'block') ? 'none' : 'block'; }

if (burger) burger.addEventListener('click', toggleMobile);
if (mobileNav) mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

// Header scroll effect
window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Smooth scroll для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) { 
      e.preventDefault(); 
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// ===== Карточки: защита от битых изображений =====
function ensureCardImages(){
  document.querySelectorAll('.card-img').forEach(box=>{
    const img = box.querySelector('img');
    if (!img){
      const ph = document.createElement('div'); ph.className = 'img-placeholder'; box.appendChild(ph); return;
    }
    const toPh = ()=>{ const ph=document.createElement('div'); ph.className='img-placeholder'; img.replaceWith(ph); };
    if (img.complete){
      if (img.naturalWidth === 0) toPh();
    }else{
      img.addEventListener('error', toPh, {once:true});
      img.addEventListener('load', ()=>{ if(img.naturalWidth===0) toPh(); }, {once:true});
    }
  });
}

// ===== Адреса (9 точек) =====
const branches = [
  { id:'osnab', name:'Оснабрюкская', mapName:'Всё вкусное', address:'Оснабрюкская 14', phone:'+79106475169', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-20:00' },
  { id:'mosc',  name:'Московская', mapName:'Всё вкусное', address:'Московская 1', phone:'+79106406291', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00' },
  { id:'pasha', name:'Паши Савельевой', mapName:'Всё вкусное', address:'Паши Савельевой 27к1', phone:'+79157036295', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00' },
  { id:'ordzh', name:'Орджоникидзе', mapName:'Всё вкусное', address:'Орджоникидзе 46А', phone:'+79201653618', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00' },
  { id:'voln',  name:'Вольного Новгорода', mapName:'Шантили', address:'Вольного Новгорода 14', phone:'+79157399659', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-20:00' },
  { id:'lenin', name:'пр. Ленина', mapName:'Всё вкусное', address:'проспект Ленина 8', phone:'+79201653608', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00' },
  { id:'koms',  name:'пр. Комсомольский', mapName:'Всё вкусное', address:'проспект Комсомольский 4к4', phone:'+79201585021', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00' },
  { id:'bshm',  name:'Бульвар Шмидта', mapName:'Всё вкусное', address:'Бульвар Шмидта 38', phone:'+79201678789', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-19:00' },
  { id:'levit', name:'ул. Левитана', mapName:'Всё вкусное', address:'ул. Левитана 58к1', phone:'+79201788752', hours:'Пн-Пт 9:00-20:00, Сб-Вс 10:00-20:00' }
];

let yandexMap = null;

// Координаты филиалов в Твери (точные)
const branchCoords = {
  'osnab': [56.824086, 35.863658],   // Оснабрюкская 14
  'mosc':  [56.852861, 35.928019],   // Московская 1
  'pasha': [56.883354, 35.840972],   // Паши Савельевой 27к1
  'ordzh': [56.833428, 35.923862],   // Орджоникидзе 46А
  'voln':  [56.859653, 35.914939],   // Вольного Новгорода 14
  'lenin': [56.849123, 35.827611],   // пр. Ленина 8
  'koms':  [56.867827, 35.918068],   // пр. Комсомольский 4к4
  'bshm':  [56.872887, 35.907727],   // Бульвар Шмидта 38
  'levit': [56.811267, 35.898042]    // ул. Левитана 58к1
};

// Инициализация Яндекс.Карты
function initYandexMap() {
  if (typeof ymaps === 'undefined') {
    console.error('Яндекс.Карты не загружены');
    return;
  }

  ymaps.ready(function() {
    yandexMap = new ymaps.Map('yandexMap', {
      center: [56.850, 35.890], // Центр между всеми филиалами
      zoom: 11,
      controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
    });

    // Добавляем метки для всех филиалов
    branches.forEach(b => {
      const coords = branchCoords[b.id];
      if (coords) {
        const placemark = new ymaps.Placemark(coords, {
          balloonContentHeader: `<strong>${b.mapName || b.name}</strong>`,
          balloonContentBody: `
            <div style="padding: 8px 0;">
              <p style="margin: 4px 0;"><strong>Адрес:</strong> ${b.address}</p>
              <p style="margin: 4px 0;"><strong>Телефон:</strong> <a href="tel:${b.phone}">${b.phone}</a></p>
              <p style="margin: 4px 0;"><strong>Режим:</strong><br>${b.hours.replace(', ', '<br>')}</p>
            </div>
          `,
          hintContent: b.mapName || b.name
        }, {
          preset: 'islands#redDotIcon'
        });

        yandexMap.geoObjects.add(placemark);
      }
    });
  });
}

const branchList = document.getElementById('branchList');
const mapTitle   = document.getElementById('mapTitle');
let activeBranchId = branches[0]?.id || null;

function setActive(id){
  activeBranchId = id;
  const b = branches.find(x=>x.id===id) || branches[0];
  const coords = branchCoords[id];
  
  if (yandexMap && coords) {
    yandexMap.setCenter(coords, 16, {
      duration: 300
    });
    // Открываем балун для выбранного филиала
    yandexMap.geoObjects.each(function(geoObject) {
      if (geoObject.properties && geoObject.geometry) {
        const objCoords = geoObject.geometry.getCoordinates();
        if (objCoords[0] === coords[0] && objCoords[1] === coords[1]) {
          geoObject.balloon.open();
        }
      }
    });
  }
  
  if (mapTitle) mapTitle.textContent = `${b.name}: ${b.address}`;
  closeBranchesModalFunc();
}

// ===== Модальное окно с филиалами =====
const showBranchesBtn = document.getElementById('showBranchesBtn');
const branchesModal = document.getElementById('branchesModal');
const closeBranchesModal = document.getElementById('closeBranchesModal');
const branchesModalList = document.getElementById('branchesModalList');

function openBranchesModal(){
  if (branchesModal) {
    branchesModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderBranchesModal();
  }
}

function closeBranchesModalFunc(){
  if (branchesModal) {
    branchesModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderBranchesModal(){
  if (!branchesModalList) return;
  branchesModalList.innerHTML = '';
  
  branches.forEach(b=>{
    const tel = (b.phone||'').replace(/[^+\d]/g,'');
    
    const item = document.createElement('div');
    item.className = 'branch-modal-item';
    
    const name = document.createElement('div');
    name.className = 'branch-modal-name';
    name.textContent = b.name;
    
    const address = document.createElement('div');
    address.className = 'branch-modal-address';
    address.textContent = b.address;
    address.style.cursor = 'pointer';
    address.addEventListener('click', ()=> setActive(b.id));
    
    const hours = document.createElement('div');
    hours.className = 'branch-modal-hours';
    
    // Разбиваем режим работы на части
    const hoursText = b.hours || 'Уточняйте по телефону';
    const parts = hoursText.split(', ');
    
    if (parts.length === 2) {
      hours.innerHTML = `
        <div class="hours-icon">🕐</div>
        <div class="hours-text">
          <div class="hours-weekdays">${parts[0]}</div>
          <div class="hours-weekend">${parts[1]}</div>
        </div>
      `;
    } else {
      hours.innerHTML = `
        <div class="hours-icon">🕐</div>
        <div class="hours-text">${hoursText}</div>
      `;
    }
    
    const phoneLink = document.createElement('a');
    phoneLink.className = 'branch-modal-phone';
    phoneLink.href = `tel:${tel}`;
    phoneLink.textContent = b.phone || '';
    
    item.appendChild(name);
    item.appendChild(address);
    item.appendChild(hours);
    item.appendChild(phoneLink);
    branchesModalList.appendChild(item);
  });
}

// ===== Init =====
(function init(){
  const y = document.getElementById('year'); 
  if (y) y.textContent = new Date().getFullYear();
  
  ensureCardImages();
  
  // Инициализация Яндекс.Карты
  initYandexMap();
  
  if (branches[0]) setActive(branches[0].id);
  
  // Обработчики для модального окна
  if (showBranchesBtn) showBranchesBtn.addEventListener('click', openBranchesModal);
  if (closeBranchesModal) closeBranchesModal.addEventListener('click', closeBranchesModalFunc);
  if (branchesModal) {
    branchesModal.querySelector('.modal-overlay')?.addEventListener('click', closeBranchesModalFunc);
  }
  
  // Закрытие по Escape
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && branchesModal?.classList.contains('active')) {
      closeBranchesModalFunc();
    }
  });
  
  // Инициализация Intersection Observer для анимаций
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Если это секция - анимируем сразу
        if (entry.target.tagName === 'SECTION') {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        } else {
          // Для карточек - находим все карточки в родительском контейнере
          const parent = entry.target.parentElement;
          const cards = Array.from(parent.querySelectorAll('.card, .about-feature-item'));
          const cardIndex = cards.indexOf(entry.target);
          
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, cardIndex * 30); // Ускорил анимацию
          
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  // Наблюдаем за секциями, карточками товаров и карточками преимуществ
  document.querySelectorAll('section, .card, .about-feature-item').forEach(el => {
    observer.observe(el);
  });
})();