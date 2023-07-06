'use strict';

const requestBtn = document.querySelector('.request');
const work = document.querySelector('.request-work');
const videoEl = document.querySelectorAll('video');

// Swipeer ライブラリ
const swiper = new Swiper('.swiper', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,
  grabCursor: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

// 測定依頼ボタン処理
requestBtn.addEventListener('click', function () {
  work.style.scale = '0.3';
  work.style.transform = 'translate(-170rem, 80rem)';
});

// ビデオ再生速度
videoEl.forEach(video => (video.playbackRate = 1.5));
