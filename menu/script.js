import { cards } from "./cards.js";
import { sliseOfferCards } from "./helpers.js";

const button = document.querySelector('.burgerMenuButton');
const burgetMenu = document.querySelector('.burgerContainerOpen');
const offerButtonsBlock = document.querySelector('.offerButtons');
const refreshButton = document.querySelector('.refreshButton');

let size = window.innerWidth;
let refresh = false;
let category = 'coffee';

button.addEventListener('click', () => { 
    burgetMenu.classList.toggle('burgerClose');
    button.classList.toggle('burgerEx');
});
burgetMenu.addEventListener('click', (e) => {
    if (e.target.closest('.link')) {
        burgetMenu.classList.toggle('burgerClose');
        button.classList.toggle('burgerEx');
    }
});

cards(category, size, refresh);

window.addEventListener('resize', function() {
    size = window.innerWidth;
    cards(category, size, refresh);
    return size;
}, true);

offerButtonsBlock.addEventListener('change', (e) => {
    refresh = false;
    category = sliseOfferCards(e, size, refresh);
    refreshButton.style.display = 'block';
});
refreshButton.addEventListener('click', function() {
    refresh = !refresh;
    cards(category, size, refresh);
    refreshButton.style.display = 'none';
});