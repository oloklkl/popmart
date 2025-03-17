import items from '../productListItems.js';

export async function initializePage() {
  console.log('home-GSAP 실행');
  console.log('homeScript.js 실행');

  if (typeof ScrollTrigger === 'undefined') {
    console.warn('ScrollTrigger 로드되지 않음');
    await import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
  }

  gsap.registerPlugin(ScrollTrigger);
  console.log('ScrollTrigger 정상 로드');

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
    console.log(`🎯${img.src}`);

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

  const prevWrap = document.querySelector('.prev-wrap');
  if (!prevWrap) {
    console.error('prev-wrap not found. HTML Check');
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

  runhomeScripts();
  setTimeout(addHoverEffectToItems, 500);
}

function runhomeScripts() {
  const gridContainer = document.querySelector('.homeGrid-container');
  const wrapperDiv = document.querySelector('.homeGrid-wrapper-inner');

  if (!gridContainer || !wrapperDiv) {
    return;
  }

  if (!items || items.length === 0) {
    return;
  }

  gridContainer.innerHTML = '';
  wrapperDiv.className = 'homeGrid-wrapper-inner';

  const itemsPerPage = 12;
  const currentPage = 0;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);

  for (let i = startIndex; i < endIndex; i++) {
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
}

// 마우스 커서 초기화
setTimeout(() => {
  console.log('[circle-cursor]초기화');

  let cursor = document.querySelector('.circle-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.classList.add('circle-cursor');
    document.body.appendChild(cursor);
    console.log('.circle-cursor 추가');
  } else {
    console.log('.circle-cursor 존재');
  }
  gsap.set(cursor, {
    width: 200,
    height: 200,
    opacity: 1,
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: 9999,
    pointerEvents: 'none',
    background: 'black',
    borderRadius: '50%',
    mixBlendMode: 'difference',
  });
});

// 마우스 이동 이벤트
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

// hover 효과 추가 함수
function addHoverEffectToItems() {
  document.querySelectorAll('.homeGrid-item').forEach((item) => {
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    item.setAttribute('data-color', randomColor);

    item.addEventListener('mouseenter', () => {
      const cursor = document.querySelector('.circle-cursor');
      if (cursor) {
        const color = item.getAttribute('data-color');
        gsap.to(cursor, {
          background: color,
        });
      }
    });
  });
}
