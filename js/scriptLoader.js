<<<<<<< HEAD
window.addEventListener('hashchange', () => {
  executePageScript()
})

window.addEventListener('load', () => {
  executePageScript()
})
=======
window.addEventListener("hashchange", () => {
  executePageScript();
});

window.addEventListener("load", () => {
  executePageScript();
});
>>>>>>> cc58c1cbc90a721ddd2b2ecc4be64d174903877b

function executePageScript() {
  const route = window.location.hash.substring(1)
  console.log(`#${route}`)

  const scriptMap = {
    home: '/mainPage/homeScript.js',
    login: 'loginScript.js',
    register: 'registerScript.js',
    productList: 'productListScript.js',
    productDetail: 'productDetailScript.js',
    cart: 'cartScript.js',
    event: 'eventScript.js',
    shop: 'shopScript.js',
    cs: 'csScript.js',
    popStory: 'popStoryScript.js',
    popStoryList: 'popStoryListScript.js',
    myPageDrawer: 'myPageDrawerScript.js',
    searchDrawer: 'searchDrawerScript.js',
  }

  const scriptPath = scriptMap[route]
  if (scriptPath) {
    console.log(`실행 : ${scriptPath}`)

    import(`./${scriptPath}`)
      .then((module) => {
        if (module.initializePage) {
          module.initializePage()
        } else {
          console.error()
        }
      })
      .catch((error) => console.error(`${route} JS 로드 실패:`, error))
  } else {
    console.error(`${route} script not found`)
  }
}
