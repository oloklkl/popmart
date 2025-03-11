const slider = document.querySelector('.box');
const prevButton = document.querySelector('.buttons .prev');
const nextButton = document.querySelector('.buttons .next');
const itemWidth = document.querySelector('.item').offsetWidth;

nextButton.addEventListener('click', () => {
    slider.scrollLeft += itemWidth;
});

prevButton.addEventListener('click', () => {
    slider.scrollLeft -= itemWidth;
});
