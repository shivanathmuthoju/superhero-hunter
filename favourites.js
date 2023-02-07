// -----------  Favourites page functionalitites  ----------

// Imports from variables created
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



let favouritesList = [];
let storedFavourites;
let favouriteBtn = document.getElementById("favourites");
let favouriteContainer = document.querySelector(".favourites__container");

// Fetches favoutire items from local storage everytime the browser reloads
window.addEventListener('load',() => {

    let localData = JSON.parse(localStorage.getItem(storedFavourites));
    console.log(localData, "LocalData");
    console.log(typeof(localData));
    
    if(localData === null || localData === undefined) {
        favouritesList = [];
    }
    else {
        favouritesList = localData;
    }
    
    console.log("Favourites loaded")
})


function setLocalStorage(list) {
    localStorage.setItem(storedFavourites, JSON.stringify(list));
    //sets local storage
}


// Handles click events for favourite buttons

window.addEventListener('click', (e) => {

    let target = e.target;
    let id = target.id;
    // adding and removing from favourites 
    // if the item is not in favourites it adds the id of the hero to favouriteslist else removes the id from the favourites list
    if (target.className == "addToFav") {
        
        favouritesList.push(id);
        target.classList.add("RemoveFromFav");
        target.classList.remove("addToFav");
        console.log(favouritesList)
        setLocalStorage(favouritesList);
        target.innerHTML = `
        <i class='bx bx-check'></i>
        `
        console.log("Added to list");
    }
    else if (target.className == "RemoveFromFav") { 
        
        let newList = favouritesList.filter(item => item != id);
        favouritesList = newList;
        setLocalStorage(favouritesList);
        target.innerHTML = `
         <i class='bx bx-plus'></i>
        `
        target.classList.add("addToFav");
        target.classList.remove("RemoveFromFav");
        console.log("removed from list");


    }

})

// function to check if the item is in favourites or not. Takes the id of the item as parameter
function checkForFav(id) {

    for (let fav in favouritesList) {

        if (favouritesList[fav] == id) {
            return true;
        }

    }

    return false;
}

let favHeroes = [];

// when favourites tab is opened

favouriteBtn.addEventListener('click', () => {
    favouriteContainer.innerHTML = "";
    loader.style.display = "block";
    home.style.display = "none";
    searchResults.style.display = "none";
    heroDisplay.style.display = "none";
    favourites.style.display = "none"
    catalogueDisplay.style.display = "none";
    // if there are no favourites displays no results message
    if (favouritesList.length == 0) {

        let message = document.createElement("p");
        message.innerHTML = " <p class='noResults'>Looks like you don't have any favourites..</p>";
        favouriteContainer.appendChild(message);
        favourites.style.display = "grid";
        loader.style.display = "none";
    }
    else {
        favHeroes = []
        fetchFavourites();   // fetch favourites from local storage
    }

})

// renders the favourites page 
function fetchFavourites() {
    
    for (let listItem of favouritesList) {

        let ts = date.getTime();
        let hash = getHash(ts);
        let url = `https://gateway.marvel.com:443/v1/public/characters/${listItem}?apikey=${apiKey}&ts=${ts}&hash=${hash}`
        fetch(url)
        .then((response) => response.json())
            .then((data) => {
                
                let results = data.data.results;
    
                for (let hero of results) {
        
                    let details = getDetails(hero);
                    favHeroes.push(details)
                }
                
            })
            .then(() => {
                addToDOM(favHeroes, favouriteContainer, "favourites Updated");
                favourites.style.display = "grid";
                loader.style.display = "none";
            })
                  
    }
    
    return;

}


export { checkForFav }

//exports function to other pages
