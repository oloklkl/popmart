import items from '../productListItems.js';

export async function initializePage() {
  console.log('✅ 홈 페이지 GSAP 실행됨!');
  console.log('🚀 [초기화] homeScript.js 실행 시작!');

  if (typeof ScrollTrigger === 'undefined') {
    console.warn('❌ ScrollTrigger 로드되지 않음!');
    await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('✅ ScrollTrigger 정상 로드됨');

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

  gsap.utils.toArray('.letter-img').forEach((img) => {
    let speed = parseFloat(img.dataset.speed) || 1;
    let fixedPoint = img.dataset.fixed ? parseFloat(img.dataset.fixed) : null;
    console.log(`🎯 이미지: ${img.src}, speed: ${speed}`);

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

  console.log('📌 `initializePage()` 실행 완료!');

  const prevWrap = document.querySelector('.prev-wrap');
  if (!prevWrap) {
    console.error('❌ prev-wrap 요소를 찾을 수 없습니다. HTML 확인 필요!');
    return;
  }

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

  // ✅ `runhomeScripts()` 실행 후 `addHoverEffectToItems()` 실행
  runhomeScripts();
  setTimeout(addHoverEffectToItems, 500);
}

// ✅ home grid 실행
function runhomeScripts() {
  console.log('🚀 [runhomeScripts] 실행됨!');

  const gridContainer = document.querySelector('.homeGrid-container');
  const wrapperDiv = document.querySelector('.homeGrid-wrapper-inner');

  if (!gridContainer || !wrapperDiv) {
    console.error('❌ [homeGrid-container 오류] homeGrid-container를 찾을 수 없습니다. HTML 확인 필요!');
    return;
  }

  if (!items || items.length === 0) {
    console.error('❌ [items 오류] items 배열이 비어 있음! productListItems.js 확인 필요!');
    return;
  }

  gridContainer.innerHTML = '';
  wrapperDiv.className = 'homeGrid-wrapper-inner';

  const itemsPerPage = 12;
  const currentPage = 0;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);

  for (let i = startIndex; i < endIndex; i++) {
    console.log(`🛠️ [추가 중] ${i + 1}번째 아이템:`, items[i]);

    const gridItem = document.createElement('div');
    gridItem.className = 'homeGrid-item';

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
  }

  gridContainer.appendChild(wrapperDiv);
  console.log('✅ [완료] homeGrid-container에 데이터 추가 완료!');
}

// ✅ 마우스 커서 초기화
setTimeout(() => {
  console.log('🚀 [circle-cursor] 강제 초기화');

  let cursor = document.querySelector('.circle-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.classList.add('circle-cursor');
    document.body.appendChild(cursor);
    console.log('✅ .circle-cursor 강제 추가됨!');
  } else {
    console.log('✅ .circle-cursor 이미 존재함');
  }
  gsap.set(cursor, {
    width: 100,
    height: 100,
  });
}, 500);

// ✅ 마우스 이동 이벤트
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.circle-cursor');
  if (cursor) {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: 'power2.out',
    });
  }
});

// ✅ hover 효과 추가 함수
function addHoverEffectToItems() {
  console.log('🚀 [hover 이벤트 추가] 실행됨!');

  document.querySelectorAll('.homeGrid-item').forEach((item) => {
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    item.setAttribute('data-color', randomColor);

    item.addEventListener('mouseenter', () => {
      console.log(`🎨 [mouseenter] ${item.innerText} → 색상 변경!`);
      const cursor = document.querySelector('.circle-cursor');
      if (cursor) {
        const color = item.getAttribute('data-color');
        gsap.to(cursor, {
          background: color, // ✅ 색상만 변경
        });
      }
    });
  });
}
