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

  // 오류 메시지를 초기화한 후 visibility와 opacity를 다시 숨김 상태로 설정
  document.getElementById('userIdError').textContent = ''
  document.getElementById('passwordError').textContent = ''

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

  if (userId === 'popmart' && password === 'p1234!') {
    alert('로그인 성공!')
    console.log('✅ 로그인 성공')
    window.location.hash = '#home'
  } else {
    if (userId === 'test' && password !== '1234') {
      document.getElementById('passwordError').textContent =
        '비밀번호를 다시 입력해 주세요.'
      document.getElementById('passwordError').classList.add('visible')
    } else {
      document.getElementById('passwordError').textContent =
        '아이디 또는 비밀번호가 올바르지 않습니다.'
      document.getElementById('passwordError').classList.add('visible')
    }
  }
})
