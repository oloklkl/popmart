// // 예시: 로그인 여부에 따라 UI 보여주기
const isLoggedIn = false
// const isLoggedIn = true

if (isLoggedIn) {
  document.getElementById('non-member').style.display = 'none'
  document.getElementById('member').style.display = 'block'
} else {
  document.getElementById('non-member').style.display = 'block'
  document.getElementById('member').style.display = 'none'
}
