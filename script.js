/* ══════════════
   DATA
══════════════ */
const OFFERS = [
  { logo:'CRS', color:'#2D70B3', brand:'Coursera', title:'50% Off All Certifications', desc:'Professional certificates and online degrees from top universities worldwide.', type:'coupon', exp:'Jun 15' },
  { logo:'DL', color:'#007DB8', brand:'Dell', title:'₹5000 Off on Laptops', desc:'On XPS, Inspiron & Gaming series. Use code at checkout on the official store.', type:'deal', exp:'Jun 10' },
  { logo:'AJ', color:'#E31E24', brand:'AJIO', title:'Flat 40% Off Sitewide', desc:'Use code AJIO40 on clothing, footwear & accessories. New arrivals included.', type:'coupon', exp:'Jun 20' },
  { logo:'AZ', color:'#FF9900', brand:'Amazon', title:'Lightning Deals – Every Hour', desc:'Flash deals refreshed hourly. Electronics, home essentials & daily must-haves.', type:'deal', exp:'Daily' },
  { logo:'FK', color:'#F74F00', brand:'Flipkart', title:'Big Saving Days Sale', desc:'Up to 80% off across categories. Extra 10% off with select bank cards.', type:'coupon', exp:'Jun 18' },
  { logo:'MY', color:'#FF3F6C', brand:'Myntra', title:'Buy 2 Get 1 Free', desc:'Fashion, footwear & beauty. Mix and match from thousands of brands.', type:'deal', exp:'Jun 30' },
  { logo:'NY', color:'#FC2779', brand:'Nykaa', title:'20% Off Beauty Orders', desc:'On makeup, skincare & haircare. Exclusive DealZone member perk.', type:'coupon', exp:'Jun 25' },
  { logo:'ZO', color:'#E23744', brand:'Zomato', title:'Free Delivery + ₹150 Off', desc:'On orders above ₹299. Valid at 10,000+ partner restaurants near you.', type:'deal', exp:'Today' },
];

const EXCL = [
  { logo:'SB', color:'#1DB954', brand:'Swiggy', title:'Free Delivery + ₹200 Off', code:'SWIGGY200', desc:'On your first 3 orders. Stack with bank offer for max savings. Expires soon!' },
  { logo:'IR', color:'#E4082D', brand:'Air India', title:'Upto ₹3500 Off Flights', code:'AI3500FLY', desc:'On domestic & international routes. Valid on bookings made 7 days in advance.' },
  { logo:'UB', color:'#09091A', brand:'Uber', title:'3 Free Rides This Week', code:'UBER3FREE', desc:'New & returning users eligible. Use within 7 days of activation. T&Cs apply.' },
];

const STORES = [
  { logo:'MY', color:'#FF3F6C', name:'Myntra', count:'86 deals' },
  { logo:'AI', color:'#E4082D', name:'Air India', count:'24 deals' },
  { logo:'DL', color:'#007DB8', name:'Dell', count:'52 deals' },
  { logo:'AJ', color:'#E31E24', name:'AJIO', count:'68 deals' },
  { logo:'UB', color:'#09091A', name:'Uber', count:'31 deals' },
  { logo:'SM', color:'#1428A0', name:'Samsung', count:'47 deals' },
  { logo:'NY', color:'#FC2779', name:'Nykaa', count:'95 deals' },
  { logo:'HP', color:'#0096D6', name:'HP', count:'38 deals' },
  { logo:'FK', color:'#F74F00', name:'Flipkart', count:'112 deals' },
];

const BRANDS = ['Coursera','Dell','AJIO','Amazon','Flipkart','Myntra','Nykaa','Uber','Samsung','HP','Air India','Zomato'];

/* ══════════════
   RENDER: OFFERS
══════════════ */
const offerGrid = document.getElementById('offerGrid');
OFFERS.forEach((o,i) => {
  offerGrid.innerHTML += `
  <div class="offer-card fade-up fade-up-${(i%4)+1}" style="animation-delay:${i*0.08}s;">
    <div class="offer-card-head">
      <div class="offer-logo" style="background:${o.color};">${o.logo}</div>
      <div class="offer-info">
        <div class="offer-brand">${o.brand}</div>
        <div class="offer-title">${o.title}</div>
      </div>
    </div>
    <p class="offer-desc">${o.desc}</p>
    <div class="offer-footer">
      <div class="offer-expiry">Expires: <span>${o.exp}</span></div>
      <button class="btn-coupon ${o.type==='deal'?'btn-deal':''}" onclick="handleCoupon(this,'${o.type}')">
        ${o.type==='coupon'?'GET COUPON':'GET DEAL'}
      </button>
    </div>
  </div>`;
});

/* ══════════════
   RENDER: EXCLUSIVE
══════════════ */
const exclGrid = document.getElementById('exclGrid');
EXCL.forEach(e => {
  exclGrid.innerHTML += `
  <div class="excl-card">
    <div class="excl-header">
      <div class="excl-logo" style="background:${e.color};">${e.logo}</div>
      <div>
        <div class="excl-brand">${e.brand}</div>
        <div class="excl-title">${e.title}</div>
      </div>
    </div>
    <p class="excl-desc">${e.desc}</p>
    <div class="excl-code">
      <span class="excl-code-text">${e.code}</span>
      <button class="copy-btn" onclick="copyCode(this,'${e.code}')">COPY</button>
    </div>
  </div>`;
});

/* ══════════════
   RENDER: STORES
══════════════ */
const storesGrid = document.getElementById('storesGrid');
STORES.forEach(s => {
  storesGrid.innerHTML += `
  <div class="store-card">
    <div class="store-icon" style="background:${s.color};">${s.logo}</div>
    <div class="store-name">${s.name}</div>
    <div class="store-count">${s.count}</div>
  </div>`;
});

/* ══════════════
   RENDER: BRANDS
══════════════ */
const brandTrack = document.getElementById('brandTrack');
const allBrands = [...BRANDS, ...BRANDS]; // duplicate for loop
allBrands.forEach(b => {
  brandTrack.innerHTML += `<div class="brand-item"><span class="brand-dot">●</span>${b}</div>`;
});

/* ══════════════
   SLIDER
══════════════ */
const slides = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');
let current = 0;
const total = 3;

for(let i=0;i<total;i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i===0?' active':'');
  d.onclick = () => goTo(i);
  dotsContainer.appendChild(d);
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d,i) => d.className='dot'+(i===current?' active':''));
}

function goTo(n) {
  current = (n + total) % total;
  slides.style.transform = `translateX(-${current*100}%)`;
  updateDots();
}

document.getElementById('prevBtn').onclick = () => goTo(current-1);
document.getElementById('nextBtn').onclick = () => goTo(current+1);

let autoTimer = setInterval(() => goTo(current+1), 4500);
document.getElementById('heroSlider').addEventListener('mouseenter', () => clearInterval(autoTimer));
document.getElementById('heroSlider').addEventListener('mouseleave', () => {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current+1), 4500);
});

/* Touch swipe */
let touchStartX = 0;
slides.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, {passive:true});
slides.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) goTo(dx < 0 ? current+1 : current-1);
}, {passive:true});

/* ══════════════
   HAMBURGER
══════════════ */
const ham = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');
ham.onclick = () => {
  ham.classList.toggle('open');
  menu.classList.toggle('open');
};

/* ══════════════
   COPY CODE
══════════════ */
function copyCode(btn, code) {
  navigator.clipboard.writeText(code).catch(()=>{});
  btn.textContent = 'COPIED!';
  btn.style.background = 'var(--teal)';
  setTimeout(() => { btn.textContent='COPY'; btn.style.background=''; }, 2000);
}

function handleCoupon(btn, type) {
  const orig = btn.textContent;
  btn.textContent = type==='coupon' ? 'COPIED! ✓' : 'REDIRECTING…';
  btn.style.opacity='.7';
  setTimeout(() => { btn.textContent=orig; btn.style.opacity=''; }, 2000);
}

/* ══════════════
   INTERSECTION OBSERVER (fade-up)
══════════════ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.offer-card, .excl-card, .store-card').forEach(el => io.observe(el));