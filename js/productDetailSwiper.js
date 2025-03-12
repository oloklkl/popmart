document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.product-slider-section .swiper', {
        // 제품 상세 Swiper
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: '.product-slider-section .swiper-button-next',
            prevEl: '.product-slider-section .swiper-button-prev',
        },
    });

    new Swiper('.related-products-section .swiper', {
        // 관련 제품 Swiper
        slidesPerView: 1.2,
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
});

document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.related-products', {
        slidesPerView: 1.2, // 한 번에 보이는 슬라이드 개수
        spaceBetween: 20, // 슬라이드 간격
        loop: true, // 무한 루프
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2.5, // 태블릿 이상일 때 2.5개씩 보이도록 설정
            },
            1024: {
                slidesPerView: 3, // 데스크톱에서는 3개씩 보이도록 설정
            },
        },
    });
});
