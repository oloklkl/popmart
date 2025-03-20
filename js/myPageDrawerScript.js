// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM이 로드되었습니다.");

  // 전역 이벤트 리스너 설정
  setupEventListeners();

  // 로그인 상태에 따른 초기 설정
  updateMenuByLoginStatus();
});

// 모든 이벤트 리스너 설정
function setupEventListeners() {
  console.log("이벤트 리스너 설정 중...");

  // 헤더의 사용자 아이콘 이벤트 연결
  const userIcon = document.getElementById("user-icon");
  if (userIcon) {
    console.log("사용자 아이콘을 찾았습니다.");
    userIcon.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("사용자 아이콘이 클릭되었습니다.");
      toggleMenu();
    });
  } else {
    console.warn("사용자 아이콘(#user-icon)을 찾을 수 없습니다.");
  }

  // 모달 오버레이 클릭 이벤트 - 메뉴 닫기
  // const modalOverlay = document.getElementById("modal-overlay");
  // if (modalOverlay) {
  //   modalOverlay.addEventListener("click", function (event) {
  //     // 검색 관련 이벤트가 아닌 경우에만 메뉴 닫기
  //     if (!document.getElementById("search-box").classList.contains("open")) {
  //       console.log("오버레이가 클릭되었습니다.");
  //       closeMenu();
  //     }
  //   });
  // } else {
  //   console.warn("모달 오버레이(#modal-overlay)를 찾을 수 없습니다.");
  // }
  document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.getElementById("user-icon");
    const mypageMenu = document.getElementById("mypage-menu");
    const mypageOverlay = document.getElementById("modal-overlay-mypage-menu");

    // 마이페이지 메뉴 열기
    if (userIcon) {
      userIcon.addEventListener("click", () => {
        mypageMenu.classList.add("open");
        mypageOverlay.classList.add("open");
        mypageOverlay.style.display = "block";
      });
    }

    // 마이페이지 메뉴 닫기 (오버레이 클릭 시 닫힘)
    if (mypageOverlay) {
      mypageOverlay.addEventListener("click", () => {
        mypageMenu.classList.remove("open");
        mypageOverlay.classList.remove("open");
        setTimeout(() => {
          mypageOverlay.style.display = "none";
        }, 300);
      });
    }
  });

  // 뒤로가기 버튼 클릭 이벤트
  const beforeBtn = document.getElementById("beforeBtn");
  if (beforeBtn) {
    beforeBtn.addEventListener("click", function () {
      console.log("뒤로가기 버튼이 클릭되었습니다.");
      closeMenu();
    });
  } else {
    console.warn("뒤로가기 버튼(#beforeBtn)을 찾을 수 없습니다.");
  }

  // 로그아웃 버튼 이벤트
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      console.log("로그아웃 버튼이 클릭되었습니다.");
      logout();
    });
  } else {
    console.warn("로그아웃 버튼(#logoutBtn)을 찾을 수 없습니다.");
  }
}

// 로그인 상태에 따라 메뉴 표시 업데이트
function updateMenuByLoginStatus() {
  console.log("로그인 상태 확인 중...");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  console.log("로그인 상태:", isLoggedIn);

  const memberElement = document.getElementById("member");
  const nonMemberElement = document.getElementById("non-member");

  if (memberElement && nonMemberElement) {
    console.log("회원/비회원 요소를 찾았습니다.");
    memberElement.style.display = isLoggedIn ? "block" : "none";
    nonMemberElement.style.display = isLoggedIn ? "none" : "block";
  } else {
    console.warn(
      "회원(#member) 또는 비회원(#non-member) 요소를 찾을 수 없습니다."
    );
  }
}

// 메뉴 열기/닫기 토글 함수
function toggleMenu() {
  console.log("메뉴 토글 시도");
  const menu = document.getElementById("mypage-menu");
  const overlay = document.getElementById("modal-overlay");

  if (!menu || !overlay) {
    console.error("필수 요소를 찾을 수 없음:", { menu, overlay });
    return;
  }

  // 로그인 상태에 따라 다른 메뉴 표시
  updateMenuByLoginStatus();

  // 클래스를 사용하여 토글
  if (menu.classList.contains("open")) {
    // 메뉴가 열려있으면 닫기
    menu.classList.remove("open");
    menu.style.right = "-100%";
    overlay.classList.remove("open");
    overlay.style.display = "none";
    document.body.style.overflow = "";
    console.log("메뉴 닫힘");
  } else {
    // 메뉴가 닫혀있으면 열기
    menu.classList.add("open");
    menu.style.right = "0";
    overlay.classList.add("open");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
    console.log("메뉴 열림");
  }
}

// 메뉴 닫기 함수
function closeMenu() {
  console.log("메뉴 닫기 시도");
  const menu = document.getElementById("mypage-menu");
  const overlay = document.getElementById("modal-overlay");

  if (menu && overlay) {
    menu.classList.remove("open");
    menu.style.right = "-100%";
    overlay.classList.remove("open");
    overlay.style.display = "none";
    document.body.style.overflow = "";
    console.log("메뉴 닫힘");
  }
}

// 로그아웃 함수
function logout() {
  console.log("로그아웃 시도");
  // 로컬 스토리지에서 로그인 정보 삭제
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userId");
  console.log("로그인 정보가 삭제되었습니다.");

  // 로그인 상태 업데이트
  updateMenuByLoginStatus();

  // 메뉴 닫기
  closeMenu();

  // 로그인 페이지로 이동
  console.log("로그인 페이지로 이동합니다.");
  window.location.href = "/page/myPage/login.html";
}
