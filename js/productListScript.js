import items from './productListItems.js';
import { initSwiper } from './productListSwiper.js';

export function initializePage() {
<<<<<<< HEAD
  setTimeout(() => {
    if (typeof Swiper === 'undefined') {
      console.error('Swiper not found');
      return;
    }
    runProductListScripts();
  }, 500);
=======
    setTimeout(() => {
        if (typeof Swiper === 'undefined') {
            console.error('Swiper not found');
            return;
        }
        runProductListScripts();
    }, 500);
>>>>>>> 32f53cf1f61adcc3effd65153beedb9e03eb0365
}

document.addEventListener('mousemove', handleMouseMove);

// 마우스 움직임
function handleMouseMove(e) {
<<<<<<< HEAD
  const circle = document.getElementById('circle');
  if (circle) {
    circle.style.left = e.clientX + 'px';
    circle.style.top = e.clientY + 'px';
  }
=======
    const circle = document.getElementById('circle');
    if (circle) {
        circle.style.left = e.clientX + 'px';
        circle.style.top = e.clientY + 'px';
    }
>>>>>>> 32f53cf1f61adcc3effd65153beedb9e03eb0365
}

// 아이템 호버
function handleItemHover(e) {
<<<<<<< HEAD
  const circle = document.getElementById('circle');
  if (circle) {
    circle.classList.add('hovered');
    circle.style.opacity = '1';
  }
=======
    const circle = document.getElementById('circle');
    if (circle) {
        circle.classList.add('hovered');
        circle.style.opacity = '1';
    }
>>>>>>> 32f53cf1f61adcc3effd65153beedb9e03eb0365
}

// 아이템 호버 해제
function handleItemLeave(e) {
<<<<<<< HEAD
  const circle = document.getElementById('circle');
  if (circle) {
    circle.classList.remove('hovered');
    circle.style.opacity = '0';
  }
}

function runProductListScripts() {
  const gridContainer = document.querySelector('.grid-container');
  if (!gridContainer) {
    console.error('Grid container not found');
    return;
  }

  const itemsPerPage = 9;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const circleElement = document.getElementById('circle');
  gridContainer.innerHTML = '';

  gridContainer.classList.add('swiper');

  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'swiper-pagination';

  const nextButton = document.createElement('div');
  nextButton.className = 'swiper-button-next';

  const prevButton = document.createElement('div');
  prevButton.className = 'swiper-button-prev';

  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'grid-wrapper-inner swiper-wrapper';

  for (let page = 0; page < totalPages; page++) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'grid-page swiper-slide';

    const startIndex = page * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items.length);

    for (let i = startIndex; i < endIndex; i++) {
      const item = items[i];
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';

      const imgElement = document.createElement('img');
      imgElement.src = item.imgSrc;
      imgElement.alt = item.title;
      imgElement.onerror = function () {
        this.onerror = null;
        this.src = '/images/placeholder.png';
      };

      const titleElement = document.createElement('h3');
      titleElement.textContent = item.title;

      const priceElement = document.createElement('p');
      priceElement.textContent = item.price;

      const detailsDiv = document.createElement('div');
      detailsDiv.appendChild(titleElement);
      detailsDiv.appendChild(priceElement);

      gridItem.appendChild(imgElement);
      gridItem.appendChild(detailsDiv);
      gridItem.addEventListener('mouseenter', handleItemHover);
      gridItem.addEventListener('mouseleave', handleItemLeave);
      pageDiv.appendChild(gridItem);
    }
    wrapperDiv.appendChild(pageDiv);
  }

  gridContainer.appendChild(wrapperDiv);
  gridContainer.appendChild(paginationDiv);
  gridContainer.appendChild(nextButton);
  gridContainer.appendChild(prevButton);

  initSwiper();
=======
    const circle = document.getElementById('circle');
    if (circle) {
        circle.classList.remove('hovered');
        circle.style.opacity = '0';
    }
}

function runProductListScripts() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }

    const itemsPerPage = 9;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const circleElement = document.getElementById('circle');
    gridContainer.innerHTML = '';

    gridContainer.classList.add('swiper');

    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'swiper-pagination';

    const nextButton = document.createElement('div');
    nextButton.className = 'swiper-button-next';

    const prevButton = document.createElement('div');
    prevButton.className = 'swiper-button-prev';

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'grid-wrapper-inner swiper-wrapper';

    for (let page = 0; page < totalPages; page++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'grid-page swiper-slide';

        const startIndex = page * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, items.length);

        for (let i = startIndex; i < endIndex; i++) {
            const item = items[i];
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';

            const imgElement = document.createElement('img');
            imgElement.src = item.imgSrc;
            imgElement.alt = item.title;
            imgElement.onerror = function () {
                this.onerror = null;
                this.src = '/images/placeholder.png';
            };

            const titleElement = document.createElement('h3');
            titleElement.textContent = item.title;

            const priceElement = document.createElement('p');
            priceElement.textContent = item.price;

            const detailsDiv = document.createElement('div');
            detailsDiv.appendChild(titleElement);
            detailsDiv.appendChild(priceElement);

            gridItem.appendChild(imgElement);
            gridItem.appendChild(detailsDiv);
            gridItem.addEventListener('mouseenter', handleItemHover);
            gridItem.addEventListener('mouseleave', handleItemLeave);
            pageDiv.appendChild(gridItem);
        }
        wrapperDiv.appendChild(pageDiv);
    }

    gridContainer.appendChild(wrapperDiv);
    gridContainer.appendChild(paginationDiv);
    gridContainer.appendChild(nextButton);
    gridContainer.appendChild(prevButton);

    initSwiper();
>>>>>>> 32f53cf1f61adcc3effd65153beedb9e03eb0365
}
