// document.addEventListener("DOMContentLoaded", () => {
//   const searchBtn = document.getElementById("search-btn");
//   const closeBtn = document.getElementById("close");
//   const searchBox = document.getElementById("search-box");
//   const modalOverlay = document.getElementById("modal-overlay");
//   const searchInput = document.querySelector(".search-bar");
//   const recentSearches = document.getElementById("recent-searches");

//   function closeSearch() {
//     const searchModal = document.getElementById("modal-overlay");
//     const searchBox = document.getElementById("search-box");

//     if (searchModal && searchBox) {
//       searchModal.classList.remove("open");
//       searchBox.classList.remove("open");

//       // 애니메이션 후 모달 숨기기
//       setTimeout(() => {
//         searchModal.style.display = "none";
//       }, 500); // 애니메이션 시간 (500ms)
//     }
//   }

//   // 검색창 열기
//   if (searchBtn) {
//     searchBtn.addEventListener("click", () => {
//       searchBox.classList.add("open");
//       modalOverlay.classList.add("open");
//       modalOverlay.style.display = "block"; // 오버레이 표시
//     });
//   }

//   // 검색창 닫기
//   if (closeBtn) {
//     closeBtn.addEventListener("click", () => {
//       searchBox.classList.remove("open");
//       modalOverlay.classList.remove("open");
//       setTimeout(() => {
//         modalOverlay.style.display = "none"; // 애니메이션 후 숨김 처리
//       }, 500);
//     });
//   }

//   // 모달 오버레이 클릭 시 검색창 닫기
//   modalOverlay.addEventListener("click", () => {
//     searchBox.classList.remove("open");
//     modalOverlay.classList.remove("open");
//     modalOverlay.style.display = "none";
//   });

//   // 검색어 입력창에서 엔터키 누를 때 검색 수행
//   searchInput.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       performSearch(searchInput.value);
//     }
//   });

//   // 검색 버튼 클릭 시 검색 수행
//   searchBtn.addEventListener("click", function () {
//     performSearch(searchInput.value);
//   });

//   // 검색 수행 (쿼리 파라미터로 검색어 전달)
//   function performSearch(query) {
//     if (!query.trim()) return; // 공백인 경우 검색하지 않음

//     console.log("검색 실행: ", query);

//     // 검색어를 URL에 쿼리 파라미터로 추가
//     const currentUrl = new URL(window.location);
//     currentUrl.searchParams.set("query", query);
//     window.history.pushState({}, "", currentUrl); // URL 변경

//     if (isLoggedIn) saveSearchQuery(query); // 로그인 상태일 때만 검색어 저장
//     searchInput.value = ""; // 검색 후 입력값 초기화
//   }

//   // 최근 검색어 저장
//   function saveSearchQuery(query) {
//     let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
//     if (!searches.includes(query)) {
//       searches.unshift(query);
//       if (searches.length > 5) searches.pop(); // 5개 이상은 삭제
//       localStorage.setItem("recentSearches", JSON.stringify(searches));
//     }
//     renderRecentSearches();
//   }

//   // 최근 검색어 목록 표시
//   function renderRecentSearches() {
//     recentSearches.innerHTML = "";
//     const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
//     if (searches.length === 0) {
//       document.getElementById("recent-search-container").style.display = "none";
//       return;
//     }

//     document.getElementById("recent-search-container").style.display = "block";

//     searches.forEach((word) => {
//       const li = document.createElement("li");
//       li.style.display = "flex";
//       li.style.alignItems = "center";
//       li.style.justifyContent = "space-between";
//       li.style.padding = "5px 10px";
//       li.style.borderBottom = "1px solid #ddd";

//       const span = document.createElement("span");
//       span.textContent = word;
//       span.style.cursor = "pointer";
//       span.addEventListener("click", () => performSearch(word));

//       const deleteBtn = document.createElement("button");
//       deleteBtn.textContent = "X";
//       deleteBtn.classList.add("delete-btn");
//       deleteBtn.addEventListener("click", () => deleteSearchQuery(word));

//       li.appendChild(span);
//       li.appendChild(deleteBtn);
//       recentSearches.appendChild(li);
//     });
//   }

//   // 최근 검색어 삭제
//   function deleteSearchQuery(query) {
//     let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
//     searches = searches.filter((item) => item !== query);
//     localStorage.setItem("recentSearches", JSON.stringify(searches));
//     renderRecentSearches();
//   }
//   // 로그인 상태일 때만 최근 검색어 렌더링
//   if (isLoggedIn) renderRecentSearches();

//   // 브라우저 뒤로 가기 시 검색어 및 상태 복원
//   window.addEventListener("popstate", function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const query = urlParams.get("query");

//     if (query) {
//       searchInput.value = query;
//       performSearch(query); // 검색 실행
//     }
//   });
// });
