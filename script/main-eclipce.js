const slider = document.querySelector('.auto-photo');
let eclipcePhoto;
function mobileSlider () {
    if(window.innerWidth <= 991 && slider.dataset.mobile == 'false') {
      eclipcePhoto = new Swiper(slider, {
        slideClass: 'auto_card',
        wrapperClass: 'auto_cards',
        slidesPerGroup: 1,
        slidesPerView: 1,
        spaceBetween: 2,
        pagination: {
          el: '.auto_card_bullets',
          type: 'bullets',
          clickable: true,
        },
      })

    slider.dataset.mobile = 'true';
    }

    if(window.innerWidth > 991) {
        slider.dataset.mobile = 'false';
        if (slider.classList.contains('swiper-container-initialized')) {
            eclipcePhoto.destroy();
        }
    }
}


mobileSlider ();

window.addEventListener('resize', () =>{
    mobileSlider ();

})
 
