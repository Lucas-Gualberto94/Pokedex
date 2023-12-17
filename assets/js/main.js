var pokemonList = document.getElementById('pokemonList') //Pegando a lista OL HTML
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0;
const maxRecords = 386
const modal = document.getElementById('myModal')


// função para criar a lista dinamica de pokemon, ao clicar na lista cria um modal e carrega as informações do pokemon selecionado
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

        // adicionando eventListener para cada Li da lista, ao clicar abre o modal, pega a URL correspondende e faz uma requisição para pegar as info do pokemon selecionado
        const newPokemonItems = document.querySelectorAll('.pokemon');
        newPokemonItems.forEach((item) => {
            item.addEventListener('click', function (event) {
                const liClicado = event.currentTarget;
                const idClicadoUrl = `https://pokeapi.co/api/v2/pokemon/${liClicado.id}`;
                modal.style.display = "block";
                fetch(idClicadoUrl)
                    .then(response => response.json())
                    .then(data => {
                        const firstType = data.types.length > 0 ? data.types[0].type.name : 'Desconhecido';
                        const pokemonInfo = new PokemonInfo(
                            data.species.name, 
                            data.height, 
                            data.weight,
                            data.sprites.front_default,
                            data.stats,
                            data.types,
                            firstType
                        );
                        console.log('Informações detalhadas do Pokémon:', pokemonInfo);
                        console.log(firstType)
                        fillModalContent(pokemonInfo);
                    })
            });
        });
    })
}

// função para preencher dinamicamente o modal
function fillModalContent(pokemonInfo) {

    document.getElementsByClassName('modal-content')[0].className += ' ' + pokemonInfo.firstType
 
    document.getElementById('modalTitle').innerHTML = `Informações do Pokémon <span>${pokemonInfo.species}</span>`;
    document.getElementById('modalHeight').innerText = `Altura: ${pokemonInfo.height / 10}m`;
    document.getElementById('modalWeight').innerText = `Peso: ${pokemonInfo.weight / 10}kg`;

    const modalImage = document.getElementById('modalImage');
    modalImage.src = pokemonInfo.photo;
    modalImage.alt = pokemonInfo.name;

    const modalStats = document.getElementById('modalStats');
    modalStats.innerHTML = '<h3>Estatísticas Base:</h3>';

    pokemonInfo.stats.forEach(stat => {
        modalStats.innerHTML += `<p data-stat="${stat.stat.name.toLowerCase()}">${stat.stat.name}: ${stat.base_stat}</p>`;
    });

}


// para fechar o modal
function closePokemonModal() {
    modal.style.display = 'none';
  }


window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closePokemonModal();
    }
});




// função para carregar mais pokemons na tela ao clicar no botão load more
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



