document.getElementById('search-btn').addEventListener('click', function () {
  document.getElementById('search-box').classList.toggle('hidden')
})

function closeSearch() {
  document.getElementById('search-box').classList.add('hidden')
}
