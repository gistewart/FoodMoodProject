//variable for input
let foodInput = "donut";
let gifOffset = 0;
let imgPage = 1;
//variables for nutrition input
const data = {
    'generalSearchInput': foodInput
};
const USDAurl = 'https://api.nal.usda.gov/fdc/v1/search?api_key=ZVW3xGLgjZqCbvHWwuGgXCYMKY3rXnbM3jWnLjn5';

fetch(USDAurl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);

        fetch(`https://api.nal.usda.gov/fdc/v1/${response.foods[0].fdcId}?api_key=ZVW3xGLgjZqCbvHWwuGgXCYMKY3rXnbM3jWnLjn5`)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                console.log(response);
                // Transfer content to HTML


                $("#servingSize").text(response.householdServingFullText.toLowerCase() + "  (" + response.servingSize + response.servingSizeUnit + ")");

                $("#calories").html("<h3>" + parseInt(response.labelNutrients.calories.value) + "<h3>");

                $("#fatText").text(parseInt(response.foodNutrients[5].amount) + response.foodNutrients[5].nutrient.unitName);

                $("#cholesterolText").text(parseInt(response.foodNutrients[11].amount) + response.foodNutrients[11].nutrient.unitName)

                $("#sodiumText").text(parseInt(response.foodNutrients[10].amount) + response.foodNutrients[10].nutrient.unitName)

                $("#carbohydrateText").text(parseInt(response.foodNutrients[6].amount) + response.foodNutrients[6].nutrient.unitName)

                $("#fiberText").text(parseInt(response.foodNutrients[9].amount) + response.foodNutrients[9].nutrient.unitName)

                $("#proteinText").text(parseInt(response.foodNutrients[4].amount) + response.foodNutrients[4].nutrient.unitName)

                $("#carbohydrates").text("Carbohydrates: " + response.labelNutrients.carbohydrates.value);
                $("#cholesterol").text("Cholesterol: " + response.labelNutrients.cholesterol.value);
                $("#fat").text("Fat: " + response.labelNutrients.fat.value);
                $("#fiber").text("Fiber: " + response.labelNutrients.fiber.value);
                $("#iron").text("Iron: " + response.labelNutrients.iron.value);
                $("#protein").text("Protein: " + response.labelNutrients.protein.value);
                $("#saturatedFat").text("Saturated Fat: " + response.labelNutrients.saturatedFat.value);
                $("#sodium").text("Sodium: " + response.labelNutrients.sodium.value);
                $("#sugars").text("Sugars: " + response.labelNutrients.sugars.value);
                $("#transFat").text("Trans Fat: " + response.labelNutrients.transFat.value);

                console.log(response.foodNutrients[0].nutrient.name);
                console.log(response.foodNutrients[0].amount);
                console.log(response.foodNutrients[0].nutrient.unitName);

                console.log(response.foodNutrients[1].nutrient.name);
                // $("#calcium").text("Calcium: " + response.labelNutrients.calcium.value);
                console.log(response.labelNutrients.calcium.value);
                console.log(response.foodNutrients[1].amount);
                console.log(response.foodNutrients[1].nutrient.unitName);

                console.log(response.foodNutrients[2].nutrient.name);
                console.log(response.foodNutrients[2].amount);
                console.log(response.foodNutrients[2].nutrient.unitName);

                console.log(response.foodNutrients[3].nutrient.name);
                console.log(response.foodNutrients[3].amount);
                console.log(response.foodNutrients[3].nutrient.unitName);

                console.log(response.foodNutrients[4].nutrient.name);
                console.log(response.foodNutrients[4].amount);
                console.log(response.foodNutrients[4].nutrient.unitName);

                console.log(response.foodNutrients[5].nutrient.name);
                console.log(response.foodNutrients[5].amount);
                console.log(response.foodNutrients[5].nutrient.unitName);

                console.log(response.foodNutrients[6].nutrient.name);
                console.log(response.foodNutrients[6].amount);
                console.log(response.foodNutrients[6].nutrient.unitName);

                console.log(response.foodNutrients[7].nutrient.name);
                console.log(response.foodNutrients[7].amount);
                console.log(response.foodNutrients[7].nutrient.unitName);

                console.log(response.foodNutrients[8].nutrient.name);
                console.log(response.foodNutrients[8].amount);
                console.log(response.foodNutrients[8].nutrient.unitName);

                console.log(response.foodNutrients[9].nutrient.name);
                console.log(response.foodNutrients[9].amount);
                console.log(response.foodNutrients[9].nutrient.unitName);

                console.log(response.foodNutrients[10].nutrient.name);
                console.log(response.foodNutrients[10].amount);
                console.log(response.foodNutrients[10].nutrient.unitName);

                console.log(response.foodNutrients[11].nutrient.name);
                console.log(response.foodNutrients[11].amount);
                console.log(response.foodNutrients[11].nutrient.unitName);

                console.log(response.foodNutrients[12].nutrient.name);
                console.log(response.foodNutrients[12].amount);
                console.log(response.foodNutrients[12].nutrient.unitName);

                console.log(response.foodNutrients[13].nutrient.name);
                console.log(response.foodNutrients[13].amount);
                console.log(response.foodNutrients[13].nutrient.unitName);

            });
    });


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
    }).then(function(response) {
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
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "563492ad6f91700001000001a0e4738780644fac9acefdba362470d6");
        },
    }).then(function(response) {
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
    }).then(function(response) {
        response = JSON.parse(response);

        console.log(response);

        console.log("Recipe: " + response.recipes[1].source_url);
        console.log("Title: " + response.recipes[1].title);
    });
}

$(document).ready(function() {
    getGif();
    getPic();
    recipe();

    //refresh gif function
    $(document).on("click", "#refreshGif", function() {
        gifOffset++;
        getGif();

    })

    //refresh images function
    $(document).on("click", "#refreshImg", function() {
        imgPage++;
        console.log(imgPage);
        getPic();

    })


})