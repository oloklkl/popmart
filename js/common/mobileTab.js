export function loadmobileTabs() {
  console.log("탭 로드됨");
  document.body.insertAdjacentHTML(
    "afterbegin",
    "<nav><ul><li>탭1</li><li>탭2</li></ul></nav>"
  );
}
