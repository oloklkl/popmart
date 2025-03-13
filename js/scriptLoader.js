window.addEventListener('hashchange', () => {
  executePageScript();
});

window.addEventListener('load', () => {
  executePageScript();
});

function executePageScript() {
  const route = window.location.hash.substring(1);
  console.log(`#${route}`);

  const scriptMap = {
    home: '/mainPage/homeScript.js',
    login: 'login.js',
    register: 'registerScript.js',
    productList: 'productListScript.js',
    productDetail: 'productDetailScript.js',
    cart: 'cartScript.js',
    event: 'eventScript.js',
    shop: 'shopScript.js',
    cs: 'csScript.js',
    popStory: 'popStoryScript.js',
  };

  const scriptPath = scriptMap[route];
  if (scriptPath) {
    console.log(`실행 : ${scriptPath}`);

    import(`./${scriptPath}`)
      .then((module) => {
        if (module.initializePage) {
          module.initializePage();
        } else {
          console.error();
        }
      })
      .catch((error) => console.error(`${route} JS 로드 실패:`, error));
  } else {
    console.error(`${route} script not found`);
  }
}
