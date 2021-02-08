const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div  class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img class = "recipe" src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3 class = "recipe">${meal.strMeal}</h3>
                            
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(res => res.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `

            <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
            </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <h2>Ingredients</h2>
        <p class="ingredients">  ${meal.strMeasure1} ${meal.strIngredient1}</p>
        <p class="ingredients">  ${meal.strMeasure2} ${meal.strIngredient2}</p>
        <p class="ingredients">  ${meal.strMeasure3} ${meal.strIngredient3}</p>
        <p class="ingredients">  ${meal.strMeasure4} ${meal.strIngredient4}</p>
        <p class="ingredients">  ${meal.strMeasure5} ${meal.strIngredient5}</p>
        <p class="ingredients">  ${meal.strMeasure6} ${meal.strIngredient6}</p>
        <p class="ingredients">  ${meal.strMeasure7} ${meal.strIngredient7}</p>
        <p class="ingredients">  ${meal.strMeasure8} ${meal.strIngredient8}</p>
        <p class="ingredients">  ${meal.strMeasure9} ${meal.strIngredient9}</p>
        <p class="ingredients">  ${meal.strMeasure10} ${meal.strIngredient10}</p>
        <p class="ingredients">  ${meal.strMeasure11} ${meal.strIngredient11}</p>
        <p class="ingredients">  ${meal.strMeasure12} ${meal.strIngredient12}</p>
        <p class="ingredients">  ${meal.strMeasure13} ${meal.strIngredient13}</p>
        <p class="ingredients">  ${meal.strMeasure14} ${meal.strIngredient14}</p>
        <p class="ingredients">  ${meal.strMeasure15} ${meal.strIngredient15}</p>
        
        
        
        
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}