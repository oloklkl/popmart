import productDetailItem from './productDetailItem.js';
import { initializeProductSwipers } from './productDetailSwiper.js';

// 🛒 장바구니에 상품 추가 함수
function addToCart(productId, quantity = 1) {
    const product = productDetailItem.find((item) => item.id === productId);
    if (!product) return;

    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existing = cartItems.find((i) => i.id === String(productId));

    if (existing) {
        existing.quantity += quantity;
    } else {
        cartItems.push({
            id: String(productId),
            name: product.title,
            price: parseInt(product.price.replace(/[^\d]/g, '')),
            image: product.mainImages?.[0] || '',
            quantity: quantity,
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('장바구니에 담겼습니다!');
}

// 제품 슬라이더 업데이트 함수
function updateProductSlider(productId) {
    const swiperWrapper = document.querySelector('.product-slider .swiper-wrapper');
    swiperWrapper.innerHTML = '';

    const product = productDetailItem.find((item) => item.id === productId);
    if (!product) return;

    const allImages = [...product.mainImages];
    const additionalImages = [...product.mainImages];
    const totalImages = [...allImages, ...additionalImages].slice(0, 7);

    totalImages.forEach((imgSrc) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `상품 이미지`;
        slide.appendChild(img);
        swiperWrapper.appendChild(slide);
    });

    const images = swiperWrapper.querySelectorAll('img');
    let loadedImagesCount = 0;
    images.forEach((image) => {
        image.onload = () => {
            loadedImagesCount++;
            if (loadedImagesCount === images.length) {
                initializeProductSwipers();
            }
        };
    });
}

function updateProductInfo(productId) {
    const product = productDetailItem.find((item) => item.id === productId);
    if (!product) return;

    document.querySelector('.product-info h2').textContent = product.title;
    document.querySelector('.product-info .price').textContent = product.price;
    const cardTitle = document.querySelector('.product-card .product-title');
    if (cardTitle) cardTitle.textContent = product.title;
    const cardPrice = document.querySelector('.product-card .product-price');
    if (cardPrice) cardPrice.textContent = product.price;

    const detailImgContainer = document.querySelector('.product-detail-section .detail-img');
    detailImgContainer.innerHTML = '';
    product.detailImages.forEach((imgSrc) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${product.title} 상세 이미지`;
        detailImgContainer.appendChild(img);
    });

    const infoTable = document.querySelector('.product-info-section table');
    let tableHTML = '';
    for (const [key, value] of Object.entries(product.information)) {
        tableHTML += `<tr><th>${key}</th><td>${value}</td></tr>`;
    }
    infoTable.innerHTML = tableHTML;
}

function updateRelatedProducts() {
    const swiperWrapper = document.querySelector('.related-products-section .swiper-wrapper');
    swiperWrapper.innerHTML = '';

    const selectedProducts = new Set();
    while (selectedProducts.size < 4) {
        const randIndex = Math.floor(Math.random() * productDetailItem.length);
        selectedProducts.add(productDetailItem[randIndex]);
    }

    [...selectedProducts].forEach((product, i) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        const imgIndex = [0, 2, 4][i % 3];
        const imgSrc = product.mainImages[imgIndex] || product.mainImages[0];
        slide.innerHTML = `
      <img src="${imgSrc}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>${product.price}</p>
    `;
        swiperWrapper.appendChild(slide);
    });
}

function setupQuantityEvents() {
    const selectors = [
        ['.product-card .minus', 'decrement', '.product-card .quantity-control span'],
        ['.product-card .plus', 'increment', '.product-card .quantity-control span'],
        ['.product-info .minus', 'decrement', '.product-info .quantity-control span'],
        ['.product-info .plus', 'increment', '.product-info .quantity-control span'],
    ];

    selectors.forEach(([btnSel, type, spanSel]) => {
        const btn = document.querySelector(btnSel);
        const span = document.querySelector(spanSel);
        if (btn && span) {
            btn.addEventListener('click', () => {
                let val = parseInt(span.textContent, 10);
                span.textContent = type === 'increment' ? val + 1 : Math.max(1, val - 1);
            });
        }
    });
}

function setupUIEvents(productId) {
    // ✅ 새로 추가된 장바구니 / 구매 버튼 핸들링
    const cartBtn = document.querySelector('.buttons .cart');
    const buyBtn = document.querySelector('.buttons .buy');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            const quantity = parseInt(
                document.querySelector('.product-info .quantity-control span')?.textContent || '1'
            );
            addToCart(productId, quantity);
        });
    }

    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            const quantity = parseInt(
                document.querySelector('.product-info .quantity-control span')?.textContent || '1'
            );
            addToCart(productId, quantity);
            window.location.href = '/cart.html';
        });
    }

    setupQuantityEvents();

    document.querySelector('.down-btn-wrapper')?.addEventListener('click', () => {
        document.querySelector('.product-detail-section')?.scrollIntoView({ behavior: 'smooth' });
    });
}

function initializePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    if (!productId) return;

    updateProductInfo(productId);
    updateProductSlider(productId);
    updateRelatedProducts();
    setupUIEvents(productId);
}

document.addEventListener('DOMContentLoaded', initializePage);
