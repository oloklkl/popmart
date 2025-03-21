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
    state.gsapLoaded = true;

    if (typeof ScrollTrigger === 'undefined') {
      try {
        await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        state.scrollTriggerLoaded = true;
      } catch (error) {
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
      return { success: false, items: [] };
    }
  } catch (error) {
    console.error('의존성 로드 중 오류 :', error);
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
let cursorEffectInitialized = false; // 실행 여부를 추적하는 변수 추가
function getRandomNeonColor() {
  const hue = Math.floor(Math.random() * 360);
  const lightness = 60 + Math.random() * 20; // 60% ~ 80%
  return `hsl(${hue}, 100%, ${lightness}%)`;
}
// ✅ 커서 효과 설정
function setupCursorEffect(targetItem = null) {
  if (!targetItem) {
    if (cursorEffectInitialized) {
      console.warn('⚠️ setupCursorEffect 이미 실행됨. 중복 실행 방지!');
      return;
    }
    cursorEffectInitialized = true; // 실행 상태 변경 (최초 1회만 설정)
  }

  console.log('⚡ setupCursorEffect 실행됨! 커서 효과 적용 시작');

  let cursor = document.querySelector('.circle-cursor');
  if (!cursor) {
    console.log('⚠️ .circle-cursor 요소가 없음. 새로 생성!');
    cursor = document.createElement('div');
    cursor.className = 'circle-cursor';
    document.body.appendChild(cursor);
  } else {
    console.log('✅ .circle-cursor 요소 확인됨!');
  }

  gsap.set(cursor, {
    pointerEvents: 'none',
    width: 200,
    height: 200,
    opacity: 1,
    visibility: 'visible',
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: 999999,
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    mixBlendMode: 'difference',
    transform: 'translate(-50%, -50%)',
  });

  let currentHoveredItem = null;

  function handleMouseMove(e) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out',
    });
  }

  function handleItemEnter(e) {
    const neonColor = getRandomNeonColor();
    const item = e.currentTarget;
    const img = item.querySelector('img');

    gsap.to(cursor, {
      background: neonColor,
      // scale: 1.7,
      duration: 0.3,
    });

    if (img) {
      gsap.to(img, {
        scale: 1.2,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    currentHoveredItem = item;
  }

  function handleItemLeave(e) {
    const item = e.currentTarget;
    const img = item.querySelector('img');

    gsap.to(cursor, {
      background: 'rgba(255,255,255,0.9)',
      scale: 1,
      duration: 0.3,
    });

    if (img) {
      gsap.to(img, {
        scale: 1,
        duration: 0.3,
      });
    }

    currentHoveredItem = null;
  }

  document.removeEventListener('mousemove', handleMouseMove);
  document.addEventListener('mousemove', handleMouseMove);

  // 각 아이템에만 마우스 진입/이탈 이벤트 연결
  document.querySelectorAll('.homeGrid-item').forEach((item) => {
    item.removeEventListener('mouseenter', handleItemEnter);
    item.removeEventListener('mouseleave', handleItemLeave);
    item.addEventListener('mouseenter', handleItemEnter);
    item.addEventListener('mouseleave', handleItemLeave);
  });
  // 새 `.homeGrid-item` 요소에 이벤트 리스너 추가
  if (targetItem) {
    targetItem.addEventListener('mouseenter', handleMouseMove);
    targetItem.addEventListener('mouseleave', handleMouseMove);
  }
}

// ✅ 초기화 함수에서 MutationObserver 실행
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOMContentLoaded: Swiper, GSAP, 커서 효과 설정 시작');
  // setupCursorEffect(); // 초기 실행 (최초 1회)
  observeGridChanges();
});

// 추가: 새로고침 후에도 커서 보이도록 설정
window.onload = () => {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    gsap.to(cursor, { opacity: 1, duration: 0.5 });
  }
};

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

    const hue = Math.floor(Math.random() * 360);
    const color = `hsl(${hue}, 100%, 50%)`;
    const invertedColor = `hsl(${hue}, 100%, 90%)`;

    // ✅ 데이터 속성으로만 저장 (스타일 적용 X)
    gridItem.setAttribute('data-color', color);
    gridItem.setAttribute('data-inverted-color', invertedColor);
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
  console.log('✅ setupGridItems 실행 완료! 현재 .homeGrid-item 목록:');
  document.querySelectorAll('.homeGrid-item').forEach((item, index) => {
    console.log(`🔹 ${index + 1}번째 .homeGrid-item:`, item);
  });
}
function observeGridChanges() {
  const targetNode = document.querySelector('.homeGrid-container');

  if (!targetNode) {
    console.warn('⚠️ [observeGridChanges] - homeGrid-container가 존재하지 않습니다.');
    return;
  }

  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutations, obs) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.classList && node.classList.contains('homeGrid-item')) {
          console.log('✅ 새로운 .homeGrid-item 감지됨:', node);
          setupCursorEffect(node); // ✅ DOM 업데이트 후 커서 효과 설정
          obs.disconnect(); // ✅ 중복 실행 방지
        }
      });
    });
  });

  observer.observe(targetNode, config);
  console.log('🔍 [MutationObserver] - homeGrid-item 변경 감지 중...');
}

// ✅ 초기화 함수에서 MutationObserver 실행
// document.addEventListener('DOMContentLoaded', () => {
//   observeGridChanges();
// });

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

  setupAnimations(); // ✅ GSAP 애니메이션 설정

  const { success, items } = await loadDependencies();
  if (!success) {
    console.error('❌ 필수 의존성 로드 실패');
    return;
  }

  if (state.gsapLoaded && state.scrollTriggerLoaded) {
    gsap.registerPlugin(ScrollTrigger);

    if (items.length > 0) {
      setupGridItems(items);
      // observeGridChanges(); // ✅ 여기서 observer 실행
    }
  }

  await setupInfiniteSlider();
  setTimeout(updateScrollTrigger, 1500);

  state.initialized = true;
  console.log('홈페이지 초기화 완료');
}
// 상호작용 설정
function setupInteractions() {
  // 이미지 확대 효과를 위한 이벤트 리스너
  const prevProduct = document.querySelector('.prev-product');
  if (prevProduct) {
    // 기존 이벤트 제거
    prevProduct.removeEventListener('mouseenter', handlePrevProductMouseEnter);
    prevProduct.removeEventListener('mouseleave', handlePrevProductMouseLeave);

    // 새 이벤트 등록
    prevProduct.addEventListener('mouseenter', handlePrevProductMouseEnter);
    prevProduct.addEventListener('mouseleave', handlePrevProductMouseLeave);

    console.log('✅ prev-product 이벤트 추가됨');
  } else {
    console.warn('⚠️ prev-product 요소를 찾을 수 없음.');
  }

  // 정보 버튼 클릭 이벤트 - 이벤트 위임 사용 (문서 전체에 이벤트 리스너 추가)
  // 이전 리스너 제거
  document.removeEventListener('click', handleInfoButtonClick);
  // 새 리스너 추가 (document.body 대신 document에 직접 추가)
  document.addEventListener('click', handleInfoButtonClick);

  console.log('🔄 정보 버튼 클릭 이벤트 리스너 설정됨');
}

// prev-product 마우스 진입 핸들러
function handlePrevProductMouseEnter() {
  console.log('🖼️ [이미지 호버] prev-product 확대');
  gsap.to(this, { scale: 1.4, duration: 0.3, ease: 'power2.out' });
}

// prev-product 마우스 이탈 핸들러
function handlePrevProductMouseLeave() {
  console.log('🔄 [이미지 호버 종료] prev-product 원래 크기로 복귀');
  gsap.to(this, { scale: 1, duration: 0.3, ease: 'power2.out' });
}

// 정보 버튼 클릭 핸들러 - 디버그 로그 추가
function handleInfoButtonClick(e) {
  e.stopPropagation(); // 🚀 클릭 이벤트가 상위 요소로 전달되지 않도록 방지
  console.log('👆 클릭 감지됨', e.target);

  // 클릭된 요소나 그 부모가 info-btn 클래스를 가지고 있는지 확인
  const infoBtn = e.target.closest('.info-btn');

  if (infoBtn) {
    console.log('🟢 [클릭 감지됨] 버튼 클릭 이벤트 발생', infoBtn);

    const infoId = infoBtn.getAttribute('data-info');
    if (!infoId) {
      console.error('❌ [오류] 버튼에 data-info 속성이 없습니다.');
      return;
    }

    const infoBox = document.getElementById(infoId);
    console.log(`🔘 [버튼 클릭] 버튼 데이터 정보: ${infoId}, 찾은 info-box ID: ${infoBox ? infoBox.id : '❌ 없음'}`);

    if (!infoBox) {
      console.error(`❌ [오류] ID가 ${infoId}인 info-box를 찾을 수 없습니다.`);
      return;
    }

    if (infoBox.classList.contains('show')) {
      closeInfoBox(infoBox);
    } else {
      openInfoBox(infoBox);
    }
  }
}

// 정보 박스 열기
function openInfoBox(infoBox) {
  console.log(`🟢 [정보 박스 열기] ${infoBox.id} 박스 열기`);

  // 다른 모든 박스 닫기
  document.querySelectorAll('.info-box').forEach((box) => {
    if (box !== infoBox && box.classList.contains('show')) {
      closeInfoBox(box);
    }
  });

  // 표시 전에 display 속성 설정
  infoBox.style.display = 'block';

  // 약간의 지연 후 애니메이션 적용 (브라우저 렌더링 동기화 문제 방지)
  setTimeout(() => {
    infoBox.classList.add('show');
    gsap.fromTo(infoBox, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
    console.log(`✅ [정보 박스 표시됨] ${infoBox.id}`);
  }, 10);
}

// 정보 박스 닫기
function closeInfoBox(infoBox) {
  console.log(`❌ [정보 박스 닫기] ${infoBox.id} 박스 닫기`);
  gsap.to(infoBox, {
    opacity: 0,
    scale: 0.8,
    duration: 0.3,
    ease: 'power2.inOut',
    onComplete: () => {
      infoBox.classList.remove('show');
      infoBox.style.display = 'none';
    },
  });
}
// ✅ 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOMContentLoaded: Swiper, GSAP, 커서 효과 설정 시작');

  observeGridChanges();

  setTimeout(() => {
    console.log('⏳ 1초 후 초기화 시작');
    initializePage();
    setupInteractions(); // ✅ 여기서 실행
  }, 1000);
});

document.addEventListener('click', (e) => {
  const clickedElement = e.target;
  console.log('👆 클릭된 요소:', clickedElement);
});
