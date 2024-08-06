'use strict';
// https://swapi.dev/api/people/1/

import getProgressBar from "./features/progress-bar.js";
import goToPage from "./features/goToPage.js";
import getResult from "./features/getResult.js";
import createDataElement from "./features/createDataElement.js";

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
const LESS_THEN_TEN = 10;

const page = document.querySelector('.page');
const mainPage = document.querySelector('.page-main');
const aside = document.querySelector('.page__aside-menu');
const closeMenu = document.querySelector('.aside__header-icon--close');
const testPage = document.querySelector('.page-test');
const resultPage = document.querySelector('.page-result');
const resultField = document.createElement('div');

const buttonStart = document.querySelectorAll('.start-test');
const burgerMenu = document.querySelectorAll('.header__burger');
const backToMain = document.querySelector('.return-to-main');
const transferToAbout = document.querySelector('.about');
const callButton = document.querySelector('.call-block');

const timer = document.querySelector('.timer');

let timeStart = 600;
let timeCount;
let currentPage = mainPage;
let prevPage = mainPage;
let currentSlide = 0;


function timeCountDown() {
  const minutes = Math.floor(timeStart / 60);
  const seconds = timeStart % 60;

  timer.innerHTML = `${minutes < LESS_THEN_TEN ? '0'+minutes : minutes}:${seconds < LESS_THEN_TEN ? '0'+seconds : seconds}`;
  timeStart--;

  if (timeStart < 0) {
    clearInterval(timeCountDown)
  }
};

buttonStart.forEach(element => {
  element.addEventListener('click', () => {
    goToPage(prevPage, currentPage, testPage);
    testSlider.setProgress(0);
    currentSlide = 0;
    progressBar.style.width = getProgressBar(currentSlide, TOTAL_SLIDES_AMOUNT, PROGRESS_BAR_WIDTH)
  })
});

burgerMenu.forEach(element => {
  element.addEventListener('click', () => {
    goToPage(prevPage, currentPage, aside)
  })
});

closeMenu.addEventListener('click', () => {
  aside.style.display = 'none';
  currentPage = prevPage;
  currentPage.style.display = 'initial';
});

backToMain.addEventListener('click', () => {
  goToPage(prevPage, currentPage, mainPage);
});


transferToAbout.addEventListener('click', () => {
  goToPage(prevPage, currentPage, mainPage);
});

const progressBar = document.querySelector('.progress');
currentSlide = testSlider.activeIndex;
progressBar.style.width = getProgressBar(currentSlide, TOTAL_SLIDES_AMOUNT, PROGRESS_BAR_WIDTH)

document.querySelector('.swiper-button-next').addEventListener('click', () => {
  currentSlide = testSlider.activeIndex;
  progressBar.style.width = getProgressBar(currentSlide, TOTAL_SLIDES_AMOUNT, PROGRESS_BAR_WIDTH)

  if (currentSlide === TOTAL_SLIDES_AMOUNT - 1) {
    const runResult = setTimeout(() => {
      prevPage = testPage;
      testPage.style.display = "none";
      resultPage.style.display = "initial";
      currentPage = resultPage;
      console.log(prevPage, currentPage);

      timeCount = setInterval(timeCountDown, 1000);
    }, 3000)
  }
});

callButton.addEventListener('click', () => {
  let fetchedData = null;
  getResult()
    .then(data => {
      fetchedData = data;

      Object.entries(fetchedData).forEach(([key, value]) => {
        if (Object.hasOwnProperty.call(fetchedData, key)) {
          const newElem = createDataElement(key, value)

          resultField.append(newElem);
      }})
    })
  clearInterval(timeCount);
});

callButton.after(resultField);