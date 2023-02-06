// declaring frequntly used variables
let apiKey = "58eec372ecdf955dc42b741f2dafd45e";
let loader = document.querySelector(".display__loading");
let home = document.querySelector(".display__home");
let catalogueDisplay = document.querySelector(".display__catalogue");
let date = new Date();
let searchResults = document.querySelector(".display__searchResults");
let heroDisplay = document.querySelector(".display__hero");
let favourites = document.querySelector(".display__favourites");

import { checkForFav } from "./favourites.js";
import { privateKey } from "./keys.js";

// takes timestamp as a function parameter and genertes a MD5 Hash

function getHash(ts) {

    let hashCreated = CryptoJS.MD5(ts + privateKey + apiKey).toString();

    return hashCreated;
}

// adds items to the documents and renders page
function addToDOM(results, parent, message) {
    
    console.log(message)
    parent.innerHTML = "";

    for (let item of results) {

        let btn;
        let isFav = checkForFav(item.id)

        if (isFav) {
            btn = `<button class="RemoveFromFav" id="${item.id}"><i class='bx bx-check'></i></button>`;
        }
        else {
            btn = `<button class="addToFav" id="${item.id}"><i class='bx bx-plus'></i></button>`;
        }
        let div = document.createElement("div");


        div.innerHTML = `

        
            <div class="_character" id="${item.id}">
                <div class="character_image" data-id="${item.id}" data-character="true" style="background-image: url('${item.thumbnail}');">
                ${btn}
                </div>
                <div class="name_container">
                    <p class="character_name">${item.name}</p>
                </div>
            </div>
        

        `
        parent.appendChild(div)
    }

}

// Filters the api data
function getDetails(hero) {

    let details = {
        name: hero.name,
        id: hero.id,
        thumbnail: hero.thumbnail.path + "." + hero.thumbnail.extension,
        isFavourite: false,
        description: hero.description,
        comics: hero.comics.available,
        events: hero.events.available,
        stories: hero.stories.available,
        series: hero.series.available
    }

    return details;

}





// exports all function and variables
export {
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
};