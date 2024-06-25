document.addEventListener('DOMContentLoaded', () => {
    const searchResults = document.getElementById('search-results');
    const teamContainer = document.getElementById('team-container');
    const pokemonList = document.getElementById('pokemon-list');
    const savedTeamsContainer = document.getElementById('saved-teams-container');
    const saveTeamButton = document.getElementById('save-team-button');
    let team = JSON.parse(localStorage.getItem('currentTeam')) || [];

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

    const fetchSpecies = async (url) => {
        console.log('Fetching species URL:', url);
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

    const displayPokemon = async (pokemon, container, isTeam = false, showFullEntry = false) => {
        const species = await fetchSpecies(pokemon.species.url);
        const type = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
        const generation = species.generation.name;
        const entry = species.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        if (isTeam) {
            pokemonCard.innerHTML = `
                <h2>${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${type}</p>
            `;
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.innerHTML = 'X';
            removeButton.onclick = () => removePokemonFromTeam(pokemon.id);
            pokemonCard.appendChild(removeButton);
        } else {
            pokemonCard.innerHTML = `
                <h2>#${pokemon.id} ${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${type}</p>
                <p>Generation: ${generation}</p>
                ${showFullEntry ? `<p>Entry: ${entry}</p>` : ''}
                <p>Height: ${pokemon.height}</p>
                <p>Weight: ${pokemon.weight}</p>
            `;
        }
        container.appendChild(pokemonCard);
    };

    const addPokemonToTeam = async (id) => {
        if (team.length >= 6) {
            alert('You can only add up to 6 Pokémon to your team.');
            return;
        }
        const pokemon = await fetchPokemon(id);
        if (pokemon) {
            team.push(pokemon);
            displayPokemon(pokemon, teamContainer, true);
            localStorage.setItem('currentTeam', JSON.stringify(team));
            if (team.length === 6) {
                saveTeamButton.disabled = false;
            }
        }
    };

    const removePokemonFromTeam = (id) => {
        team = team.filter(p => p.id !== id);
        teamContainer.innerHTML = '';
        team.forEach(pokemon => displayPokemon(pokemon, teamContainer, true));
        localStorage.setItem('currentTeam', JSON.stringify(team));
        saveTeamButton.disabled = team.length !== 6;
    };

    const saveTeam = () => {
        const teamName = document.getElementById('team-name').value;
        if (!teamName) {
            alert('Please enter a team name');
            return;
        }
        const savedTeams = JSON.parse(localStorage.getItem('savedTeams')) || [];
        savedTeams.push({ name: teamName, team });
        localStorage.setItem('savedTeams', JSON.stringify(savedTeams));
        localStorage.removeItem('currentTeam');
        alert('Team saved!');
        displaySavedTeams();
        team = [];
        teamContainer.innerHTML = '';
        document.getElementById('team-name').value = '';
        document.getElementById('team-search-input').value = '';
        saveTeamButton.disabled = true;
    };

    const displaySavedTeams = () => {
        savedTeamsContainer.innerHTML = '';
        const savedTeams = JSON.parse(localStorage.getItem('savedTeams')) || [];
        savedTeams.forEach(savedTeam => {
            const teamDiv = document.createElement('div');
            teamDiv.classList.add('saved-team');
            teamDiv.innerHTML = `<h3>${savedTeam.name}</h3>`;
            savedTeam.team.forEach(pokemon => displayPokemon(pokemon, teamDiv, false));
            savedTeamsContainer.appendChild(teamDiv);
        });
    };

    const loadPokemonByGeneration = async (generation) => {
        const { limit, offset } = generations[generation];
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        console.log(`Fetching ${generations[generation].name} Pokémon from:`, url);
        try {
            const data = await fetch(url).then(response => response.json());
            console.log('Fetched data:', data);
            if (data && data.results) {
                pokemonList.innerHTML = '';  // Clear existing list
                for (const pokemon of data.results) {
                    const pokemonData = await fetchPokemon(pokemon.url);
                    displayPokemon(pokemonData, pokemonList);
                }
            } else {
                console.error('No data results found');
            }
        } catch (error) {
            console.error('Failed to load Pokémon:', error);
        }
    };

    const searchPokemon = async () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const pokemon = await fetchPokemon(query);
        searchResults.innerHTML = '';
        if (pokemon) {
            displayPokemon(pokemon, searchResults, false, true);
        } else {
            searchResults.innerHTML = '<p>Pokémon not found</p>';
        }
    };

    // Page-specific initializations
    if (pokemonList) {
        const generationButtons = Object.keys(generations).map(gen => 
            `<button onclick="loadPokemonByGeneration(${gen})">${generations[gen].name}</button>`
        ).join('');
        document.getElementById('generation-buttons').innerHTML = generationButtons;
    }

    if (teamContainer) {
        team.forEach(pokemon => displayPokemon(pokemon, teamContainer, true));
    }

    if (savedTeamsContainer) {
        displaySavedTeams();
    }

    // Expose functions to the global scope
    window.searchAndAddPokemon = async () => {
        const query = document.getElementById('team-search-input').value.toLowerCase();
        const pokemon = await fetchPokemon(query);
        if (pokemon) {
            addPokemonToTeam(pokemon.id);
        } else {
            alert('Pokémon not found');
        }
    };
    window.saveTeam = saveTeam;
    window.searchPokemon = searchPokemon;
    window.loadPokemonByGeneration = loadPokemonByGeneration;
    window.addPokemonToTeam = addPokemonToTeam;
});
