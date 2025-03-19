export function initCartButtons() {
  const cartButton = document.querySelector(".cart-btn");
  const scrollUpButton = document.querySelector(".scroll-up-btn");

  console.log("scrollUpButton:", scrollUpButton); // 추가된 코드

  if (scrollUpButton) {
    console.log("위로 이동 버튼 이벤트 리스너 추가됨"); // 추가된 코드
    scrollUpButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      console.log("페이지 맨 위로 이동함!"); // 추가된 코드
    });
  }

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      window.location.href = "http://127.0.0.1:5500/page/cart.html";
    });
  }
}

document.querySelector(".scroll-up-btn").addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0; // Safari 대응
  console.log("스크롤 강제 이동 실행됨!");
});

window.addEventListener("popstate", initCartButtons);
