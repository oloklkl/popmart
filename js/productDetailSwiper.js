let productSliderSwiper;
let relatedProductsSwiper;

export function initializeProductSwipers() {
    const productSlider = document.querySelector('.product-slider');
    const relatedProducts = document.querySelector('.related-products');

    if (productSlider) {
        productSliderSwiper = new Swiper(productSlider, {
            slidesPerView: 5, // 한 번에 5개의 슬라이드가 보이게 설정
            centeredSlides: true,
            loop: true,
            spaceBetween: -150, // 마이너스 값으로 설정하여 슬라이드가 겹치게 함
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
    }

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

function updateSwiper() {
    if (productSliderSwiper) {
        productSliderSwiper.update();
    }
    if (relatedProductsSwiper) {
        relatedProductsSwiper.update();
    }
}
