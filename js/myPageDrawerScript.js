// // myPageDrawer.js

// document.addEventListener('DOMContentLoaded', () => {
//   setupEventListeners();
//   updateMenuByLoginStatus();
// });

// // 사용자 메뉴 열고 닫는 토글 함수
// function toggleUserMenu() {
//   const overlay = document.getElementById('modal-overlay-mypage-menu');
//   const menu = document.getElementById('mypage-menu');
//   const member = document.getElementById('member');
//   const nonMember = document.getElementById('non-member');

//   if (!overlay || !menu) return;

//   const isOpen = overlay.classList.contains('open');

//   if (isOpen) {
//     overlay.classList.remove('open');
//     menu.classList.remove('open');
//     setTimeout(() => {
//       overlay.style.display = 'none';
//     }, 300);
//   } else {
//     overlay.classList.add('open');
//     menu.classList.add('open');
//     overlay.style.display = 'block';

//     const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     if (loggedIn) {
//       member.style.display = 'block';
//       nonMember.style.display = 'none';
//     } else {
//       member.style.display = 'none';
//       nonMember.style.display = 'block';
//     }
//   }
// }

// function closeMyPage() {
//   const overlay = document.getElementById('modal-overlay-mypage-menu');
//   const menu = document.getElementById('mypage-menu');
//   if (!overlay || !menu) return;

//   overlay.classList.remove('open');
//   menu.classList.remove('open');
//   setTimeout(() => {
//     overlay.style.display = 'none';
//   }, 300);
// }

// function logout() {
//   console.log('로그아웃 시도');
//   localStorage.removeItem('isLoggedIn');
//   localStorage.removeItem('userId');
//   updateMenuByLoginStatus();
//   closeMyPage();
//   console.log('로그인 페이지로 이동합니다.');
//   window.location.href = '/page/myPage/login.html';
// }

// // 로그인 상태에 따라 UI 갱신
// function updateMenuByLoginStatus() {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   const memberElement = document.getElementById('member');
//   const nonMemberElement = document.getElementById('non-member');

//   if (memberElement && nonMemberElement) {
//     memberElement.style.display = isLoggedIn ? 'block' : 'none';
//     nonMemberElement.style.display = isLoggedIn ? 'none' : 'block';
//   }
// }

// // 이벤트 연결
// function setupEventListeners() {
//   const userIcon = document.getElementById('user-icon');
//   const closeBtn = document.getElementById('close');
//   const overlay = document.getElementById('modal-overlay-mypage-menu');
//   const beforeBtn = document.getElementById('beforeBtn');
//   const logoutBtn = document.getElementById('logoutBtn');

//   if (userIcon) {
//     userIcon.addEventListener('click', toggleUserMenu);
//   }

//   if (overlay) {
//     overlay.addEventListener('click', closeMyPage);
//   }

//   if (closeBtn) {
//     closeBtn.addEventListener('click', closeMyPage);
//   }

//   if (beforeBtn) {
//     beforeBtn.addEventListener('click', closeMyPage);
//   }

//   if (logoutBtn) {
//     logoutBtn.addEventListener('click', logout);
//   }
// }

// // 필요 함수 전역 등록 (onclick 대응)
// window.toggleUserMenu = toggleUserMenu;
// window.closeMyPage = closeMyPage;
// window.logout = logout;
