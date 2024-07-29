const testSlider = new Swiper('.task-list', {
  navigation: {
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: 'swiper-pagination',
    type: 'progressbar',
  },
});

const PROGRESS_BAR_WIDTH = 260;

const mainPage = document.getElementById('page-main');
const testPage = document.getElementsByClassName('page-test');
const resultPage = document.getElementsByClassName('page-result');

const allSlides = document.getElementsByClassName('swiper-slide')

const block = document.querySelectorAll('.swiper-slide')
console.log(mainPage, testPage, resultPage, block);
