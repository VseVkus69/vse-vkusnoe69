// ===== Мобильное меню + плавный скролл =====
const mobileNav = document.getElementById('mobileNav');
const burger = document.getElementById('burger');

function closeMobile(){ if (mobileNav) mobileNav.style.display = 'none'; }
function toggleMobile(){ if (mobileNav) mobileNav.style.display = (mobileNav.style.display === 'block') ? 'none' : 'block'; }

if (burger) burger.addEventListener('click', toggleMobile);
if (mobileNav) mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior:'smooth', block:'start' }); }
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
  return (
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Тверь, " + addr) +
    "&output=embed"
  );
}




function renderBranches(){
  if (!branchList) return;
  branchList.innerHTML = '';
  branches.forEach(b=>{
    const li = document.createElement('li');
    li.className = 'branch-item' + (b.id===activeBranchId ? ' active' : '');

    const meta = document.createElement('div');
    meta.className = 'branch-meta';
    meta.innerHTML = `<div class="name">${b.name}</div><div class="addr">${b.address}</div>`;

    const right = document.createElement('div');
    right.className = 'branch-right';

    const phone = document.createElement('div');
    phone.className = 'branch-phone';
    const tel = (b.phone||'').replace(/[^+\d]/g,'');
    phone.innerHTML = `<a href="tel:${tel}">${b.phone||''}</a>`;

    const actions = document.createElement('div');
    actions.className = 'branch-actions';

    const mkBtn = (tag, label, title, href, onClick)=>{
      const el = document.createElement(tag);
      el.className = 'icon';
      el.textContent = label;
      el.title = title;
      if(href){ el.href = href; el.target = '_blank'; el.rel = 'noreferrer'; }
      if(onClick){ el.addEventListener('click', onClick); }
      return el;
    };

    const btnShow = mkBtn('button','📍','Показать на карте', null, ()=> setActive(b.id));
    const btnCall = mkBtn('a','📞','Позвонить','tel:'+tel);
    const btnWa   = mkBtn('a','💬','WhatsApp','https://wa.me/'+(b.phone||'').replace(/\D/g,''));
    const btnG    = mkBtn('a','G','Google Maps','https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(b.address));
    const btnY    = mkBtn('a','Y','Яндекс.Карты','https://yandex.ru/maps/?text='+encodeURIComponent(b.address));

    actions.append(btnShow, btnCall, btnWa, btnG, btnY);
    right.append(phone, actions);

    li.append(meta, right);
    branchList.appendChild(li);
  });
}

function setActive(id){
  activeBranchId = id;
  const b = branches.find(x=>x.id===id) || branches[0];
  if (mapTitle) mapTitle.textContent = `${b.name}: ${b.address}`;
  if (mapFrame) mapFrame.src = embedSrcByAddress(b.address);
  renderBranches();
}

// ===== Init =====
(function init(){
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  ensureCardImages();
  renderBranches();
  if (branches[0]) setActive(branches[0].id);
})();

document.getElementById('year').textContent = new Date().getFullYear();
const btnShow = mkBtn(
  'button',
  '📍',
  'Показать на карте (Яндекс)',
  null,
  () => setActive(b.id)
);

const btnY = mkBtn(
  'a',
  'Y',
  'Открыть в Яндекс.Картах',
  'https://yandex.ru/maps/?text=' + encodeURIComponent(b.address)
);

const btnG = mkBtn(
  'a',
  'G',
  'Открыть в Google Maps',
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(b.address)
);

