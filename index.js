// make likes and comments that render and update for EACH pokemon
//look up nesting data in local server

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

let fullPokemonArray = [];
let currentPokemonId = 0;

function getLocalPokemonData(id) {
  let tempData = localStorage.getItem(id);
  return tempData == null
    ? (tempData = {
        likes: 0,
        comments: [],
      })
    : (tempData = JSON.parse(tempData));
}

function fetchKantoPokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((pokemonData) => {
      const pokemonPromises = pokemonData.results.map((pokemon) => {
        return fetch(pokemon.url).then((res) => res.json());
      });
      Promise.all(pokemonPromises).then((allPokemons) => {
        fullPokemonArray = allPokemons;
        allPokemons.forEach((pokemon) => {
          renderOnePokemon(pokemon);
        });
      });
    });
}

function fetchSpecies(pokemon) {
  fetch(pokemon.species.url)
    .then((res) => res.json())
    .then((pokemonSpecies) => {
      const desc = document.querySelector("#pokemondesc");
      desc.append(
        pokemonSpecies.flavor_text_entries[Math.floor(Math.random() * 16)]
          .flavor_text
      );
    });
}

function renderOnePokemon(pokemon) {
  const navp = document.createElement("p");
  navp.textContent = toTitleCase(pokemon.name);
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
  img.addEventListener("click", () => changePokemon(pokemon.id - 1));
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

function renderdiv2(pokemon) {
  const imgMain = document.createElement("img");
  imgMain.src = pokemon.sprites.other["official-artwork"].front_default;
  mainCont.innerHTML = `<div id='buttonContainer'><button id='backward' onclick="goBack()"><</button> <button id='forward' onclick='goForward()'>></button></div>`;
  mainCont.append(imgMain);
}

function renderdiv3(pokemon) {
  const main3name = toTitleCase(pokemon.species.name);
  const height = pokemon.height / 10;
  const weight = pokemon.weight;
  let types = "";
  pokemon.types.forEach(
    (type) =>
      (types += `<span class='poketype'>${typeImage(type.type.name)} </span>`)
  );

  //LOCAL STORAGE
  let localStorageData = getLocalPokemonData(currentPokemonId);
  let likes = localStorage.likes;

  pokeInfo.innerHTML = `
  <h2 id='pokename'>${main3name}</h2> <p id='likes'><b>Likes:</b> ${likes}</p>
  <button id='like' type="button">Like!</button> <button id='dislike' type="button">Dislike...</button>
  <p><b>Description: <span id='pokemondesc'></span></b></p>
  <p><b>Height: </b>${height} Meters</p>
  <p><b>Weight: </b>${weight} lbs</p>
  <p><b>Type:</b><br>${types}</p>
  <div id='formdiv'>
  <form id='pokeform'>
  <input id='comments' type='text' placeholder='Leave A Comment!!!!'>
  <input id='submit' type='submit' name='name' value='Submit' class='invert'>
  </form>
  <div id='commentContainer'></div>
  </div>
  <div id='main3comment'></div>
    `;

  const like = document.querySelector("#like");
  const dislike = document.querySelector("#dislike");
  const likeCount = document.querySelector("#likes");
  const form = document.querySelector("#pokeform");

  like.addEventListener("click", () => {
    likes += 1;
    likeCount.innerText = `Likes: ${likes}`;

    Object.assign(localStorageData, { likes: likes });
    localStorage.setItem(currentPokemonId, JSON.stringify(localStorageData));
  });
  dislike.addEventListener("click", () => {
    likes -= 1;
    likeCount.innerText = `Likes: ${likes}`;
    Object.assign(localStorageData, { likes: likes });
    localStorage.setItem(currentPokemonId, JSON.stringify(localStorageData));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const main3comment = document.querySelector("#main3comment");
    const newComment = form[0].value;

    Object.assign(localStorageData, {
      comments: [...localStorageData.comments, { text: newComment }],
    });
    localStorage.setItem(currentPokemonId, JSON.stringify(localStorageData));

    const p = document.createElement("p");
    p.textContent = newComment;
    main3comment.append(p);
    form.reset();
  });
}

function changePokemon(id) {
  if (id < 0) {
    currentPokemonId = fullPokemonArray.length - 1;
  } else if (id > fullPokemonArray.length - 1) {
    currentPokemonId = 0;
  } else {
    currentPokemonId = id;
  }
  renderToMain2and3(fullPokemonArray[currentPokemonId]);
}

function renderToMain2and3(pokemon) {
  renderdiv2(pokemon);
  renderdiv3(pokemon);
  fetchSpecies(pokemon);
}

fetchKantoPokemon();

function goBack() {
  changePokemon(currentPokemonId - 1);
}

function goForward() {
  changePokemon(currentPokemonId + 1);
}
