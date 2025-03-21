import { popStoryItems, addPopStoryItems } from './popStoryItems.js'

const gridContainer = document.querySelector('.popStoryListGrid')
const loadMoreBtn = document.querySelector('.popStoryListMoreBtn')

let currentIndex = 0
const itemsPerPage = 6
const allStories = [...popStoryItems, ...addPopStoryItems]

const updateGridItems = () => {
  allStories
    .slice(currentIndex, currentIndex + itemsPerPage)
    .forEach((item) => {
      const popStoryList = document.createElement('div')
      popStoryList.classList.add('popStoryGridItem')
      popStoryList.setAttribute('data-bg', item.bgColor)
      popStoryList.innerHTML = `
      <div class="textarea">
        <h3>${item.title}</h3>
        <p>${item.byArtist}</p>
      </div>
      <img src="${item.imgSrc}" alt="${item.subtitle}">
    `
      gridContainer.appendChild(popStoryList)

      // popStory 페이지로 연결
      popStoryList.addEventListener('click', () => {
        window.location.href = `/page/popStory.html?id=${item.id}`
      })
    })

  applyHoverEffects()
  currentIndex += itemsPerPage

  if (currentIndex >= allStories.length) {
    loadMoreBtn.style.display = 'none'
  }
}

loadMoreBtn.addEventListener('click', updateGridItems)

const applyHoverEffects = () => {
  if (window.matchMedia('(max-width: 1024px)').matches) return

  document.querySelectorAll('.popStoryGridItem').forEach((item) => {
    item.style.setProperty('--hover-bg', item.getAttribute('data-bg'))

    item.addEventListener('mouseenter', () => {
      item.classList.add('hover-effect')
      item.classList.remove('remove-effect')
    })

    item.addEventListener('mouseleave', () => {
      item.classList.add('remove-effect')
      item.classList.remove('hover-effect')
    })
  })
}

// 초기 아이템 로드
updateGridItems()
