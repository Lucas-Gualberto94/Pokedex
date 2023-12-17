
const pokeApi = {}
const infoModal = {}




function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}



pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}


// metodo pata fazer a requisação para poder c riar a lista de pokemons
pokeApi.getPokemons = (offset = 0, limit = 5) => { //vai retornar toda a nossa manipulaçao do Fetch, obs: quando default (=0) no paramentro, se ninguem passar nada ele assume esse valor
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url) //Requisição HTTP pra buscar os pokemons
        .then((response) => response.json()) //transforma o arquivo em json
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        
}  //é um função que abstrai o consumo do http


