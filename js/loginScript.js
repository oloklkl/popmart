// 로그인 버튼 클릭 시
loginForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const userId = document.getElementById('userId')?.value
  const password = document.getElementById('password')?.value

  console.log('입력된 ID:', userId)
  console.log('입력된 PW:', password)

  // 오류 메시지 초기화
  document.getElementById('userIdError').classList.remove('visible')
  document.getElementById('passwordError').classList.remove('visible')

  document.getElementById('userIdError').textContent = ''
  document.getElementById('passwordError').textContent = ''

  // 아이디 및 비밀번호 필드 유효성 검사
  if (!userId) {
    document.getElementById('userIdError').textContent = '아이디를 입력하세요.'
    document.getElementById('userIdError').classList.add('visible')
    return
  }
  if (!password) {
    document.getElementById('passwordError').textContent =
      '비밀번호를 입력하세요.'
    document.getElementById('passwordError').classList.add('visible')
    return
  }

  // 로그인 성공&실패
  if (userId === 'popmart' && password === 'p1234!') {
    alert('로그인 성공!')
    console.log('✅ 로그인 성공')

    // 로그인 후 localStorage에 로그인 상태 저장
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userId', userId)

    window.location.hash = '#home'
  } else {
    document.getElementById('passwordError').textContent =
      '아이디 또는 비밀번호가 올바르지 않습니다.'
    document.getElementById('passwordError').classList.add('visible')
  }
})

// 로그인 상태 확인 및 처리
window.addEventListener('load', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  if (isLoggedIn === 'true') {
    // 로그인 상태인 경우
    alert('이미 로그인 되어 있습니다.')
    window.location.hash = '#home'
  }
})
