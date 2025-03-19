let isLoggedIn = false;

function toggleSearch() {
  document.getElementById("searchModal").classList.toggle("hidden");
}

function closeSearch() {
  document.getElementById("searchModal").classList.add("hidden");
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
