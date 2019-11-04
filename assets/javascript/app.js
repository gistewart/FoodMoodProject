//variables
let gifOffset = 0;
let imgPage = 1;
let foodInput = "";

function getNutrition(foodInput) {
    //variables for nutrition input
    let data = {
        generalSearchInput: foodInput
    };
    const USDAurl =
        "https://api.nal.usda.gov/fdc/v1/search?api_key=ZVW3xGLgjZqCbvHWwuGgXCYMKY3rXnbM3jWnLjn5";

    fetch(USDAurl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log("nutrition: " + response);

            fetch(
                    `https://api.nal.usda.gov/fdc/v1/${response.foods[0].fdcId}?api_key=ZVW3xGLgjZqCbvHWwuGgXCYMKY3rXnbM3jWnLjn5`
                )
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log("nutrition: " + response);
                    // Transfer content to HTML
                    $("#nutritionTitle").text(foodInput.toUpperCase());
                    $("#calcium").text(
                        "Calcium: " + response.labelNutrients.calcium.value
                    );
                    $("#calories").text(
                        "Calories: " + response.labelNutrients.calories.value
                    );
                    $("#carbohydrates").text(
                        "Carbohydrates: " + response.labelNutrients.carbohydrates.value
                    );
                    $("#cholesterol").text(
                        "Cholesterol: " + response.labelNutrients.cholesterol.value
                    );
                    $("#fat").text("Fat: " + response.labelNutrients.fat.value);
                    $("#fiber").text("Fiber: " + response.labelNutrients.fiber.value);
                    $("#iron").text("Iron: " + response.labelNutrients.iron.value);
                    $("#protein").text(
                        "Protein: " + response.labelNutrients.protein.value
                    );
                    $("#saturatedFat").text(
                        "Saturated Fat: " + response.labelNutrients.saturatedFat.value
                    );
                    $("#sodium").text("Sodium: " + response.labelNutrients.sodium.value);
                    $("#sugars").text("Sugars: " + response.labelNutrients.sugars.value);
                    $("#transFat").text(
                        "Trans Fat: " + response.labelNutrients.transFat.value
                    );
                });
        });
}

function getGif(foodInput) {
    $("#gifDiv").empty()
    $("#gifDivHolder").show();
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
        console.log("gif: " + response);
        //creates image div and appends to DOM
        const gifContent = "<img src=" + response.data[0].images.fixed_width.url + "/>";
        $("#gifDiv").append(gifContent);

        //creates refresh button
        const refreshGifBtn = "<p class='refresh' id='refreshGif'>&#8635;</p>";
        $("#gifDiv").prepend(refreshGifBtn);
    })
}

function getPic(foodInput) {
    $("#imgDiv").empty();

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
        console.log("pic: " + response);
        for (let i = 0; i < response.photos.length; i++) {
            //adds image to the DOM
            const imgContent = `<div class='col-12 col-md-6 col-lg-4'><div class='text-center'><a href="${response.photos[i].url}"><img class='hvr-glow' src="${response.photos[i].src.tiny}"/></a></div></div>`;
            $("#imgDiv").append(imgContent);
        }
        //creates refresh button
        const refreshImgBtn = "<p class='refresh' id='refreshImg'>&#8635;</p>";
        $("#imgDivHolder").prepend(refreshImgBtn);
    })

}

function recipe(foodInput) {
    //variable for input
    let foodrecipe = foodInput;

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

        console.log("recipe: " + response);

        // console.log("Recipe: " + response.recipes[1].source_url);
        // console.log("Title: " + response.recipes[1].title);

        const title = $("<p>").text("Title: " + response.recipes[1].title);
        const recipe = $("<a>")
            .text("Link to Recipe")
            .attr("href", response.recipes[1].source_url)
            .attr("target", "_blank");
        $("#recipeDiv").append(title, recipe);
    });
}

let lat;
let long;

navigator.geolocation.getCurrentPosition(function(position) {
  // console.log(position.coords.latitude);
  // console.log(position.coords.longitude);

  lat = position.coords.latitude;
  long = position.coords.longitude;

  cuisineAPICall();
  // restaurantAPICall();

  // const location = position;
});

function cuisineAPICall() {
  const ApiKey = "de972d173dd44d03623092703cd67ba8";

  const cuisineQueryURL =
    "https://developers.zomato.com/api/v2.1/cuisines?lat=" +
    lat +
    "&lon=" +
    long;

  $.ajax({
    //calls giphy search
    url: cuisineQueryURL,
    method: "GET",
    headers: {
      "user-key": ApiKey
    }
  }).then(function(response) {
    // response = JSON.parse(response);

    //   console.log(response.cuisines);

    let id;

    const arr = response.cuisines;

    for (let i = 0; i < arr.length; i++) {
      // console.log(arr[i].cuisine);
      const food = foodInput.toLowerCase();
      const cuisine = arr[i].cuisine.cuisine_name.toLowerCase();

      // console.log(food, cuisine);

      if (cuisine === food) {
        id = arr[i].cuisine.cuisine_id;
      }
    }
    //   console.log("id", id);
    restaurantAPICall(id);
  });
}

function restaurantAPICall(cuisineId) {
  const ApiKey = "de972d173dd44d03623092703cd67ba8";

  const restarauntQueryURL =
    "https://developers.zomato.com/api/v2.1/search?lat=" +
    lat +
    "&lon=" +
    long +
    "&cuisines=" +
    cuisineId;

  $.ajax({
    //calls giphy search
    url: restarauntQueryURL,
    method: "GET",
    headers: {
      "user-key": ApiKey
    }
  }).then(function(response) {
    // response = JSON.parse(response);

    for (let i = 0; i < response.restaurants.length; i++) {
      console.log(response.restaurants[i].restaurant.name);
      console.log(response.restaurants[i].restaurant.phone_numbers);

      const restname = $("<p>").text(
        "Restaraunt Name:" + response.restaurants[i].restaurant.name
      );
      const restnumber = $("<p>").text(
        "Restaraunt Number:" + response.restaurants[i].restaurant.phone_numbers
      );

      $("#restdiv").append(restname, restnumber);
    }
  });
}

function getHeadline(foodInput) {

    $("#headlines").empty();

    let limit = 1;

    const queryParams = {
        q: "food+" + foodInput,
        "api-key": "4T4JAn6PPSJW7c7RpRNUgAK4qSQQxGio"
    };

    const paramString = $.param(queryParams);

    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + paramString;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log("news: " + response);

        for (let i = 0; i < limit; i++) {

            articleLink = `<h3>LATEST NEWS: <a href="${response.response.docs[i].web_url}">${response.response.docs[i].headline.main}</a></h3>`

            $("#headlines").append(articleLink);

        }


    })
}

function stopStartGif() {
    //grabs image source attribute
    let imageURL = $(this).attr("src");
    //amends image url to either still or active version
    if (imageURL.includes("200w_s")) {
        imageURL = imageURL.replace(/200w_s/g, "200w");
    } else {
        imageURL = imageURL.replace(/200w/g, "200w_s")
    }
    //changes attribute in the DOM
    $(this).attr("src", imageURL)

}

$(document).ready(function () {

    $("#gifDivHolder").hide();

    //preset food input
    $(".preset").on("click", function () {
        event.preventDefault();
        foodInput = this.id;
        getGif(foodInput);
        getPic(foodInput);
        getNutrition(foodInput);
        getHeadline(foodInput);
        recipe(foodInput);

        //resets values
        gifOffset = 0;
        imgPage = 1;

        //deletes refresh buttons
        $(".refresh").remove();
    });

    //search input function
    $("#foodButton").on("click", function () {
        event.preventDefault();
        foodInput = $("#foodInput").val().trim();
        if (foodInput) {
            getGif(foodInput);
            getPic(foodInput);
            getNutrition(foodInput);
            getHeadline(foodInput);
            recipe(foodInput);

            //resets values
            gifOffset = 0;
            imgPage = 1;

            //deletes refresh buttons
            $(".refresh").remove();
        }
        //clears food input
        $("#foodInput").val("");

    });

    //refresh gif function
    $(document).on("click", "#refreshGif", function () {
        gifOffset++;
        getGif(foodInput);
    });

    //refresh images function
    $(document).on("click", "#refreshImg", function () {
        imgPage++;
        $("#refreshImg").remove();
        getPic(foodInput);

    });

    //runs stops and starts gif on user click
    $(document).on("click", "#gifDiv img", stopStartGif);


})