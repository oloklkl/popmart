// ✅ 전역 상태 관리 객체
const state = {
  gsapLoaded: false,
  scrollTriggerLoaded: false,
  domReady: false,
  initialized: false,
};

// ✅ ScrollTrigger 업데이트 함수 (Swiper 추가 시 갱신)
function updateScrollTrigger() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

// ✅ 페이지 로드 시 ScrollTrigger 갱신
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateScrollTrigger, 1000);
});

// ✅ GSAP 및 ScrollTrigger 로드
async function loadDependencies() {
  try {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP이 로드되지 않았습니다.');
      return false;
    }
    state.gsapLoaded = true;

    if (typeof ScrollTrigger === 'undefined') {
      console.warn('ScrollTrigger 로드되지 않음');
      try {
        await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        state.scrollTriggerLoaded = true;
      } catch (error) {
        console.error('ScrollTrigger 로드 실패:', error);
        return false;
      }
    } else {
      state.scrollTriggerLoaded = true;
    }

    // ✅ productListItems.js 로드
    let items = [];
    try {
      const module = await import('../productPage/productListItems.js');
      items = module.default;
      return { success: true, items };
    } catch (error) {
      console.error('❌ productListItems.js 로드 실패:', error);
      return { success: false, items: [] };
    }
  } catch (error) {
    console.error('의존성 로드 중 오류 발생:', error);
    return { success: false, items: [] };
  }
}

// ✅ Swiper 슬라이드 설정 및 초기화
async function setupSwiper() {
  console.log('🚀 Swiper 초기화 시작!');

  let items = [];
  try {
    const module = await import('../productPage/productListItems.js');
    items = module.default;
  } catch (error) {
    console.error('❌ productListItems.js 로드 실패:', error);
    return;
  }

  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) {
    console.error('❌ .swiper-wrapper 요소를 찾을 수 없습니다.');
    return;
  }

  swiperWrapper.innerHTML = ''; // 기존 슬라이드 초기화
  items.forEach((item) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `<div class="slide-content"><img src="${item.imgSrc}" alt="${item.title}" class="slide-img"></div>`;
    swiperWrapper.appendChild(slide);
  });

  // ✅ Swiper 플러그인 실행
  new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 4,
    spaceBetween: 9,
    breakpoints: {
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
    on: {
      init: () => {
        console.log('✅ Swiper가 초기화됨, GSAP 재설정 실행');
        updateScrollTrigger();
        addHoverEffectToItems(); // ✅ Swiper 로드 후 호버 효과 다시 적용
      },
    },
  });
}

// ✅ 커서 효과 설정
function setupCursorEffect() {
  console.log('🚀 커서 효과 초기화');

  let cursor = document.querySelector('.circle-cursor');

  if (!cursor) {
    cursor = document.createElement('div');
    cursor.classList.add('circle-cursor');
    document.body.appendChild(cursor);
    console.log('.circle-cursor 추가됨');
  } else {
    console.log('.circle-cursor 이미 존재함');
  }
  gsap.set(cursor, {
    width: 200, // 크기를 기존보다 조금 줄임
    height: 200,
    opacity: 1,
    visibility: 'visible',
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: 999999,
    pointerEvents: 'none',
    background: 'rgba(255, 255, 255, 0.9)', // ✅ 투명 흰색으로 변경
    borderRadius: '50%',
    mixBlendMode: 'difference',
    transform: 'translate(-50%, -50%)',
  });
  document.removeEventListener('mousemove', updateCursorPosition);
  document.addEventListener('mousemove', updateCursorPosition);

  gsap.to(cursor, {
    autoAlpha: 1,
    opacity: 1,
    duration: 0.5,
  });
  document.addEventListener('mousemove', updateCursorPosition);
  document.addEventListener('mousemove', updateCursorPosition);
}
// 마우스 이동 이벤트 핸들러 - 전역 문서에서 작동하도록 수정
function updateCursorPosition(e) {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      opacity: 1, // ✅ 마우스 움직일 때 다시 보이게 설정
      duration: 0.1,
      ease: 'power2.out',
      // opacity: 1,
    });
  }
}
document.addEventListener('mouseleave', () => {
  gsap.to('.circle-cursor', { opacity: 0, duration: 0.3 });
});
// 🔹 페이지 로드 시 커서가 보이도록 설정
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOMContentLoaded: 커서 효과 설정 시작');
  setupCursorEffect(); // ✅ 페이지 로드 시 커서 생성
});

// 추가: 새로고침 후에도 커서 보이도록 설정
window.onload = () => {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    gsap.to(cursor, { opacity: 1, duration: 0.5 }); // ✅ 새로고침 후에도 커서 유지
  }
};
// 그리드 아이템 호버 효과 추가
function addHoverEffectToItems() {
  document.querySelectorAll('.homeGrid-item, .swiper-slide').forEach((item) => {
    item.addEventListener('mouseenter', function () {
      const cursor = document.querySelector('.circle-cursor');
      if (cursor) {
        cursor.style.mixBlendMode = 'difference'; // 🔥 `difference` 유지
        const color = this.getAttribute('data-color') || 'rgba(255, 255, 255, 0.9)';
        gsap.to(cursor, {
          background: color,
          scale: 1.8, // ✅ 호버 시 크기 변경
          duration: 0.3,
        });
      }
    });

    item.addEventListener('mouseleave', function () {
      const cursor = document.querySelector('.circle-cursor');
      if (cursor) {
        gsap.to(cursor, {
          background: 'rgba(255, 255, 255, 0.9)',
          scale: 1,
          duration: 0.3,
        });
      }
    });
  });
}

// 그리드 아이템 마우스 진입 핸들러
function handleItemMouseEnter(e) {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    const color = this.getAttribute('data-color');
    gsap.to(cursor, {
      background: color,
      duration: 0.3,
      opacity: 1,
    });
  }
}

// 그리드 아이템 마우스 이탈 핸들러
function handleItemMouseLeave(e) {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    // 🔹 mix-blend-mode를 초기화 (테스트 후 제거 가능)
    cursor.style.mixBlendMode = 'difference';

    // 🔹 GSAP의 `set()`을 먼저 실행하여 background를 강제 적용
    gsap.set(cursor, { background: 'black' });

    // 🔹 `to()`를 통해 opacity를 조절하면서 애니메이션 적용
    gsap.to(cursor, {
      duration: 0.3,
      opacity: 1,
      onComplete: () => {
        cursor.style.mixBlendMode = 'difference';
      },
    });
    setTimeout(() => {
      cursor.style.mixBlendMode = 'difference';
    }, 50);
  }
}
function addHoverEffectToItems() {
  console.log('🚀 호버 효과 초기화');

  document.querySelectorAll('.homeGrid-item, .swiper-slide').forEach((item) => {
    item.addEventListener('mouseenter', function () {
      const cursor = document.querySelector('.circle-cursor');
      if (cursor) {
        cursor.style.mixBlendMode = 'normal'; // Swiper 내부에서도 커서가 보이도록 변경
        const color = this.getAttribute('data-color') || 'rgba(0, 0, 0, 0.8)';
        gsap.to(cursor, {
          background: color,
          scale: 1.7, // 호버 시 커서 크기 증가
          duration: 0.3,
        });
      }
    });

    item.addEventListener('mouseleave', function () {
      const cursor = document.querySelector('.circle-cursor');
      if (cursor) {
        gsap.to(cursor, {
          background: 'rgba(0, 0, 0, 0.8)',
          scale: 1, // 원래 크기로 변경
          duration: 0.3,
        });
      }
    });
  });
}
// ✅ 커서 위치 업데이트
function updateCursorPosition(e) {
  const cursor = document.querySelector('.circle-cursor');

  if (cursor) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      opacity: 1, // 마우스 움직일 때 다시 보이게
      duration: 0.1,
      ease: 'power2.out',
    });
  }
}

// 마우스가 페이지를 벗어날 때 커서 숨김 처리
document.addEventListener('mouseleave', () => {
  gsap.to('.circle-cursor', { opacity: 0, duration: 0.3 });
});

// ✅ 그리드 아이템 설정
function setupGridItems(items) {
  if (!items || items.length === 0) {
    console.warn('그리드 아이템을 설정할 수 없습니다: 아이템이 없습니다.');
    return;
  }

  const gridContainer = document.querySelector('.homeGrid-container');
  const wrapperDiv = document.querySelector('.homeGrid-wrapper-inner');

  if (!gridContainer || !wrapperDiv) {
    console.warn('그리드 컨테이너 또는 래퍼를 찾을 수 없습니다.');
    return;
  }

  gridContainer.innerHTML = '';
  wrapperDiv.className = 'homeGrid-wrapper-inner';
  wrapperDiv.innerHTML = '';

  // ✅ 아이템 추가 개수 제한
  const itemsPerPage = 12;
  let count = 0;
  let i = 0;

  while (count < itemsPerPage && i < items.length) {
    if (items[i].id === 31 || items[i].id === 32) {
      i++;
      continue; // 특정 ID(31, 32) 제외하고 계속 진행
    }

    const gridItem = document.createElement('div');
    gridItem.classList.add('homeGrid-item');
    gridItem.setAttribute('data-color', `hsl(${Math.random() * 360}, 100%, 50%)`);

    gridItem.innerHTML = `
      <img src="${items[i].imgSrc}" alt="${items[i].title}" onerror="this.src='https://dummyimage.com/150x150/ccc/ffffff.png&text=No+Image'">
      <div>
        <h3>${items[i].title}</h3>
        <p>${items[i].price}</p>
      </div>
    `;

    wrapperDiv.appendChild(gridItem);
    count++; // 아이템 추가한 개수 증가
    i++; // 다음 아이템으로 이동
  }

  gridContainer.appendChild(wrapperDiv);
  addHoverEffectToItems(); // ✅ 아이템 추가 후 호버 효과 적용
}

// ✅ GSAP 애니메이션 설정
function setupAnimations() {
  console.log('🚀 GSAP 애니메이션 설정 시작');

  // 1. 원형 컨테이너 애니메이션
  if (document.querySelector('.circle-container')) {
    gsap.set('.circle-container', {
      position: 'fixed',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      zIndex: 1,
    });

    gsap.to('.circle-container', {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.section01',
        start: 'top 0%',
        end: 'top 10%',
        scrub: 2,
      },
    });

    gsap.to('.circle-container', {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.section02',
        start: 'top top',
        end: 'top 30%',
        scrub: 2,
      },
    });
  }

  // 2. 글자 이미지 애니메이션
  const letterImgs = gsap.utils.toArray('.letter-img');
  if (letterImgs.length > 0) {
    letterImgs.forEach((img) => {
      let speed = parseFloat(img.dataset.speed) || 1;
      let fixedPoint = img.dataset.fixed ? parseFloat(img.dataset.fixed) : null;
      console.log(`🎯 Letter image: ${img.src}`);

      gsap.fromTo(
        img,
        { y: 0 },
        {
          y: -window.innerHeight * speed,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.section01',
            start: 'top center',
            end: fixedPoint !== null ? `+=${fixedPoint}` : '+=1200',
            scrub: 2,
            markers: false,
          },
        }
      );
    });
  }

  // 3. 비디오 페이드아웃
  if (document.querySelector('.domVideo')) {
    gsap.to('.domVideo', {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.section01',
        start: 'top 40%',
        end: 'top 80%',
        scrub: 1,
      },
    });
  }

  // 4. prev-wrap 페이드인
  const prevWrap = document.querySelector('.prev-wrap');
  if (prevWrap) {
    gsap.to('.prev-wrap', {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.section03',
        start: 'top top',
        end: 'top 10%',
        scrub: 1,
      },
    });
  } else {
    console.warn('prev-wrap not found. HTML 구조를 확인하세요.');
  }
}
// ✅ 전체 초기화 함수
async function initializePage() {
  console.log('home-GSAP 초기화 시작');

  if (state.initialized) {
    console.log('이미 초기화 완료됨');
    return;
  }

  // ✅ 1. 커서 효과 먼저 설정
  setupCursorEffect();

  // ✅ 2. GSAP 애니메이션 설정
  setupAnimations();

  // ✅ 3. 의존성 로드 후 그리드 아이템 적용
  const { success, items } = await loadDependencies();
  if (!success) {
    console.error('❌ 필수 의존성 로드 실패');
  }

  if (state.gsapLoaded && state.scrollTriggerLoaded) {
    gsap.registerPlugin(ScrollTrigger);
    if (items.length > 0) {
      setupGridItems(items);
      addHoverEffectToItems(); // ✅ 아이템 추가 후 호버 효과 적용
    }
  }

  setupSwiper();
  // ✅ Swiper 실행 후 ScrollTrigger 갱신
  setTimeout(updateScrollTrigger, 1500);

  state.initialized = true;
  console.log('홈페이지 초기화 완료');
}

// ✅ 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOMContentLoaded: Swiper, GSAP, 커서 효과 설정 시작');
  setupCursorEffect();
  initializePage();
});

window.onload = () => {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) gsap.to(cursor, { opacity: 1, duration: 0.5 });
};
