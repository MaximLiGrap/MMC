
    const btnText1 = document.getElementById('charact-btn1');
    const text1 = document.getElementById('charact_card-text1');

    let i=1;
    btnText1.addEventListener('click', function() {
        text1.classList.toggle('charact_card-text-visible');
        i++;
        if(i%2 === 0) {
            btnText1.textContent = 'Скрыть';
        } else {
            btnText1.textContent = 'Подробнее';
        }

    })

    const btnText2 = document.getElementById('charact-btn2');
    const text2 = document.getElementById('charact_card-text2');
    let j=1;
    btnText2.addEventListener('click', function() {
        text2.classList.toggle('charact_card-text-visible');
        j++;
        if(j%2 === 0) {
            btnText2.textContent = 'Скрыть';
        } else {
            btnText2.textContent = 'Подробнее';
        }

    })

    
    const slider = document.querySelector('.transmission_cards');
    let mySwiper;
    function mobileSlider () {
        if(window.innerWidth <= 780 && slider.dataset.mobile == 'false') {
            mySwiper = new Swiper(slider, {
                slideClass: 'transmission_card',
                wrapperClass: 'transmission_cards-wrap',
                slidesPerGroup: 1,
                centeredSlides: true,
                slidesPerView: 1.1,
                spaceBetween: 20,
                pagination: {
                    el: '.transmission_card-bullets',
                    type: 'bullets',
                    clickable: true,
                },
            })

        slider.dataset.mobile = 'true';
        }

        if(window.innerWidth > 780) {
            slider.dataset.mobile = 'false';
            if (slider.classList.contains('swiper-container-initialized')) {
                mySwiper.destroy();
            }
        }
    }

    
    mobileSlider ()

    window.addEventListener('resize', () =>{
        mobileSlider ();
    })

    


