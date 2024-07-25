document.addEventListener("DOMContentLoaded", fetchData)

function fetchData() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((resp) => resp.json())
    .then((data) => console.log(data))
}

console.log("commit test1")
console.log("commit test2")
console.log("commit test3")
console.log("commit test4")
console.log("commit test5")