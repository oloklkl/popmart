import { items } from './eventList.js';

document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth <= 600;
  const eventListContainer = document.querySelector('.event_list');
  const eventDetailMain = document.querySelector('.event_detail_main');
  const eventDetailContainer = document.querySelector('.event_detail');

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = parseInt(urlParams.get('id'));

  const eventData = items.find((item) => item.id === eventId);
  if (eventData) {
    eventListContainer.innerHTML = '';
    const selectedEventElement = document.createElement('a');
    selectedEventElement.classList.add('event_item');
    selectedEventElement.href = '#';

    selectedEventElement.innerHTML = `
      <div class="event_item_name">${eventData.name}</div>
      <div class="event_item_Enname">${eventData.EngName}</div>
      <div class="event_item_date">${eventData.date}</div>
    `;

    eventListContainer.appendChild(selectedEventElement);
    eventDetailMain.innerHTML = `
      <div class="image_area">
        <img class="event_image" src="${eventData.mainImg}" />
      </div>
      <div class="text_area">
        <span class="text_area_big">${eventData.name}</span>
        <span class="text_area_label">${eventData.EngName}</span>
      </div>
    `;
    eventDetailContainer.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
      const title = eventData[`comp${i}`];
      const EngTitle = eventData[`comp${i}Eng`];
      const image = eventData[`comp${i}Img`];

      if (title && EngTitle && image) {
        const detailElement = document.createElement('div');
        detailElement.classList.add(`event_detail_${['first', 'second', 'third', 'fourth'][i - 1]}`);
        if (isMobile) {
          detailElement.innerHTML = `
            <div class="text_area">
              ${title}
              <span class="text_area_label">${EngTitle}</span>
            </div>
            <div class="image_area">
              <img src="${image}" />
            </div>
          `;
        } else {
          if (i % 2 === 1) {
            detailElement.innerHTML = `
              <div class="text_area">
                ${title}
                <span class="text_area_label">${EngTitle}</span>
              </div>
              <div class="image_area">
                <img src="${image}" />
              </div>
            `;
          } else {
            detailElement.innerHTML = `
              <div class="image_area">
                <img src="${image}" />
              </div>
              <div class="text_area">
                ${title}
                <span class="text_area_label">${EngTitle}</span>
              </div>
            `;
          }
        }

        eventDetailContainer.appendChild(detailElement);
      }
    }
  }
});
