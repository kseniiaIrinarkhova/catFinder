This simple application was develop in case of testing different ways of fetching datafrom external API in JavaScript.

# Set up instructions

1. To make this project work you need to get API KEY from [TheCatAPI](https://thecatapi.com/). 
2. After clonning the repository you need to change variable `API_KEY` in `utilities.js`.

![API Key place](/key_place.png "Place in utilities.js")

3. You also could change SUB_ID value if you want to personolize a little bit this project. This variable save username for post method.

## The scope of tasks:

1. [x] Create an async function "initialLoad" that does the following:
* Retrieve a list of breeds from the cat API using fetch().
* Create new <options> for each of these breeds, and append them to breedSelect.
    * Each option should have a value attribute equal to the id of the breed.
    * Each option should display text equal to the name of the breed.
* This function should execute immediately.

2. [x] Create an event handler for breedSelect that does the following:
* Retrieve information on the selected breed from the cat API using fetch().
    * Make sure your request is receiving multiple array items!
    * Check the API documentation if you are only getting a single object.
* For each object in the response array, create a new element for the carousel.
    * Append each of these new elements to the carousel.
* Use the other data you have been given to create an informational section within the infoDump element.
    * Be creative with how you create DOM elements and HTML.
    * Feel free to edit index.html and styles.css to suit your needs.
    * Remember that functionality comes first, but user experience and design are also important.
* Each new selection should clear, re-populate, and restart the carousel.
* Add a call to this function to the end of your initialLoad function above to create the initial carousel.

3. [x] Create an additional file to handle an alternative approach.

4. [x] Within this additional file, change all of your fetch() functions to Axios!
* Axios has already been imported for you within index.js.
* If you've done everything correctly up to this point, this should be simple.
* If it is not simple, take a moment to re-evaluate your original code.
* Hint: Axios has the ability to set default headers. Use this to your advantage by setting a default header with your API key so that you do not have to send it manually with all of your requests! You can also set a default base URL!

5. [x] Add Axios interceptors to log the time between request and response to the console.
* Hint: you already have access to code that does this!
* Add a console.log statement to indicate when requests begin.
* As an added challenge, try to do this on your own without referencing the lesson material.

6. [x] Create a progress bar to indicate the request is in progress.
* The progressBar element has already been created for you.
    * You need only to modify its width style property to align with the request progress.
* In your request interceptor, set the width of the progressBar element to 0%.
    * This is to reset the progress with each request.
* Research the axios onDownloadProgress config option.
* Create a function "updateProgress" that receives a ProgressEvent object.
    * Pass this function to the axios onDownloadProgress config option in your event handler
* console.log your ProgressEvent object within updateProgress, and familiarize yourself with its structure.
    * Update the progress of the request using the properties you are given.
* Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire once or twice per request to this API. This is still a concept worth familiarizing yourself with for future projects.

7. [x] As a final element of progress indication, add the following to your Axios interceptors:
* In your request interceptor, set the body element's cursor style to "progress."
* In your response interceptor, set the body element's cursor style to "default."

8. [x] To practice posting data, we will create a system to "favourite" certain images.
* The skeleton of this favourite() function has already been created for you.
* This function is used within Carousel.js to add the event listener as items are created.
    * This is why we use the export keyword for this function.
* Post to the cat API's favourites endpoint with the given id.
* The API documentation gives examples of this functionality using fetch(); use Axios!
* Add additional logic to this function such that if the image is already favourited, you delete that favourite using the API, giving this function "toggle" behavior.
* You can call this function by clicking on the heart at the top right of any image.

9. [x] Test your favourite() function by creating a getFavourites() function.
* Use Axios to get all of your favourites from the cat API.
* Clear the carousel and display your favourites when the button is clicked.
* You will have to bind this event listener to getFavouritesBtn yourself.
* Hint: you already have all of the logic built for building a carousel. If that is not in its own function, maybe it should be so that you do not have to repeat yourself in this section.
