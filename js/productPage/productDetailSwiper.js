// 제품 상세 Swiper 초기화
export function initializeProductSwipers() {
    const productDetailItem = [
        {
            id: 1,
            title: '라부부 코카콜라 시리즈',
            price: '15,000원',
            mainImages: [
                'https://github.com/hyeonky/dp-static/blob/main/popmart/bigimg/bigImg2/bigImg2-4.jpg?raw=true',
                'https://github.com/hyeonky/dp-static/blob/main/popmart/bigimg/bigImg2/bigImg2-5.jpg?raw=true',
                'https://github.com/hyeonky/dp-static/blob/main/popmart/bigimg/bigImg2/bigImg2-2.jpg?raw=true',
                'https://github.com/hyeonky/dp-static/blob/main/popmart/bigimg/bigImg2/bigImg2-3.jpg?raw=true',
                'https://github.com/hyeonky/dp-static/blob/main/popmart/bigimg/bigImg2/bigImg2-6.jpg?raw=true',
            ],
        },
    ];

    // 슬라이드 데이터를 동적으로 렌더링
    function renderSlides(slideData) {
        const swiperWrapper = document.querySelector('.product-slider-section .swiper-wrapper');
        slideData.mainImages.forEach((image) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `<img src="${image}" alt="${slideData.title}" />`;
            swiperWrapper.appendChild(slide);
        });
    }

    // 데이터로 슬라이드 렌더링
    renderSlides(productDetailItem[0]);

    // 제품 상세 Swiper 초기화
    const productSliderSwiper = new Swiper('.product-slider-section .swiper', {
        slidesPerView: 5, // 한 화면에 보여질 슬라이드 수
        centeredSlides: true, // 중앙 정렬
        loop: true, // 무한 루프
        spaceBetween: -130, // 슬라이드 간 간격
        initialSlide: 2, // 초기 활성 슬라이드
        navigation: {
            nextEl: '.swiper-button-next', // 오른쪽 버튼
            prevEl: '.swiper-button-prev', // 왼쪽 버튼
        },
        pagination: {
            el: '.swiper-pagination', // 페이지네이션
            clickable: true,
        },
        on: {
            // 초기화 시 실행
            init: function () {
                this.emit('slideChange'); // 초기 슬라이드 상태 설정
                setTimeout(() => {
                    this.update(); // 강제 업데이트로 위치 재조정
                }, 10); // 약간의 지연 시간 후 업데이트
            },
            // 슬라이드 변경 시 실행
            slideChange: function () {
                const activeIndex = this.activeIndex;
                const slides = this.slides;

                // 모든 클래스 초기화
                slides.forEach((slide) => {
                    slide.classList.remove('active', 'next', 'prev', 'far-next', 'far-prev');
                    slide.style.visibility = 'visible'; // 기본적으로 보임
                    slide.style.pointerEvents = 'auto'; // 클릭 가능
                });

                // 현재 활성 슬라이드와 주변 슬라이드에 클래스 추가
                slides[activeIndex].classList.add('active');

                const nextIndex = (activeIndex + 1) % slides.length;
                const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
                const farNextIndex = (activeIndex + 2) % slides.length;
                const farPrevIndex = (activeIndex - 2 + slides.length) % slides.length;

                slides[nextIndex].classList.add('next');
                slides[prevIndex].classList.add('prev');
                slides[farNextIndex].classList.add('far-next');
                slides[farPrevIndex].classList.add('far-prev');

                // 화면 밖 슬라이드 숨기기
                slides.forEach((slide, index) => {
                    const distance = Math.abs(index - activeIndex);
                    if (distance > 2) {
                        // 중심 기준으로 2칸 이상 떨어진 슬라이드 숨김
                        slide.style.visibility = 'hidden'; // 화면에서 숨김
                        slide.style.pointerEvents = 'none'; // 클릭 불가
                    }
                });
            },
        },
    });

    // 관련 상품 Swiper
    const relatedProductsSwiper = new Swiper('.related-products-section .swiper', {
        slidesPerView: 1.5, // 한 화면에 보여질 슬라이드 수
        spaceBetween: 20, // 슬라이드 간 간격
        loop: true, // 무한 루프
        navigation: {
            nextEl: '.related-products-section .swiper-button-next',
            prevEl: '.related-products-section .swiper-button-prev',
        },
        pagination: {
            el: '.related-products-section .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2.5 }, // 태블릿 기준
            1024: { slidesPerView: 3 }, // 데스크탑 기준
        },
    });
}
