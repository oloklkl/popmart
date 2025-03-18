// productDetailScript.js
import { productDetailItem } from './productDetailItem.js'; // 상품 데이터 가져오기
import { initializeProductSwipers } from './productDetailSwiper.js';

// localStorage에서 상품 ID를 가져옴
const productId = localStorage.getItem('productId');

function updateProductInfo(productId) {
    const product = productDetailItem.find((item) => item.id === parseInt(productId));

    if (product) {
        // 기존 코드에서 상품 정보를 업데이트
        const swiperSlides = document.querySelectorAll('.product-slider .swiper-slide img');
        swiperSlides.forEach((slide, index) => {
            slide.src = product.mainImages[index % product.mainImages.length];
            slide.alt = product.title;
        });

        // 상품 정보 업데이트
        document.querySelector('.product-info h2').textContent = product.title;
        document.querySelector('.product-info .price').textContent = product.price;

        // 상세 이미지 업데이트
        const detailImages = document.querySelectorAll('.product-detail-section .detail-img img');
        detailImages.forEach((img, index) => {
            img.src = product.detailImages[index % product.detailImages.length];
            img.alt = product.title + ' 상세 이미지';
        });

        // 상품 정보 테이블 업데이트
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

    // URLSearchParams로 상품 ID 추출
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        updateProductInfo(productId); // 상품 정보 업데이트
    } else {
        console.error('상품 ID가 없습니다.');
    }

    // 나머지 초기화 작업들...
    initializeProductSwipers();
    updateRelatedProducts();
}
