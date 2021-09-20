
    var swiperBody = new Swiper(".mySwiper", {
        speed: 1000,
        slidesPerView: 2.5,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
    
            320: {
                slidesPerView: 1,
            },
            1400: {
    
                slidesPerView: 2.5,
    
            }
        }
    });
    
    var swiperHero = new Swiper(".mySwiperHero", {
        speed: 1600,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 15,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next-hero",
            prevEl: ".swiper-button-prev-hero",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        scrollbar: { el: '.swiper-scrollbar' },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    });

    const sliderSpecial = document.querySelector('.special_cards');
    var swiper_event;
    var swiperSlideSpecial = document.querySelectorAll('.special_card');
    console.log(swiperSlideSpecial.length);
 
    function mobileSlider () {
        if(swiperSlideSpecial.length > 3) {
            document.querySelector('.container_special').classList.add('container_special-mocard');
            sliderSpecial.classList.add('special_cards-mocard')
            sliderSpecial.dataset.mobile = 'true';
            swiper_event = new Swiper(sliderSpecial, {
                slideClass: 'special',
                wrapperClass: 'container_special',
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 2,
                pagination: {
                  el: '.special_bullets',
                  type: 'bullets',
                  clickable: true,
                },
                breakpoints: {
    
                    320: {
                        slidesPerGroup: 1,
                        slidesPerView: 1,
                    },
                    991: {
            
                        slidesPerView: 3,
            
                    }
                }
            }); 
            return
        }



        if(window.innerWidth <= 1200 && sliderSpecial.dataset.mobile == 'false') {
            swiper_event = new Swiper(sliderSpecial, {
                slideClass: 'special',
                wrapperClass: 'container_special',
                slidesPerGroup: 1,
                slidesPerView: 2,
                spaceBetween: 2,
                pagination: {
                  el: '.special_bullets',
                  type: 'bullets',
                  clickable: true,
                },

                breakpoints: {
    
                    320: {
                        slidesPerGroup: 1,
                        slidesPerView: 1,
                    },
                    1100: {
            
                        slidesPerView: 2,
            
                    }
                }
            });

        sliderSpecial.dataset.mobile = 'true';
        }

        if(window.innerWidth > 1200) {
            sliderSpecial.dataset.mobile = 'false';
            if (sliderSpecial.classList.contains('swiper-container-initialized')) {
                swiper_event.destroy();
            }
        }
    }

    var sliderOwner = document.querySelector('.swiper_onwer');
    var swiperOwner;

    function mobileSlider2 () {
        if(window.innerWidth <= 991 && sliderOwner.dataset.mobile == 'false') {

            swiperOwner = new Swiper(sliderOwner, {
                slideClass: 'onwer_card',
                wrapperClass: 'container_onwer',
                slidesPerGroup: 1,
                slidesPerView: 1,
                spaceBetween: 2,
                pagination: {
                  el: '.onwer_bullets',
                  type: 'bullets',
                  clickable: true,
                },
            });

            sliderOwner.dataset.mobile = 'true';
        }

        if(window.innerWidth > 991) {
            sliderOwner.dataset.mobile = 'false';
            if (sliderOwner.classList.contains('swiper-container-initialized')) {
                console.log('dest')
                swiperOwner.destroy();
            }
            
        }
    }
    mobileSlider2 ();
    mobileSlider ()


    window.addEventListener('resize', () =>{
        mobileSlider ();
        mobileSlider2 ()
    })


