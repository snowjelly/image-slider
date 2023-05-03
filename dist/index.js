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
      carouselImages[i].removeAttribute('active');
      return;
    }
  }
}

const previousImage = () => {
  for (let i=carouselImages.length - 1;i>=0;i--) {
    if (carouselImages[i].getAttribute('active') !== null) {
      if (i === 0) return;
      carouselImages[i - 1].setAttribute('active', '');
      carouselImages[i].removeAttribute('active');
      return;
    }
  }
}

const rightArrow = document.querySelector('.right-arrow span');

rightArrow.addEventListener('click', nextImage);

const leftArrow = document.querySelector('.left-arrow span');

leftArrow.addEventListener('click', previousImage);