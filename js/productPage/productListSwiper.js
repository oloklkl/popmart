// productListSwiper.js

function initSwiper() {
    if (typeof window.Swiper === 'undefined') {
        console.error('❌ Swiper가 로드되지 않음! 로드 후 다시 실행');
        return;
    }

    console.log(`✅ Swiper 초기화`);
    if (window.productSwiper) {
        window.productSwiper.destroy();
    }

    window.productSwiper = new Swiper('.grid-container', {
        wrapperClass: 'grid-wrapper-inner',
        slideClass: 'grid-page',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        speed: 600,
        spaceBetween: 30,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
    });
}

export { initSwiper };
