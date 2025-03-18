window.addEventListener('popstate', () => {
    console.log('🔄 popstate 감지됨! 페이지 스크립트 실행');
    executePageScript();
    initSwiper();
});

window.addEventListener('load', () => {
    executePageScript();
});

function executePageScript() {
    const route = window.location.pathname.replace('/', '');
    console.log(`${route}`);

    const scriptMap = {
        home: '/mainPage/homeScript.js',
        login: 'loginScript.js',
        register: 'registerScript.js',
        productList: '/productPage/productListScript.js',
        productDetail: '/productPage/productDetailScript.js',
        cart: 'cartScript.js',
        event: 'eventScript.js',
        shop: 'shopScript.js',
        cs: 'csScript.js',
        popStory: 'popStoryScript.js',
        popStoryList: 'popStoryListScript.js',
        myPageDrawer: 'myPageDrawerScript.js',
        searchDrawer: 'searchDrawerScript.js',
    };

    const scriptPath = scriptMap[route];
    if (scriptPath) {
        console.log(`실행 : ${scriptPath}`);

        if (route === 'productDetail') {
            // productDetail 페이지인 경우, 기존 Swiper 인스턴스 파괴
            import('./productPage/productDetailScript.js')
                .then((module) => {
                    if (module.destroyPage) {
                        module.destroyPage(); // 파괴 함수 호출
                    }
                    if (module.initializePage) {
                        module.initializePage(); // 초기화 함수 호출
                    } else {
                        console.error();
                    }
                })
                .catch((error) => console.error(`${route} JS 로드 실패:`, error));
        } else {
            import(`./${scriptPath}`)
                .then((module) => {
                    if (module.initializePage) {
                        module.initializePage();
                    } else {
                        console.error();
                    }
                })
                .catch((error) => console.error(`${route} JS 로드 실패:`, error));
        }
    } else {
        console.error(`${route} script not found`);
    }
}

// window.addEventListener('load', () => {
//   executePageScript();
// });

// function executePageScript() {
//   const route = window.location.hash.substring(1);
//   console.log(`#${route}`);

//   const scriptMap = {
//     home: '/mainPage/homeScript.js',
//     login: 'loginScript.js',
//     register: 'registerScript.js',
//     productList: 'productListScript.js',
//     productDetail: 'productDetailScript.js',
//     cart: 'cartScript.js',
//     event: 'eventScript.js',
//     shop: 'shopScript.js',
//     cs: 'csScript.js',
//     popStory: 'popStoryScript.js',
//   };
// 특정 페이지(home.html)에서만 숨기기
function toggleVisibility() {
    const route = window.location.hash.substring(1);
    const hiddenRoutes = ['home']; // Drawer >> 여기에 숨길 페이지 추가 가능

    if (hiddenRoutes.includes(route)) {
        document.getElementById('myPageDrawer').style.display = 'none';
        document.getElementById('searchDrawer').style.display = 'none';
    } else {
        document.getElementById('myPageDrawer').style.display = 'block';
        document.getElementById('searchDrawer').style.display = 'block';
    }
}

// window.addEventListener('hashchange', toggleVisibility);
window.addEventListener('load', toggleVisibility);
