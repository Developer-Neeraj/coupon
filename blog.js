const blogPage = (function() {
  
  // 1. Mock Data
  const BLOGS = [
    { id: 1, title: 'The Ultimate Guide to Maximizing Black Friday Savings', excerpt: 'Retailers use sneaky tactics. Learn how to track prices, stack coupons, and spot fake markdowns.', category: 'Shopping Hacks', author: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/100?img=12', date: 'Oct 12, 2025', readTime: '6 min', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Top 5 Budget Laptops for Students Under ₹50k', excerpt: 'We reviewed the latest tech to find the perfect balance between performance and affordability for your classes.', category: 'Tech', author: 'Mike Ross', avatar: 'https://i.pravatar.cc/100?img=11', date: 'Oct 10, 2025', readTime: '4 min', img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'How to Score Cheap Flights for the New Year', excerpt: 'Don\'t pay premium prices for holiday travel. Discover our favorite flight booking hacks.', category: 'Travel', author: 'Anita Patel', avatar: 'https://i.pravatar.cc/100?img=5', date: 'Oct 08, 2025', readTime: '5 min', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Credit Card Reward Points: A Beginner\'s Guide', excerpt: 'Turn your daily spending into free flights, hotel stays, and cash back with this simple strategy.', category: 'Finance', author: 'David Chen', avatar: 'https://i.pravatar.cc/100?img=8', date: 'Oct 05, 2025', readTime: '8 min', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Are Amazon Lightning Deals Actually Worth It?', excerpt: 'We analyzed 500 lightning deals. Here is the truth about those ticking timers and claimed discounts.', category: 'Shopping Hacks', author: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/100?img=12', date: 'Oct 01, 2025', readTime: '5 min', img: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=600&q=80' },
    { id: 6, title: 'The Best Noise-Cancelling Headphones of 2025', excerpt: 'Sony, Bose, or Apple? We tested the top contenders to see which ones give you the most for your money.', category: 'Tech', author: 'Mike Ross', avatar: 'https://i.pravatar.cc/100?img=11', date: 'Sep 28, 2025', readTime: '7 min', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80' },
    { id: 7, title: 'Packing Light: Travel Essentials You Must Have', excerpt: 'Avoid baggage fees by packing smart. These 10 items fit perfectly in a carry-on and save you money.', category: 'Travel', author: 'Anita Patel', avatar: 'https://i.pravatar.cc/100?img=5', date: 'Sep 22, 2025', readTime: '4 min', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80' }
  ];

  // 2. State
  let filteredData = [...BLOGS];
  let visibleCount = 6;
  let currentCategory = 'All';
  let currentSearch = '';

  // 3. Selectors
  const grid = document.getElementById('blogGrid');
  const emptyState = document.getElementById('emptyState');
  const loadMoreBtn = document.getElementById('loadMoreWrap');

  // 4. HTML Generators
  function getSkeletonHTML() {
    return `
      <div class="blog-card skeleton-card">
        <div class="blog-img-wrap skeleton" style="height:200px;"></div>
        <div class="blog-content">
          <div class="skeleton" style="width:80px; height:24px; border-radius:50px; margin-bottom:12px;"></div>
          <div class="skeleton" style="width:100%; height:20px; margin-bottom:8px;"></div>
          <div class="skeleton" style="width:70%; height:20px; margin-bottom:16px;"></div>
          <div class="skeleton" style="width:100%; height:12px; margin-bottom:6px;"></div>
          <div class="skeleton" style="width:80%; height:12px; margin-bottom:20px;"></div>
          <div class="blog-author-row" style="border:none; padding:0;">
            <div class="skeleton" style="width:36px; height:36px; border-radius:50%;"></div>
            <div style="flex:1;">
               <div class="skeleton" style="width:40%; height:12px; margin-bottom:4px;"></div>
               <div class="skeleton" style="width:60%; height:10px;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function getCardHTML(blog) {
    return `
      <a href="blog-details.html" class="blog-card">
        <div class="blog-img-wrap">
          <img src="${blog.img}" alt="${blog.title}">
        </div>
        <div class="blog-content">
          <span class="badge badge-sky">${blog.category}</span>
          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-excerpt">${blog.excerpt}</p>
          <div class="blog-author-row">
            <img src="${blog.avatar}" alt="${blog.author}" class="author-avatar">
            <div class="author-info">
              <span class="author-name">${blog.author}</span>
              <span class="author-meta">${blog.date} <span class="dot">•</span> ${blog.readTime}</span>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  // 5. Render Logic
  function render(showSkeletons = false) {
    if (!grid) return;

    // Apply filters
    filteredData = BLOGS.filter(b => {
      const matchCat = currentCategory === 'All' || b.category === currentCategory;
      const matchSearch = b.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(currentSearch.toLowerCase());
      return matchCat && matchSearch;
    });

    const visibleBlogs = filteredData.slice(0, visibleCount);

    if (showSkeletons) {
      grid.innerHTML = Array(3).fill(getSkeletonHTML()).join('');
      emptyState.style.display = 'none';
      loadMoreBtn.style.display = 'none';
      
      // Simulate network request
      setTimeout(() => executeRender(visibleBlogs), 600);
    } else {
      executeRender(visibleBlogs);
    }
  }

  function executeRender(visibleBlogs) {
    if (visibleBlogs.length === 0) {
      grid.innerHTML = '';
      emptyState.style.display = 'block';
      loadMoreBtn.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      grid.innerHTML = visibleBlogs.map(getCardHTML).join('');
      
      // Toggle Load More button
      if (visibleCount >= filteredData.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'block';
      }
    }
  }

  // 6. Actions
  function loadMore() {
    const btn = document.getElementById('loadMoreBtn');
    btn.classList.add('loading');
    btn.querySelector('.btn-text').textContent = 'Loading...';
    
    setTimeout(() => {
      visibleCount += 3;
      render();
      btn.classList.remove('loading');
      btn.querySelector('.btn-text').textContent = 'Load More Articles';
    }, 500);
  }

  function filterCategory(cat, btnElement) {
    currentCategory = cat;
    visibleCount = 6;
    
    // Update active UI
    document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    
    render(true);
  }

  function handleSearch(query) {
    currentSearch = query;
    visibleCount = 6;
    render(true);
  }

  function resetFilters() {
    currentSearch = '';
    currentCategory = 'All';
    document.getElementById('blogSearch').value = '';
    
    document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.cat-pill').classList.add('active'); // Set 'All' back to active
    
    render(true);
  }

  // Init
  function init() {
    if(grid) render(true);
  }

  return { init, loadMore, filterCategory, handleSearch, resetFilters };
})();