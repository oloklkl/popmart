let isLoggedIn = false;

function toggleSearch() {
  console.log("toggleSearch 함수 호출됨");
  const searchModal = document.getElementById("searchModal");

  if (searchModal) {
    const isHidden = searchModal.classList.contains("hidden");

    if (isHidden) {
      searchModal.classList.remove("hidden");
      searchModal.style.display = "flex";
    } else {
      searchModal.classList.add("hidden");
      searchModal.style.display = "none";
    }

    console.log("모달 상태 변경됨:", isHidden ? "표시" : "숨김");
  }
}

function closeSearch() {
  const searchModal = document.getElementById("searchModal");
  if (searchModal) {
    searchModal.classList.add("hidden");
    searchModal.style.display = "none";
  }
}

function toggleUserMenu() {
  const userMenu = document.getElementById("userMenu");
  const loggedInMenu = document.getElementById("loggedInMenu");
  const loggedOutMenu = document.getElementById("loggedOutMenu");

  userMenu.classList.toggle("hidden");

  if (isLoggedIn) {
    loggedInMenu.classList.remove("hidden");
    loggedOutMenu.classList.add("hidden");
  } else {
    loggedOutMenu.classList.remove("hidden");
    loggedInMenu.classList.add("hidden");
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
