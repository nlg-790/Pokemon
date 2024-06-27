document.addEventListener('DOMContentLoaded', () => {
    const teamContainer = document.getElementById('team-container');
    const savedTeamsContainer = document.getElementById('saved-teams-container');
    const saveTeamButton = document.getElementById('save-team-button');
    let team = JSON.parse(localStorage.getItem('currentTeam')) || [];

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

    const displayPokemon = (pokemon, container, isTeam = false) => {
        const type = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

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

    if (teamContainer) {
        team.forEach(pokemon => displayPokemon(pokemon, teamContainer, true));
    }

    if (savedTeamsContainer) {
        displaySavedTeams();
    }

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
});
