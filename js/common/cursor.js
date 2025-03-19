(function () {
  const style = document.createElement("style");
  document.head.appendChild(style);

  style.innerHTML = `
.cursor-shadow {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: transparent; /* 기본 상태에서는 배경이 없고 */
  border: 3px solid rgba(0, 0, 0, 0.3); /* 테두리만 보이게 설정 */
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-out;
  z-index: 9999;
  will-change: transform; /* 성능 향상 */
  cursor: none; /* 기본 커서를 숨깁니다 */
}

/* 호버 시 효과 */
.cursor-shadow:hover {
  background-color: rgba(0, 0, 0, 0.3); /* 배경색을 채워줌 */
  border-color: transparent; /* 테두리 색을 투명하게 */
  filter: invert(1); /* 색상 반전 효과 */
  transform: translate(-50%, -50%) scale(1.5); /* 그림자 크기를 확대 */
}
  // 마우스커서 테스트중

  `;

  let cursorShadow = document.querySelector(".cursor-shadow");
  if (!cursorShadow) {
    cursorShadow = document.createElement("div");
    cursorShadow.classList.add("cursor-shadow");
    document.body.appendChild(cursorShadow);
  }

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursorShadow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.01,
      ease: "power2.out",
    });
  });
})();
