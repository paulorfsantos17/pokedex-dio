const body = document.getElementsByTagName("body");

const limit = 12;
let offset = 0;
const maxPages = 11;
let qtnNextPage = 1;

createPageinitialPokedex()
loadPokemonsItens(offset, limit)




function createPageinitialPokedex() {
  body[0].innerHTML = `
  <section id="content" class="content">
    <h1>Pokedex</h1>
    <ol id="pokemonsList" class="pokemons">
    </ol>
    <div class="pagination">
      <button id="loadMoreItens"> load more...</button>
    </div>
  </section>`;

loadMoreItens.addEventListener("click", () => {
  if (maxPages <= qtnNextPage) {
    loadMoreItens.parentNode.removeChild(loadMoreItens);
  }
  qtnNextPage += 1;
  offset += limit;
  loadPokemonsItens(limit, offset);
});
}



function createPokemonListType(listType) {
  return listType.map((type) => `<li class='${type}'>${type}</li>`).join("");
}

function returnHome() {
  const content = document.getElementById('content')
  content.parentNode.removeChild(content);
  createPageinitialPokedex()
  loadPokemonsItens(offset, limit)
}

function pokemonSumary(pokemonUrl) {
  const content = document.getElementById("content");
  content.parentNode.removeChild(content);
  pokeApi.getPokemonsDetails(pokemonUrl).then((pokemon) => {
    body[0].innerHTML = `
    <section id="content" class="content-about ${pokemon.type}">
    <button onclick='returnHome()' class="button-return">
    <i class="fa-solid fa-arrow-left"></i>
    </button>
      <div class="header-about">
          <div class="header-container">
            <div>
              <h1 class="about-title">${pokemon.name}</h1>
              <ol class="types types-about">
              ${createPokemonListType(pokemon.types)}
              </ol>
            </div>
            <span class="about-number">#00${pokemon.number}</span>
          </div>
          <img class="photo-about" src="${pokemon.photo}" alt="">
        </div>
        <div class="sumary-about">
          <h2 class="sumary-title">About</h2>
          <section class="content-sumary">
            <table>
              <tr>
                <th>Height</th>
                <td>${pokemon.height}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>${pokemon.weight}</td>
              </tr>
              <tr>
                <th>Abilities</th>
                <td>${pokemon.abilities}</td>
              </tr>
            </table>
          </section>
        </div>
    </section>`;

  });
}

function convertPokemonToHTML(pokemon) {
  return ` <li class='${pokemon.type}' onclick="pokemonSumary('${
    pokemon.url
  }')">
  <div class="pokemon-header">
    <h2 class="name-pokemon">${pokemon.name}</h2>
    <span class="number-pokemon">#00${pokemon.number}</span>
  </div>
  <div class="pokemons-sumary">
    <ol class="types">
      ${pokemon.types
        .map((type) => `<li class='${type}'>${type}</li>`)
        .join("")}
    </ol>
    <img src=${pokemon.photo}
      alt="${pokemon.name}">
  </div>
</li>`;
}

function loadPokemonsItens(offset, limit) {
  const pokemonListHtml = document.getElementById("pokemonsList");
  const loadMoreItens = document.getElementById("loadMoreItens");
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonListHtml.innerHTML += pokemons.map(convertPokemonToHTML).join("");
  });
}





