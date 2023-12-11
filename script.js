const button = document.querySelector('.burgerMenuButton');
const burgetMenu = document.querySelector('.burgerContainerOpen')
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