const slider = document.querySelector('.photo_out-slider');
let eclipcePhotoOut ;
function mobileSlider () {
    if(window.innerWidth <= 768 && slider.dataset.mobile == 'false') {
      eclipcePhotoOut = new Swiper(slider, {
        slideClass: 'out-img',
        wrapperClass: 'photo_out-wrap',
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.photo_out-pagination',
          type: 'bullets',
          clickable: true,
        },
      })

    slider.dataset.mobile = 'true';
    }

    if(window.innerWidth > 768) {
        slider.dataset.mobile = 'false';
        if (slider.classList.contains('swiper-container-initialized')) {
            eclipcePhotoOut .destroy();
        }
    }
}

const sliderIn = document.querySelector('.photo_in-slider');
let eclipcePhotoIn;
function mobileSlider2 () {
    if(window.innerWidth <= 768 && sliderIn.dataset.mobile == 'false') {
      eclipcePhotoIn = new Swiper(sliderIn, {
        slideClass: 'in-img',
        wrapperClass: 'photo_in-wrap',
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.photo_in-pagination',
          type: 'bullets',
          clickable: true,
        },
      })

    sliderIn.dataset.mobile = 'true';
    }

    if(window.innerWidth > 768) {
        sliderIn.dataset.mobile = 'false';
        if (sliderIn.classList.contains('swiper-container-initialized')) {
            eclipcePhotoIn.destroy();
        }
    }
}

    
mobileSlider ();
mobileSlider2 ()

window.addEventListener('resize', () =>{
    mobileSlider ();
    mobileSlider2 ()
})

var eclipceVideo = new Swiper('.video_slider', {
    slideClass: 'video_card',
    wrapperClass: 'video_wrap',
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.video_pagination',
      type: 'bullets',
      clickable: true,
    },
  })



    
    