function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((pokemonData) => {
      console.log(pokemonData.results);
      pokemonData.results.forEach((pokemon) => {
        renderAllPokemon(pokemon)
      })
    })
}

function renderAllPokemon (pokemon) {

}

fetchKantoPokemon()
/// Make a form which allows to users to make a comment on each pokemon
/// Also a 'like' button. Both of which will update the DOM.