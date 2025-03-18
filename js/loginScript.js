document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm')
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const userId = document.getElementById('userId')?.value.trim()
    const password = document.getElementById('password')?.value.trim()
    console.log('입력된 ID:', userId)
    console.log('입력된 PW:', password)
    // 오류 메시지 초기화
    document.getElementById('userIdError').classList.remove('visible')
    document.getElementById('passwordError').classList.remove('visible')
    document.getElementById('userIdError').textContent = ''
    document.getElementById('passwordError').textContent = ''
    // 유효성 검사
    if (!userId) {
      document.getElementById('userIdError').textContent =
        '아이디를 입력하세요.'
      document.getElementById('userIdError').classList.add('visible')
      return
    }
    if (!password) {
      document.getElementById('passwordError').textContent =
        '비밀번호를 입력하세요.'
      document.getElementById('passwordError').classList.add('visible')
      return
    }
    // 로그인 처리
    if (userId === 'popmart' && password === 'p1234!') {
      alert('로그인 성공!')
      console.log('✅ 로그인 성공')
      // 로그인 상태 저장
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userId', userId)
      // 아이디 저장 체크 시 localStorage에 저장
      if (document.getElementById('saveId').checked) {
        localStorage.setItem('savedUserId', userId)
      } else {
        localStorage.removeItem('savedUserId')
      }
      // 자동 로그인 체크 시 유지
      if (document.getElementById('autoLogin').checked) {
        localStorage.setItem('autoLogin', 'true')
      } else {
        localStorage.removeItem('autoLogin')
      }
      // 로그인 후 홈으로 이동
      window.location.href = '/page/mainPage/home.html'
    } else {
      document.getElementById('passwordError').textContent =
        '아이디 또는 비밀번호가 올바르지 않습니다.'
      document.getElementById('passwordError').classList.add('visible')
    }
  })
  // 아이디 저장된 경우 자동 채우기
  const savedUserId = localStorage.getItem('savedUserId')
  if (savedUserId) {
    document.getElementById('userId').value = savedUserId
    document.getElementById('saveId').checked = true
  }
  // 자동 로그인 체크된 경우 로그인 처리
  if (localStorage.getItem('autoLogin') === 'true') {
    alert('자동 로그인되었습니다.')
    window.location.href = '/page/mainPage/home.html'
  }
})
