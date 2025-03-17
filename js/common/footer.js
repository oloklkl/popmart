export function loadFooter() {
  console.log("푸터 로드됨");
  document.body.insertAdjacentHTML(
    "beforeend",
    "<footer><p>공통 푸터</p></footer>"
  );
}
