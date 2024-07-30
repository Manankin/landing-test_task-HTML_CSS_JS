'use strict';

import getProgressBar from "./features/progress-bar.js";

const testSlider = new Swiper('.task-list', {
  navigation: {
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: 'swiper-pagination',
    type: 'progressbar',
  },
});

const PROGRESS_BAR_WIDTH = getComputedStyle(document.querySelector('.swiper-pagination')).width;
const TOTAL_SLIDES_AMOUNT = document.querySelectorAll('.swiper-slide').length;

const page = document.querySelector('.page');
const mainPage = document.querySelector('.page-main');
const testPage = document.querySelector('.page-test');
const resultPage = document.querySelector('.page-result');
const buttonStart = document.querySelectorAll('.start-test');
const backToMain =document.querySelector('.return-to-main');
const timer = document.querySelector('.timer');

let timeStart = 600;

function timeCountDown() {
  const minutes = Math.floor(timeStart / 60);
  const seconds = timeStart % 60;

  timer.innerHTML = `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
  timeStart--;

  if (timeStart < 0) {
    clearInterval(timeCountDown)
  }
};

// const timeCount = setInterval(timeCountDown, 1000)

buttonStart.forEach(element => {
  element.addEventListener('click', () => {
    testSlider.activeIndex = 0;
    mainPage.style.display = "none";
    testPage.style.display = "initial";
  })
});

backToMain.addEventListener('click', () => {
  testPage.style.display = 'none';
  resultPage.style.display = 'none';
  mainPage.style.display = "";
})

const progressBar = document.querySelector('.progress');
let currentSlide = testSlider.activeIndex;
progressBar.style.width = getProgressBar(currentSlide, TOTAL_SLIDES_AMOUNT, PROGRESS_BAR_WIDTH)

document.querySelector('.swiper-button-next').addEventListener('click', () => {
  currentSlide = testSlider.activeIndex;
  progressBar.style.width = getProgressBar(currentSlide, TOTAL_SLIDES_AMOUNT, PROGRESS_BAR_WIDTH)

  if (currentSlide === TOTAL_SLIDES_AMOUNT - 1) {
    const runResult = setTimeout(() => {
      testPage.style.display = "none";
      resultPage.style.display = "initial";

      const timeCount = setInterval(timeCountDown, 1000)
    }, 3000)
  }
});
