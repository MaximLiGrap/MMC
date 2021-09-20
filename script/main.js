
    const scrolmenu = document.getElementById('scrolmenu')
        window.addEventListener('scroll', function (e) {
            if (window.pageYOffset > 1) {
                scrolmenu.classList.add('position-fixed')
                scrolmenu.classList.add('menu_wrap_fixed')
            }
            else {
                scrolmenu.classList.remove('position-fixed')
                scrolmenu.classList.remove('menu_wrap_fixed')

            }
        }, { passive: true });


    const navBtn = document.getElementById('nav_btn')
    const nav = document.getElementById('navbarTogglerDemo03')
    navBtn.addEventListener('click', function (event) {
        nav.classList.toggle('show');
    });




    const heroBtn = document.getElementById('hero_btn')
    const heroMenu = document.getElementById('menu_list')
    heroBtn.addEventListener('click', function () {
        heroMenu.classList.toggle('menu_list')
        heroMenu.classList.toggle('d-flex')
        scrolmenu.classList.toggle('visible')

    });

    const form = document.getElementById("search_block");
            const srcBtn = document.getElementById("search_btn");
            srcBtn.addEventListener('click', function(){
                form.classList.toggle('d-none')
            })

            form.addEventListener('click', function (e) {
                const modalInner = form.closest('div')
                console.log(e.target)
                    if (e.target === modalInner) {
                        form.classList.add('d-none');
                    } 
    });

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


    const dropdown = document.getElementById('dropdown_aria_auto');
    const btnDropdown = document.getElementById('btn_auto');
    const dropdownInner = document.getElementById('dropdown_auto');
    const btnClose = document.getElementById("btn_close_auto");

    btnDropdown.addEventListener('click', function (event) {
        dropdown.classList.toggle('d-none');
        event._isClickModal = true;
        dropdownInner.classList.toggle('d-none')
    })

    btnClose.addEventListener("click", function() {
            dropdown.classList.add('d-none');
            dropdownInner.classList.add('d-none')
    })

    dropdown.addEventListener('click', function (event) {
        event._isClickModal = true;
    })

    document.body.addEventListener('click', function (event) {
        if (event._isClickModal) return;
        dropdown.classList.add('d-none');
        dropdownInner.classList.add('d-none')
    })

    const btnDropdown2 = document.getElementById('btn_buyer');
    const dropdownInner2 = document.getElementById('dropdown_buyer');
    const dropdown2 = document.getElementById('dropdown_aria_buyer');
    const btnClose2 = document.getElementById("btn_close_buyer");

    btnDropdown2.addEventListener('click', function (event) {
        dropdown2.classList.toggle('d-none');
        event._isClickModal2 = true;
        dropdownInner2.classList.toggle('d-none')
    })

    btnClose2.addEventListener("click", function() {
            dropdown2.classList.add('d-none');
            dropdownInner2.classList.add('d-none')
    })

    dropdown2.addEventListener('click', function (event) {
        event._isClickModal2 = true;
    })

    document.body.addEventListener('click', function (event) {
        if (event._isClickModal2) return;
        dropdown2.classList.add('d-none');
        dropdownInner2.classList.add('d-none')
    })

    const btnDropdown3 = document.getElementById('btn_servis');
    const dropdownInner3 = document.getElementById('dropdown_servis');
    const dropdown3 = document.getElementById('dropdown_aria_servis');
    const btnClose3 = document.getElementById("btn_close_servis");

    btnDropdown3.addEventListener('click', function (event) {
        dropdown3.classList.toggle('d-none');
        event._isClickModal3 = true;
        dropdownInner3.classList.toggle('d-none')
    })

    btnClose3.addEventListener("click", function() {
            dropdown3.classList.add('d-none');
            dropdownInner3.classList.add('d-none')
    })

    dropdown3.addEventListener('click', function (event) {
        event._isClickModal3 = true;
    })

    document.body.addEventListener('click', function (event) {
        if (event._isClickModal3) return;
        dropdown3.classList.add('d-none');
        dropdownInner3.classList.add('d-none')
    })


    const btnDropdown4 = document.getElementById('btn_mmcworld');
    const dropdownInner4 = document.getElementById('dropdown_mmcworld');
    const dropdown4 = document.getElementById('dropdown_aria_mmcworld');
    const btnClose4 = document.getElementById("btn_close_mmcworld");

    btnDropdown4.addEventListener('click', function (event) {
        dropdown4.classList.toggle('d-none');
        event._isClickModal4 = true;
        dropdownInner4.classList.toggle('d-none')
    })

    btnClose4.addEventListener("click", function() {
            dropdown4.classList.add('d-none');
            dropdownInner4.classList.add('d-none')
    })

    dropdown4.addEventListener('click', function (event) {
        event._isClickModal4 = true;
    })

    document.body.addEventListener('click', function (event) {
        if (event._isClickModal4) return;
        dropdown4.classList.add('d-none');
        dropdownInner4.classList.add('d-none')
    })










 


