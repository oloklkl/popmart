// ✅ 최적화된 cart.js - 전체 덮어쓰기 버전 + 자동 렌더링 연동

import { loadCartData } from './cartDataLoader.js';

document.addEventListener('DOMContentLoaded', () => {
  const selectedItemsContainer = document.querySelector('.cart-selected-items');
  const selectedThumbnails = document.querySelector('.selected-thumbnails');
  const orderSummary = document.querySelector('.order-summary');
  const selectAllCheckbox = document.getElementById('select-all');
  const topButton = document.getElementById('top-button');
  const cartItemsWrapper = document.querySelector('.cart-items');

  const device = {
    width: window.innerWidth,
    height: window.innerHeight,
    get isMobile() {
      return this.width <= 768;
    },
  };

  const cartData = loadCartData();

  renderCartItems(cartData);
  initCart();
  setupEventListeners();

  function renderCartItems(data) {
    cartItemsWrapper.innerHTML = '';
    data.forEach((item, idx) => {
      const checkboxId = `checkbox${idx + 1}`;
      const html = `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-main">
            <div class="item-checkbox">
              <input type="checkbox" id="${checkboxId}" class="checkbox-input item-checkbox-input" checked />
              <label for="${checkboxId}" class="checkbox-label">
                <!-- 체크됨 -->
                <svg class="checkbox-svg checked-svg" width="24" height="24" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="4" fill="white" stroke="#E02121" stroke-width="2" />
                  <rect x="7" y="7" width="10" height="10" rx="2" fill="#E02121" />
                </svg>
  
                <!-- 체크 안됨 -->
                <svg class="checkbox-svg unchecked-svg" width="24" height="24" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="4" fill="white" stroke="#888" stroke-width="1.5" />
                </svg>
              </label>
            </div>
  
            <div class="item-image">
              <img class="cart-image" src="${item.image}" alt="${item.name}" />
            </div>
  
            <div class="item-info">
              <div class="item-name">${item.name}</div>
              <div class="item-category">배송: [무료] / 기본배송</div>
              <div class="item-price">${item.price.toLocaleString()} 원</div>
            </div>
  
            <div class="item-quantity">
              <button type="button" class="quantity-btn minus-btn">-</button>
              <div class="quantity-input-container" data-value="${item.quantity}">
                <input type="text" value="${item.quantity}" class="quantity-input" />
              </div>
              <button type="button" class="quantity-btn plus-btn">+</button>
            </div>
  
            <div class="item-total">합계: ${(item.price * item.quantity).toLocaleString()} 원</div>
          </div>
  
          <div class="action-wrapper">
            <div class="action-buttons">
              <button type="button" class="action-btn">삭제하기</button>
              <button type="button" class="action-btn delete">주문하기</button>
            </div>
          </div>
        </div>
      `;
      cartItemsWrapper.insertAdjacentHTML('beforeend', html);
    });
  }

  function initCart() {
    hideCheckboxes();
    updateCheckboxStatus();
    updateSelectedItems();
    updateTotalPrice();
    adjustBottomPanel();
  }

  function hideCheckboxes() {
    document.querySelectorAll('.checkbox-input').forEach((el) => {
      el.style.cssText = 'position:absolute;opacity:0;width:0;height:0;z-index:-1';
    });
  }

  function setupEventListeners() {
    document.body.addEventListener('click', (e) => {
      const plus = e.target.closest('.plus-btn');
      const minus = e.target.closest('.minus-btn');
      const del = e.target.closest('.action-btn:not(.delete)');
      const order = e.target.closest('.action-btn.delete');

      if (plus || minus) {
        const item = e.target.closest('.cart-item');
        const input = item.querySelector('.quantity-input');
        let val = parseInt(input.value) || 1;
        val = Math.max(1, val + (plus ? 1 : -1));
        input.value = val;
        item.querySelector('.quantity-input-container').dataset.value = val;
        updateItemTotal(item);
        updateTotalPrice();
      }

      if (del) {
        const item = e.target.closest('.cart-item');
        item.remove();
        updateSelectedItems();
        updateTotalPrice();
        updateCheckboxStatus();
      }

      if (order) {
        alert('🛒 주문이 완료되었습니다!');
      }
    });

    document.body.addEventListener('change', (e) => {
      const cb = e.target.closest('.item-checkbox-input');
      if (cb) {
        updateCheckboxStatus();
        updateSelectedItems();
        updateTotalPrice();
      }
    });

    selectAllCheckbox?.addEventListener('change', () => {
      const checked = selectAllCheckbox.checked;
      document.querySelectorAll('.item-checkbox-input').forEach((cb) => {
        cb.checked = checked;
      });
      updateCheckboxStatus();
      updateSelectedItems();
      updateTotalPrice();
    });
    setupCheckboxSVGSync();
    topButton?.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', adjustBottomPanel);
  }
  function setupCheckboxSVGSync() {
    document.querySelectorAll('.checkbox-label').forEach((label) => {
      const checkbox = label.previousElementSibling;
      const checkedSvg = label.querySelector('.checked-svg');
      const uncheckedSvg = label.querySelector('.unchecked-svg');

      if (!checkbox || !checkedSvg || !uncheckedSvg) return;

      // 초기 상태 반영
      updateSvgDisplay(checkbox.checked);

      // 이벤트 연결
      checkbox.addEventListener('change', () => {
        updateSvgDisplay(checkbox.checked);
      });

      function updateSvgDisplay(isChecked) {
        checkedSvg.style.display = isChecked ? 'block' : 'none';
        uncheckedSvg.style.display = isChecked ? 'none' : 'block';
      }
    });
  }
  function updateItemTotal(item) {
    const price = parseInt(item.querySelector('.item-price').textContent.replace(/[^\d]/g, '')) || 0;
    const qty = parseInt(item.querySelector('.quantity-input').value) || 1;
    const total = price * qty;
    item.querySelector('.item-total').textContent = `합계: ${total.toLocaleString()} 원`;
  }

  function updateCheckboxStatus() {
    const all = [...document.querySelectorAll('.item-checkbox-input')];
    const allChecked = all.every((cb) => cb.checked);
    selectAllCheckbox.checked = allChecked;
  }

  function updateSelectedItems() {
    selectedThumbnails.innerHTML = '';
    document.querySelectorAll('.item-checkbox-input:checked').forEach((cb) => {
      const item = cb.closest('.cart-item');
      const img = item.querySelector('.cart-image');
      const thumb = document.createElement('div');
      thumb.className = 'selected-item';
      thumb.style.cssText = 'width:60px;height:60px;border-radius:8px;overflow:hidden';
      const image = document.createElement('img');
      image.src = img.src;
      image.alt = img.alt;
      image.style.cssText = 'width:100%;height:100%;object-fit:cover';
      thumb.appendChild(image);
      selectedThumbnails.appendChild(thumb);
    });
    const count = selectedItemsContainer.querySelector('.selected-count span');
    if (count)
      count.textContent = `${
        document.querySelectorAll('.item-checkbox-input:checked').length
      } 개 상품이 선택 되었습니다.`;
  }

  function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.item-checkbox-input:checked').forEach((cb) => {
      const item = cb.closest('.cart-item');
      const totalEl = item.querySelector('.item-total');
      total += parseInt(totalEl.textContent.replace(/[^\d]/g, '')) || 0;
    });
    document.querySelectorAll('.summary-value').forEach((el, i) => {
      if (i < 2) el.textContent = total.toLocaleString('ko-KR') + ' 원';
    });
  }

  function adjustBottomPanel() {
    if (!selectedItemsContainer) return;
    selectedItemsContainer.style.position = 'fixed';
    selectedItemsContainer.style.bottom = '0';
    selectedItemsContainer.style.width = '100%';
    selectedItemsContainer.style.background = 'white';
    selectedItemsContainer.style.boxShadow = '0 -4px 10px rgba(0,0,0,0.1)';
    selectedItemsContainer.style.padding = '15px';
    selectedItemsContainer.style.borderRadius = '30px 30px 0 0';
    selectedItemsContainer.style.zIndex = '100';
  }

  function handleScroll() {
    if (!topButton) return;
    if (window.scrollY > 300) {
      topButton.style.opacity = '1';
      topButton.style.visibility = 'visible';
    } else {
      topButton.style.opacity = '0';
      topButton.style.visibility = 'hidden';
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
