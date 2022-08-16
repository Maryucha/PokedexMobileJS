const namePoke = document.querySelector('.pokemon__name');
const numberPoke = document.querySelector('.pokemon__number');
const imagemPoke = document.querySelector('.pokemon__image');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    console.log(data);
    if (data) {
        imagemPoke.style.display = 'block';
        namePoke.innerHTML = data.name;
        numberPoke.innerHTML = data.id;
        imagemPoke.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        imagemPoke.style.display = 'none';
        namePoke.innerHTML = 'Not Found';
        numberPoke.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLocaleLowerCase());
});


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });
  
  buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });



renderPokemon(searchPokemon);