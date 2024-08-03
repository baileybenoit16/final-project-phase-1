document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    setupBackToTopButton();
});

function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { //btn appears when user scrolls 100px
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    })

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth'});
});
}

const cocktailList = document.getElementById('cocktail-list');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const cocktailDetails = document.getElementById('cocktail-details');

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

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm.trim()) {
        fetchData(searchTerm);
    }
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value;
        if (searchTerm.trim()) {
            fetchData(searchTerm);
        }
    }
});

function displayCocktails(cocktails) {
    cocktailList.innerHTML = '';
    if (cocktails) {
        cocktails.forEach(cocktail => {
            const cocktailDiv = document.createElement('div');
            cocktailDiv.classList.add('cocktail-item');
            cocktailDiv.innerHTML = `
                <h3>${cocktail.strDrink}</h3>
                <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" style="height: 100px;">
                <p>Click to view recipe</p>
            `;
            cocktailDiv.addEventListener('click', () => {
                displayCocktailDetails(cocktail);
            });
            cocktailList.appendChild(cocktailDiv);
        });
    } else {
        cocktailList.innerHTML = '<p>No results found</p>';
    }
}

function displayCocktailDetails(cocktail) {
    cocktailDetails.innerHTML = `
        <h2>${cocktail.strDrink}</h2>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" style="height: 200px;">
        <p><strong>Instructions:</strong> ${cocktail.strInstructions}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>${listIngredients(cocktail)}</ul>
    `;
    cocktailDetails.classList.remove('hidden');

    cocktailDetails.scrollIntoView({ behavior: 'smooth'})
}


function listIngredients(cocktail) {
    let ingredients = '';
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    return ingredients;
}