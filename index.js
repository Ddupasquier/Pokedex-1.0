///// Make a form which allows to users to make a comment on each pokemon
/// Add buttons to main2 which allow you to switch back and forth between pokemon
// Maybe try and style scroll bars to be nicer looking


const typeIcons = {
  bug: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/240px-Pok%C3%A9mon_Bug_Type_Icon.svg.png",
  dark: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg/240px-Pok%C3%A9mon_Dark_Type_Icon.svg.png",
  dragon:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/120px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png",
  electric:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/120px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
  fairy:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/120px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
  fighting:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/120px-Pok%C3%A9mon_Electric_Type_Icon.svg.png",
  fire: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/240px-Pok%C3%A9mon_Fire_Type_Icon.svg.png",
  flying:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/120px-Pok%C3%A9mon_Flying_Type_Icon.svg.png",
  ghost:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/120px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png",
  grass:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/120px-Pok%C3%A9mon_Grass_Type_Icon.svg.png",
  ground:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/120px-Pok%C3%A9mon_Ground_Type_Icon.svg.png",
  ice: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/120px-Pok%C3%A9mon_Ice_Type_Icon.svg.png",
  normal:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/120px-Pok%C3%A9mon_Normal_Type_Icon.svg.png",
  poison:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/120px-Pok%C3%A9mon_Poison_Type_Icon.svg.png",
  psychic:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/120px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png",
  rock: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/120px-Pok%C3%A9mon_Rock_Type_Icon.svg.png",
  steel:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/120px-Pok%C3%A9mon_Steel_Type_Icon.svg.png",
  water:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/120px-Pok%C3%A9mon_Water_Type_Icon.svg.png",
};

const nav = document.querySelector("#main1");
const mainCont = document.querySelector("#main2");
const pokeInfo = document.querySelector("#main3");



function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((pokemonData) => {
      const pokemonPromises = pokemonData.results.map((pokemon) => {
        return fetch(pokemon.url).then((res) => res.json());
      });
      Promise.all(pokemonPromises).then((allPokemons) => {
        allPokemons.forEach((pokemonData) => {
          renderOnePokemon(pokemonData);
        });
      });
    });
}

// function fetchSpecies(pokemon) {
//   fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`)
//     .then((res) => res.json())
//     .then((pokemonSpecies) => {
//   console.log(pokemonSpecies)
// })
// }

function renderOnePokemon(pokemon) {
  const navp = document.createElement("p");
  navp.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const img = document.createElement("img");
  const hover = (img.src =
    pokemon.sprites["versions"]["generation-v"][
      "black-white"
    ].animated.front_default);
  const sprite = (img.src =
    pokemon.sprites["versions"]["generation-v"][
      "black-white"
    ].animated.back_default);
  const main1div = document.createElement("div");
  main1div.setAttribute("id", pokemon.name);
  main1div.setAttribute("class", "navDiv");

  nav.append(main1div);
  main1div.append(navp, img);

  // CLICK EVENT
  img.addEventListener("click", () => renderToMain2and3(pokemon));
  img.onmouseover = () => {
    img.src = hover;
  };
  img.onmouseout = () => {
    img.src = sprite;
  };
}

function toTitleCase(upper) {
  return upper.charAt(0).toUpperCase() + upper.slice(1);
}

function typeImage(typeName) {
  const icon = typeIcons[typeName];
  return `<img src='${icon}'>`;
}

function renderToMain2and3(pokemon) {
  const height = pokemon.height / 10;
  let types = "";
  pokemon.types.forEach(
    (type) =>
      (types += `<span class='poketype'>${typeImage(type.type.name)} </span>`)
  );
  const main3name = pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1);
  const weight = pokemon.weight;
  const imgMain = document.createElement("img");
  imgMain.src = pokemon.sprites.other["official-artwork"].front_default;
  mainCont.innerHTML = "";
  mainCont.append(imgMain);
  let likes = 0;
  pokeInfo.innerHTML = `
    <h2 id='pokename'>${main3name}</h2> <p id='likes'><b>Likes:</b> 0</p>
    <button id='like' type="button">Like!</button> <button id='dislike' type="button">Dislike...</button>
    <p><b>Description: </b></p>
    <p><b>Height: </b>${height} Meters</p>
    <p><b>Weight: </b>${weight} lbs</p>
    <p><b>Type:</b><br>${types}</p>
    <div id='formdiv'>
    <form id='pokeform'>
    <input id='comments' type='text' placeholder='Tell us how you feel about this pokemon!'>
    <input id='submit' type='submit' name='name' value='Submit'>
    </form>
    </div>
  `;
  const like = document.querySelector("#like");
  const dislike = document.querySelector("#dislike");
  const likeCount = document.querySelector("#likes");
  const form = document.querySelector('#comments')

  like.addEventListener("click", () => {
    likes += 1;
    likeCount.innerText = `Likes: ${likes}`;
  });
  dislike.addEventListener("click", () => {
    likes -= 1;
    likeCount.innerText = `Likes: ${likes}`;
  });

  // fetchSpecies(pokemon);
}


fetchKantoPokemon()
