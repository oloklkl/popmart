// productDetailScript.js
let productSliderSwiper;
let relatedProductsSwiper;

function initializeProductSwipers() {
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

    // 수량 버튼 이벤트 핸들러 추가
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const quantitySpan = document.querySelector('.quantity-control span');

    if (minusBtn && plusBtn && quantitySpan) {
        minusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = quantity + 1;
        });
    }
}

export function destroyPage() {
    destroyProductSwipers();
}
