// productListScript.js

import items from './productListItems.js';
import { initSwiper } from './productListSwiper.js';

// 페이지 초기화
export function initializePage() {
    setTimeout(() => {
        if (typeof Swiper === 'undefined') {
            console.error('Swiper not found');
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category'); // 예: 'labubu'

        // 카테고리가 존재하면 필터링, 없으면 전체 리스트 표시
        const filteredItems = category ? filterProducts(category) : items;
        runProductListScripts(filteredItems);
        waitForSwiper(() => {
            initSwiper();
        });
    }, 500);
    function waitForSwiper(callback) {
        const checkSwiper = setInterval(() => {
            if (typeof window.Swiper !== 'undefined') {
                console.log('✅ Swiper 라이브러리 로드 완료');
                clearInterval(checkSwiper);
                callback();
            }
        }, 300);
    }

    // "+" 버튼 클릭 이벤트 핸들러 추가
    const addCategoryButton = document.querySelector('.add-category');
    const additionalBrands = document.querySelector('.additional-brands');

    if (addCategoryButton && additionalBrands) {
        console.log('✅ + 버튼과 추가 브랜드 목록 요소 찾음'); // 요소 선택 확인

        addCategoryButton.addEventListener('click', () => {
            console.log('✅ + 버튼 클릭됨'); // 이벤트 리스너 연결 확인

            if (additionalBrands.style.display === 'none') {
                additionalBrands.style.display = 'flex';
                console.log('✅ 추가 브랜드 목록 표시'); // display 속성 변경 확인
            } else {
                additionalBrands.style.display = 'none';
                console.log('✅ 추가 브랜드 목록 숨김'); // display 속성 변경 확인
            }
        });
    } else {
        console.error('❌ + 버튼 또는 추가 브랜드 목록 요소 찾을 수 없음');
    }
}

function filterProducts(category) {
    return items.filter((item) => item.category === category);
    // filteredItems로 리스트 렌더링
}

function runProductListScripts(productItems) {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }

    const isMobile = window.innerWidth <= 599;
    const itemsPerPage = isMobile ? 6 : 9;
    const totalPages = Math.ceil(productItems.length / itemsPerPage);

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'grid-wrapper-inner swiper-wrapper';

    for (let page = 0; page < totalPages; page++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'grid-page swiper-slide';

        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, productItems.length);

        for (let i = startIndex; i < endIndex; i++) {
            const item = productItems[i];
            const gridItem = document.createElement('a');
            gridItem.href = `/productDetail/${item.id}`;
            gridItem.className = 'grid-item';

            // 클릭 시 id를 sessionStorage에 저장
            gridItem.addEventListener('click', (e) => {
                e.preventDefault();
                const newUrl = `/productDetail/${item.id}`;
                window.history.pushState({}, '', newUrl);
                const contentArea = document.getElementById('content');
                if (!contentArea) {
                    console.error('❌ content 영역을 찾을 수 없음.');
                    return;
                }
                fetch('/page/productPage/productDetail.html')
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`❌ 상품 상세 페이지 로드 실패: HTTP 상태 ${response.status}`);
                        }
                        return response.text();
                    })
                    .then((html) => {
                        const contentArea = document.getElementById('content');
                        if (!contentArea) {
                            console.error('❌ content 영역을 찾을 수 없음.');
                            return;
                        }
                        contentArea.innerHTML = html;
                        console.log('✅ 상품 상세 페이지 로드 완료');
                        window.dispatchEvent(new Event('popstate')); // scriptLoader.js에서 페이지 스크립트 실행
                    })
                    .catch((error) => console.error('❌ 상품 상세 페이지 fetch 오류:', error));
            });

            const imgElement = document.createElement('img');
            imgElement.src = item.imgSrc;
            imgElement.alt = item.title;
            imgElement.onerror = function () {
                this.onerror = null;
                this.src = '/images/placeholder.png';
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
        }
        wrapperDiv.appendChild(pageDiv);
    }

    gridContainer.appendChild(wrapperDiv);
    setTimeout(() => {
        initSwiper();
    }, 1000);
}

// 마우스 움직임
document.addEventListener('DOMContentLoaded', () => {
    const circle = document.getElementById('circle');
    if (!circle) {
        console.error('❌ Circle element not found');
        return;
    }

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        filterProducts(category);
    } else {
        runProductListScripts(items); // 전체 리스트 표시
    }
});

// 아이템 호버 이벤트 핸들러
function handleItemHover(e) {
    const circle = document.getElementById('circle');
    const gridItem = e.currentTarget;
    if (circle) {
        const bgColor = gridItem.getAttribute('data-bg-color');
        circle.style.backgroundColor = bgColor;
        circle.classList.add('hovered');
    }
}

function handleItemLeave() {
    const circle = document.getElementById('circle');
    if (circle) {
        circle.classList.remove('hovered');
        circle.style.backgroundColor = 'white';
    }
}
