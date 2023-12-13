const pokemonList = document.getElementById('pokemonList') //Pegando a lista OL HTML
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 0;
const maxRecords = 386


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { //Pega a lista de pokemons, mapeia eles, ou seja converte para uma lista Li, depois disso junta todos eles (join('') sem separador nenum, por isso a string vazia
        const newHtml = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
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
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit)
    
    loadMoreButton.parentElement.removeChild(loadMoreButton)

    }else {
    loadPokemonItems(offset, limit)
    }
})


