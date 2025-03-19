window.addEventListener('load', () => {
  console.log('✅ scriptLoader.js 실행됨!');

  if (typeof loadCommonElements === 'function') {
    loadCommonElements(); // ✅ 모든 페이지에서 헤더 & 푸터 자동 로드
  }
  executePageScript();
});

function loadCommonElements() {
  console.log('📢 [헤더 & 푸터 로딩 시작]');

  if (!document.getElementById('header')) {
    const header = document.createElement('header');
    header.id = 'header';
    header.classList.add('header');
    document.body.prepend(header);
  }

  if (!document.getElementById('footer')) {
    const footer = document.createElement('footer');
    footer.id = 'footer';
    document.body.appendChild(footer);
  }

  fetch('/common/header.html')
    .then((response) => response.text())
    .then((data) => {
      console.log('✅ [헤더 로드 성공]');
      document.getElementById('header').innerHTML = data;
      reloadStylesheets();
    })
    .catch((error) => console.error('❌ 헤더 로딩 실패:', error));

  fetch('/common/footer.html')
    .then((response) => response.text())
    .then((data) => {
      console.log('✅ [푸터 로드 성공]');
      document.getElementById('footer').innerHTML = data;
    })
    .catch((error) => console.error('❌ 푸터 로딩 실패:', error));
}
const loadedScripts = new Set();
function executePageScript() {
  const path = window.location.pathname.replace('/', '') || 'home'; // ✅ `route` 대신 `path` 사용
  console.log(`📌 현재 경로: ${path}`);

  const scriptMap = {
    home: '/js/mainPage/homeScript.js', // ✅ `/js/` 추가하여 올바른 경로로 수정
    login: '/js/myPage/loginScript.js',
    register: '/js/myPage/registerScript.js',
    productList: '/js/productPage/productListScript.js',
    productDetail: '/js/productPage/productDetailScript.js',
    cart: '/js/cartScript.js',
    event: '/js/eventScript.js',
    shop: '/js/shopScript.js',
    cs: '/js/csScript.js',
    popStory: '/js/popStoryScript.js',
    popStoryList: '/js/popStoryListScript.js',
  };

  const scriptPath = scriptMap[path] || scriptMap['home'];
  if (!scriptPath) {
    console.error(`⚠️ ${path} script not found`);
    return;
  }

  if (loadedScripts.has(scriptPath)) {
    console.log(`⏭️ 이미 로드된 스크립트: ${scriptPath}`);
    return; // ✅ 중복 로드 방지
  }

  console.log(`✅ 실행할 스크립트: ${scriptPath}`);
  loadedScripts.add(scriptPath); // ✅ 로드된 스크립트 저장

  import(`${scriptPath}`)
    .then((module) => {
      if (module.initializePage) {
        module.initializePage();
      } else {
        console.error('⚠️ initializePage 함수 없음');
      }
    })
    .catch((error) => console.error(`${path} JS 로드 실패:`, error));
}

// ✅ Drawer 표시 여부 설정 (null 체크 추가)
function toggleVisibility() {
  const path = window.location.pathname.replace('/', '');
  const hiddenRoutes = ['home']; // ✅ 숨길 페이지 목록

  const myPageDrawer = document.getElementById('myPageDrawer');
  const searchDrawer = document.getElementById('searchDrawer');

  if (!myPageDrawer || !searchDrawer) {
    console.warn('⚠️ `myPageDrawer` 또는 `searchDrawer`가 존재하지 않습니다.');
    return; // ✅ `null`이면 실행하지 않음
  }

  if (hiddenRoutes.includes(path)) {
    myPageDrawer.style.display = 'none';
    searchDrawer.style.display = 'none';
  } else {
    myPageDrawer.style.display = 'block';
    searchDrawer.style.display = 'block';
  }
}

// ✅ CSS 리로드 (스타일 깨짐 방지)
function reloadStylesheets() {
  console.log('🔄 CSS 리로드 중...');

  const links = document.querySelectorAll("link[rel='stylesheet']");
  links.forEach((link) => {
    const newLink = link.cloneNode();
    newLink.href = link.href.split('?')[0] + '?timestamp=' + new Date().getTime();
    link.parentNode.replaceChild(newLink, link);
  });
}
