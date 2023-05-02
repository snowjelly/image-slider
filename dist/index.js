const carouselImages = document.querySelectorAll('.carousel img');

carouselImages.forEach((img) => {
  if (img.getAttribute('data-carousel-position') === '0') {
    img.setAttribute('active', '');
  }
});