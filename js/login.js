document.addEventListener('DOMContentLoaded', function () {
  console.log('로그인페이지 로드완료')

  const loginButton = document.querySelector('.loginBtn button')
  const form = document.querySelector('form')

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault() // 기본 폼 제출 방지
      validateLoginForm()
    })
  }

  function validateLoginForm() {
    // 입력 값 가져오기
    const userId = document.getElementById('userId').value
    const password = document.getElementById('password').value

    // 오류 메시지 초기화
    let errorMessage = ''

    // 아이디가 비어 있으면 오류 메시지
    if (!userId) {
      errorMessage += '아이디를 입력해주세요.\n'
    }

    // 비밀번호가 비어 있으면 오류 메시지
    if (!password) {
      errorMessage += '비밀번호를 입력해주세요.\n'
    }

    if (errorMessage) {
      alert(errorMessage)
      return
    }

    console.log('아이디:', userId, '비밀번호:', password)

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답 오류')
        }
        return response.json()
      })
      .then((data) => {
        if (data.success) {
          alert('로그인 성공!')
          window.location.href = '/index.html'
        } else {
          alert('로그인 실패: ' + data.message)
        }
      })
      .catch((error) => {
        console.error('로그인 요청 중 오류 발생:', error)
        alert('서버 오류가 발생했습니다.')
      })
  }
})

// -----------------------------------------

// document.addEventListener('DOMContentLoaded', function () {
//   console.log('로그인페이지 로드완료')

//   const loginButton = document.querySelector('.loginBtn button')
//   if (loginButton) {
//     loginButton.addEventListener('click', function (event) {
//       alert('로그인 버튼이 클릭되었습니다.')
//       event.preventDefault() // 기본 폼 제출 방지
//       validateLoginForm()
//     })
//   }

//   function validateLoginForm() {
//     // 입력 값 가져오기
//     const userId = document.getElementById('userId').value
//     const password = document.getElementById('password').value

//     // 오류 메시지 초기화
//     let errorMessage = ''

//     // 아이디가 비어 있으면 오류 메시지
//     if (!userId) {
//       errorMessage += '아이디를 입력해주세요.\n'
//     }

//     // 비밀번호가 비어 있으면 오류 메시지
//     if (!password) {
//       errorMessage += '비밀번호를 입력해주세요.\n'
//     }
//     if (errorMessage) {
//       alert(errorMessage)
//       return
//     }

//     console.log('아이디:', userId, '비밀번호:', password)

//     fetch('/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ userId, password }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('서버 응답 오류')
//         }
//         return response.json()
//       })
//       .then((data) => {
//         if (data.success) {
//           alert('로그인 성공!')
//           window.location.href = '/index.html'
//         } else {
//           alert('로그인 실패: ' + data.message)
//         }
//       })
//       .catch((error) => {
//         console.error('로그인 요청 중 오류 발생:', error)
//         alert('서버 오류가 발생했습니다.')
//       })
//   }
// })
// -------------------

// 만약 아이디나 비밀번호가 비어 있지 않다면, 아이디와 비밀번호 확인
// if (userId && password) {
//   // 아이디와 비밀번호 검증 (예시: 아이디는 "test", 비밀번호는 "1234")
//   if (userId !== 'test' || password !== '1234') {
//     errorMessage += '아이디나 비밀번호가 틀렸습니다. 다시 입력해주세요.\n'
//   }
// }

// // 오류 메시지가 있다면 alert로 표시하고 폼 제출을 막음
// if (errorMessage) {
//   alert(errorMessage)
// } else {
//   // 유효한 입력일 경우 폼 제출 (여기서는 /index.html로 이동)
//   window.location.href = '/index.html'
// }

// return false

// 이벤트 리스너 등록
// const form = document.querySelector('form')
// form.addEventListener('submit', validateLoginForm)
// const form = document.querySelector('form')
// if (form) {
//   form.addEventListener('submit', function (event) {
//     event.preventDefault()
//     validateLoginForm()
//   })
// }
