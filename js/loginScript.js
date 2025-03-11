loginForm.addEventListener('submit', function (event) {
  event.preventDefault() // 기본 폼 제출 동작 방지
  console.log('✅ 로그인 버튼 클릭됨')

  const userId = document.getElementById('userId')?.value.trim()
  const password = document.getElementById('password')?.value.trim()

  console.log('입력된 ID:', userId)
  console.log('입력된 PW:', password)

  // 입력값 확인
  if (!userId) {
    alert('아이디를 입력하세요.')
    return
  }
  if (!password) {
    alert('비밀번호를 입력하세요.')
    return
  }

  // 로그인 성공 시 해시 변경 (해시 라우터 사용)
  if (userId === 'test' && password === '1234') {
    console.log('✅ 로그인 성공')
    // 여기서 해시만 변경
    window.location.hash = '#home' // 해시로 홈 페이지로 이동
  } else {
    alert('아이디 또는 비밀번호가 올바르지 않습니다.')
  }
})
