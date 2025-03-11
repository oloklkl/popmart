import items from './productListItems.js';
import { initSwiper } from './productListSwiper.js';

export function initializePage() {
    setTimeout(() => {
        if (typeof Swiper === 'undefined') {
            console.error('Swiper not found');
            return;
        }
        runProductListScripts();
    }, 500);
}

document.addEventListener('mousemove', handleMouseMove);

// 마우스 움직임
function handleMouseMove(e) {
    const circle = document.getElementById('circle');
    if (circle) {
        circle.style.left = e.clientX + 'px';
        circle.style.top = e.clientY + 'px';
    }
}

// 아이템 호버
function handleItemHover(e) {
    const circle = document.getElementById('circle');
    if (circle) {
        circle.classList.add('hovered');
        circle.style.opacity = '1';
    }
}

// 아이템 호버 해제
function handleItemLeave(e) {
    const circle = document.getElementById('circle');
    if (circle) {
        circle.classList.remove('hovered');
        circle.style.opacity = '0';
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

    const circleElement = document.getElementById('circle');
    gridContainer.innerHTML = '';

    gridContainer.classList.add('swiper');

    // 컨트롤 컨테이너 생성
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'swiper-controls';

    // Swiper 컴포넌트 생성
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'swiper-pagination';

    const nextButton = document.createElement('div');
    nextButton.className = 'swiper-button-next';

    const prevButton = document.createElement('div');
    prevButton.className = 'swiper-button-prev';

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'grid-wrapper-inner swiper-wrapper';

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
            gridItem.addEventListener('mouseenter', handleItemHover);
            gridItem.addEventListener('mouseleave', handleItemLeave);
            pageDiv.appendChild(gridItem);
        }
        wrapperDiv.appendChild(pageDiv);
    }

    // 그리드 컨테이너에 스와이퍼 래퍼 추가
    gridContainer.appendChild(wrapperDiv);

    // 컨트롤 요소를 컨트롤 컨테이너에 추가 (순서: 이전 버튼, 페이지네이션, 다음 버튼)
    controlsDiv.appendChild(prevButton);
    controlsDiv.appendChild(paginationDiv);
    controlsDiv.appendChild(nextButton);

    // 그리드 컨테이너에 컨트롤 컨테이너 추가
    gridContainer.appendChild(controlsDiv);

    // Swiper 초기화
    initSwiper();

    // Swiper 초기화 후 요소 위치 재조정 (필요한 경우)
    setTimeout(() => {
        const controls = document.querySelector('.swiper-controls');
        const pagination = document.querySelector('.swiper-pagination');
        const prevBtn = document.querySelector('.swiper-button-prev');
        const nextBtn = document.querySelector('.swiper-button-next');

        // 컨트롤 컨테이너가 없거나 Swiper가 요소를 재배치한 경우 다시 조정
        if (!controls || !controls.contains(pagination) || !controls.contains(prevBtn) || !controls.contains(nextBtn)) {
            const newControlsDiv = document.createElement('div');
            newControlsDiv.className = 'swiper-controls';

            // 기존 요소가 있다면 제거하고 새 컨테이너에 추가
            if (prevBtn && prevBtn.parentNode) {
                prevBtn.parentNode.removeChild(prevBtn);
                newControlsDiv.appendChild(prevBtn);
            }

            if (pagination && pagination.parentNode) {
                pagination.parentNode.removeChild(pagination);
                newControlsDiv.appendChild(pagination);
            }

            if (nextBtn && nextBtn.parentNode) {
                nextBtn.parentNode.removeChild(nextBtn);
                newControlsDiv.appendChild(nextBtn);
            }

            gridContainer.appendChild(newControlsDiv);
        }
    }, 100);
}
