function getGif() {
    //variable for input
    let foodInput = "donut";


    //object containing parameters 
    const queryParams = {
        "api_key": "CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2",
        q: foodInput,
        "limit": 1,
        "offset": 0,
        "rating": "G",
        "lang": "en"
    };

    //call parameters from object
    let paramString = $.param(queryParams);
    let gifQueryURL = "https://api.giphy.com/v1/gifs/search?" + paramString;

    $.ajax({
        //calls giphy search
        url: gifQueryURL,
        Method: "GET"
    }).then(function (response) {
        console.log(response);
        //creates image div and appends to DOM
        const gifContent = "<img src=" + response.data[0].images.fixed_width.url + "/>";
        $("#gifHolder").append(gifContent);
    })
}

$(document).ready(function () {
    getGif();
})