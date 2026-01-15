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
  { id:'osnab', name:'Оснабрюкская', address:'Оснабрюкская 14', phone:'+79106475169' },
  { id:'mosc',  name:'Московская', address:'Московская 1', phone:'+79106406291' },
  { id:'pasha', name:'Паши Савельевой', address:'Паши Савельевой 27к1', phone:'+79157036295' },
  { id:'ordzh', name:'Орджоникидзе', address:'Орджоникидзе 46А', phone:'+79201653618' },
  { id:'voln',  name:'Вольного Новгорода', address:'Вольного Новгорода 14', phone:'+79157399659' },
  { id:'lenin', name:'пр. Ленина', address:'проспект Ленина 8', phone:'+79201653608' },
  { id:'koms',  name:'пр. Комсомольский', address:'проспект Комсомольский 4к4', phone:'+79201585021' },
  { id:'bshm',  name:'Бульвар Шмидта', address:'Бульвар Шмидта 38', phone:'+79201678789' },
  { id:'levit', name:'ул. Левитана', address:'ул. Левитана 58к1', phone:'+79201788752' }
];

const branchList = document.getElementById('branchList');
const mapTitle   = document.getElementById('mapTitle');
const mapFrame   = document.getElementById('mapFrame');
let activeBranchId = branches[0]?.id || null;

// Google Maps — стабильный поиск и правильный центр
function embedSrcByAddress(addr){
  return 'https://www.google.com/maps?q=' + encodeURIComponent('Тверь ' + addr) + '&output=embed';
}

function setActive(id){
  activeBranchId = id;
  const b = branches.find(x=>x.id===id) || branches[0];
  if (mapTitle) mapTitle.textContent = `${b.name}: ${b.address}`;
  if (mapFrame) mapFrame.src = embedSrcByAddress(b.address);
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
    
    const phoneLink = document.createElement('a');
    phoneLink.className = 'branch-modal-phone';
    phoneLink.href = `tel:${tel}`;
    phoneLink.textContent = b.phone || '';
    
    item.appendChild(name);
    item.appendChild(address);
    item.appendChild(phoneLink);
    branchesModalList.appendChild(item);
  });
}

// ===== Init =====
(function init(){
  const y = document.getElementById('year'); 
  if (y) y.textContent = new Date().getFullYear();
  
  ensureCardImages();
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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Наблюдаем за секциями и карточками
  document.querySelectorAll('section, .card').forEach(el => {
    observer.observe(el);
  });
})();