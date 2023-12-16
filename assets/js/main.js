var pokemonList = document.getElementById('pokemonList') //Pegando a lista OL HTML
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0;
const maxRecords = 386
const modal = document.getElementById('myModal')




function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { //Pega a lista de pokemons, mapeia eles, ou seja converte para uma lista Li, depois disso junta todos eles (join('') sem separador nenum, por isso a string vazia
        const newHtml = pokemons.map((pokemon) =>
            `<li id=${pokemon.number} class="pokemon ${pokemon.type}">
                    <span class="number">${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
    
                        <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                    </div>
                </li>
                `
        ).join('')
        pokemonList.innerHTML += newHtml

        const newPokemonItems = document.querySelectorAll('.pokemon');
        newPokemonItems.forEach((item) => {
            item.addEventListener('click', function (event) {
                const liClicado = event.currentTarget;
                const idClicadoUrl = `https://pokeapi.co/api/v2/pokemon/${liClicado.id}`;
                modal.style.display = "block";
                fetch(idClicadoUrl)
                    .then(response => response.json())
                    .then(data => {
                        const pokemonData = new PokemonInfo(
                            data.species.name, 
                            data.height, 
                            data.weight,
                            data.sprites.front_default,
                            data.stats
                        );
                        fillModalContent(pokemonData);
                    })
            });
        });
    })
}

function fillModalContent(pokemonData) {
    document.getElementById('modalTitle').innerText = `Informações do Pokémon ${pokemonData.species}`;
    document.getElementById('modalHeight').innerText = `Altura: ${pokemonData.height / 10}m`;
    document.getElementById('modalWeight').innerText = `Peso: ${pokemonData.weight / 10}kg`;

    const modalImage = document.getElementById('modalImage');
    modalImage.src = pokemonData.photo;
    modalImage.alt = pokemonData.name;

    const modalStats = document.getElementById('modalStats');
    modalStats.innerHTML = '<h3>Estatísticas Base:</h3>';

    pokemonData.stats.forEach(stat => {
        modalStats.innerHTML += `<p data-stat="${stat.stat.name.toLowerCase()}">${stat.stat.name}: ${stat.base_stat}</p>`;
    });
}

function closePokemonModal() {
    modal.style.display = 'none';
  }


window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closePokemonModal();
    }
});





loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItems(offset, limit)
    }
})



