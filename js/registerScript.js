registerForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('✅ 회워가입 버튼 클릭됨')

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
  console.log('선택된 회원 유형:', memberType) // 라디오 버튼 값
  console.log('선택된 인증 방식:', authType) // 라디오 버튼 값
  console.log('입력된 ID:', userId)
  console.log('입력된 PW:', password)
  console.log('입력된 PW 확인', passwordConfirm)
  console.log('입력된 주소:', address)
  console.log('입력된 상세주소:', detailAddress)
  console.log('입력된 생년월일:', `${birthYear}-${birthMonth}-${birthDay}`)
  console.log('음력/양력:', lunar)

  const userIdError = document.getElementById('userIdError')
  const passwordError = document.getElementById('passwordError')
  const passwordConfirmError = document.getElementById('passwordConfirmError')
  const addressError = document.getElementById('addressError')
  const detailAddressError = document.getElementById('detailAddressError')
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
    el.textContent = ''
    el.classList.remove('visible')
  })
  let hasError = false

  const userIdRegex = /^[a-zA-Z0-9]+$/
  if (!userId) {
    document.getElementById('userIdError').textContent = '아이디를 입력하세요.'
    document.getElementById('userIdError').classList.add('visible')
    hasError = true
  } else if (!userIdRegex.test(userId)) {
    document.getElementById('userIdError').textContent =
      '아이디는 영문과 숫자만 입력 가능합니다.'
    document.getElementById('userIdError').classList.add('visible')
    hasError = true
  }

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]).+$/
  if (!password) {
    document.getElementById('passwordError').textContent =
      '비밀번호를 입력하세요.'
    document.getElementById('passwordError').classList.add('visible')
    hasError = true
  } else if (!passwordRegex.test(password)) {
    document.getElementById('passwordError').textContent =
      '비밀번호는 영문, 숫자, 특수기호를 포함해야 합니다.'
    document.getElementById('passwordError').classList.add('visible')
    hasError = true
  }

  if (!passwordConfirm) {
    document.getElementById('passwordConfirmError').textContent =
      '비밀번호 확인을 입력하세요.'
    document.getElementById('passwordConfirmError').classList.add('visible')
    hasError = true
  }

  if (password !== passwordConfirm) {
    document.getElementById('passwordConfirmError').textContent =
      '비밀번호가 일치하지 않습니다.'
    document.getElementById('passwordConfirmError').classList.add('visible')
    hasError = true
  }

  if (!address) {
    document.getElementById('addressError').textContent = '주소를 입력하세요.'
    document.getElementById('addressError').classList.add('visible')
    hasError = true
  }

  if (!detailAddress) {
    document.getElementById('detailAddressError').textContent =
      '상세주소를 입력하세요.'
    document.getElementById('detailAddressError').classList.add('visible')
    hasError = true
  }

  if (!birthYear || birthYear < 1000 || birthYear > 9999) {
    document.getElementById('birthYearError').textContent =
      '올바른 생년을 입력하세요.'
    document.getElementById('birthYearError').classList.add('visible')
    hasError = true
  }

  if (!birthMonth || birthMonth < 1 || birthMonth > 12) {
    document.getElementById('birthMonthError').textContent =
      '올바른 생월을 입력하세요.'
    document.getElementById('birthMonthError').classList.add('visible')
    hasError = true
  }

  if (!birthDay || birthDay < 1 || birthDay > 31) {
    document.getElementById('birthDayError').textContent =
      '올바른 생일을 입력하세요.'
    document.getElementById('birthDayError').classList.add('visible')
    hasError = true
  }

  if (hasError) return

  // 회원가입 성공
  alert('POPMART의 회원이 되신걸 환영합니다!')
  console.log('✅ 회원가입 성공')

  // 로그인 페이지로 이동
  window.location.hash = '#login'
})
