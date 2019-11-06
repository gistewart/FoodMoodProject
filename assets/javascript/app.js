//variables
let gifOffset = 0;
let imgPage = 1;
let recidx = 0;
let foodInput = "";
let recipeObj = {};

function getNutrition(foodInput) {
    $("#nutDiv").show();
    $("#vitaDiv").show();
    //----------------------------------------------------------
    //beginning of nutrution query
    //variables for nutrition input
    let foodID = "";
    const data = {
        generalSearchInput: foodInput
    };
    let usda_check = "";

    $.ajax({
        async: true,
        crossDomain: true,
        url:
            "https://api.nutritionix.com/v1_1/search/" +
            foodInput +
            "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=21fc5346&appKey=ced84d9b86a8143034b8ede11feaf534",
        method: "GET"
    })
        .then(function (response) {
            console.log("nutrition + food ID:");
            console.log(response);
            console.log(response.hits[0].fields.item_id);
            foodID = response.hits[0].fields.item_id;
            return foodID;
        })

        .then(function (foodID) {
            $.ajax({
                async: true,
                crossDomain: true,
                url:
                    "https://api.nutritionix.com/v1_1/item?id=" +
                    foodID +
                    "&appId=21fc5346&appKey=ced84d9b86a8143034b8ede11feaf534",
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#servingSizeAmt").text(
                    response.nf_serving_size_qty +
                    " " +
                    response.nf_serving_size_unit +
                    " (" +
                    parseInt(response.nf_serving_weight_grams) +
                    "g)"
                );
                $("#calAmt").text(parseInt(response.nf_calories));

                // write vitamin values to the DOM
                $("#vitA-amt").text(parseInt(response.nf_vitamin_a_dv) + "%");
                $("#vitC-amt").text(parseInt(response.nf_vitamin_c_dv) + "%");
                $("#calcium-amt").text(parseInt(response.nf_calcium_dv) + "%");
                $("#iron-amt").text(parseInt(response.nf_iron_dv) + "%");
                //end of vitamin section

                // console.log("usda info: " + response.usda_fields)  **
                if (response.usda_fields === null) {
                    $("#fatAmt").text(parseInt(response.nf_total_fat) + "g");
                    $("#cholesterolAmt").text(parseInt(response.nf_cholesterol) + "mg");
                    $("#sodiumAmt").text(parseInt(response.nf_sodium) + "mg");
                    $("#carbohydrateAmt").text(
                        parseInt(response.nf_total_carbohydrate) + "g"
                    );
                    $("#fiberAmt").text(parseInt(response.nf_dietary_fiber) + "g");
                    $("#proteinAmt").text(parseInt(response.nf_protein) + "g");
                } else {
                    $("#fatAmt").text(
                        parseInt(response.usda_fields.FAT.value) +
                        response.usda_fields.FAT.uom
                    );
                    $("#cholesterolAmt").text(
                        parseInt(response.usda_fields.CHOLE.value) +
                        response.usda_fields.CHOLE.uom
                    );
                    $("#sodiumAmt").text(
                        parseInt(response.usda_fields.NA.value) +
                        response.usda_fields.NA.uom
                    );
                    $("#carbohydrateAmt").text(
                        parseInt(response.usda_fields.CHOCDF.value) +
                        response.usda_fields.CHOCDF.uom
                    );
                    $("#fiberAmt").text(
                        parseInt(response.usda_fields.FIBTG.value) +
                        response.usda_fields.FIBTG.uom
                    );
                    $("#proteinAmt").text(
                        parseInt(response.usda_fields.PROCNT.value) +
                        response.usda_fields.PROCNT.uom
                    );
                }
            });
        });
}

// end of nutrition query
//----------------------------------------------------------

function getGif(foodInput) {
    $("#gifDiv").empty();

    $("#gifDivHolder").show();
    //object containing parameters 
    const gifQueryParams = {
        "api_key": "CbRv29mIUSwkTAVauYUvcQ8lOGyxCop2",
        q: foodInput,
        "limit": 3,
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
        console.log("gif:");
        console.log(response);
        //creates image div and appends to DOM
        for (let i = 0; i < 3; i++) {
            const gifContent = "<img class='hvr-glow' src=" + response.data[i].images.fixed_width.url + "/>";
            $("#gifDiv").append(gifContent);
        }

        //creates refresh button
        const refreshGifBtn = "<p class='refresh' id='refreshGif'>&#8635;</p>";
        $("#gifDiv").prepend(refreshGifBtn);
    })
}

function getPic(foodInput) {
    $("#imgDiv").empty();
    $("#imgDivHolder").show();

    const imgQueryParams = {
        query: foodInput,
        per_page: 3,
        page: imgPage
    };

    let imgParamString = $.param(imgQueryParams);
    let imgQueryUrl = "https://api.pexels.com/v1/search?" + imgParamString;

    $.ajax({
        //calls pexel url search
        url: imgQueryUrl,
        Method: "GET",
        beforeSend: function (request) {
            request.setRequestHeader(
                "Authorization",
                "563492ad6f91700001000001a0e4738780644fac9acefdba362470d6"
            );
        }
    }).then(function (response) {
        console.log("pic:");
        console.log(response);
        for (let i = 0; i < response.photos.length; i++) {
            //adds image to the DOM
            const imgContent = `<div class='col-12 col-md-6 col-lg-4'><div class='text-center'><a href="${response.photos[i].url}"><img class='hvr-glow' src="${response.photos[i].src.tiny}"/></a></div></div>`;
            $("#imgDiv").append(imgContent);
        }
        //creates refresh button
        const refreshImgBtn = "<p class='refresh' id='refreshImg'>&#8635;</p>";
        $("#imgDivHolder").prepend(refreshImgBtn);
    });
}

function recipe(foodInput) {
    $("#headlines").empty();
    $("#headlines").show();

    //object containing parameters
    const queryPara = {
        key: "7982d935e15cd8e88f053be3be874c94",
        q: foodInput
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
        recipeObj = response;

        // console.log("Recipe: " + response.recipes[1].source_url);
        // console.log("Title: " + response.recipes[1].title);
        // const title = $("<p>").text("Title: " + response.recipes[1].title);
        // const recipe = $("<a>")
        //     .text("Link to Recipe")
        //     .attr("href", response.recipes[1].source_url)
        //     .attr("target", "_blank");
        // $("#recipeDiv").append(title, recipe);

        recipeTitle = `<h3>RECIPE: <a href="${response.recipes[recidx].source_url}">${response.recipes[recidx].title}</a></h3>`;
        $("#headlines").append(recipeTitle);

        //creates refresh button
        const refreshNewsBtn = "<p class='refresh' id='refreshArticle'>&#8635;</p>";
        $("#headlines").prepend(refreshNewsBtn);
    });
}

let lat = 33.769967;
let long = -84.39020889999999;

navigator.geolocation.getCurrentPosition(function (position) {

    lat = position.coords.latitude;
    long = position.coords.longitude;

});

function cuisineAPICall(foodInput) {

    const ApiKey = "de972d173dd44d03623092703cd67ba8";

    const cuisineQueryURL =
        "https://developers.zomato.com/api/v2.1/cuisines?lat=" +
        lat +
        "&lon=" +
        long;

    $.ajax({
        url: cuisineQueryURL,
        method: "GET",
        headers: {
            "user-key": ApiKey
        }
    }).then(function (response) {
        // response = JSON.parse(response);

        console.log(response);

        let id;

        let arr = response.cuisines;

        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i].cuisine);
            let food = foodInput.toLowerCase();
            let cuisine = arr[i].cuisine.cuisine_name.toLowerCase();

            // console.log(food, cuisine);

            if (cuisine === food) {
                id = arr[i].cuisine.cuisine_id;
            }
        }
        //   console.log("id", id);
        restaurantAPICall(lat, long, id);
    });
}

function restaurantAPICall(lat, long, id) {
    const ApiKey = "de972d173dd44d03623092703cd67ba8";

    const restarauntQueryURL =
        "https://developers.zomato.com/api/v2.1/search?lat=" +
        lat +
        "&lon=" +
        long +
        "&cuisines=" +
        id;

    $.ajax({
        //calls giphy search
        url: restarauntQueryURL,
        method: "GET",
        headers: {
            "user-key": ApiKey
        }
    }).then(function (response) {
        // response = JSON.parse(response);

        //console.log(response.restaurants.length);

        $("#restdiv").empty();

        for (let i = 0; i < 10; i++) {
            //console.log(response.restaurants[i].restaurant.name);
            //console.log(response.restaurants[i].restaurant.phone_numbers);

            const restname = $("<p>").text(
                "Restaurant Name: " + response.restaurants[i].restaurant.name
            );
            const restnumber = $("<a>")
                .text(response.restaurants[i].restaurant.phone_numbers)
                .attr(
                    "href",
                    "tel:" + response.restaurants[i].restaurant.phone_numbers
                );
            // <a href="tel:1-562-867-5309">1-562-867-5309</a>;

            $("#restdiv").append(restname, restnumber);
        }
    });
}

// function getHeadline(foodInput) {
//   $("#headlines").empty();

//   $("#headlines").empty();
//   $("#headlines").show();

//   const queryParams = {
//     q: foodInput,
//     fq: 'document_type:("recipe")',
//     "api-key": "4T4JAn6PPSJW7c7RpRNUgAK4qSQQxGio"
//   };

//   const queryURL =
//     "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + paramString;

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log("news: " + response);

//     console.log(queryURL);

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {

//         console.log(response);
//         nytResponse = response;

//         articleLink = `<h3>RECIPE: <a href="${response.response.docs[recidx].web_url}">${response.response.docs[recidx].headline.main}</a></h3>`
//         $("#headlines").append(articleLink);
//         //creates refresh button
//         const refreshNewsBtn = "<p class='refresh' id='refreshArticle'>&#8635;</p>";
//         $("#headlines").prepend(refreshNewsBtn);

//     })

// }

function refreshRecipe() {
    //runs through response array
    if (recidx < 29) {
        recidx++;
    } else {
        recidx = 0;
    }

    //empties div and adds new headline
    $("#refreshArticle").remove();
    $("#headlines").empty();
    recipeTitle = `<h3>RECIPE: <a href="${recipeObj.recipes[recidx].source_url}">${recipeObj.recipes[recidx].title}</a></h3>`;
    $("#headlines").append(recipeTitle);

    //creates refresh button
    const refreshNewsBtn = "<p class='refresh' id='refreshArticle'>&#8635;</p>";
    $("#headlines").prepend(refreshNewsBtn);
}

function stopStartGif() {
    //grabs image source attribute
    let imageURL = $(this).attr("src");
    //amends image url to either still or active version
    if (imageURL.includes("200w_s")) {
        imageURL = imageURL.replace(/200w_s/g, "200w");
    } else {
        imageURL = imageURL.replace(/200w/g, "200w_s");
    }
    //changes attribute in the DOM
    $(this).attr("src", imageURL);
}

function runApis(foodInput) {

    if (foodInput) {
        getGif(foodInput);
        getPic(foodInput);
        getNutrition(foodInput);
        cuisineAPICall(foodInput);
        //recipe(foodInput);

        //resets values
        gifOffset = 0;
        imgPage = 1;
        recidx = 0;

        //deletes refresh buttons
        $(".refresh").remove();
        $("#refreshImg").remove();

        $("#restdiv").show();
    }
    //clears food input
    $("#foodInput").val("");

}

$(document).ready(function () {

    $("#gifDivHolder").hide();
    $("#headlines").hide();
    $("#imgDivHolder").hide();
    $("#nutDiv").hide();
    $("#restdiv").hide();
    $("#vitaDiv").hide();

    //preset food input
    $(".preset").on("click", function () {
        event.preventDefault();
        foodInput = this.id;
        runApis(foodInput);
    });

    //search input function
    $("#foodButton").on("click", function () {
        event.preventDefault();
        foodInput = $("#foodInput").val().trim();
        runApis(foodInput);
    });

    //refresh gif function
    $(document).on("click", "#refreshGif", function () {
        gifOffset += 3;
        getGif(foodInput);
    });

    //refresh images function
    $(document).on("click", "#refreshImg", function () {
        imgPage++;
        $("#refreshImg").remove();
        getPic(foodInput);

    });

    //refresh article function
    $(document).on("click", "#refreshArticle", function () {
        refreshRecipe();
    })

    //runs stops and starts gif on user click
    $(document).on("click", "#gifDiv img", stopStartGif);

})
