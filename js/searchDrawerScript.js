// 로그인 상태 체크
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

// 검색 버튼 클릭 이벤트
document.getElementById('search-btn').addEventListener('click', function () {
  document.getElementById('search-box').classList.toggle('open')
  document.getElementById('modal-overlay').classList.toggle('open')
  document.getElementById('recent-search-container').style.display = 'block'
})

// 모달 오버레이 클릭 시 검색창 닫기
function closeSearch() {
  document.getElementById('search-box').classList.remove('open')
  document.getElementById('modal-overlay').classList.remove('open')
  document.getElementById('recent-search-container').style.display = 'none'
}

// 오버레이 클릭 또는 닫기 버튼 클릭 시 검색창 닫기
document.getElementById('modal-overlay').addEventListener('click', closeSearch)
document.getElementById('close').addEventListener('click', closeSearch)

// 검색어 입력창
const searchInput = document.querySelector('.search-bar')
const recentSearches = document.getElementById('recent-searches')

// 검색 시 Enter 키 이벤트
searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    performSearch(searchInput.value)
  }
})

// 검색 버튼 클릭 이벤트
document.getElementById('search-btn').addEventListener('click', function () {
  performSearch(searchInput.value)
})

// 검색 수행
function performSearch(query) {
  if (!query.trim()) return

  console.log('검색 실행: ', query)
  if (isLoggedIn) saveSearchQuery(query)
  searchInput.value = ''
}

// 최근 검색어 저장
function saveSearchQuery(query) {
  let searches = JSON.parse(localStorage.getItem('recentSearches')) || []
  if (!searches.includes(query)) {
    searches.unshift(query)
    if (searches.length > 5) searches.pop()
    localStorage.setItem('recentSearches', JSON.stringify(searches))
  }
  renderRecentSearches()
}

// 최근 검색어 삭제
function deleteSearchQuery(query) {
  let searches = JSON.parse(localStorage.getItem('recentSearches')) || []
  searches = searches.filter((item) => item !== query)
  localStorage.setItem('recentSearches', JSON.stringify(searches))
  renderRecentSearches()
}

// 최근 검색어 목록 표시
function renderRecentSearches() {
  recentSearches.innerHTML = ''
  const searches = JSON.parse(localStorage.getItem('recentSearches')) || []
  if (searches.length === 0) {
    document.getElementById('recent-search-container').style.display = 'none'
    return
  }

  document.getElementById('recent-search-container').style.display = 'block'

  searches.forEach((word) => {
    const li = document.createElement('li')
    li.style.display = 'flex'
    li.style.alignItems = 'center'
    li.style.justifyContent = 'space-between'
    li.style.padding = '5px 10px'
    li.style.borderBottom = '1px solid #ddd'

    const span = document.createElement('span')
    span.textContent = word
    span.style.cursor = 'pointer'
    span.addEventListener('click', () => performSearch(word))

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'X'
    deleteBtn.classList.add('delete-btn')
    deleteBtn.addEventListener('click', () => deleteSearchQuery(word))

    li.appendChild(span)
    li.appendChild(deleteBtn)
    recentSearches.appendChild(li)
  })
}

// 로그인 상태일 때만 최근 검색어 렌더링
if (isLoggedIn) renderRecentSearches()

// 로그아웃 시 최근 검색어 삭제
document.getElementById('logoutBtn').addEventListener('click', function () {
  logoutUser()
})

function logoutUser() {
  // 로그아웃 처리
  localStorage.setItem('isLoggedIn', 'false')

  // 최근 검색어 삭제
  localStorage.removeItem('recentSearches')

  // 최근 검색어 목록 초기화
  renderRecentSearches()
}
