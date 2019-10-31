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

recipe();
