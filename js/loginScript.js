// 로그인 버튼 클릭 시
loginForm.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log('✅ 로그인 버튼 클릭됨')

  const userId = document.getElementById('userId')?.value.trim()
  const password = document.getElementById('password')?.value.trim()

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

  // 로그인 성공 처리
  if (userId === 'popmart' && password === 'p1234!') {
    alert('로그인 성공!')
    console.log('✅ 로그인 성공')

    // 로그인 정보 로컬 스토리지에 저장
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userId', userId)

    // 로그인 후 페이지 이동
    window.location.hash = '#home'
  } else {
    // 로그인 실패 처리
    document.getElementById('passwordError').textContent =
      '아이디 또는 비밀번호가 올바르지 않습니다.'
    document.getElementById('passwordError').classList.add('visible')
  }
})
