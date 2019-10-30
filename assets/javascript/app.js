function getGif() {
    //takes animal name from input entered
    let foodInput = "spaghetti";

    //resets page count if different animal chosen
    if(currentAnimal != animalName){
        gifPage = 0;
    }

    //object containing parameters 
    const queryParams = {
        "api_key": "CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2",
        q: animalName,
        "limit": 10,
        "offset": gifPage,
        "rating": "G",
        "lang": "en"
    };
    //call parameters from object
    let paramString = $.param(queryParams);
    let queryURL = "https://api.giphy.com/v1/gifs/search?" + paramString;
    //queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2&q=" + animalName + "&limit=10&offset=0&rating=G&lang=en"

    $.ajax({
        //calls giphy search
        url: queryURL,
        Method: "GET"
    }).then(function (response) {
        console.log(response);
        //creates image div for each item in response
        for (let i = 0; i < response.data.length; i++) {
            const gifContent = `<div class="col-2.4">
            ${"<img src=" + response.data[i].images.fixed_width_still.url + "/>"}</div>`
            $("#gifRow").prepend(gifContent);

        }

        //loads different gifs on next click
        gifPage += 10;

        //sets current animal
        currentAnimal = animalName;

    })
}