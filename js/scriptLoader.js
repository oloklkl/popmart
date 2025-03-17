window.addEventListener('hashchange', () => {
  executePageScript()
})

window.addEventListener('load', () => {
  executePageScript()
})

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
  executePageScript()
}

window.addEventListener('load', () => {
  executePageScript()
})

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
  }

  const scriptPath = scriptMap[route]
  if (scriptPath) {
    console.log(`실행 : ${scriptPath}`)

    if (route === 'productDetail') {
      // productDetail 페이지인 경우, 기존 Swiper 인스턴스 파괴
      import('./productDetailScript.js')
        .then((module) => {
          if (module.destroyPage) {
            module.destroyPage() // 파괴 함수 호출
          }
          if (module.initializePage) {
            module.initializePage() // 초기화 함수 호출
          } else {
            console.error()
          }
        })
        .catch((error) => console.error(`${route} JS 로드 실패:`, error))
    } else {
      import(`./${scriptPath}`)
        .then((module) => {
          if (module.initializePage) {
            module.initializePage()
          } else {
            console.error()
          }
        })
        .catch((error) => console.error(`${route} JS 로드 실패:`, error))
    }
  } else {
    console.error(`${route} script not found`)
  }
}
