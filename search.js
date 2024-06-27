document.addEventListener('DOMContentLoaded', () => {
    const searchResults = document.getElementById('search-results');

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
                throw new Error(`Network response was not ok for URL: ${url}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return null;
        }
    };

    const fetchSpecies = async (url) => {
        console.log('Fetching species URL:', url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok for URL: ${url}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return null;
        }
    };

    const displayPokemon = async (pokemon, container, showFullEntry = false) => {
        try {
            const species = await fetchSpecies(pokemon.species.url);
            if (!species) {
                console.error('No species data found for:', pokemon);
                return;
            }
            const type = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
            const generation = species.generation.name;
            const entry = species.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');
            pokemonCard.innerHTML = `
                <h2>#${pokemon.id} ${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>Type: ${type}</p>
                <p>Generation: ${generation}</p>
                ${showFullEntry ? `<p>Entry: ${entry}</p>` : ''}
                <p>Height: ${pokemon.height}</p>
                <p>Weight: ${pokemon.weight}</p>
            `;
            container.appendChild(pokemonCard);
        } catch (error) {
            console.error('There was a problem with displaying the Pokémon:', error);
        }
    };

    const specialForms = {
        "rattata": ["rattata-alola"],
          "raticate": ["raticate-alola"],
          "raichu": ["raichu-alola"],
          "sandshrew": ["sandshrew-alola"],
          "sandslash": ["sandslash-alola"],
          "vulpix": ["vulpix-alola"],
          "ninetales": ["ninetales-alola"],
          "diglett": ["diglett-alola"],
          "dugtrio": ["dugtrio-alola"],
          "meowth": ["meowth-alola", "meowth-galar", "meowth-gmax"],
          "persian": ["persian-alola"],
          "geodude": ["geodude-alola"],
          "graveler": ["graveler-alola"],
          "golem": ["golem-alola"],
          "grimer": ["grimer-alola"],
          "muk": ["muk-alola"],
          "exeggutor": ["exeggutor-alola"],
          "marowak": ["marowak-alola"],
          "ponyta": ["ponyta-galar"],
          "rapidash": ["rapidash-galar"],
          "slowpoke": ["slowpoke-galar"],
          "slowbro": ["slowbro-galar", "slowbro-mega"],
          "farfetchd": ["farfetchd-galar"],
          "weezing": ["weezing-galar"],
          "mr-mime": ["mr-mime-galar"],
          "articuno": ["articuno-galar"],
          "zapdos": ["zapdos-galar"],
          "moltres": ["moltres-galar"],
          "corsola": ["corsola-galar"],
          "zigzagoon": ["zigzagoon-galar"],
          "linoone": ["linoone-galar"],
          "darumaka": ["darumaka-galar"],
          "darmanitan": ["darmanitan-galar", "darmanitan-zen"],
          "yamask": ["yamask-galar"],
          "stunfisk": ["stunfisk-galar"],
          "growlithe": ["growlithe-hisui"],
          "arcanine": ["arcanine-hisui"],
          "voltorb": ["voltorb-hisui"],
          "electrode": ["electrode-hisui"],
          "qwilfish": ["qwilfish-hisui"],
          "sneasel": ["sneasel-hisui"],
          "samurott": ["samurott-hisui"],
          "lilligant": ["lilligant-hisui"],
          "zorua": ["zorua-hisui"],
          "zoroark": ["zoroark-hisui"],
          "braviary": ["braviary-hisui"],
          "sliggoo": ["sliggoo-hisui"],
          "goodra": ["goodra-hisui"],
          "avalugg": ["avalugg-hisui"],
          "decidueye": ["decidueye-hisui"],
          "pikachu": ["pikachu-gmax"],
          "charizard": ["charizard-gmax", "charizard-mega-x", "charizard-mega-y"],
          "butterfree": ["butterfree-gmax"],
          "machamp": ["machamp-gmax"],
          "gengar": ["gengar-gmax", "gengar-mega"],
          "kingler": ["kingler-gmax"],
          "lapras": ["lapras-gmax"],
          "eevee": ["eevee-gmax"],
          "snorlax": ["snorlax-gmax"],
          "garbodor": ["garbodor-gmax"],
          "melmetal": ["melmetal-gmax"],
          "rillaboom": ["rillaboom-gmax"],
          "cinderace": ["cinderace-gmax"],
          "inteleon": ["inteleon-gmax"],
          "corviknight": ["corviknight-gmax"],
          "orbeetle": ["orbeetle-gmax"],
          "drednaw": ["drednaw-gmax"],
          "coalossal": ["coalossal-gmax"],
          "flapple": ["flapple-gmax"],
          "appletun": ["appletun-gmax"],
          "sandaconda": ["sandaconda-gmax"],
          "toxtricity": ["toxtricity-amped-gmax", "toxtricity-lowkey-gmax", "toxtricity-amped", "toxtricity-lowkey"],
          "centiskorch": ["centiskorch-gmax"],
          "hatterene": ["hatterene-gmax"],
          "grimmsnarl": ["grimmsnarl-gmax"],
          "alcremie": [
            "alcremie-gmax", "alcremie-ruby-cream", "alcremie-matcha-cream", "alcremie-mint-cream",
            "alcremie-lemon-cream", "alcremie-salted-cream", "alcremie-ruby-swirl", "alcremie-caramel-swirl",
            "alcremie-rainbow-swirl"
          ],
          "copperajah": ["copperajah-gmax"],
          "duraludon": ["duraludon-gmax"],
          "urshifu": ["urshifu-single-strike-gmax", "urshifu-rapid-strike-gmax", "urshifu-single-strike", "urshifu-rapid-strike"],
          "castform": ["castform-sunny", "castform-rainy", "castform-snowy"],
          "cherrim": ["cherrim-sunshine"],
          "aegislash": ["aegislash-blade"],
          "minior": ["minior-core"],
          "mimikyu": ["mimikyu-busted"],
          "necrozma": ["necrozma-dusk-mane", "necrozma-dawn-wings", "necrozma-ultra"],
          "wishiwashi": ["wishiwashi-school"],
          "zygarde": ["zygarde-10", "zygarde-complete"],
          "eiscue": ["eiscue-noice"],
          "morpeko": ["morpeko-hangry"],
          "indeedee": ["indeedee-male", "indeedee-female"],
          "zarude": ["zarude-dada"],
          "tauros": ["tauros-combat-breed", "tauros-blaze-breed", "tauros-aqua-breed"],
          "palafin": ["palafin-hero"],
          "thundurus": ["thundurus-therian"],
          "deoxys": ["deoxys-attack", "deoxys-defense", "deoxys-speed"],
          "wormadam": ["wormadam-sandy", "wormadam-trash"],
          "giratina": ["giratina-origin"],
          "shaymin": ["shaymin-sky"],
          "basculin": ["basculin-blue-striped"],
          "tornadus": ["tornadus-therian"],
          "kyurem": ["kyurem-black", "kyurem-white"],
          "keldeo": ["keldeo-resolute"],
          "meloetta": ["meloetta-pirouette"],
          "genesect": ["genesect-burn", "genesect-chill", "genesect-douse", "genesect-shock"],
          "vivillon": [
            "vivillon-archipelago", "vivillon-continental", "vivillon-elegant", "vivillon-fancy", "vivillon-garden",
            "vivillon-high-plains", "vivillon-icy-snow", "vivillon-jungle", "vivillon-marine", "vivillon-meadow",
            "vivillon-modern", "vivillon-monsoon", "vivillon-ocean", "vivillon-poke-ball", "vivillon-polar",
            "vivillon-river", "vivillon-sandstorm", "vivillon-savanna", "vivillon-sun", "vivillon-tundra"
          ],
          "flabebe": ["flabebe-blue", "flabebe-orange", "flabebe-white", "flabebe-yellow"],
          "floette": ["floette-blue", "floette-orange", "floette-white", "floette-yellow"],
          "florges": ["florges-blue", "florges-orange", "florges-white", "florges-yellow"],
          "furfrou": [
            "furfrou-dandy", "furfrou-debutante", "furfrou-diamond", "furfrou-heart", "furfrou-kabuki",
            "furfrou-la-reine", "furfrou-matron", "furfrou-pharaoh", "furfrou-star"
          ],
          "pumpkaboo": ["pumpkaboo-small", "pumpkaboo-large", "pumpkaboo-super"],
          "gourgeist": ["gourgeist-small", "gourgeist-large", "gourgeist-super"],
          "hoopa": ["hoopa-unbound"],
          "oricorio": ["oricorio-pom-pom", "oricorio-pau", "oricorio-sensu", "oricorio-baile"],
          "rockruff": ["rockruff-own-tempo"],
          "lycanroc": ["lycanroc-midnight", "lycanroc-dusk"],
    "wishiwashi": ["wishiwashi-school"],
    "minior": ["minior-meteor", "minior-core"],
    "mimikyu": ["mimikyu-busted"],
    "magearna": ["magearna-original"],
    "cramorant": ["cramorant-gulping", "cramorant-gorging"],
    "toxtricity": ["toxtricity-amped", "toxtricity-lowkey"],
    "eiscue": ["eiscue-noice"],
    "indeedee": ["indeedee-male", "indeedee-female"],
    "morpeko": ["morpeko-hangry"],
    "zacian": ["zacian-crowned"],
    "zamazenta": ["zamazenta-crowned"],
    "eternatus": ["eternatus-eternamax"],
    "urshifu": ["urshifu-single-strike", "urshifu-rapid-strike"],
    "zarude": ["zarude-dada"],
    "calyrex": ["calyrex-ice-rider", "calyrex-shadow-rider"],
    "basculegion": ["basculegion-female"],
    "enamorus": ["enamorus-therian"],
    "venusaur": ["venusaur-mega", "venusaur-gmax"],
    "blastoise": ["blastoise-mega", "blastoise-gmax"],
    "beedrill": ["beedrill-mega"],
    "pidgeot": ["pidgeot-mega"],
    "alakazam": ["alakazam-mega"],
    "slowbro": ["slowbro-mega"],
    "kangaskhan": ["kangaskhan-mega"],
    "pinsir": ["pinsir-mega"],
    "gyarados": ["gyarados-mega"],
    "aerodactyl": ["aerodactyl-mega"],
    "mewtwo": ["mewtwo-mega-x", "mewtwo-mega-y"],
    "ampharos": ["ampharos-mega"],
    "steelix": ["steelix-mega"],
    "scizor": ["scizor-mega"],
    "heracross": ["heracross-mega"],
    "houndoom": ["houndoom-mega"],
    "tyranitar": ["tyranitar-mega"],
    "sceptile": ["sceptile-mega"],
    "blaziken": ["blaziken-mega"],
    "swampert": ["swampert-mega"],
    "gardevoir": ["gardevoir-mega"],
    "sableye": ["sableye-mega"],
    "mawile": ["mawile-mega"],
    "aggron": ["aggron-mega"],
    "medicham": ["medicham-mega"],
    "manectric": ["manectric-mega"],
    "sharpedo": ["sharpedo-mega"],
    "camerupt": ["camerupt-mega"],
    "altaria": ["altaria-mega"],
    "banette": ["banette-mega"],
    "absol": ["absol-mega"],
    "glalie": ["glalie-mega"],
    "salamence": ["salamence-mega"],
    "metagross": ["metagross-mega"],
    "latias": ["latias-mega"],
    "latios": ["latios-mega"],
    "kyogre": ["kyogre-primal"],
    "groudon": ["groudon-primal"],
    "rayquaza": ["rayquaza-mega"],
    "lopunny": ["lopunny-mega"],
    "garchomp": ["garchomp-mega"],
    "lucario": ["lucario-mega"],
    "abomasnow": ["abomasnow-mega"],
    "gallade": ["gallade-mega"],
    "audino": ["audino-mega"],
    "diancie": ["diancie-mega"],
    "greninja": ["greninja-ash"],
    "oricorio": ["oricorio-pom-pom", "oricorio-pau", "oricorio-sensu", "oricorio-baile"],
    "rockruff": ["rockruff-own-tempo"],
    "lycanroc": ["lycanroc-midday", "lycanroc-midnight", "lycanroc-dusk"],
    "wishiwashi": ["wishiwashi-school"],
    "minior": ["minior-meteor", "minior-core"],
    "mimikyu": ["mimikyu-busted"],
    "magearna": ["magearna-original"],
    "cramorant": ["cramorant-gulping", "cramorant-gorging"],
    "toxtricity": ["toxtricity-amped", "toxtricity-lowkey"],
    "eiscue": ["eiscue-noice"],
    "indeedee": ["indeedee-male", "indeedee-female"],
    "morpeko": ["morpeko-hangry"],
    "zacian": ["zacian-crowned"],
    "zamazenta": ["zamazenta-crowned"],
    "eternatus": ["eternatus-eternamax"],
    "urshifu": ["urshifu-single-strike", "urshifu-rapid-strike"],
    "zarude": ["zarude-dada"],
    "calyrex": ["calyrex-ice-rider", "calyrex-shadow-rider"],
    "basculegion": ["basculegion-female"],
    "enamorus": ["enamorus-therian"],
    "landorus": ["landorus-therian"]
    };

    const fetchAllPokemonNames = async () => {
        let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
        let allPokemon = [];

        while (url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Network response was not ok for URL: ${url}`);
                }
                const data = await response.json();
                allPokemon = allPokemon.concat(data.results.map(p => p.name));
                url = data.next;
            } catch (error) {
                console.error('There was a problem with fetching all Pokémon names:', error);
                throw error;
            }
        }

        return allPokemon;
    };

    const searchPokemon = async () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const allPokemonNames = await fetchAllPokemonNames();

        const allNamesWithForms = new Set([...allPokemonNames, ...Object.keys(specialForms), ...Object.values(specialForms).flat()]);

        const matchingNames = Array.from(allNamesWithForms).filter(name => name.startsWith(query));

        let urls = matchingNames.map(name => `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

        try {
            searchResults.innerHTML = '';

            for (const url of urls) {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        console.warn(`Network response was not ok for URL: ${url}`);
                        continue;
                    }
                    const pokemon = await response.json();

                    if (url.includes('pokemon-form')) {
                        const speciesUrl = pokemon.pokemon.url.replace('pokemon-form', 'pokemon');
                        const speciesData = await fetch(speciesUrl).then(res => res.json());
                        pokemon.species = speciesData.species;
                    }

                    await displayPokemon(pokemon, searchResults, true);
                } catch (error) {
                    console.error('There was a problem with fetching a Pokémon:', error);
                }
            }

            if (searchResults.innerHTML === '') {
                searchResults.innerHTML = '<p>Pokémon not found</p>';
            }
        } catch (error) {
            console.error('There was a problem with the search operation:', error);
            searchResults.innerHTML = '<p>Pokémon not found</p>';
        }
    };

    window.searchPokemon = searchPokemon;
});

