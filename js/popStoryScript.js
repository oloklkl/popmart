import { popStoryItems, addPopStoryItems } from './popStoryItems.js';

document.addEventListener('DOMContentLoaded', () => {
  const itemId = parseInt(new URLSearchParams(window.location.search).get('id')) || 1;
  const allItems = [...popStoryItems, ...addPopStoryItems];
  const item = allItems.find((i) => i.id === itemId);
  const container = document.querySelector('.popStory-container');

  if (!item) {
    container.innerHTML = `
      <div class="error-message">
        <h2>Oops!</h2>
        <p>해당 스토리를 찾을 수 없습니다.</p>
        <a href="/popstoryList.html">목록으로 돌아가기</a>
      </div>
    `;
    return;
  }

  container.style.backgroundColor = item.bgColorDetail || '#111';
  gsap.to(container, {
    backgroundColor: getRandomPastelColor(),
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });

  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 85%)`;
  }

  // 텍스트 바인딩 및 분할
  document.querySelector('.pops-title').textContent = item.title;
  document.querySelector('.pops-subtitle').textContent = item.subtitle;
  document.querySelector('.poster-image').src = item.posterImgSrc;
  document.querySelector('.character-image').src = item.posterImgSrc;
  document.querySelector('.figures-image').src = item.characterImgSrc;

  const fullText = item.description;
  const splitIndex = Math.floor(fullText.length / 2);
  const firstHalf = fullText.slice(0, splitIndex).trim();
  const secondHalf = fullText.slice(splitIndex).trim();
  document.querySelector('.popstory-text-1').textContent = firstHalf;
  document.querySelector('.popstory-text-2').textContent = secondHalf;

  document.querySelector('.artist-info strong').textContent = item.artist;
  document.querySelector('.artist-p').textContent = item.artistDescription;

  // 태그 렌더링
  const tagContainer = document.querySelector('.tags');
  tagContainer.innerHTML = '';
  item.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagContainer.appendChild(span);
  });

  // 등장 애니메이션
  gsap.from('.popstory-inner', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });
  gsap.from('.pops-title', { x: -100, opacity: 0, duration: 1, delay: 0.2, ease: 'back.out(1.4)' });
  gsap.from('.character-image', { scale: 0.5, opacity: 0, duration: 1, delay: 0.5, ease: 'back.out(1.7)' });

  // 아티스트 아코디언
  const artistHeader = document.querySelector('.artist-header');
  const artistContent = document.querySelector('.artist-p');
  artistHeader.addEventListener('click', () => {
    artistContent.parentElement.classList.toggle('active');
    gsap.to(artistContent, {
      maxHeight: artistContent.parentElement.classList.contains('active') ? 200 : 0,
      opacity: artistContent.parentElement.classList.contains('active') ? 1 : 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  });

  // 이전 / 다음
  const currentIndex = allItems.findIndex((i) => i.id === itemId);
  const prevItem = allItems[currentIndex - 1];
  const nextItem = allItems[currentIndex + 1];

  if (prevItem) {
    document.querySelector('.prev-label').textContent = prevItem.title || 'PREV';
    document.querySelector('.prev-item').addEventListener('click', () => {
      window.location.href = `/popStory.html?id=${prevItem.id}`;
    });
  } else {
    document.querySelector('.prev-item').style.opacity = '0.3';
    document.querySelector('.prev-item').style.pointerEvents = 'none';
  }

  if (nextItem) {
    document.querySelector('.next-label').textContent = nextItem.title || 'NEXT';
    document.querySelector('.next-item').addEventListener('click', () => {
      window.location.href = `/popStory.html?id=${nextItem.id}`;
    });
  } else {
    document.querySelector('.next-item').style.opacity = '0.3';
    document.querySelector('.next-item').style.pointerEvents = 'none';
  }

  // 설명 토글
  const desc1 = document.querySelector('.product-description-1');
  const desc2 = document.querySelector('.product-description-2');

  document.querySelector('.toggle-description-btn-1').addEventListener('click', () => {
    desc1.classList.toggle('show');
    gsap.to(desc1, { autoAlpha: desc1.classList.contains('show') ? 1 : 0, duration: 0.4 });
  });

  document.querySelector('.toggle-description-btn-2').addEventListener('click', () => {
    desc2.classList.toggle('show');
    gsap.to(desc2, { autoAlpha: desc2.classList.contains('show') ? 1 : 0, duration: 0.4 });
  });

  // 태그 토글
  const tagBox = document.querySelector('.tag-container');
  const tagBtn = document.querySelector('.toggle-tag-btn');

  tagBtn.addEventListener('click', () => {
    tagBox.classList.toggle('show');
    gsap.to(tagBox, { autoAlpha: tagBox.classList.contains('show') ? 1 : 0, duration: 0.4 });
  });
});
