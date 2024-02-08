//import carousel functions
import * as Carousel from "./Carousel.js";

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_S30DSBzPaRQQFXxA0mjdkXTwpBXwEUFvkol8yBJ3QPnD3UUItjNHtZCg608Yqi3w";

//UserId for post requests
const SUB_ID = 'seny-iri';

/**
 * Helper function that creates options for select element and add them to DOM
 * @param {list of objects} objectList list of items that would be options
 * @param {DOM object} parentObject referance to select element
 */
function createOptions(objectList, parentObject) {

    objectList.forEach(element => {
        //create new option element
        const optionElement = document.createElement("option");
        //add value attribute and text
        optionElement.setAttribute("value", element.id);
        optionElement.textContent = element.name
        //append to select element new child
        parentObject.appendChild(optionElement);
    });
}

/**
 * Helper function that create the carousel object and add carousel items based on data from API
 * @param {list of objects} imagesArray list of objects from API that represents images
 */
function createCarousel(imagesArray, notFavorites = true) {
    //clear current carousel if we had it on page
    Carousel.clear();
    //start carousel creation

    imagesArray.forEach((image) => {
        //create a new carousel item
        let item;
        if(notFavorites){
            item = Carousel.createCarouselItem(image.url, `${image.breeds[0].name} example`, image.id);
        }
        else{
            item = Carousel.createCarouselItem(image.image.url, `Cat image`, image.image.id);
        }
        //add item to carousel
        Carousel.appendCarousel(item)
    })

    Carousel.start();
    //loop through all images

}

/**
 * Helper function that fulfill table with information about breed
 * @param {object} breedInfo object that collect breed information
 * @param {object} parentObject table element that contains information about breed
 */
function createAdditionalInformation(breedInfo, parentObject) {
    //clear table in case it has information about previous breed
    clearTable(parentObject)
    //add information using key from breed object
    for (let parameter_key in breedInfo) {
        try {
            let td = {};
            switch (parameter_key) {
                case "weight":
                    //add information information in different units of measure
                    td = parentObject.querySelector(`#breed-${parameter_key}`)
                    td.textContent = `${breedInfo[parameter_key].imperial} lb or ${breedInfo[parameter_key].metric} kg`;
                    break;
                case "alt_names":
                    //add alternative names to NAME cell if they exist
                    td = parentObject.querySelector(`#breed-name`)
                    if (breedInfo[parameter_key]) td.textContent += ` (${breedInfo[parameter_key]}) `;
                    break;
                case "wikipedia_url":
                    //add link instead of text
                    let anchor = parentObject.querySelector(`#breed-${parameter_key}`)
                    anchor.setAttribute("href", breedInfo[parameter_key])
                    break
                default:
                    //for all cells that contains id with information add data
                    td = parentObject.querySelector(`#breed-${parameter_key}`)
                    //change 0 data to No and 1 - to Yes, leave other type as it is
                    td.textContent = breedInfo[parameter_key] === 0 ? "no" : breedInfo[parameter_key] === 1 ? "yes" : breedInfo[parameter_key];
                    break;
            }
        }
        //we could find some parameters that we don't use in table, just skip them
        catch (error) {
            continue;
        }
    }
}

/**
 * Helper function that cleans all data in table
 * @param {object} parentObject table element that contains information about breed
 */
function clearTable(parentObject) {
    const name = parentObject.querySelector("#breed-name")
    name.textContent = "";
    const cells = parentObject.querySelectorAll("td");
    for (let index = 0; index < cells.length; index++) {
        if (cells[index].getAttribute('id')) {
            cells[index].textContent = "";
        }

    }

}

function changeFetchingType(typeName, jsFileName){
    const fetchChange = document.getElementById("change");
    fetchChange.textContent = `Change fetch method to ${typeName}!`;
    fetchChange.onclick = changeScriptFile
    function changeScriptFile() {
        const mainJSfile = document.getElementById("mainJSfile")
        mainJSfile.setAttribute("src", jsFileName)
    }
}

export { createOptions, createCarousel, createAdditionalInformation, changeFetchingType, API_KEY, SUB_ID }