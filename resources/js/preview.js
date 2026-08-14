/**
 * PIXLAPE.COM — Preview Page Controller (page/preview.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Parse asset ID from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const assetId = urlParams.get('id') || 1;

  // Retrieve item from database
  const asset = getAssetById(assetId);

  // DOM elements
  const breadCategory = document.getElementById('breadCategory');
  const breadTitle = document.getElementById('breadTitle');
  const previewEmoji = document.getElementById('previewEmoji');
  const previewVersionTag = document.getElementById('previewVersionTag');
  const itemHeading = document.getElementById('itemHeading');
  const itemDesc = document.getElementById('itemDesc');
  const specSize = document.getElementById('specSize');
  const specLicense = document.getElementById('specLicense');
  const specVersion = document.getElementById('specVersion');
  const specDownloads = document.getElementById('specDownloads');
  const specOS = document.getElementById('specOS');
  const detailTag = document.getElementById('detailTag');
  const downloadBtn = document.getElementById('downloadBtn');
  const themeToggle = document.getElementById('themeToggle');

  // Bind Data to Page
  if (asset) {
    document.title = `${asset.name} — PIXLAPE.COM`;
    if (breadCategory) breadCategory.textContent = asset.category.toUpperCase();
    if (breadTitle) breadTitle.textContent = asset.name.toUpperCase();
    if (previewEmoji) previewEmoji.innerHTML = renderIconHTML(asset.icon, asset.name, '', true);
    if (previewVersionTag) previewVersionTag.textContent = asset.version || 'v1.0';
    if (itemHeading) itemHeading.textContent = asset.name;
    if (itemDesc) itemDesc.textContent = asset.desc + " Full source vector/binary files, installation documentation, and commercial license included in this package.";
    if (specSize) specSize.textContent = asset.size;
    if (specLicense) specLicense.textContent = asset.license || 'CC0 1.0 Universal';
    if (specVersion) specVersion.textContent = asset.version || 'v1.0';
    if (specDownloads) specDownloads.textContent = `${asset.downloads} Verified Downloads`;
    if (specOS) specOS.textContent = asset.os.join(', ').toUpperCase();
    if (detailTag) detailTag.textContent = asset.tag;
    if (downloadBtn) downloadBtn.textContent = `⬇ DOWNLOAD ZIP (${asset.size})`;
  }

  // Theme Toggle Logic
  if (themeToggle) {
    const updateThemeToggleUI = (theme) => {
      const iconSrc = theme === 'dark' ? '../Assets/icon/lightmode.svg' : '../Assets/icon/darkmode.svg';
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

  // Gallery Switcher
  const emojis = [asset ? asset.icon : '🎨', '💎', '📐', '🏷️'];
  const thumbRow = document.getElementById('thumbRow');
  if (thumbRow && asset) {
    thumbRow.innerHTML = emojis.map((ic, i) => `
      <button class="thumb-btn ${i === 0 ? 'active' : ''}" onclick="switchPreview(${i})">
        ${renderIconHTML(ic, asset.name, '', true)}
      </button>
    `).join('');
  }

  window.switchPreview = function(index) {
    if (previewEmoji) previewEmoji.innerHTML = renderIconHTML(emojis[index] || '🎨', asset ? asset.name : '', '', true);
    document.querySelectorAll('.thumb-btn').forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });
    showToast(`Switched preview view #${index + 1}`);
  };

  // Download Trigger
  window.startDownload = function() {
    showToast(`🚀 Downloading ${asset ? asset.name : 'Asset'} (${asset ? asset.size : ''})...`);
  };

  // Comment System
  window.postComment = function() {
    const input = document.getElementById('commentText');
    if (!input || !input.value.trim()) return;
    const list = document.getElementById('commentList');
    if (!list) return;

    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
      <div class="comment-user"><span>@you</span> <span>⭐ 5/5 Stars</span></div>
      <div class="comment-text">${input.value.trim()}</div>
    `;
    list.prepend(item);
    input.value = '';
    showToast('💬 Review posted successfully!');
  };

  // Global Toast helper
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
    }, 2500);
  };
});
