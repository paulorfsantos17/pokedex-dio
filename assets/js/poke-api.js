const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail, url) {
  const pokemon = new Pokemon()
  pokemon.name = pokemonDetail.name
  pokemon.number = pokemonDetail.id
  pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default
  pokemon.url = url;
  pokemon.height = pokemonDetail.height
  pokemon.weight = pokemonDetail.weight
  pokemon.abilities = pokemonDetail.abilities.map(ability => ability.ability.name)
  console.log(pokemon)

  
  const types = pokemonDetail.types.map(typeSlot => typeSlot.type.name)

  pokemon.types = types
  pokemon.type = types[0]
  return pokemon
}

pokeApi.getPokemonsDetails = (pokemon) => {
  if(typeof pokemon === "string") {
    return fetch(pokemon)
    .then(res=> res.json())
    .then(resPokemon  => convertPokeApiDetailToPokemon(resPokemon, pokemon))
  } else {
    return fetch(pokemon.url)
    .then(res=> res.json())
    .then(resPokemon  => convertPokeApiDetailToPokemon(resPokemon, pokemon.url))
  }
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then(res => res.json())
    .then(bodyJson => bodyJson.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonsDetails))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonDetails => pokemonDetails)
    .catch(err => console.error(err))
}

