import { items } from './eventList.js';

document.addEventListener('DOMContentLoaded', () => {
  const eventListContainer = document.querySelector('.event_list');

  items.forEach((items, index) => {
    const eventElement = document.createElement('a');
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

    eventListContainer.appendChild(eventElement);
  });
});
