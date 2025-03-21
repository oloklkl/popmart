// 전역 상태 관리
const state = {
  gsapLoaded: false,
  scrollTriggerLoaded: false,
  domReady: false,
  initialized: false,
};

// productListItems 동적 로드
async function loadDependencies() {
  try {
    // GSAP 및 ScrollTrigger 로드 확인
    if (typeof gsap === 'undefined') {
      console.warn('GSAP이 로드되지 않았습니다. GSAP 라이브러리를 먼저 로드해주세요.');
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

    // productListItems.js 로드
    let items;
    try {
      const module = await import('../productPage/productListItems.js');
      items = module.default;
      if (!items || items.length === 0) {
        console.warn('productListItems.js에서 아이템을 불러오지 못했거나 아이템이 없습니다.');
      }
      return { success: true, items };
    } catch (error) {
      console.error('productListItems.js 로드 실패:', error);
      return { success: false, items: [] };
    }
  } catch (error) {
    console.error('의존성 로드 중 오류 발생:', error);
    return { success: false, items: [] };
  }
}

// 메인 초기화 함수
async function initializePage() {
  console.log('home-GSAP 초기화 시작');

  if (state.initialized) {
    console.log('이미 초기화 완료됨');
    return;
  }

  // 커서 즉시 초기화 (다른 의존성과 상관없이 먼저 설정)
  setupCursorEffect();

  // 의존성 로드
  const { success, items } = await loadDependencies();
  if (!success) {
    console.error('필수 의존성 로드 실패, 일부 기능이 작동하지 않을 수 있습니다.');
    // 의존성이 실패해도 계속 진행
  }

  // GSAP 초기화
  if (state.gsapLoaded && state.scrollTriggerLoaded) {
    gsap.registerPlugin(ScrollTrigger);
    console.log('ScrollTrigger 정상 로드');

    // GSAP 애니메이션 설정
    setupAnimations();

    // 그리드 아이템 설정 (items가 있을 경우에만)
    if (items && items.length > 0) {
      setupGridItems(items);
    }
  }

  // 상호작용 설정 (GSAP 의존성과 관계없이 설정)
  setupInteractions();

  state.initialized = true;
  console.log('홈페이지 초기화 완료');
}

// GSAP 애니메이션 설정
function setupAnimations() {
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

  // 그리드 초기화
  gridContainer.innerHTML = '';
  wrapperDiv.className = 'homeGrid-wrapper-inner';
  wrapperDiv.innerHTML = '';

  const itemsPerPage = 12;
  let count = 0;
  let i = 0;

  // 아이템 추가
  while (count < itemsPerPage && i < items.length) {
    if (items[i].id === 31 || items[i].id === 32) {
      i++;
      continue;
    }

    const gridItem = document.createElement('div');
    gridItem.className = 'homeGrid-item';

    // 랜덤 컬러 생성 및 저장
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    gridItem.setAttribute('data-color', randomColor);

    const imgElement = document.createElement('img');
    imgElement.src = items[i].imgSrc;
    imgElement.alt = items[i].title;
    imgElement.onerror = function () {
      this.onerror = null;
      this.src = 'https://dummyimage.com/150x150/ccc/ffffff.png&text=No+Image';
    };

    const titleElement = document.createElement('h3');
    titleElement.textContent = items[i].title;

    const priceElement = document.createElement('p');
    priceElement.textContent = items[i].price;

    const detailsDiv = document.createElement('div');
    detailsDiv.appendChild(titleElement);
    detailsDiv.appendChild(priceElement);

    gridItem.appendChild(imgElement);
    gridItem.appendChild(detailsDiv);

    wrapperDiv.appendChild(gridItem);
    count++;
    i++;
  }

  gridContainer.appendChild(wrapperDiv);

  // 호버 효과 추가
  addHoverEffectToItems();
}

// 커서 효과 설정
function setupCursorEffect() {
  console.log('[circle-cursor] 초기화');

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
    width: 200,
    height: 200,
    opacity: 1,
    visibility: 'visible',
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: 999999,
    pointerEvents: 'none',
    background: 'black',
    borderRadius: '50%',
    mixBlendMode: 'difference',
    transform: 'translate(-50%, -50%)',
  });

  gsap.to(cursor, {
    // autoAlpha: 1,
    opacity: 1,
    duration: 0.5,
  });

  // 기존 이벤트 리스너 제거 후 다시 등록
  document.removeEventListener('mousemove', updateCursorPosition);
  document.addEventListener('mousemove', updateCursorPosition);
}

// 마우스 이동 이벤트 핸들러 - 전역 문서에서 작동하도록 수정
function updateCursorPosition(e) {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out',
      // opacity: 1,
    });
  }
}
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
  document.querySelectorAll('.homeGrid-item').forEach((item) => {
    item.addEventListener('mouseenter', function () {
      const cursor = document.querySelector('.circle-cursor');
      if (cursor) {
        cursor.style.mixBlendMode = 'difference'; // 🔥 `difference` 유지
        const color = this.getAttribute('data-color');
        gsap.to(cursor, {
          background: color, // 🔹 마우스 오버 시 배경 변경
          duration: 0.3,
        });
      }
    });

    item.addEventListener('mouseleave', function () {
      const cursor = document.querySelector('.circle-cursor');
      if (cursor) {
        gsap.to(cursor, {
          background: color, // 🔹 마우스 떠날 때 기본값 복귀
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
  gsap.to(this, { scale: 1.7, duration: 0.3, ease: 'power2.out' });
}

// prev-product 마우스 이탈 핸들러
function handlePrevProductMouseLeave() {
  console.log('🔄 [이미지 호버 종료] prev-product 원래 크기로 복귀');
  gsap.to(this, { scale: 1, duration: 0.3, ease: 'power2.out' });
}

// 정보 버튼 클릭 핸들러 - 디버그 로그 추가
function handleInfoButtonClick(e) {
  console.log('👆 클릭 감지됨', e.target);

  // 클릭된 요소나 그 부모가 info-btn 클래스를 가지고 있는지 확인
  const infoBtn = e.target.closest('.info-btn');

  if (infoBtn) {
    console.log('🟢 [클릭 감지됨] 버튼 클릭 이벤트 발생', infoBtn);
    // if (!infoBtn) return;
    const infoId = infoBtn.getAttribute('data-info');
    const infoBox = document.getElementById(infoId);
    console.log(`🔘 [버튼 클릭] 버튼 데이터 정보: ${infoId}, 찾은 info-box ID: ${infoBox ? infoBox.id : '❌ 없음'}`);

    if (!infoBox) {
      console.error(`❌ [오류] ID가 ${infoId}인 info-box를 찾을 수 없습니다.`);
      return;
    }

    if (infoBox.style.display === 'block' && infoBox.classList.contains('show')) {
      closeInfoBox(infoBox);
    } else {
      openInfoBox(infoBox, infoBtn);
    }
  }
}

// 정보 박스 열기
if (typeof openInfoBox === 'undefined') {
  function openInfoBox(infoBox, infoBtn) {
    console.log(`🟢 [정보 박스 열기] ${infoBox.id} 박스 열기`);

    document.querySelectorAll('.info-box').forEach((box) => {
      if (box !== infoBox && box.classList.contains('show')) {
        closeInfoBox(box);
      }
    });

    // const btnRect = infoBtn.getBoundingClientRect();
    // const boxRect = infoBox.getBoundingClientRect();

    // let leftPosition = btnRect.right;
    // if (leftPosition + boxRect.width > window.innerWidth) {
    //   leftPosition = btnRect.left - boxRect.width - 10;
    // }

    // infoBox.style.position = 'absolute';
    // infoBox.style.top = `${btnRect.top + window.scrollY}px`;
    // infoBox.style.right = `${leftPosition}px`;
    infoBox.style.display = 'block';

    setTimeout(() => {
      infoBox.classList.add('show');
      gsap.fromTo(infoBox, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.inout' });
    }, 10);
  }
}
if (typeof closeInfoBox === 'undefined') {
  function closeInfoBox(infoBox) {
    console.log(`🔴 [정보 박스 닫기] ${infoBox.id} 박스 닫기`);

    if (!infoBox) return;

    gsap.to(infoBox, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: 'power2.inout',
      onComplete: () => {
        infoBox.style.display = 'none';
        infoBox.classList.remove('show');
      },
    });
  }
}
document.removeEventListener('click', handleInfoButtonClick);
document.addEventListener('click', handleInfoButtonClick);

// DOM 로드 완료 이벤트
document.addEventListener('DOMContentLoaded', () => {
  state.domReady = true;
  console.log('DOM 로드 완료, 페이지 초기화 시작');

  // 커서를 가장 먼저 설정 (필수 의존성 로드 전에)
  setupCursorEffect();

  // 전체 페이지 초기화
  setTimeout(initializePage, 100);
});

// 초기화가 완료되지 않은 경우를 위한 백업
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  if (!state.initialized) {
    console.log('DOMContentLoaded 이벤트 없이 초기화 시작');

    // 커서를 가장 먼저 설정
    setupCursorEffect();

    setTimeout(initializePage, 100);
  }
}

// 외부에서 initializePage 함수를 직접 호출할 수 있도록 export
// export { initializePage };
