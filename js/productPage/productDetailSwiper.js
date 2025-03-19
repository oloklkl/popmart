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
                this.emit('slideChange'); // 초기 슬라이드 상태 설정
                setTimeout(() => this.update(), 10); // 약간의 지연 시간 후 업데이트
            },
            slideChange() {
                const { activeIndex, slides } = this;

                slides.forEach((slide, index) => {
                    slide.classList.remove('active', 'next', 'prev', 'far-next', 'far-prev');
                    slide.style.visibility = 'visible';
                    slide.style.pointerEvents = 'auto';

                    const distance = Math.abs(index - activeIndex);
                    if (distance > 2) {
                        slide.style.visibility = 'hidden'; // 화면에서 숨김
                        slide.style.pointerEvents = 'none'; // 클릭 불가
                    }
                });

                slides[activeIndex].classList.add('active');
                slides[(activeIndex + 1) % slides.length].classList.add('next');
                slides[(activeIndex - 1 + slides.length) % slides.length].classList.add('prev');
                slides[(activeIndex + 2) % slides.length].classList.add('far-next');
                slides[(activeIndex - 2 + slides.length) % slides.length].classList.add('far-prev');
            },
        },
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
