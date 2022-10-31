
//objeto com as funçoes de manipulacao da API

const pokeAPI = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
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

pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeAPI.getPokemons = (offset = 0, limit = 15) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    //busca de lista de pokemons
    return fetch(url)
        .then((response) => response.json()) //conversao para json
        .then(jsonBody => jsonBody.results) //lista de pokemons convertida
        .then((pokemons) => pokemons.map((pokeAPI.getPokemonDetail))) //conversao para pokemons detalhados
        .then((detailRequests) => Promise.all(detailRequests)) //chamada com varias requisicoes + conversao para json
        .then((pokemonsDetails) => pokemonsDetails) //lista detalhada de pokemons, modelo PokeAPI
}