// cartButton.js
export function initCartButtons() {
  const existingButtons = document.querySelector(
    ".cart-button, .scroll-up-button"
  );

  if (!existingButtons) {
    fetch("/common/cartButton.html")
      .then((response) => response.text())
      .then((data) => {
        document.body.insertAdjacentHTML("beforeend", data);

        const scrollUpButton = document.querySelector(".scroll-up-button");
        if (scrollUpButton) {
          scrollUpButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        }

        const cartButton = document.querySelector(".cart-button");
        if (cartButton) {
          cartButton.addEventListener("click", () => {
            window.location.href = "/cart";
          });
        }
      })
      .catch((error) => console.error("Error loading cart buttons:", error));
  }
}

// 페이지 변경 시 버튼 초기화
function handlePageChange() {
  // 이전에 생성된 버튼 제거
  const cartButton = document.querySelector(".cart-button");
  const scrollUpButton = document.querySelector(".scroll-up-button");

  if (cartButton) cartButton.remove();
  if (scrollUpButton) scrollUpButton.remove();

  // 새로운 버튼 초기화
  initCartButtons();
}

// 페이지 로드 완료 시 초기화
document.addEventListener("DOMContentLoaded", initCartButtons);

// 페이지 변경 시 이벤트 (history API)
window.addEventListener("popstate", handlePageChange);

// 외부에서 페이지 변경을 알릴 수 있는 함수
function notifyPageChange() {
  handlePageChange();
}
