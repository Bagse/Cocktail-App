let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

let getInfo = () => {
    let userInp = document.getElementById("user-inp").value;

if(userInp.length == 0){
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`; 
} else{
    fetch(url + userInp)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("user-inp").value = "";
        
        let myDrink = data.drinks[0];
        
        
        let count = 1;
        let ingredients = [];
        for(let i in myDrink){
            let ingredient = "";
            let measure = "";
            if(i.startsWith("strIngredient") && myDrink[i]){
                ingredient = myDrink[i];
                if(myDrink[`strMeasure` + count]){
                    measure = myDrink[`strMeasure` + count];
                } else{
                    measure = "";
                }
                count += 1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        console.log(ingredients);
        result.innerHTML = `
        <img src=${myDrink.strDrinkThumb}>
        <h2>${myDrink.strDrink}</h2>
        <h3>Type of drink:</h3>
        <p>${myDrink.strAlcoholic}</p>
        <h3>Category:</h3>
        <p>${myDrink.strCategory}</p>
        <h3>Ingredients:</h3>
        <ul class="ingredients"></ul>
        <h3>Instructions:</h3>
        <p>${myDrink.strInstructions}</p>
        `;
        let ingredientsCon = document.querySelector(".ingredients");
        ingredients.forEach((item) => {
            let listItem = document.createElement("li");
            listItem.innerHTML = item;
            ingredientsCon.appendChild(listItem);
        });
    })
    .catch( () => {
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
    });
}
};

window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);