import { cards } from "./cards.js";
import { sliseOfferCards } from "./helpers.js";

const button = document.querySelector('.burgerMenuButton');
const burgetMenu = document.querySelector('.burgerContainerOpen');
const offerButtonsBlock = document.querySelector('.offerButtons');

button.addEventListener('click', () => { 
    burgetMenu.classList.toggle('burgerClose');
    button.classList.toggle('burgerEx');
});
burgetMenu.addEventListener('click', (e) => {
    if (e.target.closest('.link')) {
        burgetMenu.classList.toggle('burgerClose');
        button.classList.toggle('burgerEx');
    }
})
cards('coffee');

offerButtonsBlock.addEventListener('change', sliseOfferCards);