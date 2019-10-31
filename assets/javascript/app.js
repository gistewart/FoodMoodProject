const userInput = 'cauliflower';
const data = {
    'generalSearchInput': userInput
};
const url = 'https://api.nal.usda.gov/fdc/v1/search?api_key=ZVW3xGLgjZqCbvHWwuGgXCYMKY3rXnbM3jWnLjn5';

fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);

        fetch(`https://api.nal.usda.gov/fdc/v1/${response.foods[0].fdcId}?api_key=ZVW3xGLgjZqCbvHWwuGgXCYMKY3rXnbM3jWnLjn5`)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log(response);
                // Transfer content to HTML
                $(".calcium").text(JSON.stringify("Calcium: " + response.labelNutrients.calcium.value));
                $(".calories").text(JSON.stringify("Calories: " + response.labelNutrients.calories.value));
                $(".carbohydrates").text(JSON.stringify("Carbohydrates: " + response.labelNutrients.carbohydrates.value));
                $(".cholesterol").text(JSON.stringify("Cholesterol: " + response.labelNutrients.cholesterol.value));
                $(".fat").text(JSON.stringify("Fat: " + response.labelNutrients.fat.value));
                $(".fiber").text(JSON.stringify("Fiber: " + response.labelNutrients.fiber.value));
                $(".iron").text(JSON.stringify("Iron: " + response.labelNutrients.iron.value));
                $(".protein").text(JSON.stringify("Protein: " + response.labelNutrients.protein.value));
                $(".saturatedFat").text(JSON.stringify("Saturated Fat: " + response.labelNutrients.saturatedFat.value));
                $(".sodium").text(JSON.stringify("Sodium: " + response.labelNutrients.sodium.value));
                $(".sugars").text(JSON.stringify("Sugars: " + response.labelNutrients.sugars.value));
                $(".transFat").text(JSON.stringify("Trans Fat: " + response.labelNutrients.transFat.value));
            });
    });
//variable for input
let foodInput = "spaghetti";
let gifOffset = 0;
let imgPage = 1;

function getGif() {
    $("#gifDiv").empty()
    //object containing parameters 
    const gifQueryParams = {
        "api_key": "CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2",
        q: foodInput,
        "limit": 1,
        "offset": gifOffset,
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

        //creates refresh button
        const refreshGifBtn = "<p class='refresh' id='refreshGif'>&#8635;</p>";
        $("#gifDiv").prepend(refreshGifBtn);
    })
}

function getPic() {

    $("#imgDiv").empty()

    const imgQueryParams = {
        query: foodInput,
        "per_page": 3,
        "page": imgPage
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
            //adds image to the DOM
            let imgContent = "<img src=" + response.photos[i].src.tiny + "/>";
            $("#imgDiv").append(imgContent);
        }
        //creates refresh button
        const refreshImgBtn = "<p class='refresh' id='refreshImg'>&#8635;</p>";
        $("#imgDiv").prepend(refreshImgBtn);
    })

}

function recipe() {
    //variable for input
    let foodrecipe = "donut";

    //object containing parameters
    const queryPara = {
        key: "7982d935e15cd8e88f053be3be874c94",
        q: foodrecipe
    };

    //call parameters from object
    let paraString = $.param(queryPara);
    let recipeQueryURL = "https://www.food2fork.com/api/search?" + paraString;

    $.ajax({
        //calls giphy search
        url: recipeQueryURL,
        Method: "GET"
    }).then(function (response) {
        response = JSON.parse(response);

        console.log(response);

        console.log("Recipe: " + response.recipes[1].source_url);
        console.log("Title: " + response.recipes[1].title);
    });
}
$(document).ready(function () {
    getGif();
    getPic();
    recipe();

    //refresh gif function
    $(document).on("click", "#refreshGif", function () {
        gifOffset++;
        getGif();

    })

    //refresh images function
    $(document).on("click", "#refreshImg", function () {
        imgPage++;
        console.log(imgPage);
        getPic();

    })


})