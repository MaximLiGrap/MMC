const checkboxInt = document.querySelector('.check_int');
const checkboxExt = document.querySelector('.check_ext');
const checkboxTransport = document.querySelector('.check_transport');
const checkboxSafety = document.querySelector('.check_safety');
const checkboxSouvenir = document.querySelector('.check_souvenir');
const checkboxRug = document.querySelector('.check_rug');

function searchCard (blockCarad) {
    if (document.querySelector(blockCarad) !== null) 
    return document.querySelector(blockCarad);
}

const cardInt =  searchCard ('.container-card-int')

const cardExt = searchCard ('.container-card-exterior');

const cardTransport = searchCard ('.container-card-transport');

const cardSafety = searchCard ('.container-card-safety');

const cardSouvenir = searchCard ('.container-card-souvenir');

const cardRug = searchCard ('.container-card-rug');


let cards = document.querySelectorAll('.container-card');
let arrayCheckboxCadrs = Array.from(cards);

function showAllCards () {
    if (arrayCheckboxCadrs.every(elem => elem.classList.contains('d-none'))){
        for(cardBlock of cards) {
        cardBlock.classList.remove('d-none');
        }
    }
}

function selectperson (item) {
    let arr = document.getElementsByClassName("container-card");
      for(var i=0; i<arr.length; i++){
      if(arr[i].dataset.change == "false") {
        arr[i].classList.add('d-none');
      }
      }
      item.classList.remove('d-none');
      item.dataset.change = "true"
}

function checked (checkBox, card) {
    if(card !== undefined){
        if(checkBox.checked) {
            selectperson (card)
        } else {
            card.classList.add('d-none');
            card.dataset.change = "false";
        }
        showAllCards ()
    }
}
// действие при клике по чекбоксу, скопировать если будет новый
checkboxInt.addEventListener('change', function(){
    checked (checkboxInt, cardInt)
})

checkboxExt.addEventListener('change', function(){
    checked (checkboxExt, cardExt)
})

checkboxTransport.addEventListener('change', function(){
    checked (checkboxTransport, cardTransport)
})

checkboxSafety.addEventListener('change', function(){
    checked (checkboxSafety, cardSafety)
})

checkboxSouvenir.addEventListener('change', function(){
    checked (checkboxSouvenir, cardSouvenir)
})

checkboxRug.addEventListener('change', function(){
    checked (checkboxRug, cardRug)
})
// Функция вызова слайдера
function newSwiperSlid (mySwiper, slider) {
    let mySwiperInt = mySwiper;
    function mobileSlider () {   
        if(window.innerWidth <= 768 && slider.dataset.mobile == 'false') {
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

        if(window.innerWidth > 768) {
            slider.dataset.mobile = 'false';
            if (slider.classList.contains('swiper-container-initialized')) {
                mySwiperInt.destroy();
            }
        }
    }
    mobileSlider ()
    window.addEventListener('resize', () =>{
        mobileSlider ()
    })
}

const sliderInt = searchCard('.card-int');
let mySwiperInt;
if (sliderInt !== undefined) {
    newSwiperSlid (mySwiperInt, sliderInt)
}


const sliderExt = searchCard('.card-exterior');
let mySwiperExt;
if (sliderInt !== undefined) {
    newSwiperSlid (mySwiperExt, sliderExt)
}


const sliderTransport = searchCard('.card-transport');
let mySwiperTransport;
if (sliderTransport !== undefined) {
    newSwiperSlid (mySwiperTransport, sliderTransport)
}



const sliderSafety = searchCard('.card-safety');
let mySwiperSafety;
if (sliderSafety !== undefined) {
    newSwiperSlid (mySwiperSafety, sliderSafety)
}


const sliderSouvenir = searchCard('.card-souvenir');
let mySwiperSouvenir;
if (sliderSouvenir !== undefined) {
    newSwiperSlid (mySwiperSouvenir, sliderSouvenir)
}


const sliderRug = searchCard('.card-rug');
let mySwiperRug;
if (sliderRug !== undefined) {
    newSwiperSlid (mySwipeRug, sliderRug)
}




function newSwiper (swiperContainer , nameFunction) {
    if (swiperContainer !== undefined) {
        nameFunction ()
    }
}


