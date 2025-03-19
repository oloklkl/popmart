// productDetailSwiper.js
export function initializeProductSwipers() {
    // 제품 상세 Swiper
    const productSliderSwiper = new Swiper('.product-slider-section .swiper', {
        slidesPerView: 5,
        centeredSlides: true,
        loop: true,
        spaceBetween: -150,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function () {
                const activeIndex = this.activeIndex;
                const slides = this.slides;

                // 모든 슬라이드에서 클래스 제거
                slides.forEach((slide) => {
                    slide.classList.remove('active', 'next', 'prev', 'far-next', 'far-prev');
                });

                // 활성 슬라이드에 active 클래스 추가
                slides[activeIndex].classList.add('active');

                // 주변 슬라이드에 클래스 추가
                const nextIndex = (activeIndex + 1) % slides.length;
                const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
                const farNextIndex = (activeIndex + 2) % slides.length;
                const farPrevIndex = (activeIndex - 2 + slides.length) % slides.length;

                slides[nextIndex].classList.add('next');
                slides[prevIndex].classList.add('prev');
                slides[farNextIndex].classList.add('far-next');
                slides[farPrevIndex].classList.add('far-prev');
            },
            init: function () {
                // 초기 로드 시 활성 슬라이드 및 주변 슬라이드 설정
                this.emit('slideChange');
            },
        },
        // coverflow 효과 제거하고 대신 크기와 투명도를 클래스로 조절
    });

    // 관련 상품 Swiper
    const relatedProductsSwiper = new Swiper('.related-products-section .swiper', {
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
            768: {
                slidesPerView: 2.5,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}
