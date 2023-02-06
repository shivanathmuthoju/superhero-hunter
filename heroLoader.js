// importing variables
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
    getDetails
} from "./variables.js";

import {
    checkForFav
} from "./favourites.js";

let heroContainer = document.querySelector(".hero__container")

let heroDetails = [];

// when user clicks on hero image it takes the id of the hero and loads the page
window.addEventListener('click', (e) => {
    let targetClicked = e.target;

    let targetId = targetClicked.dataset.id;
    let isTargetCharacter = targetClicked.dataset.character;

    // checks if the user is clicking on an hero image
    
    if (targetId != undefined && isTargetCharacter == "true")
    {
        loader.style.display = "block";
        catalogueDisplay.style.display = "none";
        favourites.style.display = "none";
        searchResults.style.display = "none";

        let ts = date.getTime();
        let hash = getHash(ts);
        let url = `https://gateway.marvel.com:443/v1/public/characters/${targetId}?apikey=${apiKey}&ts=${ts}&hash=${hash}`
        fetch(url)
            .then((response) => response.json())
            .catch((error) => console.log(error))
            .then((data) => {
               
                let results = data.data.results;
                heroDetails = []
                for (let item of results) {
                    
                    let details = getDetails(item);
                    heroDetails.push(details);
                    console.log("Hero Loaded")
                }
                console.log(heroDetails[0])
                addDetailstoDOM(heroDetails[0]);
                heroDisplay.style.display = "grid";
                loader.style.display = "none";
            })
    }
    
    

})

// renders the hero page

function addDetailstoDOM(hero) {

    heroContainer.innerHTML = ""; // resets the hero page 

    let myDiv = document.createElement("div");
    let description = hero.description;
    // checks if there is any description 
    if (description == " " || description == "") {
        description = "No Description Found!!!!!"
    }
    let btn;
    let isFav = checkForFav(hero.id) //checks if the hero is in favourites and loads the appropriate buttons

    if (isFav) {
        btn = `<button class="RemoveFromFav" id="${hero.id}"><i class='bx bx-check'></i></button>`;
    }
    else {
        btn = `<button class="addToFav" id="${hero.id}"><i class='bx bx-plus'></i></button>`;
    }
    // creates the hero page 
    myDiv.innerHTML = `
    
    <div class="hero__image" style="background-image: url('${hero.thumbnail}');">
        ${btn}
    </div>
    <div class="hero__data">
        <div class="heroDisplayNameContainer">
            <h1 class="heroDisplayName">${hero.name}</h1>
        </div>
        <p class="heroDisplayData description">${description}</p>
        <p class="heroDisplayData">Comics : ${hero.comics}</p>
        <p class="heroDisplayData">Series : ${hero.series}</p>
        <p class="heroDisplayData">Events : ${hero.events}</p>
        <p class="heroDisplayData">Stories : ${hero.stories}</p>
    </div>
    

    ` 
    heroContainer.appendChild(myDiv)
}

