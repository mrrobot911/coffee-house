export const cards = async (category, size, refresh) => {
    const offerContainer = document.querySelector('.offerContainer');
    const refreshButton = document.querySelector('.refreshButton');
    function fetchDB() {
        return fetch("../products.json")
            .then(result => {return result.json()});
    }
    const offersArray = await fetchDB();
    const offersCategoryArray = offersArray.filter((item) => item.category === category);
    if (offersCategoryArray.length <= 4){
        refreshButton.style.display = 'none';
    }
    const items = offersCategoryArray
        .slice(0, refresh || size >= 768 ? undefined : 4)
        .map((item, i) => {
            const offersArrayItem = document.createElement('article');
            offersArrayItem.className = "offerCard opacity";
            offersArrayItem.insertAdjacentHTML('beforeend', `
            <div class="offerItemImage">
                <img src="../assets/images/${category}-${i + 1}.${category === 'coffee' ? 'jpg' : 'png'}" alt=${item.name}>
            </div>
            <div class="offerItemText">
                <h2>${item.name}</h2>
                <h3>${item.description}</h3>
                <p>$ ${item.price}</p>
            </div>
            `);
            return offersArrayItem
        });

    if (offerContainer.childNodes.length > 1) {
        let flag = true;
        offerContainer.childNodes.forEach(el => el.className="offerCard opacity");
        setTimeout(() => {
            offerContainer.replaceChildren(...items);
            flag = false;
        }, 500);
        setTimeout(() => {
            offerContainer.childNodes.forEach(el => el.className="offerCard");
            flag = true;
        }, 550);
    } else {
        offerContainer.replaceChildren(...items);
        offerContainer.childNodes.forEach(el => el.className="offerCard");
    }

    return offerContainer
}