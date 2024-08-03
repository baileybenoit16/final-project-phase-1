document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});


const cocktailList = document.getElementById('cocktail-list');



function fetchData(searchTerm = 'blue') {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((resp) => resp.json())
    .then((data) => {
        displayCocktails(data.drinks);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        cocktailList.innerHTML = '<p>No results found. Try another search!</p>';
    });
}

function displayCocktails(cocktails) {
    cocktailList.innerHTML = '';
    if (cocktails) {
        cocktails.forEach(cocktail => {
            const cocktailDiv = document.createElement('div');
            cocktailDiv.innerHTML = `
                <h3>${cocktail.strDrink}</h3>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" style="height: 100px;">
                <p>Click to view details</p>
            `;
            cocktailDiv.addEventListener('click', () => {
                displayCocktailDetails(cocktail);
            });
            cocktailList.appendChild(cocktailDiv);
        });
    } else {
        cocktailList.innerHTML = '<p>Search for recipes of any cocktail you like!</p>';
    }
}

