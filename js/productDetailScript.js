// productDetailScript.js
let productSliderSwiper;
let relatedProductsSwiper;

function initializeProductSwipers() {
    const productSlider = document.querySelector('.product-slider');
    const relatedProducts = document.querySelector('.related-products'); // relatedProducts 변수 추가

    // 주 상품 슬라이더 초기화
    if (productSlider) {
        productSliderSwiper = new Swiper(productSlider, {
            loop: true,
            centeredSlides: true,
            spaceBetween: 10,
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
                    if (slides[activeIndex + 1]) {
                        slides[activeIndex + 1].classList.add('next');
                    }
                    if (slides[activeIndex - 1]) {
                        slides[activeIndex - 1].classList.add('prev');
                    }
                    if (slides[activeIndex + 2]) {
                        slides[activeIndex + 2].classList.add('far-next');
                    }
                    if (slides[activeIndex - 2]) {
                        slides[activeIndex - 2].classList.add('far-prev');
                    }
                },
                init: function () {
                    const activeIndex = this.activeIndex;
                    const slides = this.slides;

                    // 초기 로드 시 활성 슬라이드 설정
                    slides.forEach((slide) => {
                        slide.classList.remove('active', 'next', 'prev', 'far-next', 'far-prev');
                    });

                    slides[activeIndex].classList.add('active');

                    if (slides[activeIndex + 1]) {
                        slides[activeIndex + 1].classList.add('next');
                    }
                    if (slides[activeIndex - 1]) {
                        slides[activeIndex - 1].classList.add('prev');
                    }
                    if (slides[activeIndex + 2]) {
                        slides[activeIndex + 2].classList.add('far-next');
                    }
                    if (slides[activeIndex - 2]) {
                        slides[activeIndex - 2].classList.add('far-prev');
                    }
                },
            },
        });
    }

    // relatedProductsSwiper 초기화 코드 추가
    if (relatedProducts) {
        relatedProductsSwiper = new Swiper(relatedProducts, {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}

function destroyProductSwipers() {
    if (productSliderSwiper) {
        productSliderSwiper.destroy(true, true);
        productSliderSwiper = null;
    }
    if (relatedProductsSwiper) {
        relatedProductsSwiper.destroy(true, true);
        relatedProductsSwiper = null;
    }
}

export function initializePage() {
    console.log('productDetailScript.js 실행됨');
    initializeProductSwipers();
}
