import { popStoryListItems, additionalStories } from './popStoryListItems.js'

const gridContainer = document.querySelector('.grid')

// '더보기' 버튼
const loadMoreBtn = document.createElement('button')
loadMoreBtn.classList.add('moreBtn')
loadMoreBtn.textContent = '더보기'
document.querySelector('.popStoryListContainer').appendChild(loadMoreBtn)

let currentIndex = 0
const itemsPerPage = 6
const allStories = [...popStoryListItems, ...additionalStories]

// HTML 요소 생성 함수
const createGridItem = ({ title, subtitle, imgSrc, alt, bgColor }) => {
  const link = document.createElement('a')
  link.href = '#'
  link.classList.add('link')

  const gridItem = document.createElement('div')
  gridItem.classList.add('grid-item')
  gridItem.setAttribute('data-bg', bgColor)

  const textArea = document.createElement('div')
  textArea.classList.add('textarea')
  textArea.innerHTML = `<h3>${title}</h3><p>${subtitle}</p>`

  const img = document.createElement('img')
  img.src = imgSrc
  img.alt = alt

  gridItem.appendChild(textArea)
  gridItem.appendChild(img)
  link.appendChild(gridItem)

  return link
}

// "더보기" 버튼 클릭 렌더링
const renderGridItems = () => {
  const slicedStories = allStories.slice(0, currentIndex + itemsPerPage)
  gridContainer.innerHTML = ''

  slicedStories.forEach((item) => {
    gridContainer.appendChild(createGridItem(item))
  })

  applyHoverEffects()

  if (slicedStories.length >= allStories.length) {
    loadMoreBtn.style.display = 'none'
  }
}

// "더보기" 버튼 클릭
loadMoreBtn.addEventListener('click', () => {
  currentIndex += itemsPerPage
  renderGridItems()
})

// hover 효과
const applyHoverEffects = () => {
  const mediaQuery = window.matchMedia('(max-width: 1024px)')

  document.querySelectorAll('.grid-item').forEach((item) => {
    const hoverBg = item.getAttribute('data-bg')
    item.style.setProperty('--hover-bg', hoverBg)

    if (!mediaQuery.matches) {
      item.addEventListener('mouseenter', () => {
        item.classList.remove('remove-effect')
        item.classList.add('hover-effect')
        item.querySelector('a').classList.add('hover-effect')
      })

      item.addEventListener('mouseleave', () => {
        item.classList.remove('hover-effect')
        item.classList.add('remove-effect')
        item.querySelector('a').classList.remove('hover-effect')
      })
    }
  })
}

// 실행
renderGridItems()
