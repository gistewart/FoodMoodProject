//variable for input
let foodInput = "pasta";

//----------------------------------------------------------
//beginning of nutrution query
//variables for nutrition input
let foodID = ""
const data = {
    'generalSearchInput': foodInput
};
let usda_check = "";

$.ajax({
    "async": true,
    "crossDomain": true,
    "url": "https://api.nutritionix.com/v1_1/search/" + foodInput + "?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=21fc5346&appKey=ced84d9b86a8143034b8ede11feaf534",
    "method": "GET"
})

.then(function(response) {
    console.log(response);
    console.log(response.hits[0].fields.item_id);
    foodID = response.hits[0].fields.item_id;
})

.then(function(response) {
    $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://api.nutritionix.com/v1_1/item?id=" + foodID + "&appId=21fc5346&appKey=ced84d9b86a8143034b8ede11feaf534",
            "method": "GET"
        })
        .then(function(response) {
            console.log(response)
            $("#servingSizeAmt").text(response.nf_serving_size_qty + " " + response.nf_serving_size_unit + " (" + parseInt(response.nf_serving_weight_grams) + "g)");
            $("#calAmt").text(parseInt(response.nf_calories));
            console.log("usda info: " + response.usda_fields)
            if (response.usda_fields === null) {
                $("#fatAmt").text(parseInt(response.nf_total_fat) + "g");
                $("#cholesterolAmt").text(parseInt(response.nf_cholesterol) + "mg");
                $("#sodiumAmt").text(parseInt(response.nf_sodium) + "mg");
                $("#carbohydrateAmt").text(parseInt(response.nf_total_carbohydrate) + "g");
                $("#fiberAmt").text(parseInt(response.nf_dietary_fiber) + "g");
                $("#proteinAmt").text(parseInt(response.nf_protein) + "g");
            } else {
                $("#fatAmt").text(parseInt(response.usda_fields.FAT.value) + response.usda_fields.FAT.uom);
                $("#cholesterolAmt").text(parseInt(response.usda_fields.CHOLE.value) + response.usda_fields.CHOLE.uom);
                $("#sodiumAmt").text(parseInt(response.usda_fields.NA.value) + response.usda_fields.NA.uom);
                $("#carbohydrateAmt").text(parseInt(response.usda_fields.CHOCDF.value) + response.usda_fields.CHOCDF.uom);
                $("#fiberAmt").text(parseInt(response.usda_fields.FIBTG.value) + response.usda_fields.FIBTG.uom);
                $("#proteinAmt").text(parseInt(response.usda_fields.PROCNT.value) + response.usda_fields.PROCNT.uom);
            }
        })
})

// end of nutrition query
//----------------------------------------------------------

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

    // $.ajax({
    //     //calls giphy search
    //     url: recipeQueryURL,
    //     Method: "GET"
    // }).then(function(response) {
    //     response = JSON.parse(response);

    //     console.log(response);

    //     console.log("Recipe: " + response.recipes[1].source_url);
    //     console.log("Title: " + response.recipes[1].title);
    // });
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