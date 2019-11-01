$(document).ready(function() {

    var APPID = "21fc5346"
    var APPKEY = "ced84d9b86a8143034b8ede11feaf534";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=APPID&appKey=APPKEY"

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temperature (F) " + response.main.temp);

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });
})