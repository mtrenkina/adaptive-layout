//Navigation menu
let navMain = document.querySelector(".main-nav");
let navToggle = document.querySelector(".main-nav__toogle");

//Slider
let slider = document.querySelector(".slider__images");
let before = slider.querySelector(".slider__image-wrapper--before");
let beforeImage = before.querySelector(".slider__picture");
let change = document.querySelector(".slider__range");
let beforeButton = document.querySelector(".slider__button--before");
let afterButton = document.querySelector(".slider__button--after");
const mobileWidth = window.matchMedia("(max-width: 767px)");

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

// change.oninput = function () {
//   change.innerHTML = this.value;
// };

let beforeAfterSlider = (x) => {
  let shift = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.width = `${shift}px`;

  let percentWidth = Math.round((shift / slider.offsetWidth) * 100);
  change.value = `${percentWidth}`;
};

let widthChange = (x) => {
  x -= slider.getBoundingClientRect().left;
  beforeAfterSlider(x);

  if (mobileWidth.matches) {
    handleSlider(change);
  }
};

let pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
};

function handleSlider(change) {
  // this sets the gradient for one slider to the correct color stops

  if (mobileWidth.matches) {
    var gradValue = Math.round(
      (change.value / change.getAttribute("max")) * 1 * 100
    );
    var grad =
      "linear-gradient(90deg, #68b738 " +
      gradValue +
      "%, #ffffff " +
      (gradValue + 1) +
      "%)";

    change.style.background = grad;
  } else {
    change.style.background = "";
  }
}

document.body.addEventListener("mousedown", () => {
  isActive = true;
});

document.body.addEventListener("mouseup", () => {
  isActive = false;
});

document.body.addEventListener("mouseleave", () => {
  isActive = false;
});

document.body.addEventListener("mousemove", (e) => {
  if (!isActive) {
    return;
  }
  let x = e.pageX;
  widthChange(x);
  pauseEvents(e);
});

change.addEventListener("change", (e) => {
  // x = e.pageX;
  // widthChange(x);
});

beforeButton.addEventListener("click", () => {
  before.style.width = `${slider.offsetWidth}px`;
  change.value = 0;
  handleSlider(change);
});

afterButton.addEventListener("click", () => {
  before.style.width = 0;
  change.value = 100;
  handleSlider(change);
});

window.addEventListener("resize", function () {
  if (mobileWidth.matches) {
    change.style.background = "";
  }
});
