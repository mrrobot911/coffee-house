export const cards = async (category, size, refresh) => {
    const offerContainer = document.querySelector('.offerContainer');
    const refreshButton = document.querySelector('.refreshButton');
    const body = document.querySelector('body');
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
            offersArrayItem.addEventListener('click', function modalOpen(){
                const modal = document.createElement('div');
                modal.innerHTML = `
                <div class="modalWrapper"></div>
                <div class="modalContainer">
                    <div class="offerItemModalImg">
                        <img src="../assets/images/${category}-${i + 1}.${category === 'coffee' ? 'jpg' : 'png'}" alt=${item.name}>
                    </div>
                    <div>
                        <h2>${item.name}</h2>
                        <h3>${item.description}</h3>
                        <p>Size</p>
                        <div class="offerButtons">
                            ${Object.keys(item.sizes).map(el => {
                                return (
                                `<input type="radio" id=${el} name="sizes" value=${el}/>
                                <label  for=${el} class="offerButtonsItem"><span>${el}</span>${item.sizes[`${el}`].size}</label>`
                                )
                            }).join('')}
                        </div>
                        <p>Additives</p>
                        <div class="offerButtons">
                            ${Object.keys(item.additives).map(el => {
                                return (
                                `<input type="radio" id=${el} name="additives" value=${el}/>
                                <label  for=${el} class="offerButtonsItem"><span>${el}</span>${item.additives[`${el}`].name}</label>`
                                )
                            }).join('')}
                        </div>
                        <div class="totalPrice">
                            <p>Total:</p>
                            <p>${item.price}</p>
                        </div>
                        <br/>
                        <p>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
                        <button>Close</button>
                    </div>
                </div>
                `;
                body.append(modal);
            })
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