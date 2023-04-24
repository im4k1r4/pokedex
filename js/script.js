const pokemonName = document.querySelector('.pokemon__name'); // variável global
const pokemonNumber = document.querySelector('.pokemon__number'); // variável global
const pokemonImage = document.querySelector('.pokemon__image');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // fetch é através de promises. Só dá pra usar o await em funções assíncronas
    const data = await APIResponse.json(); // Extrair o JSON
    return(data);
}

// RENDERIZAR OS DADOS DA API:
const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data.name; // pegando o dado da API e renderizando no HTML
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
}