export const cards = async (category) => {
    const offerContainer = document.querySelector('.offerContainer');
    function fetchDB() {
        return fetch("../products.json")
            .then(result => {return result.json()});
    }
    const seasonArray = await fetchDB();
    const items = seasonArray.filter((item) => item.category === category).map((item, i) => {
        const seasonArrayItem = document.createElement('article');
        seasonArrayItem.className = "offerCard opacity";
        seasonArrayItem.insertAdjacentHTML('beforeend', `
        <div class="offerItemImage">
            <img src="../assets/images/${category}-${i + 1}.${category === 'coffee' ? 'jpg' : 'png'}" alt=${item.name}>
        </div>
        <div class="offerItemText">
            <h2>${item.name}</h2>
            <h3>${item.description}</h3>
            <p>$ ${item.price}</p>
        </div>
        `);
        return seasonArrayItem
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