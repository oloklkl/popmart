console.log(':로켓: scriptLoader.js 로드됨! start');
function loadCommonElements() {
  console.log(':확성기: [헤더 & 푸터 로딩 시작]');
  // :흰색_확인_표시: 이미 .header가 존재하면 새로 만들지 않음
  let $header = document.querySelector('#header');
  let $footer = document.querySelector('#footer');
  fetch('/common/header.html')
    .then((response) => response.text())
    .then((data) => {
      console.log(':흰색_확인_표시: [헤더 로드 성공]');
      $header.innerHTML = data; // :흰색_확인_표시: 기존 `.header`에 삽입
      reloadStylesheets();
    })
    .catch((error) => console.error(':x: 헤더 로딩 실패:', error));
  fetch('/common/footer.html')
    .then((response) => response.text())
    .then((data) => {
      console.log(':흰색_확인_표시: [푸터 로드 성공]');
      $footer.innerHTML = data;
    })
    .catch((error) => console.error(':x: 푸터 로딩 실패:', error));
}
const loadedScripts = new Set();
function executePageScript() {
  const path = window.location.pathname.replace('/', '') || 'home'; // :흰색_확인_표시: `route` 대신 `path` 사용
  console.log(`:압정: 현재 경로: ${path}`);
  const scriptMap = {
    home: '/js/mainPage/homeScript.js', // :흰색_확인_표시: `/js/` 추가하여 올바른 경로로 수정
    login: '/js/myPage/loginScript.js',
    register: '/js/myPage/registerScript.js',
    productList: '/js/productPage/productListScript.js',
    productDetail: '/js/productPage/productDetailScript.js',
    cart: '/js/cartScript.js',
    event: '/js/eventList.js',
    shop: '/js/shopScript.js',
    cs: '/js/csScript.js',
    popStory: '/js/popStoryScript.js',
    popStoryList: '/js/popStoryListScript.js',
  };
  const scriptPath = scriptMap[path] || scriptMap['home'];
  if (!scriptPath) {
    console.error(`:경고: ${path} script not found`);
    return;
  }
  if (loadedScripts.has(scriptPath)) {
    console.log(`:다음_트랙: 이미 로드된 스크립트: ${scriptPath}`);
    return; // :흰색_확인_표시: 중복 로드 방지
  }
  console.log(`:흰색_확인_표시: 실행할 스크립트: ${scriptPath}`);
  loadedScripts.add(scriptPath); // :흰색_확인_표시: 로드된 스크립트 저장
  import(`${scriptPath}`)
    .then((module) => {
      if (module.initializePage) {
        module.initializePage();
      } else {
        console.error(':경고: initializePage 함수 없음');
      }
    })
    .catch((error) => console.error(`${path} JS 로드 실패:`, error));
}
// :흰색_확인_표시: Drawer 표시 여부 설정 (null 체크 추가)
function toggleVisibility() {
  const path = window.location.pathname.replace('/', '');
  const hiddenRoutes = ['home']; // :흰색_확인_표시: 숨길 페이지 목록
  const myPageDrawer = document.getElementById('myPageDrawer');
  const searchDrawer = document.getElementById('searchDrawer');
  if (!myPageDrawer || !searchDrawer) {
    console.warn(':경고: `myPageDrawer` 또는 `searchDrawer`가 존재하지 않습니다.');
    return; // :흰색_확인_표시: `null`이면 실행하지 않음
  }
  if (hiddenRoutes.includes(path)) {
    myPageDrawer.style.display = 'none';
    searchDrawer.style.display = 'none';
  } else {
    myPageDrawer.style.display = 'block';
    searchDrawer.style.display = 'block';
  }
}
// :흰색_확인_표시: CSS 리로드 (스타일 깨짐 방지)
function reloadStylesheets() {
  console.log(':시계_반대_방향_화살표: CSS 리로드 중...');
  const links = document.querySelectorAll("link[rel='stylesheet']");
  links.forEach((link) => {
    const newLink = link.cloneNode();
    newLink.href = link.href.split('?')[0] + '?timestamp=' + new Date().getTime();
    link.parentNode.replaceChild(newLink, link);
  });
}
(() => {
  loadCommonElements();
})();
