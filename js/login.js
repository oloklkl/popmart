// login.js - 디버깅 버전

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM 로드됨 - 로그인 스크립트 시작')

  // 요소 참조 가져오기
  const loginForm = document.getElementById('loginForm')
  const userId = document.getElementById('userId')
  const password = document.getElementById('password')
  const userIdError = document.getElementById('userIdError')
  const passwordError = document.getElementById('passwordError')
  const saveId = document.getElementById('saveId')
  const autoLogin = document.getElementById('autoLogin')

  // 요소 존재 확인
  console.log('폼 요소 확인:', {
    loginForm: !!loginForm,
    userId: !!userId,
    password: !!password,
    userIdError: !!userIdError,
    passwordError: !!passwordError,
    saveId: !!saveId,
    autoLogin: !!autoLogin,
  })

  // 요소가 존재하지 않으면 오류 메시지 표시
  if (!loginForm) {
    console.error(
      '🚨 로그인 폼을 찾을 수 없음! HTML의 ID가 loginForm인지 확인하세요.'
    )
    return
  }

  // 해시 변경 감지 및 처리 함수
  function handleHash() {
    console.log('현재 해시:', window.location.hash)
    if (window.location.hash === '#login') {
      console.log('로그인 페이지로 이동함 (해시 변경 감지)')
      if (userId) userId.focus()
    }
  }

  // 초기 로드 시 해시 확인
  handleHash()

  // 해시 변경 이벤트 리스너 추가
  window.addEventListener('hashchange', function () {
    console.log('해시 변경 감지됨:', window.location.hash)
    handleHash()
  })

  // 저장된 정보 불러오기
  console.log('저장된 아이디:', localStorage.getItem('savedUserId'))
  console.log('자동 로그인 설정:', localStorage.getItem('autoLogin'))

  if (localStorage.getItem('savedUserId') && userId) {
    userId.value = localStorage.getItem('savedUserId')
    if (saveId) saveId.checked = true
  }

  if (localStorage.getItem('autoLogin') === 'true' && autoLogin) {
    autoLogin.checked = true
    if (password) password.focus()
  } else {
    if (!localStorage.getItem('savedUserId') && userId) {
      userId.focus()
    }
  }

  // 로그인 폼 제출 이벤트 리스너
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault()
      console.log('로그인 폼 제출됨')

      if (!userId || !password) {
        console.error('🚨 아이디 또는 비밀번호 입력 필드를 찾을 수 없음!')
        return
      }

      const userIdValue = userId.value.trim()
      const passwordValue = password.value.trim()

      console.log('입력값:', { userIdValue, passwordValue: '***' })

      let isValid = true

      // 유효성 검사
      if (!userIdValue) {
        if (userIdError) userIdError.textContent = '아이디를 입력해주세요.'
        console.log('아이디 누락')
        isValid = false
      } else {
        if (userIdError) userIdError.textContent = ''
      }

      if (!passwordValue) {
        if (passwordError)
          passwordError.textContent = '비밀번호를 입력해주세요.'
        console.log('비밀번호 누락')
        isValid = false
      } else {
        if (passwordError) passwordError.textContent = ''
      }

      if (isValid) {
        console.log('유효성 검사 통과')
        // 예시: 하드코딩된 로그인 정보
        const correctUserId = 'test'
        const correctPassword = '1234'

        if (
          userIdValue === correctUserId &&
          passwordValue === correctPassword
        ) {
          console.log('✅ 로그인 성공!')
          alert('로그인 성공!')

          // 아이디 저장 옵션 처리
          if (saveId && saveId.checked) {
            localStorage.setItem('savedUserId', userIdValue)
            console.log('아이디 저장됨:', userIdValue)
          } else {
            localStorage.removeItem('savedUserId')
            console.log('저장된 아이디 삭제됨')
          }

          // 자동 로그인 옵션 처리
          if (autoLogin && autoLogin.checked) {
            localStorage.setItem('autoLogin', 'true')
            console.log('자동 로그인 설정됨')
          } else {
            localStorage.removeItem('autoLogin')
            console.log('자동 로그인 해제됨')
          }

          // 리디렉션
          console.log('메인 페이지로 리디렉션합니다...')
          setTimeout(function () {
            window.location.href = '/page/mainPage/home.html'
          }, 500) // 로그 확인을 위해 약간의 지연 추가
        } else {
          console.log('❌ 로그인 실패! 잘못된 아이디 또는 비밀번호')
          alert('아이디 또는 비밀번호가 틀립니다.')
          if (passwordError)
            passwordError.textContent =
              '아이디 또는 비밀번호가 올바르지 않습니다.'
        }
      }
    })

    console.log('로그인 폼에 이벤트 리스너 등록 완료')
  }
})
