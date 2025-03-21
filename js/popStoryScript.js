import { popStoryItems, addPopStoryItems } from './popStoryItems.js'

document.addEventListener('DOMContentLoaded', () => {
  // id로 List페이지와 연동
  const urlParams = new URLSearchParams(window.location.search)
  const itemId = parseInt(urlParams.get('id'))

  const allItems = popStoryItems.concat(addPopStoryItems)

  const item = allItems.find((item) => item.id === itemId)

  console.log(item)

  if (item) {
    const container = document.querySelector('.popStory-container')

    const innerDiv = document.createElement('div')
    innerDiv.classList.add('popstory-inner')

    const textbox = document.createElement('div')
    textbox.classList.add('textbox')
    textbox.innerHTML = `
      <h2>${item.title}</h2>
      <h3>${item.subtitle}</h3>
    `
    innerDiv.appendChild(textbox)

    const contentWrap = document.createElement('div')
    contentWrap.classList.add('content-wrap')
    contentWrap.innerHTML = `
      <div class="main-content">
        <div class="product-image">
          <img class="frame" src="${item.posterImgSrc}" alt="Poster Image" />
          <img class="character" src="${item.posterImgSrc}" alt="Character Image" />
          <img class="figures" src="${item.characterImgSrc}" alt="figures Image" />
        </div>
      </div>
    `
    innerDiv.appendChild(contentWrap)

    const tagsContainer = document.createElement('div')
    tagsContainer.classList.add('tag-content')
    const tagInnerContainer = document.createElement('div')
    tagInnerContainer.classList.add('tags')
    item.tags.forEach((tag) => {
      const span = document.createElement('span')
      span.classList.add('tag')
      span.innerText = tag
      tagInnerContainer.appendChild(span)
    })
    tagsContainer.appendChild(tagInnerContainer)
    innerDiv.appendChild(tagsContainer)

    const artistInfo = document.createElement('div')
    artistInfo.classList.add('artist-info')
    artistInfo.innerHTML = `
      <div class="artist-header">
        <strong>${item.artist}</strong>
      </div>
      <p class="artist-desc">${item.artistDescription}</p>
    `
    innerDiv.appendChild(artistInfo)

    const productDescription = document.createElement('div')
    productDescription.classList.add('popstory-pwrap')
    productDescription.innerHTML = `
      <div class="product-description">
        <p class="popstory-text">${item.description}</p>
      </div>
    `
    innerDiv.appendChild(productDescription)

    container.appendChild(innerDiv)
  } else {
    //로드 실패
    const container = document.querySelector('.popStory-container')
    container.innerHTML = `<p>아이템을 찾을 수 없습니다.</p>`
  }
})
