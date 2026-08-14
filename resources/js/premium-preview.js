/**
 * PIXLAPE.COM — Premium Asset Preview & Purchase Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Toast Helper
  window.showToast = function (message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  };

  // URL Query Asset Binding
  const urlParams = new URLSearchParams(window.location.search);
  const assetId = urlParams.get('id') || '9'; // Default to CorelDraw 2026 (id=9)
  const currentAsset = typeof getAssetById === 'function' ? getAssetById(assetId) : null;

  // DOM Elements
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

  // Pricing State
  const licensePrices = {
    personal: { usd: 29, originalUsd: 49, idr: 'Rp 450.000', label: 'Personal License' },
    commercial: { usd: 59, originalUsd: 99, idr: 'Rp 890.000', label: 'Commercial / Team License' },
    enterprise: { usd: 149, originalUsd: 249, idr: 'Rp 2.250.000', label: 'Enterprise / Extended License' }
  };

  let selectedLicense = 'personal';
  let activeDiscountPercent = 0;
  let activeDiscountFixed = 0;

  // Bind Asset Details
  if (currentAsset) {
    document.title = `⚡ [PREMIUM] ${currentAsset.name} — PIXLAPE.COM`;
    if (breadCategory) breadCategory.textContent = currentAsset.category.toUpperCase();
    if (breadTitle) breadTitle.textContent = currentAsset.name.toUpperCase();

    if (previewEmoji) {
      previewEmoji.innerHTML = renderIconHTML(currentAsset.icon, currentAsset.name, '', true);
    }

    if (previewVersionTag) previewVersionTag.textContent = currentAsset.version || 'v2026.0';
    if (itemHeading) itemHeading.textContent = currentAsset.name;
    if (itemDesc) itemDesc.textContent = currentAsset.desc + " Full source binary & vector files, multi-device installer, premium support, and commercial lifetime license included.";
    if (specSize) specSize.textContent = currentAsset.size;
    if (specLicense) specLicense.textContent = currentAsset.license || 'Full Commercial Version';
    if (specVersion) specVersion.textContent = currentAsset.version || 'v2026.0';
    if (specDownloads) specDownloads.textContent = `${currentAsset.downloads} Verified Buyers`;
    if (specOS) specOS.textContent = currentAsset.os.join(', ').toUpperCase();
    if (detailTag) detailTag.textContent = currentAsset.tag || 'PREMIUM';

    // Set preview gallery icons
    const galleryIcons = [currentAsset.icon, '💎', '📐', '🏷️'];
    const thumbRow = document.getElementById('thumbRow');
    if (thumbRow) {
      thumbRow.innerHTML = galleryIcons.map((ic, i) => `
        <button class="thumb-btn ${i === 0 ? 'active' : ''}" onclick="switchPreview(${i})">
          ${renderIconHTML(ic, currentAsset.name, '', true)}
        </button>
      `).join('');
    }

    window.switchPreview = function (index) {
      if (previewEmoji) {
        previewEmoji.innerHTML = renderIconHTML(galleryIcons[index] || '🎨', currentAsset.name, '', true);
      }
      document.querySelectorAll('.thumb-btn').forEach((b, i) => {
        b.classList.toggle('active', i === index);
      });
      showToast(`Switched asset view option #${index + 1}`);
    };
  }

  // License Tier Selection Handler
  window.selectLicenseTier = function (tierKey) {
    if (!licensePrices[tierKey]) return;
    selectedLicense = tierKey;

    document.querySelectorAll('.license-tier-card').forEach(card => {
      card.classList.toggle('active', card.dataset.tier === tierKey);
    });

    updatePriceDisplay();
    showToast(`Selected ${licensePrices[tierKey].label}`);
  };

  function updatePriceDisplay() {
    const tier = licensePrices[selectedLicense];
    const baseUsd = tier.usd;

    let discountUsd = 0;
    if (activeDiscountPercent > 0) {
      discountUsd = (baseUsd * activeDiscountPercent) / 100;
    } else if (activeDiscountFixed > 0) {
      discountUsd = Math.min(activeDiscountFixed, baseUsd - 1);
    }

    const finalUsd = Math.max(1, baseUsd - discountUsd);

    // Update main card price
    const mainPriceEl = document.getElementById('displayMainPrice');
    const originalPriceEl = document.getElementById('displayOriginalPrice');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutDiscount = document.getElementById('checkoutDiscount');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const modalItemTitle = document.getElementById('modalItemTitle');

    if (mainPriceEl) mainPriceEl.textContent = `$${finalUsd.toFixed(2)}`;
    if (originalPriceEl) originalPriceEl.textContent = `$${tier.originalUsd}.00`;
    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${baseUsd.toFixed(2)}`;
    if (checkoutDiscount) checkoutDiscount.textContent = discountUsd > 0 ? `-$${discountUsd.toFixed(2)}` : '$0.00';
    if (checkoutTotal) checkoutTotal.textContent = `$${finalUsd.toFixed(2)}`;
    if (modalItemTitle) modalItemTitle.textContent = `${currentAsset ? currentAsset.name : 'Premium Asset'} (${tier.label})`;
  }

  // Promo Coupon Engine
  window.applyCoupon = function () {
    const input = document.getElementById('couponInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();

    if (!code) {
      showToast('⚠️ Please enter a coupon code.');
      return;
    }

    if (code === 'MOD20') {
      activeDiscountPercent = 20;
      activeDiscountFixed = 0;
      showToast('🎉 Promo code MOD20 applied! 20% OFF');
    } else if (code === 'VIP15') {
      activeDiscountPercent = 0;
      activeDiscountFixed = 15;
      showToast('🎉 Promo code VIP15 applied! $15 OFF');
    } else {
      showToast('❌ Invalid coupon code. Try MOD20');
      return;
    }

    updatePriceDisplay();
  };

  // Checkout Modal Control
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  window.openCheckoutModal = function () {
    updatePriceDisplay();
    if (checkoutOverlay) checkoutOverlay.classList.add('open');
  };

  window.closeCheckoutModal = function () {
    if (checkoutOverlay) checkoutOverlay.classList.remove('open');
  };

  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) closeCheckoutModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && checkoutOverlay && checkoutOverlay.classList.contains('open')) {
      closeCheckoutModal();
    }
  });

  // Payment Method Tabs
  window.selectPaymentTab = function (method, btn) {
    document.querySelectorAll('.payment-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const methodDesc = document.getElementById('paymentMethodNotice');
    if (methodDesc) {
      if (method === 'card') methodDesc.textContent = '💳 Credit/Debit Card: Visa, Mastercard, American Express processed via Stripe 256-bit SSL.';
      else if (method === 'paypal') methodDesc.textContent = '🅿️ PayPal Checkout: Instant buyer protection redirect & one-click pay.';
      else if (method === 'qris') methodDesc.textContent = '📱 QRIS / E-Wallet: Instant scan QR code using GoPay, OVO, DANA, ShopeePay or LinkAja.';
      else if (method === 'bank') methodDesc.textContent = '🏦 Bank Virtual Account: Instant BCA, Mandiri, BNI, or BRI automated VA verification.';
    }
    showToast(`Payment method set to ${method.toUpperCase()}`);
  };

  // Simulated Purchase & Instant Download Execution
  window.executePurchase = function () {
    const payBtn = document.getElementById('btnPayNow');
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.textContent = '⏳ PROCESSING TRANSACTION...';
    }

    setTimeout(() => {
      showToast('✅ PAYMENT SUCCESSFUL! Generating License & Download Token...');

      setTimeout(() => {
        if (payBtn) {
          payBtn.disabled = false;
          payBtn.textContent = '⚡ INSTANT BUY / CHECKOUT NOW';
        }
        closeCheckoutModal();

        // Trigger Instant Download
        const assetName = currentAsset ? currentAsset.name : 'Premium_Asset_Pack';
        showToast(`🚀 Download Started: ${assetName}_PRO_FULL.zip`);

        // Trigger simulated file download link
        const fakeLink = document.createElement('a');
        fakeLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`PIXLAPE.COM - PREMIUM LICENSE CONFIRMATION\n\nAsset: ${assetName}\nLicense: ${selectedLicense.toUpperCase()}\nOrder ID: MOD-${Math.floor(100000 + Math.random() * 900000)}\nDownload Token: VERIFIED-CLEAN-2026-ZIP\nStatus: FULL VERSION UNLOCKED`);
        fakeLink.download = `${assetName.replace(/\s+/g, '_')}_FULL_LICENSE.txt`;
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
      }, 1200);
    }, 1500);
  };

  // FAQ Accordion Handler
  window.toggleFAQ = function (faqHeader) {
    const faqItem = faqHeader.parentElement;
    const isActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

    if (!isActive) {
      faqItem.classList.add('active');
    }
  };

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

  // Initial Price Binding
  updatePriceDisplay();
});
