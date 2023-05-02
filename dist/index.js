const carouselImages = document.querySelectorAll('.carousel img');

carouselImages.forEach((img) => {
  if (img.getAttribute('data-carousel-position') === '0') {
    img.setAttribute('active', '');
  }
});

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