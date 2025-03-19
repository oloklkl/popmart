document.getElementById('user-icon').addEventListener('click', toggleMenu)

// 메뉴 열기/닫기
function toggleMenu() {
  const menu = document.getElementById('mypage-menu')
  const overlay = document.getElementById('modal-overlay')

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  document.getElementById('member').style.display = isLoggedIn
    ? 'block'
    : 'none'
  document.getElementById('non-member').style.display = isLoggedIn
    ? 'none'
    : 'block'

  menu.classList.toggle('open')
  overlay.classList.toggle('open')
}

// 메뉴 열기
function openMenu() {
  const menu = document.getElementById('mypage-menu')
  const overlay = document.getElementById('modal-overlay')

  if (!menu || !overlay) {
    console.warn('mypage-menu 또는 modal-overlay를 찾을 수 없음')
    return
  }

  document.getElementById('member').style.display = 'block'
  document.getElementById('non-member').style.display = 'none'

  menu.classList.add('open')
  overlay.classList.add('open')
}

// 모달 클릭 시 메뉴 닫기
document.getElementById('modal-overlay').addEventListener('click', function () {
  document.getElementById('mypage-menu').classList.remove('open')
  document.getElementById('modal-overlay').classList.remove('open')
})

document.getElementById('beforeBtn').addEventListener('click', function () {
  document.getElementById('mypage-menu').classList.remove('open')
})

// 로그아웃 버튼 클릭 시 로컬스토리지 비우고 로그인 페이지로 이동
document.getElementById('logoutBtn').addEventListener('click', function () {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userId')

  window.location.href = '/page/myPage/login.html'

  document.getElementById('mypage-menu').classList.remove('open')
  document.getElementById('modal-overlay').classList.remove('open')
})
