document.addEventListener('DOMContentLoaded', async function () {
  console.log('🚀 Swiper 스크립트 로드됨!');

  // ✅ productListItems.js에서 데이터 가져오기
  let items = [];
  try {
    const module = await import('../productPage/productListItems.js');
    items = module.default;
    if (!items || items.length === 0) {
      console.warn('⚠️ 상품 데이터를 불러오지 못했습니다.');
      return;
    }
  } catch (error) {
    console.error('❌ productListItems.js 로드 실패:', error);
    return;
  }

  // ✅ Swiper 슬라이더 컨테이너 찾기
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) {
    console.error('❌ .swiper-wrapper 요소를 찾을 수 없습니다.');
    return;
  }

  // ✅ 슬라이드 HTML 동적 생성
  swiperWrapper.innerHTML = ''; // 기존 슬라이드 초기화
  items.forEach((item) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    slide.innerHTML = `
      <div class="slide-content">
        <img src="${item.imgSrc}" alt="${item.title}" class="slide-img">
        
      </div>
    `;

    swiperWrapper.appendChild(slide);
  });

  // ✅ Swiper 초기화
  new Swiper('.swiper-container', {
    loop: true, // 무한 반복
    autoplay: {
      delay: 3000, // 3초마다 자동 슬라이드
      disableOnInteraction: false, // 유저가 터치해도 자동 재생 유지
    },

    slidesPerView: 9, // 한 번에 보이는 슬라이드 개수
    spaceBetween: 9, // 슬라이드 간격
    breakpoints: {
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });
  initializePage();
});
