function initSwiper() {
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
