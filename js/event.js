import { items } from './eventList.js';

document.addEventListener('DOMContentLoaded', () => {
  const eventListContainer = document.querySelector('.event_list');

  let cursorShadow = document.querySelector('.cursor-shadow');
  if (!cursorShadow) {
    cursorShadow = document.createElement('div');
    cursorShadow.classList.add('cursor-shadow');
    document.body.appendChild(cursorShadow);
  }

  // 마우스 이동 시 검은색 원이 따라오도록 설정
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursorShadow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.01,
      ease: 'power2.out',
    });
  });

  items.forEach((items, index) => {
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
});
