import items from './productListItems.js';
import { initSwiper } from './productListSwiper.js';

// 페이지 초기화
export function initializePage() {
    setTimeout(() => {
        if (typeof Swiper === 'undefined') {
            console.error('Swiper not found');
            return;
        }
        runProductListScripts();
    }, 500);

    // "+" 버튼 클릭 이벤트 핸들러 추가
    const addCategoryButton = document.querySelector('.add-category');
    const additionalBrands = document.querySelector('.additional-brands');

    if (addCategoryButton && additionalBrands) {
        addCategoryButton.addEventListener('click', () => {
            if (additionalBrands.style.display === 'none') {
                additionalBrands.style.display = 'flex'; // 보이도록 설정
            } else {
                additionalBrands.style.display = 'none'; // 숨기도록 설정
            }
        });
    }
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
});

// 아이템 호버
function handleItemHover(e) {
    const circle = document.getElementById('circle');
    const gridItem = e.currentTarget;

    if (circle) {
        const bgColor = gridItem.getAttribute('data-bg-color');
        circle.style.backgroundColor = bgColor;
        circle.classList.add('hovered');
    }
}

// 아이템 호버 해제
function handleItemLeave() {
    const circle = document.getElementById('circle');
    if (circle) {
        circle.classList.remove('hovered');
        circle.style.backgroundColor = 'white';
    }
}

function runProductListScripts() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }

    // ✅ 화면 너비에 따라 아이템 개수 설정
    const isMobile = window.innerWidth <= 768;
    const itemsPerPage = isMobile ? 6 : 9; // 모바일 6개, 데스크탑 9개

    const totalPages = Math.ceil(items.length / itemsPerPage);

    gridContainer.innerHTML = ''; // 컨테이너 내용 초기화
    gridContainer.classList.add('swiper');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'grid-wrapper-inner swiper-wrapper';

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33C4', '#33FFF5'];

    for (let page = 0; page < totalPages; page++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'grid-page swiper-slide';

        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, items.length);

        for (let i = startIndex; i < endIndex; i++) {
            const item = items[i];
            const gridItem = document.createElement('a');
            gridItem.href = `productDetail.html?id=${item.id}`;
            gridItem.className = 'grid-item';

            const imgElement = document.createElement('img');
            imgElement.src = item.imgSrc;
            imgElement.alt = item.title;
            imgElement.onerror = function () {
                this.onerror = null;
                this.src = '/images/placeholder.png';
            };

            const titleElement = document.createElement('h3');
            titleElement.textContent = item.title;

            const priceElement = document.createElement('p');
            priceElement.textContent = item.price;

            const detailsDiv = document.createElement('div');
            detailsDiv.appendChild(titleElement);
            detailsDiv.appendChild(priceElement);

            gridItem.appendChild(imgElement);
            gridItem.appendChild(detailsDiv);

            const bgColor = colors[i % colors.length];
            gridItem.setAttribute('data-bg-color', bgColor);

            gridItem.addEventListener('mouseenter', handleItemHover);
            gridItem.addEventListener('mouseleave', handleItemLeave);

            pageDiv.appendChild(gridItem);
        }
        wrapperDiv.appendChild(pageDiv);
    }

    gridContainer.appendChild(wrapperDiv);

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'swiper-controls';

    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'swiper-pagination';

    const nextButton = document.createElement('div');
    nextButton.className = 'swiper-button-next';

    const prevButton = document.createElement('div');
    prevButton.className = 'swiper-button-prev';

    controlsDiv.appendChild(prevButton);
    controlsDiv.appendChild(paginationDiv);
    controlsDiv.appendChild(nextButton);

    gridContainer.appendChild(controlsDiv);

    // Swiper 초기화
    initSwiper();

    setTimeout(() => {
        const gridItems = document.querySelectorAll('.grid-item');
        gridItems.forEach((item) => {
            item.addEventListener('mouseenter', handleItemHover);
            item.addEventListener('mouseleave', handleItemLeave);
        });
    }, 500);
}

let resizeTimer;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer); // 기존 타이머 제거
    resizeTimer = setTimeout(() => {
        runProductListScripts();
    }, 500); // 500ms 동안 크기 변경이 없으면 실행
});
