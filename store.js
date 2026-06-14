(function(){

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

const STORESS = [
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
if (offerGrid) {
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
}

/* ══════════════
   RENDER: EXCLUSIVE
══════════════ */
const exclGrid = document.getElementById('exclGrid');
if (exclGrid) {
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
}

/* ══════════════
   RENDER: STORES
══════════════ */
const storesGrid = document.getElementById('storesGrid');
if (storesGrid) {
  STORESS.forEach(s => {
    storesGrid.innerHTML += `
    <div class="store-card">
      <div class="store-icon" style="background:${s.color};">${s.logo}</div>
      <div class="store-name">${s.name}</div>
      <div class="store-count">${s.count}</div>
    </div>`;
  });
}

/* ══════════════
   RENDER: BRANDS
══════════════ */
const brandTrack = document.getElementById('brandTrack');
if (brandTrack) {
  const allBrands = [...BRANDS, ...BRANDS]; // duplicate for loop
  allBrands.forEach(b => {
    brandTrack.innerHTML += `<div class="brand-item"><span class="brand-dot">●</span>${b}</div>`;
  });
}

/* ══════════════
   SLIDER
══════════════ */
const slides = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');
let current = 0;
const total = 3;

if (dotsContainer && slides) {
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
}

/* ══════════════
   HAMBURGER
══════════════ */
const ham = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');
if (ham && menu) ham.onclick = () => {
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



/* ───────── DATA ─────────────────────────────── */
const STORES = {
  amazon:{
    logo:'AZ', logoColor:'#FF9900', name:'Amazon India',
    rating:4.8, reviews:12400,
    desc:'World\'s largest online marketplace. Shop electronics, fashion, groceries, books and more. Get exclusive DealZone codes for extra savings every time you order.',
    stats:[{v:'140+',l:'Active Coupons'},{v:'38',l:'Live Deals'},{v:'8',l:'Cashback Offers'},{v:'92%',l:'Success Rate'},{v:'Today',l:'Last Verified'}],
    tabCounts:[38,22,8],
    bg:'linear-gradient(135deg,#091E3A 0%,#0E3B75 50%,#1A5C9A 100%)'
  },
  flipkart:{
    logo:'FK', logoColor:'#F74F00', name:'Flipkart',
    rating:4.6, reviews:9820,
    desc:'India\'s leading e-commerce platform for mobiles, electronics, fashion and home appliances. Discover Big Billion Days discounts and exclusive flash sales.',
    stats:[{v:'98+',l:'Active Coupons'},{v:'31',l:'Live Deals'},{v:'5',l:'Cashback Offers'},{v:'87%',l:'Success Rate'},{v:'Today',l:'Last Verified'}],
    tabCounts:[31,18,5],
    bg:'linear-gradient(135deg,#1A0A00 0%,#A03300 50%,#F74F00 100%)'
  },
  myntra:{
    logo:'MY', logoColor:'#FF3F6C', name:'Myntra',
    rating:4.7, reviews:8100,
    desc:'India\'s largest fashion destination with 5000+ brands. Huge discounts on apparel, footwear, accessories, and beauty products for men, women & kids.',
    stats:[{v:'86+',l:'Active Coupons'},{v:'24',l:'Live Deals'},{v:'6',l:'Cashback Offers'},{v:'89%',l:'Success Rate'},{v:'Today',l:'Last Verified'}],
    tabCounts:[24,16,6],
    bg:'linear-gradient(135deg,#1A0010 0%,#8B0039 50%,#FF3F6C 100%)'
  }
};

const COUPONS = [
  {code:'AMNGREAT',title:'₹2000 Off on Orders Above ₹10,000',desc:'Valid on Electronics & Home Appliances. Excludes Grocery, Gold & select restricted categories. Can be combined with bank offers for extra savings.',type:'coupon',expiry:'Jun 20, 2025',success:92,verified:true,expiring:false},
  {code:'AZPRIME30',title:'30% Off — First 3 Prime Subscriber Orders',desc:'Exclusive for new Prime members. Maximum discount ₹600 per order. Valid across Fashion, Electronics, and Home categories.',type:'coupon',expiry:'Jun 30, 2025',success:86,verified:true,expiring:false},
  {code:'AZELECTRO15',title:'15% Off on All Electronics',desc:'Apply at checkout for instant discount on mobiles, laptops, tablets and accessories. One-time use per account. Apple products excluded.',type:'deal',expiry:'Jun 12, 2025',success:78,verified:true,expiring:true},
  {code:'AZFASHION40',title:'40% Off Fashion Orders Above ₹999',desc:'Stack on top of existing sale prices. Valid on clothing, footwear, and accessories from partner brands. Myntra brands excluded.',type:'coupon',expiry:'Jun 22, 2025',success:84,verified:true,expiring:false},
  {code:'AZHOME20',title:'20% Off Home & Kitchen — No Min Order',desc:'On furniture, kitchen appliances, and home decor. Discount applied automatically at checkout. Max discount ₹1500.',type:'coupon',expiry:'Jun 18, 2025',success:79,verified:false,expiring:false},
];

const CASHBACK_COUPONS = [
  {code:'AZPAY5',title:'5% Cashback via Amazon Pay Balance',desc:'Use Amazon Pay UPI or wallet. Max cashback ₹250 per transaction. Credited within 48 hours. Valid on all eligible categories.',type:'cashback',expiry:'Ongoing',success:94,verified:true,expiring:false},
  {code:'HDFC10AZ',title:'10% Instant Discount — HDFC Cards',desc:'Valid on HDFC Debit & Credit cards. Maximum discount ₹1500 per order. Applicable on Electronics & Fashion only.',type:'bank',expiry:'Jun 15, 2025',success:76,verified:true,expiring:true},
  {code:'SBI5BACK',title:'5% Cashback — SBI Credit Cards',desc:'On all orders above ₹5000. Maximum cashback ₹500. Applicable on SBI SimplyCLICK & Elite cards.',type:'bank',expiry:'Jun 28, 2025',success:81,verified:true,expiring:false},
];

const DEALS_DATA = [
  {emoji:'📱',title:'Samsung Galaxy S24 – ₹8,000 Off',store:'Samsung',storeColor:'#1428A0',orig:'₹79,999',disc:'₹71,999',pct:10,timer:'5h 22m',cat:'electronics',hot:true,bg:'#E8F0FF'},
  {emoji:'💻',title:'Dell Inspiron 15 – Best Value Laptop',store:'Dell',storeColor:'#007DB8',orig:'₹65,000',disc:'₹52,990',pct:18,timer:'12h 05m',cat:'electronics',hot:false,bg:'#E8F5FF'},
  {emoji:'🎧',title:'Sony WH-1000XM5 Headphones',store:'Amazon',storeColor:'#FF9900',orig:'₹29,990',disc:'₹19,990',pct:33,timer:'3h 48m',cat:'electronics',hot:true,bg:'#FFF8E8'},
  {emoji:'📷',title:'Canon EOS R50 Camera Kit',store:'Amazon',storeColor:'#FF9900',orig:'₹89,990',disc:'₹69,990',pct:22,timer:'6h 15m',cat:'electronics',hot:true,bg:'#FFF8E8'},
  {emoji:'👟',title:'Nike Air Max Running Shoes',store:'Myntra',storeColor:'#FF3F6C',orig:'₹9,995',disc:'₹5,997',pct:40,timer:'8h 30m',cat:'fashion',hot:true,bg:'#FFF0F4'},
  {emoji:'👗',title:'Designer Saree — End of Season',store:'AJIO',storeColor:'#E31E24',orig:'₹4,500',disc:'₹1,799',pct:60,timer:'1h 20m',cat:'fashion',hot:true,bg:'#FFF0F0'},
  {emoji:'👔',title:'Peter England Shirts 3-Pack',store:'Myntra',storeColor:'#FF3F6C',orig:'₹2,999',disc:'₹1,199',pct:60,timer:'9h 00m',cat:'fashion',hot:false,bg:'#FFF0F4'},
  {emoji:'👠',title:'Steve Madden Heels Collection',store:'Myntra',storeColor:'#FF3F6C',orig:'₹6,995',disc:'₹3,497',pct:50,timer:'4h 45m',cat:'fashion',hot:false,bg:'#FFF0F4'},
  {emoji:'🍕',title:'Pizza + Garlic Bread Mega Combo',store:'Zomato',storeColor:'#E23744',orig:'₹649',disc:'₹299',pct:54,timer:'0h 55m',cat:'food',hot:true,bg:'#FFF0F0'},
  {emoji:'🍔',title:'Burger King — Buy 1 Get 2 Free',store:'Swiggy',storeColor:'#FC8019',orig:'₹450',disc:'₹150',pct:67,timer:'2h 10m',cat:'food',hot:true,bg:'#FFF4E8'},
  {emoji:'✈️',title:'Goa Return Flight – Direct',store:'Air India',storeColor:'#E4082D',orig:'₹8,500',disc:'₹5,100',pct:40,timer:'18h 00m',cat:'travel',hot:false,bg:'#FFF0F0'},
  {emoji:'🏨',title:'5-Star Bangalore Hotel — 2N Stay',store:'MakeMyTrip',storeColor:'#E8452C',orig:'₹12,000',disc:'₹7,199',pct:40,timer:'22h 30m',cat:'travel',hot:false,bg:'#FFF0F0'},
  {emoji:'💄',title:'Nykaa Premium Skincare Bundle',store:'Nykaa',storeColor:'#FC2779',orig:'₹3,200',disc:'₹1,599',pct:50,timer:'7h 15m',cat:'beauty',hot:false,bg:'#FFF0F8'},
  {emoji:'🎮',title:'Xbox Series S Console',store:'Flipkart',storeColor:'#F74F00',orig:'₹34,990',disc:'₹29,990',pct:14,timer:'11h 44m',cat:'gaming',hot:true,bg:'#F0FFF0'},
  {emoji:'🎮',title:'PS5 DualSense Controller',store:'Amazon',storeColor:'#FF9900',orig:'₹6,990',disc:'₹4,990',pct:29,timer:'4h 20m',cat:'gaming',hot:false,bg:'#FFF8E8'},
];

const REL_STORES = [
  {logo:'FK',color:'#F74F00',name:'Flipkart',count:'98 deals'},
  {logo:'MY',color:'#FF3F6C',name:'Myntra',count:'86 deals'},
  {logo:'SM',color:'#1428A0',name:'Samsung',count:'52 deals'},
  {logo:'NY',color:'#FC2779',name:'Nykaa',count:'68 deals'},
  {logo:'ZO',color:'#E23744',name:'Zomato',count:'40 deals'},
];

const TRENDING = [
  {title:'Amazon Great Indian Festival Preview – ₹2000 Off',meta:'Used 3,280 times today'},
  {title:'Free Prime Delivery on All Orders ₹499+',meta:'Used 1,840 times today'},
  {title:'15% Off Electronics — Storewide',meta:'Used 980 times today'},
  {title:'Amazon Pay ₹150 Cashback',meta:'Used 2,100 times today'},
];

const BEST_TODAY = [
  {emoji:'📱',title:'iPhone 15 – ₹10,000 Off via HDFC',store:'Amazon',orig:'₹79,900',disc:'₹69,900',pct:13},
  {emoji:'🛋️',title:'Godrej Fabric Sofa 3-Seater',store:'Flipkart',orig:'₹32,000',disc:'₹21,999',pct:31},
  {emoji:'⌚',title:'Apple Watch Series 9 GPS',store:'Amazon',orig:'₹41,900',disc:'₹34,900',pct:17},
  {emoji:'🏋️',title:'Decathlon Weight Set + Barbell',store:'Decathlon',orig:'₹8,999',disc:'₹5,499',pct:39},
  {emoji:'📚',title:'JEE/UPSC Book Bundle — 12 Books',store:'Flipkart',orig:'₹3,600',disc:'₹1,799',pct:50},
];

/* ───────── UTILS ──────────────────────────── */
function toast(msg, icon='✓') {
  const el = document.getElementById('toastEl');
  if (!el) return;
  const iconEl = document.querySelector('.toast-icon');
  if (iconEl) iconEl.textContent = icon;
  const msgEl = document.getElementById('toastMsg');
  if (msgEl) msgEl.textContent = msg;
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 2600);
}

/* ───────── ROUTER ─────────────────────────── */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el = document.getElementById('page-'+id);
  if (el) el.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

function toggleHam(){
  const hamEl = document.getElementById('ham');
  const mobNav = document.getElementById('mobNav');
  if (hamEl) hamEl.classList.toggle('open');
  if (mobNav) mobNav.classList.toggle('open');
}
function closeHam(){
  const hamEl = document.getElementById('ham');
  const mobNav = document.getElementById('mobNav');
  if (hamEl) hamEl.classList.remove('open');
  if (mobNav) mobNav.classList.remove('open');
}

/* ───────── STORE PAGE ─────────────────────── */
let currentStore = 'amazon';

function loadStore(key) {
  currentStore = key;
  const s = STORES[key];
  if (!s) return;

  // Banner bg
  const bgEl = document.getElementById('storeBannerBg');
  if (bgEl) bgEl.style.background = s.bg;

  // Logo
  const logoEl = document.getElementById('storeLogoEl');
  if (logoEl) { logoEl.textContent = s.logo; logoEl.style.color = s.logoColor; }

  // Meta
  const nameEl = document.getElementById('storeNameEl');
  if (nameEl) nameEl.textContent = s.name;
  const ratingEl = document.getElementById('storeRatingEl');
  if (ratingEl) ratingEl.textContent = s.rating;
  const reviewsEl = document.getElementById('storeReviewsEl');
  if (reviewsEl) reviewsEl.textContent = `(${s.reviews.toLocaleString()} reviews)`;
  const descEl = document.getElementById('storeDescEl');
  if (descEl) descEl.textContent = s.desc;

  // Stats
  const statsEl = document.getElementById('storeStatsEl');
  if (statsEl) statsEl.innerHTML = s.stats.map(st=>
    `<div class="stat-item"><span class="stat-val">${st.v}</span><span class="stat-lbl">${st.l}</span></div>`
  ).join('');

  // Tab counts
  ['coupons','deals','cashback'].forEach((t,i)=>{
    const el = document.getElementById('tab-btn-'+t);
    if (el) {
      const span = el.querySelector('.s-tab-count');
      if (span) span.textContent = s.tabCounts[i];
    }
  });

  // Switcher buttons
  ['amazon','flipkart','myntra'].forEach(k=>{
    const b = document.getElementById('btn-'+k);
    if (b) b.className = (k===key) ? 'btn btn-navy btn-sm' : 'btn btn-outline-blue btn-sm';
  });

  renderCoupons();
  renderStoreDealsMini();
  renderCashback();
  switchTab('coupons');
}

function switchTab(name) {
  ['coupons','deals','cashback'].forEach(t=>{
    const panel = document.getElementById('tab-'+t);
    if (panel) panel.classList.toggle('active', t===name);
    const btn = document.getElementById('tab-btn-'+t);
    if (btn) btn.classList.toggle('active', t===name);
  });
}

function buildCouponCard(c, idx) {
  const typeColors = {coupon:'badge-blue',deal:'badge-teal',cashback:'badge-green',bank:'badge-orange'};
  const typeLabels = {coupon:'🎫 Coupon',deal:'⚡ Deal',cashback:'💰 Cashback',bank:'🏦 Bank Offer'};
  return `
  <div class="c-card" style="animation:fadeUp .4s ease ${idx*0.08}s both">
    <div class="c-card-accent"></div>
    <div class="c-card-body">
      <div class="c-main">
        <div class="c-type">
          <span class="badge ${typeColors[c.type]||'badge-blue'}">${typeLabels[c.type]||'Coupon'}</span>
          ${c.expiring?'<span class="expiring-badge" style="margin-left:6px">🔴 Expiring Soon</span>':''}
        </div>
        <div class="c-title">${c.title}</div>
        <div class="c-desc">${c.desc}</div>
        <div class="c-meta">
          ${c.verified?'<span class="verified">Verified</span>':'<span class="badge badge-dark">Unverified</span>'}
          <span class="c-expiry">Expires: <b>${c.expiry}</b></span>
        </div>
      </div>
      <div class="c-action">
        <div class="code-wrap">
          <span class="code-val">${c.code}</span>
          <div class="code-lbl">Promo Code</div>
        </div>
        <button class="copy-btn" onclick="doCopy(this,'${c.code}')">COPY CODE</button>
        <div class="success-track">
          <div class="success-bar"><div class="success-fill" style="width:${c.success}%"></div></div>
          <div class="success-label">${c.success}% Success Rate</div>
        </div>
      </div>
    </div>
  </div>`;
}

function doCopy(btn, code) {
  navigator.clipboard?.writeText(code).catch(()=>{});
  btn.textContent = '✓ COPIED!';
  btn.classList.add('copied');
  toast(`Code "${code}" copied to clipboard!`);
  setTimeout(()=>{btn.textContent='COPY CODE';btn.classList.remove('copied')}, 2500);
}

function renderCoupons() {
  const el = document.getElementById('couponStack');
  if (!el) return;
  el.innerHTML = COUPONS.map((c,i)=>buildCouponCard(c,i)).join('');
}
function renderCashback() {
  const el = document.getElementById('cashbackStack');
  if (!el) return;
  el.innerHTML = CASHBACK_COUPONS.map((c,i)=>buildCouponCard(c,i)).join('');
}
function renderStoreDealsMini() {
  const grid = document.getElementById('storeDealsGrid');
  if (!grid) return;
  const items = DEALS_DATA.filter(d=>d.cat==='electronics').slice(0,6);
  grid.innerHTML = items.map(d=>buildDealCard(d)).join('');
}
function renderRelStores() {
  const el = document.getElementById('relStoresEl');
  if (!el) return;
  el.innerHTML = REL_STORES.map(s=>`
    <div class="rel-store-row" onclick="loadStore('amazon')">
      <div class="rel-logo" style="background:${s.color}">${s.logo}</div>
      <div><div class="rel-name">${s.name}</div><div class="rel-count">${s.count}</div></div>
      <span style="margin-left:auto;color:var(--muted);font-size:.85rem">→</span>
    </div>`).join('');
}
function renderTrending() {
  const el = document.getElementById('trendingEl');
  if (!el) return;
  el.innerHTML = TRENDING.map(t=>`
    <div class="trending-item">
      <div class="trending-item-title">${t.title}</div>
      <div class="trending-item-meta">🔥 ${t.meta}</div>
    </div>`).join('');
}

/* ───────── DEALS PAGE ─────────────────────── */
function buildDealCard(d) {
  const gradient = `linear-gradient(135deg,${d.bg} 0%,#fff 100%)`;
  return `
  <div class="deal-card" onclick="toast('Opening ${d.store}...')">
    <div class="deal-card-img" style="background:${gradient}">
      <span class="deal-pct-badge">-${d.pct}%</span>
      ${d.hot?'<span class="deal-hot-badge">🔥 HOT</span>':'<span class="deal-new-badge">NEW</span>'}
      <span class="deal-card-emoji">${d.emoji}</span>
    </div>
    <div class="deal-card-body">
      <div class="deal-store-row">
        <div class="deal-store-dot" style="background:${d.storeColor}">${d.store.slice(0,2)}</div>
        <span class="deal-store-name">${d.store}</span>
      </div>
      <div class="deal-title">${d.title}</div>
      <div class="deal-price-row">
        <span class="deal-orig">${d.orig}</span>
        <span class="deal-disc">${d.disc}</span>
        <span class="deal-save">Save ${d.pct}%</span>
      </div>
      <div class="deal-timer-bar">
        <span class="deal-timer-icon">⏱</span>
        <span class="deal-timer-text">Ends in:</span>
        <span class="deal-timer-countdown">${d.timer}</span>
      </div>
      <button class="deal-buy-btn">BUY NOW →</button>
    </div>
  </div>`;
}

function filterDeals(cat, btn) {
  document.querySelectorAll('.d-pill').forEach(p=>p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const filtered = cat==='all' ? DEALS_DATA : DEALS_DATA.filter(d=>d.cat===cat);
  const show = filtered.length >= 4 ? filtered : DEALS_DATA.slice(0,4);
  ['trendingGrid','limitedGrid','electronicsGrid','fashionGrid'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.innerHTML = show.slice(0,4).map(buildDealCard).join('');
  });
}

function renderDeals() {
  const hot = DEALS_DATA.filter(d=>d.hot).slice(0,4);
  const limited = DEALS_DATA.filter(d=>{
    const h = parseInt(d.timer); return h<6;
  }).slice(0,4);
  const electronics = DEALS_DATA.filter(d=>d.cat==='electronics').slice(0,4);
  const fashion = DEALS_DATA.filter(d=>d.cat==='fashion').slice(0,4);

  const trendingEl = document.getElementById('trendingGrid');
  if (trendingEl) trendingEl.innerHTML = hot.map(buildDealCard).join('');
  const limitedEl = document.getElementById('limitedGrid');
  if (limitedEl) limitedEl.innerHTML = (limited.length>=4?limited:DEALS_DATA.slice(0,4)).map(buildDealCard).join('');
  const electronicsEl = document.getElementById('electronicsGrid');
  if (electronicsEl) electronicsEl.innerHTML = electronics.map(buildDealCard).join('');
  const fashionEl = document.getElementById('fashionGrid');
  if (fashionEl) fashionEl.innerHTML = fashion.map(buildDealCard).join('');

  const bestTodayEl = document.getElementById('bestTodayList');
  if (bestTodayEl) bestTodayEl.innerHTML = BEST_TODAY.map(b=>`
    <div class="btl-item">
      <span class="btl-emoji">${b.emoji}</span>
      <div class="btl-info">
        <div class="btl-title">${b.title}</div>
        <div class="btl-store">${b.store}</div>
      </div>
      <div class="btl-price">
        <div class="btl-disc">${b.disc}</div>
        <div class="btl-orig">${b.orig}</div>
        <span class="btl-pct">-${b.pct}%</span>
      </div>
    </div>`).join('');
}

/* ───────── COUNTDOWN ──────────────────────── */
function startCountdown() {
  let secs = 8*3600+34*60+19;
  setInterval(()=>{
    if(secs<=0) return;
    secs--;
    const h=Math.floor(secs/3600), m=Math.floor((secs%3600)/60), s=secs%60;
    const p=n=>String(n).padStart(2,'0');
    const hEl=document.getElementById('cd-h'),mEl=document.getElementById('cd-m'),sEl=document.getElementById('cd-s');
    if(hEl) hEl.textContent=p(h);
    if(mEl) mEl.textContent=p(m);
    if(sEl) sEl.textContent=p(s);
  },1000);
}

/* ───────── INIT ───────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  if (typeof loadStore === 'function') loadStore('amazon');
  renderRelStores();
  renderTrending();
  renderDeals();
  startCountdown();
});

/* ───────── FADE ANIMATION ─────────────────── */
const styleEl = document.createElement('style');
styleEl.textContent = '@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(styleEl);

  /* Expose public functions used by store.html inline handlers */
  window.loadStore = loadStore;
  window.switchTab = switchTab;
  window.renderCoupons = renderCoupons;
  window.renderCashback = renderCashback;
  window.renderStoreDealsMini = renderStoreDealsMini;
  window.renderRelStores = renderRelStores;
  window.renderTrending = renderTrending;
  window.doCopy = doCopy;
  window.copyCode = copyCode;
  window.buildDealCard = buildDealCard;
  window.toast = toast;

})();
