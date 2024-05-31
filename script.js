// fetch = Function used for making HTTP requests to fetch resources.
//              (JSON style data, images, files)
//              Simplifies asynchronous data fetching in JavaScript and
//              used for interacting with APIs to retrieve and send
//              data asynchronously over the web.
//              fetch(url, {options})

/*
--NORMAL FETCH--

fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    .then(response => {

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        return response.json();
    }
    )
    .then(data => console.log(data))
    .catch(error => console.error(error));
*/

async function fetchData(){

    try{
        const infoDiv = document.getElementById('info');
        const pokemonName = document.getElementById("pokemonName").value.toLocaleLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if(!response.ok){
            infoDiv.textContent = 'No Pokémon data available.';
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
        infoDiv.textContent = `Name: ${pokemonName}`;
        

        console.log(data);
    }
    catch(error){
        console.error(error);
    }
}

async function fetchRandomData(){
    try{

        
    }
    catch(error){
        console.log(error);
    }
}

/*
document.addEventListener('DOMContentLoaded', () => {
    const infoDiv = document.getElementById('info');
    const selectButton = document.getElementById('selectButton');

    let pokemons = [];

    // Fetch data from the Pokémon API
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(response => response.json())
        .then(json => {
            pokemons = json.results;
        })
        .catch(error => {
            infoDiv.textContent = 'Failed to load Pokémon data.';
            console.error('Error fetching data:', error);
        });

    // Select a random Pokémon when the button is clicked
    selectButton.addEventListener('click', () => {
        if (pokemons.length === 0) {
            infoDiv.textContent = 'No Pokémon data available.';
            return;
        }

        const randomIndex = Math.floor(Math.random() * pokemons.length);
        const randomPokemon = pokemons[randomIndex];
        infoDiv.textContent = `Name: ${randomPokemon.name}`;
    });
});
*/