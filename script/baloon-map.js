function createElementBaloon (map) {

    const container = document.createElement('div');
    container.classList.add('diler-name', 'p-4');

    const firstBlok = document.createElement('div');
    firstBlok.classList.add('mb-3')
    const firstBlokText1 = document.createElement('p');
    firstBlokText1.classList.add('text-big', 'text_500', 'text-white');
    firstBlokText1.textContent = 'vaasfasffasfas'
    const firstBlokText2 = document.createElement('p');
    firstBlokText2.classList.add('text-white');
    firstBlok.append(firstBlokText1)
    firstBlok.append(firstBlokText2)

    const blok2 = document.createElement('div');
    blok2.classList.add('mb-3', 'd-flex')
    const blok2Text1 = document.createElement('p')
    blok2Text1.classList.add('text_centre', 'px-2', 'bg_anthracite', 'text-white', 'mx-1');
    const blok2Text2 = document.createElement('p')
    blok2Text2.classList.add('text_centre', 'px-2', 'bg_red', 'mx-1');

    blok2.append(blok2Text1);
    blok2.append(blok2Text2);

    const blok3 = document.createElement('div');
    blok3.classList.add('mb-3');
    const blok3Text1 = document.createElement('p')
    const blok3Text1Link = document.createElement('a');
    blok3Text1Link.classList.add('text-white')
    blok3Text1.append(blok3Text1Link);

    const blok3Text2 = document.createElement('p')
    const blok3Text2Link = document.createElement('a');
    blok3Text2Link.classList.add('text-white')
    blok3Text2.append(blok3Text2Link);

    blok3.append(blok3Text1)
    blok3.append(blok3Text2)

    const blok4 = document.createElement('div');
    blok4.classList.add('mb-3');
    const blok4Text1 = document.createElement('p');
    const blok4Text1Link = document.createElement('a');
    blok4Text1Link.classList.add('text-white');

    blok4Text1.append(blok4Text1Link)
    blok4.append(blok4Text1);

    container.append(firstBlok);
    container.append(blok2);
    container.append(blok3);
    container.append(blok4);
    map.append(container)

    return({
        firstBlokText1,
        firstBlokText2,
        blok2Text1,
        blok2Text2,
        blok3Text1Link,
        blok3Text2Link,
        blok4Text1Link,
    })
}

if(document.getElementById('map')) {
    document.getElementById('map').addEventListener('click', function(event){
        if(event.target.closest('.ymaps-2-1-79-image')) {
            if(document.querySelector('.diler-name')) {
                document.querySelector('.diler-name').remove();
            }
            const baloon = createElementBaloon (document.getElementById('map_block'));
            baloon.firstBlokText1.textContent = document.querySelector('.ymaps-2-1-79-balloon__content').querySelectorAll('tr')[0].textContent;
            baloon.firstBlokText2.textContent = document.querySelector('.ymaps-2-1-79-balloon__content').querySelectorAll('tr')[1].textContent;
            baloon.blok3Text1Link.textContent = document.querySelector('.ymaps-2-1-79-balloon__content').querySelectorAll('tr')[2].querySelectorAll('a')[0].textContent;
            baloon.blok3Text2Link.textContent = document.querySelector('.ymaps-2-1-79-balloon__content').querySelectorAll('tr')[2].querySelectorAll('a')[1].textContent;
            baloon.blok4Text1Link.textContent = document.querySelector('.ymaps-2-1-79-balloon__content').querySelectorAll('tr')[2].textContent;
        }
    })
}
