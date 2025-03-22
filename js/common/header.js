let isLoggedIn = false;

function toggleSearch() {
  console.log("toggleSearch 함수 호출됨");
  const searchModal = document.getElementById("modal-overlay");

  if (!searchModal) {
    console.error("searchModal 요소를 찾을 수 없습니다!");
    return;
  }

  searchModal.classList.toggle("open");

  // 모달 상태 확인 후 출력
  if (searchModal.classList.contains("open")) {
    console.log("모달 상태: 숨김");
  } else {
    console.log("모달 상태: 표시");
  }
}

function closeSearch() {
  const searchModal = document.getElementById("close");
  if (searchModal) {
    searchModal.classList.add("hidden");
  }
}

function toggleUserMenu() {
  const userMenu = document.getElementById("modal-overlay-mypage-menu");
  const loggedInMenu = document.getElementById("loggedInMenu");
  const loggedOutMenu = document.getElementById("loggedOutMenu");

  if (userMenu) {
    userMenu.classList.toggle("hidden");

    if (isLoggedIn) {
      loggedInMenu.classList.remove("hidden");
      loggedOutMenu.classList.add("hidden");
    } else {
      loggedOutMenu.classList.remove("hidden");
      loggedInMenu.classList.add("hidden");
    }
  }
}
function toggleUserMenu() {
  const userMenu = document.getElementById("modal-overlay-mypage-menu");
  console.log("modal-overlay-mypage-menu 함수 호출됨");

  if (userMenu) {
    userMenu.classList.toggle("hidden");
  } else {
    console.error("유저 메뉴 요소가 존재하지 않습니다.");
  }
}

function login() {
  isLoggedIn = true;
  toggleUserMenu();
}

function logout() {
  isLoggedIn = false;
  toggleUserMenu();
}

window.toggleSearch = toggleSearch;
window.closeSearch = closeSearch;
window.toggleUserMenu = toggleUserMenu;
window.login = login;
window.logout = logout;
