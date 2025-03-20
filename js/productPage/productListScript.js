// productListScript.js

import items from './productListItems.js';
import { initSwiper } from './productListSwiper.js';

export function initializePage() {
    console.log('아이템 로드됨:', items ? items.length : '아이템 없음');

    setTimeout(() => {
        const gridContainer = document.querySelector('.grid-container');
        if (!gridContainer) {
            console.error('Grid container를 찾을 수 없습니다');
            return;
        }

        if (typeof Swiper === 'undefined') {
            console.error('Swiper가 로드되지 않았습니다');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        const filteredItems = category ? filterProducts(category) : items;

        if (!filteredItems || filteredItems.length === 0) {
            console.error('표시할 상품이 없습니다');
            return;
        }

        runProductListScripts(filteredItems);
        waitForSwiper(initSwiper);
    }, 500);
}

function waitForSwiper(callback) {
    const checkSwiper = setInterval(() => {
        if (typeof window.Swiper !== 'undefined') {
            console.log('✅ Swiper 라이브러리 로드 완료');
            clearInterval(checkSwiper);
            callback();
        }
    }, 300);
}

function filterProducts(category) {
    return items.filter((item) => item.category === category);
}

function runProductListScripts(productItems) {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) return console.error('Grid container를 찾을 수 없습니다');

    // 기존 wrapper를 사용
    let wrapperDiv = document.querySelector('.grid-wrapper-inner');
    if (!wrapperDiv) {
        console.log('wrapper를 생성합니다');
        wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'grid-wrapper-inner swiper-wrapper';
    } else {
        // 기존 내용 지우기
        wrapperDiv.innerHTML = '';
    }

    const isMobile = window.innerWidth <= 599;
    const itemsPerPage = isMobile ? 6 : 9;
    const totalPages = Math.ceil(productItems.length / itemsPerPage);

    for (let page = 0; page < totalPages; page++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'grid-page swiper-slide';

        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, productItems.length);

        for (let i = startIndex; i < endIndex; i++) {
            const item = productItems[i];
            const gridItem = document.createElement('a');
            gridItem.href = `/page/productPage/productDetail.html?id=${item.id}`;
            gridItem.className = 'grid-item';

            const imgElement = document.createElement('img');
            imgElement.src = item.imgSrc;
            imgElement.alt = item.title;
            // 여기서 대체 이미지를 수정
            imgElement.onerror = function () {
                this.src = 'https://via.placeholder.com/150'; // placeholder.com의 기본 이미지 사용
                this.onerror = null; // 무한 재귀 방지
            };

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'grid-item-details';

            const infoDiv = document.createElement('div');
            infoDiv.className = 'grid-item-info';

            const titleElement = document.createElement('h3');
            titleElement.className = 'grid-item-title';
            titleElement.textContent = item.title;

            const priceElement = document.createElement('p');
            priceElement.className = 'grid-item-price';
            priceElement.textContent = item.price;

            const arrowDiv = document.createElement('div');
            arrowDiv.className = 'grid-item-arrow';
            const arrowIcon = document.createElement('img');
            arrowIcon.src = 'https://raw.githubusercontent.com/hyeonky/dp-static/main/popmart/btnIcon/arrow-right.svg';
            arrowIcon.alt = 'Arrow Icon';
            arrowIcon.className = 'arrow-icon';
            arrowDiv.appendChild(arrowIcon);

            infoDiv.appendChild(titleElement);
            infoDiv.appendChild(priceElement);
            detailsDiv.appendChild(infoDiv);
            detailsDiv.appendChild(arrowDiv);

            gridItem.appendChild(imgElement);
            gridItem.appendChild(detailsDiv);
            pageDiv.appendChild(gridItem);

            // 클릭 이벤트 리스너 추가
            gridItem.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = `/page/productPage/productDetail.html?id=${item.id}`;
            });
        }
        wrapperDiv.appendChild(pageDiv);
    }

    // HTML 구조 확인
    const existingWrapper = document.querySelector('.grid-wrapper-inner');
    if (!existingWrapper) {
        gridContainer.appendChild(wrapperDiv);
    }

    // Swiper 초기화는 콘텐츠 추가 후에 실행
    setTimeout(() => {
        console.log('Swiper 초기화 시도');
        if (typeof initSwiper === 'function') {
            initSwiper();
        }
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드 완료, 공통 컴포넌트 로드 시작');
    Promise.all([
        fetch('/common/header.html').then((res) => res.text()),
        fetch('/common/footer.html').then((res) => res.text()),
    ])
        .then(([headerHTML, footerHTML]) => {
            document.getElementById('header').innerHTML = headerHTML;
            document.getElementById('footer').innerHTML = footerHTML;

            // 헤더와 푸터가 로드된 후 페이지 초기화
            console.log('헤더와 푸터 로드 완료, 페이지 초기화 시작');
            initializePage();
        })
        .catch((error) => console.error('공통 컴포넌트 로드 오류:', error));
});

// 페이지가 완전히 로드된 후 실행되는 추가 체크
window.addEventListener('load', () => {
    console.log('윈도우 완전 로드됨, 상품 목록 확인');
    const wrapper = document.querySelector('.grid-wrapper-inner');
    if (wrapper && wrapper.children.length === 0) {
        console.log('상품 목록이 비어있어 초기화 다시 시도');
        initializePage();
    }
});
