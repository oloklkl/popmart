// productDetailSwiper.js

// 제품 상세 Swiper 초기화
export function initializeProductSwipers() {
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
            init() {
                // Swiper가 초기화될 때 강제로 슬라이드를 업데이트
                this.update();
                // 또는 첫 번째 슬라이드로 이동
                this.slideTo(2, 0); // 2번 슬라이드로 이동 (0은 애니메이션 없이 바로 이동)
            },
            slideChange() {
                // 주어진 slideChange() 코드 적용
                const { activeIndex, slides } = this;

                slides.forEach((slide, index) => {
                    if (slide) {
                        // slide가 존재하는지 확인
                        slide.classList.remove('active', 'next', 'prev', 'far-next', 'far-prev');
                        slide.style.visibility = 'visible';
                        slide.style.pointerEvents = 'auto';

                        const distance = Math.abs(index - activeIndex);
                        if (distance > 2) {
                            slide.style.visibility = 'hidden'; // 화면에서 숨김
                            slide.style.pointerEvents = 'none'; // 클릭 불가
                        }
                    } else {
                        console.warn(`슬라이드가 정의되지 않았습니다. index: ${index}`);
                    }
                });

                if (slides[activeIndex]) {
                    slides[activeIndex].classList.add('active');
                }
                if (slides[(activeIndex + 1) % slides.length]) {
                    slides[(activeIndex + 1) % slides.length].classList.add('next');
                }
                if (slides[(activeIndex - 1 + slides.length) % slides.length]) {
                    slides[(activeIndex - 1 + slides.length) % slides.length].classList.add('prev');
                }
                if (slides[(activeIndex + 2) % slides.length]) {
                    slides[(activeIndex + 2) % slides.length].classList.add('far-next');
                }
                if (slides[(activeIndex - 2 + slides.length) % slides.length]) {
                    slides[(activeIndex - 2 + slides.length) % slides.length].classList.add('far-prev');
                }
            },
        },
    });

    // 이미지 로딩 완료 후 Swiper 업데이트
    const images = document.querySelectorAll('.product-slider-section img');
    let loadedImagesCount = 0;

    images.forEach((image) => {
        image.onload = () => {
            loadedImagesCount++;
            if (loadedImagesCount === images.length) {
                // 모든 이미지 로딩 완료 시 Swiper 업데이트
                productSliderSwiper.update();
            }
        };
    });

    // 관련 상품 Swiper
    new Swiper('.related-products-section .swiper', {
        slidesPerView: 1.5,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.related-products-section .swiper-button-next',
            prevEl: '.related-products-section .swiper-button-prev',
        },
        pagination: {
            el: '.related-products-section .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3 },
        },
    });
}
