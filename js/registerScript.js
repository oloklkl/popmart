const existingUserIds = ['user123', 'test', 'popmart']
let lastUserId = '' // 마지막 입력된 아이디 저장
let duplicateCount = 0 // 중복 입력 횟수 저장

// ID 중복 확인 버튼 이벤트
document.querySelector('.btnShort').addEventListener('click', () => {
  const userIdInput = document.getElementById('userId')
  const userIdError = document.getElementById('userIdError')
  const userId = userIdInput.value.trim()

  userIdError.textContent = ''
  userIdError.classList.remove('visible')

  if (!userId) {
    userIdError.textContent = '아이디를 입력하세요.'
    userIdError.classList.add('visible')
    return
  }

  if (existingUserIds.includes(userId)) {
    if (userId === lastUserId) {
      duplicateCount++
    } else {
      duplicateCount = 1
    }
    lastUserId = userId

    userIdError.textContent = '이미 사용 중인 아이디입니다.'
    userIdError.classList.add('visible')

    if (duplicateCount > 1) {
      userIdError.textContent = '다른 아이디로 다시 입력해주세요.'
    }
  } else {
    duplicateCount = 0
    alert('사용 가능한 아이디입니다.')
  }
})

// 우편번호 검색
document.querySelectorAll('.btnShort').forEach((button, index) => {
  if (index === 1) {
    button.addEventListener('click', function () {
      new daum.Postcode({
        oncomplete: function (data) {
          const addressInput = document.getElementById('address')
          addressInput.value = data.address

          document.getElementById('detailAddress').focus()
        },
      }).open()
    })
  }
})

// 주소 직접 입력 방지
document.getElementById('address').addEventListener('keydown', function (e) {
  e.preventDefault()
})

// 회원가입 폼 제출 이벤트
const registerForm = document.getElementById('registerForm')
registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('✅ 회원가입 버튼 클릭됨')

  const memberType = document.querySelector(
    'input[name="member_type"]:checked'
  )?.value
  const authType = document.querySelector(
    'input[name="auth_type"]:checked'
  )?.value
  const userId = document.getElementById('userId')?.value.trim()
  const password = document.getElementById('password')?.value.trim()
  const passwordConfirm = document
    .getElementById('passwordConfirm')
    ?.value.trim()
  const address = document.getElementById('address')?.value.trim()
  const detailAddress = document.getElementById('detailAddress')?.value.trim()
  const birthYear = document.getElementById('birthYear')?.value.trim()
  const birthMonth = document.getElementById('birthMonth')?.value.trim()
  const birthDay = document.getElementById('birthDay')?.value.trim()
  const lunar = document.querySelector('input[name="lunar"]:checked')?.value

  console.log('선택된 회원 유형:', memberType)
  console.log('선택된 인증 방식:', authType)
  console.log('입력된 ID:', userId)
  console.log('입력된 PW:', password)
  console.log('입력된 PW 확인', passwordConfirm)
  console.log('입력된 주소:', address)
  console.log('입력된 상세주소:', detailAddress)
  console.log(`입력된 생년월일: ${birthYear}-${birthMonth}-${birthDay}`)
  console.log('음력/양력:', lunar)

  const userIdError = document.getElementById('userIdError')
  const passwordError = document.getElementById('passwordError')
  const passwordConfirmError = document.getElementById('passwordConfirmError')
  const addressError = document.getElementById('addressError')
  const detailAddressError = document.getElementById('detailAddressError')

  // 생년월일 에러 엘리먼트 변수 선언 (HTML에 해당 요소가 없으면 동작하지 않을 수 있음)
  const birthYearError = document.getElementById('birthYearError')
  const birthMonthError = document.getElementById('birthMonthError')
  const birthDayError = document.getElementById('birthDayError')

  const errorElements = [
    userIdError,
    passwordError,
    passwordConfirmError,
    addressError,
    detailAddressError,
  ]

  errorElements.forEach((el) => {
    if (el) {
      el.textContent = ''
      el.classList.remove('visible')
    }
  })

  let hasError = false

  // 아이디 중복 확인
  if (existingUserIds.includes(userId)) {
    userIdError.textContent = '이미 사용 중인 아이디입니다.'
    userIdError.classList.add('visible')
    hasError = true
  }

  const userIdRegex = /^[a-zA-Z0-9]+$/
  if (!userId) {
    userIdError.textContent = '아이디를 입력하세요.'
    userIdError.classList.add('visible')
    hasError = true
  } else if (!userIdRegex.test(userId)) {
    userIdError.textContent = '아이디는 영문과 숫자만 입력 가능합니다.'
    userIdError.classList.add('visible')
    hasError = true
  }

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~]).+$/
  if (!password) {
    passwordError.textContent = '비밀번호를 입력하세요.'
    passwordError.classList.add('visible')
    hasError = true
  } else if (!passwordRegex.test(password)) {
    passwordError.textContent =
      '비밀번호는 영문, 숫자, 특수기호를 포함해야 합니다.'
    passwordError.classList.add('visible')
    hasError = true
  }

  if (!passwordConfirm) {
    passwordConfirmError.textContent = '비밀번호 확인을 입력하세요.'
    passwordConfirmError.classList.add('visible')
    hasError = true
  }

  if (password !== passwordConfirm) {
    passwordConfirmError.textContent = '비밀번호가 일치하지 않습니다.'
    passwordConfirmError.classList.add('visible')
    hasError = true
  }

  if (!address) {
    addressError.textContent = '주소를 입력하세요.'
    addressError.classList.add('visible')
    hasError = true
  }

  if (!detailAddress) {
    detailAddressError.textContent = '상세주소를 입력하세요.'
    detailAddressError.classList.add('visible')
    hasError = true
  }

  // 생년월일 검증
  if (birthYearError && (!birthYear || birthYear < 1000 || birthYear > 9999)) {
    birthYearError.textContent = '올바른 생년을 입력하세요.'
    birthYearError.classList.add('visible')
    hasError = true
  }

  if (birthMonthError && (!birthMonth || birthMonth < 1 || birthMonth > 12)) {
    birthMonthError.textContent = '올바른 생월을 입력하세요.'
    birthMonthError.classList.add('visible')
    hasError = true
  }

  if (birthDayError && (!birthDay || birthDay < 1 || birthDay > 31)) {
    birthDayError.textContent = '올바른 생일을 입력하세요.'
    birthDayError.classList.add('visible')
    hasError = true
  }

  if (hasError) return

  // 회원가입 성공
  alert('POPMART의 회원이 되신 걸 환영합니다!')
  console.log('✅ 회원가입 성공')

  // 로그인 페이지로 이동
  window.location.href = '/page/myPage/login.html'
})

document.addEventListener('DOMContentLoaded', function () {
  // 인증 버튼 텍스트 변경 함수
  function updateAuthButtonText() {
    const authType = document.querySelector(
      'input[name="auth_type"]:checked'
    )?.value
    const authBtn = document.querySelector('.authBtn:not(.btnShort)')

    if (authBtn) {
      authBtn.textContent = authType === 'email' ? '이메일 인증' : '휴대폰 인증'
    }
  }

  // 인증 유형 라디오 버튼 변경 시 이벤트
  document.querySelectorAll('input[name="auth_type"]').forEach((radio) => {
    radio.addEventListener('change', updateAuthButtonText)
  })

  // 초기 설정
  updateAuthButtonText()
})
