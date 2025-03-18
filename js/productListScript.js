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
            additionalBrands.style.display = additionalBrands.style.display === 'none' ? 'flex' : 'none';
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

// 제품 리스트 렌더링
function runProductListScripts() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }

    const isMobile = window.innerWidth <= 599;
    const isTablet = window.innerWidth >= 600 && window.innerWidth <= 1024;
    const itemsPerPage = isMobile ? 6 : 9;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    gridContainer.innerHTML = '';
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
            gridItem.href = '#productDetail'; // #productDetail 링크로 설정
            gridItem.className = 'grid-item';

            // 클릭 시 id를 sessionStorage에 저장
            gridItem.addEventListener('click', (e) => {
                sessionStorage.setItem('productId', item.id);
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
            arrowIcon.src =
                'https://raw.githubusercontent.com/hyeonky/dp-static/6743f0a47b707ff3cdd7b475a5b1748dc2ce163e/popmart/btnIcon/arrow-right.svg';
            arrowIcon.alt = 'Arrow Icon';
            arrowIcon.className = 'arrow-icon';
            arrowDiv.appendChild(arrowIcon);

            infoDiv.appendChild(titleElement);
            infoDiv.appendChild(priceElement);
            detailsDiv.appendChild(infoDiv);
            detailsDiv.appendChild(arrowDiv);

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

    initSwiper();
}
