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
  const allBrands = [...BRANDS, ...BRANDS];
  allBrands.forEach(b => {
    brandTrack.innerHTML += `<div class="brand-item"><span class="brand-dot">●</span>${b}</div>`;
  });
}

/* ══════════════
   SLIDER
══════════════ */
const slides = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');
const heroSlider = document.getElementById('heroSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;
const total = 3;
let autoTimer;

function updateDots() {
  document.querySelectorAll('.dot').forEach((d,i) => d.className='dot'+(i===current?' active':''));
}

function goTo(n) {
  if (!slides) return;
  current = (n + total) % total;
  slides.style.transform = `translateX(-${current*100}%)`;
  updateDots();
}

if (dotsContainer) {
  for(let i=0;i<total;i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i===0?' active':'');
    d.onclick = () => goTo(i);
    dotsContainer.appendChild(d);
  }
}

if (prevBtn) prevBtn.onclick = () => goTo(current-1);
if (nextBtn) nextBtn.onclick = () => goTo(current+1);

if (heroSlider) {
  autoTimer = setInterval(() => goTo(current+1), 4500);
  heroSlider.addEventListener('mouseenter', () => clearInterval(autoTimer));
  heroSlider.addEventListener('mouseleave', () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current+1), 4500);
  });
}

/* Touch swipe */
let touchStartX = 0;
if (slides) {
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
if (ham) ham.onclick = () => {
  ham.classList.toggle('open');
  menu.classList.toggle('open');
};

/* ══════════════
   COPY CODE
══════════════ */
function copyCode(btn, code) {
  navigator.clipboard?.writeText(code).catch(()=>{});
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


/* ═══════════════════════════════════════════
   CATEGORY PAGE MODULE (IIFE)
═══════════════════════════════════════════ */
(function() {
  /* ═══════════════════════════════════════════
     DATA
  ═══════════════════════════════════════════ */
  const CATEGORIES = {
    electronics: {
      icon:'💻', title:'Electronics Deals',
      sub:'Discover the best verified coupons on laptops, mobiles, tablets, accessories and more from top brands.',
      color:'linear-gradient(135deg,#091E3A 0%,#0E3B75 55%,#1A6DC8 100%)',
      deals:186, stores:42, max:'Up to 75%',
      subcats:[
        {id:'all',label:'🔥 All'},
        {id:'mobiles',label:'📱 Mobiles'},
        {id:'laptops',label:'💻 Laptops'},
        {id:'tablets',label:'📟 Tablets'},
        {id:'wearables',label:'⌚ Wearables'},
        {id:'accessories',label:'🎧 Accessories'},
        {id:'cameras',label:'📷 Cameras'},
      ]
    },
    fashion: {
      icon:'👗', title:'Fashion Deals',
      sub:'Huge discounts on clothing, footwear, accessories and beauty from Myntra, AJIO, and more.',
      color:'linear-gradient(135deg,#1A0010 0%,#8B0039 55%,#FF3F6C 100%)',
      deals:320, stores:65, max:'Up to 80%',
      subcats:[
        {id:'all',label:'🔥 All'},
        {id:'mens',label:'👔 Men'},
        {id:'womens',label:'👗 Women'},
        {id:'kids',label:'🧒 Kids'},
        {id:'footwear',label:'👟 Footwear'},
        {id:'beauty',label:'💄 Beauty'},
      ]
    },
    travel: {
      icon:'✈️', title:'Travel Deals',
      sub:'Exclusive flight, hotel and holiday package discounts. Save big on your next trip.',
      color:'linear-gradient(135deg,#091A38 0%,#0A4C8C 55%,#0EA882 100%)',
      deals:94, stores:18, max:'Up to 60%',
      subcats:[{id:'all',label:'🔥 All'},{id:'flights',label:'✈️ Flights'},{id:'hotels',label:'🏨 Hotels'},{id:'packages',label:'🏝️ Packages'},{id:'cabs',label:'🚕 Cabs'}]
    }
  };

  const ALL_DEALS = [
    {id:1,emoji:'📱',title:'Samsung Galaxy S24 – ₹8,000 Off Instantly',desc:'Best deal on S24 right now. Valid with HDFC bank offer stacked.',store:'Amazon',storeColor:'#FF9900',storeInit:'AZ',pct:10,type:'deal',verified:true,limited:false,exclusive:false,expiry:'Jun 20',subcat:'mobiles',price:71999,big:false,budget:false,bg:'#FFF8E8'},
    {id:2,emoji:'💻',title:'Dell Inspiron 15 Touch – Lowest Price Ever',desc:'Core i5 12th gen, 8GB RAM, 512GB SSD. Use code at checkout.',store:'Dell',storeColor:'#007DB8',storeInit:'DL',pct:18,type:'coupon',code:'DELL18OFF',verified:true,limited:false,exclusive:false,expiry:'Jun 28',subcat:'laptops',price:52990,big:false,budget:false,bg:'#E8F5FF'},
    {id:3,emoji:'🎧',title:'Sony WH-1000XM5 – Best Noise Cancel Headphones',desc:'Industry-leading noise cancellation. Free next-day delivery.',store:'Amazon',storeColor:'#FF9900',storeInit:'AZ',pct:33,type:'deal',verified:true,limited:true,exclusive:false,expiry:'Jun 12',subcat:'accessories',price:19990,big:false,budget:false,bg:'#FFF8E8'},
    {id:4,emoji:'📟',title:'iPad Air M2 – ₹6,000 Bank Offer',desc:'M2 chip, 11-inch Liquid Retina. Extra bank discount available.',store:'Flipkart',storeColor:'#F74F00',storeInit:'FK',pct:12,type:'coupon',code:'IPADBANK6',verified:true,limited:false,exclusive:true,expiry:'Jun 30',subcat:'tablets',price:54900,big:false,budget:false,bg:'#FFF4F0'},
    {id:5,emoji:'⌚',title:'Apple Watch Series 9 – GPS Model Sale',desc:'Crack detection, blood oxygen, ECG. Best price in 2025.',store:'Amazon',storeColor:'#FF9900',storeInit:'AZ',pct:16,type:'deal',verified:true,limited:false,exclusive:false,expiry:'Jul 5',subcat:'wearables',price:34900,big:false,budget:false,bg:'#FFF8E8'},
    {id:6,emoji:'📷',title:'Canon EOS R50 Creator Kit – ₹20K Off',desc:'Perfect for content creators. 24MP, 4K video, dual pixel AF.',store:'Croma',storeColor:'#E31E24',storeInit:'CR',pct:22,type:'coupon',code:'CANONR50',verified:true,limited:true,exclusive:false,expiry:'Jun 15',subcat:'cameras',price:69990,big:false,budget:false,bg:'#FFF0F0'},
    {id:7,emoji:'💻',title:'MacBook Air M3 – Education Discount',desc:'Apple M3 chip, 8GB, 256GB. Education pricing available for students.',store:'Apple',storeColor:'#555555',storeInit:'AP',pct:8,type:'deal',verified:true,limited:false,exclusive:true,expiry:'Aug 31',subcat:'laptops',price:89900,big:false,budget:false,bg:'#F5F5F5'},
    {id:8,emoji:'📱',title:'OnePlus 12R – 50% Off Flash Deal',desc:'Snapdragon 8 Gen 2, 100W charging, 5G. Limited stock.',store:'Flipkart',storeColor:'#F74F00',storeInit:'FK',pct:50,type:'coupon',code:'OP12R50',verified:true,limited:true,exclusive:false,expiry:'Jun 10',subcat:'mobiles',price:24999,big:true,budget:false,bg:'#FFF4F0'},
    {id:9,emoji:'🖥️',title:'Samsung 27" 4K Monitor – Work From Home',desc:'IPS panel, 144Hz, USB-C connectivity. Perfect for remote work.',store:'Samsung',storeColor:'#1428A0',storeInit:'SM',pct:35,type:'deal',verified:false,limited:false,exclusive:false,expiry:'Jun 22',subcat:'accessories',price:28990,big:false,budget:false,bg:'#E8EEFF'},
    {id:10,emoji:'🎮',title:'PS5 DualSense Controller – Blue Edition',desc:'Adaptive triggers, haptic feedback. New color variant in stock.',store:'Amazon',storeColor:'#FF9900',storeInit:'AZ',pct:29,type:'coupon',code:'PS5BLUE',verified:true,limited:false,exclusive:false,expiry:'Jun 25',subcat:'accessories',price:4990,budget:true,big:false,bg:'#FFF8E8'},
    {id:11,emoji:'📱',title:'Redmi Note 13 Pro+ – Budget King',desc:'200MP camera, 120Hz AMOLED, 67W charging. Under ₹30k.',store:'Mi Store',storeColor:'#FF6900',storeInit:'MI',pct:15,type:'deal',verified:true,limited:false,exclusive:false,expiry:'Jul 1',subcat:'mobiles',price:28999,big:false,budget:false,bg:'#FFF4E8'},
    {id:12,emoji:'🎧',title:'boAt Airdopes 141 – True Wireless at ₹499',desc:'40 hours total playback, IPX4 water resistant. Best budget TWS.',store:'Amazon',storeColor:'#FF9900',storeInit:'AZ',pct:60,type:'coupon',code:'BOAT499',verified:true,limited:true,exclusive:false,expiry:'Jun 8',subcat:'accessories',price:499,big:true,budget:true,bg:'#FFF8E8'},
    {id:13,emoji:'💻',title:'HP Pavilion Gaming – RTX 3050 Laptop',desc:'Intel i5, 8GB, 512GB, RTX 3050. Bundle deal with gaming mouse.',store:'HP',storeColor:'#0096D6',storeInit:'HP',pct:20,type:'deal',verified:true,limited:false,exclusive:true,expiry:'Jun 20',subcat:'laptops',price:64999,big:false,budget:false,bg:'#E8F6FF'},
    {id:14,emoji:'📟',title:'Samsung Galaxy Tab S9 FE – 256GB',desc:'10.9-inch display, S Pen included, 8000mAh battery.',store:'Samsung',storeColor:'#1428A0',storeInit:'SM',pct:25,type:'coupon',code:'TABS9FE',verified:true,limited:false,exclusive:false,expiry:'Jul 10',subcat:'tablets',price:38999,big:false,budget:false,bg:'#E8EEFF'},
    {id:15,emoji:'⌚',title:'Noise ColorFit Ultra 2 – ₹399 Deal',desc:'1.96-inch AMOLED, Bluetooth calling, 100+ watch faces.',store:'Flipkart',storeColor:'#F74F00',storeInit:'FK',pct:73,type:'coupon',code:'NOISE399',verified:true,limited:true,exclusive:false,expiry:'Jun 8',subcat:'wearables',price:399,big:true,budget:true,bg:'#FFF4F0'},
    {id:16,emoji:'📱',title:'iPhone 15 – ₹10,000 Instant Cashback',desc:'A16 Bionic, Dynamic Island, 48MP camera. HDFC offer.',store:'Amazon',storeColor:'#FF9900',storeInit:'AZ',pct:13,type:'deal',verified:true,limited:false,exclusive:true,expiry:'Jun 30',subcat:'mobiles',price:69900,big:false,budget:false,bg:'#FFF8E8'},
    {id:17,emoji:'🎧',title:'JBL Charge 5 Speaker – 40% Off',desc:'IP67 waterproof, 20hr playback, PartyBoost support.',store:'Amazon',storeColor:'#FF9900',storeInit:'AZ',pct:40,type:'coupon',code:'JBL40OFF',verified:false,limited:false,exclusive:false,expiry:'Jul 5',subcat:'accessories',price:8990,big:false,budget:false,bg:'#FFF8E8'},
    {id:18,emoji:'💻',title:'Lenovo ThinkPad E16 – Business Laptop',desc:'AMD Ryzen 5, 16GB RAM, FHD IPS. Enterprise-grade durability.',store:'Lenovo',storeColor:'#E2231A',storeInit:'LN',pct:28,type:'coupon',code:'TPAD28',verified:true,limited:false,exclusive:false,expiry:'Jun 25',subcat:'laptops',price:58990,big:false,budget:false,bg:'#FFF0F0'},
    {id:19,emoji:'📱',title:'Vivo V29e – AMOLED Under ₹20K',desc:'6.67-inch curved AMOLED, 50MP portrait camera, 44W fast charge.',store:'Flipkart',storeColor:'#F74F00',storeInit:'FK',pct:22,type:'deal',verified:true,limited:false,exclusive:false,expiry:'Jul 2',subcat:'mobiles',price:18999,big:false,budget:false,bg:'#FFF4F0'},
    {id:20,emoji:'💻',title:'Asus ZenBook 14 OLED – Creator Pick',desc:'OLED display, Intel Evo, slim design. Best for designers.',store:'Croma',storeColor:'#E31E24',storeInit:'CR',pct:15,type:'coupon',code:'ZB14OLED',verified:true,limited:false,exclusive:false,expiry:'Jun 28',subcat:'laptops',price:74990,big:false,budget:false,bg:'#FFF0F0'},
    {id:21,emoji:'📷',title:'GoPro Hero 12 – Adventure Bundle',desc:'Action camera, extra battery, floating grip. Best adventure deal.',store:'Amazon',storeColor:'#FF9900',storeInit:'AZ',pct:30,type:'deal',verified:true,limited:true,exclusive:false,expiry:'Jun 14',subcat:'cameras',price:28999,big:false,budget:false,bg:'#FFF8E8'},
    {id:22,emoji:'⌚',title:'Fitbit Versa 4 – Health + GPS Watch',desc:'Built-in GPS, 6+ day battery, stress management score.',store:'Flipkart',storeColor:'#F74F00',storeInit:'FK',pct:38,type:'coupon',code:'FIT4LESS',verified:true,limited:false,exclusive:false,expiry:'Jul 8',subcat:'wearables',price:12999,big:false,budget:false,bg:'#FFF4F0'},
    {id:23,emoji:'🖥️',title:'Dell 24" FHD Monitor – Work Essentials',desc:'IPS panel, flicker-free, blue light filter. 3yr warranty.',store:'Dell',storeColor:'#007DB8',storeInit:'DL',pct:25,type:'coupon',code:'DELL24MN',verified:true,limited:false,exclusive:false,expiry:'Jul 15',subcat:'accessories',price:11990,big:false,budget:false,bg:'#E8F5FF'},
    {id:24,emoji:'📱',title:'Google Pixel 8a – AI Camera Phone',desc:'Tensor G3, Google AI features, 7 years of updates.',store:'Flipkart',storeColor:'#F74F00',storeInit:'FK',pct:10,type:'deal',verified:true,limited:false,exclusive:true,expiry:'Aug 1',subcat:'mobiles',price:53999,big:false,budget:false,bg:'#FFF4F0'},
  ];

  const STORES_DATA = [
    {logo:'AZ',color:'#FF9900',name:'Amazon',count:'140+ deals',badge:'Top Store'},
    {logo:'FK',color:'#F74F00',name:'Flipkart',count:'98 deals',badge:'Hot'},
    {logo:'SM',color:'#1428A0',name:'Samsung',count:'52 deals',badge:'Official'},
    {logo:'DL',color:'#007DB8',name:'Dell',count:'38 deals',badge:'Official'},
    {logo:'CR',color:'#E31E24',name:'Croma',count:'44 deals',badge:''},
    {logo:'HP',color:'#0096D6',name:'HP',count:'31 deals',badge:''},
    {logo:'AP',color:'#555',name:'Apple',count:'26 deals',badge:'Official'},
    {logo:'LN',color:'#E2231A',name:'Lenovo',count:'22 deals',badge:''},
  ];

  /* ═══════════════════════════════════════════
     STATE
  ═══════════════════════════════════════════ */
  let currentCategory = 'electronics';
  let currentSubcat = 'all';
  let activeChips = {};
  let currentSort = 'Popular';
  let shownCount = 18;
  let viewMode = 'grid';
  let searchQuery = '';

  /* ═══════════════════════════════════════════
     TOAST
  ═══════════════════════════════════════════ */
  function showToast(msg) {
    const el = document.getElementById('toastEl');
    if (!el) return;
    document.getElementById('toastMsg').textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ═══════════════════════════════════════════
     MEGA MENU
  ═══════════════════════════════════════════ */
  function toggleMega() {
    const item = document.getElementById('categoriesItem');
    if (item) item.classList.toggle('open');
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('#categoriesItem')) {
      const item = document.getElementById('categoriesItem');
      if (item) item.classList.remove('open');
    }
  });

  /* ═══════════════════════════════════════════
     DRAWER
  ═══════════════════════════════════════════ */
  function openDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');
    const hamEl = document.getElementById('ham');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    if (hamEl) hamEl.classList.add('open');
  }

  function closeDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');
    const hamEl = document.getElementById('ham');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    if (hamEl) hamEl.classList.remove('open');
  }

  function toggleDrawerCat() {
    const btn = document.getElementById('drawer-cat-btn');
    const sub = document.getElementById('drawer-cat-sub');
    if (btn) btn.classList.toggle('open');
    if (sub) sub.classList.toggle('open');
  }

  /* ═══════════════════════════════════════════
     CATEGORY HERO
  ═══════════════════════════════════════════ */
  function setPage(cat) {
    if (!CATEGORIES[cat]) return;
    currentCategory = cat;
    currentSubcat = 'all';
    const c = CATEGORIES[cat];
    const heroBg = document.getElementById('catHeroBg');
    if (heroBg) heroBg.style.background = c.color;
    const heroIcon = document.getElementById('catHeroIcon');
    if (heroIcon) heroIcon.textContent = c.icon;
    const heroTitle = document.getElementById('catHeroTitle');
    if (heroTitle) heroTitle.textContent = c.title;
    const heroSub = document.getElementById('catHeroSub');
    if (heroSub) heroSub.textContent = c.sub;
    const breadcrumb = document.getElementById('breadcrumbCurrent');
    if (breadcrumb) breadcrumb.textContent = c.title.replace(' Deals','');
    const deals = document.getElementById('heroStatDeals');
    if (deals) deals.textContent = c.deals;
    const stores = document.getElementById('heroStatStores');
    if (stores) stores.textContent = c.stores;
    const max = document.getElementById('heroStatMax');
    if (max) max.textContent = c.max;
    renderSubcats(c.subcats);
    renderDeals();
    window.scrollTo({top:0, behavior:'smooth'});
    const catItem = document.getElementById('categoriesItem');
    if (catItem) catItem.classList.remove('open');
    showToast(`Showing ${c.title}`);
  }

  function renderSubcats(subcats) {
    const row = document.getElementById('subcatRow');
    if (!row) return;
    row.innerHTML = subcats.map(s => `
      <div class="subcat-pill ${s.id===currentSubcat?'active':''}" onclick="categoryPage.filterBySubcat('${s.id}')">${s.label}</div>
    `).join('');
  }

  /* ═══════════════════════════════════════════
     SORT
  ═══════════════════════════════════════════ */
  function toggleSort() {
    const wrap = document.getElementById('sortWrap');
    const btn = document.getElementById('sortBtn');
    if (wrap) wrap.classList.toggle('open');
    if (btn) btn.classList.toggle('active');
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('#sortWrap')) {
      const wrap = document.getElementById('sortWrap');
      const btn = document.getElementById('sortBtn');
      if (wrap) wrap.classList.remove('open');
      if (btn) btn.classList.remove('active');
    }
  });

  function setSort(val) {
    currentSort = val;
    const label = document.getElementById('sortLabel');
    if (label) label.textContent = val;
    const wrap = document.getElementById('sortWrap');
    if (wrap) wrap.classList.remove('open');
    const btn = document.getElementById('sortBtn');
    if (btn) btn.classList.remove('active');
    document.querySelectorAll('.sort-option').forEach(o => {
      o.classList.toggle('selected', o.textContent.includes(val));
      const chk = o.querySelector('.check');
      if(chk) chk.remove();
    });
    const selectedOpt = [...document.querySelectorAll('.sort-option')].find(o=>o.textContent.includes(val));
    if(selectedOpt) selectedOpt.innerHTML += '<span class="check">✓</span>';
    renderDeals();
    showToast(`Sorted by ${val}`);
  }

  /* ═══════════════════════════════════════════
     FILTER CHIPS
  ═══════════════════════════════════════════ */
  function toggleChip(id, colorClass) {
    const btn = document.getElementById('fc-'+id);
    if (!btn) return;
    const isActive = btn.dataset.active === 'true';
    if (isActive) {
      btn.classList.remove('active', 'green','red','orange','purple');
      btn.dataset.active = 'false';
      delete activeChips[id];
    } else {
      btn.classList.add('active');
      if(colorClass) btn.classList.add(colorClass);
      btn.dataset.active = 'true';
      activeChips[id] = true;
    }
    const hasAny = Object.keys(activeChips).length > 0;
    const clearBtn = document.getElementById('clearAllBtn');
    if (clearBtn) clearBtn.style.display = hasAny ? 'block' : 'none';
    updateActiveLabel();
    renderDeals();
  }

  function clearAll() {
    ['budget','big','verified','limited','exclusive','coupon'].forEach(id => {
      const btn = document.getElementById('fc-'+id);
      if(btn) { btn.classList.remove('active','green','red','orange','purple'); btn.dataset.active = 'false'; }
    });
    activeChips = {};
    const clearBtn = document.getElementById('clearAllBtn');
    if (clearBtn) clearBtn.style.display = 'none';
    updateActiveLabel();
    renderDeals();
    showToast('Filters cleared');
  }

  function updateActiveLabel() {
    const count = Object.keys(activeChips).length;
    const el = document.getElementById('activeFiltersLabel');
    if (el) el.textContent = count > 0 ? `${count} filter${count>1?'s':''} active` : '';
  }

  function filterBySubcat(id) {
    currentSubcat = id;
    document.querySelectorAll('.subcat-pill').forEach(p => {
      const label = CATEGORIES[currentCategory]?.subcats?.find(s=>s.id===id)?.label?.replace(/^.{3}/,'') || id;
      p.classList.toggle('active', p.textContent.includes(label));
    });
    const cat = CATEGORIES[currentCategory];
    if(cat) renderSubcats(cat.subcats);
    renderDeals();
  }

  function toggleSF(el) {
    const cb = el.querySelector('.sf-checkbox');
    if(cb) cb.classList.toggle('checked');
    renderDeals();
  }

  function updateRange(inp) {
    const val = parseInt(inp.value);
    const rangeVal = document.getElementById('rangeVal');
    if (rangeVal) rangeVal.textContent = '₹' + val.toLocaleString('en-IN');
  }

  /* ═══════════════════════════════════════════
     LIVE SEARCH
  ═══════════════════════════════════════════ */
  function liveSearch(q) {
    searchQuery = q.toLowerCase();
    renderDeals();
  }

  /* ═══════════════════════════════════════════
     RENDER DEALS
  ═══════════════════════════════════════════ */
  function getFilteredDeals() {
    let deals = ALL_DEALS.filter(d => {
      if (currentSubcat !== 'all' && d.subcat !== currentSubcat) return false;
      if (activeChips.budget && !d.budget) return false;
      if (activeChips.big && !d.big) return false;
      if (activeChips.verified && !d.verified) return false;
      if (activeChips.limited && !d.limited) return false;
      if (activeChips.exclusive && !d.exclusive) return false;
      if (activeChips.coupon && d.type !== 'coupon') return false;
      if (searchQuery && !d.title.toLowerCase().includes(searchQuery) && !d.store.toLowerCase().includes(searchQuery)) return false;
      return true;
    });
    if (currentSort === 'Latest') deals = deals.sort((a,b) => b.id - a.id);
    if (currentSort === 'Discount') deals = deals.sort((a,b) => b.pct - a.pct);
    if (currentSort === 'Expiry') deals = deals.sort((a,b) => a.expiry.localeCompare(b.expiry));
    if (currentSort === 'Success') deals = deals.sort((a,b) => (b.verified?1:0) - (a.verified?1:0));
    return deals;
  }

  function buildDealCard(d, idx) {
    const isCoupon = d.type === 'coupon' && d.code;
    const isExpiring = d.limited;
    const expiryClass = isExpiring ? 'red' : '';
    return `
    <div class="deal-card" style="animation-delay:${idx * 0.06}s">
      <div class="deal-card-top"></div>
      <div class="card-badges">
        <span class="badge badge-pct">-${d.pct}%</span>
        ${d.limited ? '<span class="badge badge-limited">⏳ Limited</span>' : ''}
        ${d.exclusive ? '<span class="badge badge-exclusive">⭐ Exclusive</span>' : ''}
      </div>
      <div class="card-img" style="background:linear-gradient(135deg,${d.bg} 0%,#fff 100%)">
        <span class="card-img-emoji">${d.emoji}</span>
      </div>
      <div class="card-body">
        <div class="card-store-row">
          <div class="card-store-dot" style="background:${d.storeColor}">${d.storeInit}</div>
          <span class="card-store-name">${d.store}</span>
          ${d.verified ? '<span class="verified-icon" style="margin-left:auto">✓ Verified</span>' : ''}
        </div>
        <div class="card-title">${d.title}</div>
        <div class="card-desc">${d.desc}</div>
        <div class="card-meta">
          <span class="card-expiry ${expiryClass}">📅 Expires: <b>${d.expiry}</b></span>
          ${d.budget ? '<span class="badge badge-green">Budget Pick</span>' : ''}
        </div>
        ${isCoupon
          ? `<div class="code-cta" onclick="categoryPage.copyCode('${d.code}', this)">
              <span class="code-cta-val">${d.code}</span>
              <button class="code-cta-btn" onclick="event.stopPropagation();categoryPage.copyCode('${d.code}', this.closest('.code-cta'))">COPY</button>
             </div>`
          : `<div class="card-cta">
              <button class="cta-btn cta-primary" onclick="categoryPage.showToast('Opening ${d.store}…')">GET DEAL →</button>
              <button class="cta-btn cta-secondary" onclick="categoryPage.showToast('Added to wishlist ♡')" title="Save">♡</button>
             </div>`
        }
      </div>
    </div>`;
  }

  function renderDeals() {
    const filtered = getFilteredDeals();
    const visible = filtered.slice(0, shownCount);
    const grid = document.getElementById('dealsGrid');
    if (!grid) return;

    const resultCount = document.getElementById('resultCount');
    if (resultCount) resultCount.textContent = filtered.length;
    const shownEl = document.getElementById('shownCount');
    if (shownEl) shownEl.textContent = Math.min(shownCount, filtered.length);
    const totalEl = document.getElementById('totalCount');
    if (totalEl) totalEl.textContent = filtered.length;
    const pct = Math.min(100, (Math.min(shownCount, filtered.length) / filtered.length) * 100);
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = pct + '%';

    if (viewMode === 'list') {
      grid.classList.add('list-view');
    } else {
      grid.classList.remove('list-view');
    }

    if (visible.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:64px 20px">
          <div style="font-size:3rem;margin-bottom:16px">🔍</div>
          <h3 style="font-family:'Syne',sans-serif;font-size:1.2rem;color:var(--navy);margin-bottom:8px">No deals found</h3>
          <p style="color:var(--muted);font-size:.9rem;margin-bottom:20px">Try adjusting your filters or search query</p>
          <button onclick="categoryPage.clearAll()" style="padding:10px 24px;border-radius:50px;background:var(--navy);color:#fff;border:none;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;cursor:pointer">Clear Filters</button>
        </div>`;
      return;
    }

    grid.innerHTML = visible.map((d, i) => buildDealCard(d, i)).join('');
    const lbtn = document.getElementById('loadMoreBtn');
    if (lbtn) {
      if (Math.min(shownCount, filtered.length) >= filtered.length) {
        lbtn.style.display = 'none';
      } else {
        lbtn.style.display = 'inline-flex';
      }
    }
  }

  /* ═══════════════════════════════════════════
     COPY CODE
  ═══════════════════════════════════════════ */
  function copyCode(code, el) {
    navigator.clipboard?.writeText(code).catch(()=>{});
    const btn = el.querySelector('.code-cta-btn');
    const val = el.querySelector('.code-cta-val');
    if(btn) btn.textContent = '✓ DONE';
    if(val) val.style.opacity = '.6';
    showToast(`Code "${code}" copied! ✓`);
    setTimeout(() => {
      if(btn) btn.textContent = 'COPY';
      if(val) val.style.opacity = '1';
    }, 2200);
  }

  /* ═══════════════════════════════════════════
     LOAD MORE
  ═══════════════════════════════════════════ */
  function loadMore() {
    const btn = document.getElementById('loadMoreBtn');
    if (!btn) return;
    btn.classList.add('loading');
    const btnText = btn.querySelector('.btn-text');
    if (btnText) btnText.textContent = 'Loading…';
    setTimeout(() => {
      shownCount += 6;
      renderDeals();
      btn.classList.remove('loading');
      if (btnText) btnText.textContent = 'Load More Deals';
      showToast('More deals loaded! ✓');
      const filtered = getFilteredDeals();
      if (shownCount >= filtered.length) btn.style.display = 'none';
    }, 800);
  }

  /* ═══════════════════════════════════════════
     VIEW TOGGLE
  ═══════════════════════════════════════════ */
  function setView(v) {
    viewMode = v;
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    if (gridBtn) gridBtn.classList.toggle('active', v === 'grid');
    if (listBtn) listBtn.classList.toggle('active', v === 'list');
    renderDeals();
  }

  /* ═══════════════════════════════════════════
     STORES
  ═══════════════════════════════════════════ */
  function renderStores() {
    const storesRow = document.getElementById('storesRow');
    if (!storesRow) return;
    storesRow.innerHTML = STORES_DATA.map(s => `
      <div class="store-card" onclick="categoryPage.showToast('Opening ${s.name} store…')">
        <div class="store-logo-box" style="background:${s.color}">${s.logo}</div>
        <div class="store-card-name">${s.name}</div>
        <div class="store-card-count">${s.count}</div>
        ${s.badge ? `<span class="store-card-deal">${s.badge}</span>` : ''}
      </div>`).join('');
  }

  /* ═══════════════════════════════════════════
     MOBILE FILTER TOGGLE
  ═══════════════════════════════════════════ */
  function checkMobile() {
    const btn = document.getElementById('filterToggleBtn');
    if(btn) btn.style.display = window.innerWidth <= 1100 ? 'flex' : 'none';
  }
  window.addEventListener('resize', checkMobile);

  /* ═══════════════════════════════════════════
     STORE TAB SWITCH (global helper for store.html)
  ═══════════════════════════════════════════ */
  window.switchTab = function(name) {
    ['coupons','deals','cashback'].forEach(t=>{
      const panel = document.getElementById('tab-'+t);
      if(panel) panel.classList.toggle('active', t===name);
      const btn = document.getElementById('tab-btn-'+t);
      if(btn) btn.classList.toggle('active', t===name);
    });
  };

  /* ═══════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════ */
  function init() {
    const cat = CATEGORIES[currentCategory];
    if (cat) {
      renderSubcats(cat.subcats);
      renderDeals();
      renderStores();
      checkMobile();
    }
  }

  /* ═══════════════════════════════════════════
     EXPORT
  ═══════════════════════════════════════════ */
  window.categoryPage = {
    toggleMega,
    openDrawer,
    closeDrawer,
    toggleDrawerCat,
    setPage,
    renderSubcats,
    toggleSort,
    setSort,
    toggleChip,
    clearAll,
    updateActiveLabel,
    filterBySubcat,
    toggleSF,
    updateRange,
    liveSearch,
    getFilteredDeals,
    buildDealCard,
    renderDeals,
    copyCode,
    loadMore,
    setView,
    renderStores,
    showToast,
    checkMobile,
    init
  };

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('dealsGrid')) categoryPage.init();
  });
})();

