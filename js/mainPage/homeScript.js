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
async function setupInfiniteSlider() {
  const sliderContainer = document.querySelector('.slider-container');
  const sliderTrack = sliderContainer.querySelector('.slider-track'); // ✅ 기존 DOM 사용

  if (!sliderTrack) {
    console.error('❌ .slider-track 요소를 찾을 수 없습니다.');
    return;
  }

  sliderTrack.innerHTML = ''; // 기존 내용 초기화

  let items = [];
  try {
    const module = await import('../productPage/productListItems.js');
    items = module.default;
  } catch (e) {
    console.error('❌ 상품 목록 로드 실패:', e);
    return;
  }

  // 슬라이드 생성
  [...items, ...items].forEach((item) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = `<img src="${item.imgSrc}" alt="${item.title}" />`;
    sliderTrack.appendChild(slide);
  });

  const totalWidth = sliderTrack.scrollWidth / 2;
  const slideAnimation = gsap.to(sliderTrack, {
    x: `-=${totalWidth}px`,
    duration: 20,
    ease: 'linear',
    repeat: -1,
  });

  sliderTrack.addEventListener('mouseenter', () => slideAnimation.pause());
  sliderTrack.addEventListener('mouseleave', () => slideAnimation.resume());
}
// ✅ 페이지 로드 시 실행
// document.addEventListener('DOMContentLoaded', () => {
//   setupInfiniteSlider();
// });

// ✅ 커서 효과 설정
function setupCursorEffect() {
  let cursor = document.querySelector('.circle-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.className = 'circle-cursor';
    document.body.appendChild(cursor);
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
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out',
    });
  });

  const track = document.querySelector('.slider-track');
  if (track) {
    track.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        scale: 1.5,
        background: 'rgba(0,255,255,0.9)',
        duration: 0.3,
      });
    });
    track.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        scale: 1,
        background: 'rgba(255,255,255,0.9)',
        duration: 0.3,
      });
    });
  }
}
// 추가: 새로고침 후에도 커서 보이도록 설정
window.onload = () => {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    gsap.to(cursor, { opacity: 1, duration: 0.5 }); // ✅ 새로고침 후에도 커서 유지
  }
};

// ✅ 마우스 진입 이벤트 핸들러
function handleItemMouseEnter() {
  console.log('✅ 마우스 오버 이벤트 실행됨:', this);
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    cursor.style.mixBlendMode = 'difference';
    const color = this.getAttribute('data-color');
    console.log(`🎨 호버한 아이템의 색상: ${color}`);

    gsap.to(cursor, {
      background: color,
      scale: 1.8,
      duration: 0.3,
    });
  }
}

// ✅ 마우스 이탈 이벤트 핸들러
function handleItemMouseLeave() {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    gsap.to(cursor, {
      background: 'rgba(255, 255, 255, 0.9)',
      scale: 1,
      duration: 0.3,
    });
  }
}

function addHoverEffectToItems() {
  console.log('🚀 호버 효과 초기화');

  document.querySelectorAll('.homeGrid-item, .swiper-slide').forEach((item) => {
    item.addEventListener('mouseenter', function () {
      const cursor = document.querySelector('.circle-cursor');
      const img = this.querySelector('img');

      if (cursor) {
        cursor.style.mixBlendMode = 'difference';
        const color = this.getAttribute('data-color');
        gsap.to(cursor, {
          background: color,
          scale: 1.7,
          duration: 0.3,
        });
      }

      // ✅ 이미지 확대 효과 추가
      if (img) {
        gsap.to(img, {
          scale: 1.15,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    });

    item.addEventListener('mouseleave', function () {
      const cursor = document.querySelector('.circle-cursor');
      const img = this.querySelector('img');

      if (cursor) {
        gsap.to(cursor, {
          background: 'rgba(0, 0, 0, 0.8)',
          scale: 1,
          duration: 0.3,
        });
      }

      // ✅ 이미지 원래 크기로 복귀
      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
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
// document.addEventListener('mouseleave', () => {
//   gsap.to('.circle-cursor', { opacity: 0, duration: 0.3 });
// });

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
  const itemsPerPage = 12;
  let count = 0;
  let i = 0;

  while (count < itemsPerPage && i < items.length) {
    if (items[i].id === 31 || items[i].id === 32) {
      i++;
      continue;
    }

    const gridItem = document.createElement('div');
    gridItem.classList.add('homeGrid-item');

    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    gridItem.setAttribute('data-color', randomColor);
    console.log(`✅ 아이템 ${i}의 랜덤 컬러:`, randomColor);

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

  // ✅ DOM 업데이트 이후에 이벤트 리스너 추가
  setTimeout(() => {
    console.log('🚀 [setupGridItems] - addHoverEffectToItems 실행');
    addHoverEffectToItems();
  }, 100); // ✅ DOM 업데이트 후 100ms 지연 실행 (확실하게 DOM에 추가되도록)
}
function observeGridChanges() {
  const targetNode = document.querySelector('.homeGrid-container');

  if (!targetNode) {
    console.warn('⚠️ [observeGridChanges] - homeGrid-container가 존재하지 않습니다.');
    return;
  }

  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.classList && node.classList.contains('homeGrid-item')) {
          console.log('🔍 새로 추가된 homeGrid-item 감지:', node);
          addHoverEffectToItems();
        }
      });
    });
  });

  observer.observe(targetNode, config);
  console.log('🔍 [MutationObserver] - homeGrid-item 변경 감지 중...');
}

// ✅ 초기화 함수에서 MutationObserver 실행
document.addEventListener('DOMContentLoaded', () => {
  observeGridChanges();
});

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
    }
  }
  await setupInfiniteSlider();

  setTimeout(updateScrollTrigger, 1500);

  state.initialized = true;
  console.log('홈페이지 초기화 완료');
}

// ✅ 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOMContentLoaded: Swiper, GSAP, 커서 효과 설정 시작');
  // setupCursorEffect();
  initializePage();
});

window.onload = () => {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) gsap.to(cursor, { opacity: 1, duration: 0.5 });
};
