// productListScript.js

import items from "./productListItems.js";
import { initSwiper } from "./productListSwiper.js";

export function initializePage() {
  setTimeout(() => {
    if (typeof Swiper === "undefined") {
      console.error("Swiper not found");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    const filteredItems = category ? filterProducts(category) : items;
    runProductListScripts(filteredItems);
    waitForSwiper(initSwiper);
  }, 500);
}

function waitForSwiper(callback) {
  const checkSwiper = setInterval(() => {
    if (typeof window.Swiper !== "undefined") {
      console.log("✅ Swiper 라이브러리 로드 완료");
      clearInterval(checkSwiper);
      callback();
    }
  }, 300);
}

function filterProducts(category) {
  return items.filter((item) => item.category === category);
}

function runProductListScripts(productItems) {
  const gridContainer = document.querySelector(".grid-container");
  if (!gridContainer) return console.error("Grid container not found");

  const isMobile = window.innerWidth <= 599;
  const itemsPerPage = isMobile ? 6 : 9;
  const totalPages = Math.ceil(productItems.length / itemsPerPage);

  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "grid-wrapper-inner swiper-wrapper";

  for (let page = 0; page < totalPages; page++) {
    const pageDiv = document.createElement("div");
    pageDiv.className = "grid-page swiper-slide";

    const startIndex = page * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, productItems.length);

    for (let i = startIndex; i < endIndex; i++) {
      const item = productItems[i];
      const gridItem = document.createElement("a");
      gridItem.href = `/page/productPage/productDetail.html?id=${item.id}`;
      gridItem.className = "grid-item";

      const imgElement = document.createElement("img");
      imgElement.src = item.imgSrc;
      imgElement.alt = item.title;
      imgElement.onerror = () => (imgElement.src = "/images/placeholder.png");

      const detailsDiv = document.createElement("div");
      detailsDiv.className = "grid-item-details";

      const infoDiv = document.createElement("div");
      infoDiv.className = "grid-item-info";

      const titleElement = document.createElement("h3");
      titleElement.className = "grid-item-title";
      titleElement.textContent = item.title;

      const priceElement = document.createElement("p");
      priceElement.className = "grid-item-price";
      priceElement.textContent = item.price;

      const arrowDiv = document.createElement("div");
      arrowDiv.className = "grid-item-arrow";
      const arrowIcon = document.createElement("img");
      arrowIcon.src =
        "https://raw.githubusercontent.com/hyeonky/dp-static/main/popmart/btnIcon/arrow-right.svg";
      arrowIcon.alt = "Arrow Icon";
      arrowIcon.className = "arrow-icon";
      arrowDiv.appendChild(arrowIcon);

      infoDiv.appendChild(titleElement);
      infoDiv.appendChild(priceElement);
      detailsDiv.appendChild(infoDiv);
      detailsDiv.appendChild(arrowDiv);

      gridItem.appendChild(imgElement);
      gridItem.appendChild(detailsDiv);
      pageDiv.appendChild(gridItem);

      // 클릭 이벤트 리스너 추가
      gridItem.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = `/page/productPage/productDetail.html?id=${item.id}`;
      });
    }
    wrapperDiv.appendChild(pageDiv);
  }
  gridContainer.appendChild(wrapperDiv);
  setTimeout(initSwiper, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("/common/header.html").then((res) => res.text()),
    fetch("/common/footer.html").then((res) => res.text()),
  ])
    .then(([headerHTML, footerHTML]) => {
      document.getElementById("header").innerHTML = headerHTML;
      document.getElementById("footer").innerHTML = footerHTML;
    })
    .catch((error) => console.error("Error loading common components:", error));
});
