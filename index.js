const nav = document.querySelector("#main1");
const mainCont = document.querySelector('#main2')

function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((pokemonData) => {
      // console.log(pokemonData.results);
      pokemonData.results.forEach((pokemon) => {
        renderAllPokemon(pokemon);
      });
    });
}

function renderAllPokemon(pokemon) {
  fetch(pokemon.url)
    .then((res) => res.json())
    .then((pokemonData2) => {
      // console.log(pokemon);
      const navUL = document.querySelector("#main1ul");
      const navLI = document.createElement("li");
      const img = document.createElement("img");
      img.src =
        pokemonData2.sprites["versions"]["generation-v"][
          "black-white"
        ].animated.front_default;
      navLI.textContent =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      navUL.append(navLI, img);

      // CLICK EVENT
      img.addEventListener("click", () => renderToMain2(pokemonData2));
    });
}

function renderToMain2(pokemonData2) {
  mainCont.innerHTML = ""
  const imgMain = document.createElement('img');
  imgMain.src = pokemonData2.sprites.other["official-artwork"].front_default;
  mainCont.append(imgMain);
}

fetchKantoPokemon();
/// Make a form which allows to users to make a comment on each pokemon
/// Also a 'like' button. Both of which will update the DOM.
/// After multiple refresh order of pokemon is scrambled?