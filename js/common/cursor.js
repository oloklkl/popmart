(function () {
  // GSAP 라이브러리 로드 확인
  if (typeof gsap === "undefined") {
    console.error(
      'GSAP 라이브러리가 필요합니다. <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>를 HTML에 추가하세요.'
    );
    return;
  }

  const style = document.createElement("style");
  document.head.appendChild(style);

  style.innerHTML = `
    .cursor-shadow {
      position: fixed; /* absolute 대신 fixed 사용 */
      width: 50px;
      height: 50px;
      background-color: transparent;
      border: 3px solid rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: width 0.5s, height 0.5s, background-color 0.5s, border-color 0.5s;
      z-index: 9999;
      will-change: transform;
    }

    /* 클릭 가능한 요소에 호버할 때의 커서 스타일 */
    .clickable-hover .cursor-shadow {
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.1);
      border-color: rgba(0, 0, 0, 0.5);
    }
  `;

  // 커서 그림자 요소 생성
  let cursorShadow = document.querySelector(".cursor-shadow");
  if (!cursorShadow) {
    cursorShadow = document.createElement("div");
    cursorShadow.classList.add("cursor-shadow");
    document.body.appendChild(cursorShadow);
  }

  // 클릭 가능한 요소들 선택 (버튼, 링크 등)
  const clickableElements = document.querySelectorAll(
    'a, button, [role="button"], input[type="submit"], .clickable'
  );

  // 클릭 가능한 요소에 마우스 오버 이벤트 추가
  clickableElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      document.body.classList.add("clickable-hover");
    });

    el.addEventListener("mouseleave", () => {
      document.body.classList.remove("clickable-hover");
    });
  });

  // 마우스 이동 이벤트 감지
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursorShadow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.15, // 약간 더 부드러운 움직임을 위해 조정
      ease: "power2.out",
    });
  });

  // 페이지를 벗어날 때 커서 숨기기
  document.addEventListener("mouseleave", () => {
    cursorShadow.style.opacity = "0";
  });

  // 페이지로 돌아올 때 커서 표시
  document.addEventListener("mouseenter", () => {
    cursorShadow.style.opacity = "1";
  });

  // 실제 마우스 커서 숨기기 (선택 사항)
  document.body.style.cursor = "none";
})();
