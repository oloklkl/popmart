// document.body.style.cursor = "none";

// document.addEventListener("DOMContentLoaded", function () {
//   console.log("DOM 로드 완료, 커서 스크립트 시작");

//   if (typeof gsap === "undefined") {
//     console.error("GSAP 라이브러리가 필요합니다.");
//     return;
//   }

//   let cursor = document.querySelector(".cursor-shadow");
//   if (!cursor) {
//     cursor = document.createElement("div");
//     cursor.classList.add("cursor-shadow");

//     cursor.style.position = "fixed";
//     cursor.style.width = "100px";
//     cursor.style.height = "100px";
//     cursor.style.border = "2px solid #000";
//     cursor.style.borderRadius = "50%";
//     cursor.style.pointerEvents = "none";
//     cursor.style.zIndex = "99999";
//     cursor.style.backgroundColor = "transparent";
//     cursor.style.overflow = "hidden";

//     const innerLayer = document.createElement("div");
//     innerLayer.classList.add("cursor-inner-layer");
//     innerLayer.style.width = "100%";
//     innerLayer.style.height = "100%";
//     innerLayer.style.position = "absolute";
//     innerLayer.style.top = "0";
//     innerLayer.style.left = "0";
//     innerLayer.style.pointerEvents = "none";
//     innerLayer.style.backgroundColor = "transparent";

//     const cursorImage = document.createElement("img");
//     cursorImage.classList.add("cursor-image");
//     cursorImage.src =
//       "https://raw.githubusercontent.com/hyeonky/dp-static/refs/heads/main/popmart/btnIcon/navigation.png";
//     cursorImage.style.width = "40%";
//     cursorImage.style.height = "40%";
//     cursorImage.style.position = "absolute";
//     cursorImage.style.top = "50%";
//     cursorImage.style.left = "50%";
//     cursorImage.style.transform = "translate(-50%, -50%)";
//     cursorImage.style.pointerEvents = "none";

//     innerLayer.appendChild(cursorImage);
//     cursor.appendChild(innerLayer);
//     document.body.appendChild(cursor);
//     console.log("커서 요소 생성됨");
//   }

//   let prevX = 0;
//   let prevY = 0;
//   let moveX = 0;
//   let moveY = 0;
//   let currentRotation = 0;

//   document.addEventListener("mousemove", (e) => {
//     if (cursor) {
//       const offsetX = cursor.offsetWidth / 2;
//       const offsetY = cursor.offsetHeight / 2;

//       gsap.to(cursor, {
//         left: e.clientX - offsetX + "px",
//         top: e.clientY - offsetY + "px",
//         duration: 0.15,
//         ease: "power2.out",
//       });

//       moveX = e.clientX - prevX;
//       moveY = e.clientY - prevY;

//       if (Math.abs(moveX) > 3 || Math.abs(moveY) > 3) {
//         const angle = Math.atan2(-moveY, -moveX);
//         const degrees = angle * (180 / Math.PI);

//         currentRotation = currentRotation * 0.8 + degrees * 0.2;

//         const cursorImage = cursor.querySelector(".cursor-image");
//         if (cursorImage) {
//           gsap.to(cursorImage, {
//             rotation: currentRotation,
//             duration: 0.3,
//             ease: "power2.out",
//           });
//         }
//       }

//       prevX = e.clientX;
//       prevY = e.clientY;
//     }
//   });

//   const hoverElements = document.querySelectorAll(
//     'a, button, [role="button"], input, select, textarea, img, li, [tabindex="0"]'
//   );

//   hoverElements.forEach((el) => {
//     el.style.cursor = "none";
//     el.addEventListener("mouseenter", () => {
//       gsap.to(cursor, {
//         scale: 1.2,
//         duration: 0.3,
//         backdropFilter: "blur(3px)",
//       });
//     });

//     el.addEventListener("mouseleave", () => {
//       gsap.to(cursor, {
//         scale: 1,
//         duration: 0.3,
//       });

//       const innerLayer = cursor.querySelector(".cursor-inner-layer");
//       if (innerLayer) {
//         gsap.to(innerLayer, {
//           backgroundColor: "transparent",
//           duration: 0.3,
//         });
//       }
//     });
//   });

//   console.log("커서 스크립트 설정 완료");
// });
