let slider = document.querySelector(".slider__images");
let before = slider.querySelector(".slider__image-wrapper--before");
let beforeImage = before.querySelector(".slider__picture");
let change = document.querySelector(".slider__range");
let beforeButton = document.querySelector(".slider__button--before");
let afterButton = document.querySelector(".slider__button--after");
const mobileWidth = window.matchMedia("(max-width: 767px)");

let isActive = false;

let beforeAfterSlider = (x) => {
  let shift = Math.max(0, Math.min(x, slider.offsetWidth));
  let finalWidth = slider.offsetWidth - shift;
  //before.style.width = `${shift}px`;
  before.style.width = `${finalWidth}px`;

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

//Sets the gradient for slider to the correct color stops
function handleSlider(change) {
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
    change.style.background = " ";
  }
});
