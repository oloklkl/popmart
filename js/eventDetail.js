import { items } from './eventList.js';

document.addEventListener('DOMContentLoaded', () => {
  const eventDetailMain = document.querySelector('.event_detail_main');
  const eventDetailContainer = document.querySelector('.event_detail');

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = parseInt(urlParams.get('id'));

  const eventData = items.find((item) => item.id === eventId);
});
