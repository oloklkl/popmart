document.getElementById('search-btn').addEventListener('click', function () {
  document.getElementById('search-box').classList.toggle('open')
  document.getElementById('modal-overlay').classList.toggle('open')
})

// 창을 닫는 기능을 하나의 함수로 통합
function closeSearch() {
  document.getElementById('search-box').classList.remove('open')
  document.getElementById('modal-overlay').classList.remove('open')
}

// 배경 클릭 시 또는 X 버튼 클릭 시 창을 닫는 이벤트 처리
document.getElementById('modal-overlay').addEventListener('click', closeSearch)
document.getElementById('close').addEventListener('click', closeSearch)
