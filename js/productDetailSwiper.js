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
