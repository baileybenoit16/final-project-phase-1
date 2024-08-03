document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

function fetchData(searchTerm = 'margarita') {
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