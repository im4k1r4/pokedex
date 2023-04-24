const pokemonName = document.querySelector('.pokemon__name'); // variável global
const pokemonNumber = document.querySelector('.pokemon__number'); // variável global
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // fetch é através de promises. Só dá pra usar o await em funções assíncronas
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json(); // Extrair o JSON
        return data;
    }
}

// RENDERIZAR OS DADOS DA API:
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'; // exibir enquanto está no await
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) { // se tiver algo no data
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name; // pegando o dado da API e renderizando no HTML
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value =''; // limpar o input
        searchPokemon = data.id; // pro botão de voltar e avançar funcionar
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

// quando o form for enviado, executa a função e retorna a renderpokemon com o valor
form.addEventListener('submit', (event) => {
        event.preventDefault();
        renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1; // aumenta um no search
        renderPokemon(searchPokemon); // renderiza com o valor do search
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1; // aumenta um no search
    renderPokemon(searchPokemon); // renderiza com o valor do search
});

renderPokemon(searchPokemon);