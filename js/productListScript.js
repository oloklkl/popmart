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
    console.log('Hovered over item:', e.currentTarget);
    const circle = document.getElementById('circle');
    const gridItem = e.currentTarget;

    if (circle) {
        const bgColor = gridItem.getAttribute('data-bg-color');
        console.log('Applying background color to circle:', bgColor); // 디버깅 로그
        circle.style.backgroundColor = bgColor; // 백그라운드 색상 적용
        circle.classList.add('hovered');
    }
}

// 아이템 호버 해제
function handleItemLeave(e) {
    const circle = document.getElementById('circle');
    if (circle) {
        console.log('Resetting circle background color to white.'); // 디버깅 로그
        circle.classList.remove('hovered');
        circle.style.backgroundColor = 'white'; // 기본 색상으로 리셋
    }
}

function runProductListScripts() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }

    const itemsPerPage = 9;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    gridContainer.innerHTML = ''; // 컨테이너 내용 초기화
    gridContainer.classList.add('swiper');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'grid-wrapper-inner swiper-wrapper';

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33C4', '#33FFF5']; // 색상 배열

    for (let page = 0; page < totalPages; page++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'grid-page swiper-slide';

        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, items.length);

        for (let i = startIndex; i < endIndex; i++) {
            const item = items[i];
            const gridItem = document.createElement('div');
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

            // 각 grid-item에 데이터 속성(data-bg-color) 추가
            const bgColor = colors[i % colors.length]; // 색상 순환
            gridItem.setAttribute('data-bg-color', bgColor);

            // 호버 이벤트 추가
            gridItem.addEventListener('mouseenter', handleItemHover);
            gridItem.addEventListener('mouseleave', handleItemLeave);

            pageDiv.appendChild(gridItem);
        }
        wrapperDiv.appendChild(pageDiv);
    }

    // 스와이퍼 래퍼 추가
    gridContainer.appendChild(wrapperDiv);

    // 컨트롤 요소 생성 및 추가
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
            console.log('Event listener added to:', item); // 이벤트 연결 확인
        });
    }, 500); // Swiper 초기화 후 딜레이를 추가하여 실행
}
