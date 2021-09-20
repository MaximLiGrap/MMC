
    const eclipceCrossHeroBtn = document.getElementById('auto_hero-menu-btn');
    const heroMenuList = document.querySelector('.hero-menu_list');

    eclipceCrossHeroBtn.addEventListener('click', function(){
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





