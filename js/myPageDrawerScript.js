let isLoggedIn = false

document.getElementById('mypage-btn').addEventListener('click', function () {
  toggleMenu()
})

// 오버레이 클릭 시 닫기
document.getElementById('modal-overlay').addEventListener('click', function () {
  closeMenu()
})

// 로그아웃 기능
function logout() {
  isLoggedIn = false
  alert('로그아웃 되었습니다.')
}

// **🔹 뒤로 가기 후에도 실행되도록 설정**
window.addEventListener('pageshow', function () {
  updateMenuState()
})

// **🔹 메뉴 상태 업데이트 함수**
function updateMenuState() {
  if (isLoggedIn) {
    document.getElementById('logged-in').classList.remove('hidden')
    document.getElementById('logged-out').classList.add('hidden')
  } else {
    document.getElementById('logged-in').classList.add('hidden')
    document.getElementById('logged-out').classList.remove('hidden')
  }
}

// **🔹 메뉴 토글 함수**
function toggleMenu() {
  document.getElementById('mypage-menu').classList.toggle('hidden')
  document.getElementById('modal-overlay').classList.toggle('hidden')
  updateMenuState()
}

// **🔹 메뉴 닫기 함수**
function closeMenu() {
  document.getElementById('mypage-menu').classList.add('hidden')
  document.getElementById('modal-overlay').classList.add('hidden')
}
