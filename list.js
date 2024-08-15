// document.addEventListener('DOMContentLoaded', () => {
//     const pokemonList = document.getElementById('pokemon-list');

//     const generations = {
//         1: { name: 'Generation I', limit: 151, offset: 0 },
//         2: { name: 'Generation II', limit: 100, offset: 151 },
//         3: { name: 'Generation III', limit: 135, offset: 251 },
//         4: { name: 'Generation IV', limit: 107, offset: 386 },
//         5: { name: 'Generation V', limit: 156, offset: 493 },
//         6: { name: 'Generation VI', limit: 72, offset: 649 },
//         7: { name: 'Generation VII', limit: 88, offset: 721 },
//         8: { name: 'Generation VIII', limit: 96, offset: 809 },
//         9: { name: 'Generation IX', limit: 103, offset: 905 },
//     };

//     const types = [
//         'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
//         'fighting', 'poison', 'ground', 'flying', 'psychic', 
//         'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
//     ];

//     const fetchPokemon = async (urlOrId) => {
//         let url;
//         if (typeof urlOrId === 'string') {
//             if (urlOrId.startsWith('http')) {
//                 url = urlOrId;
//             } else {
//                 url = `https://pokeapi.co/api/v2/pokemon/${urlOrId.toLowerCase()}`;
//             }
//         } else if (typeof urlOrId === 'number') {
//             url = `https://pokeapi.co/api/v2/pokemon/${urlOrId}`;
//         } else {
//             throw new Error('Invalid parameter passed to fetchPokemon');
//         }
//         console.log('Fetching URL:', url);
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return await response.json();
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//         }
//     };

//     const fetchForms = async (pokemon) => {
//         const forms = [];
//         try {
//             const speciesData = await fetch(pokemon.species.url).then(response => response.json());
//             for (const form of speciesData.varieties) {
//                 if (!form.is_default) {
//                     const formData = await fetch(form.pokemon.url).then(response => response.json());
//                     forms.push(formData);
//                 }
//             }
//         } catch (error) {
//             console.error('There was a problem fetching forms:', error);
//         }
//         return forms;
//     };

//     const displayPokemon = (pokemon, container) => {
//         const type = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

//         const pokemonCard = document.createElement('div');
//         pokemonCard.classList.add('pokemon-card');
//         pokemonCard.innerHTML = `
//             <h2>#${pokemon.id} ${pokemon.name}</h2>
//             <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
//             <p>Type: ${type}</p>
//         `;
//         container.appendChild(pokemonCard);
//     };

//     const loadPokemonByGeneration = async (generation) => {
//         const { limit, offset } = generations[generation];
//         const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
//         console.log(`Fetching ${generations[generation].name} Pokémon from:`, url);
//         try {
//             const data = await fetch(url).then(response => response.json());
//             console.log('Fetched data:', data);
//             if (data && data.results) {
//                 pokemonList.innerHTML = '';  // Clear existing list
//                 for (const pokemon of data.results) {
//                     const pokemonData = await fetchPokemon(pokemon.url);
//                     displayPokemon(pokemonData, pokemonList);

//                     // Fetch and display forms
//                     const forms = await fetchForms(pokemonData);
//                     forms.forEach(form => displayPokemon(form, pokemonList));
//                 }
//             } else {
//                 console.error('No data results found');
//             }
//         } catch (error) {
//             console.error('Failed to load Pokémon:', error);
//         }
//     };

//     const loadPokemonByType = async (type) => {
//         const url = `https://pokeapi.co/api/v2/type/${type}`;
//         console.log(`Fetching Pokémon of type ${type} from:`, url);
//         try {
//             const data = await fetch(url).then(response => response.json());
//             console.log('Fetched data:', data);
//             if (data && data.pokemon) {
//                 pokemonList.innerHTML = '';  // Clear existing list
//                 for (const { pokemon } of data.pokemon) {
//                     const pokemonData = await fetchPokemon(pokemon.url);
//                     displayPokemon(pokemonData, pokemonList);

//                     // Fetch and display forms
//                     const forms = await fetchForms(pokemonData);
//                     forms.forEach(form => displayPokemon(form, pokemonList));
//                 }
//             } else {
//                 console.error('No data results found');
//             }
//         } catch (error) {
//             console.error('Failed to load Pokémon:', error);
//         }
//     };

//     // Initialize the page with generation and type buttons
//     if (pokemonList) {
//         const generationButtons = Object.keys(generations).map(gen => 
//             `<button onclick="loadPokemonByGeneration(${gen})">${generations[gen].name}</button>`
//         ).join('');
//         document.getElementById('generation-buttons').innerHTML = generationButtons;

//         const typeButtons = types.map(type => 
//             `<button onclick="loadPokemonByType('${type}')">${type.charAt(0).toUpperCase() + type.slice(1)}</button>`
//         ).join('');
//         document.getElementById('type-buttons').innerHTML = typeButtons;
//     }

//     window.loadPokemonByGeneration = loadPokemonByGeneration;
//     window.loadPokemonByType = loadPokemonByType;
// });

document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemon-list');
    const selectedTitle = document.getElementById('selected-title');

    const generations = {
        1: { name: 'Generation I', limit: 151, offset: 0 },
        2: { name: 'Generation II', limit: 100, offset: 151 },
        3: { name: 'Generation III', limit: 135, offset: 251 },
        4: { name: 'Generation IV', limit: 107, offset: 386 },
        5: { name: 'Generation V', limit: 156, offset: 493 },
        6: { name: 'Generation VI', limit: 72, offset: 649 },
        7: { name: 'Generation VII', limit: 88, offset: 721 },
        8: { name: 'Generation VIII', limit: 96, offset: 809 },
        9: { name: 'Generation IX', limit: 103, offset: 905 },
    };

    const types = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
        'fighting', 'poison', 'ground', 'flying', 'psychic', 
        'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    const fetchPokemon = async (urlOrId) => {
        let url;
        if (typeof urlOrId === 'string') {
            if (urlOrId.startsWith('http')) {
                url = urlOrId;
            } else {
                url = `https://pokeapi.co/api/v2/pokemon/${urlOrId.toLowerCase()}`;
            }
        } else if (typeof urlOrId === 'number') {
            url = `https://pokeapi.co/api/v2/pokemon/${urlOrId}`;
        } else {
            throw new Error('Invalid parameter passed to fetchPokemon');
        }
        console.log('Fetching URL:', url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const fetchForms = async (pokemon) => {
        const forms = [];
        try {
            const speciesData = await fetch(pokemon.species.url).then(response => response.json());
            for (const form of speciesData.varieties) {
                if (!form.is_default) {
                    const formData = await fetch(form.pokemon.url).then(response => response.json());
                    forms.push(formData);
                }
            }
        } catch (error) {
            console.error('There was a problem fetching forms:', error);
        }
        return forms;
    };

    const displayPokemon = (pokemon, container) => {
        const type = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <h2>#${pokemon.id} ${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${type}</p>
        `;
        container.appendChild(pokemonCard);
    };

    const loadPokemonByGeneration = async (generation) => {
        const { limit, offset } = generations[generation];
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        console.log(`Fetching ${generations[generation].name} Pokémon from:`, url);
        
        selectedTitle.textContent = generations[generation].name; // Update the title

        try {
            const data = await fetch(url).then(response => response.json());
            console.log('Fetched data:', data);
            if (data && data.results) {
                pokemonList.innerHTML = '';  // Clear existing list
                for (const pokemon of data.results) {
                    const pokemonData = await fetchPokemon(pokemon.url);
                    displayPokemon(pokemonData, pokemonList);

                    // Fetch and display forms
                    const forms = await fetchForms(pokemonData);
                    forms.forEach(form => displayPokemon(form, pokemonList));
                }
            } else {
                console.error('No data results found');
            }
        } catch (error) {
            console.error('Failed to load Pokémon:', error);
        }
    };

    const loadPokemonByType = async (type) => {
        const url = `https://pokeapi.co/api/v2/type/${type}`;
        console.log(`Fetching Pokémon of type ${type} from:`, url);
        
        selectedTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Update the title

        try {
            const data = await fetch(url).then(response => response.json());
            console.log('Fetched data:', data);
            if (data && data.pokemon) {
                pokemonList.innerHTML = '';  // Clear existing list
                for (const { pokemon } of data.pokemon) {
                    const pokemonData = await fetchPokemon(pokemon.url);
                    displayPokemon(pokemonData, pokemonList);

                    // Fetch and display forms
                    const forms = await fetchForms(pokemonData);
                    forms.forEach(form => displayPokemon(form, pokemonList));
                }
            } else {
                console.error('No data results found');
            }
        } catch (error) {
            console.error('Failed to load Pokémon:', error);
        }
    };

    // Initialize the page with generation and type buttons
    if (pokemonList) {
        const generationButtons = Object.keys(generations).map(gen => 
            `<button onclick="loadPokemonByGeneration(${gen})">${generations[gen].name}</button>`
        ).join('');
        document.getElementById('generation-buttons').innerHTML = generationButtons;

        const typeButtons = types.map(type => 
            `<button onclick="loadPokemonByType('${type}')">${type.charAt(0).toUpperCase() + type.slice(1)}</button>`
        ).join('');
        document.getElementById('type-buttons').innerHTML = typeButtons;
    }

    window.loadPokemonByGeneration = loadPokemonByGeneration;
    window.loadPokemonByType = loadPokemonByType;
});
