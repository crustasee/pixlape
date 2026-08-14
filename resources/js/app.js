/**
 * PIXLAPE.COM — Main App Controller (index.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  // State Variables
  let currentCategory = 'design';
  let currentOS = 'all';
  let searchQuery = '';
  let activeSort = 'popular';

  // DOM Handles
  const grid = document.getElementById('cardGrid');
  const searchInput = document.getElementById('searchInput');
  const tabs = document.querySelectorAll('.tab-btn');
  const osBtns = document.querySelectorAll('.os-btn');
  const sortSelect = document.getElementById('sortSelect');
  const activeCategoryTitle = document.getElementById('activeCategoryTitle');
  const activeItemsCount = document.getElementById('activeItemsCount');
  const themeToggle = document.getElementById('themeToggle');

  // Modal Elements
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalIcon = document.getElementById('modalIcon');
  const modalSize = document.getElementById('modalSize');
  const modalRating = document.getElementById('modalRating');
  const modalOS = document.getElementById('modalOS');
  const modalBadges = document.getElementById('modalBadges');
  const modalDetailLink = document.getElementById('modalDetailLink');

  // Render Function
  function renderCards() {
    let items = getAssetsByCategory(currentCategory);

    // Filter by OS
    if (currentOS !== 'all') {
      items = items.filter(item => item.os.includes('all') || item.os.includes(currentOS));
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
      );
    }

    // Sort
    if (activeSort === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (activeSort === 'newest') {
      items.sort((a, b) => b.id - a.id);
    } else {
      items.sort((a, b) => parseFloat(b.downloads) - parseFloat(a.downloads));
    }

    // Update Stats
    if (activeCategoryTitle) activeCategoryTitle.textContent = `${currentCategory.toUpperCase()} ASSETS`;
    if (activeItemsCount) activeItemsCount.textContent = `${items.length} Items`;

    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <h3>NO ASSETS FOUND 🔍</h3>
          <p>Try clearing your search term or selecting another OS filter.</p>
          <button class="btn-direct-dl" style="margin-top:10px;" id="resetFilterBtn">RESET FILTERS</button>
        </div>
      `;
      document.getElementById('resetFilterBtn')?.addEventListener('click', resetFilters);
      return;
    }

    grid.innerHTML = items.map((item, index) => `
      <div class="asset-card" style="animation-delay: ${index * 0.05}s">
        <div>
          <div class="card-top">
            <div class="card-icon">${renderIconHTML(item.icon, item.name)}</div>
            <div class="card-info">
              <div class="card-title">
                <a href="${getAssetPreviewUrl(item)}">${item.name}</a>
              </div>
              <div class="card-meta-bar">
                <span class="badge badge-yellow">${item.tag}</span>
                <span class="badge badge-cyan">${item.size}</span>
              </div>
            </div>
          </div>
          <p class="card-desc" style="margin-top:12px">${item.desc}</p>
        </div>

        <div class="card-footer">
          <div class="card-stats">
            <span>⭐ ${item.rating}</span>
            <span>⬇ ${item.downloads}</span>
          </div>
          <div class="card-actions">
            <button class="btn-quick-view" onclick="openQuickViewModal(${item.id})">PREVIEW</button>
            <a href="${getAssetPreviewUrl(item)}" class="btn-direct-dl">VIEW ↗</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  function resetFilters() {
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    currentOS = 'all';
    osBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('.os-btn[data-os="all"]')?.classList.add('active');
    renderCards();
  }

  // Category Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.tab;
      renderCards();
    });
  });

  // OS Filters
  osBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      osBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentOS = btn.dataset.os;
      renderCards();
      showToast(`Filter applied: ${currentOS.toUpperCase()}`);
    });
  });

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCards();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // Sort Select Listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderCards();
    });
  }

  // Theme Toggler
  if (themeToggle) {
    const updateThemeToggleUI = (theme) => {
      const iconSrc = theme === 'dark' ? 'Assets/icon/lightmode.svg' : 'Assets/icon/darkmode.svg';
      const altText = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      themeToggle.innerHTML = `<img src="${iconSrc}" alt="${altText}" class="theme-icon-img">`;
    };

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      updateThemeToggleUI(nextTheme);
      localStorage.setItem('pixlape_theme', nextTheme);
      showToast(`Switched to ${nextTheme.toUpperCase()} theme`);
    });

    const savedTheme = localStorage.getItem('pixlape_theme');
    const initialTheme = savedTheme || document.documentElement.getAttribute('data-theme') || 'light';
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    updateThemeToggleUI(initialTheme);
  }

  // Modal Functions
  window.openQuickViewModal = function(id) {
    const item = getAssetById(id);
    if (!item) return;

    modalTitle.textContent = item.name;
    modalDesc.textContent = item.desc + " Includes full source files, installation documentation, and commercial license.";
    modalIcon.innerHTML = renderIconHTML(item.icon, item.name);
    modalSize.textContent = item.size;
    modalRating.textContent = `${item.rating} / 5 (${item.downloads} downloads)`;
    modalOS.textContent = item.os.join(', ').toUpperCase();
    modalBadges.innerHTML = `
      <span class="badge badge-yellow">${item.tag}</span>
      <span class="badge badge-lime">VERIFIED CLEAN</span>
    `;
    modalDetailLink.href = getAssetPreviewUrl(item);
    modalOverlay.classList.add('open');
  };

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('open');
    });
  }

  // Toast Function
  window.showToast = function(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 250);
    }, 2700);
  };

  window.openDonateModal = function() {
    showToast('💛 Thank you! Redirecting to donation portal...');
  };

  window.triggerDownload = function() {
    showToast('🚀 Secure download started!');
    if (modalOverlay) modalOverlay.classList.remove('open');
  };

  // Mascot Physics
  const mascotBox = document.getElementById('mascotBox');
  const eyeLeft = document.getElementById('eyeLeft');
  const eyeRight = document.getElementById('eyeRight');
  const mascotText = document.getElementById('mascotText');
  const mascotMouth = document.getElementById('mascotMouth');

  if (mascotBox && eyeLeft && eyeRight) {
    document.addEventListener('mousemove', (e) => {
      const rect = mascotBox.getBoundingClientRect();
      const boxCenterX = rect.left + rect.width / 2;
      const boxCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - boxCenterY, e.clientX - boxCenterX);
      const distance = Math.min(3, Math.hypot(e.clientX - boxCenterX, e.clientY - boxCenterY) / 50);

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      eyeLeft.setAttribute('transform', `translate(${moveX}, ${moveY})`);
      eyeRight.setAttribute('transform', `translate(${moveX}, ${moveY})`);
    });

    mascotBox.addEventListener('click', () => {
      const quotes = ["Feeling brutal!", "Keep building!", "100% Free Vault", "Stay curious!", "Need code?"];
      const rand = quotes[Math.floor(Math.random() * quotes.length)];
      if (mascotText) mascotText.textContent = rand;
      if (mascotMouth) {
        mascotMouth.setAttribute('d', 'M 30 55 Q 50 40 70 55');
        setTimeout(() => mascotMouth.setAttribute('d', 'M 30 62 Q 50 78 70 62'), 1000);
      }
    });
  }

  // Header scroll effect
  const header = document.querySelector('header.topbar');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Initial Render
  renderCards();
});
