let isLoggedIn = false;

function toggleSearch() {
  console.log("toggleSearch 함수 호출됨");
  const searchModal = document.getElementById("searchModal");

  if (!searchModal) {
    console.error("searchModal 요소를 찾을 수 없습니다!");
    return;
  }

  searchModal.classList.toggle("hidden");

  if (!searchModal.classList.contains("hidden")) {
    searchModal.style.display = "flex";
  } else {
    searchModal.style.display = "none";
  }

  console.log(
    "모달 상태:",
    searchModal.classList.contains("hidden") ? "숨김" : "표시"
  );
}

function closeSearch() {
  const searchModal = document.getElementById("searchModal");
  if (searchModal) {
    searchModal.classList.add("hidden");
  }
}

function toggleUserMenu() {
  const userMenu = document.getElementById("userMenu");
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

//현경님 추가 필요
