export function loadHeader() {
  console.log("헤더 로드됨");
  document.body.insertAdjacentHTML(
    "afterbegin",
    "<header><h1>공통 헤더</h1></header>"
  );
}
