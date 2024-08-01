'use strict';
// https://swapi.dev/api/people/1/

import getProgressBar from "./features/progress-bar.js";
import runTest from "./features/runTest.js";
import comeBackToMain from "./features/comeBackToMain.js";
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
const testPage = document.querySelector('.page-test');
const resultPage = document.querySelector('.page-result');
const buttonStart = document.querySelectorAll('.start-test');
const backToMain = document.querySelector('.return-to-main');
const transferToAbout = document.querySelector('.about');
const timer = document.querySelector('.timer');
const callButton = document.querySelector('.call-block');
const resultField = document.createElement('div');

let timeStart = 600;

function timeCountDown() {
  const minutes = Math.floor(timeStart / 60);
  const seconds = timeStart % 60;

  timer.innerHTML = `${minutes < LESS_THEN_TEN ? '0'+minutes : minutes}:${seconds < LESS_THEN_TEN ? '0'+seconds : seconds}`;
  timeStart--;

  if (timeStart < 0) {
    clearInterval(timeCountDown)
  }
};

const goToTestPage = () => runTest(mainPage, testPage, testSlider);

const goToMainPage = () => comeBackToMain(mainPage, testPage, resultPage);

buttonStart.forEach(element => {
  element.addEventListener('click', goToTestPage)
});

backToMain.addEventListener('click', goToMainPage)
transferToAbout.addEventListener('click', goToMainPage)

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

const resultFromServer = {
  name: 'Luk Skywaker',
  sex: 'male',
  age: 77,
  ship: 'spaseShip',
};

callButton.addEventListener('click', getResult);

Object.entries(resultFromServer).forEach(([key, value]) => {
  const newElem = createDataElement(key, value)

  resultField.append(newElem);
})

callButton.after(resultField);