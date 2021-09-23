function get_filtered_data(auto, categories) {
    $.post('/ajax/accessories/', {
        'data': {
            'get': 'filtered_data',
            'auto': auto,
            'category': categories,
        }
    }, function(data) {
        if (data.error == 0) {
            $('#filter_data').html(data.html);
            $('.container .container_inner .container-card .card-checkbox').each(function() {
                const idSlider = $(this).attr('id')
                const sliderInt = searchCard(idSlider);
                let mySwiperInt;
                if (sliderInt !== undefined) {
                    newSwiperSlid(mySwiperInt, sliderInt)
                }

            });
        }
    });
}

function searchCard(blockCarad) {
    if (document.getElementById(blockCarad) !== null)
        return document.getElementById(blockCarad);
}

var categories = [];
$('.container .container_inner .checkbox__box .checkbox__label input:checked').each(function() {
    categories.push($(this).val());
})

var auto = $(".title").attr('data-id');

get_filtered_data(auto, categories)

$('.check').click(function() {
    var categoriesCheckUncheck = [];
    $('.container .container_inner .checkbox__box .checkbox__label input:checked').each(function() {
        categoriesCheckUncheck.push($(this).val());
    })
    if ($(this).is(':checked')) {
        get_filtered_data(auto, categoriesCheckUncheck)
    } else {
        get_filtered_data(auto, categoriesCheckUncheck)
    }

});

// Функция вызова слайдера
function newSwiperSlid(mySwiper, slider) {
    //console.log(slider);
    let mySwiperInt = mySwiper;

    function mobileSlider() {
        if (window.innerWidth <= 768 && slider.dataset.mobile == 'false') {
            mySwiperInt = new Swiper(slider, {
                slideClass: 'card_acces',
                wrapperClass: 'card_wrap',
                slidesPerGroup: 1,
                centeredSlides: true,
                slidesPerView: 1.1,
                spaceBetween: 20,
            })


            slider.dataset.mobile = 'true';
        }

        if (window.innerWidth > 768) {
            slider.dataset.mobile = 'false';
            if (slider.classList.contains('swiper-container-initialized')) {
                mySwiperInt.destroy();
            }
        }
    }
    mobileSlider()
    window.addEventListener('resize', () => {
        mobileSlider()
    })
}