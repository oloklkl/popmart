import productDetailItem from './productDetailItem.js';
import { initializeProductSwipers } from './productDetailSwiper.js';

// URLSearchParams를 사용하여 상품 ID 추출
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function updateProductInfo(productId) {
    const product = productDetailItem.find((item) => item.id === parseInt(productId));

    if (product) {
        // 메인 이미지 변경
        const swiperSlides = document.querySelectorAll('.product-slider .swiper-slide img');
        swiperSlides.forEach((slide, index) => {
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
            img.alt = product.title + ' 상세 이미지';
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
        // 상품 정보를 표시할 HTML 요소들을 초기화하거나, 오류 메시지를 표시할 수 있습니다.
    }
}

function updateRelatedProducts() {
    const relatedProducts = document.querySelectorAll('.related-products-section .swiper-slide');

    relatedProducts.forEach((slide, index) => {
        const randomIndex = Math.floor(Math.random() * productDetailItem.length);
        const randomProduct = productDetailItem[randomIndex];

        const imgElement = slide.querySelector('img');
        const titleElement = slide.querySelector('h3');
        const priceElement = slide.querySelector('p');

        // 이미지 인덱스 번갈아 가져오기
        const imageIndexes = [0, 2, 4]; // 가져올 이미지 인덱스
        const imageIndex = imageIndexes[index % imageIndexes.length]; // 0, 2, 4 반복
        const imageUrl = randomProduct.mainImages[imageIndex]; // 선택된 인덱스의 이미지 URL 가져오기

        imgElement.src = imageUrl;
        imgElement.alt = randomProduct.title;
        titleElement.textContent = randomProduct.title;
        priceElement.textContent = randomProduct.price;
    });
}

export function initializePage() {
    console.log('productDetailScript.js 실행됨');

    // 상품 ID가 있는지 확인
    if (productId) {
        updateProductInfo(productId);
    } else {
        console.error('상품 ID가 없습니다.');
    }

    initializeProductSwipers(); // 스와이퍼 초기화
    updateRelatedProducts();

    // 수량 버튼 이벤트 핸들러 추가
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const quantitySpan = document.querySelector('.quantity-control span');

    if (minusBtn && plusBtn && quantitySpan) {
        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = quantity + 1;
        });
    }

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
        if (window.scrollY > 600) {
            if (topBtn) topBtn.style.display = 'block'; // Top 버튼
            if (toggleBtn) toggleBtn.style.display = 'block'; // 토글 버튼
            if (cartBtn) cartBtn.style.display = 'block'; // 장바구니 버튼

            // 카드 내려가기 (transform을 이용해 부드럽게 내려가게 함)
            if (card) card.style.transform = 'translateY(100px)'; // 100px 내려가기
        } else {
            if (topBtn) topBtn.style.display = 'none'; // Top 버튼 숨기기
            if (toggleBtn) toggleBtn.style.display = 'none'; // 토글 버튼 숨기기
            if (cartBtn) cartBtn.style.display = 'none'; // 장바구니 버튼 숨기기

            // 카드 원래 위치로 돌아오기
            if (card) card.style.transform = 'translateY(0)'; // 원위치로 돌아가기
        }
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
            alert('장바구니에 추가되었습니다!'); // 필요하면 장바구니 기능 연결
        });
    }

    // 📌 [추가] 토글 버튼 기능 (예: 메뉴 열기/닫기)
    const toggleBtn = document.querySelector('.toggle-btn');
    const menu = document.querySelector('.menu'); // 메뉴가 존재한다고 가정
    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active'); // active 클래스로 열고 닫기
        });
    }

    // 📌 [추가] 카드 숨기기/보이기 버튼 (토글 버튼 클릭 시)
    const toggleCardBtn = document.querySelector('.toggle-card-btn');
    const cardElement = document.querySelector('.card'); // 카드 요소

    if (toggleCardBtn && cardElement) {
        toggleCardBtn.addEventListener('click', () => {
            // 카드가 보이면 숨기고, 숨겨지면 보이게 설정
            if (cardElement.style.transform === 'translateY(100px)') {
                cardElement.style.transform = 'translateY(0)';
            } else {
                cardElement.style.transform = 'translateY(100px)';
            }
        });
    }
}
