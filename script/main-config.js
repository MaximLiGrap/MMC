

    
    const btnWarranty = document.querySelector('.config_hero-subtitle-warranty');
    const blockWarranty = document.querySelector('.config_hero-text-warranty');
    const btnTeh = document.querySelector('.config_hero-subtitle-teh');
    const btnSafety = document.querySelector('.config_hero-subtitle-safety');
    const btnOut = document.querySelector('.config_hero-subtitle-out');
    const btnDriver = document.querySelector('.config_hero-subtitle-driver');
    const blockTeh = document.querySelector('.config_hero-text-teh');
    const blockSafety = document.querySelector('.config_hero-text-safety');
    const blockOut = document.querySelector('.config_hero-text-out');
    const blockDriver = document.querySelector('.config_hero-text-driver');
    
   
        
    btnWarranty.addEventListener('click', function(){
        blockWarranty.classList.toggle('d-block');
        btnWarranty.classList.toggle('active_btn');
    
    })
    btnTeh.addEventListener('click', function(){
        blockTeh.classList.toggle('d-block');
        btnTeh.classList.toggle('active_btn');
    
    })
    
    btnSafety.addEventListener('click', function(){
        blockSafety.classList.toggle('d-block');
        btnSafety.classList.toggle('active_btn');
    
    })
    
    btnOut.addEventListener('click', function(){
        blockOut.classList.toggle('d-block');
        btnOut.classList.toggle('active_btn');
    
    })
    
    btnDriver.addEventListener('click', function(){
        blockDriver.classList.toggle('d-block');
        btnDriver.classList.toggle('active_btn');
    
    })


    function deleteDisablet (btn) {
        if(window.innerWidth <= 991 && btn.dataset.mobile == 'false') {
            btn.dataset.mobile = 'true';
            btn.removeAttribute("disabled")
        }
        if(window.innerWidth > 991) {
            btn.dataset.mobile = 'false';
            if (btn.dataset.mobile == 'false'){
                btn.setAttribute("disabled", true)
            }
            
        }

    }
    
    
    const slider = document.querySelector('.container_equipment');
    let configCard ;
    let swiperSlide = document.querySelectorAll('.equipment');
    console.log(swiperSlide.length);

    function mobileSlider () {
        if(swiperSlide.length > 3) {
            document.querySelector('.equipment_cards').classList.add('container_special-mocard');
            document.querySelector('.swiper-button-next-equiment').classList.add('active');
            document.querySelector('.swiper-button-prev-equiment').classList.add('active');
            slider.classList.add('specialp_cards-mocard')
            slider.dataset.mobile = 'true';
            configCard = new Swiper(slider, {
                slideClass: 'equipment',
                wrapperClass: 'equipment_cards',
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 40,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                  el: '.equipment_bullets',
                  type: 'bullets',
                  clickable: true,
                },
                breakpoints: {
    
                    320: {
                        slidesPerGroup: 1,
                        slidesPerView: 1,
                    },
                    991: {
            
                        slidesPerView: 2,
                        slidesPerGroup: 1,
            
                    },
                    1199: {
            
                        slidesPerView: 3,
            
                    }
                }
            }); 
            return
        }
        if(window.innerWidth <= 1200 && slider.dataset.mobile == 'false') {
            configCard = new Swiper('.container_equipment', {
                slideClass: 'equipment',
                wrapperClass: 'equipment_cards',
                slidesPerGroup: 1,
                slidesPerView: 1.1,
                spaceBetween: 20,
                pagination: {
                  el: '.auto_card_bullets',
                  type: 'bullets',
                  clickable: true,
                },
                breakpoints: {
    
                    320: {
                        slidesPerGroup: 1,
                        slidesPerView: 1.1,
                    },
                    991: {
            
                        slidesPerView: 2.2,
                        slidesPerGroup: 1,
            
                    },
                    1199: {
            
                        slidesPerView: 3,
            
                    }
                }
              })

        slider.dataset.mobile = 'true';
        }

        if(window.innerWidth > 1200) {
            slider.dataset.mobile = 'false';
            if (slider.classList.contains('swiper-container-initialized')) {
                configCard .destroy();
            }
        }
    }

    deleteDisablet (btnWarranty)
    deleteDisablet (btnTeh)
    deleteDisablet (btnSafety)
    deleteDisablet (btnOut)
    deleteDisablet (btnDriver)
    mobileSlider ()

    window.addEventListener('resize', () =>{
        mobileSlider ();
        deleteDisablet (btnWarranty)
        deleteDisablet (btnTeh)
        deleteDisablet (btnSafety)
        deleteDisablet (btnOut)
        deleteDisablet (btnDriver)
     
    })
