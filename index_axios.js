import axios from "axios";
//import helper functions
import * as Utilities from './utilities.js'

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
// The table with additional info element
const breedInfoTable = document.getElementById("breedInfo");
//body element
const bodyElement = document.querySelector("body")


//provide a link to page with another type of fetching
Utilities.changeFetchingType("Fetch", "index.js")


// Set config defaults when creating the instance
const instance = axios.create();

// Alter defaults after instance has been created
instance.defaults.headers.common['x-api-key'] = Utilities.API_KEY;
instance.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';


//Interceptors for request
instance.interceptors.request.use((request) => {
    console.log("request begins")
    //change cursor
    bodyElement.style.cursor = "progress"
    //get new metadata for calculating durations of requests
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
    //refresh progress bar
    progressBar.style.width = "0%"
    return request;
}, (error) => {
    return Promise.reject(error);
});
//Interceptors for respond
instance.interceptors.response.use(
    (response) => {
        //log the respond
        console.log("response returns")
        //delete styling for cursor
        bodyElement.style.removeProperty("cursor")
        //changing metadata and calculating request duration
        response.config.metadata.endTime = new Date().getTime();
        response.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;
        return response;
    },
    (error) => {
        error.config.metadata.endTime = new Date().getTime();
        error.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;
        throw error;
    });

/**
 * Async function that gets breeds name from TheCat API and sdd them to select element
 */
(async function initialLoad() {
    //API end point to get breeds
    const url = `https://api.thecatapi.com/v1/breeds`;
    //get result
    const { data, durationInMS } = await instance.get(url);
    console.log(durationInMS)
    //create options and add them to select
    // createOptions(data);
    Utilities.createOptions(data, breedSelect);
    //add images for first selected breed
    getImages(data[0].id);
})();

/**
 * Add animation for progress bar
 * @param {event object} ProgressEvent event object from axious property
 */
function updateProgress(ProgressEvent) {
    progressBar.style.width = String(ProgressEvent.progress * 100) + "%"
}

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
    const url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breed_id}`
    //fetch data
    instance.get(url, { onDownloadProgress: updateProgress })
        .then((response) => {
            //log respond duration
            console.log(response.durationInMS)
            //create carousel from images
            Utilities.createCarousel(response.data);
            //create table with additional information about breed
            Utilities.createAdditionalInformation(response.data[0].breeds[0], breedInfoTable)
        })
        .catch((error) => { console.log(error) });
}

/**
 * Function that add or delete image from favorites
 * @param {string} imgId image ID 
 */
export async function favourite(imgId) {
    //url for checking id the picture is in our favorite list
    let url = `https://api.thecatapi.com/v1/favourites?sub_id=${Utilities.SUB_ID}&image_id=${imgId}`
    //let response = await instance.get(url);
    instance.get(url)
        .then((response) => {
            //if we get data - then picture in favorites
            if (response.data.length) {
                //take this favoriteID from response
                url = `https://api.thecatapi.com/v1/favourites/${response.data[0].id}`
                //try to delete image from favorites
                return instance.delete(url)
                    .then((delResponse) => {
                        //if successfull - show the alert
                        alert("Image was deleted from your favorites!")
                        return delResponse;
                    })
                    .catch((err) => { throw err });
            }
            else {
                //if we don't have picture with imgID in favorites - add it
                //prepate body of post request
                const requestBody = {
                    "image_id": imgId, //image id
                    "sub_id": Utilities.SUB_ID //user ID
                }
                //change API end point url
                url = "https://api.thecatapi.com/v1/favourites"
                //try to post image to favorites
                return instance.post(url, requestBody)
                    .then((res) => {
                        //if successful - show alert
                        alert("Image was added to your favorites!")
                        return res;
                    })
                    .catch((err) => { throw err });
            }
        })
        .then((response) => {
            //if all actions are successful - return the responce
            return response;
        })
        .catch((err) => { console.log(err) })
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */
getFavouritesBtn.addEventListener('click', getFavourites)

function getFavourites(event) {
    let url = `https://api.thecatapi.com/v1/favourites?limit=20&sub_id=${Utilities.SUB_ID}`
    instance.get(url)
        .then((response) => {
            if (response.data.length) {
                console.log(response.data)
                Utilities.createCarousel(response.data, false)
            }
        })
        .catch((err) => { console.log(err) });
}
/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
