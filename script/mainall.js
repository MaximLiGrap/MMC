// Изменение цвета автомобиля

if (document.querySelector('.pjs_color-wrapper')) {
    document.querySelector('.pjs_color-wrapper').addEventListener('click', function(event){
        if(event.target.closest('.pjs_color')) {
            console.log(event.target)
            let imgs = document.querySelectorAll('.pls_color-auto');
            let index = [...document.querySelectorAll('.pjs_color')].indexOf(event.target);
            for (let img of imgs) {
                img.classList.remove('active')
            }
            imgs[index].classList.add('active')
            
        }
    })
    let x = null;
    document.querySelector('.auto-color-wrapper').addEventListener('touchstart', e => x = e.touches[0].clientX);
    document.querySelector('.auto-color-wrapper').addEventListener('touchmove', e => {
        if (!x) return;
        x = x - e.touches[0].clientX < 0 ? 1 : -1;
        if(x == -1 && !e.target.parentNode.parentNode.lastElementChild.classList.contains('active')) {
            e.target.parentNode.classList.remove('active');
            e.target.parentNode.nextElementSibling.classList.add('active')
        }

        if(x == 1 && !e.target.parentNode.parentNode.firstElementChild.classList.contains('active')) {
            e.target.parentNode.classList.remove('active');
            e.target.parentNode.previousElementSibling.classList.add('active')
        }
        x = null;
    });
}


// автомобили с пробегом
if(document.querySelector('.old-auto_photo-container')) {
    var oldAuto = new Swiper('.old-auto_photo-container', {
        slideClass: 'old-auto_photo',
        wrapperClass: 'old-auto_photo-wrapper',
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
                centeredSlides: true,
        navigation: {
            nextEl: ".swiper-old-auto-button-next",
            prevEl: ".swiper-old-auto-button-prev",
        },
    })
}

if (document.querySelector('.old-auto_photo-wrapper')) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    document.querySelector('.old-auto_photo-wrapper').addEventListener('click', function(event){
        if(event.target.closest('.old-auto_photo')) {
            let index = [...document.querySelectorAll('.old-auto_photo-img')].indexOf(event.target);
            console.log(index)
            for(let img of document.querySelectorAll('.old-auto_photo-img')) {
                let galeryImg = document.createElement('img');
                galeryImg.classList.add('galery-img')
                galeryImg.setAttribute('src', img.src)
                document.querySelector('.galery_wrapper').append(galeryImg)
            }
            document.querySelector('.galery_wrapper').classList.add('photo_out-wrap-galery')
            document.querySelector('.galery').classList.add('photo_out-slider-galery')
            modal.style.display = "block";
            mobileSliderGalery (index)
        }
    })
    
// Закрыть модалку при клике на крестик
    span.onclick = function() {
        modal.style.display = "none";
        eclipcePhotoGalery.destroy()
        cleanTable(document.querySelector('.galery_wrapper'))
    }

    // Закрыть модалку при клике вне
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        eclipcePhotoGalery.destroy()
        cleanTable(document.querySelector('.galery_wrapper'))
        }
    }
}







const iqonNav = document.querySelector('.container-bar')
const navBtn = document.getElementById('nav_btn')
const nav = document.getElementById('navbarTogglerDemo03')
navBtn.addEventListener('click', function (event) {
nav.classList.toggle('show');
iqonNav.classList.toggle("change")
});


if(document.getElementById("auto-menu-scrol")) {
    var scroll = 0;
    window.onscroll = onScroll;
    function onScroll() {
    var top = window.pageYOffset;
    if (scroll> 100 && !nav.classList.contains('show')) {
        if (scroll > top + 30) {
    
            document.querySelector('.head').classList.remove('scrol_top');
            document.getElementById("auto-menu-scrol").classList.remove('top0')
        } else if (scroll < top) {
            document.querySelector('.head').classList.add('scrol_top');
            document.getElementById("auto-menu-scrol").classList.add('top0')
        
            
        }
    } else {
        document.querySelector('.head').classList.remove('scrol_top');
        document.getElementById("auto-menu-scrol").classList.remove('top0')
    }
    scroll = top;
    
    };
}



if (window.innerWidth>991) {
    let hoverAria = document.getElementById('dropdown_auto');
if (document.querySelector(".link_asx")) {
    document.querySelector(".link_asx").addEventListener('mouseover', function(){
        hoverAria.style = 'background-image: url("img/main-swiper-car/car-iqons/asx.png"); background-size: 25%;'
    })
}

if (document.querySelector(".link_eclipse")) {
    document.querySelector(".link_eclipse").addEventListener('mouseover', function(){
        hoverAria.style = 'background-image: url("img/main-swiper-car/car-iqons/EclipsCrossImage.png"); background-size: 25%;'
        
    })
}

if (document.querySelector(".link_out")) {
    document.querySelector(".link_out").addEventListener('mouseover', function(){
        hoverAria.style = 'background-image: url("img/main-swiper-car/car-iqons/outlander.png"); background-size: 25%;'
        
    })
}

if (document.querySelector(".link_pjs")) {
    document.querySelector(".link_pjs").addEventListener('mouseover', function(){
        hoverAria.style = 'background-image: url("img/main-swiper-car/car-iqons/pajero-sport.png"); background-size: 25%;'
    })
}

if (document.querySelector(".link_out7")) {
    document.querySelector(".link_out7").addEventListener('mouseover', function(){
        hoverAria.style = 'background-image: url("img/main-swiper-car/car-iqons/outlander21-7seats.png"); background-size: 25%;'
    })
}

if (document.querySelector(".link_l200")) {
    document.querySelector(".link_l200").addEventListener('mouseover', function(){
        hoverAria.style = 'background-image: url("img/main-swiper-car/car-iqons/l200car.png"); background-size: 25%;'
    })
}
}


const heroBtn = document.getElementById('hero_btn')
const heroMenu = document.getElementById('menu_list')
heroBtn.addEventListener('click', function () {
heroMenu.classList.toggle('menu_list')
heroMenu.classList.toggle('d-flex')
scrolmenu.classList.toggle('visible')

});

if(document.querySelector('.sort-wrapper')) {
    document.querySelector('.sort-wrapper').addEventListener('click', function(e){
        if(e.target.closest('.sort-btn')) {
            for(let btn of document.querySelectorAll('.sort-btn')){
                btn.classList.remove('text_500')
                btn.classList.remove('active')
            }
            e.target.classList.toggle('text_500')
            e.target.classList.toggle('active')
            e.target.firstElementChild.classList.toggle('rotate')
        }
    })
}

// Поиск
// const form = document.getElementById("search_block");
//     const srcBtn = document.getElementById("search_btn");
//     srcBtn.addEventListener('click', function(){
//         form.classList.toggle('d-none')
//     })

//     form.addEventListener('click', function (e) {
//         const modalInner = form.closest('div')
//         console.log(e.target)
//             if (e.target === modalInner) {
//                 form.classList.add('d-none');
//             } 
// });

const elem1 = document.getElementById("loupe");
const elem2 = document.getElementById("lkiqon");
const downNav = document.getElementById("down_nav");
const upNav = document.getElementById("up_nav");
if (window.matchMedia("(max-width: 991px)").matches) {
downNav.appendChild(elem1);
elem2.classList.add('border_top')
elem2.classList.add('pt-2')  
}


window.onresize = function() {

if (window.matchMedia("(max-width: 991px)").matches) {
    downNav.appendChild(elem1);
    elem2.classList.add('border_top')
    elem2.classList.add('pt-2')  
} else {
    upNav.appendChild(elem1);
    elem2.classList.remove('border_top')
    elem2.classList.remove('pt-2')  
}


}

if (document.querySelector('.img_mcbank')) {
    const logoBank = document.querySelector('.img_mcbank');
    const textBank = document.querySelector('.bank-text');
    if (window.matchMedia("(max-width: 575px)").matches) {
        textBank.appendChild(logoBank);
        logoBank.classList.add('d-block')
    }


    window.onresize = function() {       
        if (window.matchMedia("(max-width: 575px)").matches) {
            textBank.appendChild(logoBank);
            logoBank.classList.add('d-block')  
        } else {
            document.querySelector('.bank-title').appendChild(logoBank); 
        }
        
    }
}




// Меню выпадашки
let navBtnCollection = document.querySelectorAll('.nav_item-btn');
navBtnCollection.forEach(function(btn){
    btn.addEventListener('click', function (event) {
        for(let i of navBtnCollection) {
            if(event.target !== i && i.nextElementSibling.classList.contains('unhidden')) {
                i.nextElementSibling.classList.remove('unhidden');
                i.nextElementSibling.firstElementChild.classList.remove('unhidden');
            }
        }
        event.target.nextElementSibling.classList.toggle('unhidden');
        event.target.nextElementSibling.firstElementChild.classList.toggle('unhidden');
    })
    btn.nextElementSibling.lastElementChild.addEventListener('click', function(){
       btn.nextElementSibling.classList.toggle('unhidden');
       btn.nextElementSibling.firstElementChild.classList.toggle('unhidden');
    })

})

$(document).click(function (e){
    var div = $(".nav_dropdown");
    var Innerdiv = $(".dropdown");
    var btn = $(".nav_item-btn");
    if (!btn.is(e.target) && div.has(e.target).length === 0) {
            div.removeClass('unhidden');
            Innerdiv.removeClass('unhidden');
    }
});

// Меню на посадочных страницах



const eclipceCrossHeroBtn = document.getElementById('auto_hero-menu-btn');
const heroMenuList = document.querySelector('.hero-menu_list');

if (eclipceCrossHeroBtn && heroMenuList) {
    eclipceCrossHeroBtn.addEventListener('click', function(){
        document.querySelector('.container-bar-auto').classList.toggle("change")
        heroMenuList.classList.toggle('d-block');
        eclipceCrossHeroBtn.classList.toggle('active_btn');
    
    })
    
    
    function heroBtnActive () {
        if(window.innerWidth <= 991 && eclipceCrossHeroBtn.dataset.mobile == 'false') {
            eclipceCrossHeroBtn.dataset.mobile = 'true';
            eclipceCrossHeroBtn.removeAttribute("disabled")
        }
        if(window.innerWidth > 991) {
            eclipceCrossHeroBtn.dataset.mobile = 'false';   
            eclipceCrossHeroBtn.setAttribute("disabled", true)
            
            
        }
    }
    
    
    heroBtnActive ()
    
    window.addEventListener('resize', () =>{
        heroBtnActive ();
    })
}





function newSwiperSlidFull (mySwiper, slider) {
    let mySwiperInt = mySwiper;
    function mobileSlider () {   
        mySwiperInt = new Swiper(slider, {
            speed: 1600,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 0,
            effect: "fade",
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
            },
        });

        if (window.innerWidth <= 991) {
            mySwiperInt.destroy();

            mySwiperInt = new Swiper(slider, {
                speed: 1600,
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 0,
                effect: "slide",
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
                // autoplay: {
                //     delay: 5000,
                //     disableOnInteraction: false
                // },
            });

        }
    }
    mobileSlider ()
}



// Слайдер на гланой
let mySwiperHero;
if (document.querySelector('.mySwiperHero')) {
    newSwiperSlidFull (mySwiperHero, '.mySwiperHero')
}



// Сдайдер автомобилей




function newSwiperSlidFull2 (mySwiper, slider) {
    let mySwiperInt = mySwiper;
    function mobileSlider () {   
        mySwiperInt = new Swiper(slider, {
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
    }
    mobileSlider ()
}

let mySwiperBody;
newSwiperSlidFull2 (mySwiperBody, '.mySwiper');


// свайпер карточек


var sliderSpecial = document.querySelector('.special_cards');
var swiperEvent;
var swiperSlide = document.querySelectorAll('.special_card');


function mobileSlider4 () {
    if (sliderSpecial) {
        if(swiperSlide.length > 3) {
            document.querySelector('.container_special').classList.add('container_special-mocard');
            sliderSpecial.classList.add('special_cards-mocard')
            sliderSpecial.dataset.mobile = 'true';
            swiperEvent = new Swiper(sliderSpecial, {
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
            swiperEvent = new Swiper(sliderSpecial, {
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
                swiperEvent.destroy();
            }
        }
    }
}

var sliderOwner = document.querySelector('.swiper_onwer');
var swiperOwner;

function mobileSlider5 () {
    if (sliderOwner) {
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
}
mobileSlider4 ();
mobileSlider5 ()


window.addEventListener('resize', () =>{
    mobileSlider4 ();
    mobileSlider5 ()
})


// Слайдер посадочная эклипс


var sliderPhoto = document.querySelector('.auto-photo');
var eclipcePhoto;
function mobileSlider6 () {
    if (sliderPhoto) {
        if(window.innerWidth <= 991 && sliderPhoto.dataset.mobile == 'false') {
            eclipcePhoto = new Swiper(sliderPhoto, {
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
      
          sliderPhoto.dataset.mobile = 'true';
          }
      
          if(window.innerWidth > 991) {
              sliderPhoto.dataset.mobile = 'false';
              if (sliderPhoto.classList.contains('swiper-container-initialized')) {
                  eclipcePhoto.destroy();
              }
          }
    }
}


mobileSlider6 ();

window.addEventListener('resize', () =>{
    mobileSlider6 ();

})

// Слайдер в характеристиках

var sliderHaract = document.querySelector('.transmission_cards');
var mySwiperHaract;
function mobileSlider7 () {
    if (sliderHaract) {
        if(window.innerWidth <= 780 && sliderHaract.dataset.mobile == 'false') {
            mySwiperHaract = new Swiper(sliderHaract, {
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
    
        sliderHaract.dataset.mobile = 'true';
        }
    
        if(window.innerWidth > 780) {
            sliderHaract.dataset.mobile = 'false';
            if (sliderHaract.classList.contains('swiper-container-initialized')) {
                mySwiperHaract.destroy();
            }
        }
    }
}


mobileSlider7 ()

window.addEventListener('resize', () =>{
    mobileSlider7 ();
})


const btnText1 = document.getElementById('charact-btn1');
const text1 = document.getElementById('charact_card-text1');

let i=1;
if (btnText1 && text1) {
    btnText1.addEventListener('click', function() {
        text1.classList.toggle('charact_card-text-visible');
        i++;
        if(i%2 === 0) {
            btnText1.textContent = 'Скрыть';
        } else {
            btnText1.textContent = 'Подробнее';
        }
    
    })
}

const btnText2 = document.getElementById('charact-btn2');
const text2 = document.getElementById('charact_card-text2');
let j=1;
if (btnText2 && text2) {
    btnText2.addEventListener('click', function() {
        text2.classList.toggle('charact_card-text-visible');
        j++;
        if(j%2 === 0) {
            btnText2.textContent = 'Скрыть';
        } else {
            btnText2.textContent = 'Подробнее';
        }
    
    })
}
function accordion (btn, arrayCards, arrayBtn, classActive, card) {
    document.getElementById(btn).addEventListener('click', function(){
        for( let btn of document.querySelectorAll(arrayBtn)){
            btn.classList.remove(classActive)
        }
        for( let card of document.querySelectorAll(arrayCards)){
            card.classList.remove(classActive)
        }
        document.getElementById(card).classList.add(classActive);
        this.classList.add(classActive)
    })
}

// if(document.querySelector('.charact_cards-super')) {
//     accordion ('btn_collapse-1', '.charact_card-tab', '.btn_tab', 'active', 'collapse-1');
//     accordion ('btn_collapse-2', '.charact_card-tab', '.btn_tab', 'active', 'collapse-2')
//     accordion ('btn_collapse-3', '.charact_card-tab', '.btn_tab', 'active', 'collapse-3')
// }

// if(document.querySelector('.transmission_pjs')) {
//     accordion ('btn_collapse-1', '.charact_card-tab-pjs', '.btn_pjs', 'active', 'collapse-1');
//     accordion ('btn_collapse-2', '.charact_card-tab-pjs', '.btn_pjs', 'active', 'collapse-2')
//     accordion ('btn_collapse-3', '.charact_card-tab-pjs', '.btn_pjs', 'active', 'collapse-3')
//     accordion ('btn_collapse-4', '.charact_card-tab-pjs', '.btn_pjs', 'active', 'collapse-4')
// }

if (document.querySelector('.wraper_btn')) {
    document.querySelector('.wraper_btn').addEventListener('click', function(event){
        if(event.target.closest('.btn_pjs')) {
            console.log(event.target)
            let imgs = document.querySelectorAll('.charact_card-tab-pjs');
            let index = [...document.querySelectorAll('.btn_pjs')].indexOf(event.target);
            for (let img of imgs) {
                img.classList.remove('active')
            }
            for(let btn of document.querySelectorAll('.btn_pjs')) {
                btn.classList.remove('active')
            }
            imgs[index].classList.add('active')
            event.target.classList.add('active')
        }
    })
}



//  Кнопки Комплектация и цены

let arrayBtnConfig = document.querySelectorAll('.config_hero-subtitle')


if (arrayBtnConfig) {
    function activeBtn (array) {
        for (let btn of array) {
            if(window.innerWidth <= 991) {  
                    btn.addEventListener('click', function (event) {
                        console.log(event.target)    
                        event.target.nextElementSibling.classList.toggle('unhidden');
                        event.target.classList.toggle('active_btn');
                    })
            }
            if(window.innerWidth > 991) { 
                    btn.nextElementSibling.classList.remove('unhidden')
                    btn.classList.remove('active_btn');     
            }
        }
        
        }
    
        activeBtn (arrayBtnConfig)
}


// Слайдер Комплектация и цены
var sliderEquipment = document.querySelector('.container_equipment');
var configCard ;
var swiperSlide = document.querySelectorAll('.equipment');

function mobileSlider8 () {
    if (sliderEquipment) {
        if(swiperSlide.length > 3) {
            document.querySelector('.equipment_cards').classList.add('container_special-mocard');
            document.querySelector('.swiper-button-next-equiment').classList.add('active');
            document.querySelector('.swiper-button-prev-equiment').classList.add('active');
            sliderEquipment.classList.add('special_cards-mocard')
            sliderEquipment.dataset.mobile = 'true';
            configCard = new Swiper(sliderEquipment, {
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
        if(window.innerWidth <= 1200 && sliderEquipment.dataset.mobile == 'false') {
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
    
        sliderEquipment.dataset.mobile = 'true';
        }
    
        if(window.innerWidth > 1200) {
            sliderEquipment.dataset.mobile = 'false';
            if (sliderEquipment.classList.contains('swiper-container-initialized')) {
                configCard .destroy();
            }
        }
    }
}

mobileSlider8 ()

window.addEventListener('resize', () =>{
    mobileSlider8 ();
})

// Галерея в модальном окне
var eclipcePhotoGalery;
function mobileSliderGalery (nomberslide) {
    if(document.querySelector('.galery')) {
            eclipcePhotoGalery = new Swiper(document.querySelector('.galery'), {
              slideClass: 'galery-img',
              wrapperClass: 'galery_wrapper',
              slidesPerView: "auto",
              slidesPerGroup: 1,
              centeredSlides: true,
              spaceBetween: 30,
              initialSlide: nomberslide,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            })  
    }
}



// очистка модалки
function cleanTable(tbody) {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
}


if (document.querySelector('.calc_dop')) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    document.querySelector('.calc_dop').addEventListener('click', function(event){
        if(event.target.closest('.popap')) {
            modal.style.display = "block";
        }
    })
    
    // Закрыть модалку при клике на крестик
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }
    
    // Закрыть модалку при клике вне
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}


// Галерея
if (document.querySelector('.photo_out-wrap') && window.innerWidth > 768) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    document.querySelector('.photo_out-wrap').addEventListener('click', function(event){
        if(event.target.closest('.out-img')) {
            let index = [...document.querySelectorAll('.imge-out')].indexOf(event.target);
            console.log(index)
            for(let img of document.querySelectorAll('.imge-out')) {
                let galeryImg = document.createElement('img');
                galeryImg.classList.add('galery-img')
                galeryImg.setAttribute('src', img.src)
                document.querySelector('.galery_wrapper').append(galeryImg)
            }
            document.querySelector('.galery_wrapper').classList.add('photo_out-wrap-galery')
            document.querySelector('.galery').classList.add('photo_out-slider-galery')
            modal.style.display = "block";
            mobileSliderGalery (index)
        }
    })
    
// Закрыть модалку при клике на крестик
    span.onclick = function() {
        modal.style.display = "none";
        eclipcePhotoGalery.destroy()
        cleanTable(document.querySelector('.galery_wrapper'))
    }

    // Закрыть модалку при клике вне
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        eclipcePhotoGalery.destroy()
        cleanTable(document.querySelector('.galery_wrapper'))
        }
    }
}

if (document.querySelector('.photo_in-wrap') && window.innerWidth > 768) {
    document.querySelector('.photo_in-wrap').addEventListener('click', function(event){
        if(event.target.closest('.in-img')) {
            let index = [...document.querySelectorAll('.imge-in')].indexOf(event.target);
            console.log(index)
            for(let img of document.querySelectorAll('.imge-in')) {
                let galeryImg = document.createElement('img');
                galeryImg.classList.add('galery-img')
                galeryImg.setAttribute('src', img.src)
                document.querySelector('.galery_wrapper').append(galeryImg)
            }
            document.querySelector('.galery_wrapper').classList.add('photo_out-wrap-galery')
            document.querySelector('.galery').classList.add('photo_out-slider-galery')
            modal.style.display = "block";
            mobileSliderGalery (index)
        }
    })
}





// Слайдер в фото и видео
var sliderPhotoOut = document.querySelector('.photo_out-slider');
var eclipcePhotoOut ;
function mobileSlider9 () {
    if(sliderPhotoOut) {
        if(window.innerWidth <= 768 && sliderPhotoOut.dataset.mobile == 'false') {
            eclipcePhotoOut = new Swiper(sliderPhotoOut, {
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
      
          sliderPhotoOut.dataset.mobile = 'true';
          }
      
          if(window.innerWidth > 768) {
              sliderPhotoOut.dataset.mobile = 'false';
              if (sliderPhotoOut.classList.contains('swiper-container-initialized')) {
                  eclipcePhotoOut .destroy();
              }
          }
    }
}

var sliderIn = document.querySelector('.photo_in-slider');
var eclipcePhotoIn;
function mobileSlider10 () {
    if(sliderIn) {
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
}

    
mobileSlider9 ();
mobileSlider10 ()

window.addEventListener('resize', () =>{
    mobileSlider9 ();
    mobileSlider10 ()
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


//   async function loadClients() {
//     const response = await fetch('https://www.mitsubishi-motors.ru/ajax/service/', {
//     method: 'GET',
//     headers: { 'Content-Type': 'aplication/json' },
//     body: JSON.stringify(client) 
// })
// const data = await response.json()
//     return  {response, data };
// }

// let autoArray =  loadClients();


// const address = fetch("https://www.mitsubishi-motors.ru/ajax/service/")
//   .then((response) => response.json());

// const printAddress = async () => {
//   const a = await address;
//   console.log(a);
// };

// let arrayCara = printAddress();


// function createOption (id) {
//     let select = document.getElementById(id);

   
    

// }


