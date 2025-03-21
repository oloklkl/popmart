document.body.style.cursor = "none";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM 로드 완료, 커서 스크립트 시작");

  // GSAP 라이브러리 확인
  if (typeof gsap === "undefined") {
    console.error("GSAP 라이브러리가 필요합니다.");
    return;
  }

  // 커서 그림자 요소 생성
  let cursorShadow = document.querySelector(".cursor-shadow");
  if (!cursorShadow) {
    cursorShadow = document.createElement("div");
    cursorShadow.classList.add("cursor-shadow");

    // 인라인 스타일 직접 적용
    cursorShadow.style.position = "fixed";
    cursorShadow.style.width = "100px";
    cursorShadow.style.height = "100px";
    cursorShadow.style.border = "2px solid #000";
    cursorShadow.style.borderRadius = "50%";
    cursorShadow.style.pointerEvents = "none";
    cursorShadow.style.zIndex = "99999";
    cursorShadow.style.opacity = "1";

    document.body.appendChild(cursorShadow);
    console.log("커서 그림자 요소 생성됨");
  }

  // 마우스 이동 이벤트 감지
  document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".cursor-shadow");
    if (cursor) {
      // 중앙 정렬을 위해 offset 계산
      const offsetX = cursor.offsetWidth / 2;
      const offsetY = cursor.offsetHeight / 2;

      // GSAP 애니메이션 (left, top 속성 사용)
      gsap.to(cursor, {
        left: e.clientX - offsetX + "px",
        top: e.clientY - offsetY + "px",
        duration: 0.15,
        ease: "power2.out",
      });
    }
  });

  console.log("커서 스크립트 설정 완료");
});
