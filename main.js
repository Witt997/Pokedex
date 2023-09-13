const listPokemon = document.querySelector("#listPokemon");
const buttonHeader = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => showPokemon(data))
}

function showPokemon(data) {

    let types = data.types.map((type) => 
        `<p class=${type.type.name} type>${type.type.name}</p>`); //map always generates an array of element mapped;
        types = types.join("");
    //console.log(types);

    let pokeID = data.id.toString();
    if (pokeID.length === 1) {
        pokeID = "00" + pokeID;
    } else if (pokeID.length === 2) {
        pokeID = "0" + pokeID;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = 
    `
        <p class="pokemon-id-back">#${pokeID}</p>
        <div class="pokemon-image">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" />
        </div>
        <div class="pokemon-info">
            <div class="name-container">
                <p class="pokemon-id">#${pokeID}</p>
                <h2 class="pokemon-name">${data.name}</h2>
            </div>
            <div class="pokemon-types">
                ${types}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.height}cm</p>
                <p class="stat">${data.weight}g</p>
            </div>
        </div>
    `;
    listPokemon.append(div);
}
/* 
<div class="pokemon">
    <p class="pokemon-id-back">#025</p>
    <div class="pokemon-image">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" />
    </div>
    <div class="pokemon-info">
        <div class="name-container">
            <p class="pokemon-id">#025</p>
            <h2 class="pokemon-name">Pikachu</h2>
        </div>
        <div class="pokemon-types">
            <p class="electric type">ELETTRICITÀ</p>
            <p class="fighting type">LOTTA</p>
        </div>
        <div class="pokemon-stats">
            <p class="stat">4m</p>
            <p class="stat">60kg</p>
        </div>
    </div>
</div>
*/

buttonHeader.forEach(button => button.addEventListener("click", (event) => {
    const buttonID = event.currentTarget.id;
    listPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if (buttonID === "all") {
                    showPokemon(data);
                } else {
                    const types = data.types.map(type => type.type.name);
                    if (types.some(type => type.includes(buttonID))) {
                        showPokemon(data);
                    }
                }
                        
    })
    }

}))