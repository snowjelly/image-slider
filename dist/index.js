const carouselImages = document.querySelectorAll('.carousel img');
const bubbles = document.querySelectorAll('.bubble-nav span');

const init = (nodeList) => {
  nodeList.forEach((node) => {
    if (node.getAttribute('data-carousel-position') === '0') {
      node.setAttribute('active', '');
      if (node.classList.contains('bubble')) {
        node.innerHTML = 'radio_button_checked';
      }
    }
  });
}

init(carouselImages);
init(bubbles);

const nextImage = () => {
  for (let i=0;i<carouselImages.length;i++) {
    if (i === carouselImages.length - 1) return;
    if (carouselImages[i].getAttribute('active') !== null) {

      carouselImages[i + 1].setAttribute('active', '');
      carouselImages[i + 1].setAttribute('slide-right', '');
      carouselImages[i + 1].addEventListener('animationend', () => {
        carouselImages.forEach((img) => {
          img.removeAttribute('slide-right');
        });
      });

      carouselImages[i].removeAttribute('active');

      bubbles[i + 1].setAttribute('active', '');
      bubbles[i + 1].innerHTML = 'radio_button_checked';

      bubbles[i].removeAttribute('active');
      bubbles[i].innerHTML = 'radio_button_unchecked';

      return;
    }
  }
}

const previousImage = () => {
  for (let i=carouselImages.length - 1;i>=0;i--) {
    if (carouselImages[i].getAttribute('active') !== null) {
      if (i === 0) return;

      carouselImages[i - 1].setAttribute('active', '');
      carouselImages[i - 1].setAttribute('slide-left', '');
      carouselImages[i - 1].addEventListener('animationend', () => {
        carouselImages.forEach((img) => {
          img.removeAttribute('slide-left');
        });
      });

      carouselImages[i].removeAttribute('active');

      bubbles[i - 1].setAttribute('active', '');
      bubbles[i - 1].innerHTML = 'radio_button_checked';

      bubbles[i].removeAttribute('active');
      bubbles[i].innerHTML = 'radio_button_unchecked';

      return;
    }
  }
}

const getActiveElements = () => {
  const activeElementList = document.querySelectorAll('[active]');
  let activeImage;
  let activeBubble;
  activeElementList.forEach((activeElement) => {
    if (activeElement.classList.contains('bubble')) {
      activeBubble = activeElement;
    }
    if (activeElement.localName === 'img') {
      activeImage = activeElement;
    }
  });
  return {activeImage, activeBubble};
}

const goToImage = (e) => {
  if (getActiveElements().activeBubble.dataset.carouselPosition === e.target.dataset.carouselPosition) return;

  if (getActiveElements().activeBubble.dataset.carouselPosition < e.target.dataset.carouselPosition) {
    carouselImages[e.target.dataset.carouselPosition].setAttribute('slide-right', '');
    carouselImages[e.target.dataset.carouselPosition].addEventListener('animationend', () => {
      carouselImages.forEach((img) => {
        img.removeAttribute('slide-right');
      });
    }, { once: true });
  }
  else if (getActiveElements().activeBubble.dataset.carouselPosition > e.target.dataset.carouselPosition) {
    carouselImages[e.target.dataset.carouselPosition].setAttribute('slide-left', '');
    carouselImages[e.target.dataset.carouselPosition].addEventListener('animationend', () => {
      carouselImages.forEach((img) => {
        img.removeAttribute('slide-left');
      });
    }, { once: true });
  }

  getActiveElements().activeBubble.innerHTML = 'radio_button_unchecked';
  getActiveElements().activeBubble.removeAttribute('active');
  getActiveElements().activeImage.removeAttribute('active');

  e.target.setAttribute('active', '');
  e.target.innerHTML = 'radio_button_checked';
  document.querySelector(`.carousel img[data-carousel-position="${e.target.dataset.carouselPosition}"`).setAttribute('active', '');
}



bubbles.forEach((bubble) => {
  bubble.addEventListener('click', goToImage);
});


const rightArrow = document.querySelector('.right-arrow span');

rightArrow.addEventListener('click', nextImage);

const leftArrow = document.querySelector('.left-arrow span');

leftArrow.addEventListener('click', previousImage);