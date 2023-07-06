document.addEventListener('DOMContentLoaded', function () {
  const slide = new Slider();
});

class Slider {
  constructor() {
    this.swiper = new Swiper('.swiper', {
      // Optional parameters,
      // direction: 'vertical',
      loop: true,
      effect: 'cube',
      centeredSlides: true,
      slidesPerView: 1,
      speed: 1000,
      autoplay: {
        delay: 2000,
      },
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
