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

        const weightInKg = (data.weight/10).toFixed(1)+'kg'; //convert weight to kg
        const capitalizedPokemonName = toTitleCase(pokemonName); //call a function to convert the first letter of any word to upperCase
        infoDiv.innerHTML = `Pokemon ID: ${data.id}<br>Name: ${capitalizedPokemonName}<br>Weight: ${weightInKg}`;
        
        console.log(data);
    }
    catch(error){
        console.error(error);
    }
}

async function fetchRandomData(){
    try{
        const infoDiv = document.getElementById('info');

        const initialResponse = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        const initialData = await initialResponse.json();

        const totalPokemons = initialData.count; //Variable with the total amout of pokemons
        console.log("INITIAL DATA: ");
        console.log(initialData);

        if(!initialResponse.ok || initialData.count === 0){
            infoDiv.textContent = 'No Pokémon data available.';
            throw new Error("Could not fetch resource");
        }

        
        const randomOffset = Math.floor(Math.random() * totalPokemons); // Generate a random pokemon nr
        console.log("RANDOM OFFSET: ");
        console.log(randomOffset);


        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${randomOffset}&limit=1`)
        const data = await response.json();
        
        if (!response.ok) {
            infoDiv.textContent = 'No Pokémon data available.';
            throw new Error("Could not fetch resource");
        }
        
        const pokemonURL = data.results[0].url;
        const pokemonResponse = await fetch(pokemonURL);
        const pokemonData = await pokemonResponse.json();
        
        // Displaying information about the random Pokémon
        console.log(pokemonData);
        const pokemonSprite = pokemonData.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        const pokemonName = toTitleCase(pokemonData.name);
        const weightInKg = (pokemonData.weight / 10).toFixed(1) + 'kg';
        infoDiv.innerHTML = `Pokemon ID: ${pokemonData.id}<br>Name: ${pokemonName}<br>Weight: ${weightInKg}`;
    }
    catch(error){
        console.log(error);
    }
}

function toTitleCase(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}