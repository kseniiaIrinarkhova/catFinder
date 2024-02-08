//import helper functions
import * as Utilities from './utilities.js'

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The table with additional info element
const breedInfoTable = document.getElementById("breedInfo");


//provide a link to page with another type of fetching
Utilities.changeFetchingType("Axios", "index_axios.js")

/**
 * Async function that gets breeds name from TheCat API and sdd them to select element
 */
(async function initialLoad() {
    //API end point to get breeds
    const url = `https://api.thecatapi.com/v1/breeds`;
    //get result
    const response = await fetch(url, {
        headers: {
            'x-api-key': Utilities.API_KEY
        }
    });
    //get JSON list of breeds
    const breeds = await response.json();
    //create options and add them to select
    Utilities.createOptions(breeds, breedSelect);
    //add images for first selected breed
    getImages(breeds[0].id);
})();


//event listener for changing selected option in select element
breedSelect.addEventListener('change', selectBreed);

/**
 * Event handler that takes images for selected breed and shows them in carousel
 * @param {object} event 
 */
function selectBreed(event) {
    //take value of selected option - it's our breed ID
    const breed_id = event.target.value;
    getImages(breed_id)
}

/**
 * Function that get images from API based on selected breed
 * @param {string} breed_id id of selected breed
 */
function getImages(breed_id) {
    //create url for getting not more than 10 random pictures of selected breed ID
    const url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breed_id}&api_key=${Utilities.API_KEY}`
    //fetch data
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //create carousel from images
            Utilities.createCarousel(data);
            //create table with additional information about breed
            Utilities.createAdditionalInformation(data[0].breeds[0],breedInfoTable);
        })
        .catch((error) => { console.log(error) });
}


