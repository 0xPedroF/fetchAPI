async function fetchData() {
    const infoDiv = document.getElementById('info');
    const pokemonName = document.getElementById("pokemonName").value.toLocaleLowerCase();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            const imgElement = document.getElementById("pokemonSprite");
            imgElement.style.display = "none"; //reset image if fails
            infoDiv.textContent = 'No Pokémon data available.';
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        displayPokemonData(data);
        //console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}

async function fetchRandomData() {
    const infoDiv = document.getElementById('info');
    try {

        const initialResponse = await fetch(`https://pokeapi.co/api/v2/pokemon`);

        if (!initialResponse.ok) {
            const imgElement = document.getElementById("pokemonSprite");
            imgElement.style.display = "none"; //reset image if fails
            infoDiv.textContent = 'No Pokémon data available.';
            throw new Error("Could not fetch resource");
        }

        const initialData = await initialResponse.json();
        const totalPokemons = initialData.count; //Variable with the total amout of pokemons
        console.log("Pokemons available: " + totalPokemons);

        const randomOffset = Math.floor(Math.random() * totalPokemons); // Generate a random pokemon nr
        console.log("Random Offset nr: " + randomOffset);


        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${randomOffset}&limit=1`)
        const data = await response.json();

        if (!response.ok) {
            infoDiv.textContent = 'No Pokémon data available.';
            throw new Error("Could not fetch resource");
        }

        const pokemonURL = data.results[0].url;

        const pokemonResponse = await fetch(pokemonURL);
        const pokemonData = await pokemonResponse.json();

        displayPokemonData(pokemonData);
    }
    catch (error) {
        console.log(error);
    }
}

function displayPokemonData(data) {
    const infoDiv = document.getElementById('info');
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite");

    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";
    const capitalizedPokemonName = toTitleCase(data.name);
    const weightInKg = (data.weight / 10).toFixed(1) + 'kg';

    infoDiv.innerHTML = `Pokemon ID: ${data.id}<br>Name: ${capitalizedPokemonName}<br>Weight: ${weightInKg}`;
}

function toTitleCase(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}