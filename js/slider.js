'use strict';

const slider = document.querySelector('.slider__images');
const before = slider.querySelector('.slider__image-wrapper--before');
const beforeImage = before.querySelector('.slider__picture');
const change = document.querySelector('.slider__range');
const beforeButton = document.querySelector('.slider__button--before');
const afterButton = document.querySelector('.slider__button--after');
const tabletWidth = window.matchMedia('(min-width: 768px)');
const mobileWidth = window.matchMedia('(max-width: 767px)');
const desktopWidth = window.matchMedia('(min-width: 1220px)');

let isActive = false;

const beforeAfterSlider = (x) => {
  let shift = Math.max(0, Math.min(x, slider.offsetWidth));
  let finalWidth = slider.offsetWidth - shift;
  before.style.width = `${finalWidth}px`;

  let percentWidth = Math.round((shift / slider.offsetWidth) * 100);
  change.value = `${percentWidth}`;
};

const widthChange = (x) => {
  x -= slider.getBoundingClientRect().left;
  beforeAfterSlider(x);

  if (mobileWidth.matches) {
    handleSlider(change);
  }
};

const pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
};

//Sets the gradient for slider to the correct color stops
function handleSlider(change) {
  if (mobileWidth.matches) {
    var gradValue = Math.round(
      (change.value / change.getAttribute('max')) * 1 * 100
    );
    var grad =
      'linear-gradient(90deg, #68b738 ' +
      gradValue +
      '%, #ffffff ' +
      (gradValue + 1) +
      '%)';

    change.style.background = grad;
  } else {
    change.style.background = 'transparent';
  }
}

document.body.addEventListener('mousedown', () => {
  isActive = true;
});

document.body.addEventListener('mouseup', () => {
  isActive = false;
});

document.body.addEventListener('mouseleave', () => {
  isActive = false;
});

document.body.addEventListener('mousemove', (e) => {
  if (!isActive) {
    return;
  }
  let x = e.pageX;
  widthChange(x);
  pauseEvents(e);
});

beforeButton.addEventListener('click', () => {
  before.style.width = `${slider.offsetWidth}px`;
  change.value = 0;
  handleSlider(change);
});

afterButton.addEventListener('click', () => {
  before.style.width = 0;
  change.value = 100;
  handleSlider(change);
});

window.onresize = function () {
  if (tabletWidth.matches) {
    change.style.background =
      'linear-gradient(90deg, transparent 99%, #eaeaea 1%)';
  }

  if (desktopWidth.matches) {
    change.style.background =
      'transparent';
  }
};
