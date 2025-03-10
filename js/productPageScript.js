document.addEventListener('DOMContentLoaded', function () {
    // 현재 URL이 해시를 포함하는지 확인
    const isHashRoute = window.location.hash === '#productList';

    // 그리드 컨테이너 가져오기
    const gridContainer = document.querySelector('.grid-container');

    // 그리드 컨테이너가 없으면 함수 종료
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }

    // JavaScript 파일 동적 로드 함수
    const loadScript = (url, callback) => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    };

    // 해시 라우트인 경우 필요한 모듈 동적 로드
    if (isHashRoute) {
        // 절대 경로로 스크립트 로드
        loadScript('/js/productPageItems.js', () => {
            loadScript('/js/productPageSwiper.js', () => {
                // 모듈이 로드된 후 아이템과 스와이퍼 초기화
                import('/js/productPageItems.js')
                    .then((itemsModule) => {
                        const items = itemsModule.default;
                        import('/js/productPageSwiper.js')
                            .then((swiperModule) => {
                                initGridWithItems(items, swiperModule.initSwiper);
                            })
                            .catch((err) => console.error('Error loading swiper module:', err));
                    })
                    .catch((err) => console.error('Error loading items module:', err));
            });
        });
    } else {
        // 상대 경로로 모듈 가져오기 (기존 방식)
        import('./productPageItems.js')
            .then((itemsModule) => {
                const items = itemsModule.default;
                import('./productPageSwiper.js')
                    .then((swiperModule) => {
                        initGridWithItems(items, swiperModule.initSwiper);
                    })
                    .catch((err) => console.error('Error loading swiper module:', err));
            })
            .catch((err) => console.error('Error loading items module:', err));
    }

    // 그리드와 스와이퍼 초기화 함수
    function initGridWithItems(items, initSwiperFunc) {
        const itemsPerPage = 9; // 페이지당 아이템 수
        const totalPages = Math.ceil(items.length / itemsPerPage);

        // 기존 내용 지우기 (서클 요소 제외)
        const circleElement = document.getElementById('circle');
        gridContainer.innerHTML = '';

        // 스와이퍼 구조 생성
        gridContainer.classList.add('swiper');

        // 페이지네이션과 네비게이션 버튼 추가
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'swiper-pagination';
        const nextButton = document.createElement('div');
        nextButton.className = 'swiper-button-next';
        const prevButton = document.createElement('div');
        prevButton.className = 'swiper-button-prev';

        // 스와이퍼 래퍼 생성
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'grid-wrapper-inner swiper-wrapper';

        // 각 페이지에 아이템 추가
        for (let page = 0; page < totalPages; page++) {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'grid-page swiper-slide';

            // 현재 페이지의 아이템 인덱스 계산
            const startIndex = page * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, items.length);

            // 페이지에 아이템 추가
            for (let i = startIndex; i < endIndex; i++) {
                const item = items[i];
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';

                // 이미지 경로에 문제가 있을 경우를 대비한 에러 핸들링
                const imgElement = document.createElement('img');
                imgElement.src = item.imgSrc;
                imgElement.alt = item.title;
                imgElement.onerror = function () {
                    this.onerror = null;
                    this.src = '/images/placeholder.png'; // 대체 이미지
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

                // 그리드 아이템에 이벤트 리스너 추가
                gridItem.addEventListener('mouseenter', handleItemHover);
                gridItem.addEventListener('mouseleave', handleItemLeave);
                pageDiv.appendChild(gridItem);
            }
            wrapperDiv.appendChild(pageDiv);
        }

        // 스와이퍼 구조에 요소 추가
        gridContainer.appendChild(wrapperDiv);
        gridContainer.appendChild(paginationDiv);
        gridContainer.appendChild(nextButton);
        gridContainer.appendChild(prevButton);

        // 서클 요소 다시 추가
        if (circleElement) {
            gridContainer.appendChild(circleElement);
        } else {
            // 서클 요소가 없었다면 새로 생성
            const circle = document.createElement('div');
            circle.id = 'circle';
            circle.className = 'circle';
            gridContainer.appendChild(circle);
        }

        // 스와이퍼 초기화
        initSwiperFunc();

        // 마우스 효과 이벤트 리스너 추가
        document.addEventListener('mousemove', handleMouseMove);
    }
});

// 마우스 움직임 핸들러
function handleMouseMove(e) {
    const circle = document.getElementById('circle');
    if (circle) {
        circle.style.left = e.clientX + 'px';
        circle.style.top = e.clientY + 'px';
    }
}

// 아이템 호버 핸들러
function handleItemHover(e) {
    const circle = document.getElementById('circle');
    if (circle) {
        circle.classList.add('hovered');
        circle.style.opacity = '1';
    }
}

// 아이템 호버 해제 핸들러
function handleItemLeave(e) {
    const circle = document.getElementById('circle');
    if (circle) {
        circle.classList.remove('hovered');
        circle.style.opacity = '0';
    }
}
