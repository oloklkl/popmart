import { popStoryItems, addPopStoryItems } from './popStoryItems.js'

const gridContainer = document.querySelector('.grid')
const loadMoreBtn = document.createElement('button')
loadMoreBtn.classList.add('moreBtn')
loadMoreBtn.textContent = '더보기'
document.querySelector('.popStoryListContainer').appendChild(loadMoreBtn)

let currentIndex = 0
const itemsPerPage = 6
const allStories = [...popStoryItems, ...addPopStoryItems]

const createGridItem = ({ title, byArtist, imgSrc, subtitle, bgColor }) => {
  const link = document.createElement('a')
  link.href = '#'
  link.classList.add('link')

  const gridItem = document.createElement('div')
  gridItem.classList.add('grid-item')
  gridItem.setAttribute('data-bg', bgColor)
  gridItem.innerHTML = `<div class="textarea"><h3>${title}</h3><p>${byArtist}</p></div>`

  const img = document.createElement('img')
  img.src = imgSrc
  img.alt = subtitle
  gridItem.appendChild(img)

  link.appendChild(gridItem)

  const wrapper = document.createElement('div')
  wrapper.classList.add('grid-item-wrapper')
  wrapper.appendChild(link)

  return wrapper
}

const renderGridItems = () => {
  gridContainer.innerHTML = ''
  allStories.slice(0, currentIndex + itemsPerPage).forEach((item) => {
    gridContainer.appendChild(createGridItem(item))
  })

  applyHoverEffects()

  if (currentIndex + itemsPerPage >= allStories.length) {
    loadMoreBtn.style.display = 'none'
  }
}

loadMoreBtn.addEventListener('click', () => {
  currentIndex += itemsPerPage
  renderGridItems()
})

const applyHoverEffects = () => {
  if (window.matchMedia('(max-width: 1024px)').matches) return

  document.querySelectorAll('.grid-item').forEach((item) => {
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

renderGridItems()
