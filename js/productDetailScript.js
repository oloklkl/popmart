// productDetailScript.js
let productSliderSwiper;
let relatedProductsSwiper;

function initializeProductSwipers() {
    const productSlider = document.querySelector('.product-slider');

    if (productSlider) {
        productSliderSwiper = new Swiper(productSlider, {
            loop: true,
            centeredSlides: true, // 현재 슬라이드를 가운데로 배치
            slidesPerView: 'auto', // 슬라이드 크기에 맞춰 자동 조정
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
                    // 모든 슬라이드에서 active 클래스 제거
                    document.querySelectorAll('.swiper-slide').forEach((slide) => slide.classList.remove('active'));

                    // 현재 활성 슬라이드에 active 클래스 추가
                    this.slides[this.activeIndex].classList.add('active');
                },
                // 초기 로드 시 활성 슬라이드 설정
                init: function () {
                    this.slides[this.activeIndex].classList.add('active');
                },
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
