import { items } from './eventList.js';

document.addEventListener('DOMContentLoaded', () => {
  const eventListContainer = document.querySelector('.event_list');
  const itemsPerPage = 7;
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const pagination = document.createElement('div');
  pagination.id = 'pagination';
  document.body.appendChild(pagination);

  const isMobile = window.innerWidth <= 600;

  function getPaginatedItems(page) {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }

  function renderEventList() {
    eventListContainer.innerHTML = '';
    const paginatedItems = getPaginatedItems(currentPage);

    paginatedItems.forEach((items, index) => {
      const eventElement = document.createElement('a');
      const cursor = document.createElement('div');
      cursor.classList.add('cursor');
      document.body.appendChild(cursor);
      eventElement.classList.add('event_item');
      eventElement.href = '/page/eventDetail.html';
      eventElement.id = `item_${index + 1}`;

      eventElement.innerHTML = `
      <div class="event_item_name">${items.name}</div>
      <div class="event_item_Enname">${items.EngName}</div>
      <div class="event_item_date">${items.date}</div>
      <div class="event_item_state">진행중</div>
      <div class="event_item_border"></div>
    `;
      eventElement.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = `/page/eventDetail.html?id=${items.id}`;
      });

      eventListContainer.appendChild(eventElement);
    });
    renderPagination();
  }
  function renderPagination() {
    pagination.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>`;
    prevBtn.classList.add('arrow-btn', 'prev');
    if (currentPage === 1) prevBtn.classList.add('disabled');

    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderEventList();
      }
    });
    pagination.appendChild(prevBtn);

    for (let page = 1; page <= totalPages; page++) {
      const pageBtn = document.createElement('button');
      pageBtn.textContent = page;
      pageBtn.classList.add('page-btn');
      if (page === currentPage) pageBtn.classList.add('active');

      pageBtn.addEventListener('click', () => {
        currentPage = page;
        renderEventList();
      });

      pagination.appendChild(pageBtn);
    }
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    nextBtn.classList.add('arrow-btn', 'next');
    if (currentPage === totalPages) nextBtn.classList.add('disabled');

    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderEventList();
      }
    });
    pagination.appendChild(nextBtn);
  }

  const hoverBg = document.createElement('div');
  hoverBg.classList.add('event_hover_bg');
  eventListContainer.appendChild(hoverBg);
  const bgColors = {
    item_1: '#ddff47',
    item_2: '#5bfff1',
    item_3: '#ff2e2e',
    item_4: '#9c40ff',
    item_5: '#ffe23a',
    item_6: '#83ffa4',
    item_7: '#f985ff',
  };
  const eventItems = document.querySelectorAll('.event_item');

  eventItems.forEach((item) => {
    const itemId = item.id;
    item.addEventListener('mouseenter', () => {
      const itemRect = item.getBoundingClientRect();
      const listRect = eventListContainer.getBoundingClientRect();
      const offsetY = itemRect.top - listRect.top;
      const offsetX = -listRect.left;

      gsap.killTweensOf(hoverBg);
      gsap.set(hoverBg, { backgroundColor: bgColors[itemId] });
      gsap.to(hoverBg, {
        y: offsetY,
        x: offsetX,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });
  function init() {
    renderEventList();
    addHoverEffect();
  }

  init();
});
