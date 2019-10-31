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