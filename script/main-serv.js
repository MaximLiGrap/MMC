const maskBlock = document.querySelector('.promo_wrapper');
const maskGood = document.querySelector('.promo_img-back');
const maskBad = document.querySelector('.flip-mask-wrapper');



document.body.addEventListener('mousemove', function(event){
    // maskGood.setAttribute('style', `width: ${event.offsetX}px`)
    maskBad.setAttribute('style', `width: calc(100% - ${event.offsetX}px)`)
})

const btnServ = document.getElementById('serv_btn');
const listServ = document.querySelector('.serv_diller-list');

let k = 1;
btnServ.addEventListener('click', function() {
    listServ.classList.toggle('open');
    k++;
    if(k%2 == 0) {
        btnServ.textContent = 'Скрыть список дилеров'
    } else {
        btnServ.textContent = 'Показать весь список'
    }
})