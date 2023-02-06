//imports necessary varibles and functions
import {
    apiKey,
    loader,
    home,
    catalogueDisplay,
    date,
    searchResults,
    heroDisplay,
    favourites,
    getHash,
    addToDOM,
    getDetails
} from "./variables.js";



let catalogue_btn = document.getElementById("catalogue");
let catalogueContainer = document.querySelector(".catalogue_container");
let loadMoreBtn = document.getElementById("catalogue_more")

let catalog = [];

// when user clicks on catalogue button 
catalogue_btn.addEventListener('click', () => {
    catalog = [];
    callAPIforCatalogue();
})

loadMoreBtn.addEventListener('click', callAPIforCatalogue);

// calls API and fetches data from the api
function callAPIforCatalogue() {

    loader.style.display = "block";
    home.style.display = "none";
    searchResults.style.display = "none";
    heroDisplay.style.display = "none";
    favourites.style.display = "none"

    let ts = date.getTime();
    let hash = getHash(ts);
    let offset = catalog.length; // sets offset to get data 
    let url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&offset=${offset}&apikey=${apiKey}&hash=${hash}`;
    
    fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
    .then((data) => {
        
        let results = data.data.results;
            
            for (let hero of results) {
                
                let details = getDetails(hero);
                catalog.push(details)
            }
            
            
            addToDOM(catalog, catalogueContainer, "Catalogue Updated!!");
            catalogueDisplay.style.display = "grid";
            loader.style.display = "none";
        });
            
        
}

