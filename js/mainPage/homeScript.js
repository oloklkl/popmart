// 전역 상태 관리 객체
const state = {
  gsapLoaded: false,
  scrollTriggerLoaded: false,
  domReady: false,
  initialized: false,
};

// ScrollTrigger 업데이트 함수 (Swiper 추가 시 갱신)
function updateScrollTrigger() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

// 페이지 로드 시 ScrollTrigger 갱신
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateScrollTrigger, 1000);
});

// GSAP 및 ScrollTrigger 로드
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

    //productListItems.js 로드
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
  const sliderTrack = sliderContainer.querySelector('.slider-track');

  if (!sliderTrack) {
    console.error('❌ .slider-track 요소를 찾을 수 없습니다.');
    return;
  }

  sliderTrack.innerHTML = '';

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
let cursorEffectInitialized = false;
function getRandomNeonColor() {
  const hue = Math.floor(Math.random() * 360);
  const lightness = 60 + Math.random() * 20;
  return `hsl(${hue}, 100%, ${lightness}%)`;
}
// 커서 효과 설정
function setupCursorEffect(targetItem = null) {
  if (!targetItem) {
    if (cursorEffectInitialized) {
      console.warn('setupCursorEffect 이미 실행됨. 중복 실행 방지!');
      return;
    }
    cursorEffectInitialized = true;
  }

  let cursor = document.querySelector('.circle-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.className = 'circle-cursor';
    document.body.appendChild(cursor);
  } else {
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

  // let currentHoveredItem = null;

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

  document.querySelectorAll('.homeGrid-item').forEach((item) => {
    item.removeEventListener('mouseenter', handleItemEnter);
    item.removeEventListener('mouseleave', handleItemLeave);
    item.addEventListener('mouseenter', handleItemEnter);
    item.addEventListener('mouseleave', handleItemLeave);
  });

  if (targetItem) {
    targetItem.addEventListener('mouseenter', handleMouseMove);
    targetItem.addEventListener('mouseleave', handleMouseMove);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  observeGridChanges();
});

// window.onload = () => {
//   const cursor = document.querySelector('.circle-cursor');
//   if (cursor) {
//     gsap.to(cursor, { opacity: 1, duration: 0.5 });
//   }
// };

// 그리드 아이템 설정
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
    count++;
    i++;
  }

  gridContainer.appendChild(wrapperDiv);

  document.querySelectorAll('.homeGrid-item').forEach((item, index) => {});
}
function observeGridChanges() {
  const targetNode = document.querySelector('.homeGrid-container');

  if (!targetNode) {
    return;
  }

  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutations, obs) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.classList && node.classList.contains('homeGrid-item')) {
          console.log('✅ 새로운 .homeGrid-item 감지됨:', node);
          setupCursorEffect(node);
          obs.disconnect();
        }
      });
    });
  });

  observer.observe(targetNode, config);
}
function setupBackgroundCharacters() {
  const container = document.querySelector('.background-characters');
  const horizontalPositions = [-100, -60, -20, 10, 90, 120, 160, 200, 230];
  if (!container) return;

  import('../productPage/productListItems.js').then((module) => {
    const items = module.default.slice(15, 23);
    items.forEach((item, index) => {
      const img = document.createElement('img');
      img.src = item.imgSrc;
      img.alt = item.title;
      img.classList.add('background-character');
      const left = horizontalPositions[index];

      img.style.top = `50%`;
      img.style.left = `${left}%`;
      img.style.transform = `translate(-50%, -50%)`;
      img.style.pointerEvents = 'auto';

      img.style.pointerEvents = 'auto';

      img.addEventListener('mouseenter', () => {
        gsap.to(img, {
          scale: 1.7,
          duration: 0.3,
          ease: 'power2.out',
          opacity: 1,
        });
      });

      img.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          duration: 0.3,
          opacity: 0.5,
        });
      });

      container.appendChild(img);
    });
  });
}

// GSAP 애니메이션 설정
function setupAnimations() {
  // 1. 원형 애니메이션
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

  // 2. 글자 애니메이션
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
  }
}
// 전체 초기화 함수
async function initializePage() {
  console.log('home-GSAP 초기화 시작');

  setupAnimations();

  const { success, items } = await loadDependencies();
  if (!success) {
    return;
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

function setupInteractions() {
  const prevProduct = document.querySelector('.prev-product');
  if (prevProduct) {
    prevProduct.removeEventListener('mouseenter', handlePrevProductMouseEnter);
    prevProduct.removeEventListener('mouseleave', handlePrevProductMouseLeave);

    prevProduct.addEventListener('mouseenter', handlePrevProductMouseEnter);
    prevProduct.addEventListener('mouseleave', handlePrevProductMouseLeave);
  }

  document.removeEventListener('click', handleInfoButtonClick);

  document.addEventListener('click', handleInfoButtonClick);
}

// prev-product 마우스 진입 핸들러
function handlePrevProductMouseEnter() {
  gsap.to(this, { scale: 1.4, duration: 0.3, ease: 'power2.out' });
}

// prev-product 마우스 이탈 핸들러
function handlePrevProductMouseLeave() {
  gsap.to(this, { scale: 1, duration: 0.3, ease: 'power2.out' });
}

function handleInfoButtonClick(e) {
  e.stopPropagation();

  const infoBtn = e.target.closest('.home-info-btn');

  if (infoBtn) {
    const infoId = infoBtn.getAttribute('data-info');
    if (!infoId) {
      return;
    }

    const infoBox = document.getElementById(infoId);

    if (!infoBox) {
      return;
    }

    if (infoBox.classList.contains('show')) {
      closeInfoBox(infoBox);
    } else {
      openInfoBox(infoBox);
    }
  }
}

function openInfoBox(infoBox) {
  console.log(`🟢 [정보 박스 열기] ${infoBox.id} 박스 열기`);

  document.querySelectorAll('.home-info-box').forEach((box) => {
    if (box !== infoBox && box.classList.contains('show')) {
      closeInfoBox(box);
    }
  });

  infoBox.style.display = 'block';

  setTimeout(() => {
    infoBox.classList.add('show');
    gsap.fromTo(infoBox, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
    console.log(`✅ [정보 박스 표시됨] ${infoBox.id}`);
  }, 10);
}

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
    setupBackgroundCharacters();
    const btn = document.getElementById('colorToggleBtn');
    const target = document.querySelector('.section03'); // 예: .background-yellow 같은 영역
    const colors = ['#1a1a1a', '#FFC107', '#03A9F4', '#8BC34A', '#FF4081'];
    let currentIndex = 0;

    if (btn && target) {
      btn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % colors.length;
        target.style.backgroundColor = colors[currentIndex];
      });
    } else {
      console.warn('❌ 버튼 또는 타겟 요소를 찾을 수 없습니다.');
    }
  }, 1000);

  const homeartistInfo = document.querySelector('.home-artist-info');
  const homeartistHeader = document.querySelector('.home-artist-header');
  const artistProfileImg = document.querySelector('.artist-profile-img');

  if (homeartistHeader && homeartistInfo) {
    homeartistHeader.addEventListener('click', () => {
      homeartistInfo.classList.toggle('open');
      artistProfileImg.classList.toggle('show');
    });
  }
});

document.addEventListener('click', (e) => {
  const clickedElement = e.target;
  console.log('👆 클릭된 요소:', clickedElement);
});
