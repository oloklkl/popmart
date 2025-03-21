export function initCartButtons() {
  const cartButton = document.querySelector(".cart-btn");
  const scrollUpButton = document.querySelector(".scroll-up-btn");

  console.log("📌 cartButton:", cartButton);
  console.log("📌 scrollUpButton:", scrollUpButton);

  if (!cartButton) {
    console.warn("🚨 장바구니 버튼을 찾을 수 없습니다!");
  }

  if (!scrollUpButton) {
    console.warn("🚨 스크롤 업 버튼을 찾을 수 없습니다!");
  }

  if (scrollUpButton) {
    scrollUpButton.removeEventListener("click", scrollToTop);
    scrollUpButton.addEventListener("click", scrollToTop);
    console.log("⬆️ 위로 이동 버튼 이벤트 리스너 추가됨!");
  }

  if (cartButton) {
    cartButton.removeEventListener("click", goToCart);
    cartButton.addEventListener("click", goToCart);
    console.log("🛒 장바구니 버튼 클릭 이벤트 추가됨!");
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  console.log("⬆️ 페이지 맨 위로 이동함!");
}

function goToCart() {
  console.log("🛒 장바구니 페이지로 이동!");
  window.location.href = "/page/cart.html";
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("🌟 DOM 로드 완료! 버튼 이벤트 등록 시작");
  initCartButtons();
});

window.addEventListener("popstate", initCartButtons);
