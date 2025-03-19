// productDetailScript.js

import productDetailItem from './productDetailItem.js';
import { initializeProductSwipers } from './productDetailSwiper.js';

// URLSearchParams를 사용하여 상품 ID 추출
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// 상품 정보 업데이트 함수
function updateProductInfo(productId) {
    const product = productDetailItem.find((item) => item.id === productId);

    if (product) {
        // 메인 이미지 변경
        const swiperSlides = document.querySelectorAll('.product-slider .swiper-slide img');
        swiperSlides.forEach((slide, index) => {
            // 인덱스가 배열 길이를 초과하지 않도록 보장
            slide.src = product.mainImages[index % product.mainImages.length];
            slide.alt = product.title;
        });

        // 상품 정보 변경
        document.querySelector('.product-info h2').textContent = product.title;
        document.querySelector('.product-info .price').textContent = product.price;

        // 상세 이미지 변경
        const detailImages = document.querySelectorAll('.product-detail-section .detail-img img');
        detailImages.forEach((img, index) => {
            img.src = product.detailImages[index % product.detailImages.length];
            img.alt = `${product.title} 상세 이미지`;
        });

        // 상품 정보 테이블 변경
        const infoTable = document.querySelector('.product-info-section table');
        let tableHTML = '';
        for (const key in product.information) {
            tableHTML += `
                <tr>
                    <th>${key}</th>
                    <td>${product.information[key]}</td>
                </tr>
            `;
        }
        infoTable.innerHTML = tableHTML;
    } else {
        console.error('해당 ID의 상품을 찾을 수 없습니다.');
    }
}

// 관련 상품 업데이트 함수
function updateRelatedProducts() {
    const swiperWrapper = document.querySelector('.related-products-section .swiper-wrapper');
    swiperWrapper.innerHTML = ''; // 기존 내용 초기화

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * productDetailItem.length);
        const randomProduct = productDetailItem[randomIndex];
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        swiperSlide.innerHTML = `
            <img src="${randomProduct.mainImages[0]}" alt="${randomProduct.title}" />
            <h3>${randomProduct.title}</h3>
            <p>${randomProduct.price}</p>
        `;
        swiperWrapper.appendChild(swiperSlide);
    }
}

// 페이지 초기화 함수
export function initializePage() {
    console.log('productDetailScript.js 실행됨');

    // 상품 ID가 있는지 확인
    if (productId && !isNaN(productId)) {
        updateProductInfo(productId);
    } else {
        console.error('유효한 상품 ID가 아닙니다.');
        return; // 상품 ID가 유효하지 않으면 함수 종료
    }

    initializeProductSwipers(); // 스와이퍼 초기화
    updateRelatedProducts(); // 관련 상품 업데이트

    // 수량 버튼 이벤트 핸들러 추가
    const buttons = [
        { selector: '.minus', action: 'decrement' },
        { selector: '.plus', action: 'increment' },
    ];

    buttons.forEach(({ selector, action }) => {
        const btn = document.querySelector(selector);
        const quantitySpan = document.querySelector('.quantity-control span');

        if (btn && quantitySpan) {
            btn.addEventListener('click', () => {
                let quantity = parseInt(quantitySpan.textContent);
                if (action === 'decrement' && quantity > 1) {
                    quantitySpan.textContent = quantity - 1;
                } else if (action === 'increment') {
                    quantitySpan.textContent = quantity + 1;
                }
            });
        }
    });

    // 📌 [추가] 다운 버튼 클릭 시 특정 섹션으로 스크롤 이동
    const downBtn = document.querySelector('.down-btn-wrapper');
    const targetSection = document.querySelector('.product-detail-section');

    if (downBtn && targetSection) {
        downBtn.addEventListener('click', () => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 📌 [추가] 스크롤 위치에 따라 Top, Toggle, Cart 버튼 보이기/숨기기
    window.addEventListener('scroll', () => {
        const topBtn = document.querySelector('.top-btn');
        const toggleBtn = document.querySelector('.toggle-btn');
        const cartBtn = document.querySelector('.cart-btn');
        const card = document.querySelector('.product-card'); // 카드가 들어있는 요소

        // 600px 이상 스크롤되면 버튼들이 보이기
        const displayStyle = window.scrollY > 600 ? 'block' : 'none';
        if (topBtn) topBtn.style.display = displayStyle;
        if (toggleBtn) toggleBtn.style.display = displayStyle;
        if (cartBtn) cartBtn.style.display = displayStyle;
        if (card) card.style.transform = window.scrollY > 600 ? 'translateY(100px)' : 'translateY(0)';
    });

    // 📌 [추가] Top 버튼 클릭 시 부드럽게 스크롤 이동
    const topBtn = document.querySelector('.top-btn');
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 📌 [추가] 장바구니 버튼 클릭 이벤트
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert('장바구니에 추가되었습니다!');
        });
    }

    // 📌 [추가] 토글 버튼 기능
    const toggleBtn = document.querySelector('.toggle-btn');
    const menu = document.querySelector('.menu'); // 메뉴가 존재한다고 가정
    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // 📌 [추가] 카드 숨기기/보이기 버튼
    const toggleCardBtn = document.querySelector('.toggle-card-btn');
    const cardElement = document.querySelector('.card');

    if (toggleCardBtn && cardElement) {
        toggleCardBtn.addEventListener('click', () => {
            cardElement.style.transform =
                cardElement.style.transform === 'translateY(100px)' ? 'translateY(0)' : 'translateY(100px)';
        });
    }
}
