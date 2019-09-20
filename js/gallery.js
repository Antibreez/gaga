'use strict';

var  ANIMATION = {
  duration: 1000,
  delay: 500,
  totalTime: function () {
    return this.duration + this.delay;
  }
};

var images = [
  'img/photo-1535086181678-5a5c4d23aa7d.jpg',
  'img/kaboompics_Arc de la Rua Augusta in Lisbon, Portugal.jpg',
  'img/kaboompics_Modern white building, EDP Headquarters of architect Aires Mateus, Lisbon, Portugal.jpg',
  'img/cdda7ed4b97e589feadeaa6f5a8a9b0e.jpg',
  'img/P_VU_ALCANAR_F05.jpg',
  'img/vehicles-cars-bentley-20631.jpg',
  'img/wallpaper-2049670.jpg'
];

var buttonBox = document.querySelector('.control-box');
var prevButton = document.querySelector('.control-box__button--right');
var nextButton = document.querySelector('.control-box__button--left');

var wrapperMain = document.querySelector('.gallery-main__wrapper');
var wrapperPrevMain = document.querySelector('.gallery-main__wrapper-previous');
var wrapperNextMain = document.querySelector('.gallery-main__wrapper-next');
var imageMain = document.querySelector('.gallery-main__image');
var imagePrevMain = document.querySelector('.gallery-main__image-previous');
var imageNextMain = document.querySelector('.gallery-main__image-next');

var wrapperSecondary = document.querySelector('.gallery-secondary__wrapper');
var wrapperPrevSecondary = document.querySelector('.gallery-secondary__wrapper-previous');
var wrapperNextSecondary = document.querySelector('.gallery-secondary__wrapper-next');
var imageSecondary = document.querySelector('.gallery-secondary__image');
var imagePrevSecondary = document.querySelector('.gallery-secondary__image-previous');
var imageNextSecondary = document.querySelector('.gallery-secondary__image-next');

var debounce = function (onDelay, delay) {
  var timeoutId = 0;
  return function () {
    var params = arguments;

    if (timeoutId > 0) {
    	return;
    }

    if (timeoutId === 0) {
      onDelay.apply(null, params);
    }

    var onTimeout = function () {
      timeoutId = 0;
    };

    timeoutId = setTimeout(onTimeout, delay);
  };
};

var imageMainNum = 0;
var imagePrevMainNum;
var imageNextMainNum;

var imageSecondaryNum;
var imagePrevSecondaryNum;
var imageNextSecondaryNum;

var getNextNum = function (num) {
  num++;
  num = num > images.length - 1 ? 0 : num;
  return num;
};

var getPrevNum = function (num) {
  num--;
  num = num < 0 ? images.length - 1 : num;
  return num;
};

var resetMainPrev = function () {
  imageMainNum = imagePrevMainNum;
  imageMain.src = images[imageMainNum];

  wrapperPrevMain.style.transitionDuration = '0s';
  wrapperMain.style.transitionDuration = '0s';
  wrapperPrevMain.style.right = '100%';
  wrapperMain.style.right = 0;

};

var resetSecondaryPrev = function () {
  imageSecondaryNum = imageNextSecondaryNum;
  imageSecondary.src = images[imageSecondaryNum];

  wrapperNextSecondary.style.transitionDuration = '0s';
  wrapperSecondary.style.transitionDuration = '0s';
  wrapperNextSecondary.style.transitionDelay = '0s';
  wrapperSecondary.style.transitionDelay = '0s';
  wrapperNextSecondary.style.left = '100%';
  wrapperSecondary.style.right = 0;
};

var resetMainNext = function () {
  imageMainNum = imageNextMainNum;
  imageMain.src = images[imageMainNum];

  wrapperNextMain.style.transitionDuration = '0s';
  wrapperMain.style.transitionDuration = '0s';
  wrapperNextMain.style.left = '100%';
  wrapperMain.style.right = 0;

};

var resetSecondaryNext = function () {
  imageSecondaryNum = imagePrevSecondaryNum;
  imageSecondary.src = images[imageSecondaryNum];

  wrapperPrevSecondary.style.transitionDuration = '0s';
  wrapperSecondary.style.transitionDuration = '0s';
  wrapperPrevSecondary.style.transitionDelay = '0s';
  wrapperSecondary.style.transitionDelay = '0s';
  wrapperPrevSecondary.style.right = '100%';
  wrapperSecondary.style.right = 0;
};

var onButtonClick = function (evt) {
  if (evt.target.classList.contains('control-box__button--right')) {
    imageNextSecondaryNum = imageMainNum;
    imagePrevMainNum = getPrevNum(imageMainNum);

    console.log(imagePrevMainNum);
    console.log(imageNextSecondaryNum);


    imagePrevMain.src = images[imagePrevMainNum];
    imageNextSecondary.src = images[imageNextSecondaryNum];

    wrapperPrevMain.style.transitionDuration = ANIMATION.duration + 'ms';
    wrapperMain.style.transitionDuration = ANIMATION.duration + 'ms';
    wrapperNextSecondary.style.transitionDuration =  ANIMATION.duration + 'ms';
    wrapperSecondary.style.transitionDuration =  ANIMATION.duration + 'ms';
    wrapperNextSecondary.style.transitionDelay = ANIMATION.delay + 'ms';
    wrapperSecondary.style.transitionDelay = ANIMATION.delay + 'ms';
    wrapperPrevMain.style.right = 0;
    wrapperMain.style.right = '-100%';
    wrapperNextSecondary.style.left = 0;
    wrapperSecondary.style.right = '100%';

    setTimeout(resetMainPrev, ANIMATION.duration);
    setTimeout(resetSecondaryPrev, ANIMATION.totalTime());
  }

  if (evt.target.classList.contains('control-box__button--left')) {
    imagePrevSecondaryNum = imageMainNum;
    imageNextMainNum = getNextNum(imageMainNum);

    imageNextMain.src = images[imageNextMainNum];
    imagePrevSecondary.src = images[imagePrevSecondaryNum];

    wrapperNextMain.style.transitionDuration = ANIMATION.duration + 'ms';
    wrapperMain.style.transitionDuration = ANIMATION.duration + 'ms';
    wrapperPrevSecondary.style.transitionDuration =  ANIMATION.duration + 'ms';
    wrapperSecondary.style.transitionDuration =  ANIMATION.duration + 'ms';
    wrapperPrevSecondary.style.transitionDelay = ANIMATION.delay + 'ms';
    wrapperSecondary.style.transitionDelay = ANIMATION.delay + 'ms';
    wrapperNextMain.style.left = 0;
    wrapperMain.style.right = '100%';
    wrapperPrevSecondary.style.right = 0;
    wrapperSecondary.style.right = '-100%';

    setTimeout(resetMainNext, ANIMATION.duration);
    setTimeout(resetSecondaryNext, ANIMATION.totalTime());
  }
};

buttonBox.addEventListener('click', debounce(onButtonClick, ANIMATION.totalTime()));
