// importing variables from the script page
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

let searchBar = document.getElementById("search");
let resultsConainter =  document.querySelector(".searchResults__container")
let resultsForSearch = [];
let searchedForSimilarItems = false;
let search = "";
let results = [];

// when user types a search
searchBar.addEventListener('keydown', (e) => {
    //if user presses enter
    if (e.code == "Enter") {

        searchedForSimilarItems = false;
        home.style.display = "none";
        loader.style.display = "block";
        heroDisplay.style.display = "none";
        catalogueDisplay.style.display = "none";
        searchResults.style.display = "none";
        favourites.style.display = "none";
        search = searchBar.value.toLowerCase();
        searchBar.value = ""; // resets the search bar to blank
        // checks if the value is empty or not
        if (search == " " || search == "") {
            alert("Please enter a search value");
            home.style.display = "grid";
            loader.style.display = "none";
            return;
        }
        // if user types home displays the home page else gets the data for the search
        if (search == "home") {
            
            home.style.display = "grid";
            setTimeout(() => {
                loader.style.display = "none"
            }, 300);
            console.log("You've reached Home!!")

            return;
        }
        
        let ts = date.getTime();
        let hash = getHash(ts);
        let url = `http://gateway.marvel.com/v1/public/characters?name=${search}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
        resultsForSearch = [];
        fetchAPIForSearch(url)
              
       
    }
})
// seraches for the query
function fetchAPIForSearch(url) {
    let urlRecieved = url;
    fetch(urlRecieved)
        .then((response) => response.json())
        .then((data) => {
            results = data.data.results
            for (let hero of results) {
                
                let details = getDetails(hero)
                resultsForSearch.push(details)
            }

            // if the superhero is found then displays the superhero page
            if (resultsForSearch.length > 0) {
                resultsConainter.innerHTML = ""
                addToDOM(resultsForSearch, resultsConainter, "Results Updated!!!!");
                displaySearchResults();
                return;
            } // if there is no data found, checks for similar items, if there are no similar items shows message
            else if (resultsForSearch.length == 0) {
            
                if (searchedForSimilarItems) {
                resultsConainter.innerHTML = "";
                let message = document.createElement("p");
                message.innerHTML = " <p class='noResults'>No results Found!!</p>";
                resultsConainter.appendChild(message);
                displaySearchResults();
                
                    
                return;

                }
                else if (!searchedForSimilarItems)
                {
                    let ts = date.getTime();
                    let hash = getHash(ts);
                    let similaritems = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${search}&limit=10&ts=${ts}&apikey=${apiKey}&hash=${hash}`;
                    searchedForSimilarItems = true;
                    fetchAPIForSearch(similaritems);
                
                }

            }

        })
}
// displays results
function displaySearchResults() {
    searchResults.style.display = "grid";
    loader.style.display = "none";
}

