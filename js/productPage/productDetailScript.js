// productDetailScript.js
import productDetailItem from './productDetailItem.js';
import { initializeProductSwipers } from './productDetailSwiper.js';

// 전역 변수 선언을 함수 내부로 이동
function initializePage() {
    console.log('productDetailScript.js 실행됨');

    // URLSearchParams를 사용하여 상품 ID 추출
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    console.log('상품 ID:', productId);
    console.log('URL 파라미터:', window.location.search);

    // 상품 ID가 있는지 확인
    if (productId && !isNaN(productId)) {
        updateProductInfo(productId);
        // 이미지가 로드된 후 스와이퍼 초기화
        setTimeout(() => {
            initializeProductSwipers();
        }, 100);
    } else {
        console.error('유효한 상품 ID가 아닙니다.');
        return; // 상품 ID가 유효하지 않으면 함수 종료
    }

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

    // 📌 다운 버튼 클릭 시 특정 섹션으로 스크롤 이동
    const downBtn = document.querySelector('.down-btn-wrapper');
    const targetSection = document.querySelector('.product-detail-section');

    if (downBtn && targetSection) {
        downBtn.addEventListener('click', () => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 📌 스크롤 위치에 따라 버튼 및 카드 보이기/숨기기
    window.addEventListener('scroll', () => {
        const topBtn = document.querySelector('.top-btn');
        const toggleBtn = document.querySelector('.toggle-btn');
        const cartBtn = document.querySelector('.cart-btn');
        const card = document.querySelector('.product-card');

        const displayStyle = window.scrollY > 600 ? 'block' : 'none';
        if (topBtn) topBtn.style.display = displayStyle;
        if (toggleBtn) toggleBtn.style.display = displayStyle;
        if (cartBtn) cartBtn.style.display = displayStyle;
        if (card) card.style.transform = window.scrollY > 600 ? 'translateY(100px)' : 'translateY(0)';
    });

    // 📌 Top 버튼 클릭 이벤트
    const topBtn = document.querySelector('.top-btn');
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 📌 장바구니 버튼 클릭 이벤트
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert('장바구니에 추가되었습니다!');
        });
    }

    // 📌 토글 버튼 기능
    const toggleBtn = document.querySelector('.toggle-btn');
    const menu = document.querySelector('.menu');
    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // 📌 카드 숨기기/보이기 버튼
    const toggleCardBtn = document.querySelector('.toggle-card-btn');
    const cardElement = document.querySelector('.card');

    if (toggleCardBtn && cardElement) {
        toggleCardBtn.addEventListener('click', () => {
            cardElement.style.transform =
                cardElement.style.transform === 'translateY(100px)' ? 'translateY(0)' : 'translateY(100px)';
        });
    }
}

// 상품 정보 업데이트 함수
function updateProductInfo(productId) {
    const product = productDetailItem.find((item) => item.id === productId);

    if (product) {
        // 메인 이미지 슬라이더 요소 생성
        const swiperWrapper = document.querySelector('.product-slider .swiper-wrapper');
        swiperWrapper.innerHTML = ''; // 기존 내용 초기화

        // 메인 이미지 슬라이드 동적 생성
        product.mainImages.forEach((imgSrc) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = product.title;

            slide.appendChild(img);
            swiperWrapper.appendChild(slide);
        });

        // 상품 정보 변경
        document.querySelector('.product-info h2').textContent = product.title;
        document.querySelector('.product-info .price').textContent = product.price;

        // 카드 UI의 제목과 가격도 업데이트 (있을 경우)
        const cardTitle = document.querySelector('.product-card .product-title');
        if (cardTitle) cardTitle.textContent = product.title;

        const cardPrice = document.querySelector('.product-card .product-price');
        if (cardPrice) cardPrice.textContent = product.price;

        // 상세 이미지 생성
        const detailImgContainer = document.querySelector('.product-detail-section .detail-img');
        detailImgContainer.innerHTML = ''; // 기존 내용 초기화

        // 표시할 특정 인덱스
        const selectedIndices = [0, 2, 4];

        // 중복 이미지 확인을 위한 Set
        const uniqueImages = new Set();

        // 상세 이미지 동적 생성 (선택된 인덱스만)
        selectedIndices.forEach((index) => {
            // 해당 인덱스의 이미지가 존재하는지 확인
            if (index < product.detailImages.length) {
                const imgSrc = product.detailImages[index];

                // 중복 이미지 확인
                if (!uniqueImages.has(imgSrc)) {
                    uniqueImages.add(imgSrc);

                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${product.title} 상세 이미지`;
                    detailImgContainer.appendChild(img);
                }
            }
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
// 관련 상품 업데이트 함수
function updateRelatedProducts() {
    const swiperWrapper = document.querySelector('.related-products-section .swiper-wrapper');
    swiperWrapper.innerHTML = ''; // 기존 내용 초기화

    const selectedProducts = new Set(); // 이미 선택된 상품을 저장할 Set

    for (let i = 0; i < 4; i++) {
        let randomProduct;

        // 중복된 상품을 방지하기 위한 루프
        do {
            const randomIndex = Math.floor(Math.random() * productDetailItem.length);
            randomProduct = productDetailItem[randomIndex];
        } while (selectedProducts.has(randomProduct.id)); // 이미 선택된 상품이면 다시 선택

        selectedProducts.add(randomProduct.id); // 선택된 상품을 Set에 추가

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

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initializePage);

// export 문을 맨 아래로 이동
export { initializePage };
