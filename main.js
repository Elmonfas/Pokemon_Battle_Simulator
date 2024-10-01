let clave = "https://pokeapi.co/api/v2/pokemon/"
let left_team = []
let right_team = []
let team = document.getElementById('left_team')
let enemy_team = document.getElementById('right_team')
let cont = 0
let enemy_cont = 0
let winvh = document.getElementById('win')
let loosevh = document.getElementById('loose')
fetch(clave)
  .then(response => response.json())
  .then(data => { // Aqui creo los dos equipos
    while (left_team.length < 5) {
      let leftRandom = Math.floor(Math.random() * data.results.length) + 1
      if (!left_team.some(pokemon => pokemon.Nombre === data.results[leftRandom - 1].name)) {
        left_team.push({
          Nombre: data.results[leftRandom - 1].name,
          Imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${leftRandom}.png`
        })
      }
    }

    while (right_team.length < 5) {
      let rightRandom = Math.floor(Math.random() * data.results.length) + 1;
      if (!right_team.some(pokemon => pokemon.Nombre === data.results[rightRandom - 1].name)) {
        right_team.push({
          Nombre: data.results[rightRandom - 1].name,
          Imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rightRandom}.png`
        });
      }
    }

    console.log(left_team)
    console.log(right_team)
    // Aqui creo los divs de los equipos, el mio saldra oculatado
    for (let i = 0; i < left_team.length; i++) {
      team.innerHTML += `
        <div>
          <img class="pokemon" src="./pokeball.png" alt="${left_team[i].Nombre}" />
        </div>
      `
    }
    for (let i = 0; i < right_team.length; i++) {
      enemy_team.innerHTML += `
        <div>
          <img class="pokemon1" src="./pokeball.png" alt="${right_team[i].Nombre}" />
        </div>
      `
    }

    let batalla = document.getElementById('batalla')
    batalla.style.display = 'none'

    let create = document.getElementById('create')
    // Aqui se revelan mis pokemons
    create.addEventListener('click', () => {
      batalla.style.display = 'flex'
      create.style.display = 'none'
      team.innerHTML = ''
      enemy_team.innerHTML = ''
      for (let i = 0; i < left_team.length; i++) {
        team.innerHTML += `
          <div>
            <img id="${cont += 1}" class="pokemon" src="${left_team[i].Imagen}" alt="${left_team[i].Nombre}" />
          </div>
        `
      }
      for (let i = 0; i < right_team.length; i++) {
        enemy_team.innerHTML += `
          <div>
            <img id="e${enemy_cont += 1}" class="pokemon1" src="./pokeball.png" alt="${right_team[i].Nombre}" />
          </div>
        `
      }
    })
    function reproducirAudio() {
      var audio = document.getElementById("song");
      audio.play();
    }
    let attack = document.getElementById('atacar')
    // Aqui empieza la batalla
    batalla.addEventListener('click', () => {
      reproducirAudio()
      batalla.style.display = 'none'
      selected()
      attack.style.display = 'flex'
    })
    attack.addEventListener('click',() => {
      atacar()
      selected()
    })
  })

let attack = document.getElementById('atacar')
function selected() {
  const ourPokemonContainer = document.getElementById('ourPokemonContainer')
  const enemyPokemonContainer = document.getElementById('enemyPokemonContainer')

    const ourPokemon = left_team[0]
    const enemyPokemon = right_team[0]

    ourPokemonContainer.innerHTML = `<img class="pokemon-big" src="${ourPokemon.Imagen}" alt="${ourPokemon.Nombre}" />
                                      <p id="nom1">${ourPokemon.Nombre}</p>`
    enemyPokemonContainer.innerHTML = `<img class="pokemon-big" src="${enemyPokemon.Imagen}" alt="${enemyPokemon.Nombre}" />
                                      <p id="nom2">${enemyPokemon.Nombre}</p>`
    enemy_team.innerHTML = ''
    team.innerHTML = ''
    for (let i = 0; i < right_team.length; i++) {
      enemy_team.innerHTML += `
        <div>
          <img id="e${enemy_cont += 1}" class="pokemon1" src="./pokeball.png" alt="${right_team[i].Nombre}" />
        </div>
      `
    }
    for (let i = 0; i < left_team.length; i++) {
      team.innerHTML += `
        <div>
          <img id="${cont += 1}" class="pokemon" src="${left_team[i].Imagen}" alt="${left_team[i].Nombre}" />
        </div>
      `
    }
}
function atacar(){
  const ourPokemon = left_team[0]
  
  const ourPokemonContainer = document.getElementById('ourPokemonContainer')
  const enemyPokemonContainer = document.getElementById('enemyPokemonContainer')
  
  const enemyPokemon = right_team[0]
  
  const ourPokemonStrength = Math.floor(Math.random() * 100) + 1
  const enemyPokemonStrength = Math.floor(Math.random() * 100) + 1

  console.log(`${ourPokemon.Nombre} fuerza: ${ourPokemonStrength}`)
  console.log(`${enemyPokemon.Nombre} fuerza: ${enemyPokemonStrength}`)

  if (ourPokemonStrength > enemyPokemonStrength) {
    console.log(`${ourPokemon.Nombre} ha derrotado a ${enemyPokemon.Nombre}`)
    right_team.shift(); // El Pokémon enemigo es eliminado
    enemyPokemonContainer.innerHTML = ''
  } else if (ourPokemonStrength < enemyPokemonStrength) {
    console.log(`${enemyPokemon.Nombre} ha derrotado a ${ourPokemon.Nombre}`)
    left_team.shift(); // Nuestro Pokémon es eliminado
    ourPokemonContainer.innerHTML = ''
    
  } else {
    console.log(`¡Ha ocurrido un empate entre ${ourPokemon.Nombre} y ${enemyPokemon.Nombre}!`)
    // Posiblemente aquí podrías decidir qué hacer en caso de empate
  }

if (left_team.length === 0) {
  console.log("El equipo enemigo ha ganado la batalla");
  team.innerHTML = ''
  enemy_team.innerHTML = ''
  attack.style.display = 'none'
  loosevh.style.display = 'flex'


} else if (right_team.length === 0) {
  console.log("¡Tu equipo ha ganado la batalla!");
  enemy_team.innerHTML = '';
  team.innerHTML = ''
  attack.style.display = 'none'
  winvh.style.display = 'flex'

}



const reloadButton = document.getElementById('reloadButton')

reloadButton.addEventListener('click', () => {
    location.reload()
})
const reloadButton2 = document.getElementById('reloadButton2')

reloadButton2.addEventListener('click', () => {
    location.reload()
})
}
