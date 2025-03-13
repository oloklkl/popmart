// productDetailScript.js
let productSliderSwiper;
let relatedProductsSwiper;

function initializeProductSwipers() {
    const productSlider = document.querySelector('.product-slider');
    const relatedProducts = document.querySelector('.related-products');

    if (productSlider) {
        productSliderSwiper = new Swiper(productSlider, {
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
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
                    document.querySelectorAll('.swiper-slide').forEach((slide) => slide.classList.remove('active'));
                    this.slides[this.activeIndex].classList.add('active');
                },
                init: function () {
                    this.slides[this.activeIndex].classList.add('active');
                },
            },
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
}

export function destroyPage() {
    destroyProductSwipers();
}
