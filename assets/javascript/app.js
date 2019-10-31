//variable for input
let foodInput = "spaghetti";

function getGif() {
    //object containing parameters 
    const gifQueryParams = {
        "api_key": "CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2",
        q: foodInput,
        "limit": 1,
        "offset": 0,
        "rating": "G",
        "lang": "en"
    };

    //set parameters from object
    let gifParamString = $.param(gifQueryParams);
    let gifQueryURL = "https://api.giphy.com/v1/gifs/search?" + gifParamString;

    $.ajax({
        //calls giphy search
        url: gifQueryURL,
        Method: "GET"
    }).then(function (response) {
        console.log(response);
        //creates image div and appends to DOM
        const gifContent = "<img src=" + response.data[0].images.fixed_width.url + "/>";
        $("#gifDiv").append(gifContent);
    })
}

function getPic() {

    const imgQueryParams = {
        query: foodInput,
        "per_page": 3,
        "page": 1
    }

    let imgParamString = $.param(imgQueryParams);
    let imgQueryUrl = "https://api.pexels.com/v1/search?" + imgParamString;

    $.ajax({
        //calls pexel url search
        url: imgQueryUrl,
        Method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "563492ad6f91700001000001a0e4738780644fac9acefdba362470d6");
        },
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < response.photos.length; i++) {
            let imgContent = "<img src=" + response.photos[i].src.tiny + "/>";
            $("#imgDiv").append(imgContent);
        }
    })

}

$(document).ready(function () {
    getGif();
    getPic();
})