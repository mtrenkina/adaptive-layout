//Navigation menu
var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toogle");

//Slider
const slider = document.querySelector(".slider__images");
const before = slider.querySelector(".slider__image-wrapper--before");
const beforeImage = before.querySelector(".slider__image");
const change = document.querySelector(".slider__range");

let isActive = false;

//Navigation menu
navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

//Slider
document.addEventListener("DOMContentLoaded", () => {
  let width = slider.offsetWidth;
  beforeImage.style.width = `${width}px`;
});
