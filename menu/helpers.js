import { cards } from "./cards.js";

export const createElement = (tagName,attr) => {
    const elem = document.createElement(tagName);
    Object.assign(elem, attr);
    return elem
};
export const sliseOfferCards = (e) => {
    let offer = '';
    offer = e.target.value;
    cards(offer);
}